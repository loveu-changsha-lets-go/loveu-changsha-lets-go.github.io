/* V2 augments the original five renderers. Existing route content is preserved. */
// Source links and research date travel with the content. Visitor prompts are editorial.
const cityStories = [
  {id:'yuelu',group:'山水与人文',title:'岳麓书院 · 一座仍在生长的学校',day:'DAY3',overview:'从北宋书院到今天的湖南大学，岳麓书院的故事是知识如何在一座城市延续。看院落，也看讲堂与匾额：它们记录了不同时代怎样理解学习、讨论与求真。',sections:[
    ['先认清它的时间线','书院创于北宋开宝九年（976），由潭州太守朱洞创建；1015年获宋真宗赐额。1903年改制为湖南高等学堂，1926年定名湖南大学。今天书院仍是湖南大学的教学科研机构。延续的是教育传统，不能据此把所有现存建筑都当作千年前原物。'],
    ['讲堂里为什么值得停一停','1167年，朱熹与张栻在这里会讲。不同思想通过讨论相互回应，这是书院史中很有分量的一页。“实事求是”匾关联民国时期校长宾步程倡导的治学精神；“学达性天”等匾额也各有历史与重刻背景。匾上的字、今天看到的匾、它最早出现的年代，要分开理解。'],
    ['现场怎么看','建议先看讲堂空间，再读一块匾：它希望学习者成为什么样的人？把院落想成讨论与授课的场所，留意门庭如何把人带向讲堂。你们可以各选一句最认同或最想追问的话，离开前交换理由。这是游览提问，不是要求读懂全部理学。']],sources:[['湖南大学岳麓书院 · 书院概况','https://ylsy.hnu.edu.cn/sygk.htm'],['湖南大学 · 讲堂匾额与碑文','https://peixun.hnu.edu.cn/info/1019/4650.htm']]},
  {id:'aiwan',group:'山水与人文',title:'爱晚亭 · 一首诗如何成为一处风景',day:'DAY3',overview:'爱晚亭把岳麓山的林木、书院文化与近现代记忆放在同一处。名字来自杜牧《山行》的诗意；亭子建于清代，比诗人生活的年代晚得多。',sections:[
    ['从红叶亭到爱晚亭','湖南省文旅厅介绍，书院山长罗典在1792年建亭，初名红叶亭；1794年毕沅建议以杜牧《山行》诗意改名爱晚亭。网络流传的改名人物存在不同说法，这里采用文旅部门所载版本。名字借用了唐诗，并不意味着杜牧曾在这座亭中作诗。'],
    ['今天看到的亭子有几层历史','亭子经历过损坏、修缮与重建。1952年重修时，湖南大学校长李达邀请毛泽东题写匾额。理解它，可以同时看清代山林游赏、大学与书院的关系，以及近现代题字留下的记忆，避免把所有构件归为同一个年代。'],
    ['把目光从牌匾移向山林','先远看亭与坡地、树冠的关系，再近看檐角与匾额。10月初的叶色以当日实景为准，不预设已经满山红叶。两人各拍一张不同方向的风景，之后比较：一个人记住了建筑，另一个人是否记住了树影或声音？']],sources:[['湖南省文旅厅 · 爱晚亭历史及修缮','https://whhlyt.hunan.gov.cn/whhlyt/news/mtjj/202107/t20210706_19853514.html']]},
  {id:'orange',group:'山水与人文',title:'橘子洲 · 江中洲与青年时代',day:'DAY4',overview:'橘子洲首先是一处湘江中的沙洲，也是长沙的山、水、城相互对望的地方。文学与青年记忆让这段江面有了更多含义：风景不只在雕塑旁，也在看向两岸的视线里。',sections:[
    ['先把山、水、城放回地图','橘子洲位于湘江之中，西望岳麓山，东向长沙城区。洲与江岸不同：水把它与两边隔开，却也把城市的两岸联系起来。游览时可以用三个方向辨认环境——山在哪边，城在哪边，水正向哪里流。这样看，比只寻找一个拍照背景更容易建立城市方位感。'],
    ['诗词中的长沙','毛泽东在长沙求学、活动的青年经历与橘子洲相联，1925年《沁园春·长沙》也把湘江、洲与青年人的志向写在一起。诗歌是一位作者在特定时代的观看与表达。今天的雕塑与公共景观是后来的纪念表达，不能把它们当作1925年现场原貌。'],
    ['一起多停留三分钟','选一处安全、不挡路的位置，先不拍照，各说出三样看到或听到的东西。你们看到的是船、树、天际线，还是岸边人群？把两个答案并排记下，城市的同一处风景会留下两种记忆。交通与步行距离仍按原行程安排，故事阅读不增加必须打卡的任务。']],sources:[['湖南省政府 · 橘子洲风景与历史','https://hunan.gov.cn/hnszf/c101474/202108/t20210827_20403826.html']]},
  {id:'dufu',group:'山水与人文',title:'杜甫江阁 · 江边的晚年诗人记忆',day:'DAY2',overview:'江阁让人想到杜甫晚年在长沙的经历，但今天的建筑是2005年建成的仿唐纪念建筑。知道这层区别后，可以把建筑、诗人经历与眼前的湘江分开看，再让它们彼此连接。',sections:[
    ['它纪念什么，又建于何时','运营方介绍，杜甫晚年在湖南生活，并三次寓居长沙；江阁以这一段经历为纪念主题。现建筑建成于2005年。它用仿唐形式表达纪念，并非杜甫住过的唐代原楼，也不能因为名称有“江阁”就把古代居所与今天的建筑画等号。'],
    ['从晚年漂泊读到城市相逢','杜甫《江南逢李龟年》把旧日相识与江南重逢联系起来。理解这首诗，可以留意其中时间流逝、人生变化与重逢的感受，而不只读作一幅漂亮春景。江边游览不必复述完整年谱；知道诗人晚年漂泊的背景，就多了一条感受风景的线索。'],
    ['你们可以怎样看江阁','先退后看楼与江岸的关系，再沿安全步道看对岸和远山。日落、灯光与当天天气有关，不把历史材料中的演出或活动当作本次必有项目。给这晚留一句话：如果以后再来，你最想记得身边的人说过什么？']],sources:[['长沙城发集团 · 杜甫江阁介绍','https://www.csudgroup.com/portal/article/index/navId/62/id/1730/cid/45.html']]},
  {id:'kaifu',group:'山水与人文',title:'古开福寺 · 繁华城市里的另一种节奏',day:'DAY4',overview:'开福寺的历史可以追溯到五代，寺院在多次修建中延续至今。它提供了一种不同于商圈的城市体验：建筑、树木与日常宗教生活，让脚步和声音都慢下来。',sections:[
    ['一座寺院如何跨越朝代','近期关于寺院建筑与园林的研究介绍记载，开福寺始建于927年。长久历史中经历了多次修建与恢复。它的价值既来自久远的宗教传统，也来自不同时期留下的空间层次；今天所见不能整体认定为五代原建。'],
    ['留意建筑与院落之间','寺院适合按空间节奏观看：门、院落、殿堂之间如何连接，树木怎样形成停留处，人们如何使用这些空间。宗教建筑不只是外观与年代，也承载着仍在发生的礼佛生活。有关签文的内容属于民间与宗教习俗，不作为对未来的事实判断。'],
    ['两人的安静片刻','跟随现场指引，尊重礼佛者与拍摄规定。你们可以各选择一处不妨碍通行的位置，停留片刻后再交流最先注意到的细节。院落、树影、钟声与匾额都可以成为记录主题。研究介绍的新景观不等于所有区域在当日均对外开放。']],sources:[['新湖南 · 湖南建投研究团队介绍开福寺园林与建筑（2026）','https://www.hunantoday.cn/news/xhn/202609/33697000.html']]},
  {id:'wuyi',group:'街巷与艺术',title:'五一广场 · 热闹商圈下面的古代生活',day:'DAY3',overview:'五一广场不只有商店和人潮。2010年发现的东汉简牍，让长沙古代城市生活以文字重新出现：日常事务、治理与人的往来，也是一座城市的历史。',sections:[
    ['地下发现了什么','2010年，五一广场东侧偏南的一处井窖出土6862枚东汉简牍。相关整理研究涉及地方行政、司法、经济、军事等内容。它们与常听到的走马楼三国吴简是不同批次、不同年代的发现，阅读介绍时不要混在一起。'],
    ['为何普通文字也值得记住','简牍是纸张尚未普遍替代竹木书写材料时的信息载体。一座城市的历史可以从帝王将相讲起，也可以从一份文书、一次交接和一件民事事务讲起。把古代记录与眼前密集的城市信息作对照，是理解历史的一个角度；这属于游览解读，不表示每个现代街区都原样延续。'],
    ['在商圈给历史留一点空间','到广场时先看人流与街道交汇，想一想：如果只留下今天的某一条记录，后人会怎样理解这座城市？本条是地点背景，不意味着原发现井窖现在可参观，也不临时增加博物馆预约。你们的简短回答可以成为当天回忆。']],sources:[['清华大学出土文献研究与保护中心 · 长沙五一广场东汉简牍','https://www.ctwx.tsinghua.edu.cn/info/1011/3076.htm']]},
  {id:'huangxing',group:'街巷与艺术',title:'黄兴路与老城街巷 · 地名会说话',day:'DAY3',overview:'黄兴路的名字纪念辛亥革命重要人物黄兴，街道又长期承载商业生活。沿黄兴路走向解放西一带，可以同时观察纪念性地名、城市商业与今天的夜间生活。',sections:[
    ['从街名进入历史','地方地名研究介绍，这条道路曾使用南正路等名称，后来为纪念黄兴更名。地名让一个人的历史进入日常：人们买东西、约见面时，也不断使用这段公共记忆。不同资料对更名年份有不同表述，本条不以某一争议年份作为游览重点。'],
    ['商业街既有延续，也有变化','历史地名资料记载了这一区域的道路建设、老商号与商业发展。今天的店铺、招牌和建筑会变化，不能把整条步行街描述成未经改造的古街。看老城，可以同时辨认旧地名和现代消费空间；新旧并置本身也是城市经历。解放西的夜生活则提供另一种当代观察。'],
    ['做一个街名小收藏','路过时拍下你真正走过的一块路牌，再选一个让你想问“为什么叫这个名字”的地名。两人可以分别选街边细节：一个看招牌，一个看行人的使用方式。无需为了收集而绕路，原路线里的一两处就足够组成这晚的城市印象。']],sources:[['新湖南 · 历史地名学者陈先枢《长沙市历史地名故事》摘录','https://www.hunantoday.cn/news/xhn/202401/19304430.html']]},
  {id:'xpm',group:'街巷与艺术',title:'谢子龙影像艺术馆 · 从拍照到理解影像',day:'DAY2',overview:'白色建筑是入口，影像才是继续观看的理由。馆方长期关注中国早期影像：一张照片既呈现某个瞬间，也带着拍摄者的选择、时代的技术与观看方式。',sections:[
    ['艺术馆关注什么','艺术馆于2017年9月16日开馆。馆方介绍其收藏与展览关注早期中国影像历史，材料包括不同时期和媒介的摄影作品。官网的2022年“影像时刻”资料可帮助理解馆藏方向，但那是历史展览，不能据此承诺你们在2026年仍能看到同一批展品。'],
    ['建筑如何让观看慢下来','设计者的介绍讨论了清水混凝土、光线与空间关系。现场可以观察窗洞、阴影、墙面与水面如何组织视线。建筑摄影不只寻找固定机位：站在不同方向，光与轮廓的变化会改变画面。材料与空间的感受，最好由眼前真实条件决定。'],
    ['试着问一张照片三个问题','如果遇到人物影像，先问：谁在拍，谁被拍，谁没有进入画面？再看衣着、姿态与背景告诉了你什么，有哪些是你猜测的。两人各选一张作品，交换选择理由。具体展览、开放区域和拍摄规定以当天馆方公告为准。']],sources:[['谢子龙影像艺术馆 · 早期影像收藏与历史展览','https://www.x-museum.com/web-wechat/info/detail?infoId=457'],['新湖南 · 设计者讲述影像艺术馆建筑','https://www.hunantoday.cn/news/xhn/201712/14553734.html']]},
  {id:'zijian',group:'街巷与艺术',title:'李自健美术馆 · 把普通人的面孔看仔细',day:'DAY2',overview:'李自健的写实绘画常从乡土、家庭与普通人的生活展开。与影像馆连着看，可以比较两种记忆方式：照片截取一个瞬间，绘画则通过构图、色彩和笔触重新组织经验。',sections:[
    ['馆与人的联系','美术馆于2016年建成开放，位于洋湖一带。李自健在家乡建设公共艺术空间，让绘画进入城市游览的日常。关于创馆的报道适合了解背景；它不是当天开放时间、票务或现展的保证，相关安排仍以馆方发布为准。'],
    ['绘画里的乡土与情感','中国国家博物馆保存的2013年李自健作品展资料，以人性与爱概括其创作，介绍了乡土、母女、家书等主题。这里引用的是艺术家创作背景，不把历史展览清单当作当前馆内陈列。遇到作品时可以先读人物的表情与动作，再看色彩和环境怎样支持情绪。'],
    ['两人各选一张，先不看说明','如果当天展览允许，先看作品一分钟，各说一个观察，再读说明，区分画面上能看到的东西与自己的联想。最后问对方：它让你想起了谁，或者哪一种日常？你们的答案没有标准版本，值得保留的正是不同感受。']],sources:[['红网 / 湖南日报 · 李自健美术馆建成开放报道','https://hn.rednet.cn/c/2016/09/22/1010636.htm'],['中国国家博物馆 · 2013年李自健作品展档案','https://www.chnmuseum.cn/zl/zlhg/201812/t20181220_32318.shtml']]},
  {id:'rice',group:'餐桌故事',title:'长沙米粉 · 一碗早餐与凌晨的劳动',day:'早餐 / 南门口',overview:'米粉把长沙的日常生活放进一只碗里。汤、粉和“码子”各有角色；一碗看似简单的早餐，背后连着磨米、蒸制、配送和店家天亮前的准备。',sections:[
    ['粉与码子要分开认识','长沙米粉中常见扁粉，也有圆粉选择。“码子”是配在粉上的菜肴：炒码强调现炒，煨码则以提前炖煨的食材入碗。点单时，可以分别问粉的形态、码子的做法以及是否另加辣椒；店铺之间会有差异，不把一套点法当作全城统一规则。'],
    ['一碗早餐如何来到街头','湖南日报2020年的行业访谈记录了湘乡月山人参与长沙米粉生产的经历，也介绍浸泡、磨浆、蒸制、切粉与配送环节。米粉的城市记忆既来自食客，也来自清晨之前工作的制粉者。这是访谈记录的一条行业线索，不是长沙米粉唯一的起源，也不等于当下每家店的供应方式。'],
    ['吃的时候做一个小比较','先尝一口未额外加辣的汤，再看看粉的宽窄与码子的搭配。两人选不同码子，可以互尝一小口，记录自己更喜欢汤味、粉的口感还是配菜。早饭的体验无需追求名店排行，行程附近、当天实际营业的一碗同样能成为记忆。']],sources:[['华声在线 · 长沙米粉与炒码、煨码','https://hunan.voc.com.cn/news/202004/24701997.html'],['湖南日报 · 长沙米粉行业人物访谈','https://hunan.voc.com.cn/news/202005/24680487.html']]},
  {id:'stinky',group:'餐桌故事',title:'臭豆腐 · 闻到的与吃到的为何不同',day:'南门口 / 小吃',overview:'长沙臭豆腐的辨识度来自发酵卤水、炸制与汤汁共同形成的风味。非遗档案记录的是火宫殿这一支具体制作技艺的传承，并不代表所有摊位都具有同一非遗身份。',sections:[
    ['把非遗说准确','国家级非遗名录中的项目是2021年入选的“火宫殿臭豆腐制作技艺”。项目档案记载一支制作传承及其发展，不能由此认定所有长沙臭豆腐品牌都获得同一认定，也不把某一传承故事当作全国臭豆腐的唯一发明经过。你们的餐厅备选保持原样，本条不替任何门店作身份背书。'],
    ['风味是多个工序叠加的结果','项目资料将制作归纳为卤水、豆腐坯、浸泡、炸制与汤汁等环节。闻到的气味与入口后的味觉、口感并不是同一件事；外壳、内部和调味一起形成体验。不同摊位的材料与做法可能不同，不能凭外观判断具体配方或制作卫生状况。'],
    ['两人尝一小份就够','结合你们的微辣偏好，可以先问辣椒、辣油能否分开，点一小份共同尝试。各用三个自己的词描述味道，再看有没有相同答案。喜欢或不喜欢都可以写进回忆，无需把“必须爱吃”当作认识长沙的门槛。']],sources:[['中国非物质文化遗产网 · 火宫殿臭豆腐制作技艺','https://www.ihchina.cn/project_details/23593/']]},
  {id:'sugar',group:'餐桌故事',title:'糖油粑粑 · 糯米、糖与街头的热锅',day:'南门口 / 小吃',overview:'糖油粑粑的主角很朴素：糯米粉、糖和锅里的火候。它代表了街头甜食的一种日常手艺，适合与咸鲜小吃对照着尝，而不需要借神奇起源故事来证明价值。',sections:[
    ['简单原料，细看做法','湖南省政府的饮食介绍写到，糯米粉制成粑粑，在油锅与糖汁中翻滚制作，相关做法会使用红片糖、桂花糖等。原料少不等于没有手艺，成形、加热与裹糖都会影响成品。不同店家的版本与甜度可能不同，资料中的配方不作为所有摊位的统一标准。'],
    ['关于起源，哪些可以不急着相信','地方饮食文章常附带传说，但传说不等于可核验的发明年代与人物。相关政府介绍也把来历故事标为参考。本条保留材料与制作线索，不把治病等民间叙事当作事实。认识地方小吃，也可以从普通人的早餐、加餐和街头购买习惯进入。'],
    ['把一口甜留在记录里','你们可分一小份，稍放凉再尝，分别记录更在意糯米口感还是糖香。照片可以拍锅、盛装方式或手里的小份，按摊位允许的方式拍摄。回忆里写下当时在哪里站着、身边有什么声音，比只记一个“好吃”更具体。']],sources:[['湖南省政府 · 糖油粑粑介绍','https://www.hunan.gov.cn/hnszf/jxxx/hxwh/cwd/201711/t20171111_4685383.html']]},
  {id:'xiang',group:'餐桌故事',title:'湘菜与辣椒 · 今天的熟悉，也有传播历史',day:'湘菜 / 微辣点单',overview:'湘菜不只有辣。辣椒在湖南的普及经历了历史过程，地方饮食在食材、技术与生活中不断变化。理解这一点，就可以自在地尝湘味，同时选择适合两人的辣度。',sections:[
    ['辣椒不是自古不变的标记','关于辣椒传播的研究通过地方志等材料，讨论其在明清时期进入并逐渐传播的过程，其中可见湖南地区的记录。地方菜系是在变化中形成的，不能用今天的常见口味倒推所有古代湖南人都这样吃，也不能把辣度当作个人身份的考试。'],
    ['别用单一原因解释一种口味','贸易、迁移、食材取得与烹调选择，可以成为理解食物传播的线索。复杂的地方饮食不宜只用“天气潮湿所以吃辣”概括，更不能把辣椒写成疾病预防或治疗方法。你们可以同时留意鲜、香、咸与烹调方式，辣椒只是体验中的一个维度。'],
    ['对应你们的餐厅备选','费大厨、炊烟等保留在原有美食列表，本条介绍菜系背景，不保证门店能把每道菜改成完全不辣。点单仍按原提醒，明确少辣、辣油分开，并询问可做不辣的蒸蛋、汤或蔬菜。一起尝味道，比为了“地道”勉强吃辣更适合这次旅行。']],sources:[['华南农业大学 · 俞为洁《论辣椒在中国的选择性传播》','https://yjs.scau.edu.cn/2019/0512/c3176a185425/page.htm']]},
  {id:'guest',group:'餐桌故事',title:'客居风味 · 在长沙吃粤点与淮扬菜',day:'DAY1 / 清淡备选',overview:'茶港的粤式点心、南里晓舍的淮扬菜定位，是你们行程里的清淡备选。它们来自不同地域的饮食传统；在长沙相遇，本身也呈现现代城市餐桌的多样性。',sections:[
    ['粤点：吃饭也可以是一段相处时间','广州文旅资料介绍广府“一盅两件”的饮茶生活：茶与点心相伴，也让熟人有时间聊天。茶楼文化经历了从市井茶寮到丰富餐饮空间的发展。你们在茶港吃虾饺与肠粉，可以借这个背景理解粤点的分享方式，但不把特定长沙门店认定为某条历史传承的直接继承者。'],
    ['淮扬菜：从清鲜与手艺进入','江苏有关淮扬菜专家的介绍强调清鲜平和及刀工、火候。这样的风格背景能帮助理解行程为何安排淮扬菜作备选，但具体菜单、辣度与当天做法必须问店家，不能仅凭菜系名称作保证。这里讨论的是地域风味，不把粤点或淮扬菜说成长沙本地发明。'],
    ['给两个人的口味留空间','这顿饭可留下一个轻松问题：今天最想再点一次的是哪道菜，为什么？答案可以不同。宜家餐厅也继续保留为补给备选，不为它补写长沙传统故事。旅行中的餐桌既可以认识城市，也可以照顾疲惫、偏好与两人的相处节奏。']],sources:[['广州市文旅局 · 广府茶楼与饮茶文化','https://wglj.gz.gov.cn/ztmb/gzhyn/whgz/content/post_8832957.html'],['江苏人大 · 周晓燕谈淮扬菜','https://www.jsrd.gov.cn/hyzl/srdh/d_12469/dbtd/202602/t20260203_1307093.shtml']]}
];
(() => {
  'use strict';
  const names = { wu: '吴', cai: '蔡', both: '双人' };
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem('changsha-ui-v2') || '{}'); } catch {}
  const ui = { filter: 'all', session: prefs.session || '', connected: false, available: false,
    notes: [], expenses: [], changes: [], partnerToken: '', draftId: crypto.randomUUID(), saving: false, deleting: '' };
  const categories = ['餐饮', '交通', '门票', '住宿', '购物', '其他'];
  const apiOrigin = location.hostname === 'loveu-changsha-lets-go.github.io' ? 'https://changsha-for-two-october.chy2026us.chatgpt.site' : '';
  const pending = new Map();
  const originalRender = render;
  const originalDayCalendar = dayCalendar;
  const originalDay5 = structuredClone(days[4]);
  const originalEssential = structuredClone(essential);
  const baseReturns = { wu: { time: '07:24', end: '14:06', station: '长沙南站', code: 'G1778', to: '上海虹桥' }, cai: { time: '16:35', end: '10:52', station: '长沙站', code: 'K502/K503', to: '成都西' } };
  const stamp = (date, time) => new Date(`${date}T${time}:00+08:00`).getTime();
  const formatDate = value => new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
  const setPrefs = () => { try { localStorage.setItem('changsha-ui-v2', JSON.stringify(prefs)); } catch {} };
  const returns = () => local.return || structuredClone(baseReturns);
  const money = cents => `¥${(cents / 100).toFixed(2)}`;
  const leaveTime = (person, t) => shifted(t, person === 'wu' ? -99 : -125);
  const arriveTime = (person, t) => shifted(t, person === 'wu' ? -44 : -65);
  const cleanText = html => { const t = document.createElement('template'); t.innerHTML = html; return t.content.textContent.replace(/\s+/g, ' ').trim(); };
  function urgent(date, time) { const delta = stamp(date, time) - Date.now(); return delta >= 0 && delta <= 86400000; }
  async function request(endpoint, method = 'GET', value) {
    const res = await fetch(`${apiOrigin}/api/${endpoint}`, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ui.session}` }, body: value === undefined ? undefined : JSON.stringify(value), ...(typeof AbortSignal.timeout === 'function' ? {signal: AbortSignal.timeout(12000)} : {}) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || '共享服务暂时不可用');
    return data;
  }
  async function flush() {
    if (!ui.connected || ui.flushing) return;
    ui.flushing = true;
    try {
      // Serialize updates so rapid taps cannot overwrite a newer shared value.
      while (pending.size && ui.connected) {
        const [key,value] = pending.entries().next().value;
        await request('settings','PUT',value);
        if (pending.get(key) === value) pending.delete(key);
      }
      syncLabel('共享已连接 · 自动保存');
    } catch { syncLabel('有修改待保存，正在重试'); }
    finally { ui.flushing = false; }
  }
  function update(key, value, label) {
    local[key] = value; save();
    if (ui.connected) { pending.set(key, { key, value, label }); flush(); }
    else { ui.changes.unshift({ author: 'both', label: `${label}（此设备）`, created: new Date().toISOString() }); }
  }
  function syncLabel(label) { document.querySelectorAll('[data-sync-label]').forEach(x => { x.textContent = label; }); }
  async function refresh() {
    if (!ui.session) return;
    try {
      const data = await request('state');
      ui.connected = true; ui.author = data.author;
      ui.notes = data.notes; ui.expenses = data.expenses; ui.changes = data.changes;
      ui.partnerToken = data.partnerToken || '';
      const sharedChanges = Object.entries(data.settings).some(([key,value]) => !pending.has(key) && JSON.stringify(local[key]) !== JSON.stringify(value));
      Object.assign(local, data.settings, Object.fromEntries([...pending].map(([k, v]) => [k, v.value])));
      save(); applyReturns(); header();
      if (state.view === 'guide') fillShared();
      // Refresh remote edits without replacing an input while a traveler is typing.
      ui.needsRender ||= sharedChanges;
      if (!document.querySelector('input:focus,select:focus,textarea:focus')) {
        if (ui.needsRender) { ui.needsRender = false; render(); } else enhance();
      }
      syncLabel(pending.size ? '有修改待保存，正在重试' : '共享已连接 · 自动保存');
    } catch { ui.connected = false; syncLabel('暂时无法同步，输入仍保留'); }
  }
  function shifted(time, delta) {
    const total = Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + delta;
    return `${String(Math.floor(Math.max(0, total) / 60)).padStart(2, '0')}:${String(Math.max(0, total) % 60).padStart(2, '0')}`;
  }
  // The return cards, top notice, DAY5 and ICS derive from this one shared setting.
  function applyReturns() {
    const r = returns();
    days[4] = structuredClone(originalDay5);
    for (const [person, index] of [['wu', 2], ['cai', 6]]) {
      const trip = r[person], event = days[4].events[index];
      event.time = trip.time; event.end = person === 'cai' ? '23:59' : trip.end;
      event.title = `${names[person]}：${trip.code} → ${trip.to}`; event.place = trip.station;
      event.body = `10.07 ${trip.time} ${trip.station}出发，${person === 'cai' ? '10.08 ' : '10.07 '}${trip.end}抵达${trip.to}。时刻与席位请核对最终订单。`;
      event.transit = `目标 ${arriveTime(person, trip.time)} 前到站；如当天拥堵，可按导航进一步提前动身。`;
      const travel = days[4].events[person === 'wu' ? 1 : 5];
      travel.time = leaveTime(person, trip.time); travel.end = arriveTime(person, trip.time);
      travel.place = trip.station; travel.title = `${names[person]}取行李，去${trip.station}`;
      travel.body = `${travel.time}左右离开酒店，目标${travel.end}前到${trip.station}；早点出发，留出安检与检票缓冲。`;
      travel.transit = '以当前高德导航选择正规用车或地铁；早班车不依赖首班地铁。'; travel.extra = '最终时间以订单和当日运行安排为准。';
      if (person === 'wu') { days[4].events[0].time = shifted(trip.time, -144); days[4].events[0].end = shifted(trip.time, -104); }
    }
    days[4].route = `吴：酒店 → ${r.wu.station}；蔡：酒店 → ${r.cai.station} → ${r.cai.to}`;
    days[4].planB = `提前准备两种正规交通方式，吴目标${arriveTime('wu',r.wu.time)}前到${r.wu.station}，蔡目标${arriveTime('cai',r.cai.time)}前到${r.cai.station}。运行异常及时联系12306。`;
    for (let i = 0; i < essential.length; i++) {
      const old = originalEssential[i]; Object.assign(essential[i], old);
      if (old.date === '2026-10-07' && old.title.includes('G1778')) Object.assign(essential[i], { time: r.wu.time, end: r.wu.end, place: r.wu.station, title: `吴：${r.wu.code} ${r.wu.station} → ${r.wu.to}` });
      if (old.date === '2026-10-07' && old.title.includes('K502/K503')) Object.assign(essential[i], { time: r.cai.time, end: shifted(r.cai.time, 20), place: r.cai.station, title: `蔡：${r.cai.code} ${r.cai.station} → ${r.cai.to}` });
      if (old.date === '2026-10-08' && old.person === 'cai') Object.assign(essential[i], { time: r.cai.end, end: shifted(r.cai.end, 20), place: r.cai.to, title: `蔡：到${r.cai.to}，检查行李后下车` });
      if (old.date === '2026-10-07' && /去长沙南|去长沙站/.test(old.title)) {
        const t = r[old.person]; Object.assign(essential[i], { time: leaveTime(old.person,t.time), end: arriveTime(old.person,t.time), place: t.station, title: `${names[old.person]}：酒店出发去${t.station}`, body: `目标${arriveTime(old.person,t.time)}前到站；${t.time}发车，按实时导航提前出发。` });
      }
      if (old.date === '2026-10-07' && old.title.includes('吴：起床')) Object.assign(essential[i], { time: days[4].events[0].time, end: days[4].events[0].end, body: `${r.wu.time}从${r.wu.station}出发，提前准备早餐和随身证件。` });
      if (old.date === '2026-10-07' && /G1778|K502\/K503/.test(old.title)) essential[i].body = `${essential[i].title}；最终时刻与席位按订单核对。`;
    }
  }
  function header() {
    const r = returns(), box = document.querySelector('.critical');
    box.hidden = !!prefs.hideNotice;
    box.querySelector('p').textContent = `吴：10.07 ${r.wu.time} ${r.wu.station} → ${r.wu.to}；蔡：10.07 ${r.cai.time} ${r.cai.station} → ${r.cai.to}。10.06 晚提早休息。`;
  }
  function enhance() {
    const view = document.getElementById('view');
    document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-current', el.dataset.view === state.view ? 'page' : 'false'));
    if (state.view === 'itinerary') {
      if (!view.querySelector('.date-scroll-hint')) {
        const dates = view.querySelector('.days');
        dates.insertAdjacentHTML('afterend', '<div class="date-scroll-hint">左右滑动查看五天日程</div><div class="task-filters" aria-label="筛选旅伴">' + ['all', 'wu', 'cai', 'both'].map(k => `<button class="filter ${ui.filter === k ? 'active' : ''}" data-traveler-filter="${k}" aria-pressed="${ui.filter === k}">${k === 'all' ? '全部旅伴' : names[k]}</button>`).join('') + '</div>');
        // Keep the swipe cue accurate after rotation, resizing and horizontal scrolling.
        dates.addEventListener('scroll', dateScrollHint, {passive:true});
        dateScrollHint();
        requestAnimationFrame(() => { const selected = dates.querySelector('.active'); dates.scrollLeft = Math.max(0, selected.offsetLeft - dates.offsetLeft - (dates.clientWidth - selected.clientWidth)/2); dateScrollHint(); });
      }
      view.querySelectorAll('.event').forEach((el, i) => {
        const key = `event-${state.day}-${i}`, item = days[state.day].events[i];
        const person = local[`tag-${key}`] || eventPerson(state.day, i);
        const status = local[key] ? 'done' : (local[`progress-${key}`] || (Date.now() >= stamp(days[state.day].date, item.time) && Date.now() < stamp(days[state.day].date, item.end) ? 'active' : 'pending'));
        el.dataset.taskKey = key; el.dataset.taskIndex = i; el.dataset.person = person;
        el.classList.toggle('done', status === 'done'); el.classList.toggle('in-progress', status === 'active');
        el.classList.toggle('urgent', !local[key] && /赶车|已支付|返程|航班|车次/.test(item.kind + item.title) && urgent(days[state.day].date,item.time));
        el.tabIndex = 0; el.setAttribute('aria-label', `${item.time}至${item.end}，${item.title}，${status === 'done' ? '已完成' : status === 'active' ? '进行中' : '待完成'}，按空格切换完成`);
        el.hidden = ui.filter !== 'all' && ui.filter !== person;
        el.querySelector('.event-time').textContent = `${item.time}–${item.end}`;
        if (!el.querySelector('[data-task-person]')) el.querySelector('.event-top').insertAdjacentHTML('afterbegin', `<select class="tag-select" data-task-person="${key}" aria-label="任务旅伴">${['wu', 'cai', 'both'].map(k => `<option value="${k}" ${person === k ? 'selected' : ''}>${names[k]}</option>`).join('')}</select><button class="task-status" data-progress="${key}"></button>`);
        el.querySelector('[data-progress]').textContent = { done: '已完成', active: '进行中', pending: '待完成' }[status];
        el.querySelector('[data-progress]').setAttribute('aria-label', `任务状态：${{done:'已完成',active:'进行中',pending:'待完成'}[status]}，点击切换`);
        el.querySelector('[data-done]').checked = !!local[key];
      });
      if (!view.querySelector('.filter-empty')) view.querySelector('.timeline').insertAdjacentHTML('beforeend', '<p class="filter-empty meta">这一天没有该旅伴的任务。</p>');
      view.querySelector('.filter-empty').hidden = !!view.querySelector('.event:not([hidden])');
      view.querySelectorAll('[data-traveler-filter]').forEach(x => { x.classList.toggle('active', x.dataset.travelerFilter === ui.filter); x.setAttribute('aria-pressed',x.dataset.travelerFilter === ui.filter); });
    }
    if (state.view === 'food') {
      const visible = food.filter(f => state.area === '全部' || f.area === state.area);
      view.querySelectorAll('.food-card').forEach((el, i) => {
        const f = visible[i], id = food.indexOf(f);
        if (!el.querySelector('[data-food]')) el.insertAdjacentHTML('beforeend', `<div class="food-status"><button data-food="${id}" data-value="wish">♡ 想吃</button><button data-food="${id}" data-value="visited">✓ 已打卡</button></div><a class="address-link" href="${map(f.map)}" target="_blank" rel="noopener">${esc(f.map)}</a>`);
        el.querySelectorAll('[data-food]').forEach(x => { x.classList.toggle('selected', local[`food-${id}`] === x.dataset.value); x.setAttribute('aria-pressed',local[`food-${id}`] === x.dataset.value); });
      });
    }
    if (state.view === 'booking') {
      const deadlines = { park: ['2026-10-02', '23:59'], academy: ['2026-10-02', '23:59'], xpm: ['2026-10-03', '23:59'], li: ['2026-10-03', '23:59'], ktv: ['2026-10-02', '23:59'], car: ['2026-10-06', '20:00'], hotel: ['2026-10-02', '23:59'] };
      view.querySelectorAll('.reserve-card').forEach((el, i) => {
        const r = reservations[i], deadline = deadlines[r.id];
        el.classList.toggle('urgent', !local[`book-${r.id}`] && urgent(...deadline));
        el.querySelector('[data-book-note]').parentElement.firstChild.textContent = ui.connected ? '记下已预约时段或确认信息（与旅伴共享）' : '记下已预约时段或确认信息（仅此设备）';
        if (!el.querySelector('.deadline-note')) el.insertAdjacentHTML('beforeend', `<p class="deadline-note meta">准备事项截止：${deadline[0].slice(5)} ${deadline[1]}（计划检查时间，非官方放号时间）</p>`);
      });
    }
    if (state.view === 'tickets') {
      const cards = view.querySelectorAll('.ticket-card'), r = returns();
      [2, 3].forEach((index, j) => {
        const t = r[j ? 'cai' : 'wu'], card = cards[index];
        card.querySelector('h3').textContent = `${t.code} · ${j ? '10.07 → 10.08' : '10.07 周三'}`;
        const ends = card.querySelectorAll('.route-flight > div');
        ends[0].innerHTML = `<strong>${esc(t.time)}</strong><span>${esc(t.station)}</span>`;
        ends[1].innerHTML = `<strong>${esc(t.end)}${j ? ' +1' : ''}</strong><span>${esc(t.to)}</span>`;
        card.querySelector('p').textContent = `建议${leaveTime(j?'cai':'wu',t.time)}酒店出发，${arriveTime(j?'cai':'wu',t.time)}前到${t.station}。最终席位与运行状态按订单核对。`;
        card.querySelector('a').href = map(t.station);
      });
      cards.forEach((el, i) => el.classList.toggle('urgent', i < 4 && urgent(i === 1 ? '2026-10-02' : i === 0 ? '2026-10-03' : '2026-10-07', i === 0 ? '08:55' : i === 1 ? '16:34' : i === 2 ? r.wu.time : r.cai.time)));
      if (!view.querySelector('[data-edit-return]')) view.insertAdjacentHTML('beforeend', '<button class="secondary edit-return" data-edit-return>修改返程安排</button>');
    }
    if (state.view === 'guide') {
      if (!view.querySelector('#sharedPanel')) view.insertAdjacentHTML('afterbegin', sharedHTML());
      fillShared();
    }
    view.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.addEventListener('error', () => { const p = document.createElement('div'); p.className = 'image-placeholder'; p.textContent = '图片暂未加载，可稍后查看原图'; img.replaceWith(p); }, { once: true }); });
    dateScrollHint();
  }
  function dateScrollHint() {
    const dates = document.querySelector('.days'), hint = document.querySelector('.date-scroll-hint'); if (!dates || !hint) return;
    const overflow = dates.scrollWidth - dates.clientWidth;
    hint.hidden = overflow <= 2;
    hint.textContent = dates.scrollLeft <= 2 ? '向左滑动，查看后面的日期' : dates.scrollLeft >= overflow-2 ? '已到 DAY5 · 向右滑动返回' : '左右滑动，查看五天日程';
    dates.classList.toggle('more-dates',dates.scrollLeft < overflow-2);
  }
  function sharedHTML() {
    return `<section id="sharedPanel" class="collaboration"><div class="section-bar"><h2>两个人的备忘</h2><span class="meta" data-sync-label>${ui.connected ? '共享已连接 · 自动保存' : '尚未连接共享旅行'}</span></div>
      <div id="connectPanel"><p>创建后，把旅伴专属链接发给对方。备忘和记账保存在同一份旅行中。</p><label>我是<select id="createAuthor"><option value="wu">吴</option><option value="cai">蔡</option></select></label><button class="primary" id="createShared">创建共享旅行</button><p id="sharedError" class="meta" role="status"></p></div>
      <div id="sharedConnected" hidden><div class="actions"><span id="identity" class="pill"></span><button id="sharePartner">复制旅伴链接</button><button id="disconnectShared">断开此设备</button></div><label class="memo-label">记下想说的话<textarea id="memoDraft" maxlength="2000" rows="3" placeholder="比如：明天想试试那家虾饺……"></textarea></label><div class="draft-actions"><span id="draftStatus" role="status">停下输入后自动保存</span><button class="small" id="newMemo">另写一条</button></div><div id="memoList"></div></div>
      <article class="guide-card packing-card"><h3>行李清单</h3><div class="packing-grid">${['身份证 / 学生证', '充电宝 / 充电线', '水 / 纸巾', '薄外套', '折叠伞', '舒适鞋', '常用药', '列车晚饭 / 早餐'].map((x, i) => `<label><input type="checkbox" data-pack="${i}"> ${x}</label>`).join('')}</div><p class="meta">${ui.connected ? '与旅伴共享勾选' : '未连接时，勾选仅保存在此设备'}</p></article>
      <article class="guide-card budget-card"><h3>旅行小账本</h3><label>总预算（元）<input id="budgetLimit" type="number" min="0" max="1000000" step="0.01" value="${Number(local.budget ?? 2680)}"></label><div id="budgetSummary"></div><form id="expenseForm"><label>金额<input name="amount" type="number" min="0.01" max="1000000" step="0.01" required inputmode="decimal"></label><label>分类<select name="category">${categories.map(c => `<option>${c}</option>`).join('')}</select></label><label>付款人<select name="payer"><option value="wu">吴</option><option value="cai">蔡</option><option value="both">双人均付</option></select></label><label>日期<input name="date" type="date" value="2026-10-03" required></label><label class="full">备注<input name="text" maxlength="200" placeholder="例如：午饭"></label><button class="primary" type="submit">记一笔</button><span class="meta" id="expenseStatus" role="status"></span></form><div id="expenseList"></div></article>
      <details class="changes"><summary>最近的修改记录</summary><div id="changeList"></div></details></section>`;
  }
  function fillShared() {
    const panel = document.getElementById('sharedPanel'); if (!panel) return;
    document.getElementById('connectPanel').hidden = !!ui.session;
    document.getElementById('sharedConnected').hidden = !ui.session;
    document.getElementById('identity').textContent = `我是${names[ui.author] || '旅伴'}`;
    document.getElementById('sharePartner').hidden = !ui.partnerToken;
    document.querySelectorAll('[data-pack]').forEach(el => { el.checked = !!local[`pack-${el.dataset.pack}`]; });
    const draft = document.getElementById('memoDraft');
    if (!draft.value && prefs.draft) draft.value = prefs.draft;
    document.getElementById('memoList').innerHTML = ui.notes.map(n => `<article class="memo-card ${n.id === ui.draftId ? 'editing' : ''}"><div class="memo-meta"><strong>${names[n.author]}</strong><time datetime="${esc(n.updated)}">${formatDate(n.updated)}</time>${n.id === ui.draftId ? '<span>正在编辑</span>' : ''}</div><p>${esc(n.text)}</p>${n.author === ui.author ? `<div class="actions"><button data-edit-note="${n.id}">编辑</button><button data-delete-note="${n.id}">删除我的留言</button></div>` : ''}</article>`).join('') || '<p class="memo-empty">还没有留言，写下第一条吧。</p>';
    const total = ui.expenses.reduce((s, e) => s + e.cents, 0), wu = ui.expenses.reduce((s, e) => s + (e.payer === 'wu' ? e.cents : e.payer === 'both' ? e.cents / 2 : 0), 0), cai = total - wu;
    const limit = Number(local.budget ?? 2680);
    document.getElementById('budgetSummary').innerHTML = `<div class="stat-row"><div class="stat">已消费<strong>${money(total)}</strong></div><div class="stat">预算剩余<strong>${money(limit * 100 - total)}</strong></div></div><p class="meta">吴支付 ${money(wu)} · 蔡支付 ${money(cai)} · 每人均摊 ${money(total / 2)}</p><div class="category-totals">${categories.map(c => `<span>${c} ${money(ui.expenses.filter(e => e.category === c).reduce((s, e) => s + e.cents, 0))}</span>`).join('')}</div>`;
    document.getElementById('expenseList').innerHTML = ui.expenses.map(e => `<div class="expense-row"><div><strong>${money(e.cents)}</strong> · ${e.category}<p class="meta">${e.date} · ${names[e.payer]}付款${e.text ? ` · ${esc(e.text)}` : ''}</p></div>${e.author === ui.author ? `<button class="small" data-delete-expense="${e.id}">删除</button>` : ''}</div>`).join('');
    document.getElementById('expenseForm').querySelector('button').disabled = !ui.connected;
    document.getElementById('expenseStatus').textContent = ui.connected ? '' : '连接共享旅行后即可记账';
    document.getElementById('changeList').innerHTML = ui.changes.map(x => `<p class="meta">${names[x.author] || '旅伴'} · ${formatDate(x.created)}<br>${esc(x.label)}</p>`).join('') || '<p class="meta">还没有修改记录。</p>';
  }
  async function saveDraft() {
    const draft = document.getElementById('memoDraft'), value = draft?.value ?? prefs.draft ?? '';
    if (!value.trim()) return true;
    const status = text => { const el = document.getElementById('draftStatus'); if (el) el.textContent = text; };
    prefs.draft = value; prefs.draftId = ui.draftId; setPrefs();
    if (!ui.connected || ui.saving || ui.deleting) return false;
    const id = ui.draftId; ui.saving = true;
    if (ui.notes.some(n => n.id === id && n.text === value.trim())) { ui.saving = false; status('已自动保存'); return true; }
    status('保存中…');
    try {
      await request(`notes/${id}`, 'PUT', { text: value });
      status('已自动保存');
      await refresh();
      return true;
    } catch (e) { status(`${e.message}，输入已保留`); return false; }
    finally { ui.saving = false; if ((document.getElementById('memoDraft')?.value ?? prefs.draft) !== value) saveDraft(); }
  }
  function exportText() {
    return `长沙let's go！\n2026.10.03—10.07 · 伊麦酒店 / 涂家冲\n\n${days.map((d, i) => `DAY${i + 1} ${d.date} ${d.title}\n${d.events.map((e, n) => `${e.time}–${e.end} [${names[local[`tag-event-${i}-${n}`] || eventPerson(i, n)]}] ${e.title}\n地址：${e.place}\n${e.body}\n交通：${e.transit}`).join('\n\n')}\n雨天 / 人流备选：${d.planB}`).join('\n\n')}\n\n提醒：时刻以订单为准，计划不会替你预约。`;
  }
  function preparePrint() {
    document.getElementById('printTrip').innerHTML = `<h1>长沙let's go！</h1><p>2026.10.03–10.07 · 双人 · 伊麦酒店 / 涂家冲</p>${days.map((d, i) => `<section class="print-day"><h2>DAY ${i + 1} · ${d.date} · ${d.title}</h2><p>${esc(d.route)}</p>${d.events.map((e, n) => `<article><strong>${e.time}–${e.end} · ${names[local[`tag-event-${i}-${n}`] || eventPerson(i, n)]} · ${esc(e.title)}</strong><p>${esc(e.body)}</p><p>地址：${esc(e.place)}<br>交通：${esc(e.transit)}</p></article>`).join('')}<p>备选：${esc(d.planB)}</p></section>`).join('')}<section><h2>餐厅备选</h2>${food.map(f => `<article><strong>${esc(f.name)} · ${esc(f.branch)}</strong><p>${esc(f.cost)} · ${esc(f.order)}</p><p>地址检索：${esc(f.map)}</p></article>`).join('')}</section>`;
  }
  function downloadText() { const url = URL.createObjectURL(new Blob([exportText()], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = '长沙双人行程.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 3000); }
  function search(q) {
    const box = document.getElementById('searchResults'); q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    const results = [];
    // Cultural entries have their own search targets, including expanded text.
    if (typeof cityStories !== 'undefined') cityStories.forEach(s => results.push({ view: 'guide', story: s.id, title: s.title, text: [s.overview, ...s.sections.flat()].join(' ') }));
    days.forEach((d, day) => d.events.forEach((e, index) => results.push({ view: 'itinerary', day, index, title: `DAY${day + 1} ${e.time} · ${e.title}`, text: Object.values(e).join(' ') })));
    food.forEach(f => results.push({ view: 'food', title: `${f.name} · ${f.branch}`, text: Object.values(f).join(' ') }));
    reservations.forEach(r => results.push({ view: 'booking', title: r.name, text: Object.values(r).join(' ') }));
    essential.forEach(e => results.push({ view: 'tickets', title: e.title, text: Object.values(e).join(' ') }));
    results.push({ view: 'guide', title: '出行备忘 · 交通、天气、预算与行李', text: cleanText(renderGuide()) });
    ui.notes.forEach(n => results.push({ view: 'guide', title: `${names[n.author]}的备忘`, text: n.text }));
    ui.expenses.forEach(e => results.push({ view: 'guide', title: `${e.category} · ${money(e.cents)}`, text: `${e.category} ${e.text} ${e.date}` }));
    const hits = results.filter(r => `${r.title} ${r.text}`.toLowerCase().includes(q)).slice(0, 25);
    box.hidden = false; box.innerHTML = hits.map(r => `<button data-search-view="${r.view}" ${r.story ? `data-search-story="${r.story}"` : ''} ${r.day !== undefined ? `data-search-day="${r.day}" data-search-index="${r.index}"` : ''}><strong>${esc(r.title)}</strong><span>${esc(r.text.slice(0, 100))}</span></button>`).join('') || '<p>没有匹配内容，试试景点、菜名或车次。</p>';
  }
  function editReturnDialog() {
    const r = returns(); document.getElementById('returnFields').innerHTML = ['wu', 'cai'].map(person => `<fieldset><legend>${names[person]} · 10.07返程${person === 'cai' ? ' / 次日到达' : ''}</legend>${[['time', '出发时间', 'time'], ['end', '到达时间', 'time'], ['station', '出发车站', 'text'], ['code', '车次', 'text'], ['to', '到达车站', 'text']].map(([key, label, type]) => `<label>${label}<input name="${person}-${key}" type="${type}" maxlength="60" required value="${esc(r[person][key])}"></label>`).join('')}</fieldset>`).join(''); document.getElementById('returnDialog').showModal();
  }
  document.documentElement.dataset.theme = prefs.theme || 'light';
  document.querySelector('.topbar').insertAdjacentHTML('afterend', '<div class="global-tools"><label class="search-label"><span class="sr-only">搜索全攻略</span><input id="globalSearch" type="search" placeholder="搜索景点、美食、车次或备忘…" autocomplete="off"></label><button class="small" id="themeToggle" aria-label="切换浅色或暗色模式">明暗切换</button><div id="searchResults" hidden role="region" aria-label="搜索结果"></div></div><div class="export-tools"><button class="small" id="exportPDF">PDF / 打印行程</button><button class="small" id="exportText">导出纯文本</button><button class="small" id="showNotice">返程提示</button></div>');
  document.querySelector('.critical').insertAdjacentHTML('beforeend', '<button class="notice-close" id="hideNotice" aria-label="收起返程提示">×</button>');
  document.body.insertAdjacentHTML('beforeend', '<button id="backTop" class="back-top" aria-label="返回顶部" hidden>↑</button><section id="printTrip"></section><dialog id="returnDialog"><form id="returnForm"><div class="dialog-head"><h2>修改返程安排</h2><button class="close" type="button" id="closeReturn" aria-label="关闭">×</button></div><p>顶部提示、DAY5、票住和日历提醒一起更新。修改时刻后，请核对当日交通缓冲。</p><div id="returnFields"></div><button class="primary wide" type="submit">保存返程安排</button></form></dialog>');
  render = function() { originalRender(); enhance(); header(); document.getElementById('view').classList.remove('view-enter'); requestAnimationFrame(() => document.getElementById('view').classList.add('view-enter')); };
  dayCalendar = (d,i) => originalDayCalendar(d,i).map((e,n) => ({...e,person:local[`tag-event-${i}-${n}`] || e.person}));
  applyReturns(); render();
  document.getElementById('globalSearch').addEventListener('input', e => search(e.target.value));
  document.getElementById('globalSearch').addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('searchResults').hidden = true; });
  document.addEventListener('click', async e => {
    const button = e.target.closest('button'), row = e.target.closest('.event');
    if (row && !e.target.closest('button,a,input,select,label,summary,details')) { const checkbox = row.querySelector('[data-done]'); checkbox.checked = !checkbox.checked; checkbox.dispatchEvent(new Event('change', { bubbles: true })); }
    if (!button) return;
    if (button.dataset.travelerFilter) { ui.filter = button.dataset.travelerFilter; enhance(); }
    else if (button.dataset.progress) { const key = button.dataset.progress; update(key, false, '调整任务状态'); update(`progress-${key}`, local[`progress-${key}`] === 'active' ? 'pending' : 'active', '调整任务状态'); enhance(); }
    else if (button.dataset.food !== undefined) { const key = `food-${button.dataset.food}`; update(key, local[key] === button.dataset.value ? '' : button.dataset.value, '更新美食打卡'); enhance(); }
    else if (button.dataset.searchView) { state.area = '全部'; ui.filter = 'all'; if (button.dataset.searchDay !== undefined) state.day = Number(button.dataset.searchDay); changeView(button.dataset.searchView); document.getElementById('searchResults').hidden = true; if (button.dataset.searchStory) openCityStory(button.dataset.searchStory); const target = document.querySelector(`[data-task-index="${button.dataset.searchIndex}"]`); if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); target.classList.add('search-hit'); } }
    else if (button.hasAttribute('data-edit-return')) editReturnDialog();
    else if (button.dataset.deleteNote || button.dataset.deleteExpense) {
      const kind = button.dataset.deleteNote ? 'notes' : 'expenses', id = button.dataset.deleteNote || button.dataset.deleteExpense;
      if (ui.saving || ui.deleting) { toast('正在保存，请稍后再试'); return; }
      ui.deleting = id; clearTimeout(draftTimer); button.disabled = true;
      try {
        await request(`${kind}/${id}`, 'DELETE');
        // Retire a deleted draft so the retry timer cannot recreate that message.
        if (kind === 'notes' && id === ui.draftId) { ui.draftId = crypto.randomUUID(); prefs.draftId = ui.draftId; prefs.draft = ''; setPrefs(); document.getElementById('memoDraft').value = ''; document.getElementById('draftStatus').textContent = '停下输入后自动保存'; }
        await refresh();
      } catch (err) { toast(err.message); }
      finally { ui.deleting = ''; button.disabled = false; }
    }
    else if (button.dataset.editNote) { const note = ui.notes.find(n => n.id === button.dataset.editNote); ui.draftId = note.id; prefs.draftId = note.id; prefs.draft = note.text; setPrefs(); document.getElementById('memoDraft').value = note.text; document.getElementById('memoDraft').focus(); fillShared(); }
    else if (button.id === 'themeToggle') { prefs.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = prefs.theme; setPrefs(); }
    else if (button.id === 'hideNotice') { prefs.hideNotice = true; setPrefs(); header(); }
    else if (button.id === 'showNotice') { prefs.hideNotice = false; setPrefs(); header(); }
    else if (button.id === 'backTop') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (button.id === 'exportText') downloadText();
    else if (button.id === 'exportPDF') { preparePrint(); window.print(); }
    else if (button.id === 'closeReturn') document.getElementById('returnDialog').close();
    else if (button.id === 'createShared') {
      button.disabled = true;
      try { const result = await request('rooms', 'POST', { author: document.getElementById('createAuthor').value }); ui.session = result.token; prefs.session = result.token; setPrefs(); await refresh(); for(const [key,value] of Object.entries(local)) if (/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(key)) pending.set(key,{key,value,label:'同步已有旅行记录'}); await flush(); render(); }
      catch (err) { document.getElementById('sharedError').textContent = '共享暂不可用。需要先连接保存服务，再邀请旅伴；输入不会被标记为已同步。'; }
      finally { button.disabled = false; }
    }
    else if (button.id === 'disconnectShared') { ui.session = ''; ui.connected = false; ui.notes = []; ui.expenses = []; ui.partnerToken = ''; prefs.session = ''; pending.clear(); setPrefs(); render(); }
    else if (button.id === 'sharePartner') { const link = `${location.origin}${location.pathname}#join=${ui.partnerToken}`; try { await navigator.clipboard.writeText(link); toast('旅伴专属链接已复制，请仅发给旅伴'); } catch { const input = document.createElement('input'); input.value = link; button.after(input); input.select(); toast('请复制框内的旅伴链接'); } }
    else if (button.id === 'newMemo') { if (!await saveDraft()) { toast('请等备忘保存成功后再另写一条'); return; } ui.draftId = crypto.randomUUID(); prefs.draft = ''; prefs.draftId = ui.draftId; setPrefs(); document.getElementById('memoDraft').value = ''; document.getElementById('draftStatus').textContent = '停下输入后自动保存'; fillShared(); }
  });
  document.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.done) { update(el.dataset.done, el.checked, '勾选日程任务'); enhance(); }
    else if (el.dataset.book) update(`book-${el.dataset.book}`, el.checked, '更新预约确认');
    else if (el.dataset.bookNote) update(`note-${el.dataset.bookNote}`, el.value, '修改预约备注');
    else if (el.dataset.taskPerson) { update(`tag-${el.dataset.taskPerson}`, el.value, '调整任务旅伴'); enhance(); }
    else if (el.dataset.pack !== undefined) update(`pack-${el.dataset.pack}`, el.checked, '更新行李清单');
    else if (el.id === 'budgetLimit') { const v = Number(el.value); if (Number.isFinite(v) && v >= 0 && v <= 1000000) { update('budget', v, '修改旅行预算'); fillShared(); } }
  });
  let draftTimer;
  document.addEventListener('input', e => { if (e.target.id === 'memoDraft') { prefs.draft = e.target.value; prefs.draftId = ui.draftId; setPrefs(); clearTimeout(draftTimer); draftTimer = setTimeout(saveDraft, 700); } });
  document.addEventListener('submit', async e => {
    if (e.target.id === 'expenseForm') {
      e.preventDefault(); const form = e.target, button = form.querySelector('button'); button.disabled = true;
      try { await request(`expenses/${crypto.randomUUID()}`, 'PUT', Object.fromEntries(new FormData(form))); form.reset(); await refresh(); }
      catch (err) { document.getElementById('expenseStatus').textContent = err.message; }
      finally { button.disabled = !ui.connected; }
    }
    if (e.target.id === 'returnForm') {
      e.preventDefault(); const input = new FormData(e.target), r = structuredClone(baseReturns);
      for (const person of ['wu', 'cai']) for (const key of ['time', 'end', 'station', 'code', 'to']) r[person][key] = String(input.get(`${person}-${key}`)).trim();
      if (r.wu.end <= r.wu.time || r.cai.time > '23:30' || r.wu.time < '03:00' || r.cai.time < '03:00') { toast('请核对当日到达时间与出发时段'); return; }
      update('return', r, '修改返程安排，联动DAY5与提醒'); applyReturns(); document.getElementById('returnDialog').close(); render();
    }
  });
  window.addEventListener('scroll', () => { document.getElementById('backTop').hidden = window.scrollY < 400; }, { passive: true });
  window.addEventListener('resize',dateScrollHint,{passive:true});
  document.addEventListener('keydown',e => { if (e.target.matches('.event') && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); e.target.querySelector('[data-done]').click(); } });
  window.addEventListener('beforeprint', preparePrint);
  if (prefs.draftId) ui.draftId = prefs.draftId;
  const invitation = new URLSearchParams(location.hash.slice(1)).get('join');
  if (invitation) {
    if (invitation !== ui.session) {
      // A new invitation must not bring a previous room's notes or settings along.
      for (const key of Object.keys(local)) if (/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(key)) delete local[key];
      save(); prefs.draft = ''; ui.draftId = crypto.randomUUID(); prefs.draftId = ui.draftId;
    }
    ui.session = invitation; prefs.session = invitation; setPrefs(); history.replaceState(null, '', location.pathname + location.search); changeView('guide');
  }
  request('health').then(() => { ui.available = true; }).catch(() => {});
  refresh();
  setInterval(async () => { if (ui.session) { await refresh(); await flush(); if(ui.connected && prefs.draft) await saveDraft(); } }, 5000);
  setInterval(() => { if (!document.querySelector('input:focus,textarea:focus,select:focus')) enhance(); }, 60000);
})();

