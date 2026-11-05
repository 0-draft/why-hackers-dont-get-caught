# Network, transport, and attacker infrastructure: how people hide, and how they get found

Research notes for the explainer site. Scope: the IP layer, proxies and VPNs, Tor/I2P/mixnets, and attacker infrastructure (ORBs, bulletproof hosting, fast-flux, fronting, abuse of legitimate services as C2).
Researched 2026-11-05. Every fact has an inline source. **UNVERIFIED** marks anything that rests on one secondary source or that I could not confirm. "Analysis" marks my own conceptual synthesis, which is not a sourced claim.

---

## 0. The core idea (analysis)

Network anonymity is about **who can link source to destination**, not about encryption. Encryption hides *content*. Anonymity tools try to make sure no single observer sees both ends (*unlinkability*). Every technique below moves trust around:

- one hop (VPN, proxy): you trust one party completely
- several hops run by different parties (Tor, I2P): no one party sees both ends
- several hops plus deliberate delays and cover traffic (mixnets): even someone watching both ends has trouble matching flows by timing

Attackers care about two directions:

1. **Hiding the operator** from the victim and investigators (proxies, VPNs, Tor, ORBs, residential proxies).
2. **Keeping infrastructure alive** against takedown (bulletproof hosting, fast-flux, fronting, legitimate-service C2).

De-anonymization usually comes from **one weak link**: a log, a payment, a reused account, an operator mistake, or a correlation between two vantage points. Breaking the cryptography is almost never how it happens.

---

## 1. IP addresses, ISPs, and VPNs

### What an IP address gives an investigator (analysis plus legal context)

