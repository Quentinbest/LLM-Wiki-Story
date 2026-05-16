---
title: "Cast Design — The Third Day"
type: note
lang: en
last_updated: 2026-05-06
author: claude
agent: cast-balancer
mode: design
status: locked
project: "the-third-day"
protagonist_ref: "characters/yu-min.md"
controlling_idea_ref: "drafts/the-third-day/controlling-idea.md"
genre_contract_ref: "drafts/the-third-day/genre-contract.md"
spine_ref: "drafts/the-third-day/spine.md"
---

# Cast Design — The Third Day

## 1. Roles roster

| Role | Character | Status | Carrier of (Idea / Counter-Idea / neutral) | Level(s) of conflict applied |
|---|---|---|---|---|
| Protagonist | Yu Min | locked | Idea (enacts the corruption) | inner + personal |
| Antagonist (primary) | Supervisor Wei (魏世昌) | brief in §5; full file from `character-forger` | **Counter-Idea** (loyalty as highest moral act) | personal + extra-personal |
| Foil / mirror antagonist | Lin Xue (林雪), peer-inspector | brief in §5 | **Counter-Idea on a different axis** (escape as corruption) | personal |
| Personal-level antagonist (unwitting) | Yu Min's mother (Yu mother — surname Yu, given name to be set) | brief in §5 | bears the saving-story (carrier of Idea's setup, not its argument) | personal |
| Threshold guardian / extra-personal force | Bureau security officer (Officer Hou) | brief in §5 | extra-personal antagonism — neutral | extra-personal |
| Embodied racket | Captain Zhang of the *Wing Lee* (the named Hong Kong shipping vessel) | brief in §5; appears once, off-stage voice once | embodied criminal force | extra-personal |
| Center of good | (none — by design) | — | — | — |

**Note on Center of Good**: per the ironic Controlling Idea, no character holds uncontested moral authority. Yu Min's mother is *innocent* but not the center of good (she is a carrier of the saving-story, which is the Idea's antagonist). The story's moral weight is distributed; this is structurally correct for irony.

## 2. Pressure matrix

Columns: Yu Min's four dimensions (D1: meticulous-vs-corrupt-appetite; D2: gratitude-vs-wish-to-be-ungrateful; D3: trust-procedure-vs-procedure-as-trap; D4: need-to-be-seen-vs-fear-of-being-seen) + Idea/Counter-Idea axis + three levels of conflict.

| Character | D1 | D2 | D3 | D4 | Idea ↔ Counter-Idea | Inner | Personal | Extra-personal |
|---|---|---|---|---|---|---|---|---|
| Yu Min | (self) | (self) | (self) | (self) | bears Idea | × | — | — |
| Wei | × (offers the corrupt path by example) | × (sustains gratitude by his very presence) | × (he *is* the second seal) | × (he sees her — and refuses to use it) | bears **Counter-Idea** persuasively | — | × | × |
| Lin Xue | × (already chose the corrupt path; shows what Yu Min could become) | — | × (knows the procedure is the trap; teaches it) | — | bears **Counter-Idea on alt axis** (escape was corruption) | — | × | — |
| Mother | — | × (carrier of the saving-story; redoubles gratitude) | — | × (she will see Yu Min if Yu Min is seen) | bears the **Idea's setup** (saving-story) | — | × | — |
| Officer Hou | — | — | × (institutional pressure on the procedure) | — | bears extra-personal antagonism — neutral | — | — | × |
| Captain Zhang | — | — | — | — | embodied crime; voice on phone, name on manifest | — | — | × |

**Coverage check**:
- **Empty dimension columns**: D2 and D4 are not pressured by Lin Xue; D1 is not pressured by the mother. Acceptable — no dimension is empty across the matrix; each dimension has at least 1 strong (×) carrier and most have 2.
- **Empty level columns**: every level has multiple carriers. Inner is carried by Yu Min only (which is correct — she is the only mind we are inside).
- **Substantially identical row patterns**: no two rows duplicate. Wei and Lin Xue both carry Counter-Idea but on *different axes* (loyalty vs. escape) — by design, not redundancy.

## 3. Redundancies and gaps

