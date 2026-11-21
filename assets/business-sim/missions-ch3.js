/* Chapter 3: Cross-team Project. 在 missions-ch2.js 之后加载。
   M3.1 The Budget Update:打断与被打断(跨部门项目同步会)。 */
(function () {
  var chs = window.BSIM_CHAPTERS || [];
  for (var i = 0; i < chs.length; i++) {
    if (chs[i].id === 3) {
      chs[i].milestone = 'Cross-team Project';
      chs[i].milestoneZh = '协调一次跨部门项目';
      chs[i].note = 'Chapter 3 pilot: M3.1 The Budget Update. 第三章试点:M3.1 预算更新会。';
      chs[i].ready = true;
    }
  }
  var npcs = window.BSIM_NPCS;
  npcs.aiko = { name: 'Aiko Tanaka', zh: '运营负责人', emoji: '📊', color: '#0e7490' };

  var bank = [
    { group: 'Interrupting politely 礼貌打断', items: [
      ['May I add something here?', '我可以在这里补充一点吗?'],
      ['Sorry for the interruption, but...', '抱歉打断一下,不过…'],
      ['Can I jump in for a moment?', '我可以插一句吗?'],
      ['Excuse me for chiming in, but...', '不好意思插话,但是…'],
      ['If I may interrupt briefly...', '请允许我简短地打断一下…'],
      ["I'd like to add a point if that's okay.", '如果可以的话,我想补充一点。']
    ] },
    { group: 'Handling interruptions 应对被打断', items: [
      ["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。'],
      ["I appreciate your input. Let's explore that after this point.", '谢谢你的意见,说完这点我们再讨论。'],
      ['Could we hold that thought until the end of this discussion?', '这个想法能留到讨论结束再谈吗?'],
      ['I see your point, but please allow me to finish.', '我明白你的意思,但请让我说完。'],
      ["Let's circle back to that thought in a moment.", '我们稍后再回到这个想法。'],
      ['I value your input. May we discuss this after the current topic?', '我很重视你的意见,能在当前话题之后再谈吗?']
    ] },
    { group: 'Accepting a correction 接受纠正', items: [
      ['Thanks for catching that. I will correct the slide.', '谢谢指出,我会改正幻灯片。'],
      ['Good point. Let me check the figure after the meeting.', '有道理,会后我再核对数字。']
    ] },
    { group: 'Closing the meeting 收尾', items: [
      ['So, to confirm: the date is ___ and the owner is ___.', '那么确认一下:日期是…,负责人是…'],
      ['I will send a follow-up email today.', '我今天会发跟进邮件。']
    ] }
  ];

  window.BSIM_MISSIONS.push(
    {
      id: 'm3_1', chapter: 3, order: 1, emoji: '🗣️', title: 'The Budget Update', zh: '预算更新会', milestone: true,
      time: 'Tuesday, 2:00 p.m.', minutes: 15, skill: 'Interrupting politely · Handling interruptions',
      npc: 'aiko',
      npcStance: 'Head of Operations from another team; direct, helpful, but busy. SECRET (never reveal unless the student asks a direct question about it): you track the budget, and the approved figure is $21,000, so the $12,000 on the slide is wrong (digits reversed); your team starts an urgent project on Thursday, so a Thursday delivery leaves no time for your team to review. You want Wednesday delivery, but a Wednesday draft plus a Thursday final version is acceptable if the student sends the data and names an owner. Interrupt only when the round requirement says so, and do it politely and briefly. If the student interrupts you politely, respond cooperatively; if rudely, say you were not finished.',
      opener: { en: "Hi. I have about five minutes before my next call. Please go ahead.", zh: '你好。我五分钟后还有一个电话。请开始吧。' },
      briefing: {
        en: 'You are now a Project Coordinator on Project Greenleaf. It is a cross-team project: your team has the client and delivery information, and the Operations team has the budget and resource data. At the Tuesday sync you chair the meeting and present next week\'s joint delivery plan to Aiko, who leads Operations. Your slide says: budget $12,000. You want final delivery on Thursday, and you need Operations\' data by Tuesday evening. Aiko has her own view, and she knows things you do not.',
        zh: '你现在是 Project Greenleaf 的项目协调人。这是一个跨部门项目:你的团队掌握客户和交付信息,运营团队掌握预算和资源数据。周二同步会上,你主持会议,向运营负责人 Aiko 汇报下周的联合交付计划。你的幻灯片写着:预算 12,000 美元。你希望周四交付终稿,并需要运营团队周二晚上前提供数据。Aiko 有自己的看法,而且她知道一些你不知道的事。',
        goalEn: 'Chair the meeting: cover your three points (date, risk, support), handle an interruption, and agree on the delivery date and the owner.',
        goalZh: '主持会议:讲完三个要点(日期、风险、支持),处理好打断,并就交付日期和负责人达成一致。'
      },
      decision: {
        promptEn: 'Before you start, how do you set up the meeting?', promptZh: '开始之前,你怎么安排这场会议?',
        options: [
          { id: 'A', en: 'Open with the agenda: three points. Ask Aiko to save questions until the end, but to tell you at once if she spots an error.', zh: '先讲议程:三个要点。请 Aiko 把问题留到最后,但如果发现错误请马上告诉你。',
            now: { en: 'Aiko nods: "Clear. I will flag any number I am not sure about."', zh: 'Aiko 点头:“清楚。我不确定的数字会马上提出来。”' }, meters: { communication: 4, relationships: 3, reliability: 2 },
            later: { en: 'She raises the budget problem early and politely. The meeting stays on track.', zh: '她会尽早、礼貌地指出预算问题,会议不会跑偏。' }, flag: 'chairedWithGroundRules',
            strategy: { en: 'A good chair sets a simple rule and leaves one exception for urgent corrections. In a cross-team meeting, the other side often holds the facts you are missing.', zh: '好的主持人先定一条简单规则,并给紧急纠正留一个例外。跨部门会议里,对方常常掌握你缺少的事实。' } },
          { id: 'B', en: 'Start presenting at once. Say nothing about questions.', zh: '直接开始讲,不说关于提问的任何规则。',
            now: { en: 'Aiko listens. For now, it is quiet.', zh: 'Aiko 在听,暂时很安静。' }, meters: { communication: -1 },
            later: { en: 'She may cut in at an awkward moment, and you may lose your thread.', zh: '她可能在不合适的时机插话,你也可能丢掉思路。' },
            strategy: { en: 'Without a ground rule, interruptions arrive at random times. You are then reacting, not chairing.', zh: '没有规则,打断会在随机的时刻出现。你只能被动应对,而不是主持。' } },
          { id: 'C', en: 'Say: "Please do not interrupt me. Questions only at the end."', zh: '说:“请不要打断我,问题只在最后问。”',
            now: { en: 'Aiko looks surprised. She says, "Of course."', zh: 'Aiko 有些意外,说:“当然。”' }, meters: { relationships: -3, reputation: -1 },
            later: { en: 'If the slide is wrong, she may stay quiet or interrupt anyway.', zh: '如果幻灯片有错,她可能保持沉默,也可能还是会打断。' },
            strategy: { en: 'A strict no-interruption rule blocks useful corrections. It also sounds cold to a colleague from another team.', zh: '过于严格的“不许打断”会挡住有用的纠正,对其他团队的同事也显得冷淡。' } },
          { id: 'D', en: 'Ask Aiko to go first with all her questions. Then present.', zh: '请 Aiko 先把所有问题说完,再开始讲。',
            now: { en: 'Aiko talks for a long time. Half the meeting is gone.', zh: 'Aiko 说了很久,会议已经过去一半。' }, meters: { reliability: -2, communication: -1 },
            later: { en: 'You lose control of the agenda and run out of time.', zh: '你失去了对议程的控制,时间不够用。' },
            strategy: { en: 'Giving up the floor at the start is not the same as listening. A chair protects the agenda and the time.', zh: '一开始就让出发言权不等于倾听。主持人要保护议程和时间。' } }
        ]
      },
      speak: {
        maxRounds: 4,
        rounds: [
          'Open the meeting, say your goal, and give your first point: the delivery date.',
          'Aiko cut in. Respond to her, then get back to your second point: the risk of delivering on Wednesday.',
          'Aiko is talking at length. Interrupt politely and steer back to your third point: the data you need by Tuesday evening.',
          'Offer a way forward, and confirm the delivery date and the owner.'
        ],
        roundsZh: [
          '开场,说明目标,并讲第一点:交付日期。',
          'Aiko 插话了。先回应她,再回到第二点:周三交付的风险。',
          'Aiko 说个不停。礼貌地打断她,把话题带回第三点:你周二晚上前需要的数据。',
          '提出一个解决办法,并确认交付日期和负责人。'
        ],
        roundWords: [
          [
            { group: 'Open the meeting 开场', type: 'open', items: [['Thanks for joining, Aiko.', '谢谢你来参加,Aiko。'], ["I'd like to cover three points: the date, the risk, and what I need from your team.", '我想讲三点:日期、风险,以及我需要你们团队提供什么。']] },
            { group: 'First point: the date 第一点:日期', type: 'explain', items: [['I suggest we deliver on Thursday.', '我建议周四交付。'], ['The budget on this slide is $12,000.', '这张幻灯片上的预算是 1.2 万美元。']] }
          ],
          [
            { group: 'If it is a useful correction 如果纠正有用', type: 'accept', items: [['Thanks for catching that. I will correct the slide.', '谢谢指出,我会改正幻灯片。'], ['Good point. Let me check the figure after the meeting.', '有道理,会后我再核对数字。']] },
            { group: 'If it can wait 如果可以等', type: 'hold', items: [["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。'], ["I appreciate your input. Let's explore that after this point.", '谢谢你的意见,说完这点我们再讨论。']] },
            { group: 'Back to your point 回到主线', type: 'return', items: [['Back to the delivery date,', '回到交付日期,'], ['As I was saying, delivering on Wednesday leaves no time for quality checks.', '正如我刚才说的,周三交付没有时间做质量检查。']] }
          ],
          [
            { group: 'Interrupt politely 礼貌打断', type: 'interrupt', items: [['May I add something here?', '我可以在这里补充一点吗?'], ['Sorry for the interruption, but...', '抱歉打断一下,不过…'], ['Can I jump in for a moment?', '我可以插一句吗?'], ['Excuse me for chiming in, but...', '不好意思插话,但是…'], ['If I may interrupt briefly...', '请允许我简短地打断一下…']] },
            { group: 'Steer back 带回主线', type: 'return', items: [["Let's circle back to what I need from your team.", '我们回到我需要你们团队提供什么。'], ["I need your team's data by Tuesday evening.", '我需要你们团队周二晚上前提供数据。']] }
          ],
          [
            { group: 'Offer a way forward 提出方案', type: 'offer', items: [['How about a Wednesday draft and a Thursday final version?', '周三初稿、周四终稿怎么样?'], ['Would a Wednesday draft for your team to review work for you?', '周三给你们团队评审初稿可以吗?']] },
            { group: 'Confirm 确认', type: 'followup', items: [['I will own the delivery.', '我来负责交付。'], ['I will send a follow-up email with the date and the owner today.', '我今天会发跟进邮件,写明日期和负责人。']] }
          ]
        ],
        roundNpc: [
          'After the student opens, interrupt politely and briefly (one short sentence, one polite interruption expression): you believe the approved budget is $21,000, not $12,000 on the slide. Say nothing else yet.',
          'React to how the student handled your correction. If they accepted it, thank them. If they brushed it off, say you worry the wrong figure will stay in the plan. Then talk at some length (3-4 sentences) about how busy your team is this week and how much Wednesday matters to you, WITHOUT giving the exact reason. Keep talking, so the student has a reason to interrupt politely.',
          'If the student interrupted you politely, respond cooperatively and answer their point about the data. Then explain the real reason in one or two sentences: your team starts an urgent project on Thursday, so a Thursday delivery leaves no time to review. Ask if a Wednesday draft is possible. If the student interrupted rudely, say you were not finished, then continue.',
          'Agree to a Wednesday draft plus a Thursday final version if the student has named an owner or promised a follow-up email; otherwise ask who owns it. Close the meeting politely in one or two sentences.'
        ],
        targetTypes: ['accept', 'hold', 'interrupt', 'return', 'offer', 'followup'], starTypes: ['interrupt', 'followup'],
        wordGroups: [
          { group: 'Interrupt politely 礼貌打断', type: 'interrupt', items: [['May I add something here?', '我可以在这里补充一点吗?'], ['Sorry for the interruption, but...', '抱歉打断一下,不过…']] },
          { group: 'Keep the floor 守住发言', type: 'hold', items: [["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。']] },
          { group: 'Accept a correction 接受纠正', type: 'accept', items: [['Thanks for catching that.', '谢谢指出。']] },
          { group: 'Back to the point 回到主线', type: 'return', items: [["Let's circle back to that thought in a moment.", '我们稍后再回到这个想法。']] }
        ],
        phrasebank: bank
      },
      mockReplies: [
        'Sorry to cut in, but I think the budget on the slide is wrong. Isn\'t the approved figure $21,000?',
        'Okay, I will check my sheet too. Anyway, this week is really busy for my team. We have so many requests, and Wednesday is the day that works best for us, and I keep thinking that if things slip again, we will have the same problem next week...',
        'Thanks. To be honest, my team starts an urgent project on Thursday, so a Thursday delivery leaves us no time to review. Could we get a draft on Wednesday?',
        'That works for me. A Wednesday draft and a Thursday final version. Please send the follow-up email today. Thanks, and talk soon.'
      ],
      offline: {
        en: 'Pair task (5 min): A is the Project Coordinator, B is Aiko. Your teacher gives each of you a private card. Do not show your card. Agree on the delivery date and the owner.',
        zh: '双人任务(5 分钟):A 扮演项目协调人,B 扮演 Aiko。教师给你们各发一张私人卡,不要给对方看。商定交付日期和负责人。',
        watch: 'Did anyone speak at a natural pause? Was each interruption short? Did the speaker get the floor back and return to the point?',
        discuss: 'When is an interruption useful, and when does it only take the floor? How should you reply to each?'
      },
      unlock: { requires: ['m2_1', 'm2_2'] }
    }
  );
})();