- A public IP plus a **timestamp** can usually be traced to an ISP subscriber account through the ISP's address-assignment records (DHCP, CGNAT port mappings). Behind NAT or CGNAT you need the source port and exact time too. This is general networking knowledge; how long ISPs keep these records depends on country and is not covered here (UNVERIFIED per-jurisdiction).
- Judges have treated the IP a Tor user hands to the network as something the user gives up voluntarily. In the Silk Road 2.0 / Farrell case (Feb 2016), the court said Tor users "clearly lack a reasonable expectation of privacy in their IP addresses" ([Forbes](https://www.forbes.com/sites/emmawoollacott/2016/02/25/tor-users-were-caught-by-cmu-researchers-and-lack-reasonable-expectation-of-privacy-judge-rules/), [Threatpost](https://threatpost.com/judge-confirms-dod-funded-research-to-decloak-tor-users/116464/)).

### What a VPN changes: the single-hop trust problem

- The **destination** sees the VPN server's IP, not yours.
- The **ISP or local network** sees that you connect to a VPN server, plus timing and volume. Content and the final destination are encrypted.
- The **VPN provider** sees both: your real IP *and* where your traffic goes, plus content that isn't otherwise encrypted (TLS still protects HTTPS content). A VPN is a *privacy-from-the-ISP* tool. It does not provide anonymity from the provider. Tor's own guidance says adding a VPN "shift[s] the trust to your VPN provider" ([Tor forum thread](https://forum.torproject.org/t/tor-vpn/730)).

### "No-log" claims that failed

**PureVPN, 2017 (Ryan Lin cyberstalking case).** Lin was arrested on 5 Oct 2017 in Massachusetts. The FBI affidavit (SA Jeffrey Williams, dated 3 Oct 2017) says PureVPN "was able to determine that their service was accessed by the same customer from two originating IP addresses": Lin's home RCN IP and his employer's IP. That happened even though PureVPN marketed "We do NOT keep any logs that can identify or help in monitoring a user's activity" ([DOJ affidavit PDF](https://www.justice.gov/opa/press-release/file/1001841/download), [TorrentFreak](https://torrentfreak.com/purevpn-logs-helped-fbi-net-alleged-cyberstalker-171009/), [BleepingComputer](https://www.bleepingcomputer.com/news/security/cyberstalking-suspect-arrested-after-vpn-providers-shared-logs-with-the-fbi/)). Lesson: **"no activity logs" can still mean connection logs** (timestamp plus real IP), and that is enough.

**IPVanish / Highwinds (events in 2016, made public 2018).** Homeland Security Investigations traced an IRC user in a child-exploitation case to IP 209.197.26.72, owned by Highwinds Network Group, which owned IPVanish at the time. A first response claimed no usage logs. After a second summons, Highwinds provided the subscriber's name, email, VPN subscription details, and connect/disconnect times, which led to the suspect's Comcast IP. It came out through court filings reported by TorrentFreak in 2018. StackPath, which bought Highwinds in Feb 2017, said the people involved had left ([TorrentFreak](https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/), [Wikipedia: IPVanish](https://en.wikipedia.org/wiki/IPVanish)).

- **Correction to the brief:** *Preston McWaters* was **not** the IPVanish case. He was the 2016 Private Internet Access (PIA) subpoena case, where PIA reportedly had nothing useful to give ([Wikipedia: IPVanish page cross-ref / secondary summaries](https://en.wikipedia.org/wiki/IPVanish)). Treat the McWaters/PIA detail as **UNVERIFIED** against court records. It is the usual counter-example to "all VPNs log".

---

## 2. Proxies, residential proxies, and hijacked devices

### Open proxies, SOCKS, chains (concept)

- An HTTP or SOCKS proxy relays your TCP connection, so the destination sees the proxy's IP. SOCKS is protocol-agnostic. Tor itself exposes a SOCKS interface to applications ([Tor support overview](https://support.torproject.org/about-tor/how-tor-works/overview/) notes apps must "support SOCKS").
- A *proxy chain* is several single-hop proxies in a row. Unlike Tor, the hops don't use layered encryption that the client negotiates with each hop. Any hop may see plaintext, and open proxies are often run by unknown or hostile parties (analysis).

### Residential proxies and "proxyware"

Criminals want **residential IPs** because they look like ordinary home users and get past IP-reputation and geo-fencing defenses (analysis, consistent with GTIG's framing below).

**911 S5 (DOJ, 29 May 2024).** YunHe Wang (35, PRC national, St Kitts and Nevis citizen-by-investment) was arrested in Singapore on 24 May 2024. From 2014 to July 2022 the botnet took over millions of residential Windows PCs, linked to **19 million+ unique IPs (613,841 in the US)**. The malware spread through Wang's own "free VPN" apps, MaskVPN and DewVPN, and through pay-per-install bundles with pirated software. He ran it on about 150 dedicated servers, about 76 of them leased from US providers. He allegedly took in **about $99M** (2018–July 2022). Criminals using the proxy IPs filed about 560,000 fraudulent unemployment claims, with losses over **$5.9B**. The operation seized 23 domains and more than 70 servers, and OFAC sanctioned Wang and two others on 28 May 2024 ([DOJ press release](https://www.justice.gov/archives/opa/pr/911-s5-botnet-dismantled-and-its-administrator-arrested-coordinated-international-operation), [The Hacker News](https://thehackernews.com/2024/05/us-dismantles-worlds-largest-911-s5.html)). Teaching point: **the "free VPN" was the infection vector**, so users turned into other people's exit nodes.

**IPIDEA (Google GTIG, late Jan 2026).** GTIG and partners disrupted IPIDEA, a Chinese-run residential proxy operation behind many brands (922 Proxy, 360 Proxy, Luna Proxy, PIA S5 Proxy, and others). It recruited devices through SDKs embedded in otherwise legitimate apps and through preloaded devices. It advertised 60M+ residential proxies, and in one week GTIG linked **550+ threat groups** to its use ([The Hacker News](https://thehackernews.com/2026/01/google-disrupts-ipidea-one-of-worlds.html), [Help Net Security](https://www.helpnetsecurity.com/2026/01/29/ipidea-proxy-network-disrupted/)). The primary GTIG blog was not read directly, so treat the brand list as secondary.

### Compromised routers as hop points

- **APT28 / Moobot (DOJ "Operation Dying Ember", announced 15 Feb 2024).** Ordinary criminals put Moobot (a Mirai variant) on Ubiquiti EdgeOS routers that still had default passwords. GRU hackers then piggybacked on it for credential phishing and NTLMv2 hash harvesting. The FBI's court-authorized operation removed the malware and changed firewall rules, in a way owners could reverse ([The Hacker News](https://thehackernews.com/2024/02/us-government-disrupts-russian-linked.html), [Forescout](https://www.forescout.com/blog/doj-moobot-botnet-commandeered-by-russian-apt28-analysis-of-attacks-against-routers-and-malware-samples/)). Point to make: one botnet was shared by crime groups and a state actor.

---

## 3. ORB networks (China-nexus "Operational Relay Box" meshes)

**Mandiant, 22 May 2024**, "IOC Extinction? China-Nexus Cyber Espionage Actors Use ORB Networks to Raise Cost on Defenders" (Michael Raggi) ([Google Cloud / Mandiant blog](https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-espionage-orb-networks), coverage: [CyberScoop](https://cyberscoop.com/china-hacking-operational-relay-box-networks/), [Dark Reading](https://www.darkreading.com/cybersecurity-operations/chinese-orb-networks-conceal-apts-make-tracking-iocs-irrelevant)):

- ORBs are **mesh networks of leased VPSs and/or compromised routers and IoT devices**. Mandiant splits them into *provisioned* (leased VPS), *non-provisioned* (hijacked devices), and hybrid types.
- **Contractors or administrators in China run them, and several APT groups share them**, which blurs attribution.
- Layered flow: adversary-controlled operations server → traversal nodes → exit node → victim. Exit nodes are often picked to be geographically close to the target (UNVERIFIED: from secondary coverage, primary report not re-read).
- Nodes rotate fast. Mandiant cites lifespans as short as **about 31 days**, which makes IPs nearly useless as static IOCs.
- Named networks: **ORB3 / SPACEHOP** and **FLORAHOX** ([CyberScoop](https://cyberscoop.com/china-hacking-operational-relay-box-networks/)). The "provisioned" vs "hybrid" labels for each are UNVERIFIED (from memory of the report).

**KV-botnet / Volt Typhoon.** The court authorized the operation in **December 2023** and DOJ announced it on **31 Jan 2024**. The botnet was "hundreds" of US SOHO routers, mostly **end-of-life Cisco and NETGEAR** devices with no more patches. Volt Typhoon used them to "conceal the PRC origin" of intrusions into critical infrastructure. The FBI deleted the malware and cut the routers off from C2, and a reboot reverses those steps ([DOJ press release](https://www.justice.gov/archives/opa/pr/us-government-disrupts-botnet-peoples-republic-china-used-conceal-hacking-critical)). Lumen Black Lotus Labs found the botnet first ([SecurityWeek](https://www.securityweek.com/us-gov-disrupts-soho-router-botnet-used-by-chinese-apt-volt-typhoon/)).

**Raptor Train / Flax Typhoon.** Joint FBI/CNMF/NSA and Five Eyes advisory, **18 Sep 2024**: a Mirai-based botnet of **260,000+ devices as of June 2024** (North America ~135,300, Europe ~65,600, Asia ~50,400), controlled by Beijing-based **Integrity Technology Group** from China Unicom Beijing IP space ([IC3 advisory PDF](https://www.ic3.gov/CSA/2024/240918.pdf), [FBI story](https://www.fbi.gov/news/stories/fbi-director-announces-chinese-botnet-disruption-exposes-flax-typhoon-hacker-group-s-true-identity-at-aspen-cyber-summit)). Black Lotus Labs counted 200,000+ devices compromised since May 2020 ([The Hacker News](https://thehackernews.com/2024/09/new-raptor-train-iot-botnet-compromises.html)). FBI Director Wray said the operators fought back during the takedown, including a DDoS against the FBI ([BleepingComputer](https://www.bleepingcomputer.com/news/security/flax-typhoon-hackers-infect-260-000-routers-ip-cameras-with-botnet-malware/)). OFAC later sanctioned Integrity Tech, in **January 2025** (exact date UNVERIFIED) ([Cybersecurity Dive](https://www.cybersecuritydive.com/news/treasury-sanctions-flax-typhoon/736538/)).

Defender lesson: with ORBs, the source IP you see is **someone's home router in your own country**. Geo-blocking and IP blocklists stop working, so defenders have to track behavior and infrastructure patterns over time.

---

## 4. Tor

### Mechanism

- **3 hops: guard (entry), middle, exit.** The client builds the circuit hop by hop and "negotiates a separate set of encryption keys for each hop", so "each relay along the way knows only which relay gave it data and which relay it is giving data to" ([Tor support: overview](https://support.torproject.org/about-tor/how-tor-works/overview/)).
- **Layered ("onion") encryption.** The client wraps each cell in three layers. Each relay removes one layer. Only the exit sees the stream to the destination, and that stream is plaintext unless the application uses TLS.
- **What each relay knows:** the guard knows the client IP but not the destination. The middle knows only the guard and the exit. The exit knows the destination (and content if not TLS) but not the client.
- **Circuit lifetime:** Tor reuses a circuit "for connections that happen within the same ten minutes or so", then builds new ones ([Tor support: overview](https://support.torproject.org/about-tor/how-tor-works/overview/)). The `MaxCircuitDirtiness` default is 10 minutes ([Tor forum citing man page](https://forum.torproject.org/t/a-question-about-maxcircuitdirtiness-option/11121)).
- **Guards are kept for months on purpose.** If you picked a new entry every time, a hostile guard would eventually see you. Tor instead picks a small set of guards and reuses them ([Tor support: entry guards](https://support.torproject.org/about-tor/how-tor-works/entry-guards/)). Under the Prop 271 guard algorithm, the parameters are `guard-lifetime-days` and `guard-confirmed-min-lifetime-days` ([Tor param spec](https://spec.torproject.org/param-spec.html)). The commonly cited defaults are 120 and 60 days ([Whonix: entry guards](https://www.whonix.org/wiki/Tor_Entry_Guards)). Privacy Guides summarizes this as about 2–3 months. The exact defaults are UNVERIFIED against the spec text.
- **Directory authorities and consensus.** A small fixed set of directory authorities vote **every hour** and sign a consensus document listing relays and flags. Clients accept a consensus signed by more than half of the authorities ([dir-spec outline](https://spec.torproject.org/dir-spec/outline.html), [Proposal 101](https://spec.torproject.org/proposals/101-dir-voting.html)). The current count, **9** (moria1, tor26, dizum, gabelmoo, dannenberg, maatuska, longclaw, bastet, faravahar), comes from the live [consensus-health page](https://consensus-health.torproject.org/) and is likely but not checked against source code.

### Onion services (v3)

- The address is the service's public key. The service picks **introduction points**, keeps 3-hop circuits open to them, and publishes a signed descriptor to a DHT inside Tor. The client picks a **rendezvous point**, sends a one-time secret through an intro point, and both sides meet at the RP. In total **6 relays** sit between client and service, and neither side learns the other's IP. The service only makes outgoing connections, so it needs no open inbound ports ([Tor community: onion services overview](https://community.torproject.org/onion-services/overview/)).

### Bridges and pluggable transports

- **Bridges** are unlisted entry relays for censored users. **obfs4** makes traffic look like random bytes and resists active probing. **meek** used domain fronting through CDNs. **Snowflake** uses short-lived volunteer WebRTC proxies and uses fronting only for the first matchmaking step at the broker ([Snowflake technical overview](https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/Technical%20Overview), [Tor support: unblocking Tor](https://support.torproject.org/tor-browser/circumvention/unblocking-tor/), [Snowflake stable blog, 2021](https://blog.torproject.org/snowflake-in-tor-browser-stable/)).
- Bridge users by transport on **2 Nov 2026**: obfs4 ≈ 296,700, WebTunnel ≈ 86,700, Snowflake ≈ 78,200, meek ≈ 4,200 ([Tor Metrics CSV](https://metrics.torproject.org/userstats-bridge-transport.csv?start=2026-10-15&end=2026-11-05)).

### Size (Tor Metrics)

- **Relays: about 9,500, bridges: about 2,500** (2 Nov 2026: 9,513 relays / 2,502 bridges) ([Tor Metrics networksize CSV](https://metrics.torproject.org/networksize.csv?start=2026-10-01&end=2026-11-05)).
- **Users: be careful.** Tor estimates users from directory requests. The relay-user estimate was about **2M in early 2025** and about **3.1–3.4M for most of mid-2026**, but it spikes from time to time (e.g. ~14.8M on 2025-09-01, ~57M on 2026-11-01) ([Tor Metrics userstats CSV](https://metrics.torproject.org/userstats-relay-country.csv?start=2025-01-01&end=2026-11-05&country=all&events=off)). The spikes look like measurement anomalies, likely bots or misbehaving clients making directory requests, not real growth. That cause is **UNVERIFIED (my inference)**. On the site, say "a few million daily users" and link to the live graph.

### Limits and real-world attacks

- **Traffic correlation (end-to-end).** Anyone who sees both the client→guard and exit→destination links can match flows by timing and volume. Tor's own docs say entry guards exist because of this ([Tor support: entry guards](https://support.torproject.org/about-tor/how-tor-works/entry-guards/)). The 2014 advisory calls stopping traffic confirmation "an open research problem" ([Tor blog, 2014](https://blog.torproject.org/tor-security-advisory-relay-early-traffic-confirmation-attack/)).
- **AS-level / BGP (RAPTOR, USENIX Sec 2015).** Asymmetric routing lets one autonomous system see one direction of traffic at each end. The authors did correlation on live Tor with 95% accuracy, and BGP hijacks or interception can be used actively ([USENIX paper](https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-sun.pdf)).
- **Relay-early attack (2014, CMU/SEI).** About 115 relays joined on 30 Jan 2014 and were removed on 4 Jul 2014. They took Guard and HSDir flags and injected a signal in `RELAY_EARLY` cells when onion-service descriptors were fetched or published. Matching guards read the signal, which tied users or services to their IPs. The advisory came out on 30 Jul 2014 ([Tor blog advisory](https://blog.torproject.org/tor-security-advisory-relay-early-traffic-confirmation-attack/)). The relay count comes from a secondary survey ([arXiv 2009.13018](https://arxiv.org/pdf/2009.13018)). In Feb 2016 a federal judge confirmed that the Farrell (Silk Road 2.0) IP was identified by **CMU's Software Engineering Institute** in DoD-funded research and handed to the FBI under subpoena ([Vice/Motherboard](https://www.vice.com/en/article/carnegie-mellon-university-attacked-tor-was-subpoenaed-by-feds/), [Threatpost](https://threatpost.com/judge-confirms-dod-funded-research-to-decloak-tor-users/116464/)).
- **Malicious exits, BTCMITM20.** Thousands of exit relays over time ran SSL-stripping and swapped Bitcoin addresses in plaintext HTTP ([nusenu, via The Record](https://therecord.media/a-mysterious-threat-actor-is-running-hundreds-of-malicious-tor-relays)). This shows exits **can read and modify non-TLS traffic**.
- **KAX17 (disclosed Dec 2021, nusenu).** Active since at least 2017, with **900+ relays** at peak, mostly guard and middle. Users had up to about 16% chance of a KAX17 guard and about 35% of a KAX17 middle. Tor removed batches in Oct 2020 and Oct/Nov 2021. The motive is unknown and possibly de-anonymization ([nusenu](https://nusenu.medium.com/is-kax17-performing-de-anonymization-attacks-against-tor-users-42e566defce8), [The Record](https://therecord.media/a-mysterious-threat-actor-is-running-hundreds-of-malicious-tor-relays)).
- **Website fingerprinting.** A *local passive* observer (Wi-Fi, ISP, guard) can guess which site you load from packet size and direction. Deep Fingerprinting (CCS 2018) reached **98.3%** closed-world accuracy on undefended Tor traffic ([arXiv 1801.02265](https://arxiv.org/pdf/1801.02265)). Caveat for the site: closed-world lab results overstate real-world accuracy (analysis, a well-known critique).

---

## 5. I2P and mixnets (brief)

- **I2P / garlic routing.** Tunnels are **one-way**. Each peer builds separate inbound and outbound tunnels, so one request and reply touches four tunnels. Several messages ("cloves") can be bundled into one garlic message ([I2P docs: garlic routing](https://i2p.net/en/docs/overview/garlic-routing)). I2P is built mainly for services *inside* the network ("eepsites") rather than reaching the clearnet (analysis).
- **Mixnets (Loopix → Nym).** Loopix (USENIX Sec 2017) adds **cover traffic** and **Poisson mixing**: each packet gets an independent, exponentially distributed delay at each mix. The goal is to resist even a global passive adversary, at the cost of seconds of latency ([USENIX paper](https://www.usenix.org/conference/usenixsecurity17/technical-sessions/presentation/piotrowska)). The Nym whitepaper says "The Nym mixnet is based on the Loopix design" ([Nym whitepaper PDF](https://nym.com/nym-whitepaper.pdf)).
- Contrast (analysis): Tor forwards cells as soon as it gets them, which keeps it low-latency and makes timing correlation possible. Mixnets reorder and delay traffic so timing stops lining up.

---

## 6. VPN→Tor and Tor→VPN: what changes for each observer (analysis plus Tor guidance)

| Setup | ISP / local net sees | VPN sees | Tor guard sees | Destination sees |
|---|---|---|---|---|
| Tor only | you → a Tor guard (or a bridge) | n/a | your real IP | Tor exit IP (public list, easy to flag "Tor user") |
| **You → VPN → Tor** | you → VPN only (hides Tor use from ISP) | your real IP + "this user uses Tor" | VPN IP, not you | Tor exit IP |
| **You → Tor → VPN** | you → Tor guard | Tor exit IP (not you) + your destinations + any non-TLS content; plus **your payment/account identity** | your real IP | the VPN IP (not flagged as Tor) |

- Tor's official line: "we don't recommend using a VPN with Tor unless you're an advanced user who knows how to configure both in a way that doesn't compromise your privacy" ([Tor support FAQ](https://support.torproject.org/faq/faq-5/), [Tor Browser + VPN](https://support.torproject.org/tor-browser/general/vpn-with-tor/)).
- Key insight: VPN→Tor replaces "the ISP knows I use Tor" with "the VPN knows I use Tor". Tor→VPN puts a **fixed exit** at the end, which links all your sessions together and cancels Tor's circuit isolation. If the VPN account was paid by card, you're identified ([Tor forum discussion](https://forum.torproject.org/t/tor-vpn/730)).

---

## 7. Attacker infrastructure

### Bulletproof hosting (BPH)

- **CyberBunker** (ex-NATO bunker, Traben-Trarbach, Germany). Over 600 police raided it in Sep 2019. On 13 Dec 2021 the Trier court convicted eight people of forming a criminal organization. Herman-Johan Xennt got **5 years 9 months**. He was acquitted of aiding the crimes of the sites he hosted (e.g. Wall Street Market), and his appeal was rejected in 2023 ([DCD](https://www.datacenterdynamics.com/en/news/german-court-convicts-eight-over-illegal-bulletproof-data-center-in-former-nato-bunker/), [Euronews/AP](https://www.euronews.com/2021/12/13/german-court-convicts-eight-for-operating-illegal-data-centre-in-ex-military-bunker)).
- **Zservers** (Barnaul, Russia). Sanctioned on **11 Feb 2025** by the US, UK, and Australia for hosting LockBit affiliates. When a victim complained, the admins gave the customer **a new IP** instead of removing them. Admins Alexander Mishin and Aleksandr Bolshakov were designated ([Treasury sb0018](https://home.treasury.gov/news/press-releases/sb0018)).
- **Aeza Group** (Russia). Sanctioned on **1 Jul 2025** together with subsidiaries and UK front company Aeza International. Clients included BianLian ransomware, Meduza/Lumma/RedLine infostealer panels, and the BlackSprut drug market ([Treasury sb0185](https://home.treasury.gov/news/press-releases/sb0185), [The Register](https://www.theregister.com/2025/07/02/aeza_group_us_sanctions/)).
- Pattern (analysis): BPH works in **jurisdiction gaps**, ignores abuse reports, and uses front companies in other countries to lease IP space. Sanctions go after its money and its upstream providers.

### Fast-flux DNS

- A domain's A (and sometimes NS) records rotate quickly through many compromised hosts, so there's no single server to seize. In **AA25-093A (3 Apr 2025)**, NSA/CISA/FBI and Five Eyes partners called fast flux "a national security threat" and recommended protective DNS ([CISA AA25-093A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-093a)).

### Domain fronting and its decline

- Fronting puts an innocuous domain in DNS and TLS SNI and the real target in the encrypted HTTP Host header, both on the same CDN. Google App Engine stopped it around **mid-April 2018** ("never been a supported feature"). Amazon CloudFront announced on **27 Apr 2018** that it would block it, and Signal's CloudFront account was threatened ([TechCrunch](https://techcrunch.com/2018/05/02/signal-could-get-kicked-out-of-amazon-web-services), [SentinelOne](https://www.sentinelone.com/blog/privacy-2019-tor-meek-rise-fall-domain-fronting/)). Microsoft Azure Front Door blocks it from **8 Jan 2024** (single secondary source, **UNVERIFIED**). Attackers (C2) and censorship-circumvention tools (Signal, meek, Psiphon) used the same technique. That dual use is a good point for the site.

### C2 redirectors (concept)

- A thin layer of throwaway VPS or CDN hosts forwards only "valid" implant traffic to the real team server, so defenders who block or burn the redirector never see the backend. ORBs are the industrialized, shared version of the same idea (analysis linking §3).

### Legitimate services as C2 or exfil channels

- MITRE ATT&CK **T1102 (Web Service)**: "Adversaries may use an existing, legitimate external Web service as a means for relaying data to/from a compromised system." Examples include CHIMNEYSWEEP and VOID MANTICORE over the **Telegram** API, WhisperGate and Raspberry Robin pulling payloads from **Discord**, Turla using **GitHub**/Dropbox/Pastebin, and Nightdoor using **Google Drive/OneDrive** ([MITRE T1102](https://attack.mitre.org/techniques/T1102/)).
- **APT41 TOUGHPROGRESS (GTIG, 28 May 2025):** the malware wrote encrypted output into zero-minute **Google Calendar** events and read commands from events on hardcoded dates. Google shut down the attacker's Workspace accounts ([GTIG blog](https://cloud.google.com/blog/topics/threat-intelligence/apt41-innovative-tactics), [The Hacker News](https://thehackernews.com/2025/05/chinese-apt41-exploits-google-calendar.html)). Google Sheets as C2 isn't in the MITRE T1102 page I read. Claims about Sheets specifically are **UNVERIFIED** here.
- Why it works (analysis): traffic goes to google.com, discord.com, or api.telegram.org over TLS, which is allow-listed and high-reputation. The provider can see the attacker's account, which is how these operations often get unmasked and shut down.

### CDN tunnels (TryCloudflare)

- Since **Feb 2024** a financially motivated actor has used free, account-less **TryCloudflare** tunnels (random `*.trycloudflare.com` subdomains) to deliver AsyncRAT, GuLoader, Remcos, VenomRAT, and Xworm. Proofpoint counted 1,500+ malicious emails by 11 Jul 2024 ([Proofpoint, 1 Aug 2024](https://www.proofpoint.com/us/blog/threat-insight/threat-actor-abuses-cloudflare-tunnels-deliver-rats)). The origin server sits behind Cloudflare and makes only outbound connections.

### Domain registration privacy and WHOIS redaction

- ICANN's **Temporary Specification** (adopted 17 May 2018, effective **25 May 2018**, the day GDPR took effect) required registrars to redact personal registrant data from public WHOIS ("REDACTED FOR PRIVACY"). Registrars still *collect* the data and must give "reasonable access" to parties with a legitimate interest ([ICANN Temp Spec page](https://www.icann.org/resources/pages/gtld-registration-data-specs-en), [ICANN FAQ](https://www.icann.org/en/contracted-parties/registry-operators/faq-for-implementing-the-temporary-specification-for-gtld-registration-data-22-06-2018-en)). For investigators, WHOIS pivoting got much harder after 2018. Passive DNS, TLS-certificate, and registrar-request pivots became more important (analysis).

### Stolen or compromised hosting

- 911 S5 leased about 76 of its servers from **US-based providers** ([DOJ](https://www.justice.gov/archives/opa/pr/911-s5-botnet-dismantled-and-its-administrator-arrested-coordinated-international-operation)), and APT41 hosted its payload on a **compromised government website** ([GTIG](https://cloud.google.com/blog/topics/threat-intelligence/apt41-innovative-tactics)). Hosting on legitimate or hacked infrastructure borrows that infrastructure's reputation.

---

## 8. Who sees what

Legend: **Y** = learns it, **N** = doesn't, **~** = partial or inferable. Assumes HTTPS to a clearnet site. This is a conceptual synthesis built from §1, §4, and §6.

| Vantage | Your real IP | Final destination | Content | Timing / volume |
|---|---|---|---|---|
| Local Wi-Fi / LAN (no VPN/Tor) | Y (MAC + LAN IP) | Y (DNS, SNI; ~ with ECH/DoH) | N (TLS) | Y |
| ISP (no VPN/Tor) | Y (subscriber) | Y (IP, DNS, SNI) | N (TLS) | Y |
| ISP (with VPN) | Y | N (sees VPN server only) | N | Y |
| VPN provider | Y | Y | ~ (only what TLS doesn't cover) | Y |
| Tor guard | Y | N | N | Y (can fingerprint sites ~) |
| Tor middle | N | N | N | Y (guard & exit identities only) |
| Tor exit | N | Y | ~ (Y if non-TLS; see BTCMITM20) | Y |
| Destination server | N (sees exit/VPN/proxy IP) | Y (itself) | Y | Y + **app-layer identity** (login, cookies, fingerprint) |
| Onion-service rendezvous point | N | N | N | Y |
| Global passive adversary (sees all links) | Y | Y | N | Y → **can correlate** ends; Tor not designed to stop this; mixnets try to |

---

## 9. Common misconceptions

1. **"VPN = anonymous."** No. It moves your trust from the ISP to one company that sees both ends. PureVPN and IPVanish logs identified their users ([DOJ affidavit](https://www.justice.gov/opa/press-release/file/1001841/download), [TorrentFreak](https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/)).
2. **"Tor encrypts everything end to end."** Only up to the exit. After that it's whatever the application does. BTCMITM20 rewrote plaintext traffic ([The Record](https://therecord.media/a-mysterious-threat-actor-is-running-hundreds-of-malicious-tor-relays)).
3. **"More hops = more anonymous."** Correlation needs only the two ends, so middle hops add little against an end-to-end observer. Extra fixed hops (Tor→VPN) can *reduce* anonymity by linking sessions.
4. **"Tor was broken by cryptanalysis."** Known de-anonymizations came from Sybil relays (CMU 2014, KAX17), application exploits, or operator mistakes, not broken crypto ([Tor blog](https://blog.torproject.org/tor-security-advisory-relay-early-traffic-confirmation-attack/)).
5. **"Attack came from a Chinese IP, so China" / "came from a US IP, so domestic."** ORBs and residential proxies put the last hop wherever the attacker wants, often next to the victim ([Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-espionage-orb-networks)).
6. **"Free VPN is harmless."** 911 S5 used free VPN apps to turn users into exit nodes for criminals ([DOJ](https://www.justice.gov/archives/opa/pr/911-s5-botnet-dismantled-and-its-administrator-arrested-coordinated-international-operation)).
7. **"WHOIS privacy means the registrar doesn't know."** The registrar still collects the data and must give access for legitimate requests ([ICANN](https://www.icann.org/resources/pages/gtld-registration-data-specs-en)).
8. **"Blocking bad IPs stops APTs."** Mandiant's ORB lifespans of about 31 days and Volt Typhoon's EOL routers make IP IOCs short-lived.
9. **"Tor user numbers are exact."** They're estimates from directory requests and swing wildly with anomalies ([Tor Metrics](https://metrics.torproject.org/userstats-relay-country.csv?start=2025-01-01&end=2026-11-05&country=all&events=off)).

---

## 10. Diagram ideas

1. **Onion peeling animation.** A packet with three colored layers. Each relay removes one, and a sidebar shows "what this relay knows" at each step.
2. **Vantage-point matrix (interactive §8 table).** Pick a setup (none / VPN / Tor / VPN→Tor / Tor→VPN). Each observer icon lights up the fields it can see. This is probably the most useful visual on the site.
3. **Correlation attack.** Two oscilloscope-style traces (guard-side and exit-side traffic bursts) that line up, with a "match!" overlay. Contrast with a mixnet version where Poisson delays scramble the alignment.
4. **Onion-service 6-hop map.** Client 3 hops → rendezvous point ← 3 hops service, with the intro point and DHT descriptor drawn as dashed setup lines.
5. **ORB mesh.** Operator in China → provisioned VPS → hijacked SOHO routers → exit router in the victim's own city. Nodes fade in and out over a 31-day timeline to show IOC decay.
6. **Residential-proxy supply chain.** "Free VPN app / SDK" → infected phone or PC → proxy broker storefront → fraudster or APT → victim bank. Annotate with 911 S5's 19M IPs and $99M.
7. **Single-hop trust funnel.** ISP view and VPN view side by side, showing the VPN sees both ends. Overlay the PureVPN affidavit quote.
8. **Domain fronting envelope.** Outer envelope (DNS/SNI: allowed.com) and inner letter (Host: blocked.com), then a 2018 "CDN closes the envelope" timeline.
9. **Legit-service C2.** Implant ↔ Google Calendar event ↔ operator. Firewall shows "calendar.google.com: allowed", and the provider (Google) is the one that can see the account.
10. **De-anonymization funnel.** A ladder of failure points (payment, log, account reuse, timing correlation, Sybil relay, app exploit) and a case for each (PureVPN, CMU/SEI, KAX17).

---

## Sources

- <https://www.justice.gov/opa/press-release/file/1001841/download>
- <https://torrentfreak.com/purevpn-logs-helped-fbi-net-alleged-cyberstalker-171009/>
- <https://www.bleepingcomputer.com/news/security/cyberstalking-suspect-arrested-after-vpn-providers-shared-logs-with-the-fbi/>
- <https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/>
- <https://en.wikipedia.org/wiki/IPVanish>
- <https://www.justice.gov/archives/opa/pr/911-s5-botnet-dismantled-and-its-administrator-arrested-coordinated-international-operation>
- <https://thehackernews.com/2024/05/us-dismantles-worlds-largest-911-s5.html>
- <https://thehackernews.com/2026/01/google-disrupts-ipidea-one-of-worlds.html>
- <https://www.helpnetsecurity.com/2026/01/29/ipidea-proxy-network-disrupted/>
- <https://thehackernews.com/2024/02/us-government-disrupts-russian-linked.html>
- <https://www.forescout.com/blog/doj-moobot-botnet-commandeered-by-russian-apt28-analysis-of-attacks-against-routers-and-malware-samples/>
- <https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-espionage-orb-networks>
- <https://cyberscoop.com/china-hacking-operational-relay-box-networks/>
- <https://www.darkreading.com/cybersecurity-operations/chinese-orb-networks-conceal-apts-make-tracking-iocs-irrelevant>
- <https://www.justice.gov/archives/opa/pr/us-government-disrupts-botnet-peoples-republic-china-used-conceal-hacking-critical>
- <https://www.securityweek.com/us-gov-disrupts-soho-router-botnet-used-by-chinese-apt-volt-typhoon/>
- <https://www.ic3.gov/CSA/2024/240918.pdf>
- <https://www.fbi.gov/news/stories/fbi-director-announces-chinese-botnet-disruption-exposes-flax-typhoon-hacker-group-s-true-identity-at-aspen-cyber-summit>
- <https://thehackernews.com/2024/09/new-raptor-train-iot-botnet-compromises.html>
- <https://www.bleepingcomputer.com/news/security/flax-typhoon-hackers-infect-260-000-routers-ip-cameras-with-botnet-malware/>
- <https://www.cybersecuritydive.com/news/treasury-sanctions-flax-typhoon/736538/>
- <https://support.torproject.org/about-tor/how-tor-works/overview/>
- <https://support.torproject.org/about-tor/how-tor-works/entry-guards/>
- <https://spec.torproject.org/param-spec.html>
- <https://www.whonix.org/wiki/Tor_Entry_Guards>
- <https://forum.torproject.org/t/a-question-about-maxcircuitdirtiness-option/11121>
- <https://spec.torproject.org/dir-spec/outline.html>
- <https://spec.torproject.org/proposals/101-dir-voting.html>
- <https://consensus-health.torproject.org/>
- <https://community.torproject.org/onion-services/overview/>
- <https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/Technical%20Overview>
- <https://support.torproject.org/tor-browser/circumvention/unblocking-tor/>
- <https://blog.torproject.org/snowflake-in-tor-browser-stable/>
- <https://metrics.torproject.org/networksize.csv?start=2026-10-01&end=2026-11-05>
- <https://metrics.torproject.org/userstats-relay-country.csv?start=2025-01-01&end=2026-11-05&country=all&events=off>
- <https://metrics.torproject.org/userstats-bridge-transport.csv?start=2026-10-15&end=2026-11-05>
- <https://blog.torproject.org/tor-security-advisory-relay-early-traffic-confirmation-attack/>
- <https://arxiv.org/pdf/2009.13018>
- <https://www.vice.com/en/article/carnegie-mellon-university-attacked-tor-was-subpoenaed-by-feds/>
- <https://threatpost.com/judge-confirms-dod-funded-research-to-decloak-tor-users/116464/>
- <https://www.forbes.com/sites/emmawoollacott/2016/02/25/tor-users-were-caught-by-cmu-researchers-and-lack-reasonable-expectation-of-privacy-judge-rules/>
- <https://nusenu.medium.com/is-kax17-performing-de-anonymization-attacks-against-tor-users-42e566defce8>
- <https://therecord.media/a-mysterious-threat-actor-is-running-hundreds-of-malicious-tor-relays>
- <https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-sun.pdf>
- <https://arxiv.org/pdf/1801.02265>
- <https://i2p.net/en/docs/overview/garlic-routing>
- <https://www.usenix.org/conference/usenixsecurity17/technical-sessions/presentation/piotrowska>
- <https://nym.com/nym-whitepaper.pdf>
- <https://support.torproject.org/faq/faq-5/>
- <https://support.torproject.org/tor-browser/general/vpn-with-tor/>
- <https://forum.torproject.org/t/tor-vpn/730>
- <https://www.datacenterdynamics.com/en/news/german-court-convicts-eight-over-illegal-bulletproof-data-center-in-former-nato-bunker/>
- <https://www.euronews.com/2021/12/13/german-court-convicts-eight-for-operating-illegal-data-centre-in-ex-military-bunker>
- <https://home.treasury.gov/news/press-releases/sb0018>
- <https://home.treasury.gov/news/press-releases/sb0185>
- <https://www.theregister.com/2025/07/02/aeza_group_us_sanctions/>
- <https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-093a>
- <https://techcrunch.com/2018/05/02/signal-could-get-kicked-out-of-amazon-web-services>
- <https://www.sentinelone.com/blog/privacy-2019-tor-meek-rise-fall-domain-fronting/>
- <https://attack.mitre.org/techniques/T1102/>
- <https://cloud.google.com/blog/topics/threat-intelligence/apt41-innovative-tactics>
- <https://thehackernews.com/2025/05/chinese-apt41-exploits-google-calendar.html>
- <https://www.proofpoint.com/us/blog/threat-insight/threat-actor-abuses-cloudflare-tunnels-deliver-rats>
- <https://www.icann.org/resources/pages/gtld-registration-data-specs-en>
- <https://www.icann.org/en/contracted-parties/registry-operators/faq-for-implementing-the-temporary-specification-for-gtld-registration-data-22-06-2018-en>
