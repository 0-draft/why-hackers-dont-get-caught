# Out of reach: why most cyber culprits are never caught

Research notes for the "weakest layer" page answering *"Why don't the culprits get caught?"*
Compiled 2026-11-06. Each claim carries an inline source. **UNVERIFIED** marks anything I could not confirm against a primary or reputable source.

## Bottom line (thesis check)

The thesis holds, with two corrections.

1. **Holds.** For state-backed operators, the usual blocker is not anonymity. The US has named, photographed and indicted dozens of serving GRU, PLA, MSS, RGB and IRGC personnel. As far as I could find, not one of the officers named in the indictments below has been arrested. Their home states refuse to extradite their own citizens: [Russian Constitution Art. 61](http://www.constitution.ru/en/10003000-03.htm) and [PRC Extradition Law Art. 8(1)](http://english1.english.gov.cn/laws/2005-09/22/content_68710.htm).
2. **Holds.** The arrests that do happen fit three patterns: (a) the suspect **travels** to a country that cooperates with the US (Seleznev, Vinnik, Nikulin, Klyushin, Vasinskyi, the 8Base four, Panev); (b) a **state cooperates**, as India has with FBI call-centre operations; (c) **one layer fails**, usually money flows or seized infrastructure, as in LockBit/Cronos.
3. **Correction 1: "never caught" is not "never punished".** Russia did prosecute REvil members at home in 2024 ([The Hacker News](https://thehackernews.com/2024/10/four-revil-ransomware-members-sentenced.html)). It also charged Matveev ("Wazawaka") domestically in 2024 ([Infosecurity](https://www.infosecurity-magazine.com/news/russia-arrests-ransomware-wazawaka/)). So the protection is conditional, not absolute.
4. **Correction 2: an arrest is not always the end.** Seleznev and Klyushin, both convicted in the US, were sent home in the 1 Aug 2024 prisoner swap ([The Record](https://therecord.media/us-reportedly-preparing-to-release-russian-hackers-prisoner-swap)). Vinnik was sent home in Feb 2025 ([Moscow Times](https://www.themoscowtimes.com/2025/02/12/washington-to-release-russian-crypto-kingpin-alexander-vinnik-in-exchange-for-marc-fogel-us-official-says-a87975)). Under this model, a captured hacker can become a bargaining chip.
5. **Base rate.** The only US-wide estimate whose provenance I could trace is Third Way's 2018 figure. It counts about 0.3% of incidents reported to the FBI's IC3 that lead to an arrest, and gives an "effective" ~0.05% after assuming only 1 in 6 victims report ([Third Way](https://www.thirdway.org/report/to-catch-a-hacker-toward-a-comprehensive-strategy-to-identify-pursue-and-punish-malicious-cyber-actors)). The WEF repeated it. It is a rough ratio of national arrest counts to complaint counts. It is not a measured catch rate.

## 1. The gap between attribution and arrest

| Case | Announced | Named | Affiliation | Anyone arrested? |
|---|---|---|---|---|
| PLA Unit 61398 economic espionage | 19 May 2014 | 5 officers (Wang Dong, Sun Kailiang, Wen Xinyu, Huang Zhenyu, Gu Chunhui) | PLA 3PLA Unit 61398 | No arrests found. DOJ called it "the first ever charges against a state actor for this type of hacking" ([DOJ WDPA](https://www.justice.gov/usao-wdpa/pr/us-charges-five-chinese-military-hackers-cyber-espionage-against-us-corporations-and)) |
| Iran financial-sector DDoS + Bowman Dam | 24 Mar 2016 (indictment returned 21 Jan 2016) | 7 (ITSec Team, Mersad) | Worked on behalf of the Iranian Government, including the IRGC | No arrests found. Still on the FBI wanted page ([DOJ](https://www.justice.gov/opa/pr/seven-iranians-working-islamic-revolutionary-guard-corps-affiliated-entities-charged), [SDNY](https://www.justice.gov/usao-sdny/pr/manhattan-us-attorney-announces-charges-against-seven-iranians-conducting-coordinated), [FBI wanted](https://www.fbi.gov/wanted/cyber/iranian-ddos-attacks)) |
| GRU 2016 election hack (Netyksho et al.) | 13 Jul 2018 | 12 officers | GRU Units 26165 and 74455 | No arrests found ([DOJ](https://www.justice.gov/archives/opa/pr/grand-jury-indicts-12-russian-intelligence-officers-hacking-offenses-related-2016-election)) |
| Park Jin Hyok (Sony, Bangladesh Bank, WannaCry) | Complaint filed 8 Jun 2018, unsealed 6 Sep 2018 | 1 | DPRK front company Chosun Expo / "Lazarus" | No. OFAC sanctioned him the same day ([DOJ](https://www.justice.gov/archives/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and)) |
| GRU Sandworm (NotPetya, Olympic Destroyer, Ukraine grid) | 19 Oct 2020 | 6 officers | GRU Unit 74455 | "None of the six are in U.S. custody" ([DOJ](https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and)). Kovalev was already named in 2018. |
| APT41 | 16 Sep 2020 | 5 Chinese + 2 Malaysians | One defendant boasted of MSS ties | **The 2 Malaysians were arrested in Malaysia on 14 Sep 2020. The 5 Chinese remain fugitives in China** ([DOJ](https://www.justice.gov/archives/opa/pr/seven-international-cyber-defendants-including-apt41-actors-charged-connection-computer)). The Malaysians' extradition was still in the Malaysian courts as of Jul 2024 ([FMT](https://www.freemalaysiatoday.com/category/nation/2024/07/12/home-ministry-wins-appeal-to-reinstate-provisions-under-extradition-law)). Final outcome **UNVERIFIED**. |
| DPRK RGB / Lazarus ($1.3B theft and extortion scheme) | 17 Feb 2021 | 3 (Jon Chang Hyok, Kim Il, Park Jin Hyok) | DPRK RGB | The hackers: no. **Canadian money launderer Ghaleb Alaumary agreed to plead guilty**, which shows the cash-out layer is where people get caught ([DOJ](https://www.justice.gov/archives/opa/pr/three-north-korean-military-hackers-indicted-wide-ranging-scheme-commit-cyberattacks-and)) |
| APT40 | 19 Jul 2021 | 4 (3 Hainan State Security Dept officers + 1 front-company employee) | MSS / Hainan Xiandun | No arrests found ([DOJ SDCA](https://www.justice.gov/usao-sdca/pr/four-chinese-nationals-working-ministry-state-security-charged-global-computer)) |
| IRGC hack-and-leak against the Trump campaign | 27 Sep 2024 | 3 (Masoud Jalili, Seyyed Ali Aghamiri, Yaser Balaghi) | IRGC / Basij | No. Up to $10M reward plus sanctions ([FBI copy of the DOJ release](https://fbi.gov/news/press-releases/three-irgc-cyber-actors-indicted-for-hack-and-leak-operation-designed-to-influence-the-2024-us-presidential-election), [The Record](https://therecord.media/us-charges-iranians-behind-hack)) |
| i-Soon / APT27 | 5 Mar 2025 | 12 (2 MPS officers, 8 i-Soon staff, 2 APT27) | Contractors to the MSS and MPS | "All of those charged are still at large" per reporting. Rewards: up to $10M (i-Soon/MPS) and $2M each (Yin, Zhou) ([DOJ](https://www.justice.gov/opa/pr/justice-department-charges-12-chinese-contract-hackers-and-law-enforcement-officers-global), [The Record](https://therecord.media/doj-charges-chinese-nationals-isoon-cyberattacks-treasury)) |

Total: **60 names across these ten actions, 58 unique people** (Kovalev appears in both GRU indictments; Park Jin Hyok in 2018 and 2021). Not all 58 are state officers: the list includes contractors such as ITSec, Mersad and i-Soon staff. **The only arrests I found were the two Malaysian businessmen and a Canadian launderer.** None was a state officer, and all three were outside the protecting state. "No arrests found" is my inference from the absence of any later DOJ arrest or extradition announcement. It is not a statement from DOJ, except where quoted.

A side note shows how close the two worlds sit. Klyushin's co-defendant **Ivan Ermakov** worked at M-13, Klyushin's Moscow company ([DOJ MA](https://www.justice.gov/usao-ma/pr/russian-businessman-found-guilty-90-million-hack-trade-conspiracy)). Reporting identifies him as the same Ivan Yermakov named as a GRU officer in the 2018 Netyksho indictment (**UNVERIFIED** against a primary source). Klyushin travelled and was caught. Ermakov did not travel.

## 2. Why they are out of reach

### Constitutions and extradition law

- **Russia.** Constitution Art. 61(1): "A citizen of the Russian Federation may not be deported from Russia or extradited to another State" ([constitution.ru](http://www.constitution.ru/en/10003000-03.htm); also the [Council of Europe text](https://rm.coe.int/constitution-of-the-russian-federation-en/1680a1a237)). Russia made the same reservation when it ratified the European Convention on Extradition ([ICLQ on the Lugovoy case](https://resolve.cambridge.org/core/journals/international-and-comparative-law-quarterly/article/ii-the-lugovoy-extradition-case/0411B46E8EA06E5DC39E129615F4F3A2)).
- **China.** Extradition Law (2000) Art. 8(1): a request "shall be rejected if the person sought is a national of the People's Republic of China" ([english.gov.cn](http://english1.english.gov.cn/laws/2005-09/22/content_68710.htm), [UNODC SHERLOC](https://sherloc.unodc.org/cld/uploads/res/document/chn/2000/extradition_law_of_the_peoples_republic_of_china_html/China_Extradition_Law_2000.pdf)). The refusal is mandatory.
- **North Korea and Iran.** I found no primary text for either. The practical point needs no statute: the named RGB and IRGC personnel are believed to be inside their own countries ([DOJ 2021](https://www.justice.gov/archives/opa/pr/three-north-korean-military-hackers-indicted-wide-ranging-scheme-commit-cyberattacks-and); [The Record 2024](https://therecord.media/us-charges-iranians-behind-hack)). The claim that the US has no extradition treaty with either is **UNVERIFIED** here (true to my knowledge, but no source was fetched).
- Many democracies also refuse to extradite their own nationals. Japan is a case in point, though I did not source it here (**UNVERIFIED**). The asymmetry is that Russia, China and the DPRK are also the states that, per the sources above, employ or task the hackers.

### Treaties

- **Budapest Convention (Council of Europe, ETS 185, 2001).** It opened for signature on 23 Nov 2001 and entered into force on 1 Jul 2004. Secondary reporting puts it at 84 Parties in 2026 ([CoE page via search](https://www.coe.int/en/web/cybercrime/the-budapest-convention); the official chart is [treaty chart](https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=185) but returned 403 to my fetcher). The statement that **Russia and China are not parties** is **UNVERIFIED from the primary chart**, though it is widely reported.
- **UN Convention against Cybercrime ("Hanoi Convention").**
  - **Adopted** by the General Assembly on 24 Dec 2024, resolution 79/243 ([UN News](https://news.un.org/en/story/2025/10/1166182)).
  - **Signing in Hanoi, 25–26 Oct 2025:** 71 states plus the EU signed ([UN OLA](https://www.un.org/ola/en/news/united-nations-convention-against-cybercrime-opens-signature-hanoi)). UN News's first-day count was 65.
  - **Signatories** include **Russia and China**. **The US did not sign** ([The Record](https://therecord.media/us-declines-signing-cybercrime-treaty)).
  - **Entry into force** comes 90 days after the 40th ratification ([UN OLA](https://www.un.org/ola/en/news/united-nations-convention-against-cybercrime-opens-signature-hanoi)).
  - **Status in late 2026:** reportedly 95 signatories and only 3 ratifications (Qatar, Azerbaijan, Vietnam), so it is **not in force** ([ICCLR, Jul 2026](https://icclr.org/2026/07/24/moving-forward-with-the-united-nations-convention-against-cybercrime/), [Wikipedia](https://en.wikipedia.org/wiki/United_Nations_Convention_against_Cybercrime)). I could not open the UN Treaty Collection page, so the exact current counts are **UNVERIFIED**.
  - **What it does not change:** nothing I read suggests the convention overrides constitutional bans on extraditing nationals. That point is my inference.

### States using criminals as proxies

- **Evil Corp.** In its 5 Dec 2019 action, Treasury said: "As of 2017, Yakubets was working for the Russian FSB" ([Treasury sm845](https://home.treasury.gov/news/press-releases/sm845); quoted via [GlobalSecurity mirror](https://www.globalsecurity.org/security/library/news/2019/12/sec-191205-treasury01.htm)). In Oct 2024, Treasury said his father-in-law Eduard Benderskiy, "a former Spetnaz officer of the ... FSB", was "a key enabler of Evil Corp's relationship with the Russian state" and protected the group after 2019 ([Treasury jy2623, FRASER PDF](https://fraser.stlouisfed.org/files/docs/publications/treaspr/2024/2024-10-01_jy2623.pdf)).
- **i-Soon.** DOJ says the PRC MSS and MPS paid i-Soon about $10,000–$75,000 per email inbox it compromised ([DOJ](https://www.justice.gov/opa/pr/justice-department-charges-12-chinese-contract-hackers-and-law-enforcement-officers-global)). This is hacking as an outsourced government service.
- **"Don't hit home" code.**
  - **DarkSide** checks system language and skips CIS countries. It shares the CIS-check code with REvil ([Trend Micro, May 2021](https://www.trendmicro.com/en_us/research/21/e/what-we-know-about-darkside-ransomware-and-the-us-pipeline-attac.html); [Nozomi](https://www.nozominetworks.com/blog/colonial-pipeline-ransomware-attack-revealing-how-darkside-works)).
  - Trend Micro's caveat: the group would probably know a target's location well before the malware runs. The language check is a backstop, not the main safeguard.
  - The **Conti–Russian state alignment** claim was not researched here (**UNVERIFIED**; candidate sources are the Feb 2022 Conti pro-Russia statement and the "Conti leaks").

## 3. Other tools when arrest is impossible

- **Sanctions.**
  - Evil Corp: 17 individuals and 7 entities in 2019 ([Treasury sm845](https://home.treasury.gov/news/press-releases/sm845)), then a joint US/UK/Australia action in Oct 2024 ([jy2623](https://fraser.stlouisfed.org/files/docs/publications/treaspr/2024/2024-10-01_jy2623.pdf)).
  - LockBitSupp Dmitry Khoroshev: unmasked and sanctioned on 7 May 2024 by the US, UK and Australia ([Treasury jy2326](https://home.treasury.gov/news/press-releases/jy2326)).
  - Salt Typhoon-linked Sichuan Juxinhe and Treasury-hack actor Yin Kecheng: 17 Jan 2025 ([State Dept](https://2021-2025.state.gov/office-of-the-spokesperson/releases/2025/01/u-s-takes-action-against-prc-linked-cyber-actors-for-treasury-hack-and-salt-typhoon/)).
  - Sanctions make the person toxic to pay. Victims who pay ransom to a designated person risk violating sanctions ([OFAC ransomware advisory](https://ofac.treasury.gov/system/files/126/ofac_ransomware_advisory.pdf)).
- **Bounties (State Dept TOCRP / Rewards for Justice).**
  - Conti: up to $10M for leaders and $5M for arrests (6 May 2022) ([The Record](https://therecord.media/us-state-department-offering-10-million-reward-for-information-about-conti-members)).
  - LockBit leaders: up to $10M (Feb 2024). Khoroshev: up to $10M (May 2024) ([Treasury jy2326](https://home.treasury.gov/news/press-releases/jy2326)).
  - Matveev: up to $10M (May 2023) ([Infosecurity](https://www.infosecurity-magazine.com/news/russia-arrests-ransomware-wazawaka/)).
  - Yakubets: $5M (2019) ([Treasury sm845](https://home.treasury.gov/news/press-releases/sm845)).
  - IRGC trio: up to $10M (2024).
- **Naming and shaming.** This is the real function of the state-officer indictments in §1. Holder called the 2014 PLA case a first ([DOJ](https://www.justice.gov/usao-wdpa/pr/us-charges-five-chinese-military-hackers-cyber-espionage-against-us-corporations-and)). China's response was to call the charges "absurd" and suspend a bilateral cyber working group ([CS Monitor](https://www.csmonitor.com/World/Passcode/2014/0519/US-indicts-five-in-China-s-secret-Unit-61398-for-cyber-spying-on-US-firms)).
- **Takedowns.**
  - **Qakbot** (29 Aug 2023): more than $8.6M in crypto seized; about 700,000 infected computers ([DOJ CDCA](https://justice.gov/usao-cdca/pr/qakbot-malware-disrupted-international-cyber-takedown)).
  - **Operation Cronos** (20 Feb 2024): NCA-led. It seized LockBit infrastructure and source code and led to 2 arrests in Poland and Ukraine ([Computer Weekly](https://www.computerweekly.com/news/366570573/LockBit-gang-members-arrested-in-Poland-and-Ukraine)). LockBit came back on new infrastructure shortly afterwards ([TechTarget](https://www.techtarget.com/searchsecurity/news/366570614/Operation-Cronos-dismantles-LockBit-ransomware-gang)).
  - **Operation Endgame** (27–29 May 2024): 4 arrests (3 in Ukraine, 1 in Armenia), more than 100 servers and more than 2,000 domains taken down. Germany issued 8 warrants, and those suspects went onto the EU Most Wanted list ([Europol release](https://www.europol.europa.eu/media-press/newsroom/news/largest-ever-operation-against-botnets-hits-dropper-malware-ecosystem); details via [The Record](https://therecord.media/dropper-malware-takedown-europol-operation-endgame)).
  - **Pattern:** takedowns hit the infrastructure layer and sometimes produce arrests of people outside Russia. The Russia-based core is named and placed on wanted lists.
- **Fund seizure / forfeiture.**
  - Qakbot: $8.6M.
  - Klyushin: ordered to forfeit $34,065,419 ([DOJ MA](https://www.justice.gov/usao-ma/pr/russian-businessman-sentenced-nine-years-prison-93-million-hack-trade-conspiracy)).
  - Vinnik: as part of his 2025 swap he reportedly forfeited about $100M of seized proceeds ([Moscow Times](https://www.themoscowtimes.com/2025/02/12/washington-to-release-russian-crypto-kingpin-alexander-vinnik-in-exchange-for-marc-fogel-us-official-says-a87975), media report, **not confirmed by DOJ here**).

## 4. When they do get arrested

| Person | Where / when arrested | How | Outcome |
|---|---|---|---|
| Roman Seleznev (card fraud, son of a Duma member) | Maldives, 2014 | Travel | 27 years (2017). **Released in the 1 Aug 2024 Ankara swap** ([The Record](https://therecord.media/us-reportedly-preparing-to-release-russian-hackers-prisoner-swap), [CyberScoop](https://cyberscoop.com/jailed-cybercriminals-returned-to-russia-in-historic-prisoner-swap/)) |
| Yevgeniy Nikulin (LinkedIn/Dropbox 2012) | Prague, 5 Oct 2016, on holiday | Travel. Russia filed a competing extradition request | Extradited Mar 2018; 88 months (Sep 2020) ([CyberScoop](https://cyberscoop.com/nikulin-sentence-russian-cybercrime-linkedin-hacker/)). Release/return date **UNVERIFIED** |
| Alexander Vinnik (BTC-e) | Halkidiki, Greece, Jul 2017, on holiday | Travel | Went to France, then the US (Aug 2022); pleaded guilty May 2024. **Swapped for Marc Fogel, Feb 2025** ([Moscow Times](https://www.themoscowtimes.com/2025/02/12/washington-to-release-russian-crypto-kingpin-alexander-vinnik-in-exchange-for-marc-fogel-us-official-says-a87975), [The Record](https://therecord.media/alexander-vinnik-reported-released-prisoner-swap-russia-us)) |
| Vladislav Klyushin (hack-to-trade, $93M) | Sion, Switzerland, Mar 2021, off a private jet | Travel. Switzerland rejected Russia's competing request | Extradited Dec 2021; 9 years (Sep 2023) ([DOJ MA](https://www.justice.gov/usao-ma/pr/russian-businessman-sentenced-nine-years-prison-93-million-hack-trade-conspiracy), [The Register](https://www.theregister.com/2021/12/20/russian_insider_trading/)). **Released in the Aug 2024 swap** |
| Yaroslav Vasinskyi (REvil/Kaseya, Ukrainian) | Polish border, 8 Oct 2021 | Travel | 13 years 7 months (May 2024) ([BleepingComputer](https://www.bleepingcomputer.com/news/security/revil-hacker-behind-kaseya-ransomware-attack-gets-13-years-in-prison/)). His Russian co-defendant Polyanin was never caught |
| Rostislav Panev (LockBit developer, Russian-Israeli dual national) | Israel, Aug 2024 | Cooperating state plus dual nationality | Extradited to the US, Mar 2025 ([DOJ NJ](https://www.justice.gov/usao-nj/pr/us-charges-dual-russian-and-israeli-national-developer-lockbit-ransomware-group), [SecurityWeek](https://www.securityweek.com/lockbit-ransomware-developer-extradited-to-us/)) |
| 4 Russians, 8Base/Phobos | Phuket, Thailand, Feb 2025 | Travel/residence abroad; 14-country operation | Arrested; DOJ charged Berezhnoy and Glebov ([SecurityWeek](https://www.securityweek.com/authorities-disrupt-8base-ransomware-arrest-four-russian-operators/)). Phobos admin Ptitsyn was arrested in South Korea and extradited to the US in Nov 2024 (same source). Japan's NPA helped identify suspects (see §7) |
| India call-centre fraud networks | India, 2025 | State cooperation | "approximately 175 arrests through 13 joint operations" with India's CBI in 2025; more than 475 since 2022 ([IC3 2025 report](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf)) |
| REvil members inside Russia | Russia, Jan 2022 (FSB) | Home state chose to act, at US request | Sentenced in Russia to 4.5–6 years, Oct 2024 ([The Hacker News](https://thehackernews.com/2024/10/four-revil-ransomware-members-sentenced.html)). None was handed to the US |
| Mikhail Matveev ("Wazawaka") | Kaliningrad, Nov 2024 | Russian domestic case (Art. 273) | Charged in Russia for ransomware developed in Jan 2024. Reports that he got only fines or bail are **UNVERIFIED** ([Infosecurity](https://www.infosecurity-magazine.com/news/russia-arrests-ransomware-wazawaka/)) |

Denis Kulkov (Try2Check) was in the brief. I did not research him (**UNVERIFIED**; to my knowledge he was indicted in 2022 with a $10M reward and has not been arrested).

**Swap note:** The Aug 2024 exchange returned 8 people to Russia, including Seleznev and Klyushin, for 16 held by Russia and Belarus ([CyberScoop](https://cyberscoop.com/jailed-cybercriminals-returned-to-russia-in-historic-prisoner-swap/), [Dark Reading](https://www.darkreading.com/cyber-risk/russias-priorities-in-prisoner-swap-suggest-cyber-focus)). Dark Reading reads Russia's choice of whom to bring back as a sign it values its cyber operators.

## 5. Base rates: what we can and cannot say

- **0.3% / 0.05% (US).**
  - Source: Third Way, *To Catch a Hacker* (Eoyang et al., 2018) ([landing page](https://www.thirdway.org/report/to-catch-a-hacker-toward-a-comprehensive-strategy-to-identify-pursue-and-punish-malicious-cyber-actors); [PDF](https://thirdway.imgix.net/pdfs/override/To_Catch_Hacker_Report_FINAL.pdf), p. 7; the PDF returned HTTP 402 to my fetcher, so these numbers come via search excerpts).
  - Method: annual computer-crime arrests self-reported by DOJ, FBI and Secret Service, divided by complaints in the 2016 IC3 data, gives **~0.3%** ("for every 1,000 cyber incidents, only three ever see an arrest"). Assuming only 1 in 6 victims report gives an "effective" **~0.05%**.
  - The WEF repeated 0.05% in its Global Risks Report 2020 ("likelihood of detection and prosecution ... as low as 0.05% in the United States", quoted in [Dark Reading](https://www.darkreading.com/cyber-risk/the-cybercrime-pandemic-keeps-spreading)). A WEF Agenda piece credits Third Way ([WEF](https://www.weforum.org/stories/cybersecurity/fighting-cybercrime-what-happens-to-the-law-when-the-law-cannot-be-enforced/)).
  - **Caveats:** arrests and complaints are not the same cases; arrests can cover many incidents or none; the data is from 2016; the 1-in-6 factor is an assumption; Third Way itself flags "significant challenges". Present it as an order-of-magnitude estimate, "roughly 3 arrests per 1,000 reported incidents", not as a probability of being caught.
- **IC3 2025** ([report PDF](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf)): 1,008,597 complaints; $20.877B reported losses (2024: $16.6B); ransomware 3,611 complaints / $32.3M. IC3 itself warns the ransomware loss figure is "artificially low": it excludes downtime and remediation, and only covers reports made via IC3. The report gives **no total arrest count**, so the two numbers cannot be divided.
- **Japan, 2025 (NPA):** 226 ransomware damage reports (H1 116, H2 110; 222 in 2024). A record 15,108 cybercrime clearances (検挙件数) ([NPA H1 2025 PDF](https://www.npa.go.jp/publications/statistics/cybersecurity/data/R7kami/R07_kami_cyber_jyosei.pdf); full year via [Nara Pref. Police copy of the NPA report](https://www.police.pref.nara.jp/cmsfiles/contents/0000003/3629/R07_cyber_jousei.pdf) and [summary](https://rocket-boys.co.jp/security-measures-lab/police-white-paper-2026-cybercrime-record-ransomware/)). **Do not put these two side by side as a ratio.** "Cybercrime" clearances are mostly domestic fraud, child-exploitation and similar offences, not ransomware. I found no published count of ransomware-specific arrests in Japan.
- **UK/EU prosecution statistics:** not researched. This is a gap.

## 6. "Cyber war": attribution without arrest

- **NotPetya (Jun 2017).**
  - Attribution: the White House statement of 15 Feb 2018 said "the Russian military launched the most destructive and costly cyber-attack in history ... causing billions of dollars in damage" ([text via GlobalSecurity](https://www.globalsecurity.org/security/library/news/2018/02/sec-180215-whitehouse01.htm); [CNN](https://www.cnn.com/2018/02/15/politics/white-house-russia-notpetya)). The UK attributed it hours earlier ([The Register](https://www.theregister.com/2018/02/15/uk_names_russian_military_as_source_of_notpetya/)).
  - **The "$10B" figure is not in that statement.** It comes from "a White House assessment confirmed to WIRED by ... Tom Bossert" (Wired, 22 Aug 2018; [archived copy](https://cyber-peace.org/wp-content/uploads/2018/10/The-Untold-Story-of-NotPetya-the-Most-Devastating-Cyberattack-in-History-_-WIRED.pdf)).
  - Charges and arrests: 6 GRU officers charged in 2020, none in custody.
- **WannaCry (May 2017).**
  - Attribution: on 19 Dec 2017 Bossert publicly attributed it to North Korea and said the UK, Australia, Canada, New Zealand and Japan joined ([transcript](https://www.americanrhetoric.com/speeches/tombossertjeanettemanfrawannacrynorthkorea.htm); [CBS](https://www.cbsnews.com/news/white-house-says-wannacry-attack-was-carried-out-by-north-korea/)).
  - Lawfare commented that the US made clear it lacked means to stop or retaliate ([Lawfare](https://www.lawfaremedia.org/article/strange-wannacry-attribution)).
  - Charges and arrests: Park Jin Hyok was charged in 2018; no arrest.
- **Volt Typhoon.**
  - CISA, NSA and FBI (7 Feb 2024) assess "with high confidence" that PRC actors are "pre-positioning" in US critical infrastructure IT networks, with footholds lasting at least 5 years ([CISA AA24-038A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a)).
  - No individuals charged (as far as I found).
- **Salt Typhoon.**
  - The FBI/CISA joint statement (13 Nov 2024) confirmed PRC-affiliated compromise of multiple telecom companies, including theft of call records and of lawful-intercept-related data ([CISA](https://www.cisa.gov/news-events/news/joint-statement-fbi-and-cisa-peoples-republic-china-prc-targeting-commercial-telecommunications)).
  - The response so far: sanctions on Sichuan Juxinhe (Jan 2025) ([State Dept](https://2021-2025.state.gov/office-of-the-spokesperson/releases/2025/01/u-s-takes-action-against-prc-linked-cyber-actors-for-treasury-hack-and-salt-typhoon/)) and a reported $10M FBI bounty (Apr 2025, per [Wikipedia](https://en.wikipedia.org/wiki/Salt_Typhoon), **UNVERIFIED** against FBI/RFJ).
- **Pattern.** At the "cyber war" end, the response ladder stops at attribution, advisories, sanctions and bounties. Courts are almost never involved, except through the indictments in §1.

## 7. Japan angle

- **MirrorFace / Earth Kasha.**
  - On 8 Jan 2025 the NPA and NISC publicly assessed that a campaign against Japanese organisations since about 2019 is MirrorFace's work. They called it an organised attack "with suspected involvement of China" aimed at national-security and advanced-technology information ([NPA notice](https://www.npa.go.jp/bureau/cyber/koho/caution/caution20250108.html); [Jiji](https://www.jiji.com/jc/article?k=2025010800690&g=soc), which reports more than 200 incidents).
  - Targets: think tanks, politicians, media and research bodies.
  - **No arrests or named individuals found.**
- **DMM Bitcoin.**
  - On 23 Dec 2024 the FBI, DC3 and NPA jointly attributed the May 2024 theft of 4,502.9 BTC (~$308M; ¥48.2B) to TraderTraitor, part of Lazarus ([FBI](https://fbi.gov/news/press-releases/fbi-dc3-and-npa-identification-of-north-korean-cyber-actors-tracked-as-tradertraitor-responsible-for-theft-of-308-million-from-bitcoindmmcom)).
  - Entry vector: a fake LinkedIn recruiter targeted an employee at wallet vendor Ginco ([Cointelegraph](https://cointelegraph.com/news/fbi-reveals-dmm-crypto-hack-300m-north-korea)). DMM Bitcoin later announced it would shut down.
  - **No arrests.** The "weakest layer" was a person at a supplier.
- **Where Japan does reach.** In the Phobos/8Base international investigation, the NPA's Cyber Special Investigation Unit (サイバー特別捜査部) identified 3 suspects and passed crypto-tracing leads to partner countries. It also released a Phobos decryptor in Jul 2025 ([summary of the 2026 Police White Paper](https://rocket-boys.co.jp/security-measures-lab/police-white-paper-2026-cybercrime-record-ransomware/); [Nara copy of NPA report](https://www.police.pref.nara.jp/cmsfiles/contents/0000003/3629/R07_cyber_jousei.pdf)). The arrests themselves took place in Thailand (§4). Exactly how Japan's identifications map to the Phuket arrests is **UNVERIFIED**.

## Diagram ideas

1. **The funnel.** Incidents, then reported (about 1 in 6, per Third Way's assumption), then attributed, then indicted, then arrested, then imprisoned, then actually served. Show only the ratios we can source (0.3% from reported to arrested), and mark the other steps as unknown. The final step, "served", gets a swap arrow pointing back to Moscow.
2. **"Named but untouchable" wall.** A grid of the 10 indictments in §1 with silhouettes per named person: 58 unique names, of which 3 are greyed in as arrested (2 Malaysians and 1 Canadian launderer), none of them state officers.
3. **World map: the travel trap.** Lines from Russia to the arrest locations (Maldives, Prague, Halkidiki, Sion, Polish border, Phuket, Israel), then to the US, then back to Moscow via Ankara (Aug 2024) and Istanbul (Feb 2025) for the swapped.
4. **Layer stack: which layer gave way.** For each arrest: Seleznev/Vinnik/Klyushin/Nikulin, physical location (travel); Alaumary and the Vinnik forfeiture, money; Panev, nationality/jurisdiction; Cronos/Khoroshev, server seizure; DMM, human/supply chain (this led to attribution, not arrest).
5. **Response ladder.** Attribution statement, then advisory, then indictment, then sanctions, then bounty, then takedown/seizure, then arrest. Shade how far each case got: NotPetya stopped at indictment; LockBitSupp at sanctions plus bounty; 8Base at arrest.
6. **The legal wall.** Three quoted clauses side by side: Russia Art. 61, PRC Extradition Law Art. 8(1), and the UN Convention's article 65 entry-into-force condition (40 ratifications needed; 3 so far).

## Numbers we can safely show

| Figure | What it measures | Date | Source | Caveats |
|---|---|---|---|---|
| ~0.3% (3 per 1,000) | US computer-crime arrests ÷ incidents reported to IC3 | 2016 data, pub. 2018 | [Third Way](https://www.thirdway.org/report/to-catch-a-hacker-toward-a-comprehensive-strategy-to-identify-pursue-and-punish-malicious-cyber-actors) | Ratio of unrelated totals, not a case-level catch rate. Old data |
| ~0.05% | Same, adjusted for ~1 in 6 victims reporting | Same | Third Way, repeated by WEF GRR 2020 ([WEF piece](https://www.weforum.org/stories/cybersecurity/fighting-cybercrime-what-happens-to-the-law-when-the-law-cannot-be-enforced/)) | Adds an assumption on top of the 0.3%. Label "estimate" |
| 1,008,597 | Complaints to FBI IC3 | CY2025 | [IC3 2025](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf) | Self-reported; mostly fraud, not intrusions |
| $20.877B | Losses reported to IC3 | CY2025 | Same | Reported losses only |
| 3,611 / $32.3M | Ransomware complaints / reported losses to IC3 | CY2025 | Same | IC3 says this loss figure is "artificially low" |
| 58 named / 0 state officers arrested | People named in the 10 US state-linked indictments in §1 | 2014–2025 | DOJ releases linked in §1 | Arrest count is my inference from no later reports. 3 non-officers were arrested |
| 12 / 6 | GRU officers charged (2018 / 2020) | 2018, 2020 | [DOJ 2018](https://www.justice.gov/archives/opa/pr/grand-jury-indicts-12-russian-intelligence-officers-hacking-offenses-related-2016-election), [DOJ 2020](https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and) | Kovalev appears in both |
| "billions of dollars" | NotPetya damage, official White House wording | 15 Feb 2018 | [White House text](https://www.globalsecurity.org/security/library/news/2018/02/sec-180215-whitehouse01.htm) | The "$10B" figure comes from Bossert via Wired, not the statement; nearly $1B to 3 US firms per [DOJ 2020](https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and) |
| $308M (¥48.2B) | DMM Bitcoin theft attributed to DPRK TraderTraitor | 23 Dec 2024 | [FBI/DC3/NPA](https://fbi.gov/news/press-releases/fbi-dc3-and-npa-identification-of-north-korean-cyber-actors-tracked-as-tradertraitor-responsible-for-theft-of-308-million-from-bitcoindmmcom) | Value at time of theft |
| 226 | Ransomware damage reports to Japanese police | CY2025 | NPA ([H1 PDF](https://www.npa.go.jp/publications/statistics/cybersecurity/data/R7kami/R07_kami_cyber_jyosei.pdf); [full-year copy](https://www.police.pref.nara.jp/cmsfiles/contents/0000003/3629/R07_cyber_jousei.pdf)) | Reports, not all incidents. Do not divide by the clearances figure |
| 15,108 | Cybercrime clearances (検挙件数) in Japan | CY2025 | Same | Mostly domestic fraud and similar; not ransomware arrests |
| 72 signers in Hanoi (71 states + EU); 40 ratifications needed | UN Cybercrime Convention signature / entry-into-force threshold | Oct 2025 | [UN OLA](https://www.un.org/ola/en/news/united-nations-convention-against-cybercrime-opens-signature-hanoi) | Later counts (95 signatories, 3 ratifications) come from secondary sources; recheck the UN Treaty Collection before publishing |
| 2 people | Convicted Russian hackers (Seleznev, Klyushin) returned in the Aug 2024 swap | 1 Aug 2024 | [CyberScoop](https://cyberscoop.com/jailed-cybercriminals-returned-to-russia-in-historic-prisoner-swap/) | Plus Vinnik, Feb 2025 |
| $8.6M | Crypto seized in the Qakbot takedown | 29 Aug 2023 | [DOJ CDCA](https://justice.gov/usao-cdca/pr/qakbot-malware-disrupted-international-cyber-takedown) | Compare with ~$58M in ransoms the admins received (same source) |
| up to $10M | Typical State Dept reward per ransomware leader (Conti, LockBitSupp, Matveev) | 2022–2024 | [Treasury jy2326](https://home.treasury.gov/news/press-releases/jy2326), [The Record](https://therecord.media/us-state-department-offering-10-million-reward-for-information-about-conti-members) | No public record that any of these rewards has been paid |

## Open gaps / UNVERIFIED list

- The Budapest Convention party list (whether Russia and China are absent) is not confirmed from the CoE chart, which returned 403. Current Hanoi Convention signatory and ratification counts are not confirmed from the UN Treaty Collection.
- APT41: final outcome of the Malaysian extradition case. Nikulin's release date. Matveev's sentence. Kulkov's status. Whether Ermakov (Klyushin case) is the same person as Yermakov (Netyksho case).
- Conti's alignment with the Russian state. US extradition-treaty status with the DPRK and Iran. Japan's rule on extraditing its own nationals. UK/EU prosecution statistics.
- The $10M Salt Typhoon bounty (seen only on Wikipedia).
