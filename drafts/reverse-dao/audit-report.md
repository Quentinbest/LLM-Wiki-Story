---
title: "Story Audit — 《废徒倒丹》"
type: note
lang: zh
date: 2026-05-21
author: claude
status: partial (subtext-whisperer pending)
project: reverse-dao
critics_run:
  - antagonism-stress-tester (2026-05-14) → yellow
  - crisis-climax-auditor (2026-05-10) → green-with-conditions
  - cliche-hunter (2026-05-16) → green
  - composition-conductor (2026-05-15) → pass-with-revision
  - exposition-smuggler (2026-05-15) → pass
  - subtext-whisperer (2026-05-21) → pass-with-narrator-cleanup
related: ["antagonism-test", "crisis-climax-audit", "cliche-hunt", "composition-audit", "exposition-ledger", "subtext-audit"]
---

# Story Audit — 《废徒倒丹》
Date: 2026-05-21

---

## Overall Verdict: **NEEDS WORK → PASS AFTER REVISION** (structural predicates clear; 5 critical items address-before-prose; narrator cleanup is polish-phase)

结构层干净。Crisis 是真两难、Climax 因果链严密、MDQ 以反讽两段清晰回答、Controlling Idea 物理戏剧化、0 cliché、铺陈 27/29 已走弹药模式。但 **对抗中段有 5 处松弛**（Act 2/3 节奏 plateau 风险）、**师傅三条伏笔有 2 条几乎零铺陈**（violates inevitable+unexpected）、**同盟对抗未在 Act 2/3 启用**（中段对抗力量低于应有密度）。这些是修稿前的必修项，不涉及结构重建。

---

## Structural Predicates

| 结构谓词 | 状态 | 来源 |
|---|---|---|
| 每场戏都有 turning point（value charge 跃迁） | ✅ | composition-conductor: unity 不存在裂缝 |
| Crisis 是 true dilemma（非 hard choice） | ✅ | crisis-climax-auditor §1.2 |
| Climax 流自 Crisis 决定（非巧合） | ✅ | crisis-climax-auditor §2：因果链上没有作者方便的痕迹 |
| MDQ 被回答 | ✅ | crisis-climax-auditor §3.3：反讽两段都清晰 |
| Controlling Idea 在 Climax 物理戏剧化 | ✅ | crisis-climax-auditor §4：拍 3 合上，非台词陈述 |
| 类型必备场景兑现 | ✅ | crisis-climax-auditor §4.5：三类型同时燃烧 |
| No clichés unearned | ✅ | cliche-hunter: 0 触发 / 18+6 项全部 honor |
| Subtext holds throughout | ✅ PASS（旁白层有清理项） | subtext-whisperer: 对话层 0 on-the-nose；问题在旁白（叙述者 decode 动作）→ 见 subtext-audit.md |

---

## Critical Issues（必修——在进入 polish pass 前）

### C1 — 师傅"凝魂丹 30 岁那一炉退缩"伏笔完全缺失
**位置**: Seq 4.2 终极反转 B / 师妹台词"父亲，您当年炼凝魂丹也是反着炼了一半的"  
**批评者**: composition-conductor §4 #1 + antagonism-test §4.4 伏笔 #3  
**问题**: 这句台词是 Act 4 最关键的 revelation 之一——师傅一辈子立的"正"从第一炉就有过裂缝。但 Act 1-3 中没有任何场景为"师傅 30 岁那一炉有不寻常之处"植入哪怕隐微的种子。McKee 硬要求"inevitable + unexpected"——当前形态是"100% unexpected"，缺必然性的铺陈。读者在 Seq 4.2 听见师妹这句话时应当感到"我早该知道"而不是"哦原来还有这事"。  
**最小修订**: Seq 2.4 沉鸠铜镜场景，沉鸠多说一句："你师傅那一炉凝魂丹炼了七日七夜，第三日他在丹炉前停了一刻钟——没人知道他在想什么。"（约 50-100 字）这一句让读者在 Act 2 中段隐隐感到那炉有不寻常；终极反转 B 师妹说出"反着炼了一半"时有必然感。  
**优先级**: P0（动笔前必锁）

---

