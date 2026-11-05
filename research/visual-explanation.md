# Visual explanation: principles, exemplars, and an audit of our figures

Research note, 2026-11-06. Scope: how to draw the site's concepts so a non-specialist understands them, what the best explainers on the same topics do, and figure-by-figure fixes for every figure in `src/components/fig/`, `src/components/Vantage.astro` and `src/components/Outcomes.astro`. The audit read the source of each figure and the live home page. Claims about research are cited; claims about our figures are from reading the code and are marked as inference where they predict reader behaviour.

## Principles

### What the evidence says

| principle | what it says | strength of evidence | source |
| --- | --- | --- | --- |
| Coherence | Cut material that does not serve the point. | Strong: median d = 0.70 (Mayer 2017); 23 of 23 tests in the 2014 handbook chapter | [Mayer 2017](https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12197), [Mayer & Fiorella 2014](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E) |
| Signaling | Highlight the essential material so attention goes there. | Moderate: d = 0.46; 24 of 28 tests | same |
| Spatial contiguity | Put words next to the part of the picture they describe, not in a separate legend or caption. | Strong: d = 0.79 (2017), 22 of 22 tests | same |
| Temporal contiguity | Say it while you show it. | Strong: d = 1.30 | [Mayer 2017](https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12197) |
| Segmenting | Break a lesson into learner-paced parts. | d = 0.70 | same |
| Pre-training | Teach names and properties of key parts before the explanation that uses them. | d = 0.46; one 2022 review rates its evidence base among the thinnest of the twelve | same; [Peck summary](https://www.devlinpeck.com/content/mayers-principles-of-multimedia-learning) |
| Worked examples | Novices learn more from studying a fully worked case than from solving or exploring. | Strong; the best-studied cognitive load effect | [Sweller 2011](https://www.emrahakman.com/files/2024/10/Cognitive-Load-Sweller-2011.pdf), [NSW CESE 2017](https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf) |
| Expertise reversal | Guidance that helps novices can hurt experts; fade guidance as the reader learns. | Well replicated | [Kalyuga et al. 2003](https://www.researchgate.net/publication/48829036_The_Expertise_Reversal_Effect) |
| Animation vs static | Where animation looked better, the animated and static versions usually were not equivalent in content or interactivity. Movement is hard to perceive accurately, and people think of processes as discrete steps, so a series of static frames often matches how they think. | Review of many studies | [Tversky, Morrison & Bétrancourt 2002](https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf), pp. 256–258 |
| Congruence and apprehension | The structure of the graphic should match the structure of the idea (a route is a series of turns). It must also be perceived accurately: schematic over realistic, slow enough to see, arrows and highlights to direct attention. | Same paper | same, pp. 257–258 |
| Animation meta-analysis | Instructional animation beats static pictures modestly overall (d = 0.37). The effect is largest for procedural-motor skills (d = 1.06), less relevant to us. | 26 studies, 76 comparisons | [Höffler & Leutner 2007](https://www.sciencedirect.com/science/article/abs/pii/S0959475207001077) |
| Small multiples | "At the heart of quantitative reasoning is a single question: Compared to what?" Use the same frame repeated with one thing changed, so the eye compares within one view. | Design canon, not experiment | Tufte, *Envisioning Information* p. 67, quoted at [datavizblog](https://datavizblog.com/2014/06/26/small-multiples-tableau-and-ben-jones/) |
| Isotype / unit charts | Show more of something by repeating a fixed-size symbol, not by enlarging one. Repeated symbols can be counted. | Design canon | [Burke 2010](https://centaur.reading.ac.uk/16340/1/IDJ-Burke2010.pdf), [Wikipedia: Isotype](https://en.wikipedia.org/wiki/Isotype_(picture_language)) |
| Anthropographics | Person-shaped glyphs did not add empathy over abstract squares. | One study (Boy et al. 2017), cited in Distill | [Hohman et al., Distill 2020](https://distill.pub/2020/communicating-with-interactive-articles/) |

### When interactivity helps and when it hurts

- Interactivity is the main thing that can make animation work: readers who can stop, replay and go at their own pace avoid the perception problems ([Tversky et al. 2002](https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf), §3.3 and p. 258). This supports learner-paced steppers like NetPeel.
- Most readers do not use controls. The New York Times graphics desk (Archie Tse, Malofiej 2016) said "if you make the reader click or do anything other than scroll, something spectacular has to happen". He also said to assume nobody sees a tooltip or rollover, and that "readers weren't getting to all of the content" in steppers, tabs and sliders ([Garcia Media summary](https://garciamedia.com/blog/interactive_graphics_less_is_best_at_ft/), [Digital Journalism 2019](https://www.tandfonline.com/doi/full/10.1080/21670811.2019.1607520)). The often-quoted engagement figure is about 15% ([J-Source/JRC 2018](https://jrctmu.ca/2018/04/09/when-it-comes-to-data-driven-journalism-less-is-often-more/)). Practical rule: the default state of every interactive figure must carry the main point on its own.
- Distill's review finds "limited empirical evaluation" of interactive articles. It reports that step and scroll layouts were preferred to static ones, that "You Draw It"-style prediction prompts improved recall (Kim, Reinecke & Hullman 2017), and that "not everything needs to be interactive" ([Hohman et al. 2020](https://distill.pub/2020/communicating-with-interactive-articles/)).
- Bret Victor's case for explorables: a "reactive document" lets the reader "play with the author's assumptions and analyses, and see the consequences". That fits Vantage, whose assumptions (which observers collude) are the point ([Victor 2011](https://worrydream.com/ExplorableExplanations/)). A 2025 critique notes that the interactive part is often opaque: the reader cannot see the model behind it ([Hinsen 2025](https://blog.khinsen.net/posts/2025/11/12/explorable-explorable-explanations.html)).
- Nicky Case's practitioner patterns ([2014](https://blog.ncase.me/explorable-explanations/), [2018](https://blog.ncase.me/explorable-explanations-4-more-design-patterns/)):
  - "Use interactivity only when interactivity works best": text for abstractions, graphs for relationships, animation for timing, interactives for processes.
  - Teach each mechanic in isolation before combining them, and put the full sandbox at the end.
  - Author-guided, player-driven: free play, but with goals the author sets.
  - Gate content readers lack the prerequisites for.
- Inference for this site: a figure gets controls only when the reader's choice is the content (which observer, which clock, which step). Comparisons with two to four states should be small multiples that show every state at once, not toggles. Every interactive figure needs a default state that teaches the point without a click.

## Exemplars by topic

### Packets, routing, DNS, NAT

- **Tailscale, "How NAT traversal works"** ([Anderson 2020](https://tailscale.com/blog/how-nat-traversal-works)). About 21 diagrams. They build in sequences (firewall, then NAT, then STUN), each figure repeating the same scene with one change; the prose uses concrete `ip:port` pairs. The diagram text was not visible to the fetch, so whether arrows carry `ip:port` labels is an inference. **Borrow:** one scene redrawn with one change per figure, and concrete addresses.
- **Cloudflare Learning, "What is DNS?"** ([Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)). Explicitly "8 steps in a DNS lookup", numbered on one diagram, and says which steps the cache skips. **Borrow:** number the steps on the arrows and say which ones can be skipped.
- **DNSimple comics** ([How DNS Works](https://dnsimple.com/comics/how-dns-works/episodes/), [How HTTPS Works](https://howhttps.works/about/)). Servers as recurring characters, one concept per episode (resolver, hierarchy, authoritative server), translated into many languages. **Borrow:** episode-sized segmenting. **Avoid:** cute characters clash with our record aesthetic.
- **Julia Evans / wizard zines** ([jvns.ca](https://jvns.ca/blog/2016/08/29/how-i-made-a-zine/)). One idea per page, handwritten labels sitting on the thing they describe, real command output as the worked example, and an iterative beta-reader process ([Sustain ep. 238](https://podcast.sustainoss.org/238)). **Borrow:** the label sits on the object (spatial contiguity), and the worked example is a real-looking literal.
- **Kurose & Ross interactive problems** ([gaia.cs.umass.edu](https://gaia.cs.umass.edu/kurose_ross/interactive/)). Endlessly regenerated instances of the same problem, including NAT, with the answer revealed afterwards. **Borrow:** a "predict, then reveal" step for the packets basics page (Distill's prediction-prompt evidence supports this).

### Encryption, TLS, public keys

- **The Illustrated TLS 1.3 Connection** ([tls13.xargs.org](https://tls13.xargs.org/)). Every byte of one real connection to one named host, annotated in place. It is the clearest worked example in the field, but too fine-grained for non-specialists. **Borrow:** one real connection followed end to end. Show the bytes as redacted versus readable fields, not hex.
- **Diffie–Hellman paint mixing.** Widely used, and it works by trading on the intuition that paint cannot be unmixed. Critiques show an eavesdropper can partly recover the secret within the analogy itself ([tavianator](https://tavianator.com/2018/dhce.html), [arsouyes](https://www.arsouyes.org/articles/2017/09_Diffie_Hellman_couleurs/index.en.html)). It also hides the need for authentication, which is the man-in-the-middle gap ([Berkeley CS161](https://textbook.cs161.org/crypto/key-exchange.html)). **Avoid** it, or label it as an analogy with a stated limit. Our site needs "who can read what", not key-exchange mechanics.
- **Japanese government explainers.** 総務省「国民のためのサイバーセキュリティサイト」 has short pages for 暗号化の仕組み and SSL/TLS の仕組み ([暗号化](https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/basic/basic_structure_02.html), [SSL/TLS](https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/basic/basic_structure_13.html)). It defines 暗号鍵 and 復号 before using them, which is pre-training. Its figure images were not machine-readable (empty alt text), so we could not assess the drawings. **Borrow:** the plain vocabulary (暗号化 / 復号 / 鍵) for our JA basics pages.

### Onion routing and Tor

- **Tor Project, "How Tor works" in three panels** ([archived overview](https://2019.www.torproject.org/about/overview.html.en)). Panel 1 gets the relay list, panel 2 builds the path, panel 3 builds a new path for a new site. Green links are encrypted and red links are clear. **Borrow:** three static frames, which is exactly Tversky's discrete-steps argument. **Avoid:** the red/green colour code, which collides with our marks and fails for colour-blind readers.
- **EFF, "Tor and HTTPS"** ([tor-https.eff.org](https://tor-https.eff.org/)). Two toggles (Tor, HTTPS). The figure shows, for the eavesdroppers along the path, which data items each can see: site visited, username and password, data, IP address (location), and whether Tor is in use ([description](https://baldric.net/2013/07/15/tor-and-https-at-eff/)). Our Vantage is a richer version of the same idea. **Borrow:** the data items sit next to each observer on the route, not in a separate table, and there are only two binary controls.
- **Traffic-correlation research figures.** Johnson et al. 2013 model an adversary watching both where traffic enters and where it leaves Tor ([CCS '13](https://seclab.cs.georgetown.edu/bibliography/tor-realistic-adversaries.html)). The standard visual in this literature is two aligned time series, one at the entry side and one at the exit side, whose bursts line up. We have no such figure (see "Missing figures").

### Blockchain and tracing

- **Anders Brownworth, Blockchain Demo** ([demo](https://andersbrownworth.com/blockchain/)). One concept per page (hash, block, chain, distributed, tokens, coinbase), and the reader edits a field and sees every later block turn red. **Borrow:** one manipulation per concept. **Avoid:** for us, tamper-evidence is not the point; traceability is.
- **3Blue1Brown, "But how does bitcoin actually work?"** ([lesson](https://www.3blue1brown.com/lessons/bitcoin/)). It starts from a ledger among friends and adds signatures, then proof of work, inventing the system step by step. **Borrow:** the opening "the ledger is public, names are not" is exactly our MoneyCluster step 1.
- **learnmeabitcoin** ([outputs](https://learnmeabitcoin.com/beginners/guide/outputs/), [output/change](https://learnmeabitcoin.com/technical/transaction/output/)). Transactions are drawn as boxes with amounts on inputs and outputs, and change is shown explicitly ("25 BTC in, 1 BTC + 24 BTC out"). **Borrow:** amounts on every output, because the change heuristic is invisible without them.
- **Chainalysis Reactor graphs** ([product](https://www.chainalysis.com/product/reactor/), [Silk Road/BTC-e example](https://twitter.com/chainalysis/status/1324456499310153730?lang=en)). Clusters are nodes with entity labels, and flows run left to right ending at a labelled exchange. Exchange deposit addresses are a dead end to outsiders because only the exchange knows the customer ([FinanceFeeds](https://financefeeds.com/how-chainalysis-tracks-crypto-money-laundering/)). **Borrow:** left-to-right flow that ends at the named entity, and the explicit "only the exchange knows" boundary.

### Attribution and investigations

- **Bellingcat, "Hunting the Hunters"** ([methodology](https://www.bellingcat.com/resources/2020/12/14/navalny-fsb-methodology/)). It shows the method as a sequence of joins: phone records, then frequent contacts, then a caller-ID app label, then travel records matching Navalny's trips, then a cell-tower ping near his hotel, plus a separate timeline document. **Borrow:** attribution drawn as a chain of joins, each one naming the record type that made it.
- **Forensic Architecture and NYT Visual Investigations** ([FA Abu Akleh report](https://forensic-architecture.org/investigation/the-extrajudicial-killing-of-shireen-abu-akleh-extended-report), [WAN-IFRA on NYT](https://wan-ifra.org/2020/01/ny-times-pioneering-visual-investigations-behind-the-scenes/)). A shared master timeline to which every source is synchronised, plus a reconstructed space ([MUBI essay](https://mubi.com/en/notebook/posts/remains-to-be-seen-the-video-work-of-forensic-architecture)). **Borrow:** the master timeline as the frame for a case file.
- **Mandiant APT1** ([report](https://services.google.com/fh/files/misc/mandiant-apt1-report.pdf)). It quantifies the hop-point finding: of 832 IP addresses used to log in to hop infrastructure, 817 (98.2%) were Chinese, mostly four Shanghai net blocks. **Borrow:** one big count as the punchline, which suits a unit chart.
- **Nicky Case, The Evolution of Trust** ([launch post](https://blog.ncase.me/the-evolution-of-trust-is-out/)). Learners tinker with the mechanism before the terms are introduced, and each mechanic is taught alone before the final sandbox ([analysis](https://annexie43430051.wordpress.com/2018/02/22/interactive-storytelling-for-education-the-evolution-of-trust/)). **Borrow:** the sequence of isolated mechanic first, then combination. Vantage is our sandbox, and the layer pages are the isolated mechanics.
- **ciechanow.ski and samwho.dev** ([ciechanow.ski](https://ciechanow.ski/cameras-and-lenses/), [samwho](https://samwho.dev/)). Each article starts with the simplest possible scene and reuses it as the article grows; samwho explicitly works "bottom-up, starting from the simplest example". **Borrow:** one recurring scene (person → route → website, with the same addresses) across every figure on the site.

### Data-heavy comparisons (case matrix, indictment ledger)

- **FT Visual Vocabulary** ([chooser](https://ft-interactive.github.io/visual-vocabulary/); a Japanese poster is in the [chart-doctor repo](https://github.com/ft-interactive/chart-doctor/blob/master/visual-vocabulary/Visual-vocabulary-JP.pdf)). Choose the chart by the relationship you want to show. The ledger is "magnitude plus part-to-whole", where unit charts are the right call. The case matrix is a "table with a heatmap": fine as long as the column (layer) order means something.
- **Isotype** ([Burke 2010](https://centaur.reading.ac.uk/16340/1/IDJ-Burke2010.pdf)). One symbol per fixed quantity, countable. ReachLedger already does this correctly.

### Japanese typography in diagrams

- JLReq recommends at most about 40 characters per line in horizontal writing ([W3C JLReq](https://www.w3.org/TR/jlreq/?lang=en)). For figure labels, inference: keep JA labels to one phrase of 12 characters or fewer, because SVG `text` does not wrap.
- Break lines at phrase (文節) boundaries, never inside a word. BudouX does this and is built into Chrome as `word-break: auto-phrase` ([BudouX](https://github.com/google/budoux), [Google Developers JP](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html)). DeviceSplit's hand-broken 「ワークステー / ションからは / 見えない」 splits a katakana word and should be 「ワークステーション / からは見えない」.
- JA glyphs are full-width, so a JA label is usually fewer characters but a similar or greater width than the EN one. Size boxes to the longer of the two (inference from our own figures, not from a source).
- Keep one spelling per term across all figures. Current drift: 「Web サイト」 (Vantage) vs 「ウェブサイト」 (NetWhoSees); 「Tor 中継」 (Vantage) vs 「中間」 (NetPeel) for the middle relay; 「ローカル網」 + 「ISP」 vs 「ISP・手元の回線」.
- Evidence on Japanese exemplars is thin. NISC/NCO's 「インターネットの安全・安心ハンドブック」 is illustration-heavy and organised as one topic per spread ([NCO portal](https://security-portal.cyber.go.jp/handbook/)). We did not find published reasoning about its diagram choices, so treat it as a vocabulary reference, not a design model.

## Audit of our figures

Legend for "gain": H = likely large comprehension gain, M = moderate, L = polish.

| figure | teaches | likely misread or miss | fix (principle) | gain | effort |
| --- | --- | --- | --- | --- | --- |
| Vantage (home) | Each observer reads a different subset of one record; colluding observers can link you | Default state (Tor, guard selected) says "nothing connects": the reader may leave thinking Tor is safe. Collusion via multi-select is undiscoverable. guard / middle / exit / "global watcher" are not explained on the home page. The wire-count encoding is subtle. | Add 3–4 "try this" preset links that set the hash. Under each node, a static two-word role label. Show a combined record when several observers are picked. | H | M |
| Outcomes | Three endings differ by what is known and whether there is custody | "Out of reach" shows a known name in yellow, "caught" in magenta, which teaches magenta = caught. Under design.md, magenta is the name itself. | Make name and place magenta in both "out of reach" and "caught"; let only the custody row differ (small multiples: one change per panel) | H | S |
| ReachLedger | 60 names, 0 state officers arrested | On mobile the squares start at x = 510 of 1120 and are off-screen; outline vs fill at 20 px is subtle; no per-row count | Move squares next to the year, shorten the "did" column, add a row count, put the 0 at the top | M | M |
| ReachPaths | Three ways people came within reach | Text-dense; the examples crowd out the three paths | Cut the examples to one per path and move the rest to prose (coherence) | L | S |
| NetWhoSees | Which single observer holds both ends, per route | Appears before the Tor section introduces guard and exit. The magenta outline means both "identity readable" (chip) and "holds both ends" (cell frame). The "Tor, then VPN" row is not in Vantage. | Move it after NetPeel, or pre-train the terms in a one-line key. Make "holds both ends" a different mark (e.g. a filled magenta corner tag reading "both"). | H | S |
| NetPeel | Each relay removes one layer and learns only the next hop | Nested rectangles can read as nested places, not encryption layers. The "cell" jargon is undefined. Example literals differ from Vantage. The stepper hides the comparison. | Static strip of 4 frames (you / guard / middle / exit), each showing the envelope with its remaining layers and the "can read" record; keep the stepper only on narrow screens. Reuse Vantage's addresses and forum.example. | H | M |
| NetOrbRotation | A blocklist built on day 40 misses day-75 nodes | Yellow means "on the blocklist" here: a fourth meaning for yellow. The exit IP in the top panel is not visually tied to its timeline row. | Draw blocklisted spans as an ink hatch or outline; give the exit node's row a yellow label to tie it to the top panel | M | S |
| InfraFlux | Same name, new address every lookup | Every cell is yellow, so nothing stands out (signaling). The caption's key claim (a block at 00:05 is useless at 00:10) is not drawn. | Highlight only the changing column; draw a "blocklist at 00:05" strike on row 2 and an arrow to row 3 that misses | M | S |
| InfraC2Path | Defender sees only the first hop; the provider sees the operator | Arrows show who connects, not what moves; "redirector" and "implant" are undefined | Label each arrow ("beacons over HTTPS", "operator logs in"); add sublabels that define implant and redirector in a few words | M | S |
| InfraOverlap | Two personas meet at shared payment and a GRU server | The path from DCLeaks to the GRU runs through four edges and is hard to trace; the pool has no edge to the organisation | Trace one magenta path from DCLeaks to the GRU and number its hops; or lay out the two personas converging on a central pool | M | M |
| DeviceBits | Each attribute shrinks the crowd | "bit" is jargon; the crowd count is secondary | Lead with crowd size (1,048,576 → …) as the primary label, bits in small type; optional dot-grid crowd (Isotype) | M | S |
| DeviceStudies | Uniqueness depends on who was sampled | Rows in year order invite a "trend over time" misread | Split rows by sample type (volunteers / ordinary visitors) with a labelled divider | L | S |
| DeviceSplit | An exploit on a split system cannot learn the real IP | "Tor network" is a solid black box, which reads as redacted. The two panels have different layouts, so the difference is harder to see. JA label broken inside a word. | Outline the Tor network box; align both panels on one grid (same positions); fix the JA break | M | S |
| IdentityLinks | One reused handle joins two graphs | Default "without" state; a reader who does not click misses the join | Show both states side by side (two small multiples), drop the toggle | M | S |
| IdentityAnchor | SMS ties the account to a carrier record | The caption's "legal request joins the rows" is not drawn | Add a third row: "after legal requests to both", with handle, number and name all readable and the name in magenta | M | S |
| IdentityRank | A shortlist, not an identification | "about 20%" of what is unclear | Add "of test texts" next to the percentages | L | S |
| BehaviorClock | Re-reading timestamps in UTC+4 shows an office week | The default (UTC) looks random; the point needs a click, which Tse's rule says most readers will not make | Three small 7×24 grids stacked (UTC, UTC+4, UTC+8) with an office-hours frame on each; UTC+4 outlined | H | S |
| BehaviorFarm | Many identities converge on one house | Clear. Minor: the employer's view and the investigator's view are mixed in one picture. | Optional: shade the employer's view vs the investigator's view | L | S |
| MoneyCluster | Common-input and change rules, then the exchange names the cluster | No amounts, so "D looks like change" cannot be seen. Step 2 packs three inferences. Magenta appears at step 2, before anything names a person. | Put amounts on inputs and outputs (round payment vs odd remainder); split step 2 into 2a (common input) and 2b (change, then E); use an ink hull for the cluster until step 3 turns it magenta | H | M |
| MoneyMixer | The pool hides the pairing, not amounts and times | Clear. Minor: the inferred link is a dashed line under the pool and may be missed. | Make the matched pair (2.37 → 2.35) the only yellow pair; dim the others | L | S |
| AttrDiamond | Pivots cross edges; the adversary stays an assessment | Toggle defaults to off (`set(false)`), so the fake/borrow overlay, half the message, is hidden. "Diamond Model" is unexplained. The 1–4 pivots zig-zag across the diamond. | Overlay on by default, or two panels; draw the pivots as a linear chain under the diamond (congruence: analysis is a sequence) | M | M |
| AttrRichHeader | Planted header vs the rest of the file | The planted claim (left) is highlighted; the decisive evidence (right) is plain. "Rich header" is undefined. | Highlight the ≠ and the right column; define the Rich header in the figure ("a build stamp the compiler leaves") | M | S |

### Details on the highest-gain items

**Vantage.** The figure is the right idea (EFF's Tor and HTTPS figure, made richer), but its default teaches the wrong lesson to a skimmer. A first-time reader sees "Tor" and "nothing connects" and, per Tse, probably does not click further. Fixes:

1. Under the scenario tabs, add a line of three or four preset links, each a worked example that sets the hash: "Your VPN provider alone", "Tor guard + exit together (correlation)", "Tor, but logged in". This is author-guided, player-driven (Case) and a worked example (Sweller).
2. Under every node, add a static two- or three-word role: guard 「あなたが見える」 / "sees you", middle 「どちらも見えない」 / "sees neither", exit 「行き先が見える」 / "sees the site". This is pre-training plus spatial contiguity, with no tooltip (Tse).
3. When several observers are selected, show the union record with each readable cell tagged by who supplied it. That makes collusion visible as a join.
4. The wire-count encoding should get a small label on the link itself ("3 layers"). The live text extraction shows the count running into the node name ("4 layers of encryption4Local network"), which is also an accessibility issue.

**Outcomes.** This is the site's thesis in one figure. Right now, colour carries "caught" instead of carrying "the name points at the person". Making the identification rows identical between "out of reach" and "caught" and changing only custody makes the reader see the site's claim: identification is not the hard part. Tufte: one difference per panel.

**NetWhoSees placement and marks.** On the network page it appears in the VPN section, about 40 lines before the prose introduces guard, middle and exit. Move it to after NetPeel as the summary, or add the role sublabels from the Vantage fix. Give "holds both ends" its own mark instead of reusing the magenta outline.

**MoneyCluster.** The change heuristic is the least intuitive idea on the money page, and the figure asserts it without the evidence. Use learnmeabitcoin-style amounts: tx 1 takes A 0.40 + B 0.35 + C 0.30 in and pays P 1.00 and D 0.0497. The round payment versus the odd remainder is what makes D look like change. Split the step.

**BehaviorClock.** A three-panel small multiple turns the insight into a glance: the reader sees the block slide into the office-hours frame. The data is tiny (7×24 cells), so three panels fit in the existing 680-wide viewBox at about a third of the height each, or stack on mobile.

### Cross-cutting fixes

- **One worked example everywhere.** Vantage uses 198.51.100.23 and forum.example, NetPeel uses 198.51.100.7, example.org and exit 203.0.113.9, and DeviceSplit uses 203.0.113.42. Pick one person, one home address, one site and one set of relay addresses, and reuse them in every network, device and basics figure. That way each figure is a new view of a scene the reader already knows (ciechanow.ski, samwho).
- **Guard the three marks.** Yellow currently also means "on the blocklist" (NetOrbRotation), "active hour" (BehaviorClock) and "ranked 2–20" (IdentityRank). Magenta also means "caught" (Outcomes) and "in a cluster" (MoneyCluster step 2). Black also means "the Tor network" (DeviceSplit). For non-mark categories, use ink outline, hatch or grey. Keep the three marks for hidden, readable and points at the person, as design.md says.
- **Default states carry the point.** Every interactive figure (Vantage, NetPeel, IdentityLinks, BehaviorClock, MoneyCluster, AttrDiamond) should pass a test: a reader who never clicks still gets the caption's claim.
- **Term consistency (JA and EN).** Fix 「Web サイト」 vs 「ウェブサイト」, 「Tor 中継」 vs 「中間」, and "Sender address" (Vantage) vs "Came from" (NetPeel). Put the canonical terms in one shared dictionary (`src/i18n/ui.ts` or `src/lib/vantage.ts` `OBSERVER_LABEL`) and import it from the figures.

## Missing figures

Concepts the prose relies on that have no figure, in order of need.

1. **The address-to-subscriber lookup** (network page, "What an address gives away"; packets basics). This is the single most common way people get caught, and it is only described in prose. A worked example with one log line:

    ```text
    forum.example log          ISP assignment records             subscriber
    198.51.100.23  03:14:07 -> 198.51.100.23 03:00-04:00  line 7781 -> Taro Yamada
    (yellow: readable)          (yellow, via legal request)        (magenta)
    behind CGNAT: + src port 51022 needed  [black bar if the port was not logged]
    ```

2. **Traffic correlation** (Vantage's "correlatable" verdict; network page; NetWhoSees). Two aligned time series:

    ```text
    entry side (ISP sees you)   ▁▁█▁▁▁██▁▁▁▁█▁█▁▁   src 198.51.100.23  dst ████
    exit side  (site sees exit) ▁▁▁█▁▁▁██▁▁▁▁█▁█▁   src ████           dst forum.example
                                  same shape, shifted 40 ms -> linkable
    ```

   Add a small "try it" variant only if cheap; the static version carries the point.

3. **Packet anatomy as a record** (packets basics). The same five fields Vantage uses (sender, destination, content, timing, account), drawn as an envelope. This pre-trains the record before the reader meets Vantage. Show two frames, before and after HTTPS: what TLS hides (content, path) and what it leaves (IP, SNI host name, size, time).
4. **DNS lookup: who learns the name** (infrastructure page before InfraFlux; packets basics). Cloudflare-style numbered steps, reduced to three observers: resolver, root/TLD, authoritative server. Each has a record showing that the resolver sees every name you look up.
5. **Transaction anatomy with change** (ledgers basics, before MoneyCluster). learnmeabitcoin style: inputs → tx → outputs with amounts, and the change output labelled "back to sender". This is the pre-training for MoneyCluster.
6. **Encryption: what the key holder can read** (encryption basics). A record shown three times as small multiples: no encryption (all yellow), TLS (content black for the network, yellow for the site), Tor + TLS (more black per hop). Avoid paint-mixing; if public-key mechanics are needed, use the open-padlock/locked-box metaphor and say what it leaves out (authentication).
7. **Records join** (records basics; generalises IdentityAnchor and IdentityLinks). Two tables with one shared column (phone number, email, IP + time). The join line is magenta when one side holds a name. Every identity, behaviour and attribution figure then reads as an instance of this.
8. **Attribution confidence ladder** (attribution page). A vertical scale from "technical overlap" through "assessed (low / moderate / high confidence)" to "named in an indictment" to "in custody". Each case is placed on it as a unit square, linking the attribution page to ReachLedger and Outcomes.
9. **Case-file timeline** (cases page). Forensic Architecture's master timeline per case: one horizontal time axis, layer rows, the first failed layer in magenta, and the arrest marker. As small multiples across cases, it shows "the failure is rarely in the layer people worry about" at a glance.

## Prioritised change list

Ranked by expected comprehension gain per unit of effort. S = under 1 hour, M = a few hours, L = a day or more.

1. **Outcomes: same magenta identification in "out of reach" and "caught"; only custody differs.** H, S. File: `src/components/Outcomes.astro`.
2. **Vantage: preset "try this" links (VPN alone, guard + exit, Tor logged in) and static role sublabels under nodes.** H, M. Files: `src/components/Vantage.astro`, `src/lib/vantage-render.ts`.
3. **BehaviorClock: replace the toggle with three stacked small multiples, UTC+4 outlined.** H, S. File: `src/components/fig/BehaviorClock.astro`.
4. **NetWhoSees: move after NetPeel (or add role sublabels) and give "holds both ends" its own mark.** H, S. Files: `src/content/layers/{en,ja}/network.mdx`, `src/components/fig/NetWhoSees.astro`.
5. **MoneyCluster: add amounts, split step 2, keep magenta until the exchange step.** H, M. File: `src/components/fig/MoneyCluster.astro`.
6. **One shared worked example (addresses, site, relay IPs) and one term dictionary across all figures; fix JA term drift.** H, M. Files: `src/lib/vantage.ts`, all `src/components/fig/Net*.astro` and `Device*.astro`.
7. **New figure: address → ISP record → subscriber (with the CGNAT port).** H, M. Network page and packets basics.
8. **New figure: traffic correlation, two aligned time series.** H, M. Network page; link from Vantage's "correlatable" verdict.
9. **NetPeel: static four-frame strip (stepper on narrow screens), envelope metaphor, shared literals.** H, M. File: `src/components/fig/NetPeel.astro`.
10. **Guard the three marks: recolour NetOrbRotation's blocklist, DeviceSplit's Tor box, and MoneyCluster's pre-name cluster.** M, S.
11. **AttrDiamond: overlay on by default, pivots as a linear chain; AttrRichHeader: highlight the mismatch and define the Rich header.** M, M.
12. **IdentityLinks: side-by-side before/after; IdentityAnchor: add the "after legal request" row.** M, S.
13. **InfraFlux: highlight only what changes and draw the stale block; InfraC2Path: label arrows with what moves.** M, S.
14. **InfraOverlap: one traced, numbered path from DCLeaks to the GRU.** M, M.
15. **ReachLedger: squares next to the year, per-row counts, mobile layout.** M, M.
16. **Basics figures: packet-as-record, DNS observers, transaction with change, encryption small multiples, records join.** H overall but L effort; these are the pre-training the layer figures depend on, so schedule them with the basics pages now being written.
17. **DeviceBits crowd-first labels, DeviceStudies grouping, DeviceSplit aligned panels and JA line break, IdentityRank unit label, ReachPaths trim.** L, S.
18. **Later: attribution confidence ladder and case-file timelines.** M, L.

## Sources

- [Mayer 2017, Using multimedia for e-learning](https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12197)
- [Mayer & Fiorella 2014, Cambridge Handbook ch. 12](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E)
- [Devlin Peck, Mayer's principles summary](https://www.devlinpeck.com/content/mayers-principles-of-multimedia-learning)
- [Tversky, Morrison & Bétrancourt 2002](https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf)
- [Höffler & Leutner 2007](https://www.sciencedirect.com/science/article/abs/pii/S0959475207001077)
- [Sweller 2011, Cognitive Load Theory](https://www.emrahakman.com/files/2024/10/Cognitive-Load-Sweller-2011.pdf)
- [NSW CESE 2017](https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf)
- [Kalyuga et al. 2003, Expertise reversal](https://www.researchgate.net/publication/48829036_The_Expertise_Reversal_Effect)
- [Bret Victor, Explorable Explanations](https://worrydream.com/ExplorableExplanations/)
- [Hinsen 2025](https://blog.khinsen.net/posts/2025/11/12/explorable-explorable-explanations.html)
- [Nicky Case 2014](https://blog.ncase.me/explorable-explanations/)
- [Nicky Case 2018](https://blog.ncase.me/explorable-explanations-4-more-design-patterns/)
- [Hohman et al., Distill 2020](https://distill.pub/2020/communicating-with-interactive-articles/)
- [Garcia Media on Tse](https://garciamedia.com/blog/interactive_graphics_less_is_best_at_ft/)
- [Digital Journalism 2019](https://www.tandfonline.com/doi/full/10.1080/21670811.2019.1607520)
- [J-Source/JRC 2018](https://jrctmu.ca/2018/04/09/when-it-comes-to-data-driven-journalism-less-is-often-more/)
- [Tufte small multiples quote](https://datavizblog.com/2014/06/26/small-multiples-tableau-and-ben-jones/)
- [Burke 2010, Isotype](https://centaur.reading.ac.uk/16340/1/IDJ-Burke2010.pdf)
- [Isotype, Wikipedia](https://en.wikipedia.org/wiki/Isotype_(picture_language))
- [FT Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/)
- [FT Visual Vocabulary JP poster](https://github.com/ft-interactive/chart-doctor/blob/master/visual-vocabulary/Visual-vocabulary-JP.pdf)
- [Tailscale, How NAT traversal works](https://tailscale.com/blog/how-nat-traversal-works)
- [Cloudflare, What is DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [DNSimple, How DNS Works](https://dnsimple.com/comics/how-dns-works/episodes/)
- [How HTTPS Works](https://howhttps.works/about/)
- [Julia Evans, How I made a zine](https://jvns.ca/blog/2016/08/29/how-i-made-a-zine/)
- [Sustain podcast ep. 238](https://podcast.sustainoss.org/238)
- [Kurose & Ross interactive problems](https://gaia.cs.umass.edu/kurose_ross/interactive/)
- [The Illustrated TLS 1.3 Connection](https://tls13.xargs.org/)
- [tavianator, Cracking DHCE](https://tavianator.com/2018/dhce.html)
- [arsouyes, Diffie-Hellman with colours](https://www.arsouyes.org/articles/2017/09_Diffie_Hellman_couleurs/index.en.html)
- [Berkeley CS161, Key exchange](https://textbook.cs161.org/crypto/key-exchange.html)
- [総務省 暗号化の仕組み](https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/basic/basic_structure_02.html)
- [総務省 SSL/TLS の仕組み](https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/basic/basic_structure_13.html)
- [NCO インターネットの安全・安心ハンドブック](https://security-portal.cyber.go.jp/handbook/)
- [Tor Project overview (archived)](https://2019.www.torproject.org/about/overview.html.en)
- [EFF Tor and HTTPS](https://tor-https.eff.org/)
- [Description of the EFF figure, 2013](https://baldric.net/2013/07/15/tor-and-https-at-eff/)
- [Johnson et al. 2013, Users Get Routed](https://seclab.cs.georgetown.edu/bibliography/tor-realistic-adversaries.html)
- [Anders Brownworth, Blockchain Demo](https://andersbrownworth.com/blockchain/)
- [3Blue1Brown, bitcoin lesson](https://www.3blue1brown.com/lessons/bitcoin/)
- [learnmeabitcoin, outputs](https://learnmeabitcoin.com/beginners/guide/outputs/)
- [learnmeabitcoin, output and change](https://learnmeabitcoin.com/technical/transaction/output/)
- [Chainalysis Reactor](https://www.chainalysis.com/product/reactor/)
- [Chainalysis Silk Road / BTC-e graph](https://twitter.com/chainalysis/status/1324456499310153730?lang=en)
- [FinanceFeeds on Chainalysis tracing](https://financefeeds.com/how-chainalysis-tracks-crypto-money-laundering/)
- [Bellingcat, Hunting the Hunters](https://www.bellingcat.com/resources/2020/12/14/navalny-fsb-methodology/)
- [Forensic Architecture, Abu Akleh report](https://forensic-architecture.org/investigation/the-extrajudicial-killing-of-shireen-abu-akleh-extended-report)
- [MUBI on Forensic Architecture](https://mubi.com/en/notebook/posts/remains-to-be-seen-the-video-work-of-forensic-architecture)
- [WAN-IFRA on NYT Visual Investigations](https://wan-ifra.org/2020/01/ny-times-pioneering-visual-investigations-behind-the-scenes/)
- [Mandiant APT1 report](https://services.google.com/fh/files/misc/mandiant-apt1-report.pdf)
- [Nicky Case, The Evolution of Trust](https://blog.ncase.me/the-evolution-of-trust-is-out/)
- [Evolution of Trust design analysis](https://annexie43430051.wordpress.com/2018/02/22/interactive-storytelling-for-education-the-evolution-of-trust/)
- [ciechanow.ski, Cameras and Lenses](https://ciechanow.ski/cameras-and-lenses/)
- [samwho](https://samwho.dev/)
- [W3C JLReq](https://www.w3.org/TR/jlreq/?lang=en)
- [BudouX](https://github.com/google/budoux)
- [Google Developers JP, BudouX](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html)
