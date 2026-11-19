/* Chapter 1: Onboarding Week 入职周 — 关卡数据(内容与引擎分离,新增关卡只改这里) */
window.BSIM_CHAPTERS = [
  { id: 1, title: 'Chapter 1 · Junior Employee', zh: '新人职员', milestone: 'Onboarding Week', milestoneZh: '入职周:建立基本可信度', ready: true },
  { id: 2, title: 'Chapter 2 · Associate', zh: '资深专员', milestone: 'First Client Task', milestoneZh: '独立处理一个小客户请求', ready: false },
  { id: 3, title: 'Chapter 3 · Project Coordinator', zh: '项目协调人', milestone: 'Cross-team Project', milestoneZh: '协调一次跨部门项目', ready: false }
];

window.BSIM_NPCS = {
  daniel: { name: 'Daniel Wu', zh: '资深同事', emoji: '☕', color: '#c0602b' },
  chen: { name: 'Ms. Chen', zh: '直属上司', emoji: '📋', color: '#2c6bac' },
  patel: { name: 'Mr. Patel', zh: '客户主管', emoji: '🤝', color: '#2e7d4f' }
};

window.BSIM_MISSIONS = [
  /* ---------- M1.1 ---------- */
  {
    id: 'm1_1', chapter: 1, order: 1, emoji: '☕', title: 'Coffee Corner', zh: '咖啡角初次闲聊',
    time: 'Monday, 8:50 a.m.', minutes: 12, skill: 'Small talk · Self-introduction',
    npc: 'daniel',
    npcStance: 'friendly senior colleague who likes coffee and chatting; busy, but happy to help newcomers',
    opener: { en: "Hey, you must be new here. I'm Daniel. Want some coffee?", zh: '嘿,你一定是新来的。我是 Daniel。要咖啡吗?' },
    briefing: {
      en: "It is your first day at Nova Bridge. You walk into the Coffee Corner. A senior colleague, Daniel, is making coffee. The team meeting starts in 10 minutes.",
      zh: '入职第一天,你走进咖啡角。资深同事 Daniel 正在冲咖啡。10 分钟后团队晨会开始。',
      goalEn: 'Make a friendly first impression. Learn one useful thing about the team.',
      goalZh: '给 Daniel 留下友好的第一印象,并了解一条团队信息。'
    },
    decision: {
      promptEn: 'How do you start?', promptZh: '你怎么开场?',
      options: [
        { id: 'A', en: 'Smile, say hello, introduce yourself, and ask his name.', zh: '微笑问好,自我介绍,并问他的名字。',
          now: { en: 'Daniel smiles and chats with you warmly.', zh: 'Daniel 热情地和你聊起来。' }, meters: { relationships: 4, communication: 2 },
          later: { en: 'Daniel will help you on Wednesday.', zh: '周三 Daniel 会主动帮你。' }, flag: 'friendlyWithDaniel',
          strategy: { en: 'Greeting + name + question is a safe, warm opening. Watch the time: it should stay short.', zh: '问候+名字+一个问题是安全又温暖的开场;注意时间,别聊太久。' } },
        { id: 'B', en: 'Ask where the meeting room is. Keep it about work.', zh: '直接问会议室在哪,话题只围绕工作。',
          now: { en: 'Daniel answers quickly. It is efficient, but a little cold.', zh: 'Daniel 很快回答了,高效但有点冷。' }, meters: { communication: 2 },
          later: { en: 'Daniel remembers you as "the quiet new person".', zh: 'Daniel 会觉得你是“比较安静的新人”。' },
          strategy: { en: 'Efficient when you are short of time, but you miss a chance to build rapport.', zh: '时间紧时可行,但错过了拉近关系的机会。' } },
        { id: 'C', en: 'Ask about salary and overtime right away.', zh: '一上来就问工资和加班。',
          now: { en: 'Daniel looks surprised. The mood becomes awkward.', zh: 'Daniel 有点吃惊,气氛变得尴尬。' }, meters: { reputation: -3, relationships: -2 },
          later: { en: 'Daniel jokes about you being "very direct" to others.', zh: 'Daniel 会跟别人开玩笑说你“很直接”。' },
          strategy: { en: 'Pay and overtime are sensitive topics for a first chat. Wait until you know people better.', zh: '薪资、加班是初次闲聊的敏感话题,等熟悉后再问。' } }
      ]
    },
    speak: {
      maxRounds: 3,
      rounds: ['Greet Daniel and introduce yourself.', 'Answer his small talk and ask him one question.', 'End the chat politely.'],
      roundsZh: ['问候 Daniel 并自我介绍。', '回应闲聊并问他一个问题。', '礼貌地结束对话。'],
      targetTypes: ['greeting', 'ask', 'closing'], starTypes: ['ask'],
      wordGroups: [
        { group: 'Greeting 问候', type: 'greeting', items: [['Good morning', '早上好'], ['Nice to meet you', '很高兴认识你'], ["How's your morning going?", '早上过得怎样?']] },
        { group: 'About me 自我介绍', type: 'intro', items: [["I'm", '我是'], ['I just joined the team', '我刚加入团队'], ["I'm still finding my way around", '还在熟悉环境']] },
        { group: 'Asking 提问', type: 'ask', items: [['What about you?', '你呢?'], ['How long have you been here?', '你来多久了?'], ['Any tips for a newcomer?', '对新人有什么建议?']] },
        { group: 'Responding 回应', type: 'respond', items: [['That sounds great', '听起来不错'], ['Thanks for telling me', '谢谢告诉我'], ['Same here', '我也是']] },
        { group: 'Closing 收尾', type: 'closing', items: [['I should get going', '我该走了'], ["Let's catch up later", '回头再聊'], ['It was great chatting with you', '聊得很开心']] }
      ],
      phrasebank: [
        { group: 'Starting a chat 开始闲聊', items: [["Hi, I'm … It's my first day.", '你好,我是…今天第一天上班。'], ['Is it OK if I join you?', '我可以和你一起吗?']] },
        { group: 'Keeping it going 保持话题', items: [['Oh really? Tell me more.', '是吗?多说说。'], ['That reminds me…', '这让我想起…'], ['How was your weekend?', '周末过得怎么样?']] },
        { group: 'Ending politely 礼貌收尾', items: [['I should get going. The meeting is about to start.', '我该走了,会议快开始了。'], ['Nice talking to you. See you later!', '很高兴聊天,回头见!']] }
      ]
    },
    mockReplies: ["Nice to meet you! I've been here about three years. How are you finding it so far?", 'Sounds good. The coffee here is not bad, by the way. Did you come by metro today?', 'Of course, no problem. The meeting is in Room 5. See you there!'],
    offline: {
      en: 'Pair task (5 min): A is you, B is Daniel. Chat for 30 seconds, then end the chat naturally.',
      zh: '双人任务(5 分钟):A 扮演你,B 扮演 Daniel。闲聊 30 秒后自然收尾。',
      watch: 'Did they ask a question? Did they listen? Was the ending polite?',
      discuss: 'What topics are OK for small talk at work? What topics should we avoid?'
    },
    unlock: { requires: [] }
  },

  /* ---------- M1.2 ---------- */
  {
    id: 'm1_2', chapter: 1, order: 2, emoji: '🛗', title: 'In the Elevator', zh: '电梯里遇到上司',
    time: 'Tuesday, 9:05 a.m.', minutes: 10, skill: 'Short greeting · Knowing when to stop',
    npc: 'chen',
    npcStance: 'efficient and polite team manager; always short of time; likes people who are brief and positive',
    opener: { en: 'Good morning. How was your first day yesterday?', zh: '早上好。昨天第一天感觉怎么样?' },
    briefing: {
      en: 'You are in the elevator. Only you and Ms. Chen, your manager, are inside. It is a 30-second ride to the 12th floor.',
      zh: '电梯里只有你和上司 Chen 女士,到 12 楼要约 30 秒。',
      goalEn: 'Be friendly but brief. Leave a good impression in 30 seconds.',
      goalZh: '友好但简短,在 30 秒内留下好印象。'
    },
    decision: {
      promptEn: 'What do you do?', promptZh: '你怎么做?',
      options: [
        { id: 'A', en: 'Greet her and say one short, positive thing.', zh: '问好,再说一句简短积极的话。',
          now: { en: 'Ms. Chen smiles. The ride feels comfortable.', zh: 'Chen 女士笑了,气氛很自然。' }, meters: { relationships: 3, communication: 3 },
          later: { en: 'Ms. Chen is more open to your questions on Wednesday.', zh: '周三 Chen 女士更愿意回答你的问题。' }, flag: 'goodImpressionChen',
          strategy: { en: 'Short, warm and well-timed. This is the best fit for a 30-second chance.', zh: '简短、温暖、合时宜,最适合 30 秒的机会。' } },
        { id: 'B', en: 'Just nod and smile. Say nothing.', zh: '只点头微笑,不说话。',
          now: { en: 'It is polite, but a little distant.', zh: '很礼貌,但有点疏远。' }, meters: { communication: -1 },
          later: { en: 'Ms. Chen does not know much about you yet.', zh: 'Chen 女士对你还不太了解。' },
          strategy: { en: 'Safe, but silence can look shy. A short greeting costs nothing.', zh: '稳妥,但沉默容易显得害羞;一句问候几乎没有成本。' } },
        { id: 'C', en: 'Use the time to give a long work update.', zh: '趁机做一个冗长的工作汇报。',
          now: { en: 'Ms. Chen looks at her watch. The doors open before you finish.', zh: 'Chen 女士看了看表,你还没说完电梯就开了。' }, meters: { reliability: 1, relationships: -2 },
          later: { en: 'She says: "Send me a short email next time."', zh: '她说:“下次发邮件简单说一下。”' },
          strategy: { en: 'Initiative is good, but the place and time are wrong. Match your message to the time you have.', zh: '主动是好事,但场合和时间不对,要让内容匹配时间。' } }
      ]
    },
    speak: {
      maxRounds: 3,
      rounds: ['Answer her question in one or two short sentences.', 'Add one small positive point or ask a quick question.', 'Say goodbye as the doors open.'],
      roundsZh: ['用一两句话回答她的问题。', '补充一个积极的小点,或问一个小问题。', '电梯门开时道别。'],
      targetTypes: ['greeting', 'respond', 'closing'], starTypes: ['ask', 'positive'],
      wordGroups: [
        { group: 'Greeting 问候', type: 'greeting', items: [['Good morning, Ms. Chen', '早上好,Chen 女士'], ['Hello again', '又见面了']] },
        { group: 'Answering 回答', type: 'respond', items: [['It went well, thank you', '很顺利,谢谢'], ['Everyone has been very kind', '大家都很友善'], ["I'm still learning, but I enjoy it", '还在学,但我很喜欢']] },
        { group: 'Positive 积极表达', type: 'positive', items: [["I'm looking forward to", '我期待'], ["I'm excited about the project", '我对项目很期待'], ['I appreciate your help', '感谢您的帮助']] },
        { group: 'Asking 提问', type: 'ask', items: [['Is there anything I should prepare?', '我需要准备什么吗?'], ['How was your weekend?', '您周末怎么样?']] },
        { group: 'Closing 收尾', type: 'closing', items: [['Have a good day', '祝您今天愉快'], ['See you at the meeting', '会上见'], ["I'll let you go", '不耽误您了']] }
      ],
      phrasebank: [
        { group: 'Short and polite 简短得体', items: [['It went well, thanks for asking.', '很顺利,谢谢关心。'], ["I'm enjoying it so far.", '到目前为止我很喜欢。']] },
        { group: 'Ending quickly 快速收尾', items: [['Have a great day, Ms. Chen.', '祝您愉快,Chen 女士。'], ['See you at the meeting.', '会上见。']] }
      ]
    },
    mockReplies: ['Glad to hear that. Let me know if you need anything.', 'Good. Please come to me if you have any questions.', 'See you at the meeting. Have a good day!'],
    offline: {
      en: 'Stand up and act it out: 3 sentences in 30 seconds. B plays Ms. Chen.',
      zh: '站着表演:30 秒内说 3 句话。B 扮演 Chen 女士。',
      watch: 'Was it short? Was the tone natural? Did they stop at the right time?',
      discuss: 'When is silence fine at work? When is a short greeting better?'
    },
    unlock: { requires: [] }
  },

  /* ---------- M1.3 ---------- */
  {
    id: 'm1_3', chapter: 1, order: 3, emoji: '📅', title: "Confirm Thursday's Meeting", zh: '确认周四会议',
    time: 'Wednesday, 10:30 a.m.', minutes: 12, skill: 'Confirming · Clarifying',
    npc: 'chen',
    npcStance: 'busy manager who prefers clear, short messages and values people who double-check details',
    opener: { en: "Yes? I'm in a hurry. What is it?", zh: '什么事?我有点赶时间。' },
    briefing: {
      en: 'Ms. Chen wrote in the team chat: "Client meeting on Thursday afternoon. Please be ready." There is no exact time and no room number.',
      zh: 'Chen 女士在群里写:“周四下午客户会议,请准备好。”没有具体时间,也没有会议室。',
      goalEn: 'Find out the exact time and place without bothering anyone too much.',
      goalZh: '确认具体时间和地点,又不过度打扰别人。'
    },
    decision: {
      promptEn: 'How do you check?', promptZh: '你怎么确认?',
      options: [
        { id: 'A', en: 'Ask in the team chat: "What time is the meeting?"', zh: '在群里问:“会议几点?”',
          now: { en: 'You get the time, but everyone sees your question.', zh: '你拿到了时间,但大家都看到了你的问题。' }, meters: { communication: 1 },
          later: { en: 'Some colleagues think you could have checked privately.', zh: '有同事觉得你可以私下问。' },
          strategy: { en: 'Fast and open, but a public question can look like you missed something.', zh: '快速且透明,但公开提问可能显得你漏看了信息。' } },
        { id: 'B', en: 'Message Ms. Chen: "Just to confirm, is it Thursday at 3:00 p.m. in Room 5?"', zh: '私信 Chen:“确认一下,是周四下午 3 点,Room 5 吗?”',
          now: { en: 'Ms. Chen replies: "Yes. 3:00 p.m. Please bring the draft."', zh: 'Chen 回复:“对,3 点,带上草稿。”' }, meters: { reliability: 4, communication: 3 },
          later: { en: 'You already know the time when the client changes plans on Thursday.', zh: '周四客户变更时,你已掌握准确信息。' }, flag: 'confirmedMeeting',
          strategy: { en: 'You give your best guess and ask her to confirm. This is quick for her and shows you took the lead.', zh: '先给出你的理解让她确认,既省她的时间,又显示你主动。' } },
        { id: 'C', en: 'Ask Daniel quietly. Do not disturb the manager.', zh: '悄悄问 Daniel,不打扰上司。',
          now: { en: 'Daniel guesses "maybe 2:00 p.m.?"', zh: 'Daniel 猜:“可能是下午 2 点?”' }, meters: { reliability: -2 },
          later: { en: 'The information may be wrong. Risk goes up.', zh: '信息可能不准,风险上升。' },
          strategy: { en: 'Colleagues can help, but only the person who set the meeting can confirm it.', zh: '同事可以帮忙,但会议的最终信息要找组织者确认。' } }
      ]
    },
    speak: {
      maxRounds: 3,
      rounds: ['Get her attention politely and say what you need.', 'Confirm the time and place in your own words.', 'Thank her and repeat the next step.'],
      roundsZh: ['礼貌引起注意,说明需求。', '用自己的话确认时间和地点。', '致谢并复述下一步。'],
      targetTypes: ['open', 'confirm', 'closing'], starTypes: ['confirm'],
      wordGroups: [
        { group: 'Opening 开场', type: 'open', items: [['Sorry to bother you', '抱歉打扰'], ['Do you have a minute?', '您有空吗?'], ['I have a quick question', '我有个小问题']] },
        { group: 'Confirming 确认', type: 'confirm', items: [['Just to confirm', '确认一下'], ['Is that Thursday at 3:00 p.m.?', '是周四下午 3 点吗?'], ['Did I understand correctly?', '我理解对了吗?']] },
        { group: 'Clarifying 澄清', type: 'clarify', items: [['Could you let me know the room?', '能告诉我会议室吗?'], ['Do I need to prepare anything?', '我需要准备什么吗?']] },
        { group: 'Thanking 致谢', type: 'thank', items: [['Thanks for your time', '谢谢您的时间'], ['That helps a lot', '帮了大忙']] },
        { group: 'Closing 收尾', type: 'closing', items: [["I'll bring the draft", '我会带草稿'], ["I'll see you there", '到时见'], ["I'll send a reminder", '我会发提醒']] }
      ],
      phrasebank: [
        { group: 'Confirming 确认', items: [['Just to confirm, the meeting is on … at …, right?', '确认一下,会议是在…点…,对吗?'], ['Let me repeat to make sure I have it right.', '我复述一下,确保没理解错。']] },
        { group: 'Polite opening 礼貌开场', items: [['Sorry to bother you. Do you have a minute?', '抱歉打扰,您有空吗?']] },
        { group: 'Wrapping up 收尾', items: [["Thanks. I'll be there and I'll bring …", '谢谢,我会到场并带上…']] }
      ]
    },
    mockReplies: ['Yes, Thursday at 3:00 p.m. in Room 5.', "Please bring the draft report. That's all. Thanks for checking.", 'Good. See you then.'],
    offline: {
      en: 'Pair task (5 min): A confirms the meeting details with B (the manager). Repeat the key facts.',
      zh: '双人任务(5 分钟):A 向 B(上司)确认会议信息,并复述关键事实。',
      watch: 'Did they repeat the time and place? Was the tone polite and brief?',
      discuss: 'Why is "Just to confirm" useful in business? When should we confirm in writing?'
    },
    unlock: { requires: [] }
  },

  /* ---------- M1.4 ---------- */
  {
    id: 'm1_4', chapter: 1, order: 4, emoji: '🤝', title: 'Client Wants to Move the Meeting', zh: '客户想改期',
    time: 'Thursday, 9:15 a.m.', minutes: 15, skill: 'Explaining a conflict · Offering alternatives', milestone: true,
    npc: 'patel',
    npcStance: 'polite client manager who cares about time and professionalism; wants a quick answer; can accept Thursday morning or Wednesday afternoon if the agenda is sent early',
    opener: { en: "Good morning. I'm afraid I can't attend today's meeting. Could we move it to Friday at 2:00 p.m.?", zh: '早上好。恐怕我今天参加不了会议。能改到周五下午 2 点吗?' },
    briefing: {
      en: 'Mr. Patel, your client, emails you. He cannot come to the meeting. He asks to move it to Friday at 2:00 p.m. But your team has an internal review at that time.',
      zh: '客户 Patel 先生来信,他无法出席会议,想改到周五下午 2 点。但那时你们团队有内部评审。',
      goalEn: 'Keep the client happy. Protect your team schedule. Find a workable plan.',
      goalZh: '让客户满意,保护团队日程,找到可行方案。'
    },
    decision: {
      promptEn: 'How do you reply?', promptZh: '你怎么回复?',
      options: [
        { id: 'A', en: 'Agree at once. Ask Ms. Chen to move the review.', zh: '马上答应,请 Chen 女士改评审时间。',
          now: { en: 'Mr. Patel thanks you for being flexible.', zh: 'Patel 先生感谢你的灵活。' }, meters: { relationships: -2, reliability: -2 },
          later: { en: 'The team is unhappy. Ms. Chen asks why you did not check first.', zh: '团队不满,Chen 女士问你为什么不先确认。' },
          strategy: { en: 'The client is pleased, but you promised something that is not yours to promise.', zh: '客户满意,但你答应了不属于你决定的事。' } },
        { id: 'B', en: 'Explain the conflict and offer two other times.', zh: '说明冲突,并提出两个替代时间。',
          now: { en: 'Mr. Patel accepts Thursday at 10:00 a.m.', zh: 'Patel 先生接受周四上午 10 点。' }, meters: { communication: 4, reputation: 3, reliability: 2 },
          later: { en: 'Ms. Chen is pleased. You may lead a client call later.', zh: 'Chen 女士很满意,你以后可能主持客户电话。' }, flag: 'clientTrust',
          strategy: { en: 'You acknowledge the request, explain the limit, and offer choices. This keeps both sides on track.', zh: '先回应请求,说明限制,再给选择,双方都被照顾到。' } },
        { id: 'C', en: 'Ask what he needs, then decide if a meeting is necessary.', zh: '先问他想谈什么,再判断是否需要开会。',
          now: { en: 'Mr. Patel replies: "I need the agenda by tomorrow."', zh: 'Patel 回复:“我需要明天前拿到议程。”' }, meters: { communication: 2, reputation: 1 },
          later: { en: 'It saves time, but the answer is slower.', zh: '省时间,但答复偏慢。' },
          strategy: { en: 'Good use of questions, but the client wants a quick answer. Add a time suggestion.', zh: '提问是好做法,但客户要快速答复,可以同时给时间建议。' } },
        { id: 'D', en: 'Wait to reply until you can talk to Ms. Chen.', zh: '等跟 Chen 女士谈过再回复。',
          now: { en: 'Two hours pass. Mr. Patel writes again, a little impatient.', zh: '两小时过去,Patel 先生再次来信,有点不耐烦。' }, meters: { reliability: -3 },
          later: { en: 'The client feels ignored.', zh: '客户觉得被冷落。' },
          strategy: { en: 'Checking with your manager is wise, but send a short holding reply first.', zh: '向上确认是对的,但应先回一句“收到,稍后答复”。' } }
      ]
    },
    speak: {
      maxRounds: 3,
      rounds: ['Respond to his request and explain the conflict.', 'Offer two alternative times.', 'Confirm the new plan and the next step.'],
      roundsZh: ['回应请求并说明冲突。', '提出两个替代时间。', '确认新安排和后续行动。'],
      targetTypes: ['respond', 'explain', 'offer', 'followup'], starTypes: ['offer', 'followup'],
      wordGroups: [
        { group: 'Responding 回应', type: 'respond', items: [['Thank you for letting me know', '谢谢告知'], ['I understand', '我理解'], ["I'd be happy to help", '我很乐意帮忙']] },
        { group: 'Explaining 说明冲突', type: 'explain', items: [['conflicts with an internal review', '与内部评审冲突'], ["unfortunately, we're not available", '很遗憾我们没空'], ["we're already booked then", '那时已有安排']] },
        { group: 'Offering 提方案', type: 'offer', items: [['Would Wednesday at 4:00 p.m. work for you?', '周三下午 4 点可以吗?'], ['How about Thursday at 10:00 a.m.?', '周四上午 10 点怎么样?'], ['Which time suits you better?', '哪个时间更方便?']] },
        { group: 'Follow-up 后续', type: 'followup', items: [["I'll send an updated invitation", '我会发更新的邀请'], ["I'll send the agenda in advance", '我会提前发议程'], ["I'll confirm by email", '我会邮件确认']] },
        { group: 'Softening 委婉', type: 'soft', items: [['I wonder if', '不知是否'], ["I'm afraid", '恐怕'], ['Would it be possible to', '是否可以']] }
      ],
      phrasebank: [
        { group: 'Explaining 说明冲突', items: [['Unfortunately, Friday at 2:00 p.m. conflicts with an internal review.', '很遗憾,周五下午 2 点与内部评审冲突。']] },
        { group: 'Offering options 提供选项', items: [['Would Wednesday at 4:00 p.m. or Thursday at 10:00 a.m. work for you?', '周三下午 4 点或周四上午 10 点,您看可以吗?']] },
        { group: 'Confirming 确认', items: [["I'll send an updated calendar invitation once we confirm.", '确认后我会发更新的日历邀请。'], ["I'll send the agenda tomorrow morning.", '我明早发议程。']] }
      ]
    },
    mockReplies: ["I see. Friday is the problem? Let me check what else I can do.", 'Thursday at 10:00 a.m. is fine for me. Could you send the agenda in advance?', 'Perfect. Please confirm by email. Thank you for your help.'],
    offline: {
      en: 'Pair task (5 min): A is the Junior Associate, B is Mr. Patel. Agree on a new time and one follow-up action.',
      zh: '双人任务(5 分钟):A 扮演新人,B 扮演 Patel 先生。商定新时间和一个后续行动。',
      watch: 'Did A explain the conflict? Offer options? Confirm the action?',
      discuss: 'When is it OK to say no to a client? How can we say no politely?'
    },
    unlock: { requires: ['m1_1', 'm1_2', 'm1_3'], meters: { reliability: 55 } }
  }
];
