---
layout: post
title: "创新管理的自学播客"
---

## 目录

- [第一话：创新？是不是很虚啊？](#ep1)
- [第二话：数字创新又是什么？](#ep2)
- [第三话：创新……还可以订制！](#ep3)

---

<h2 id="ep1">第一话：创新？是不是很虚啊？</h2>

<div style="display: flex; flex-direction: row; align-items: flex-start; width: 100%; box-sizing: border-box;">
  <!-- 左侧2/3：音频+字幕 -->
  <div style="width: 66.66%; display: flex; flex-direction: column; align-items: flex-end;">
    <div id="audio-player-ep1" style="width: 100%; display: flex; justify-content: flex-end;">
      <audio id="audio-ep1" controls style="width: 100%; max-width: 700px;">
        <source src="/class/assets/podcasts/innovation_ep1.wav" type="audio/wav">
        您的浏览器不支持 audio 元素。
      </audio>
    </div>
    <div id="lrc-container-ep1-wrap" style="width: 100%; max-width: 700px; max-height: 0; min-height: 0; overflow: hidden; border: 1px solid #ccc; padding: 0 10px; margin-top: 1em; background: #fafbfc; transition: max-height 0.5s, padding 0.5s;">
      <div id="lrc-container-ep1" style="width: 100%;">
        <ul id="lrc-list-ep1" style="margin:0; padding:0;"></ul>
      </div>
    </div>
  </div>
  <!-- 竖分隔符和右侧知识点区域 -->
  <div style="width: 33.33%; display: flex; flex-direction: row; align-items: stretch; min-height: 240px;">
    <div style="width: 1px; background: #e0e0e0; margin: 0 18px;"></div>
    <div style="flex: 1; padding-left: 10px;">
      <div style="font-weight: bold; margin-bottom: 8px;">知识点拓展</div>
      <div style="color: #888;">（此处为知识点内容占位，后续可补充相关解释、案例或链接）</div>
    </div>
  </div>
</div>
<script>
async function fetchLRC(url) {
  const res = await fetch(url);
  return await res.text();
}
function parseLRC(lrc) {
  const lines = lrc.split('\n');
  const result = [];
  const timeExp = /^(\d{2}):(\d{2})\s+/;
  for (let line of lines) {
    const match = timeExp.exec(line);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const time = min * 60 + sec;
      const text = line.replace(timeExp, '').trim();
      result.push({ time, text });
    }
  }
  return result;
}
function renderLRC(lrcArr) {
  const ul = document.getElementById('lrc-list-ep1');
  ul.innerHTML = '';
  lrcArr.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.setAttribute('data-idx', idx);
    li.style.listStyle = 'none';
    ul.appendChild(li);
  });
}
function syncLRC(audio, lrcArr) {
  const ul = document.getElementById('lrc-list-ep1');
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    let idx = 0;
    for (let i = 0; i < lrcArr.length; i++) {
      if (currentTime >= lrcArr[i].time) idx = i;
      else break;
    }
    ul.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    const activeLi = ul.querySelector(`li[data-idx="${idx}"]`);
    if (activeLi) {
      activeLi.classList.add('active');
      activeLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
(function() {
  const audio = document.getElementById('audio-ep1');
  const lrcWrap = document.getElementById('lrc-container-ep1-wrap');
  let lrcLoaded = false;
  audio.addEventListener('play', async () => {
    // 展开字幕框
    lrcWrap.style.maxHeight = '240px';
    lrcWrap.style.padding = '10px';
    // 只加载一次字幕
    if (!lrcLoaded) {
      const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep1.txt');
      const lrcArr = parseLRC(lrcText);
      renderLRC(lrcArr);
      syncLRC(audio, lrcArr);
      lrcLoaded = true;
    }
  });
  // 可选：暂停时折叠字幕框
  // audio.addEventListener('pause', () => {
  //   lrcWrap.style.maxHeight = '0';
  //   lrcWrap.style.padding = '0 10px';
  // });
})();
</script>
<style>
#lrc-list-ep1 li.active {
  color: #fff;
  background: #0078d7;
  font-weight: bold;
}
#lrc-list-ep1 li {
  padding: 2px 0;
  transition: background 0.2s;
  font-size: 1.08em;
  line-height: 1.7;
}
</style>

---

<h2 id="ep2">第二话：数字创新又是什么？</h2>

<audio controls>
  <source src="/class/assets/podcasts/innovation_ep2.wav" type="audio/wav">
  您的浏览器不支持 audio 元素。
</audio>

[查看带时间戳的脚本](/class/assets/podcasts/innovation_ep2.txt)

---

<h2 id="ep3">第三话：创新……还可以订制！</h2>

<audio controls>
  <source src="/class/assets/podcasts/innovation_ep3.wav" type="audio/wav">
  您的浏览器不支持 audio 元素。
</audio>

[查看带时间戳的脚本](/class/assets/podcasts/innovation_ep3.txt)


