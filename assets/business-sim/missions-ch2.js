/* Chapter 2: External & Internal Complaints. 在 missions-ch1.js 之后加载。 */
(function () {
  var chs = window.BSIM_CHAPTERS || [];
  for (var i = 0; i < chs.length; i++) {
    if (chs[i].id === 2) {
      chs[i].milestone = 'External & Internal Complaints';
      chs[i].milestoneZh = '对外投诉与对内投诉';
      chs[i].note = 'Finish M2.1 and M2.2. M2.3 is optional. 完成 M2.1 和 M2.2 即可。M2.3 可选。';
      chs[i].ready = true;
    }
  }
  var npcs = window.BSIM_NPCS;
  npcs.rivera = { name: 'Ms. Rivera', zh: '印刷商联系人', emoji: '🖨️', color: '#7a3e9d' };
  npcs.tom = { name: 'Tom Blake', zh: '运营同事', emoji: '🗂️', color: '#0f766e' };

  var bank = [
    { group: 'Facts 事实', items: [['We agreed the draft would arrive last Friday.', '我们约定上周五交草稿。'], ['I followed up on Friday, and we still do not have it.', '我周五跟进过,现在还没收到。']] },
    { group: 'Impact 影响', items: [['This affects our client meeting on Thursday.', '这会影响周四的客户会议。'], ['We need the room for Friday\'s dry run.', '周五彩排需要这间会议室。']] },
    { group: 'Request 请求', items: [['Could you please send the draft by noon tomorrow?', '请明天中午前把草稿发来。'], ['Could you confirm by 3:00 p.m. today?', '请今天下午 3 点前确认。']] },
    { group: 'Confirm 确认', items: [['Please confirm by email this afternoon.', '请今天下午用邮件确认。'], ['I\'ll send a short summary after this call.', '通话后我会发一份简短纪要。']] }
  ];

  window.BSIM_MISSIONS.push(
    {
      id: 'm2_1', chapter: 2, order: 1, emoji: '📣', title: 'External Complaint', zh: '对外投诉',
      time: 'Wednesday, 9:30 a.m.', minutes: 15, skill: 'Facts · Impact · Request · Confirm',
      npc: 'rivera',
      npcStance: 'busy print supplier; sometimes makes excuses, but can still fix the delay if the request is clear and fair',
      opener: { en: "Hi. Sorry — we're still working on it. What do you need from me?", zh: '你好。抱歉,我们还在做。你需要我做什么?' },
      briefing: {
        en: 'PrintRight promised the Greenleaf flyer draft last Friday. You already sent one follow-up. It is Wednesday, and there is still no file. The Sunrise Café meeting is on Thursday. Ms. Chen has agreed that you should raise this formally with Ms. Rivera today. You need the draft by noon tomorrow, or a written backup plan.',
        zh: '印刷商答应上周五交 Greenleaf 宣传草稿。你周五已经跟进过一次。现在是周三,文件还没到。周四要开 Sunrise Café 的方案会。Chen 女士同意你今天正式向 Rivera 提出。你需要明天中午前拿到草稿,或一份书面补救计划。',
        goalEn: 'File a fair external complaint: facts, impact, one clear request, and a time to confirm.',
        goalZh: '提出一次公平的对外投诉:事实、影响、一个明确请求,以及确认时间。'
      },
      decision: {
        promptEn: 'How do you frame this external complaint?', promptZh: '这次对外投诉你怎么说?',
        options: [
          { id: 'A', en: 'State the facts and the impact, ask for the draft by noon tomorrow, and request email confirmation today.', zh: '说明事实和影响,要求明天中午前交草稿,并请她今天下午邮件确认。',
            now: { en: 'Ms. Rivera apologises and agrees to send the draft by noon tomorrow.', zh: 'Rivera 道歉,并答应明天中午前发草稿。' }, meters: { communication: 4, reputation: 3, reliability: 2 },
            later: { en: 'The Thursday client meeting can use the draft. The working relationship can continue.', zh: '周四客户会能用上草稿,合作还能继续。' }, flag: 'externalComplaintFair',
            strategy: { en: 'A useful complaint names the facts, the impact, and one fix. It does not only express anger.', zh: '有效的投诉要有事实、影响和一个补救办法,而不只是发火。' } },
          { id: 'B', en: 'Say only "This is unacceptable. We may cancel." Offer no fix.', zh: '只说“这不可接受,我们可能取消合作”,不提补救办法。',
            now: { en: 'Ms. Rivera becomes defensive and starts to explain the delay.', zh: 'Rivera 开始辩解,把责任往外推。' }, meters: { relationships: -3 },
            later: { en: 'You may get a faster reply, or a fight. Ms. Chen will ask where your plan was.', zh: '对方可能更快回复,也可能对抗。Chen 女士会问你的方案在哪。' },
            strategy: { en: 'A threat without a request leaves the other person nothing useful to do.', zh: '只有威胁、没有请求,对方不知道你到底要什么。' } },
          { id: 'C', en: 'Soften it: "Whenever you can. Sorry to bother you."', zh: '说得很软:“你有空再发就行,抱歉打扰。”',
            now: { en: 'Ms. Rivera stays vague: "We\'ll try."', zh: 'Rivera 仍然含糊:“我们尽量。”' }, meters: { reliability: -2 },
            later: { en: 'There is still no deadline. Thursday stays at risk.', zh: '没有截止时间,周四的会仍有风险。' },
            strategy: { en: 'Being polite is not the same as being clear. A complaint needs a time.', zh: '客气不等于清楚。投诉要有时间点。' } },
          { id: 'D', en: 'Copy her manager and your client, Mr. Patel, on the first message.', zh: '第一封信就抄送她的经理和客户 Patel 先生。',
            now: { en: 'The message causes a shock. Ms. Rivera sounds worried.', zh: '这封信震动很大,Rivera 显得紧张。' }, meters: { reputation: -2 },
            later: { en: 'You skipped a fair first step and pulled the client into a supplier problem.', zh: '你跳过了公平的第一步,还把客户卷进了供应商的问题。' },
            strategy: { en: 'Escalation and copying the client are tools for later, not the opening move.', zh: '升级和抄送客户是后手,不是开场。' } }
        ]
      },
      speak: {
        maxRounds: 3,
        rounds: ['Say what was agreed and what is still missing.', 'Explain the impact on Thursday\'s client meeting. Do not attack her.', 'Ask for the draft by noon tomorrow, and ask her to confirm by email today.'],
        roundsZh: ['说明约定是什么、现在还缺什么。', '说明对周四客户会的影响,不要指责她本人。', '要求明天中午前交草稿,并请她今天下午邮件确认。'],
        roundWords: [
          [{ group: 'Reply and state the facts 回应并说事实', type: 'explain', items: [["I'm calling about the Greenleaf flyer draft.", '我来电是关于 Greenleaf 的宣传草稿。'], ['We agreed it would arrive last Friday.', '我们约定上周五交付。'], ['I followed up on Friday, and we still do not have it.', '我周五跟进过,现在还没收到。']] }],
          [{ group: 'Explain the impact 说明影响', type: 'explain', items: [['This affects our client meeting on Thursday.', '这会影响周四的客户会议。'], ['We cannot prepare the client without the draft.', '没有草稿,我们无法为客户做准备。']] }],
          [{ group: 'Make the request 提出请求', type: 'followup', items: [['Could you please send the draft by noon tomorrow?', '请明天中午前把草稿发来。'], ['Please confirm by email this afternoon.', '请今天下午用邮件确认。'], ['Thank you. I\'ll wait for your email.', '谢谢,我等你的邮件。']] }]
        ],
        roundNpc: [
          'Apologise briefly and ask what deadline they need. Do not solve it fully yet.',
          'Acknowledge the Thursday meeting. Ask what exactly they want you to send.',
          'Agree to one clear next step and a time, then close the call politely.'
        ],
        targetTypes: ['explain', 'followup'], starTypes: ['followup'],
        wordGroups: [
          { group: 'Opening 开场', type: 'open', items: [['Good morning, Ms. Rivera', '早上好,Rivera 女士'], ["I'm raising an external complaint about the draft.", '我要就草稿提出一次对外投诉。']] },
          { group: 'Softening 语气', type: 'soft', items: [['I understand you are busy', '我理解你很忙'], ['I want us to fix this', '我希望我们把这件事补上']] }
        ],
        phrasebank: bank
      },
      mockReplies: ['I\'m sorry about the delay. What time do you need it?', 'I see. Thursday is very close. What should I send first?', 'Understood. I\'ll email you the draft by noon tomorrow, and I\'ll confirm this afternoon.'],
      offline: {
        en: 'Pair task (5 min): A is the Associate, B is Ms. Rivera. Agree on a new time, one fix, and whether it will be confirmed in writing.',
        zh: '双人任务(5 分钟):A 扮演专员,B 扮演 Rivera。约定新时间、一项补救,以及是否书面确认。',
        watch: 'Did A give facts, impact, and one clear request?',
        discuss: 'You already followed up once. Why is an external complaint a better next step than "please reply when you can"?'
      },
      unlock: { requires: [] }
    },
    {
      id: 'm2_2', chapter: 2, order: 2, emoji: '🏢', title: 'Internal Complaint', zh: '对内投诉',
      time: 'Thursday, 10:15 a.m.', minutes: 15, skill: 'Internal complaint · Ask the person first',
      npc: 'tom',
      npcStance: 'Operations colleague covering several projects; slow to reply, not hostile; will help if the request and deadline are clear',
      opener: { en: "Hey. Sorry, I've been in back-to-back meetings. What's up?", zh: '嘿,抱歉,我一直在连着开会。什么事?' },
      briefing: {
        en: 'Operations promised to book Room 5 and the equipment for Friday\'s dry run. Tom Blake has not confirmed for three days. You need the room. This is an internal complaint: same structure as the external one, but Tom is a colleague, so you speak to him first.',
        zh: '运营部门答应预订周五彩排的 Room 5 和设备。Tom 已经三天没有确认。你需要这间房。这是对内投诉:结构和对外一样,但 Tom 是同事,所以先对他说。',
        goalEn: 'Get a clear booking, without making Tom feel you complained about him behind his back.',
        goalZh: '把会议室定下来,同时不要让 Tom 觉得你在背后告状。'
      },
      decision: {
        promptEn: 'How do you raise this internal complaint?', promptZh: '这次对内投诉你怎么提出?',
        options: [
          { id: 'A', en: 'Message Tom first: the facts, your deadline, and a request to confirm Room 5 or offer another room by 3:00 p.m.', zh: '先私聊 Tom:事实、截止时间,并请他下午 3 点前确认 Room 5 或给出另一间房。',
            now: { en: 'Tom says he is overloaded and offers another room that is free.', zh: 'Tom 说他同时在赶别的项目,并提供了另一间空房。' }, meters: { relationships: 3, communication: 3 },
            later: { en: 'The dry run has a room, and the working relationship is still intact.', zh: '彩排有房间了,跨部门关系也还在。' }, flag: 'internalComplaintToPerson',
            strategy: { en: 'An internal complaint usually starts with the person who can fix it. Copying their manager is a later step.', zh: '对内投诉通常先找能解决问题的人。抄送对方上级是后一步。' } },
          { id: 'B', en: 'Email Tom, Ms. Chen, and Tom\'s manager together. Use "Complaint" in the subject.', zh: '第一封邮件就同时发给 Tom、Chen 女士和 Tom 的经理,标题写 Complaint。',
            now: { en: 'A room is booked quickly.', zh: '房间很快订好了。' }, meters: { relationships: -4, reliability: 1 },
            later: { en: 'Tom feels jumped over. People start to see you as someone who escalates first.', zh: 'Tom 觉得被越级。别人会觉得你习惯先升级。' },
            strategy: { en: 'The same word "complaint" does not mean the same first step. Inside the company, go to the person first.', zh: '同样叫 complaint,第一步不一定相同。公司内部先找当事人。' } },
          { id: 'C', en: 'Say nothing. Take an unbooked meeting room yourself.', zh: '什么也不说,自己占用一间没登记的会议室。',
            now: { en: 'You have a room for now.', zh: '你暂时有房间了。' }, meters: { reputation: -2 },
            later: { en: 'Operations is unhappy, and the room may be double-booked.', zh: '运营同事会不满,房间也可能被重复预订。' },
            strategy: { en: 'Avoiding the conversation does not remove the problem. It moves the risk.', zh: '不说并不等于问题解决,只是把风险挪走。' } },
          { id: 'D', en: 'Tell Ms. Chen only that "Tom is unreliable." Give no time and no request.', zh: '只对 Chen 女士说“Tom 不靠谱”,不给时间和具体请求。',
            now: { en: 'Ms. Chen tells you to speak to Tom first.', zh: 'Chen 女士让你先去找 Tom。' }, meters: { communication: -2 },
            later: { en: 'Friday\'s room is still not confirmed.', zh: '周五的房间仍然没定。' },
            strategy: { en: 'A complaint without facts and a request is only a complaint about a person.', zh: '没有事实和请求的投诉,只是在抱怨一个人。' } }
        ]
      },
      speak: {
        maxRounds: 3,
        rounds: ['Tell Tom you are following up on Room 5, and check that he still owns the booking.', 'Explain the Friday dry run and why you need an answer today.', 'Ask him to confirm the room, or offer another one, by 3:00 p.m.'],
        roundsZh: ['告诉 Tom 你在跟进 Room 5,并确认他还负责这件事。', '说明周五彩排,以及为什么今天要得到答复。', '请他下午 3 点前确认房间,或给出另一间。'],
        roundWords: [
          [{ group: 'Open the internal complaint 提出对内投诉', type: 'explain', items: [["I'm raising an internal complaint about the room booking.", '我要就会议室预订提出一次对内投诉。'], ['Are you still the person for Room 5?', 'Room 5 还是你负责吗?'], ['We asked for Room 5 three days ago and have not had a confirmation.', '我们三天前申请了 Room 5,还没有得到确认。']] }],
          [{ group: 'Explain the impact 说明影响', type: 'explain', items: [["We need the room for Friday's dry run.", '周五彩排需要这间房。'], ['If it is not booked, we cannot rehearse.', '不定下来,我们就无法彩排。']] }],
          [{ group: 'Make the request 提出请求', type: 'followup', items: [['Could you confirm Room 5 by 3:00 p.m. today?', '请今天下午 3 点前确认 Room 5。'], ['If Room 5 is taken, could you offer another room?', '如果 Room 5 不行,能给另一间吗?'], ['Please reply to me directly.', '请直接回复我。']] }]
        ],
        roundNpc: [
          'Admit you have been busy and ask which day the room is for.',
          'Show you understand the dry run. Ask what time they need an answer.',
          'Offer a concrete option (Room 5 or another room) and a time you will confirm.'
        ],
        targetTypes: ['explain', 'followup'], starTypes: ['followup'],
        wordGroups: [
          { group: 'Tone 语气', type: 'soft', items: [['I know you are covering several projects', '我知道你同时在做几个项目'], ['I want to solve this with you', '我想和你一起把这件事定下来']] },
          { group: 'Thanks 致谢', type: 'thank', items: [['Thanks for helping us sort this out', '谢谢你帮我们把这件事定下来']] }
        ],
        phrasebank: bank
      },
      mockReplies: ['Yeah, Room 5 is still with me. Which day did you need?', 'Friday is tight, but I can see why you need an answer today.', 'I can give you Room 3 if Room 5 is gone. I\'ll confirm by 3:00 p.m.'],
      offline: {
        en: 'Pair task (5 min): A raises an internal complaint with B (Tom). Agree on a room and a reply time. Do not copy a manager in the first minute.',
        zh: '双人任务(5 分钟):A 向 B(Tom)提出对内投诉。约定房间和回复时间。第一分钟不要抄送上级。',
        watch: 'Did A speak to Tom first, with facts and a deadline?',
        discuss: 'Why does copying a manager usually cost more in an internal complaint than in an external one?'
      },
      unlock: { requires: [] }
    },
    {
      id: 'm2_3', chapter: 2, order: 3, emoji: '📝', title: 'Optional Debrief', zh: '可选复盘', optional: true,
      time: 'Friday, 4:00 p.m.', minutes: 12, skill: 'Explain your choices · Benefits and cautions',
      npc: 'chen',
      npcStance: 'manager who wants a short, factual debrief; she dislikes hero stories and total self-blame; she wants to hear the difference between an external and an internal complaint',
      opener: { en: 'Thanks for coming. In two minutes: what went wrong, and what did you do?', zh: '谢谢过来。用两分钟说说:出了什么问题,你做了什么?' },
      briefing: {
        en: 'The draft and the room are mostly sorted. Ms. Chen asks for a short debrief. This mission is optional. You can skip it and still finish Chapter 2.',
        zh: '草稿和会议室大体已经安排好。Chen 女士想听一个简短复盘。这一关可选。不做也能完成本章。',
        goalEn: 'Explain the external complaint and the internal complaint, including one benefit and one caution.',
        goalZh: '说明对外投诉和对内投诉,并各说出一个好处和一个需要谨慎的地方。'
      },
      decision: {
        promptEn: 'How do you frame the debrief?', promptZh: '你怎么做这次复盘?',
        options: [
          { id: 'A', en: 'Give both timelines, your actions, and one thing you would do the same next time.', zh: '分别讲两条时间线、你的做法,以及下次还会保留的一点。',
            now: { en: 'Ms. Chen says you can handle this kind of problem on your own.', zh: 'Chen 女士认为你可以独立处理这类问题。' }, meters: { communication: 4, reputation: 4 },
            later: { en: 'She sees a clear difference between the supplier complaint and the internal one.', zh: '她听出你分得清对供应商和对内的差别。' },
            strategy: { en: 'A good debrief is a timeline plus a reason, not a speech about how brave you were.', zh: '好的复盘是时间线和理由,不是表现自己有多敢投诉。' } },
          { id: 'B', en: 'Stress that you "dared to complain," and criticise the supplier and Tom.', zh: '强调自己“敢投诉”,并贬低供应商和 Tom。',
            now: { en: 'Ms. Chen stops you. She wants the method, not a hero story.', zh: 'Chen 女士打断你。她要的是做法,不是英雄故事。' }, meters: { relationships: -2 },
            later: { en: 'The debrief does not show your judgement.', zh: '这次复盘没有体现你的判断。' },
            strategy: { en: 'Blaming people hides the useful part: facts, impact, and the request you made.', zh: '责怪别人会掩盖真正有用的部分:事实、影响和你提出的请求。' } },
          { id: 'C', en: 'Say you should not have complained at all.', zh: '说自己根本不该投诉。',
            now: { en: 'Ms. Chen thinks you still mix up a clear complaint and losing your temper.', zh: 'Chen 女士觉得你还分不清“清楚的投诉”和“发脾气”。' }, meters: { communication: -1 },
            later: { en: 'You understate the value of raising a real problem.', zh: '你低估了把真实问题提出来的价值。' },
            strategy: { en: 'A fair complaint protects the project. It is not the same as an angry message.', zh: '公平的投诉是在保护项目,和生气的信息不是一回事。' } },
          { id: 'D', en: 'Say "It is all fine now. There is nothing to add."', zh: '说“都解决了,没什么好说的。”',
            now: { en: 'Ms. Chen cannot tell how you chose.', zh: 'Chen 女士无法判断你是怎么取舍的。' }, meters: { reliability: -2 },
            later: { en: 'You miss the chance to show what you learned.', zh: '你错过了展示自己学到什么的机会。' },
            strategy: { en: 'Solving the problem is not the same as being able to explain the choice.', zh: '问题解决了,不等于你能讲清自己的选择。' } }
        ]
      },
      speak: {
        maxRounds: 3,
        rounds: ['In one or two sentences each, say what happened with PrintRight and with Tom.', 'Explain why you spoke to the supplier firmly, and to Tom first.', 'Name one benefit of a complaint, and one reason to be careful.'],
        roundsZh: ['各用一两句说明印刷商和 Tom 分别发生了什么。', '说明为什么对外要说清楚截止时间,对内要先找 Tom。', '说出投诉的一个好处,以及一个需要谨慎的地方。'],
        roundWords: [
          [{ group: 'Two timelines 两条时间线', type: 'explain', items: [['On the external complaint, the draft was late for the Thursday meeting.', '对外投诉是因为草稿延误,影响周四的会。'], ['On the internal complaint, Room 5 was not confirmed for three days.', '对内投诉是因为 Room 5 三天没有确认。']] }],
          [{ group: 'Your reasons 你的理由', type: 'explain', items: [['I asked the supplier for a written deadline.', '我要求供应商给出书面截止时间。'], ['I spoke to Tom first, before copying a manager.', '我先找了 Tom,没有先抄送上级。']] }],
          [{ group: 'Benefit and caution 好处与谨慎', type: 'followup', items: [['A clear complaint helps us fix the problem and protect the client.', '清楚的投诉能帮我们解决问题并保护客户。'], ['We should be careful about who we copy, especially inside the company.', '抄送谁要谨慎,公司内部尤其如此。'], ['Next time I will still use facts, impact, and one request.', '下次我仍会用事实、影响和一个请求。']] }]
        ],
        roundNpc: [
          'Ask one short question: what was different about the internal case?',
          'Ask what you would keep the same next time.',
          'Thank the student and close the debrief in one sentence.'
        ],
        targetTypes: ['explain', 'followup'], starTypes: ['followup'],
        wordGroups: [
          { group: 'Debrief 复盘', type: 'open', items: [['Let me give you a short timeline.', '我简单说一下时间线。'], ['The useful part was the request, not the emotion.', '有用的是请求,不是情绪。']] }
        ],
        phrasebank: bank
      },
      mockReplies: ['Good. What was different when the person was inside the company?', 'That is a clear reason. What will you keep next time?', 'Thank you. That is enough for me. Have a good weekend.'],
      offline: {
        en: 'Optional (5 min): tell a partner the difference between the external complaint and the internal complaint, plus one benefit and one caution.',
        zh: '可选(5 分钟):向同伴说明对外投诉和对内投诉的差别,并各说一个好处和一个需要谨慎的地方。',
        watch: 'Did they contrast the two cases, not only retell the story?',
        discuss: 'When is copying a manager part of a professional complaint, and when does it harm the relationship?'
      },
      unlock: { requires: [] }
    }
  );
})();
