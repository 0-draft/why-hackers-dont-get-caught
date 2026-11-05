# Design direction

## Thesis

Anonymity is not a product, it is a chain of layers. Every layer hides one thing from one observer. People are identified at the weakest layer, which is almost never the one they spent the most effort on.

## Concept: the redacted record

The visual vocabulary comes from the subject itself: what an observer can read versus what is blacked out. The same record (source address, destination, content, timing, account) is drawn for each observer. Hidden fields are solid redaction bars; fields the observer can read are marked with an analyst's highlighter; a field that links back to the real person is marked as a leak.

Three marks, three meanings, used everywhere (figures, tables, case matrix):

| mark | meaning |
| --- | --- |
| black bar | hidden from this observer |
| yellow highlighter | visible to this observer |
| magenta | a leak: this ties the activity to a real identity |

## Palette

| token | light | dark | role |
| --- | --- | --- | --- |
| paper | #E9EBE6 | #17191D | page ground (cool photocopy grey, not cream) |
| sheet | #F6F7F3 | #1F2227 | records and figure grounds |
| ink | #1E2129 | #E3E5E0 | text and lines (slate, deliberately blue-dark) |
| ink-2 | #575C66 | #9EA3AC | secondary text |
| rule | #B9BDB8 | #3B3F46 | dividers |
| bar | #000000 | #000000 | redaction (dark theme draws it with a hairline outline) |
| marker | #F3E04B | #6B5F10 | highlighter (visible) |
| leak | #C8104F | #FF5C93 | identity leak |

## Type

- Latin display and UI: Archivo (variable, wdth 62-125). Headlines in the condensed-heavy cut so they read like a stamped file label without using caps.
- Japanese: LINE Seed JP 400/700/800 (kt prefers it over Mincho).
- Literals only (IP addresses, headers, hashes): JetBrains Mono.
- Body 17px, line-height 1.7 (JA 1.85), measure 68ch / 40ic.

## Layout

Left-aligned, single column for prose with figures breaking wider. The home page opens with the live figure, not a slogan block: the route from the person to the target, an observer picker, and the record redacting itself.

```text
+---------------------------------------------------------------+
| tokumei                                       EN / 日本語  ◐  |
+---------------------------------------------------------------+
| Anonymity is a chain.                                         |
| It breaks at one link.                                        |
|                                                               |
| [direct][VPN][Tor][VPN+Tor][Tor + leak]   <- route            |
|  person -- wifi -- ISP -- VPN -- guard -- middle -- exit -- site
|            ^ pick observers (one or many = collusion)         |
|  record: src ████  dst example.org  content ████  time 03:14  |
|  verdict: not linkable / linkable by timing / identified      |
+---------------------------------------------------------------+
| The layers (strata, top = closest to the person)              |
|  behavior / identity / device / network / infrastructure /    |
|  money / attribution                                          |
+---------------------------------------------------------------+
| Case matrix: cases x layers, failed cell in magenta           |
+---------------------------------------------------------------+
```

## Principles

- One memorable thing: the redaction figure. Everything else is quiet.
- Motion only where it carries meaning: bars sliding over a field when the observer changes. Nothing animates on scroll. Reduced motion -> instant.
- No cards grid, no gradients, no glow, no terminal hero, no black + green, no ALL-CAPS eyebrows, no decorative numbering (layers are not a sequence; cases are ordered by year because they are a timeline).
- Every claim has a source on the same page.
- Concepts, not recipes: the site explains mechanisms and failure modes, never setup steps.

## Review against generic defaults

- First draft was "dark terminal with green type" — the hacker cliché. Replaced with the redacted-record paper look.
- First draft numbered the layers 01-07 like an OSI stack. Layers are not a sequence a person goes through, so they are drawn as strata without numbers.
