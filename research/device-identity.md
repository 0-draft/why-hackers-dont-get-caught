# Device / Identity / Behavior layers: how anonymity is built and how it breaks

Scope: device, OS and browser layer; identity (persona) layer; behavior (OPSEC) layer. This covers how the mechanisms work, not how to set them up. Each factual claim has an inline source. **UNVERIFIED** marks claims that were not confirmed against a primary source.

Research date: 2026-11-05.

---

## 1. Amnesic and compartmentalized operating systems

### Tails: amnesia

- Tails "always starts from the same clean state and everything you do disappears automatically when you shut down". It does not write to the hard disk, and its memory is wiped at shutdown. The official comparison is a tent: it starts empty and leaves no trace. (<https://tails.net/about/index.en.html>)
- "Everything you do on the Internet from Tails goes through the Tor network." (<https://tails.net/about/index.en.html>)
- Persistent Storage is optional, encrypted, and the user chooses what goes in it. (<https://tails.net/about/index.en.html>) Wikipedia notes that this volume can be detected by forensics but not read, and that Tails overwrites most of the used RAM at shutdown to defend against cold-boot attacks. (<https://en.wikipedia.org/wiki/Tails_(operating_system)>)
- **Threat model it addresses:** what is left on the device after use (forensic traces). It does not defend against an exploit that runs inside the live session (see section 4).

### Whonix: a Gateway/Workstation split

- Two VMs: **Whonix-Gateway** runs Tor, and **Whonix-Workstation** runs the applications. The Workstation's only network path goes to the Gateway. "Traffic from Whonix-Workstation can either reach Tor which is running on Whonix-Gateway or no destination at all." (<https://www.whonix.org/wiki/Dev/Technical_Introduction>)
- **Why this stops IP leaks from malware:** the Workstation never has the real public IP in its own configuration. Even malware with root inside the Workstation cannot read the IP, because the Workstation simply doesn't know it. Whonix states that "malware with root privileges cannot discover the user's real IP address" and that IP/DNS/UDP/ICMP leaks are impossible. (<https://www.whonix.org/wiki/About>) The condition is that the Gateway is left unchanged. (<https://www.whonix.org/wiki/Dev/Technical_Introduction>)
- An application that misbehaves can still cause *identity correlation* through shared Tor circuits, but not a real-IP leak. Whonix calls this a "stream isolation violation" rather than a clearnet leak. (<https://www.whonix.org/wiki/Stream_Isolation>)
- Remaining weak points: compromising the Gateway itself, a VM escape, or a compromised host OS. These are noted by third-party reviews (<https://secure-os.org/articles/whonix/>), not quoted from Whonix's own docs.

### Qubes OS: security by compartmentalization

- "Security by compartmentalization": activities are split across separate *qubes*, which are currently Xen domains. (<https://doc.qubes-os.org/en/latest/user/reference/glossary.html>)
- Design goal: strong isolation between domains, so that compromising one leaves the others safe. Qubes explicitly does **not** isolate applications that share the same domain. (<https://doc.qubes-os.org/en/latest/developer/system/security-design-goals.html>)
- Networking and storage are also sandboxed in their own VMs. (<https://doc.qubes-os.org/en/latest/developer/system/architecture.html>)
- **Disposable qubes** are stateless and get names like `dispXYZ`. They are created from a disposable template and destroyed when shut down. (<https://doc.qubes-os.org/en/latest/user/reference/glossary.html>)
- Qubes can run Whonix inside it (Qubes-Whonix). Combining the two gives compartmentalization plus Tor isolation. (**UNVERIFIED** here; it is well known but was not fetched for this file.)

---

## 2. Leaks at the device and OS layer

| Leak | Mechanism | Source |
|---|---|---|
| **WebRTC** | STUN checks can bypass a proxy and "reveal the public IP address of the client". RFC 8828 defines 4 IP-handling modes; Mode 4 forces traffic through the proxy. Browsers now hide private IPs behind mDNS `.local` names, but in the default mode the public IP can still be reflected via STUN. | <https://www.rfc-editor.org/rfc/rfc8828.html>, <https://blog.crawlex.net/blog/webrtc-ip-leakage/> |
| **IPv6** | The VPN/proxy covers IPv4, but an IPv6 address from the ISP is still exposed (for example, as a WebRTC candidate). | <https://blog.crawlex.net/blog/webrtc-ip-leakage/> (secondary) |
| **DNS** | Name resolution goes outside the tunnel, so the resolver and ISP see what is being looked up. Whonix designs this out at the Gateway. | <https://www.whonix.org/wiki/About> |
| **MAC address** | Randomization exists, but a 2017 PoPETs study found implementations "neither universally implemented nor effective". It showed the real MAC can be recovered (UUID-E reversal, RTS control-frame attack). | <https://arxiv.org/pdf/1703.02874> |
| **Hostname / MAC to malware** | The FBI's 2013 Freedom Hosting payload sent the victim's MAC address and Windows hostname. The Playpen NIT collected hostname, OS, IP and MAC. | <https://en.wikipedia.org/wiki/Freedom_Hosting>, <https://www.law.georgetown.edu/georgetown-law-journal/submit/glj-online/109-online/the-fourth-amendment-and-the-dark-web-how-to-embrace-a-digital-jurisprudence-that-protects-individual-liberties/> |
| **Document metadata (Office)** | BTK case, 2005: a deleted Word file on a floppy disk Rader mailed contained "Christ Lutheran Church" and the user name "Dennis". He was arrested about nine days later. | <https://www.nbcnews.com/news/amp/wbna6988048>, <https://en.wikipedia.org/wiki/Guidance_Software> |
| **EXIF (GPS)** | 2012, "w0rmer" (Higinio Ochoa): the FBI affidavit says the EXIF data showed an iPhone 4, and the GPS pointed to a Melbourne suburb. That led to his girlfriend, and then to Ochoa. | <https://www.esecurityplanet.com/threats/fbi-used-metadata-to-catch-cabincr3w-hacker/>, <https://en.wikipedia.org/wiki/Higinio_Ochoa> |
| **EXIF (journalism)** | 2012, a photo of John McAfee published by Vice: geotag pointed to Guatemala. McAfee claimed he had faked it. The causal link to his arrest is not confirmed. | <https://thenextweb.com/news/vice-leaves-metadata-in-photo-of-john-mcafee-pinpointing-him-to-a-location-in-guatemala> |
| **PDB path in a binary** | Stuxnet contained `b:\myrtus\src\objfre_w2k_x86\i386\guava.pdb`, a build path that sparked speculation about the authors. | <https://web-assets.esetstatic.com/wls/en/papers/white-papers/Stuxnet_Under_the_Microscope.pdf> |
| **PDB / build strings** | APT1 PDB strings such as "work code mywork" were read as a sign that the malware was someone's job. | <https://nsarchive.gwu.edu/media/21484/ocr> |
| **Build language** | Over half of APT28 samples had Russian language settings, consistently over 6 years. | <https://thehackernews.com/2014/10/APT28-Russian-hacker-cyber-espionage.html>, <https://www.pcworld.com/article/436073/clues-point-to-russia-in-longrunning-spying-campaign.html> |
| **Language/keyboard checks in malware** | DarkSide and REvil skip systems whose language settings are from CIS countries. That check itself hints at where the authors are based. | <https://en.wikipedia.org/wiki/DarkSide_(hacker_group>), <https://krebsonsecurity.com/2021/05/try-this-one-weird-trick-russian-hackers-hate/> |
| **Fake artifacts (false flags)** | Olympic Destroyer copied the Rich header from Lazarus/Bluenoroff samples. Kaspersky showed the header claimed VS6.0, but the binary was actually built with VS10, so it was forged. | <https://securelist.com/the-devils-in-the-rich-header/84348/> |

OS telemetry: the general point is that background traffic outside the tunnel is a leak, and Whonix blocks all non-Tor traffic. Specific vendor telemetry behavior was not researched (**UNVERIFIED**).

Time zone, locale and keyboard: these are inputs to fingerprinting (section 3) and to attribution (section 6). Tor Browser restricts requested languages to a small fixed set. (<https://support.torproject.org/tor-browser/features/fingerprinting-protections/>)

---

## 3. Browser fingerprinting

### Uniqueness data (sorted by date)

| Study | Sample | Unique | Notes |
|---|---|---|---|
| Eckersley / EFF Panopticlick (PETS 2010) | 470,161 | **83.6%** (94.2% with Flash/Java) | at least 18.1 bits of entropy, i.e. roughly 1 in 286,777 share a fingerprint. Plugins 15.4 bits, fonts 13.9 bits. <https://coveryourtracks.eff.org/static/browser-uniqueness.pdf> |
| Laperdrix et al., AmIUnique (IEEE S&P 2016) | 118,934 (JS enabled) | **89.4%** | 17 attributes. Drops to 29% without JS. Desktop 90%, mobile 81%. <http://diversify-project.eu/papers/laperdrix16.pdf> |
| Gómez-Boix et al., "Hiding in the Crowd" (WWW 2018) | 2,067,942 | **33.6%** | Desktop 35.7%, mobile 18.5%. Collected from ordinary visitors to a major French site, so less biased than test-site studies. <https://dl.acm.org/doi/fullHtml/10.1145/3178876.3186097> |

Takeaway: the 83-89% figures come from self-selected test-site visitors, which inflates uniqueness. Among ordinary users the rate is about one third. That is still enough to link sessions. (Same sources.)

EFF relaunched Panopticlick as **Cover Your Tracks** in 2020. (<https://coveryourtracks.eff.org/static/browser-uniqueness.pdf>, per its hosting; date per search summary)

### Attributes

Canvas, WebGL (GPU vendor/renderer), fonts, audio (Web Audio), screen/window size, language, and time zone. Tor Browser blocks canvas extraction, limits fonts, and standardizes window size and language. (<https://support.torproject.org/tor-browser/features/fingerprinting-protections/>) Brave lists WebGL/WebGPU vendor and renderer information as fingerprinting surface. (<https://brave.com/privacy-updates/38-webgl-webgpu-fingerprinting-protections/>)

### Two defense strategies

- **Uniformity (Tor Browser):** make everyone look the same. Letterboxing (since Tor Browser 9.0) rounds the window to multiples of 200x100 px. (<https://blog.torproject.org/new-release-tor-browser-90/>, <https://support.torproject.org/tor-browser/features/fingerprinting-protections/>) Tor itself admits that making every user identical is "practically impossible" and that the goal is to reduce the number of distinguishable "buckets". (same support page) The survey adds that the Tor Browser fingerprint itself is recognizable, and that differences between operating systems can still be detected. (<https://arxiv.org/pdf/1905.01051>)
- **Randomization (Brave "farbling"):** add imperceptible noise to canvas, audio, WebGL and similar values, so that visits can't be linked across sites and sessions. The values stay stable within one session on one site. (<https://brave.com/privacy-updates/3-fingerprint-randomization/>, <https://brave.com/privacy-updates/4-fingerprinting-defenses-2.0/>) In Brave 1.93 the WebGL vendor/renderer strings were made identical for all users, which is uniformity, and the extension list was randomized. (<https://brave.com/privacy-updates/38-webgl-webgpu-fingerprinting-protections/>)
- **Trade-off:** randomization defeats commercial tracking but provides no anonymity set. Brave itself recommends Tor Browser against targeted attacks. (<https://anoni.net/docs/en/blog/2026/08/brave-gpu-fingerprinting/> (secondary))

---

## 4. Exploits that bypass anonymity tools

Common pattern: **Tor's encryption is never broken.** Code runs on the endpoint and sends the real IP *outside* Tor, bypassing it.

### Freedom Hosting (2013)

- After seizing the servers in late July 2013, the FBI kept them running for about a week and injected JavaScript into the hosted sites. It exploited a Firefox 17 bug present in Tor Browser and sent the visitor's MAC address and Windows hostname to a server in Virginia. The FBI admitted this in a court filing on 2013-09-12. (<https://en.wikipedia.org/wiki/Freedom_Hosting>, <https://www.helpnetsecurity.com/2013/09/16/fbi-confirms-they-were-behind-freedom-hostings-takeover/>)
- Operator Eric Eoin Marques was arrested in Ireland on 2013-08-01 and sentenced to 27 years in 2021. (<https://www.malwarebytes.com/blog/news/2021/09/freedom-hosting-operator-gets-27-years-for-hosting-dark-web-child-abuse-sites>, <https://therecord.media/freedom-hosting-admin-gets-27-years-in-prison-for-hosting-child-pornography>)
- The payload name ("Magneto") and the CVE number (CVE-2013-1690) are **UNVERIFIED** (not confirmed in this research session).

### Playpen / Operation Pacifier (2015)

- After seizing the site, the FBI ran it from a government facility for about two weeks (2015-02-20 to 03-04). The NIT warrant was issued on 2015-02-20. (<https://www.ca1.uscourts.gov/sites/ca1/files/opnfiles/16-1567P-01A.pdf>, <https://en.wikipedia.org/wiki/Playpen_(website>))
- The NIT collected hostname, OS, IP and MAC. (<https://www.law.georgetown.edu/georgetown-law-journal/submit/glj-online/109-online/the-fourth-amendment-and-the-dark-web-how-to-embrace-a-digital-jurisprudence-that-protects-individual-liberties/>)
- Scale: according to court transcripts, **more than 8,000 computers in 120 countries** were hacked under a single warrant. (<https://www.vice.com/en/article/doj-fbi-child-pornography-sting-playpen-court-transcripts/>) Other sources give figures ranging from "over 9,000 IPs" to "1,000+ in the US". (<https://www.eff.org/deeplinks/2016/09/playpen-story-fbis-unprecedented-and-illegal-hacking-operation>)

### Buster Hernandez / Tails (reported 2020)

- Vice/Motherboard (June 2020): Facebook paid a security firm six figures to develop a 0-day in the Tails video player. Playing a crafted video revealed the viewer's real IP. With a warrant, the FBI had a victim send the video to Hernandez ("Brian Kil"). (<https://www.vice.com/en/article/facebook-helped-fbi-hack-child-predator-buster-hernandez/>)
- The FBI's earlier tool had failed because it wasn't built for Tails. The Tails project was never notified, and the bug was removed in a later release for unrelated reasons. (same, <https://news.sophos.com/en-us/2020/06/12/facebook-paid-for-a-0-day-to-help-fbi-unmask-child-predator/>)
- The player is reported as GNOME Videos. (<https://en.wikipedia.org/wiki/Buster_Hernandez>) Hernandez was sentenced to 75 years. (<https://en.wikipedia.org/wiki/Buster_Hernandez>)
- Lesson: Tails' amnesia protects against forensics *after* a session, not against exploitation *during* it. Without the Whonix-style rule that the system cannot know its own IP, an endpoint exploit can send traffic around Tor. (Inference from the sources above plus <https://www.whonix.org/wiki/About>)

---

## 5. The identity (persona) layer

### Reusing handles and email addresses

- **Ross Ulbricht (Silk Road):** an early promotional post was made in 2011 by "altoid", and a later "altoid" post on Bitcoin Talk asked people to contact `rossulbricht@gmail.com`. VPN records also linked him to a San Francisco internet café where he used Gmail. (<https://www.cnn.com/2013/10/04/world/americas/silk-road-ross-ulbricht>)
- **Alexandre Cazes (AlphaBay):** the forfeiture complaint says the header of the AlphaBay forum's welcome email (December 2014) contained `Pimp_Alex_91@hotmail.com`. The same address led to old forum posts under "Alpha02". (<https://www.vice.com/en/article/alleged-dark-web-kingpin-doxed-himself-with-his-personal-hotmail-address/>, <https://www.thedailybeast.com/the-mistake-that-brought-down-alphabay-the-dark-webs-biggest-market/>)
- **DPRK IT workers:** the FBI notes that the same phone numbers and email addresses were reused on applications meant to be from different people. (<https://www.ic3.gov/PSA/2025/PSA250123>)

### Phone, SMS and SIM registration

- GSMA: **157 countries** require prepaid SIM registration (2021 report), and 93% of prepaid SIMs are in countries that require proof of identity. GSMA's position is that governments should not mandate it, and it notes there is no empirical evidence it reduces crime. (<https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/access-to-mobile-services-and-proof-of-identity-2021/>, <https://www.gsma.com/solutions-and-impact/connectivity-for-good/public-policy/mobile-policy-handbook/consumer-protection/mandatory-registration-of-prepaid-sims/>)
- This makes SMS verification an identity anchor: in those countries the phone number is tied to an ID document. (Inference)

### Breach dumps and password reuse

- How investigators and researchers link the same email, password hash or IP across leaked forum databases: no specific primary source was obtained in this research. **UNVERIFIED** (likely fill-ins: KrebsOnSecurity's forum-database analyses, or Intel 471 / Flashpoint reports).

### Stylometry (writing-style attribution)

- **Narayanan et al., IEEE S&P 2012:** 100,000 blogs, 2.4 million posts. Ranked the correct author first among 100,000 candidates in **about 20%** of cases, and in the top 20 in **about 35%**. (<https://people.eecs.berkeley.edu/~dawnsong/papers/2012%20On%20the%20Feasibility%20of%20Internet-Scale%20Author%20Identification.pdf>, <https://ieeexplore.ieee.org/abstract/document/6234420>)
- **Brennan, Afroz, Greenstadt 2012 (ACM TISSEC):** when people deliberately disguise or imitate a writing style, existing classifiers are badly degraded. (<https://nyuscholars.nyu.edu/en/publications/adversarial-stylometry-circumventing-authorship-recognition-to-pr>)
- **Anonymouth (McDonald et al., PETS 2012):** analyzes a text and suggests changes so it gets closer to the general population's style. It is now unmaintained. (<https://psal.cs.drexel.edu/index.php/JStylo-Anonymouth>, <https://arxiv.org/html/2208.07395v2>)
- **Writeprints:** a feature set (Abbasi & Chen, ACM TOIS 2008), also implemented in JStylo. (<https://arxiv.org/html/2208.07395v2>) Bibliographic details of the original paper are **UNVERIFIED**.

### Avatars, images and crypto addresses

- Reusing an avatar or image so that reverse image search links personas, and reusing a crypto address so that transactions can be clustered: both are general principles with no primary source collected here. **UNVERIFIED**.

---

## 6. Behavior: pattern of life

- **APT1 (Mandiant 2013 plus the 2014 follow-up):** of 1,905 RDP logins, 98.2% came from Shanghai IPs, 97.5% were on weekdays (China Standard Time), and 98.8% were between 07:00 and 24:00 CST. The DOJ exhibit shows peaks around 08:00 and 14:00-18:00 with a lunch break. FireEye concluded APT1 is either in China working business hours "or ... intentionally going to painstaking lengths to look like they are." (<https://securityaffairs.com/25191/cyber-crime/fireeye-mandiant-apt1.html>, <https://www.infosecurity-magazine.com/news/fireeye-backs-washington-with-new-apt1-data/>) More than 97% used Simplified Chinese systems. (<https://nsarchive.gwu.edu/media/21484/ocr>)
- **APT28 (FireEye 2014):** 96% of compile times fell on weekdays, and 89% between 08:00 and 18:00 UTC+4 (Moscow at the time). (<https://threatpost.com/russian-apt28-group-linked-to-nato-political-attacks/109049/>)
- **APT41 (Mandiant):** compile times suggest working hours of 10:00-23:00 UTC+8. (<https://services.google.com/fh/files/misc/apt41-a-dual-espionage-and-cyber-crime-operation.pdf>)
- **Conti leaks (2022):** the chats state rules of 10:00-18:00 Moscow time, five days a week. (<https://www.trellix.com/blogs/research/conti-leaks-examining-the-panama-papers-of-ransomware/>) Measured activity disagrees: ReliaQuest saw no weekend activity (<https://reliaquest.com/blog/five-things-we-learned-from-the-conti-chat-logs/>), while Group-IB measured 14 hours a day with only the New Year holidays off (<https://www.group-ib.com/media-center/press-releases/conti-armada-report/>). Krebs reports 24/7 operations depending on the role. (<https://krebsonsecurity.com/2022/03/conti-ransomware-group-diaries-part-ii-the-office/>)
- **Russian holidays:** Proofpoint observed a major Dridex distributor fully inactive from 12-24 to 01-10 (2015-16), which it attributed to the Orthodox calendar. (<https://www.proofpoint.com/us/threat-insight/post/An-Orthodox-Holiday-For-Some-Unorthodox-Actors>) Zscaler reports a lull every year around January 7, with 2021 as an exception. (<https://www.zscaler.com/blogs/security-research/did-covid-cancel-christmas-cybercriminals>) Counter-evidence: leak-site claims hit a record high in December 2025. (<https://www.halcyon.ai/blog/ransomware-attacks-reach-peak-levels-during-december-2025-holiday-period>)
- **A single slip:** Sabu (Hector Monsegur) is widely reported to have been identified after logging into IRC without Tor. (<https://www.theregister.com/2012/03/07/lulzsec_takedown_analysis/>) Monsegur disputes this and says he was exposed by an old dox. (same, editor's note) Treat it as **disputed**.
- **Caveat: false flags.** Timestamps, language settings and Rich headers can all be faked (Olympic Destroyer, section 2). Analysts treat them as one input among several, not as proof. (<https://securelist.com/the-devils-in-the-rich-header/84348/>)

---

## 7. Insiders and human factors

- **DarkMarket (2006-2008):** FBI agent J. Keith Mularski became an administrator under the handle "Master Splyntr" and moved the site onto FBI servers. The result was 56 arrests (later reports say 60+) and $70M in losses prevented. (<https://archives.fbi.gov/archives/news/stories/2008/october/darkmarket_102008>, <https://en.wikipedia.org/wiki/DarkMarket>) Note: "Carders Market" was a separate forum run by Max Butler (Iceman). The FBI-run site was DarkMarket. (Butler's link to DarkMarket: <https://en.wikipedia.org/wiki/DarkMarket>)
- **Informants:** after his arrest on 2011-06-07, Sabu cooperated the next day and kept running his persona under FBI direction for about 10 months, helping identify LulzSec members. (<https://en.wikipedia.org/wiki/Hector_Monsegur>, <https://www.darkreading.com/vulnerabilities-threats/hacker-sabu-worked-nonstop-as-government-informer>)
- **Hansa (Operation Bayonet, 2017):** on 2017-06-20 the administrators were arrested in Germany and Dutch police took over the site, running it covertly until 07-20. When AlphaBay was taken down on 07-04, displaced users flooded into Hansa. About 10,000 buyer addresses were passed to Europol. (<https://en.wikipedia.org/wiki/Hansa_(market)>, <https://krebsonsecurity.com/2017/07/exclusive-dutch-cops-on-alphabay-refugees/>)
- **ANOM (Operation Trojan Shield, 2021):** the FBI distributed encrypted phones to more than 300 criminal groups in over 100 countries, and they were read for 18 months. Results announced 2021-06-08: 800+ arrests, 32 tons of drugs, $148M seized. (<https://www.globalsecurity.org/security/library/news/2021/06/sec-210608-voa02.htm>)
- **Seized servers keep running:** Freedom Hosting, Playpen, Hansa and DarkMarket all follow the same pattern: seize, keep operating, collect data. (Synthesis of the sources above)

---

## 8. Remote-work fraud: DPRK IT workers and laptop farms

- **Mechanism:** company laptops are shipped to a US home (the laptop farm). A US-based facilitator connects them, and the overseas worker operates them through **remote desktop software**, so the company sees a US IP and a US address. Knoot (Nashville) let a worker in China operate as "Andrew M." in this way. (<https://www.justice.gov/opa/pr/two-us-nationals-sentenced-facilitating-fraudulent-remote-information-technology-worker-0>)
- **Identities:** Chapman's scheme used 68 stolen US identities to place workers at 309 US companies, generating at least $17.1M. At least 90 laptops passed through her home and about 49 were shipped overseas, including to near the China-DPRK border. She was sentenced to 102 months on 2025-07-24. (<https://www.justice.gov/usao-dc/pr/arizona-woman-sentenced-17m-it-worker-fraud-scheme-illegally-generated-revenue-north>)
- **Other techniques:** public VPNs and remote-management tools, AI and face-swapping in video interviews, reused phone numbers and emails, and stealing code for extortion. (<https://www.ic3.gov/PSA/2025/PSA250123>)
- **Scale of enforcement:** on 2025-06-30, DOJ announced searches of 29 laptop farms in 16 states, seizure of about 200 computers, 29 financial accounts and 21 websites, with workers placed at more than 100 companies. This is the DPRK RevGen: Domestic Enabler Initiative. (<https://www.securityweek.com/us-storms-29-laptop-farms-in-crackdown-on-north-korean-it-worker-schemes/> (secondary; the DOJ release itself was not fetched)) Knoot and Prince were each sentenced to 18 months in 2026, described as the 7th and 8th laptop-farmer sentences. (<https://www.justice.gov/opa/pr/two-us-nationals-sentenced-facilitating-fraudulent-remote-information-technology-worker-0>) October 2026: more than 40 suspected farms were searched in Texas and about 187 laptops and KVM devices seized. (<https://www.nextgov.com/cybersecurity/2026/10/fbi-disrupts-north-korean-laptop-farm-used-infiltrate-us-companies/416570/> (secondary))
- **How they get caught:** the physical laptop farm is a single point of failure. Raiding the facilitator links many fake identities at once. Payroll deposits, shipping addresses and reused contact details also connect the personas. (Synthesis of the DOJ and IC3 sources above. Specific KVM-hardware detection methods are **UNVERIFIED**.)

---

## Diagram ideas

1. **Whonix two-box diagram:** Workstation (apps and malware) connects to Gateway (Tor) only through an internal network, then to the Internet. Malware inside the Workstation asks "what is my IP?" and only gets 10.152.152.x. Contrast it with a single-box setup where the exploit sends traffic directly to the Internet and bypasses Tor.
2. **Tails "tent" timeline:** boot (empty), session (RAM only), shutdown (wiped). Add a second line, "exploit during session", to show that amnesia doesn't help in that case.
3. **Qubes color-coded windows:** work, personal, untrusted, and disposable qubes, each with its own border color, sitting on Xen, plus separate sys-net and sys-firewall VMs.
4. **Fingerprint entropy bar chart:** Panopticlick 83.6%, AmIUnique 89.4%, Hiding in the Crowd 33.6%, with a note that the difference comes from sampling bias.
5. **Uniformity vs randomization:** Tor shows everyone wearing the same mask. Brave shows each person wearing a different mask every time.
6. **The endpoint-exploit pattern:** a Tor circuit (encrypted, intact), with an arrow from the endpoint going outside the tunnel straight to an FBI server. Timeline: 2013 FH, 2015 Playpen, 2017-2020 Hernandez.
7. **Persona link graph:** handle, then email, then real name (Ulbricht, Cazes). Draw the edges as "reused".
8. **Activity heatmap:** 7 days x 24 hours, in the shape of the APT1 data (weekday 8-18 peaks, a lunch dip), with a time-zone slider to shift UTC.
9. **Laptop farm map:** US home (rows of laptops) connected by remote desktop to an overseas worker, with the company seeing only a "US employee".
10. **Seize and keep running:** a seized server keeps operating as a trap. Show DarkMarket, Hansa and ANOM on one timeline.

## Common misconceptions

- **"Using Tor makes me anonymous":** the exploit cases in section 4 never broke Tor's encryption. They bypassed it at the endpoint. Persona and behavior leaks are also out of Tor's scope.
- **"Tails is unbreakable":** amnesia protects against forensics after the fact. It does not protect against exploits during a session (Hernandez).
- **"A VPN is enough":** WebRTC/STUN, IPv6 and DNS can go outside the tunnel (RFC 8828). Ulbricht also used a VPN, and the provider's logs still connected him.
- **"Randomizing your fingerprint is the strongest option":** randomization doesn't create an anonymity set. Against targeted attacks, uniformity (Tor) is recommended, and Brave says so itself.
- **"Fingerprints are 90% unique":** that figure is from self-selected test-site visitors. On an ordinary large site it was about 34%.
- **"Timestamps and language settings prove attribution":** they can be forged (Olympic Destroyer). FireEye's APT1 conclusion was carefully hedged.
- **"MAC randomization makes devices untrackable":** as of 2017, implementations were inconsistent and the real MAC could still be recovered.
- **"Sabu was caught because he forgot Tor once":** widely reported, but he disputes it. Teach it as disputed.
- **"Carders Market was an FBI sting":** that was DarkMarket. CardersMarket was run by Max Butler.

## Sources

- <https://tails.net/about/index.en.html>
- <https://en.wikipedia.org/wiki/Tails_(operating_system>)
- <https://www.whonix.org/wiki/Dev/Technical_Introduction>
- <https://www.whonix.org/wiki/About>
- <https://www.whonix.org/wiki/Stream_Isolation>
- <https://doc.qubes-os.org/en/latest/user/reference/glossary.html>
- <https://doc.qubes-os.org/en/latest/developer/system/security-design-goals.html>
- <https://doc.qubes-os.org/en/latest/developer/system/architecture.html>
- <https://www.rfc-editor.org/rfc/rfc8828.html>
- <https://blog.crawlex.net/blog/webrtc-ip-leakage/>
- <https://arxiv.org/pdf/1703.02874>
- <https://coveryourtracks.eff.org/static/browser-uniqueness.pdf>
- <http://diversify-project.eu/papers/laperdrix16.pdf>
- <https://dl.acm.org/doi/fullHtml/10.1145/3178876.3186097>
- <https://arxiv.org/pdf/1905.01051>
- <https://support.torproject.org/tor-browser/features/fingerprinting-protections/>
- <https://blog.torproject.org/new-release-tor-browser-90/>
- <https://brave.com/privacy-updates/3-fingerprint-randomization/>
- <https://brave.com/privacy-updates/4-fingerprinting-defenses-2.0/>
- <https://brave.com/privacy-updates/38-webgl-webgpu-fingerprinting-protections/>
- <https://en.wikipedia.org/wiki/Freedom_Hosting>
- <https://www.helpnetsecurity.com/2013/09/16/fbi-confirms-they-were-behind-freedom-hostings-takeover/>
- <https://www.malwarebytes.com/blog/news/2021/09/freedom-hosting-operator-gets-27-years-for-hosting-dark-web-child-abuse-sites>
- <https://www.ca1.uscourts.gov/sites/ca1/files/opnfiles/16-1567P-01A.pdf>
- <https://www.vice.com/en/article/doj-fbi-child-pornography-sting-playpen-court-transcripts/>
- <https://www.eff.org/deeplinks/2016/09/playpen-story-fbis-unprecedented-and-illegal-hacking-operation>
- <https://www.vice.com/en/article/facebook-helped-fbi-hack-child-predator-buster-hernandez/>
- <https://news.sophos.com/en-us/2020/06/12/facebook-paid-for-a-0-day-to-help-fbi-unmask-child-predator/>
- <https://www.cnn.com/2013/10/04/world/americas/silk-road-ross-ulbricht>
- <https://www.vice.com/en/article/alleged-dark-web-kingpin-doxed-himself-with-his-personal-hotmail-address/>
- <https://people.eecs.berkeley.edu/~dawnsong/papers/2012%20On%20the%20Feasibility%20of%20Internet-Scale%20Author%20Identification.pdf>
- <https://psal.cs.drexel.edu/index.php/JStylo-Anonymouth>
- <https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/access-to-mobile-services-and-proof-of-identity-2021/>
- <https://securityaffairs.com/25191/cyber-crime/fireeye-mandiant-apt1.html>
- <https://nsarchive.gwu.edu/media/21484/ocr>
- <https://threatpost.com/russian-apt28-group-linked-to-nato-political-attacks/109049/>
- <https://www.trellix.com/blogs/research/conti-leaks-examining-the-panama-papers-of-ransomware/>
- <https://www.group-ib.com/media-center/press-releases/conti-armada-report/>
- <https://www.proofpoint.com/us/threat-insight/post/An-Orthodox-Holiday-For-Some-Unorthodox-Actors>
- <https://securelist.com/the-devils-in-the-rich-header/84348/>
- <https://krebsonsecurity.com/2021/05/try-this-one-weird-trick-russian-hackers-hate/>
- <https://www.nbcnews.com/news/amp/wbna6988048>
- <https://www.esecurityplanet.com/threats/fbi-used-metadata-to-catch-cabincr3w-hacker/>
- <https://www.theregister.com/2012/03/07/lulzsec_takedown_analysis/>
- <https://archives.fbi.gov/archives/news/stories/2008/october/darkmarket_102008>
- <https://en.wikipedia.org/wiki/Hansa_(market>)
- <https://www.globalsecurity.org/security/library/news/2021/06/sec-210608-voa02.htm>
- <https://www.justice.gov/usao-dc/pr/arizona-woman-sentenced-17m-it-worker-fraud-scheme-illegally-generated-revenue-north>
- <https://www.justice.gov/opa/pr/two-us-nationals-sentenced-facilitating-fraudulent-remote-information-technology-worker-0>
- <https://www.ic3.gov/PSA/2025/PSA250123>
- <https://www.securityweek.com/us-storms-29-laptop-farms-in-crackdown-on-north-korean-it-worker-schemes/>