// Cultural reading stays within the existing five tabs; it never changes a task's status.
function openCityStory(id) {
  const story = cityStories.find(s => s.id === id);
  if (!story) return;
  const dialog = document.getElementById('cityStoryDialog');
  dialog.innerHTML = `<div class="dialog-head"><div><span class="eyebrow">${esc(story.group)} · ${esc(story.day)}</span><h2 id="cityStoryTitle">${esc(story.title)}</h2></div><button class="close" data-close-story aria-label="关闭城市故事">×</button></div><p class="story-lead">${esc(story.overview)}</p>${story.sections.map(([heading,text]) => `<section class="story-chapter"><h3>${esc(heading)}</h3><p>${esc(text)}</p></section>`).join('')}<aside class="story-sources"><h3>资料与延伸阅读</h3><ul>${story.sources.map(([label,url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a></li>`).join('')}</ul><p class="meta">整理核对：2026.10.02。历史资料用于背景阅读；“现场怎么看”等互动建议为本行程策划。</p></aside>`;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
(() => {
  const original = render;
  const guide = renderGuide;
  const storyCard = s => `<article class="city-story-card"><span class="eyebrow">${esc(s.day)}</span><h3>${esc(s.title)}</h3><p>${esc(s.overview)}</p><button class="small" data-city-story="${s.id}">展开背景与游览提示 →</button></article>`;
  const inlineStory = ids => `<details class="story-inline"><summary>这里的故事 · 先读30秒</summary>${ids.map(id => {const s = cityStories.find(x => x.id === id);return `<h4>${esc(s.title)}</h4><p>${esc(s.overview)}</p><button class="small" data-city-story="${id}">继续了解 →</button>`;}).join('')}</details>`;
  const places = [['岳麓书院','yuelu'],['爱晚亭','aiwan'],['橘子洲','orange'],['杜甫江阁','dufu'],['开福寺','kaifu'],['谢子龙','xpm'],['李自健','zijian'],['五一广场','wuyi'],['黄兴路','huangxing']];
  const foodStories = [['guest'],['guest'],[],['xiang'],['xiang'],['guest'],['stinky'],['rice','sugar']];
  renderGuide = function() {
    return `${guide()}<section id="cityLibrary" class="city-library" aria-labelledby="cityLibraryTitle"><div class="city-intro"><span class="eyebrow">CITY STORIES · 先总览，再走近</span><h2 id="cityLibraryTitle">读懂长沙，再留自己的故事</h2><p>先用三条线认识这座城：岳麓山与书院连接山林和求学；湘江与橘子洲、江阁连接地理、诗词与青年记忆；街巷、艺术馆和一碗米粉，把历史带回普通人的日常。下面围绕你们已经安排的路线展开，读完概览，再挑感兴趣的背景继续看。</p><p class="meta">山水与人文 → 街巷与艺术 → 餐桌故事。每篇附可追溯资料，现场观察与双人提问单独成段。</p></div>${['山水与人文','街巷与艺术','餐桌故事'].map(group => `<section class="city-group"><h3>${group}</h3><div class="city-story-grid">${cityStories.filter(s => s.group === group).map(storyCard).join('')}</div></section>`).join('')}</section>`;
  };
  document.body.insertAdjacentHTML('beforeend','<dialog id="cityStoryDialog" class="city-story-dialog" aria-labelledby="cityStoryTitle"></dialog>');
  document.querySelector('.export-tools').insertAdjacentHTML('beforeend','<button class="small" id="showCityStories">读懂长沙</button>');
  function decorate() {
    if (state.view === 'itinerary') document.querySelectorAll('.event').forEach((el,i) => {
      if (el.querySelector('.story-inline')) return;
      const event = days[state.day].events[i];
      const ids = [...new Set(places.filter(([word]) => event.title.includes(word)).map(([,id]) => id))];
      if (ids.length) el.querySelector('.actions').insertAdjacentHTML('beforebegin',inlineStory(ids));
    });
    if (state.view === 'food') {
      const visible = food.filter(f => state.area === '全部' || f.area === state.area);
      document.querySelectorAll('.food-card').forEach((el,i) => {
        const ids = foodStories[food.indexOf(visible[i])];
        if (ids?.length && !el.querySelector('.story-inline')) el.querySelector('.actions').insertAdjacentHTML('beforebegin',inlineStory(ids));
      });
    }
  }
  render = function() { original(); decorate(); };
  document.addEventListener('click',e => {
    const button = e.target.closest('button');
    if (!button) return;
    if (button.dataset.cityStory) openCityStory(button.dataset.cityStory);
    if (button.hasAttribute('data-close-story')) document.getElementById('cityStoryDialog').close();
    if (button.id === 'showCityStories') { changeView('guide'); document.getElementById('cityLibrary').scrollIntoView({behavior:'smooth',block:'start'}); }
  });
  render();
})();