- **Redundancies**: none. Earlier drafts considered a second peer-inspector to carry "what Yu Min could become if corruption normalizes" alongside Lin Xue, but Lin Xue can carry both *foil* and *false-ending revealer* without dilution.
- **Gaps**:
  - **Counter-Idea on the personal-level vs. extra-personal axis**: Wei carries it across both levels; Lin Xue carries an *alternate version* on the personal level only. The extra-personal Counter-Idea has only Wei. Acceptable — Wei is strong enough to carry it alone; the bureau as institution is *not* a Counter-Idea carrier (it's neutral pressure).
  - **D4 (need-to-be-seen / fear-of-being-seen)** is heavily carried by Wei and the mother but not by Lin Xue or Hou. Lin Xue could lightly engage D4 by *not* seeing Yu Min — by treating her with deliberate professional opacity. This is not a gap requiring a fill; it is a directing note for `scene-architect`. Flagged.

## 4. Genre archetype check

| Genre demands (per genre-contract.md §4–§5) | Carrier in this cast | OK / missing / substituted |
|---|---|---|
| The institutional everyday on the page (manifests, hierarchies) | Yu Min, Wei, Lin Xue, Hou | ✓ |
| Hierarchies named and visible | Wei (above), Yu Min (mid), Lin Xue (peer), apprentice in Resolution coda (below) | ✓ |
| One ally who knows just enough to be dangerous | Lin Xue (foil/ally hybrid) | ✓ — single carrier; correct |
| A scene of small corruption normalized before big corruption discovered | Lin Xue (S2.2 — references the prior look-the-other-way moments) | ✓ |
| A clock | the institutional posting-decision and the 24-hour reporting rule | ✓ (carried by Hou's late arrival in PC5) |
| A private confrontation between protagonist and wrongdoer | Wei (Scene 14) | ✓ |
| Surveillance texture | Hou's presence, the rules in setting-survey.md §3 (rules 5–6) | ✓ (atmospheric; not carried by a single character but by the world) |
| Late-act collapse of protagonist's moral baseline (Punitive secondary) | Yu Min herself at Climax | ✓ |
| Final-image continuity (institution outlasts protagonist) | The new young inspector in Resolution coda — **role exists, character not named** | ⚠ **substituted with placeholder**; the new inspector is functional, not characterized. **Cost**: at the screenplay stage this is fine; at prose stage the inspector needs a name, age, and one tic. **Recommendation for `character-forger`**: a brief, not full file. |

## 5. Briefs for new or expanded roles (handoff to `character-forger`)

```yaml
- name: "Wei Shichang (魏世昌)"
  role: antagonist (primary) / Counter-Idea carrier
  mode: full file
  pressure_required: "all four of Yu Min's dimensions; deep personal-level antagonism; extra-personal antagonism via institutional rank"
  scenes_required_in: ["Inciting Incident (off-stage signature)", "PC2 (passes in corridor)", "PC3 / Scene 14 (Private Confrontation)", "Resolution coda (single nod)"]
  must_apply_on: "all of Yu Min's dimensions; bear Counter-Idea (loyalty as highest moral act) without ever sliding into villainy"
  must_not_overlap_with: "Lin Xue (different axis of Counter-Idea — Wei = loyalty; Lin Xue = escape)"
  notes: |
    Mid-fifties; lean; tired. Customs supervisor for ~20 years. Widower since 1984.
    Crucially: he is a *good* man whose loyalty has metastasized.
    His three years intervening for Yu Min's father in 1969 was real moral courage at real cost.
    The racket began later as small accommodations to maintain his network of obligations.
    He has never benefited materially.
    Three dimensions minimum:
    1. Public stoicism vs. an unbearable private grief (the wife) that he displaces into work.
    2. Genuine moral seriousness vs. the small accommodations that have accumulated into a racket.
    3. Wants Yu Min to choose for herself vs. cannot bring himself to ask her to choose against him.
    True Character: he will refuse to plead, even at the cost of his career, even when his career is what she is choosing for him.
    His arc is **flat by design** — confirmed in crisis-climax-audit.md §4.

- name: "Lin Xue (林雪)"
  role: foil / mirror antagonist / Counter-Idea-on-alt-axis carrier
  mode: full file
  pressure_required: "D1 (corrupt appetite — she has already chosen it) and D3 (procedure-as-trap — she names the trap aloud)"
  scenes_required_in: ["S1.3 (the dumplings reveal)", "S2.2 (raises Yu Min's prior look-aways)", "S2.4 (Tianjin transfer offer + 'they escape themselves' line)", "Resolution coda (absence — her empty desk)"]
  must_apply_on: "D1 and D3 specifically; should NOT pressure D2 or D4 — those are Wei's"
  must_not_overlap_with: "Wei"
  notes: |
    Late twenties; sharp; tired in a different way than Wei. Took the Tianjin transfer once;
    came back. Now bears the corruption Yu Min refuses to commit by leaving.
    Three dimensions minimum:
    1. Cool professional efficiency vs. the residue of her own unmade choice.
    2. Genuine fondness for Yu Min vs. willingness to let Yu Min become her replacement.
    3. Honesty (she tells Yu Min the truth about the trap) vs. complicity (she does not file).
    True Character: she will tell Yu Min the truth and let Yu Min act on it — no pleading,
    no rescue, because rescue is the corruption.
    Arc: flat / closed (her arc happened before the story; she is a *constant* in this story).
    She is in the Resolution coda by *absence* — one of the empty desks is hers.
    Recommend a closing detail: her name plate has been replaced with a blank.

- name: "Yu Min's mother (Yu Suying — 于素英)"
  role: personal-level antagonist (unwitting) / saving-story carrier
  mode: brief file
  pressure_required: "D2 (gratitude / wish-to-be-ungrateful) and D4 (need-to-be-seen / fear)"
  scenes_required_in: ["Act 1 close (the bone broth, the manifest under the pillow)", "PC2 / S2.1 (dumplings at the customs gate)", "Resolution coda — by absence"]
  must_apply_on: "D2 deeply; D4 lightly"
  must_not_overlap_with: "Wei"
  notes: |
    Mid-fifties; widowed since 1986; works as a clerk at a textile cooperative.
    Believes the saving-story unironically. Tells it at family gatherings.
    Cleans Wei's apartment once a week — has done since 1984.
    She does not know about the racket and never will. Crucial: she is not foolish; she
    is *correct* about the saving-story being morally significant. The Idea's irony lives
    in the gap between her correctness and the use Yu Min puts it to.
    Two dimensions minimum:
    1. Devotion to the saving-story vs. growing concern for her daughter's withdrawal.
    2. Trust in Wei vs. the small things she has noticed but not voiced.

- name: "Officer Hou"
  role: extra-personal antagonist / threshold guardian
  mode: brief file
  pressure_required: "D3 (procedure as trap) and extra-personal pressure"
  scenes_required_in: ["PC5 / S3.1 (Day 3 14:00 — bureau security officer arrives)"]
  must_apply_on: "D3"
  must_not_overlap_with: "no one (this role is unique)"
  notes: |
    Mid-thirties; courteous; uniformed; carries a clipboard.
    On stage for one scene only. Does not raise his voice. Does not threaten.
    Asks the question that closes the timeline: "Are there any reports outstanding from
    the past 48 hours?"
    He is not an antagonist in the personal sense; he is the *institution arriving*.
    Single dimension: courtesy vs. the certainty of his return tomorrow.
    No backstory needed — he is functional.

- name: "Captain Zhang"
  role: embodied racket
  mode: brief file (one paragraph)
  pressure_required: "extra-personal — gives the racket a face"
  scenes_required_in: ["S1.2 — manifest signature seen", "S2.4 morning — voice on phone overheard", "never on screen"]
  must_apply_on: "extra-personal only"
  notes: |
    Captain of the Wing Lee. Hong Kong-registered. Voice on phone in S2.4.
    The audience meets him as a *signature* and a *voice*, never a face.
    This is structurally important: the racket must be embodied enough to be real,
    abstracted enough that the spine remains about Yu Min and Wei. Zhang is the bridge.

- name: "The new young inspector (Resolution coda)"
  role: replication carrier
  mode: placeholder (no name yet; assigned at scene work)
  pressure_required: "none — she is the institution's next round"
  scenes_required_in: ["Resolution coda only"]
  notes: |
    A girl of 22 or 23. Cleaner uniform than Yu Min's. Hands Yu Min a clean report.
    Single tic: she watches Yu Min's seal land and then, without thinking, copies the
    angle of the seal pad in her own hand. This is the replication image's grace note.
    `key-image-curator` should formalize.
```

## 6. Six-Point Cast Audit

- [x] **Unique pressure per character** — no two rows duplicate; Wei and Lin Xue carry Counter-Idea on different axes.
- [x] **Every protagonist dimension is pressured** — D1 (Wei + Lin Xue), D2 (Wei + mother), D3 (Wei + Lin Xue + Hou), D4 (Wei + mother). All four covered by ≥ 2 carriers.
- [x] **All three levels of conflict populated** — inner (Yu Min); personal (Wei, Lin Xue, mother); extra-personal (Wei, Hou, Captain Zhang).
- [x] **Counter-Idea has a credible human carrier** — Wei carries it persuasively; Lin Xue carries an alternate version. Confirmed by crisis-climax-audit.md §3 + antagonism analysis to follow.
- [x] **Genre archetypes accounted for** — all but the new-inspector role; that role is *substituted by placeholder* (acceptable per §4 row).
- [x] **Each character earns scene time** — Wei (4 scenes), Lin Xue (4 scenes), mother (3), Hou (1), Zhang (cameo by signature/voice), new inspector (1).

## 7. Open questions for the writer

- Confirm Lin Xue carries both *foil* and *false-ending revealer* roles, or split? *(Recommend: she carries both. The concentration deepens her.)*
- Should Captain Zhang have a brief on-stage moment — even a back-of-head shot at the harbor — or remain entirely off-stage? *(Recommend: off-stage. The institutional-claustrophobia tone is maintained.)*
- Should the mother's name be different from the protagonist's surname (Yu) for narrative clarity, or kept as 于素英? *(Recommend: keep. The shared surname is correct; the audience will not be confused — there is only ever one "mother" in the room.)*

## 8. Handoff

`→ character-forger` (full files for Wei and Lin Xue; brief files for mother, Hou; one-paragraph for Zhang and the new inspector).
`→ arc-tracer` (already running in parallel; counterpoint section can now be filled with Wei flat / Lin Xue flat / mother flat — Yu Min is the only arc).
`→ antagonism-stress-tester` (cast is now locked; the antagonism analysis can run).