### C2 — 师傅"食指一抖"伏笔零铺陈（死铺陈）
**位置**: characters/master §1.1 微动作 1 / 全篇无任何场景埋点  
**批评者**: antagonism-test §4.4 伏笔 #2  
**问题**: 师傅听到"反"字时右手食指微微一抖——这是他 22 岁挖尸三个月留下的神经反射，是他真实性格（一辈子的赌注）最精细的物理化。但 spine 上 **没有任何一场戏**明确写出这一动作。按 McKee Ch. 15 铺陈即弹药硬规则"任何不被点燃的铺陈被砍"——食指一抖目前是死铺陈（character file 里有，正稿里无）。  
**最小修订**: C5（师傅亲口说"你这是在杀我"之前）+ C8（师傅听见全场雷动喊"反方亦道"之前）+ 终极反转 B（师妹说"反着炼了一半"之前）三处各明确写出师傅食指抖的微动作，每处约 20-30 字，总代价约 80 字。  
**优先级**: P0

---

### C3 — C2 联盟追杀令对抗下行（违反渐进复杂化）
**位置**: Seq 1.3 联盟追杀令颁布  
**批评者**: antagonism-test §2 weak-point #1  
**问题**: Act 1 对抗曲线：激励事件 10 → C1 街市验方 10 → **C2 联盟追杀令 8** → C3 三月后大典 10。C2 比 C1 低 2 分，违反 McKee Ch. 9 渐进复杂化的递增要求。问题根源在于 C2 没有任何具体的人在压主角——追杀令是体制动作（超个人对抗 4），但个人对抗仅 2（师傅不在场 / 师妹仍"已死" / 司徒明璋尚未出现）。  
**最小修订**: Seq 1.3 添加联盟长老杜九阙当面施压的一帧（约 500-800 字）。杜九阙不是 villain——他是"老一辈正方丹师看你天赋劝你保命"的类型，这是 McKee 同情者即对抗的经典形态。字数可从 Seq 1.4（3.5-4.5K）压缩 0.5K 吸收。  
**优先级**: P1（建议修，写稿前）

---

### C4 — 同盟对抗未启用（沉鸠/师妹/师弟遗物纯粹揭露而非施压）
**位置**: Seq 2.1-2.5 沉鸠段 / Seq 3.4 师妹段 / Seq 2.2 师弟手札段  
**批评者**: antagonism-test §5  
**问题**: McKee Ch. 14 明确："同盟也可以是对抗源，因为爱会拉走主角的资源。"本作中沉鸠/师妹/师弟遗物的全部功能是揭露和帮助，没有任何一帧让同盟的爱与主角的 want 真正撞上。这导致 Act 2/3 中段缺少一类对抗维度，对抗曲线在 C4-C7 段出现 plateau。  
**最小修订（分三处）**:  
- a) Seq 2.4 沉鸠铜镜场后添加："你要答应我，立宗那一炉用人为核。"（约 300 字，爱之对抗启用）  
- b) Seq 3.4 师妹睁眼后的第二句话增加质疑方向："师兄，这次你别照方子来——但这次方子是你自己写的，你要不要照你自己的方子来？"（约 500 字，让师妹的爱质问主角的胜利姿势）  
- c) Seq 2.2 师弟手札末尾残页添加第三句："师兄，如果你看见这卷——别照我的方子来。"（约 300 字，师弟遗物升级为部分爱之对抗）  
**优先级**: P1

---

### C5 — Seq 4.4 字数预算过紧（Climax 七拍需扩展）
**位置**: Act 4 / Seq 4.4（Climax 七拍 + Resolution）  
**批评者**: crisis-climax-auditor §7  
**问题**: 当前 Act 4 字数预算（10-12K）中 Climax 七拍 + Resolution 约 4-5K，但按各拍信息密度精算后最少需要 4.1K、理想形态需要 5.5K。整个 Act 4 几乎无冗余。写作执行时如果七拍被压缩，反讽极性会从内部漏气（雷音盖字 + 口型四读 + 师傅化银砂死法对位 + 师妹意识反损 + 戒尺定格这五个元素每一个都需要独立呼吸空间）。  
**最小修订**: 从 Act 1-3 挪出 1-2K：Act 2 Seq 2.4 从 4K→3-3.5K；Act 3 Seq 3.4 从 7-8K→6.5-7K；Act 1 Seq 1.3 从 4-5K→3.5-4K（然后将 C3 Prescription 新增的 500-800 字填回）。净腾出约 1-2K 供 Act 4 使用。  
**优先级**: P0（字数在动笔前钉死）

