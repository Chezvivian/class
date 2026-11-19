/* Career Path 引擎:存档、视图、决策、口语练习(沿用 llm-proxy)、结果、下载 */
(function () {
  var C = window.BSIM_CONFIG, MS = window.BSIM_MISSIONS, CH = window.BSIM_CHAPTERS, NPC = window.BSIM_NPCS;
  var root = document.getElementById('career');
  if (!root) return;
  var PKEY = 'bsim_v2_player', LKEY = 'bsim_v2_lang';
  var METERS = [['communication', 'Communication', '沟通'], ['reliability', 'Reliability', '可靠'], ['relationships', 'Relationships', '关系'], ['reputation', 'Reputation', '声誉']];
  var BASE = baseUrl();

  function baseUrl() { var l = document.getElementById('career-base'); return l ? l.getAttribute('data-base') : ''; }
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !C.LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };
  function mById(id) { for (var i = 0; i < MS.length; i++) if (MS[i].id === id) return MS[i]; return null; }
  function clamp(n) { return Math.max(0, Math.min(100, n)); }

  // ===== 存档 =====
  var P = null;
  try { P = JSON.parse(localStorage.getItem(PKEY)); } catch (e) {}
  var lang = localStorage.getItem(LKEY) || C.DEFAULT_LANG;
  function save() { try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch (e) {} }
  function rec(id) { if (!P.progress[id]) P.progress[id] = { decided: false, choice: null, round: 0, turns: [], chat: [], ended: false, done: false, stars: 0, zhOpens: 0, zhMode: false }; return P.progress[id]; }

  // ===== 状态 =====
  var S = { view: 'name', mid: null, picked: [], busy: false, err: '' };

  // ===== 双语片段:EN 档默认折叠中文,点击展开 =====
  function bi(en, zh) { return '<span class="bi"><span class="bi-en">' + esc(en) + '</span><span class="bi-zh">' + esc(zh) + '</span></span>'; }
  function setLang(l) {
    var nmEl = document.getElementById('nm'), keep = nmEl ? nmEl.value : null;
    lang = l; try { localStorage.setItem(LKEY, l); } catch (e) {} render();
    if (keep !== null && document.getElementById('nm')) { document.getElementById('nm').value = keep; prevName(); }
  }

  // ===== 指标 =====
  function meters() {
    var m = { communication: 50, reliability: 50, relationships: 50, reputation: 50 };
    MS.forEach(function (x) {
      var r = P.progress[x.id];
      if (!r || !r.decided) return;
      var opt = optOf(x, r.choice);
      if (opt) Object.keys(opt.meters || {}).forEach(function (k) { m[k] = clamp(m[k] + opt.meters[k]); });
    });
    return m;
  }
  function optOf(m, id) { var o = m.decision.options; for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function metersHtml() {
    var m = meters();
    return '<div class="cp-meters">' + METERS.map(function (k) { return '<div class="cp-meter"><div class="cp-mn">' + k[1] + ' <small>' + k[2] + '</small></div><div class="cp-bar-bg"><div class="cp-bar-fg" style="width:' + m[k[0]] + '%"></div></div><div class="cp-mv">' + m[k[0]] + '</div></div>'; }).join('') + '</div>';
  }
  function unlocked(m) {
    if (C.PROGRESSION_MODE === 'free') return true;
    var u = m.unlock || {}; var ok = true;
    (u.requires || []).forEach(function (id) { if (!(P.progress[id] && P.progress[id].done)) ok = false; });
    var mm = meters(); Object.keys(u.meters || {}).forEach(function (k) { if (mm[k] < u.meters[k]) ok = false; });
    return ok;
  }
  function stars(n) { var s = ''; for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆'; return s; }
  function initial(n) { return (n || '?').trim().charAt(0).toUpperCase(); }
  function hue(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return h; }

  // ===== 顶栏 =====
  function topbar() {
    var langs = [['zh', 'EN+中'], ['en', 'EN'], ['only', 'EN only']];
    var id = P ? '<div class="cp-id"><span class="cp-av" style="background:hsl(' + hue(P.name) + ',55%,45%)">' + esc(initial(P.name)) + '</span><div><b>' + esc(P.name) + '</b><small>' + esc(C.TITLE) + ' · ' + esc(C.COMPANY) + '</small></div></div>' : '<div class="cp-id"><b>Career Path</b></div>';
    return '<div class="cp-top">' + id + '<div class="cp-lang" title="Language 语言">' + langs.map(function (l) { return '<button data-act="lang" data-v="' + l[0] + '" class="' + (lang === l[0] ? 'on' : '') + '">' + l[1] + '</button>'; }).join('') + '</div></div>';
  }
  function crumb(last) { return '<div class="bs-crumb"><a href="' + BASE + '/business-sim-platform/">商务英语情境化模拟平台</a><span class="sep">/</span>Career Path' + (last ? '<span class="sep">/</span>' + last : '') + '</div>'; }

  // ===== 路由 =====
  function go(v, mid) { S.view = v; if (mid) S.mid = mid; S.err = ''; render(); window.scrollTo(0, 0); }
  function render() {
    root.className = 'cp lang-' + lang;
    var V = { name: vName, welcome: vWelcome, map: vMap, brief: vBrief, decide: vDecide, speak: vSpeak, result: vResult, profile: vProfile };
    if (!P && S.view !== 'name') S.view = 'name';
    root.innerHTML = crumb() + topbar() + V[S.view]();
    if (S.view === 'speak') { var cb = document.getElementById('chat'); if (cb) cb.scrollTop = cb.scrollHeight; }
    if (P && S.mid && lang === 'zh') { rec(S.mid).zhMode = true; save(); }
  }

  // ===== 起名 =====
  function vName() {
    return '<div class="bs-hero"><h2>Career Path</h2><p>Join ' + esc(C.COMPANY) + '. Grow from Junior Associate. <span class="bs-note" style="color:#dbe5ff">加入公司,从新人开始成长。</span></p></div>' +
      '<div class="bs-section"><h3>Your name ' + '<span class="bs-note">你的名字</span></h3>' +
      '<p class="bs-big">What should we call you?</p><p class="bs-note">输入你的英文名或称呼,也可以随机一个。</p>' +
      '<div class="cp-row"><input id="nm" class="cp-input" maxlength="20" placeholder="e.g. Alex" autocomplete="off"><button class="btn btn-ghost" data-act="rand">🎲 Random 随机</button></div>' +
      '<div class="cp-card" id="cardprev"></div>' +
      '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" id="join" data-act="join" disabled>Join ' + esc(C.COMPANY) + ' 加入公司</button></div>' +
      '<p class="bs-note" style="margin-top:10px">Saved only in this browser. 只保存在本机浏览器,不上传。</p></div>';
  }
  function prevName() {
    var v = (document.getElementById('nm') || {}).value || '';
    v = v.trim();
    var el = document.getElementById('cardprev'), j = document.getElementById('join');
    if (!el) return;
    el.innerHTML = '<span class="cp-av" style="background:hsl(' + hue(v || '?') + ',55%,45%)">' + esc(initial(v || '?')) + '</span><div><b>' + esc(v || 'Your name') + '</b><br><small>' + esc(C.TITLE) + ' · ' + esc(C.COMPANY) + '</small></div>';
    j.disabled = !v;
  }

  // ===== 欢迎信 =====
  function vWelcome() {
    return '<div class="bs-section"><h3>Welcome email <span class="bs-note">欢迎邮件</span></h3>' +
      '<div class="cp-mail"><div class="cp-mail-h"><b>From:</b> Ms. Chen · Team Manager<br><b>To:</b> ' + esc(P.name) + '<br><b>Subject:</b> Welcome to ' + esc(C.COMPANY) + '</div>' +
      '<p>Hi ' + esc(P.name) + ',</p>' +
      '<p>' + bi('Welcome to the Client Services Team. We help companies work with partners in other countries.', '欢迎加入客户服务组。我们帮助企业与不同国家的伙伴合作。') + '</p>' +
      '<p>' + bi('This week you will meet the team, join a client meeting, and work on Project Greenleaf for Sunrise Café Group.', '本周你会认识同事、参加客户会议,并参与客户 Sunrise Café Group 的 Project Greenleaf 项目。') + '</p>' +
      '<p>' + bi('Do not worry about being perfect. Be friendly, be clear, and ask when you are not sure.', '不用追求完美:友好、清楚,不确定就问。') + '</p>' +
      '<p>Ms. Chen</p></div>' +
      '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" data-act="map">Start Chapter 1 开始第一章 →</button></div>' +
      '<p class="bs-note" style="margin-top:10px">' + (lang === 'en' ? 'Tip: tap a sentence marked 中 to see Chinese. You can switch language at the top right. 点有“中”标记的句子可看中文;右上角可切换语言。' : 'Language can be switched at the top right. 右上角可切换语言。') + '</p></div>';
  }

  // ===== 地图 =====
  function vMap() {
    var html = '<div class="bs-hero"><h2>Career Map</h2><p>' + bi('Pick any mission. Each one is a short workplace conversation.', '任选一关。每一关是一段简短的职场沟通。') + '</p></div>' + '<div class="bs-section"><h3>Your progress <span class="bs-note">你的指标</span></h3>' + metersHtml() + '</div>';
    CH.forEach(function (c) {
      var ms = MS.filter(function (m) { return m.chapter === c.id; });
      html += '<div class="bs-section"><h3>' + esc(c.title) + ' <span class="bs-note">' + esc(c.zh) + '</span></h3><p class="bs-note">Milestone: ' + esc(c.milestone) + ' · ' + esc(c.milestoneZh) + '</p>';
      if (!c.ready) { html += '<div class="cp-locked">🔒 Coming soon 敬请期待</div></div>'; return; }
      html += '<div class="cp-nodes">' + ms.map(function (m) {
        var r = P.progress[m.id], ok = unlocked(m), st = r && r.done ? 'done' : (r && r.decided ? 'doing' : 'new');
        var label = !ok ? '🔒 Locked' : (st === 'done' ? stars(r.stars) : (st === 'doing' ? 'Continue 继续' : 'Start 开始'));
        return '<button class="cp-node ' + st + (ok ? '' : ' lock') + '" ' + (ok ? 'data-act="open" data-id="' + m.id + '"' : 'disabled') + '><span class="cp-ne">' + m.emoji + '</span><span class="cp-nb"><b>M1.' + m.order + ' ' + esc(m.title) + (m.milestone ? ' <em>Milestone</em>' : '') + '</b><small>' + esc(m.zh) + ' · ' + esc(m.time) + ' · ~' + m.minutes + ' min</small><small>' + esc(m.skill) + '</small></span><span class="cp-ns">' + label + '</span></button>';
      }).join('') + '</div></div>';
    });
    html += '<div class="bs-section"><h3>More <span class="bs-note">更多</span></h3><div class="rp-actions"><button class="btn btn-ghost" data-act="profile">📁 Career Profile 职业档案</button>' +
      '<a class="btn btn-ghost" style="text-decoration:none" href="' + BASE + '/business-sim/media/">📣 Media</a><a class="btn btn-ghost" style="text-decoration:none" href="' + BASE + '/business-sim/innovation/">💡 Innovation</a></div></div>';
    return html;
  }

  // ===== 情境卡 =====
  function vBrief() {
    var m = mById(S.mid), n = NPC[m.npc];
    return '<button class="bsim-back" data-act="map">← Map 返回地图</button>' +
      '<div class="bs-hero"><h2>M1.' + m.order + ' ' + esc(m.title) + '</h2><p>' + esc(m.time) + ' · ' + esc(m.zh) + '</p></div>' +
      '<div class="bs-section"><h3>Scene <span class="bs-note">情境</span></h3><p class="bs-big">' + bi(m.briefing.en, m.briefing.zh) + '</p>' +
      '<div class="cp-npc" style="--c:' + n.color + '"><span class="role-emoji">' + n.emoji + '</span><div><b>' + esc(n.name) + '</b><small>' + esc(n.zh) + '</small></div></div></div>' +
      '<div class="bs-section"><div class="bs-problem" style="border-left-color:#2e7d4f;background:#f4fbf6;border-color:#cfe8d6"><div class="q" style="color:#1f5f3a">Your goal <span class="bs-note">你的目标</span></div><div class="bs-big">' + bi(m.briefing.goalEn, m.briefing.goalZh) + '</div></div></div>' +
      '<div class="rp-actions"><button class="btn btn-primary" data-act="decide">Next: Decide 做决定 →</button></div>';
  }

  // ===== 决策卡 =====
  function vDecide() {
    var m = mById(S.mid), r = rec(m.id), d = m.decision;
    var html = '<button class="bsim-back" data-act="brief">← Scene 返回情境</button><div class="bs-section"><h3>' + bi(d.promptEn, d.promptZh) + '</h3>' +
      '<p class="bs-note">No perfect answer. Every choice has a cost. 没有唯一正确答案,每个选择都有代价。</p><div class="cp-opts">';
    d.options.forEach(function (o) {
      html += '<button class="cp-opt ' + (r.decided && r.choice === o.id ? 'sel' : '') + '" ' + (r.decided ? 'disabled' : 'data-act="choose" data-id="' + o.id + '"') + '><b>' + o.id + '</b><span>' + bi(o.en, o.zh) + '</span></button>';
    });
    html += '</div>';
    if (r.decided) {
      var o = optOf(m, r.choice);
      html += '<div class="cp-outcome"><div class="q">Result now <span class="bs-note">即时结果</span></div><div class="bs-big">' + bi(o.now.en, o.now.zh) + '</div>' + deltaHtml(o.meters) + '</div>' +
        '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" data-act="speak">Next: Speak 开口练习 →</button></div>';
    }
    return html + '</div>';
  }
  function deltaHtml(mt) {
    var out = '';
    METERS.forEach(function (k) { var v = (mt || {})[k[0]]; if (v) out += '<span class="cp-delta ' + (v > 0 ? 'up' : 'dn') + '">' + k[1] + ' ' + (v > 0 ? '+' : '') + v + '</span>'; });
    return out ? '<div class="cp-deltas">' + out + '</div>' : '';
  }

  // ===== 口语练习 =====
  function vSpeak() {
    var m = mById(S.mid), r = rec(m.id), n = NPC[m.npc], sp = m.speak;
    if (!r.chat.length) { r.chat = [{ type: 'sys', text: 'Conversation starts' }, { type: 'ai', text: m.opener.en, zh: m.opener.zh }]; save(); }
    var finished = r.ended || r.round >= sp.maxRounds;
    var html = '<button class="bsim-back" data-act="map">← Map 返回地图</button><div style="--c:' + n.color + '">' +
      '<div class="rp-head"><span class="rp-badge">' + n.emoji + ' Talk with ' + esc(n.name) + '</span><span class="rp-round">' + (finished ? 'Done 已完成' : 'Round ' + Math.min(r.round + 1, sp.maxRounds) + ' / ' + sp.maxRounds) + (isMock() ? ' (mock 模拟)' : '') + '</span></div>';
    if (!finished) html += '<div class="rp-goal"><b>Task:</b> ' + bi(sp.rounds[r.round], sp.roundsZh[r.round]) + '</div>';
    html += '<div class="chat-box" id="chat">' + chatHtml(m, r) + '</div>';
    if (finished) {
      html += '<div class="rp-actions"><button class="btn btn-primary" data-act="result">See result 查看结果 →</button></div>';
    } else {
      html += '<div class="word-panel">' + sp.wordGroups.map(function (g) {
        return '<div class="word-group"><div class="word-group-title">' + esc(g.group) + '</div><div class="chips">' + g.items.map(function (it) {
          return '<button class="chip' + (idxPick(it[0]) >= 0 ? ' on' : '') + '" data-act="chip" data-type="' + g.type + '" data-en="' + esc(it[0]) + '" data-zh="' + esc(it[1]) + '">' + esc(it[0]) + '<small>' + esc(it[1]) + '</small></button>';
        }).join('') + '</div></div>';
      }).join('') +
        '<div class="picked">' + (S.picked.length ? 'Picked 已选: ' + S.picked.map(function (p) { return esc(p.en); }).join(' + ') : 'Pick 2+ phrases. Use your own words! 选 2 个以上表达,再用自己的话说。') + '</div>' +
        '<div class="rp-actions"><button class="btn btn-primary" data-act="gen" ' + (S.picked.length < 2 || S.busy ? 'disabled' : '') + '>' + (S.busy ? 'Generating… 生成中' : 'Generate my line 生成发言') + '</button><button class="btn btn-ghost" data-act="clear">Clear 清空</button>' +
        (r.round >= 2 ? '<button class="btn btn-ghost" data-act="endearly">End now 结束</button>' : '') + '</div><div class="rp-err">' + esc(S.err) + '</div></div>';
    }
    html += '<details class="pb"><summary>Phrasebank 话术库 · click to copy 点击复制</summary>' + m.speak.phrasebank.map(function (g) {
      return '<div class="pb-group"><div class="pb-gname">' + esc(g.group) + '</div>' + g.items.map(function (it) { return '<div class="pb-item" data-act="copy" data-en="' + esc(it[0]) + '"><span class="pb-en">' + esc(it[0]) + '</span><span class="pb-zh">' + esc(it[1]) + '</span></div>'; }).join('') + '</div>';
    }).join('') + '</details>';
    return html + '</div><p class="bs-note" style="margin-top:12px">Use your own words. The coach does not write the speech for you. 用自己的话,助手不代写整段发言。</p>';
  }
  function idxPick(en) { for (var i = 0; i < S.picked.length; i++) if (S.picked[i].en === en) return i; return -1; }
  function chatHtml(m, r) {
    var n = NPC[m.npc], t = 0;
    return r.chat.map(function (x) {
      if (x.type === 'sys') return '<div class="msg-sys">' + esc(x.text) + '</div>';
      if (x.type === 'me') { var tr = r.turns[t++]; return '<div class="msg me" style="--c:#2c6bac"><div class="msg-who">You · ' + esc(P.name) + '</div><div class="msg-bubble">' + esc(x.text) + '</div>' + (tr ? studyHtml(tr) : '') + '</div>'; }
      return '<div class="msg" style="--c:' + n.color + '"><div class="msg-who">' + n.emoji + ' ' + esc(n.name) + '</div><div class="msg-bubble">' + (x.zh ? bi(x.text, x.zh) : esc(x.text)) + '</div></div>';
    }).join('');
  }
  function studyHtml(t) {
    var kp = (t.keyPhrases || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + (k.note ? '(' + esc(k.note) + ')' : '') + '</span></li>'; }).join('');
    var pt = (t.patterns || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + '</span></li>'; }).join('');
    var up = (t.politeUpgrade || []).map(function (k) { return '<li>' + esc(k.from) + ' → <b>' + esc(k.to) + '</b> <span class="zh">— ' + esc(k.why) + '</span></li>'; }).join('');
    return '<div class="study"><h4>Key phrases 关键词</h4><ul>' + (kp || '<li>—</li>') + '</ul><h4>Patterns 句式</h4><ul>' + (pt || '<li>—</li>') + '</ul>' +
      (up ? '<h4>More natural 更自然</h4><ul>' + up + '</ul>' : '') + (t.toneFeedback ? '<h4>Tone 语气</h4><p>' + esc(t.toneFeedback) + '</p>' : '') + '</div>';
  }

  // ===== LLM(沿用 llm-proxy: POST {system,user} -> {content}) =====
  function buildPrompt(m, r) {
    var n = NPC[m.npc], opt = optOf(m, r.choice), last = r.round + 1 === m.speak.maxRounds;
    var system = 'You are a business English coach running a short workplace role-play for Chinese university students (CEFR B1-B2). Keep language simple and natural.\n' +
      'Company: ' + C.COMPANY + ' (international consulting). Project: Greenleaf for Sunrise Cafe Group. Do not use specialist industry knowledge.\n' +
      'Scene: ' + m.briefing.en + ' Time: ' + m.time + '.\n' +
      'The student plays ' + P.name + ', a ' + C.TITLE + '. The AI plays ' + n.name + ' (' + m.npcStance + ').\n' +
      'The student chose this strategy: "' + (opt ? opt.en : '') + '". Their speech should stay consistent with it.\n' +
      'Task this round: ' + m.speak.rounds[r.round] + '\n' +
      'Turn the student\'s chosen phrases into a natural first-person spoken line (1-3 short sentences, MUST use ALL chosen phrases, stay in the scene). Then reply as ' + n.name + ' in 1-2 sentences, keeping character and moving the conversation forward' + (last ? ' (final round: bring the conversation to a natural close)' : '') + '.\n' +
      'Return ONLY JSON: {"speech": string, "keyPhrases": [{"en": string, "zh": string, "note": string}], "patterns": [{"en": string, "zh": string}], "colleagueReplies": [{"role": "npc", "text": string}], "toneFeedback": string (optional, one short Chinese sentence), "politeUpgrade": [{"from": string, "to": string, "why": string}] (optional, max 2, why in Chinese)}. keyPhrases = chosen phrases with Chinese meaning and a short Chinese usage tip; patterns = reusable sentence frames with ___ and Chinese explanation.';
    var hist = r.chat.filter(function (x) { return x.type !== 'sys'; }).slice(-6).map(function (x) { return (x.type === 'me' ? P.name + ' (student)' : n.name) + ': ' + x.text; }).join('\n');
    var user = 'Round ' + (r.round + 1) + ' of ' + m.speak.maxRounds + '.\nConversation so far:\n' + hist + '\n\nStudent chosen phrases:\n' + S.picked.map(function (p) { return '[' + p.type + '] ' + p.en; }).join('\n');
    return { system: system, user: user };
  }
  function mockGenerate(m, r) {
    var bit = S.picked.map(function (p) { return p.en.replace(/\?$/, ''); });
    var speech = bit.map(function (b, i) { return i === 0 ? b : b.charAt(0).toLowerCase() + b.slice(1); }).join('. ') + '.';
    return { speech: speech, keyPhrases: S.picked.map(function (p) { return { en: p.en, zh: p.zh, note: '' }; }), patterns: [{ en: 'Just to confirm, ___?', zh: '确认一下,…?' }, { en: 'Would ___ work for you?', zh: '…您看可以吗?' }], colleagueReplies: [{ role: 'npc', text: m.mockReplies[r.round % m.mockReplies.length] }] };
  }
  function parseLLM(raw) {
    var s = String(raw).replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
    var o = JSON.parse(s);
    if (!o || typeof o.speech !== 'string') throw new Error('bad format');
    return o;
  }
  function llmGenerate(m, r) {
    var p = buildPrompt(m, r);
    function once() {
      return fetch(C.LLM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
        .then(function (x) { return x.json().then(function (d) { if (!x.ok) throw new Error(d.error || ('HTTP ' + x.status)); return d; }); })
        .then(function (d) { return parseLLM(d.content); });
    }
    return once().catch(function (e) { if (e instanceof SyntaxError || e.message === 'bad format') return once(); throw e; });
  }
  function generate() {
    var m = mById(S.mid), r = rec(m.id);
    S.busy = true; S.err = ''; render();
    var job = isMock() ? Promise.resolve(mockGenerate(m, r)) : llmGenerate(m, r);
    job.then(function (res) {
      r.turns.push({ round: r.round + 1, picked: S.picked.slice(), speech: res.speech, keyPhrases: res.keyPhrases || [], patterns: res.patterns || [], politeUpgrade: res.politeUpgrade || [], toneFeedback: res.toneFeedback || '' });
      r.chat.push({ type: 'me', text: res.speech });
      var rep = (res.colleagueReplies || [])[0];
      if (rep && rep.text) r.chat.push({ type: 'ai', text: rep.text });
      r.round++; S.picked = []; S.busy = false;
      if (r.round >= m.speak.maxRounds) r.ended = true;
      save(); render();
    }).catch(function (e) {
      S.busy = false; S.err = 'Failed 生成失败: ' + (e.message || e) + '。请重试,或在网址后加 ?mock=1 使用模拟模式。'; render();
    });
  }

  // ===== 星级与结果 =====
  function calcStars(m, r) {
    if (r.turns.length < 2 || !r.decided) return r.turns.length >= 2 ? 1 : 0;
    var types = {}, all = {};
    r.turns.forEach(function (t) { t.picked.forEach(function (p) { all[p.type] = 1; types[p.type] = 1; }); });
    var hit = m.speak.targetTypes.filter(function (x) { return types[x]; }).length, s = 1;
    if (hit >= 2) s = 2;
    var lastTurn = r.turns[r.turns.length - 1], lastEnds = lastTurn && lastTurn.picked.some(function (p) { return p.type === 'closing' || p.type === 'followup'; });
    var star3 = m.speak.starTypes.some(function (x) { return all[x]; });
    if (s === 2 && star3 && lastEnds) s = 3;
    return s;
  }
  function vResult() {
    var m = mById(S.mid), r = rec(m.id), o = optOf(m, r.choice);
    r.stars = calcStars(m, r); r.done = true; save();
    var fullEn = !r.zhMode && r.zhOpens === 0;
    var html = '<div class="bs-hero"><h2>' + stars(r.stars) + ' &nbsp;M1.' + m.order + ' ' + esc(m.title) + '</h2><p>Mission complete 关卡完成</p></div>' + '<div class="bs-section"><h3>What happened <span class="bs-note">发生了什么</span></h3>' +
      '<div class="cp-outcome"><div class="q">Now 即时</div><div class="bs-big">' + bi(o.now.en, o.now.zh) + '</div>' + deltaHtml(o.meters) + '</div>' +
      '<div class="cp-outcome later"><div class="q">Later 延迟后果</div><div class="bs-big">' + bi(o.later.en, o.later.zh) + '</div></div>' +
      '<div class="cp-outcome strat"><div class="q">Why 策略反馈</div><div class="bs-big">' + bi(o.strategy.en, o.strategy.zh) + '</div></div></div>' +
      '<div class="bs-section"><h3>Your lines <span class="bs-note">你的发言</span></h3>' + r.turns.map(function (t) { return '<div class="msg me" style="--c:#2c6bac;max-width:100%"><div class="msg-who">Round ' + t.round + '</div><div class="msg-bubble">' + esc(t.speech) + '</div></div>'; }).join('') + '</div>' +
      '<div class="bs-section"><h3>Language use <span class="bs-note">语言依赖</span></h3><p>' + (fullEn ? '🏅 <b>Full English 全英文通关</b>' : 'Chinese opened 点开中文: <b>' + r.zhOpens + '</b> 次' + (r.zhMode ? '(本关用过 EN+中 档)' : '')) + '</p></div>' +
      '<div class="bs-section"><h3>Team Lab · offline task <span class="bs-note">线下任务</span></h3><div class="bs-box"><p>' + bi(m.offline.en, m.offline.zh) + '</p><p class="bs-note">Observe: ' + esc(m.offline.watch) + '</p><p class="bs-note">Discuss: ' + esc(m.offline.discuss) + '</p></div></div>' +
      '<div class="bs-section"><h3>Your meters <span class="bs-note">指标</span></h3>' + metersHtml() + '</div>';
    var nx = MS.filter(function (x) { return x.order === m.order + 1 && x.chapter === m.chapter; })[0];
    html += '<div class="rp-actions"><button class="btn btn-dl" data-act="dl">⬇ Download 下载学习资料</button><button class="btn btn-ghost" data-act="copysum">📋 Copy summary 复制摘要</button><button class="btn btn-ghost" data-act="retry">↻ Replay 重玩本关</button>' +
      (nx && unlocked(nx) ? '<button class="btn btn-primary" data-act="open" data-id="' + nx.id + '">Next mission 下一关 →</button>' : '') + '<button class="btn btn-primary" data-act="map">Map 地图</button></div><div class="rp-err" id="cpmsg"></div>';
    return html;
  }

  // ===== 档案 =====
  function vProfile() {
    var rows = MS.map(function (m) { var r = P.progress[m.id]; return '<tr><td>M1.' + m.order + ' ' + esc(m.title) + '</td><td>' + (r && r.done ? stars(r.stars) : '—') + '</td><td>' + (r && r.decided ? esc(r.choice) : '—') + '</td><td>' + (r ? r.zhOpens : 0) + '</td></tr>'; }).join('');
    return '<button class="bsim-back" data-act="map">← Map 返回地图</button><div class="bs-section"><h3>Career Profile <span class="bs-note">职业档案</span></h3>' +
      '<div class="cp-card"><span class="cp-av" style="background:hsl(' + hue(P.name) + ',55%,45%)">' + esc(initial(P.name)) + '</span><div><b>' + esc(P.name) + '</b><br><small>' + esc(C.TITLE) + ' · ' + esc(C.COMPANY) + '</small></div></div>' + metersHtml() +
      '<table class="bs-table"><tr><th>Mission</th><th>Stars</th><th>Choice</th><th>中文点开</th></tr>' + rows + '</table>' +
      '<div class="rp-actions"><button class="btn btn-ghost" data-act="resetall">Restart career 重新开始</button></div></div>';
  }

  // ===== 下载 / 摘要 =====
  function summary(m, r) {
    var o = optOf(m, r.choice);
    return 'Career Path · ' + m.title + ' (M1.' + m.order + ')\nPlayer: ' + P.name + ' | Stars: ' + stars(r.stars) + ' | Choice: ' + r.choice + ' (' + (o ? o.en : '') + ')\nChinese opened: ' + r.zhOpens + (r.zhMode ? ' (EN+中 mode used)' : '') + '\nMy lines:\n' + r.turns.map(function (t) { return '  R' + t.round + ': ' + t.speech; }).join('\n');
  }
  function download() {
    var m = mById(S.mid), r = rec(m.id), o = optOf(m, r.choice), n = NPC[m.npc], L = [];
    L.push('# Career Path - M1.' + m.order + ' ' + m.title + ' ' + m.zh, '', 'Player: ' + P.name + ' (' + C.TITLE + ', ' + C.COMPANY + ')', 'Date: ' + new Date().toLocaleString(), 'Stars: ' + stars(r.stars), 'Chinese opened: ' + r.zhOpens, '', '## Scene', m.briefing.en, m.briefing.zh, '', '## Decision', 'You chose ' + r.choice + ': ' + (o ? o.en + ' / ' + o.zh : ''), 'Now: ' + (o ? o.now.en : ''), 'Later: ' + (o ? o.later.en : ''), 'Why: ' + (o ? o.strategy.en + ' / ' + o.strategy.zh : ''), '', '## Conversation', '');
    var ti = 0;
    r.chat.forEach(function (x) {
      if (x.type === 'sys') return;
      if (x.type === 'ai') { L.push('**' + n.name + ':** ' + x.text, ''); return; }
      var t = r.turns[ti++]; L.push('### Round ' + t.round, 'Chosen: ' + t.picked.map(function (p) { return p.en; }).join(' | '), '', '**' + P.name + ':** ' + t.speech, '');
      (t.keyPhrases || []).forEach(function (k) { L.push('- ' + k.en + ' - ' + k.zh + (k.note ? ' (' + k.note + ')' : '')); });
      (t.patterns || []).forEach(function (k) { L.push('- [pattern] ' + k.en + ' - ' + k.zh); });
      L.push('');
    });
    L.push('---', '', '# Phrasebank', '');
    m.speak.phrasebank.forEach(function (g) { L.push('## ' + g.group, ''); g.items.forEach(function (it) { L.push('- ' + it[0] + ' - ' + it[1]); }); L.push(''); });
    var blob = new Blob(['\ufeff' + L.join('\n')], { type: 'text/markdown;charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'career-path-' + m.id + '-' + P.name + '.md';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function flash(t) { var el = document.getElementById('cpmsg'); if (el) { el.style.color = '#2e7d4f'; el.textContent = t; } }

  // ===== 事件 =====
  root.addEventListener('click', function (e) {
    var bi_ = e.target.closest ? e.target.closest('.bi') : null;
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!el && bi_ && lang === 'en') {
      var on = bi_.classList.toggle('open');
      if (on && S.mid && P) { rec(S.mid).zhOpens++; save(); }
      return;
    }
    if (!el) return;
    var act = el.getAttribute('data-act'), id = el.getAttribute('data-id'), m = S.mid ? mById(S.mid) : null;
    switch (act) {
      case 'lang': setLang(el.getAttribute('data-v')); break;
      case 'rand': var nm = C.RANDOM_NAMES[Math.floor(Math.random() * C.RANDOM_NAMES.length)]; document.getElementById('nm').value = nm; prevName(); break;
      case 'join':
        var v = document.getElementById('nm').value.trim().slice(0, 20); if (!v) return;
        P = { name: v, createdAt: new Date().toISOString(), progress: {}, welcomed: false }; save(); go('welcome'); break;
      case 'map': if (P) { P.welcomed = true; save(); } S.mid = null; go('map'); break;
      case 'open': S.picked = []; var r0 = rec(id); go(r0.decided ? (r0.done ? 'result' : 'speak') : 'brief', id); break;
      case 'brief': go('brief'); break;
      case 'decide': go('decide'); break;
      case 'choose': var r1 = rec(m.id); r1.decided = true; r1.choice = id; save(); render(); break;
      case 'speak': S.picked = []; go('speak'); break;
      case 'chip':
        var en = el.getAttribute('data-en'), i = idxPick(en);
        if (i >= 0) S.picked.splice(i, 1); else S.picked.push({ type: el.getAttribute('data-type'), en: en, zh: el.getAttribute('data-zh') });
        var sc = window.pageYOffset; render(); window.scrollTo(0, sc); break;
      case 'clear': S.picked = []; render(); break;
      case 'gen': generate(); break;
      case 'endearly': if (confirm('End the conversation now? 现在结束对话?')) { var r2 = rec(m.id); r2.ended = true; save(); render(); } break;
      case 'result': go('result'); break;
      case 'copy':
        var tx = el.getAttribute('data-en'), done = function () { el.classList.add('copied'); setTimeout(function () { el.classList.remove('copied'); }, 900); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tx).then(done, done); else done(); break;
      case 'dl': download(); break;
      case 'copysum':
        var st = summary(m, rec(m.id)), ok = function () { flash('Copied 已复制'); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(st).then(ok, function () { window.prompt('Copy:', st); }); else window.prompt('Copy:', st); break;
      case 'retry': if (confirm('Replay this mission? Your record for it will be cleared. 重玩会清除本关记录。')) { delete P.progress[m.id]; save(); S.picked = []; go('brief'); } break;
      case 'profile': go('profile'); break;
      case 'resetall': if (confirm('Clear all progress and restart? 清除所有进度并重新开始?')) { localStorage.removeItem(PKEY); P = null; S.mid = null; go('name'); } break;
    }
  });
  root.addEventListener('input', function (e) { if (e.target.id === 'nm') prevName(); });
  root.addEventListener('keydown', function (e) { if (e.target.id === 'nm' && e.key === 'Enter') { var j = document.getElementById('join'); if (j && !j.disabled) j.click(); } });

  // 启动
  if (P && P.name) { P.progress = P.progress || {}; S.view = P.welcomed ? 'map' : 'welcome'; }
  render();
  if (S.view === 'name') prevName();
  var obs = new MutationObserver(function () { if (S.view === 'name') prevName(); });
  obs.observe(root, { childList: true });
})();
