---
layout: post
title: "第一话：创新？是不是很虚啊？"
---

# 第一话：创新？是不是很虚啊？

<div style="margin-bottom: 1.5em;">
  <audio id="audio-ep1" controls style="width: 100%; max-width: 700px;">
    <source src="/class/assets/podcasts/innovation_ep1.wav" type="audio/wav">
    您的浏览器不支持 audio 元素。
  </audio>
</div>
<div id="lrc-container-ep1" style="width: 100%; max-width: 700px; max-height: 240px; min-height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fafbfc; margin-bottom: 1.5em;">
  <ul id="lrc-list-ep1" style="margin:0; padding:0;"></ul>
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
    const activeLi = ul.querySelector(`li[data-idx=\"${idx}\"]`);
    if (activeLi) {
      activeLi.classList.add('active');
      activeLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
(async function() {
  const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep1.txt');
  const lrcArr = parseLRC(lrcText);
  renderLRC(lrcArr);
  const audio = document.getElementById('audio-ep1');
  syncLRC(audio, lrcArr);
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

## 知识点拓展

（此处为知识点拓展内容占位，后续可补充相关解释、案例或链接） 