---

## Major Issues（强烈建议修——在 revision pass 前）

### M1 — 师傅"按右膝旧伤"设置仅 Climax 一次，五处未埋
**批评者**: antagonism-test §4.4 伏笔 #1  
**问题**: 这一微动作在 Climax 拍 2 回收，但 C5/C6/C8/终极反转 B/Crisis 五个"师傅决定难做的事之前"的节点全部缺失。读者在拍 2 看见时感觉是新动作，不是熟悉的模式被回收。  
**修订**: 在 C5 + C6 + C8 + Crisis 四处各添加"师傅用左手按一下右膝"约 30-50 字，总代价约 150 字。  
**优先级**: P1

---

### M2 — C7 同门反目超个人对抗仅 1（Act 3 节奏 plateau）
**批评者**: antagonism-test §2 weak-point #2  
**问题**: C7（Seq 3.1 同门反目）超个人对抗评分仅 1——司徒明璋是现任宗主但这场戏完全在私密空间（地宫入口），没有任何体制性压力在场。加上 C7 前后的 Seq 3.2 + Seq 3.4 对抗密度高，C7 成为 Act 3 的低谷而不应该是低谷（Act 3 整体对抗曲线应走升势）。  
**修订**: 添加联盟探子在地宫外观察司徒明璋行踪，或联盟发出"地宫封禁令"让主角时间更紧张（约 300 字插入 Seq 3.1）。  
**优先级**: M（major）

---

### M3 — Seq 3.4 师妹活着超个人对抗仅 1（False Ending 三层不全）
**批评者**: antagonism-test §2 weak-point #3  
**问题**: Act 3 末 turning point（magnitude −2.5）按幕设计硬要求应三层皆活，但 Seq 3.4 超个人对抗仅 1（地宫物理环境），几乎全在内在层。False Ending 的"伪希望感"因此缺少世界层级的重量——读者主要在内在层感受到这个 turning point，没有感受到整个世界随之变动的震动。  
**修订**: 在 Seq 3.4 师妹睁眼后，让主角意识到此时地面上天道账本已越过 140 道阈值（通过他感知到的丹田压力），让他知道"不只是师妹活着这件事——外面已经快到临界了"（约 200 字）。这把超个人对抗从 1 提升到 3。  
**优先级**: M

---

### M4 — 终极反转 A 内在对抗偏弱（主角"看清两难"写为认知动作）
**批评者**: antagonism-test §2 weak-point #4  
**问题**: 天道之炉降临那一帧主角内在对抗评分 3（认知型，"他看清了两难"）而非 4-5（体感型）。这导致 Crisis 之前的对抗积累感不够重——读者被告知了两难，没有感受到两难。  
**修订**: Seq 4.1 天空变色那一刻，添加印记蔓延烧穿衣领触到下颚那一帧（约 200-300 字），把"看清两难"从认知升级为身体反应。  
**优先级**: M

---

### M5 — 铺陈 2/29 partial 项（两条弹药模式不完整）
**批评者**: exposition-ledger §（2 items partial）  
**问题**: 在 27/29 已走 smuggled 的优秀基础上，仍有 2 条信息"谁阻挡"环节缺失，处于 partial 状态。具体条目在 exposition-ledger.md 中标注。  
**修订**: 将两处 partial 补上第三要素（战斗阻碍方），让场景价值电荷因信息发射而发生完整跃迁。字数微小（每处约 50 字调整）。  
**优先级**: M

---

## Subtext Audit — Key Findings

**Verdict: PASS（对话层）+ 旁白层需清理**

对话层没有任何 on-the-nose 问题——全部 52 场人物台词都保持三层分离（text / behavior / desire）。问题出在**叙述者层**：在高密度场景里叙述者将行动翻译成主题名称，做了读者应该自己做的工作。

### 旁白层清理目标（4处，polish pass）

