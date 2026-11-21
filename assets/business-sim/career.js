/* Career Path 引擎:存档、视图、决策、口语练习(沿用 llm-proxy)、结果、下载
   语言档位只有两档: 'zh' = EN+中, 'only' = EN only(界面中的中文全部隐藏)。
   约定: 界面文案写成 "English 中文",bil() 会把第一个中文字符起的部分包进 .zhx(EN only 下隐藏)。
   页面内不使用 h1-h4 标签,避免站点左侧导航自动生成二、三级标题。 */
(function () {
  var C = window.BSIM_CONFIG, MS = window.BSIM_MISSIONS, CH = window.BSIM_CHAPTERS, NPC = window.BSIM_NPCS;
  var root = document.getElementById('career');
  if (!root) return;
  var PKEY = 'bsim_v2_player', LKEY = 'bsim_v2_lang';
  var METERS = [['communication', 'Communication', '沟通'], ['reliability', 'Reliability', '可靠'], ['relationships', 'Relationships', '关系'], ['reputation', 'Reputation', '声誉']];
  var BASE = (document.getElementById('career-base') || { getAttribute: function () { return ''; } }).getAttribute('data-base') || '';

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !C.LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };
  function mById(id) { for (var i = 0; i < MS.length; i++) if (MS[i].id === id) return MS[i]; return null; }
  function tag(m) { return 'M' + m.chapter + '.' + m.order; }
  function roleTitle() { var m = S.mid && mById(S.mid); return (m && m.chapter >= 3) ? 'Project Coordinator' : ((m && m.chapter >= 2) ? 'Associate' : C.TITLE); }
  function clamp(n) { return Math.max(0, Math.min(100, n)); }

  // ===== 语言工具 =====
  var CJK = /[\u3000-\u9fff\uff00-\uffef]/;
  function split(s) { s = String(s == null ? '' : s); var i = s.search(CJK); if (i < 0) return [s, '']; return [s.slice(0, i).replace(/[\s·:：(（—\-,，]+$/, ''), s.slice(i)]; }
  function bil(s) { var p = split(s); return esc(p[0]) + (p[1] ? '<span class="zhx"> ' + esc(p[1]) + '</span>' : ''); }   // 混合文案(HTML)
  function Z(s) { return s ? '<span class="zhx"> ' + esc(s) + '</span>' : ''; }                                         // 纯中文片段(HTML)
  var lang;
  function L(s) { return lang === 'only' ? split(s)[0] : String(s); }                                                     // 混合文案(纯文本,用于 confirm/placeholder)
  function bi(en, zh) { return '<span class="bi"><span class="bi-en">' + esc(en) + '</span><span class="bi-zh">' + esc(zh) + '</span></span>'; }

  // ===== 存档 =====
  var P = null;
  try { P = JSON.parse(localStorage.getItem(PKEY)); } catch (e) {}
  lang = localStorage.getItem(LKEY) || C.DEFAULT_LANG;
  if (lang !== 'zh' && lang !== 'only') lang = 'only';   // 兼容旧版 'en' 档
  function save() { try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch (e) {} }
  function rec(id) { if (!P.progress[id]) P.progress[id] = { decided: false, choice: null, round: 0, turns: [], chat: [], ended: false, done: false, stars: 0, zhMode: false }; return P.progress[id]; }

  var S = { view: 'name', mid: null, picked: [], busy: false, err: '', draft: '', hint: '', recState: null, phrOpen: false, scrollLast: false };

  function setLang(l) {
    var nmEl = document.getElementById('nm'), keep = nmEl ? nmEl.value : null;
    lang = l; try { localStorage.setItem(LKEY, l); } catch (e) {}
    render();
    if (keep !== null && document.getElementById('nm')) { document.getElementById('nm').value = keep; prevName(); }
  }

  // ===== 指标 =====
  function optOf(m, id) { var o = m.decision.options; for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
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
  function metersHtml() {
    var m = meters();
    return '<div class="cp-meters">' + METERS.map(function (k) {
      var d = m[k[0]] - 50, cls = d > 0 ? 'up' : (d < 0 ? 'dn' : ''), shown = d > 0 ? '+' + d : (d < 0 ? String(d) : '—');
      return '<div class="cp-meter"><div class="cp-mn">' + k[1] + Z(k[2]) + '</div><div class="cp-md ' + cls + '">' + shown + '</div><div class="cp-mv">now ' + m[k[0]] + '</div></div>';
    }).join('') + '</div>';
  }
  function unlocked(m) {
    if (C.PROGRESSION_MODE === 'free') return true;
    var u = m.unlock || {}, ok = true;
    (u.requires || []).forEach(function (id) { if (!(P.progress[id] && P.progress[id].done)) ok = false; });
    var mm = meters(); Object.keys(u.meters || {}).forEach(function (k) { if (mm[k] < u.meters[k]) ok = false; });
    return ok;
  }
  function stars(n) { var s = ''; for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆'; return s; }
  function initial(n) { return (n || '?').trim().charAt(0).toUpperCase(); }
  function hue(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return h; }
  function H(t) { return '<div class="bs-h">' + t + '</div>'; }   // 区块标题(不用 h 标签)

  // ===== 顶栏 =====
  function topbar() {
    var langs = [['zh', 'EN+中'], ['only', 'EN only']];
    var id = P ? '<div class="cp-id"><span class="cp-av" style="background:hsl(' + hue(P.name) + ',55%,45%)">' + esc(initial(P.name)) + '</span><div><b>' + esc(P.name) + '</b><small>' + esc(roleTitle()) + ' · ' + esc(C.COMPANY) + '</small></div></div>' : '<div class="cp-id"><b>Career Path</b></div>';
    return '<div class="cp-top">' + id + '<div class="cp-lang" title="Language">' + langs.map(function (l) { return '<button data-act="lang" data-v="' + l[0] + '" class="' + (lang === l[0] ? 'on' : '') + '">' + l[1] + '</button>'; }).join('') + '</div></div>';
  }
  function crumb() { return '<div class="bs-crumb"><a href="' + BASE + '/business-sim-platform/">' + bil('Business English Simulation 商务英语情境化模拟平台') + '</a><span class="sep">/</span>Career Path</div>'; }

  // ===== 路由 =====
  function go(v, mid) {
    stopRec(true); stopPlayer();
    if (mid && mid !== S.mid) { S.draft = ''; S.hint = ''; }
    S.view = v; if (mid) S.mid = mid; S.err = ''; S.busy = false; render(); window.scrollTo(0, 0);
  }
  function render() {
    root.className = 'cp lang-' + lang;
    var V = { name: vName, welcome: vWelcome, map: vMap, brief: vBrief, decide: vDecide, speak: vSpeak, result: vResult, profile: vProfile };
    if (!P && S.view !== 'name') S.view = 'name';
    root.innerHTML = crumb() + topbar() + V[S.view]();
    if (S.view === 'speak' && S.scrollLast) {   // 新一轮回应出来后,滚到你刚说的话(其下是改进版和对方回应)
      S.scrollLast = false;
      var lastEl = document.getElementById('cp-last');
      if (lastEl && lastEl.scrollIntoView) lastEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (S.view === 'name') prevName();
    if (P && S.mid && lang === 'zh') { var r = rec(S.mid); if (!r.zhMode) { r.zhMode = true; save(); } }
  }

  // ===== 起名 =====
  function vName() {
    return '<div class="bs-hero"><div class="bs-title">Career Path</div><p>Join ' + esc(C.COMPANY) + '. Grow from Junior Associate.' + Z('加入公司,从新人开始成长。') + '</p></div>' +
      '<div class="bs-section">' + H('Your name' + Z('你的名字')) +
      '<p class="bs-big">What should we call you?</p><p class="bs-note">Type your name, or pick a random one.' + Z('输入你的英文名或称呼,也可以随机一个。') + '</p>' +
      '<div class="cp-row"><input id="nm" class="cp-input" maxlength="20" placeholder="e.g. Alex" autocomplete="off"><button class="btn btn-ghost" data-act="rand">🎲 Random' + Z('随机') + '</button></div>' +
      '<div class="cp-card" id="cardprev"></div>' +
      '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" id="join" data-act="join" disabled>Join ' + esc(C.COMPANY) + Z('加入公司') + '</button></div>' +
      '<p class="bs-note" style="margin-top:10px">Saved only in this browser.' + Z('只保存在本机浏览器,不上传。') + '</p></div>';
  }
  function prevName() {
    var v = ((document.getElementById('nm') || {}).value || '').trim();
    var el = document.getElementById('cardprev'), j = document.getElementById('join');
    if (!el) return;
    el.innerHTML = '<span class="cp-av" style="background:hsl(' + hue(v || '?') + ',55%,45%)">' + esc(initial(v || '?')) + '</span><div><b>' + esc(v || 'Your name') + '</b><br><small>' + esc(C.TITLE) + ' · ' + esc(C.COMPANY) + '</small></div>';
    j.disabled = !v;
  }

  // ===== 欢迎信 =====
  function vWelcome() {
    return '<div class="bs-section">' + H('Welcome email' + Z('欢迎邮件')) +
      '<div class="cp-mail"><div class="cp-mail-h"><b>From:</b> Ms. Chen · Team Manager<br><b>To:</b> ' + esc(P.name) + '<br><b>Subject:</b> Welcome to ' + esc(C.COMPANY) + '</div>' +
      '<p>Hi ' + esc(P.name) + ',</p>' +
      '<p>' + bi('Welcome to the Client Services Team. We help companies work with partners in other countries.', '欢迎加入客户服务组。我们帮助企业与不同国家的伙伴合作。') + '</p>' +
      '<p>' + bi('This week you will meet the team, join a client meeting, and work on Project Greenleaf for Sunrise Café Group.', '本周你会认识同事、参加客户会议,并参与客户 Sunrise Café Group 的 Project Greenleaf 项目。') + '</p>' +
      '<p>' + bi('Do not worry about being perfect. Be friendly, be clear, and ask when you are not sure.', '不用追求完美:友好、清楚,不确定就问。') + '</p>' +
      '<p>Ms. Chen</p></div>' +
      '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" data-act="map">Start Chapter 1' + Z('开始第一章') + ' →</button></div>' +
      '<p class="bs-note" style="margin-top:10px">Tip: switch between EN+中 and EN only at the top right.' + Z('右上角可切换 EN+中 / EN only。') + '</p></div>';
  }

  // ===== 地图 =====
  function vMap() {
    var html = '<div class="bs-hero"><div class="bs-title">Career Map</div><p>' + bi('Pick any mission. Each one is a short workplace conversation.', '任选一关。每一关是一段简短的职场沟通。') + '</p></div>' +
      '<div class="bs-section">' + H('Your progress' + Z('你的指标')) + metersHtml() + '</div>';
    CH.forEach(function (c) {
      var ms = MS.filter(function (m) { return m.chapter === c.id; });
      html += '<div class="bs-section">' + H(esc(c.title) + Z(c.zh)) + '<p class="bs-note">Milestone: ' + esc(c.milestone) + Z(c.milestoneZh) + '</p>' + (c.note ? '<p class="bs-note">' + bil(c.note) + '</p>' : '');
      if (!c.ready) { html += '<div class="cp-locked">🔒 Coming soon' + Z('敬请期待') + '</div></div>'; return; }
      html += '<div class="cp-nodes">' + ms.map(function (m) {
        var r = P.progress[m.id], ok = unlocked(m), st = r && r.done ? 'done' : (r && r.decided ? 'doing' : 'new');
        var label = !ok ? '🔒 Locked' : (st === 'done' ? stars(r.stars) : (st === 'doing' ? 'Continue' + Z('继续') : 'Start' + Z('开始')));
        var badge = m.optional ? ' <em class="opt">Optional</em>' : (m.milestone ? ' <em>Milestone</em>' : '');
        return '<button class="cp-node ' + st + (ok ? '' : ' lock') + '" ' + (ok ? 'data-act="open" data-id="' + m.id + '"' : 'disabled') + '><span class="cp-ne">' + m.emoji + '</span><span class="cp-nb"><b>' + tag(m) + ' ' + esc(m.title) + badge + '</b><small>' + esc(m.time) + ' · ~' + m.minutes + ' min' + Z(' · ' + m.zh) + '</small><small>' + esc(m.skill) + '</small></span><span class="cp-ns">' + label + '</span></button>';
      }).join('') + '</div></div>';
    });
    html += '<div class="bs-section">' + H('More' + Z('更多')) + '<div class="rp-actions"><button class="btn btn-ghost" data-act="profile">📁 Career Profile' + Z('职业档案') + '</button>' +
      '<a class="btn btn-ghost" style="text-decoration:none" href="' + BASE + '/business-sim/media/">📣 Media</a><a class="btn btn-ghost" style="text-decoration:none" href="' + BASE + '/business-sim/innovation/">💡 Innovation</a></div></div>';
    return html;
  }

  // ===== 情境卡 =====
  function vBrief() {
    var m = mById(S.mid), n = NPC[m.npc];
    return '<button class="bsim-back" data-act="map">← Map' + Z('返回地图') + '</button>' +
      '<div class="bs-hero"><div class="bs-title">' + tag(m) + ' ' + esc(m.title) + (m.optional ? ' · Optional' : '') + '</div><p>' + esc(m.time) + Z(' · ' + m.zh) + '</p></div>' +
      '<div class="bs-section">' + H('Scene' + Z('情境')) + '<p class="bs-big">' + bi(m.briefing.en, m.briefing.zh) + '</p>' +
      '<div class="cp-npc" style="--c:' + n.color + '"><span class="role-emoji">' + n.emoji + '</span><div><b>' + esc(n.name) + '</b><small>' + esc(npcRole(m.npc)) + Z(' · ' + n.zh) + '</small></div></div></div>' +
      '<div class="bs-section"><div class="bs-problem" style="border-left-color:#2e7d4f;background:#f4fbf6;border-color:#cfe8d6"><div class="q" style="color:#1f5f3a">Your goal' + Z('你的目标') + '</div><div class="bs-big">' + bi(m.briefing.goalEn, m.briefing.goalZh) + '</div></div></div>' +
      '<div class="rp-actions"><button class="btn btn-primary" data-act="decide">Next: Decide' + Z('做决定') + ' →</button></div>';
  }
  function npcRole(id) { return { daniel: 'Senior colleague', chen: 'Your manager', patel: 'Client manager', rivera: 'PrintRight contact', tom: 'Operations', aiko: 'Head of Operations' }[id] || ''; }

  // ===== 决策卡 =====
  function vDecide() {
    var m = mById(S.mid), r = rec(m.id), d = m.decision;
    var html = '<button class="bsim-back" data-act="brief">← Scene' + Z('返回情境') + '</button><div class="bs-section">' + H(bi(d.promptEn, d.promptZh)) +
      '<p class="bs-note">No perfect answer. Every choice has a cost.' + Z('没有唯一正确答案,每个选择都有代价。') + '</p><div class="cp-opts">';
    d.options.forEach(function (o) {
      html += '<button class="cp-opt ' + (r.decided && r.choice === o.id ? 'sel' : '') + '" ' + (r.decided ? 'disabled' : 'data-act="choose" data-id="' + o.id + '"') + '><b>' + o.id + '</b><span>' + bi(o.en, o.zh) + '</span></button>';
    });
    html += '</div>';
    if (r.decided) {
      var o = optOf(m, r.choice);
      html += '<div class="cp-outcome"><div class="q">Result now' + Z('即时结果') + '</div><div class="bs-big">' + bi(o.now.en, o.now.zh) + '</div>' + deltaHtml(o.meters) + '</div>' +
        '<div class="rp-actions" style="margin-top:14px"><button class="btn btn-primary" data-act="speak">Next: Speak' + Z('开口练习') + ' →</button></div>';
    }
    return html + '</div>';
  }
  function deltaHtml(mt) {
    var out = '';
    METERS.forEach(function (k) { var v = (mt || {})[k[0]]; if (v) out += '<span class="cp-delta ' + (v > 0 ? 'up' : 'dn') + '">' + k[1] + ' ' + (v > 0 ? '+' : '') + v + '</span>'; });
    return out ? '<div class="cp-deltas">' + out + '</div>' : '';
  }

  // ===== 口语练习 =====
  var TYPE_DESC = {
    greeting: 'greets the other person', intro: 'introduces themselves', ask: 'asks the other person a question', respond: 'answers the other person\'s question or offer',
    closing: 'ends the conversation politely', open: 'opens politely / gets attention', confirm: 'confirms or repeats key details', clarify: 'asks to clarify',
    thank: 'says thank you', explain: 'explains a conflict or reason', offer: 'offers alternatives or options', followup: 'states a follow-up action', positive: 'says something positive', soft: 'uses softening language',
    interrupt: 'interrupts the other person politely (short, polite expression, one clear point)', hold: 'politely keeps the floor when interrupted (asks to finish or to discuss later)', accept: 'accepts a correction graciously', return: 'steers the conversation back to the main point'
  };
  var GREET_RE = /\b(hello|hi|hey|good (morning|afternoon)|nice to meet)\b/i, CLOSE_RE = /\b(bye|see you|get going|catch up|have a (good|great|nice)|talk (to you )?later|nice (talking|chatting))\b/i;
  function idxPick(en) { for (var i = 0; i < S.picked.length; i++) if (S.picked[i].en === en) return i; return -1; }

  function vSpeak() {
    var m = mById(S.mid), r = rec(m.id), n = NPC[m.npc], sp = m.speak;
    if (!r.chat.length) { r.chat = [{ type: 'sys', text: 'Conversation starts' }, { type: 'ai', text: m.opener.en, zh: m.opener.zh }]; save(); }
    var finished = r.ended || r.round >= sp.maxRounds;
    var roundNow = Math.min(r.round, sp.maxRounds - 1);
    var html = '<button class="bsim-back" data-act="map">← Map' + Z('返回地图') + '</button><div style="--c:' + n.color + '">' +
      '<div class="rp-head"><span class="rp-badge">' + n.emoji + ' Talk with ' + esc(n.name) + '</span><span class="rp-round">' + (finished ? 'Done' + Z('已完成') : 'Round ' + Math.min(r.round + 1, sp.maxRounds) + ' / ' + sp.maxRounds) + (isMock() ? ' (mock' + Z('模拟') + ')' : '') +
      (!finished && r.round >= 2 ? ' · <button class="cp-link" data-act="endearly">End now' + Z('结束') + '</button>' : '') + '</span></div>' +
      '<div class="cp-brief"><div class="cp-brief-line"><b>Goal' + Z('目标') + '</b> ' + bi(m.briefing.goalEn, m.briefing.goalZh) + '</div>' +
      (finished ? '' : '<div class="cp-brief-line"><b>This round' + Z('本轮') + '</b> ' + bi(sp.rounds[roundNow], sp.roundsZh[roundNow]) + '</div>') +
      '<details class="cp-bg"><summary>Background' + Z('背景') + '</summary><p>' + bi(m.briefing.en, m.briefing.zh) + '</p></details></div>' +
      '<div class="cp-chat" id="chat">' + chatHtml(m, r) + '</div>';
    if (finished) {
      html += '<div class="rp-actions"><button class="btn btn-primary" data-act="result">See result' + Z('查看结果') + ' →</button></div>';
    } else {
      var rw = (sp.roundWords && sp.roundWords[r.round]) || [];
      if (!rw.length && sp.wordGroups && sp.wordGroups[0]) rw = [sp.wordGroups[0]];
      html += '<div class="cp-phr' + (S.phrOpen ? ' open' : '') + '" id="phr">' +
        rw.map(function (g) {
          return '<div class="cp-phr-t">' + bil(g.group) + '</div><div class="chips">' + g.items.map(function (it) {
            return '<button class="chip' + (idxPick(it[0]) >= 0 ? ' on' : '') + '" data-act="chip" data-type="' + g.type + '" data-en="' + esc(it[0]) + '" data-zh="' + esc(it[1]) + '">' + esc(it[0]) + '<small>' + esc(it[1]) + '</small></button>';
          }).join('') + '</div>';
        }).join('') +
        '<div class="rp-actions" style="margin-top:8px"><button class="btn btn-ghost" data-act="clear">Clear' + Z('清空') + '</button></div></div>' +
        '<div class="cp-dock"><div class="cp-hint" id="cp-hint">' + hintText() + '</div><div class="cp-dockrow">' +
        '<button class="cp-help" data-act="phr" title="Phrases you can use">Need help?<small>Phrases you can use' + Z('可用句子') + '</small></button>' +
        '<textarea id="say" rows="2" placeholder="' + esc(L('Type or tap the mic… 输入文字,或点麦克风说话')) + '">' + esc(S.draft) + '</textarea>' +
        '<button class="cp-ib mic' + (micOK() ? '' : ' off') + (S.recState === 'rec' ? ' on' : '') + '" id="mic" data-act="mic" title="Speak" aria-label="Speak">' + micIcon() + '</button>' +
        '<button class="cp-send" id="send" data-act="gen"' + (S.busy ? ' disabled' : '') + '>' + (S.busy ? '…' : 'Send') + '</button></div></div>';
    }
    return html + '</div><p class="bs-note" style="margin-top:12px">Say it in your own words. The coach will show a better version.' + Z('用自己的话说,助手会给出更自然的说法。') + '</p>';
  }
  function hintText() {
    if (S.err) return '<span class="cp-err">' + esc(L(S.err)) + '</span>';
    if (S.busy) return esc(NPC[mById(S.mid).npc].name.split(' ')[0]) + ' is replying…' + Z('对方正在回应');
    if (S.recState === 'rec') return '🔴 Listening… tap ⏹ to stop' + Z('正在听写,点 ⏹ 结束');
    return S.hint || '';
  }
  function setHint(t) { S.hint = t; S.err = ''; var el = document.getElementById('cp-hint'); if (el) el.innerHTML = hintText(); }
  var MIC_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>';
  var STOP_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect fill="currentColor" x="7" y="7" width="10" height="10" rx="1.5"/></svg>';
  function micIcon() { return S.recState === 'rec' ? STOP_SVG : MIC_SVG; }

  function chatHtml(m, r) {
    var lastMe = -1;
    r.chat.forEach(function (x, i) { if (x.type === 'me') lastMe = i; });
    var start = lastMe > 0 ? lastMe - 1 : 0, t = 0, older = [], now = [];
    r.chat.forEach(function (x, i) {
      var tr = x.type === 'me' ? r.turns[t++] : null;
      (i < start ? older : now).push(msgHtml(m, x, tr, i === lastMe));
    });
    return (older.length ? '<details class="cp-earlier"><summary>Earlier' + Z('之前的对话') + ' (' + older.length + ')</summary>' + older.join('') + '</details>' : '') + now.join('');
  }
  function sayBtn(text, voice, icon) { return '<button class="cp-say" data-act="say" data-voice="' + esc(voice) + '" data-text="' + esc(text) + '" title="Listen">' + (icon || '🔊') + '</button>'; }
  function voiceOf(id) { return (C.VOICES && C.VOICES[id]) || 'en-US-JennyNeural'; }
  function msgHtml(m, x, tr, isLast) {
    var n = NPC[m.npc];
    if (x.type === 'sys') return '<div class="msg-sys">' + esc(x.text) + '</div>';
    if (x.type === 'ai') return '<div class="msg" style="--c:' + n.color + '"><div class="msg-who">' + n.emoji + ' ' + esc(n.name) + ' ' + sayBtn(x.text, voiceOf(m.npc)) + '</div><div class="msg-bubble">' + (x.zh ? bi(x.text, x.zh) : esc(x.text)) + '</div></div>';
    var replay = tr && clipUrls[m.id + '#' + tr.round] ? '<button class="cp-say" data-act="replay" data-key="' + m.id + '#' + tr.round + '" title="Play your recording">▶</button>' : '';
    return '<div class="cp-pair"' + (isLast ? ' id="cp-last"' : '') + '><div class="msg me" style="--c:#2c6bac"><div class="msg-who">You · ' + esc(P.name) + ' ' + replay + '</div><div class="msg-bubble">' + esc(x.text) + '</div></div>' +
      (tr && tr.improved && tr.improved.text ? impHtml(tr.improved) : '') + '</div>' + (tr ? studyHtml(tr) : '');
  }
  function impHtml(im) {
    var notes = (im.notes || []).map(function (k) { return '<div class="cp-imp-n">' + esc(k.change || '') + (k.why ? '<span class="zhx"> — ' + esc(k.why) + '</span>' : '') + '</div>'; }).join('');
    return '<div class="cp-imp"><div class="cp-imp-h">Improved answer' + Z('更自然的说法') + ' ' + sayBtn(im.text, voiceOf('coach'), '▶') + '</div><div class="cp-imp-t">' + esc(im.text) + '</div>' + notes + '</div>';
  }
  function studyHtml(t) {
    var kp = (t.keyPhrases || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + (k.note ? '(' + esc(k.note) + ')' : '') + '</span></li>'; }).join('');
    var pt = (t.patterns || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + '</span></li>'; }).join('');
    if (!kp && !pt && !t.toneFeedback) return '';
    return '<details class="study-d"><summary>Notes' + Z('学习笔记') + '</summary><div class="study"><div class="study-h">Key phrases' + Z('关键词') + '</div><ul>' + (kp || '<li>—</li>') + '</ul><div class="study-h">Patterns' + Z('句式') + '</div><ul>' + (pt || '<li>—</li>') + '</ul>' +
      (t.toneFeedback ? '<div class="study-h">Tone' + Z('语气') + '</div><p class="zhx" style="margin:0">' + esc(t.toneFeedback) + '</p>' : '') + '</div></details>';
  }

  // ===== LLM(沿用 llm-proxy: POST {system,user} -> {content}) =====
  function checkKeys(m) {
    var keys = {}, sp = m.speak;
    sp.targetTypes.concat(sp.starTypes).forEach(function (k) { keys[k] = 1; });
    sp.wordGroups.forEach(function (g) { keys[g.type] = 1; });
    return Object.keys(keys).filter(function (k) { return TYPE_DESC[k]; });
  }
  function buildPrompt(m, r, text) {
    var n = NPC[m.npc], opt = optOf(m, r.choice), last = r.round + 1 === m.speak.maxRounds, ck = checkKeys(m);
    var system = 'You are a business English coach running a short workplace role-play for Chinese university students (CEFR B1-B2). Keep language simple and natural.\n' +
      'Company: ' + C.COMPANY + ' (international consulting). Project: Greenleaf for Sunrise Cafe Group. Do not use specialist industry knowledge.\n' +
      'Scene: ' + m.briefing.en + ' Time: ' + m.time + '.\n' +
      'The student plays ' + P.name + ', a ' + roleTitle() + '. The AI plays ' + n.name + ' (' + m.npcStance + ').\n' +
      'The student chose this strategy: "' + (opt ? opt.en : '') + '".\n' +
      'Task this round: ' + m.speak.rounds[r.round] + '\n' +
      (m.speak.roundNpc && m.speak.roundNpc[r.round] ? 'NPC requirement this round: ' + m.speak.roundNpc[r.round] + '\n' : '') +
      'The student\'s own words (typed or from speech recognition, may contain errors) are given by the user. Do NOT replace them with a long speech.\n' +
      '1) "npcReply": reply as ' + n.name + ' in 1-2 short sentences (2-3 if the NPC requirement needs it), natural even if the student\'s English is imperfect; if the student\'s line is empty or off-topic, politely ask again' + (last ? '; final round: bring the conversation to a natural close' : '') + '.\n' +
      '2) "improved": rewrite the student\'s line into a more natural, polite version that keeps THEIR meaning (1-3 short sentences, B1-B2). If it is already good, change it only slightly. "notes": up to 2 items, change = what you changed (English), why = short reason in Chinese.\n' +
      '3) "checks": which of these the student\'s ORIGINAL line actually does: ' + ck.map(function (k) { return k + ' = ' + TYPE_DESC[k]; }).join('; ') + '. Return only keys that apply.\n' +
      'Return ONLY JSON: {"npcReply": string, "improved": {"text": string, "notes": [{"change": string, "why": string}]}, "keyPhrases": [{"en": string, "zh": string, "note": string}], "patterns": [{"en": string, "zh": string}], "checks": [string], "toneFeedback": string (optional, one short Chinese sentence)}. keyPhrases = 2-3 useful phrases from the improved answer with Chinese meaning and a short Chinese tip; patterns = 1-2 reusable sentence frames with ___ and Chinese explanation.';
    var hist = r.chat.filter(function (x) { return x.type !== 'sys'; }).slice(-6).map(function (x) { return (x.type === 'me' ? P.name + ' (student)' : n.name) + ': ' + x.text; }).join('\n');
    var user = 'Round ' + (r.round + 1) + ' of ' + m.speak.maxRounds + '.\nConversation so far:\n' + hist + '\n\nStudent says now:\n' + text;
    return { system: system, user: user };
  }
  function mockGenerate(m, r, text) {
    var t = text.replace(/\s+/g, ' ').trim(), fixed = t.charAt(0).toUpperCase() + t.slice(1);
    if (!/[.!?]$/.test(fixed)) fixed += '.';
    var checks = [];
    if (/\?/.test(t)) checks.push('ask');
    if (GREET_RE.test(t)) checks.push('greeting');
    if (CLOSE_RE.test(t)) checks.push('closing');
    return { npcReply: m.mockReplies[r.round % m.mockReplies.length], improved: { text: fixed, notes: [{ change: 'Capital letter and full stop', why: '注意句首大写和句末标点(模拟模式)' }] },
      keyPhrases: [], patterns: [{ en: 'Just to confirm, ___?', zh: '确认一下,…?' }], checks: checks };
  }
  function parseLLM(raw) {
    var s = String(raw).replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
    var o = JSON.parse(s);
    if (!o || (typeof o.npcReply !== 'string' && !(o.colleagueReplies && o.colleagueReplies[0]))) throw new Error('bad format');
    return o;
  }
  function llmGenerate(m, r, text) {
    var p = buildPrompt(m, r, text);
    function once() {
      return fetch(C.LLM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
        .then(function (x) { return x.json().then(function (d) { if (!x.ok) throw new Error(d.error || ('HTTP ' + x.status)); return d; }); })
        .then(function (d) { return parseLLM(d.content); });
    }
    return once().catch(function (e) { if (e instanceof SyntaxError || e.message === 'bad format') return once(); throw e; });
  }
  function generate() {
    var m = mById(S.mid), r = rec(m.id), text = (S.draft || '').replace(/\s+/g, ' ').trim();
    if (S.busy || S.recState) return;
    if (!text) { setHint('Say or type something first.' + Z('请先说话或输入文字。')); return; }
    stopPlayer(); S.busy = true; S.err = ''; render();
    var job = isMock() ? Promise.resolve(mockGenerate(m, r, text)) : llmGenerate(m, r, text);
    job.then(function (res) {
      var reply = res.npcReply || ((res.colleagueReplies || [])[0] || {}).text || '';
      var im = res.improved && res.improved.text ? res.improved : (res.speech ? { text: res.speech, notes: [] } : null);
      var types = {};
      (res.checks || []).forEach(function (k) { types[k] = 1; });
      var low = text.toLowerCase();
      S.picked.forEach(function (p) { if (low.indexOf(p.en.toLowerCase().replace(/[?.!,]/g, '').slice(0, 12)) >= 0) types[p.type] = 1; });
      var turnNo = r.round + 1;
      if (!S.pendingClip && S.lastChunks && S.lastChunks.length) S.pendingClip = new Blob(S.lastChunks, { type: S.lastMime || 'audio/webm' });
      if (S.pendingClip) {
        var ck = m.id + '#' + turnNo;
        if (clipUrls[ck]) URL.revokeObjectURL(clipUrls[ck]);
        clipUrls[ck] = URL.createObjectURL(S.pendingClip);
        S.pendingClip = null; S.lastChunks = null;
      }
      r.turns.push({ round: turnNo, picked: S.picked.slice(), speech: text, improved: im, keyPhrases: res.keyPhrases || [], patterns: res.patterns || [], toneFeedback: res.toneFeedback || '', types: Object.keys(types) });
      r.chat.push({ type: 'me', text: text });
      if (reply) r.chat.push({ type: 'ai', text: reply });
      r.round++; S.picked = []; S.draft = ''; S.busy = false; S.hint = ''; S.scrollLast = true;
      if (r.round >= m.speak.maxRounds) r.ended = true;
      save(); render();
    }).catch(function (e) {
      S.busy = false; S.err = 'Failed: ' + (e.message || e) + '. Your text is kept. Tap Send to try again.' + ' 生成失败,文字已保留,请再点发送。'; render();
    });
  }

  // ===== 朗读(沿用 tts 代理;点击才播放,不自动播放) =====
  var clipUrls = {};
  var SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  var player = { audio: null, btn: null, url: null }, ttsCache = {};
  function stopPlayer() {
    if (player.audio) { player.audio.onended = null; try { player.audio.pause(); } catch (e) {} }
    if (player.url && !player.keep) URL.revokeObjectURL(player.url);
    if (player.btn) player.btn.classList.remove('on');
    player.audio = null; player.btn = null; player.url = null; player.keep = false;
  }
  function fetchTts(text, voice) {
    var body = JSON.stringify({ text: text, voice: voice, rate: '0.9', format: 'mp3', sample_rate: 16000 });
    function once(i) {
      if (i >= C.TTS_ENDPOINTS.length) return Promise.reject(new Error('tts'));
      return fetch(C.TTS_ENDPOINTS[i], { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body }).then(function (x) {
        return x.blob().then(function (blob) {
          var type = (x.headers.get('content-type') || '').toLowerCase();
          if (!x.ok || !blob || blob.size < 200 || type.indexOf('json') >= 0) throw new Error('bad audio');
          return blob;
        });
      }).catch(function () { return once(i + 1); });
    }
    return once(0);
  }
  function sayText(text, voice, btn) {
    if (player.btn === btn) { stopPlayer(); return; }
    stopPlayer();
    var audio = new Audio(SILENT);                         // 在点击手势内先“解锁”(微信/iOS 需要)
    var up = audio.play(); if (up && up.catch) up.catch(function () {});
    player.audio = audio; player.btn = btn; btn.classList.add('on');
    var key = voice + '|' + text, label = btn.textContent;
    function play(blob) {
      if (player.audio !== audio) return;
      player.url = URL.createObjectURL(blob);
      audio.src = player.url; audio.onended = function () { stopPlayer(); };
      audio.play().catch(function () { stopPlayer(); setHint('Tap the speaker again to play.' + Z('请再点一次喇叭播放。')); });
    }
    if (ttsCache[key]) { play(ttsCache[key]); return; }
    btn.textContent = '…';
    fetchTts(text, voice).then(function (blob) { ttsCache[key] = blob; btn.textContent = label; play(blob); })
      .catch(function () { btn.textContent = label; stopPlayer(); setHint('The voice did not play. Try again.' + Z('声音没有播放出来,请重试。')); });
  }
  function playReplay(key, btn) {
    var url = clipUrls[key];
    if (!url) return;
    if (player.btn === btn) { stopPlayer(); return; }
    stopPlayer();
    var audio = new Audio(url);
    player.audio = audio; player.btn = btn; player.keep = true; btn.classList.add('on');
    audio.onended = function () { stopPlayer(); };
    audio.play().catch(function () { stopPlayer(); setHint('Tap play again.' + Z('请再点一次播放。')); });
  }

  // ===== 语音输入:沿用旧版做法,用浏览器自带的 SpeechRecognition(不调用任何接口,不保存录音) =====
  var recSess = null;
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function micOK() { return !!SR; }
  function setRecState(s) {
    S.recState = s;
    var mic = document.getElementById('mic');
    if (mic) { mic.innerHTML = micIcon(); mic.classList.toggle('on', s === 'rec'); }
    var h = document.getElementById('cp-hint'); if (h) h.innerHTML = hintText();
  }
  function startRec() {
    if (S.busy || S.recState) return;
    if (!micOK()) { setHint('Voice input needs Chrome. Or type your answer.' + Z('语音输入需要 Chrome 等浏览器;也可以直接打字。')); return; }
    stopPlayer();
    var rec = new SR(), base = S.draft ? S.draft.trim() + ' ' : '', sess = { rec: rec, stopped: false, timer: null, mr: null, stream: null, chunks: [] };
    function armRecorder(stream) {
      if (!stream || !window.MediaRecorder) { if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      try {
        var mr = new MediaRecorder(stream);
        sess.mr = mr; sess.stream = stream;
        mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) sess.chunks.push(ev.data); };
        mr.onstop = function () {
          S.lastMime = mr.mimeType || 'audio/webm';
          if (sess.chunks.length) S.pendingClip = new Blob(sess.chunks, { type: S.lastMime });
          stream.getTracks().forEach(function (t) { t.stop(); });
        };
        mr.start(250);
        S.lastChunks = sess.chunks; S.lastMime = '';
      } catch (eRec) { stream.getTracks().forEach(function (t) { t.stop(); }); }
    }
    rec.lang = 'en-US'; rec.continuous = true; rec.interimResults = true;
    rec.onresult = function (e) {
      var fin = '', interim = '';
      for (var i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript + ' '; else interim += e.results[i][0].transcript; }
      S.draft = (base + fin + interim).replace(/\s+/g, ' ').trim();
      var ta = document.getElementById('say'); if (ta) ta.value = S.draft;
    };
    rec.onerror = function (ev) {
      if (!ev || ev.error === 'no-speech' || ev.error === 'aborted') return;
      sess.stopped = true; clearTimeout(sess.timer); recSess = null; setRecState(null);
      setHint((ev.error === 'not-allowed' ? 'Please allow the microphone, or type your answer.' : 'Voice did not work (' + esc(ev.error) + '). Please type your answer.') + Z('语音不可用,请允许麦克风或直接打字。'));
    };
    rec.onend = function () { if (!sess.stopped && recSess === sess) { try { rec.start(); } catch (e2) {} } };
    function goRec() {
      try { rec.start(); } catch (e3) { setHint('Voice did not start. Please type your answer.' + Z('语音没有启动,请直接打字。')); return; }
      recSess = sess; setRecState('rec');
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) { armRecorder(stream); goRec(); }).catch(function () { goRec(); });
    } else goRec();
    sess.timer = setTimeout(function () { if (recSess === sess) stopRec(false); }, 60000);
  }
  function stopRec(silent) {
    var sess = recSess; if (!sess) return;
    recSess = null; clearTimeout(sess.timer); sess.stopped = true;
    try { sess.rec.stop(); } catch (e0) {}
    if (sess.mr && sess.mr.state !== 'inactive') { try { sess.mr.stop(); } catch (e1) {} }
    else if (silent && sess.stream) { sess.stream.getTracks().forEach(function (t) { t.stop(); }); if (silent) S.pendingClip = null; }
    S.recState = null;
    if (silent) return;
    setRecState(null);
    setHint(S.draft ? 'Check the text, edit if needed, then tap Send.' + Z('检查文字,需要可修改,再点 Send。') : 'I could not hear that. Try again or type.' + Z('没听清,请重试或直接打字。'));
  }

  // ===== 星级与结果 =====
  function calcStars(m, r) {
    if (r.turns.length < 2) return 0;
    if (!r.decided) return 1;
    var all = {};
    r.turns.forEach(function (t) { (t.types || []).forEach(function (k) { all[k] = 1; }); });
    var hit = m.speak.targetTypes.filter(function (x) { return all[x]; }).length, s = hit >= 2 ? 2 : 1;
    var lastTurn = r.turns[r.turns.length - 1], lastEnds = lastTurn && (lastTurn.types || []).some(function (k) { return k === 'closing' || k === 'followup'; });
    var star3 = m.speak.starTypes.some(function (x) { return all[x]; });
    if (s === 2 && star3 && lastEnds) s = 3;
    return s;
  }
  function vResult() {
    var m = mById(S.mid), r = rec(m.id), o = optOf(m, r.choice);
    r.stars = calcStars(m, r); r.done = true; save();
    var html = '<div class="bs-hero"><div class="bs-title">' + stars(r.stars) + ' &nbsp;' + tag(m) + ' ' + esc(m.title) + '</div><p>' + (m.optional ? 'Optional debrief done' + Z('可选复盘已完成') : 'Mission complete' + Z('关卡完成')) + '</p></div>' +
      '<div class="bs-section">' + H('What happened' + Z('发生了什么')) +
      '<div class="cp-outcome"><div class="q">Now' + Z('即时') + '</div><div class="bs-big">' + bi(o.now.en, o.now.zh) + '</div>' + deltaHtml(o.meters) + '</div>' +
      '<div class="cp-outcome later"><div class="q">Later' + Z('延迟后果') + '</div><div class="bs-big">' + bi(o.later.en, o.later.zh) + '</div></div>' +
      '<div class="cp-outcome strat"><div class="q">Why' + Z('策略反馈') + '</div><div class="bs-big">' + bi(o.strategy.en, o.strategy.zh) + '</div></div></div>' +
      '<div class="bs-section">' + H('Your lines' + Z('你的发言')) + r.turns.map(function (t) { return '<div class="msg me" style="--c:#2c6bac;max-width:100%"><div class="msg-who">Round ' + t.round + (clipUrls[m.id + '#' + t.round] ? ' <button class="cp-say" data-act="replay" data-key="' + m.id + '#' + t.round + '" title="Play your recording">▶</button>' : '') + '</div><div class="msg-bubble">' + esc(t.speech) + '</div></div>' + (t.improved && t.improved.text ? '<div class="cp-imp"><div class="cp-imp-h">Improved answer' + Z('更自然的说法') + ' ' + sayBtn(t.improved.text, voiceOf('coach'), '▶') + '</div><div class="cp-imp-t">' + esc(t.improved.text) + '</div></div>' : ''); }).join('') + '</div>' +
      '<div class="bs-section">' + H('Language support' + Z('语言支持')) + '<p>' + (r.zhMode ? 'Chinese support used (EN+中)' + Z('本关用过中文支持') : '🏅 <b>Full English</b>' + Z('全英文通关')) + '</p></div>' +
      '<div class="bs-section">' + H('Team Lab · offline task' + Z('线下任务')) + '<div class="bs-box"><p>' + bi(m.offline.en, m.offline.zh) + '</p><p class="bs-note">Observe: ' + esc(m.offline.watch) + '</p><p class="bs-note">Discuss: ' + esc(m.offline.discuss) + '</p></div></div>' +
      '<div class="bs-section">' + H('This mission' + Z('本关变化')) + deltaHtml(o.meters) + '</div>' +
      '<div class="bs-section">' + H('Your meters' + Z('累计指标')) + metersHtml() + '</div>';
    var nx = MS.filter(function (x) { return x.order === m.order + 1 && x.chapter === m.chapter; })[0];
    html += '<div class="rp-actions"><button class="btn btn-dl" data-act="dl">⬇ Download' + Z('下载学习资料') + '</button><button class="btn btn-ghost" data-act="copysum">📋 Copy summary' + Z('复制摘要') + '</button><button class="btn btn-ghost" data-act="retry">↻ Replay' + Z('重玩本关') + '</button>' +
      (nx && unlocked(nx) ? '<button class="btn btn-primary" data-act="open" data-id="' + nx.id + '">Next mission' + Z('下一关') + ' →</button>' : '') + '<button class="btn btn-primary" data-act="map">Map' + Z('地图') + '</button></div><div class="rp-err" id="cpmsg"></div>';
    return html;
  }

  // ===== 档案 =====
  function vProfile() {
    var rows = MS.map(function (m) { var r = P.progress[m.id]; return '<tr><td>' + tag(m) + ' ' + esc(m.title) + (m.optional ? ' (optional)' : '') + '</td><td>' + (r && r.done ? stars(r.stars) : '—') + '</td><td>' + (r && r.decided ? esc(r.choice) : '—') + '</td><td>' + (r && r.done ? (r.zhMode ? 'Yes' : 'No') : '—') + '</td></tr>'; }).join('');
    return '<button class="bsim-back" data-act="map">← Map' + Z('返回地图') + '</button><div class="bs-section">' + H('Career Profile' + Z('职业档案')) +
      '<div class="cp-card"><span class="cp-av" style="background:hsl(' + hue(P.name) + ',55%,45%)">' + esc(initial(P.name)) + '</span><div><b>' + esc(P.name) + '</b><br><small>' + esc(C.TITLE) + ' · ' + esc(C.COMPANY) + '</small></div></div>' + metersHtml() +
      '<table class="bs-table"><tr><th>Mission</th><th>Stars</th><th>Choice</th><th>EN+中 used</th></tr>' + rows + '</table>' +
      '<div class="rp-actions"><button class="btn btn-ghost" data-act="resetall">Restart career' + Z('重新开始') + '</button></div></div>';
  }

  // ===== 下载 / 摘要 =====
  function summary(m, r) {
    var o = optOf(m, r.choice);
    return 'Career Path · ' + m.title + ' (' + tag(m) + ')\nPlayer: ' + P.name + ' | Stars: ' + stars(r.stars) + ' | Choice: ' + r.choice + ' (' + (o ? o.en : '') + ')\nEN+中 used: ' + (r.zhMode ? 'yes' : 'no') + '\nMy lines:\n' + r.turns.map(function (t) { return '  R' + t.round + ': ' + t.speech + (t.improved && t.improved.text ? '\n      Improved: ' + t.improved.text : ''); }).join('\n');
  }
  function download() {
    var m = mById(S.mid), r = rec(m.id), o = optOf(m, r.choice), n = NPC[m.npc], L_ = [];
    L_.push('# Career Path - ' + tag(m) + ' ' + m.title + ' ' + m.zh, '', 'Player: ' + P.name + ' (' + roleTitle() + ', ' + C.COMPANY + ')', 'Date: ' + new Date().toLocaleString(), 'Stars: ' + stars(r.stars), 'EN+中 used: ' + (r.zhMode ? 'yes' : 'no'), '', '## Scene', m.briefing.en, m.briefing.zh, '', '## Decision', 'You chose ' + r.choice + ': ' + (o ? o.en + ' / ' + o.zh : ''), 'Now: ' + (o ? o.now.en : ''), 'Later: ' + (o ? o.later.en : ''), 'Why: ' + (o ? o.strategy.en + ' / ' + o.strategy.zh : ''), '', '## Conversation', '');
    var ti = 0;
    r.chat.forEach(function (x) {
      if (x.type === 'sys') return;
      if (x.type === 'ai') { L_.push('**' + n.name + ':** ' + x.text, ''); return; }
      var t = r.turns[ti++]; L_.push('### Round ' + t.round, 'Chosen: ' + t.picked.map(function (p) { return p.en; }).join(' | '), '', '**' + P.name + ':** ' + t.speech, '', '*Improved:* ' + (t.improved ? t.improved.text : ''), '');
      (t.keyPhrases || []).forEach(function (k) { L_.push('- ' + k.en + ' - ' + k.zh + (k.note ? ' (' + k.note + ')' : '')); });
      (t.patterns || []).forEach(function (k) { L_.push('- [pattern] ' + k.en + ' - ' + k.zh); });
      L_.push('');
    });
    L_.push('---', '', '# Phrasebank', '');
    m.speak.phrasebank.forEach(function (g) { L_.push('## ' + g.group, ''); g.items.forEach(function (it) { L_.push('- ' + it[0] + ' - ' + it[1]); }); L_.push(''); });
    var blob = new Blob(['\ufeff' + L_.join('\n')], { type: 'text/markdown;charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'career-path-' + m.id + '-' + P.name + '.md';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function flash(t) { var el = document.getElementById('cpmsg'); if (el) { el.style.color = '#2e7d4f'; el.textContent = t; } }

  // ===== 事件 =====
  root.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
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
        var en = el.getAttribute('data-en'), piece = en.replace(/\s*\.\.\.$/, ''), i = idxPick(en);
        if (i >= 0) { S.picked.splice(i, 1); S.draft = S.draft.replace(piece, '').replace(/\s+/g, ' ').trim(); }
        else { S.picked.push({ type: el.getAttribute('data-type'), en: en, zh: el.getAttribute('data-zh') }); S.draft = ((S.draft ? S.draft.trim() + ' ' : '') + piece).trim(); }
        el.classList.toggle('on', i < 0);
        var ta1 = document.getElementById('say'); if (ta1) { ta1.value = S.draft; ta1.focus(); }
        break;
      case 'clear':
        S.picked = []; S.draft = '';
        Array.prototype.forEach.call(root.querySelectorAll('.chip.on'), function (c) { c.classList.remove('on'); });
        var ta2 = document.getElementById('say'); if (ta2) ta2.value = '';
        break;
      case 'phr': S.phrOpen = !S.phrOpen; var ph = document.getElementById('phr'); if (ph) ph.classList.toggle('open', S.phrOpen); break;
      case 'replay': playReplay(el.getAttribute('data-key'), el); break;
      case 'mic': if (S.recState === 'rec') stopRec(false); else startRec(); break;
      case 'say': sayText(el.getAttribute('data-text'), el.getAttribute('data-voice'), el); break;
      case 'gen': generate(); break;
      case 'endearly': if (confirm(L('End the conversation now? 现在结束对话?'))) { var r2 = rec(m.id); r2.ended = true; save(); render(); } break;
      case 'result': go('result'); break;
      case 'copy':
        var tx = el.getAttribute('data-en'), done = function () { el.classList.add('copied'); setTimeout(function () { el.classList.remove('copied'); }, 900); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tx).then(done, done); else done(); break;
      case 'dl': download(); break;
      case 'copysum':
        var st = summary(m, rec(m.id)), ok = function () { flash(L('Copied 已复制')); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(st).then(ok, function () { window.prompt('Copy:', st); }); else window.prompt('Copy:', st); break;
      case 'retry': if (confirm(L('Replay this mission? Your record for it will be cleared. 重玩会清除本关记录。'))) { delete P.progress[m.id]; save(); S.picked = []; S.draft = ''; go('brief'); } break;
      case 'profile': go('profile'); break;
      case 'resetall': if (confirm(L('Clear all progress and restart? 清除所有进度并重新开始?'))) { localStorage.removeItem(PKEY); P = null; S.mid = null; go('name'); } break;
    }
  });
  function updPicked() { var pc = document.getElementById('pcount'); if (pc) pc.textContent = S.picked.length ? '(' + S.picked.length + ')' : ''; }
  root.addEventListener('input', function (e) { if (e.target.id === 'nm') prevName(); if (e.target.id === 'say') S.draft = e.target.value; });
  root.addEventListener('keydown', function (e) { if (e.target.id === 'nm' && e.key === 'Enter') { var j = document.getElementById('join'); if (j && !j.disabled) j.click(); } });

  // 启动
  if (P && P.name) { P.progress = P.progress || {}; S.view = P.welcomed ? 'map' : 'welcome'; }
  render();
  if (S.view === 'name') prevName();
})();
