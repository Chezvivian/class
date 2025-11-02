const https = require('https');

exports.handler = async (event, context) => {
    console.log('=== TTS 请求开始 ===');
    
    try {
        // 🔑 关键：event 是 Buffer，需要先转换为 JSON
        let request;
        if (Buffer.isBuffer(event)) {
            const eventStr = event.toString('utf8');
            request = JSON.parse(eventStr);
        } else if (typeof event === 'string') {
            request = JSON.parse(event);
        } else {
            request = event;
        }
        
        console.log('解析后的 request 结构:', {
            version: request.version,
            rawPath: request.rawPath,
            hasBody: !!request.body,
            hasRequestContext: !!request.requestContext
        });
        
        // 🔑 从 requestContext.http.method 获取方法
        const method = request.requestContext?.http?.method || 'UNKNOWN';
        console.log('HTTP 方法:', method);
        
        // OPTIONS 预检
        if (method === 'OPTIONS') {
            console.log('处理 OPTIONS 请求');
            return {
                statusCode: 204,
                headers: {},
                body: ''
            };
        }
        
        // 只允许 POST
        if (method !== 'POST') {
            console.log('❌ 拒绝非 POST 请求, 实际方法:', method);
            return {
                statusCode: 405,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    error: 'Method not allowed',
                    receivedMethod: method,
                    expectedMethod: 'POST'
                })
            };
        }
        
        console.log('✅ 方法验证通过');
        
        // 🔑 解析请求体（在 request.body 字段中）
        let body;
        const bodyStr = request.body || '{}';
        console.log('原始 body 字符串:', bodyStr);
        
        try {
            body = JSON.parse(bodyStr);
        } catch (parseError) {
            console.error('❌ 解析请求体失败:', parseError.message);
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    error: 'Invalid JSON', 
                    details: parseError.message 
                })
            };
        }
        
        console.log('✅ 解析后的 body:', JSON.stringify(body));
        
        const { text, voice, rate, pitch } = body;
        
        // 验证参数
        if (!text) {
            console.error('❌ 缺少 text 参数');
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Text is required' })
            };
        }
        
        if (text.length > 5000) {
            console.error('❌ 文本太长:', text.length);
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Text too long (max 5000)' })
            };
        }
        
        console.log('✅ 请求参数:', { 
            textLength: text.length, 
            voice: voice || 'default',
            rate: rate || 'default',
            pitch: pitch || 'default'
        });
        
        // Azure 配置
        const azureKey = process.env.AZURE_SPEECH_KEY;
        const azureRegion = process.env.AZURE_SPEECH_REGION || 'japaneast';
        
        if (!azureKey) {
            console.error('❌ AZURE_SPEECH_KEY 未配置');
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Azure API key not configured' })
            };
        }
        
        console.log('✅ Azure 配置:', { 
            region: azureRegion, 
            keyExists: !!azureKey,
            keyLength: azureKey.length 
        });
        
        // 默认参数
        const voiceName = voice || 'en-US-JennyNeural';
        const speechRate = rate || '1.0';
        const speechPitch = pitch || '0%';
        
        console.log('使用参数:', { voiceName, speechRate, speechPitch });
        
        // 构建 SSML
        const ssml = `<speak version='1.0' xml:lang='en-US'><voice name='${voiceName}'><prosody rate='${speechRate}' pitch='${speechPitch}'>${escapeXml(text)}</prosody></voice></speak>`;
        console.log('SSML 长度:', ssml.length);
        
        console.log('🔄 调用 Azure TTS API...');
        const startTime = Date.now();
        
        // 调用 Azure TTS
        const audioData = await callAzureTTS(azureKey, azureRegion, ssml);
        
        const duration = Date.now() - startTime;
        console.log(`✅ TTS 成功! 耗时: ${duration}ms, 音频大小: ${audioData.length} bytes`);
        
        console.log('=== TTS 请求完成 ===');
        
        // 返回音频
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=86400'
            },
            body: audioData.toString('base64'),
            isBase64Encoded: true
        };
        
    } catch (error) {
        console.error('❌ TTS 错误:', error.message);
        console.error('错误堆栈:', error.stack);
        
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};

// 调用 Azure TTS API
function callAzureTTS(apiKey, region, ssml) {
    return new Promise((resolve, reject) => {
        console.log('Azure TTS 请求:', { region, ssmlLength: ssml.length });
        
        const options = {
            hostname: `${region}.tts.speech.microsoft.com`,
            path: '/cognitiveservices/v1',
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
                'User-Agent': 'AliyunFC'
            },
            timeout: 30000
        };
        
        const req = https.request(options, (res) => {
            console.log('Azure 响应状态:', res.statusCode);
            
            const chunks = [];
            
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            
            res.on('end', () => {
                const data = Buffer.concat(chunks);
                
                if (res.statusCode === 200) {
                    console.log('✅ Azure TTS 成功, 数据大小:', data.length);
                    resolve(data);
                } else {
                    const errorBody = data.toString();
                    console.error('❌ Azure API 错误:', res.statusCode, errorBody);
                    reject(new Error(`Azure API error ${res.statusCode}: ${errorBody}`));
                }
            });
        });
        
        req.on('error', (error) => {
            console.error('❌ HTTPS 请求错误:', error.message);
            reject(error);
        });
        
        req.on('timeout', () => {
            req.destroy();
            console.error('❌ 请求超时');
            reject(new Error('Request timeout'));
        });
        
        req.write(ssml);
        req.end();
    });
}

// XML 转义
function escapeXml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}