| # | 位置 | 问题 | 修订方向 |
|---|---|---|---|
| sb1 | Scene 4.4.1 末 | 旁白明确列出"三层潜文本"（"他来救我 / 他来夺走我的死 / 他来替师弟走完那一炉"）——前 47 场已训练好读者自己听出这三层。叙述者替读者做了工作。 | 删除或压缩为 1 层；让行动承载其余两层 |
| sb2 | Scenes 3-3-4 / 4-4-3 / 4-4-5 | `按 [[X]] §Y 锁定/严守` 工程旁注散落在正稿散文中——这是 draft 阶段的架构脚手架，出版前必须全部清除 | 全文 grep `按 [[` + `严守` + `锁定` 模式，删除所有此类旁注 |
| sb3 | Scene 1.3.2 自由间接独白 | 周通玄"近千年前那个屠村的人"这一句是优秀潜文本，但叙述者紧接着从主角视角倒出约 100 字宗门历史，消解了"听见但压回去"的张力 | 删减 80%，只留关键视觉细节 |
| sb4 | 多处 double-naming | 叙述者将行动翻译成主题词："我不裁决/我不认可"（3-3-4）/ "主动选择关闭语言能力"（4-4-3）/ "未通过任何仪式"（4-4-1） | 删除标签词；动作本身已经说话 |

**软风险（非必改）**: Scene 1-3-3 末"他没看出来"（五字）——叙述者命名了 want/need gap。删除这五字，用后续行动承载即可。

### 潜文本优胜帧（这些写法必须保留）

- **Scene 2.3.1** 师傅食指一抖对"叮"的反应——完美外部行为告知，从未被叙述者解码 ✅
- **Scene 4.4.3** 师妹"师兄……"未完——与 23 岁那夜完整台词相对，被反向承认，无旁白注解 ✅
- **Scene 4.4.5** 最后一句"雾里没有任何东西在等他"——意象承载全部，零旁白 ✅
- **司徒明璋** 全程只用否定性动作（不抬眼 / 不下令 / 不说话）——教科书级次要角色潜文本 ✅

---

## Minor Issues（polish pass 处理）

| # | 问题 | 位置 | 来源 | 修订方向 |
|---|---|---|---|---|
| m1 | 师傅"什么都没说就走了"同语词连用 | S2.3.3 + S2.5.3 | composition-conductor #3 | S2.5.3 改为"嘴张开半秒 / 然后合上 / 转身"——"说而未说" |
| m2 | 玄色斗笠第 3 次出现形态单调 | Seq 3.3 第九转丹成 | composition-conductor #4 | 让主角"已经不再扫"或"扫到了但近看发现是别人" |
| m3 | Act 1→Act 2 transition handoff 弱（三月跳跃无物件钩） | S1.4.3 → S2.1.1 | composition-conductor #6 | Seq 2.1.1 入口开头让主角回头看天空七字余迹 |
| m4 | Act 3 戒尺密度偏低（仅 3 次 vs Act 1/2 的节奏） | Seq 3.1-3.4 | composition-conductor #8 | Seq 3.1 + 3.2 各新增 1 次戒尺微动作 |
| m5 | Seq 2.4 D 单独场未明示雪天（师傅旧伤对位链断） | Scene 2.4.3 水镜映像 | composition-conductor #7 | 水镜映像明示雪天（小村庄 / 雪覆三百口）约 30 字 |

---

## Setup-Payoff Ledger

### 悬空的 setups（已埋未回收 / 回收方式需确认）

| Setup | 埋点位置 | 计划回收 | 状态 |
|---|---|---|---|
| 师傅按右膝旧伤 | 仅 Climax 拍 2（回收点，无前置埋点） | C5/C6/C8/Crisis 四处补埋 | ❌ 倒置（只有回收，无埋点）|
| 师傅食指一抖 | character file（无正稿埋点） | C5/C8/终极反转 B 三处补埋 | ❌ 死铺陈 |
| 凝魂丹"那一炉停了一刻钟" | 无（零埋点） | Seq 2.4 沉鸠台词补埋 | ❌ 零埋点 |
| 师妹"未死"在 Act 2 的隐微痕迹 | 弱（无明确物件指向） | Seq 2.4.1 铜镜婴儿帧 | ⚠ 弱埋 |
| 杜九阙长老传话曾救主角 | character file（无正稿场景） | Seq 1.3 添加正面出场 | ⚠ 仅 character file 锁定 |

### 已设置且已回收（正常）

| Setup | 埋点 | 回收 | 状态 |
|---|---|---|---|
| 戒尺"叮"仪式 | Seq 1.2 第 1 次 | Climax 拍 7 举着未落 | ✅ |
| 玄色斗笠 | C1 首次寻找 | Resolution 最后一帧无斗笠 | ✅ |
| 那一字（口型四读） | controlling-idea + spine | Climax 拍 3 雷音盖字 | ✅ |
| 师妹"三句话"上限 | sister-arc 设计 | Climax 拍 4-5 第三句未完 | ✅ |
| 沈砚手札"师兄走的不是错路他走的是怕" | Seq 2.2 | Climax 师傅入炉的镜像 | ✅ |
| 师傅"按砖绕行"微动作 | Seq 3.1 | Seq 3.4 主角潜地宫理解其意 | ✅ |

### 无根的 payoffs（疑似）

None identified. All major payoffs traced to their setups by the composition-conductor audit.

---

## Image System

| Image System | 开场隐微引入 | Climax 承载 | 密度 |
|---|---|---|---|
| 断戒尺（Key Image） | ✅ Seq 1.1 破观那夜已在腰间 | ✅ Climax 拍 7 举着未落 | ✅ Act 1-4 全程 |
| 玄色斗笠 | ✅ C1 街市验方首次寻找 | ✅ Resolution 无斗笠 | ✅ 三次显现 |
| 那一字（雷音） | ✅ controlling-idea §3 锁定 | ✅ Climax 拍 3 兑现 | ✅ 意象密度足够 |
| 反向印记（七九数字系统） | ✅ Seq 1.2 第一道印记 | ✅ Climax 拍 6 印记清零反流 | ✅ Act 2/3 密度高 |

**Key Image 是否在开场隐微引入**: ✅（Seq 1.1 破观那夜断戒尺在腰间，读者尚不知其意）  
**Key Image 是否在 Climax 承载 Controlling Idea**: ✅（拍 7 举着未落 = 承认仪式永远被悬空的物理形态）  
**意象系统在 Act 3 密度偏低**: ⚠ 戒尺在 Act 3 仅 3 次（vs Act 1/2 的节奏），见 minor m4

---

## Execution Guard Rails（写作执行层面必须守住）

来自 crisis-climax-auditor §8.2 — 这些不是结构问题，是写稿时的硬性边界：

| # | 边界 | 风险 |
|---|---|---|
| G1 | **升级流爽点密度** — 前 9 万字每万字 4-5 次出声反应 | 若密度不足，读者在 Act 4 反讽落点时无法被说服让出爽文预期 |
| G2 | **师妹台词不能指向师傅心里那一字** | 指向即成"内部证人补认"，反讽极性塌方 |
| G3 | **Resolution 严守 600-1000 字** | 超过即 kept around，反讽余韵变感伤余韵 |
| G4 | **Crisis 与 Climax 之间的呼吸帧独立成段** | "师……"未完与雷音起不能压在一起，dilemma 需要呼吸 |

---

## Verdict by Critic

| Critic | Verdict | Key Finding |
|---|---|---|
| antagonism-stress-tester | 🟡 yellow | 对抗顶部和底部满分；中段（C2/C7/Seq 3.4/同盟对抗）5 处松弛 |
| crisis-climax-auditor | 🟢 green-with-conditions | 结构层全通过；4 条执行 guard rails 需守住 |
| cliche-hunter | 🟢 green | 0 cliché / 18+6 项全 honor / 替换测试全不可替换 |
| composition-conductor | 🟢 pass-with-revision | 8 条修订建议（2 必修 + 3 建议修 + 3 可选修） |
| exposition-smuggler | 🟢 pass | 27/29 smuggled / 2/29 partial / 0 lecture |
| subtext-whisperer | 🟢 pass-with-narrator-cleanup | 对话层 0 on-the-nose；所有角色行为均有正确潜文本层。问题在旁白层（4处叙述者 decode 动作）→ 见 subtext-audit.md |

---

## Next Step

**如果子文本审计通过**: → `/story-revise`，按下方优先级顺序执行修订 pass

**修订优先级队列**:
1. **P0（动笔前锁定）**: C1 凝魂丹伏笔 / C2 食指一抖铺陈 / C5 Act 4 字数预算
2. **P1（建议修，写稿前）**: C3 杜九阙出场 / C4 同盟对抗三处启用 / M1 按右膝四处补埋
3. **M（Major，revision pass）**: M2-M5 各项
4. **m（Minor，polish pass）**: m1-m5 各项

**总字数净增量（所有 P0+P1+M 修订合计）**: ~2,500-3,500 字（分布于 Act 1-3，同时从 Act 1-3 压缩 1-2K 供 Act 4 使用）
