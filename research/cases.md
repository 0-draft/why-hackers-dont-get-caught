# Case files: how anonymous attackers were de-anonymized

Research notes for the "case files" section. Layers: network / device / identity / money / infrastructure / behavior / human.

Conventions:

- "Failed layer" means the ONE layer whose failure investigators exploited first or most decisively. Many cases have secondary failures, listed separately.
- **UNVERIFIED** = asserted somewhere but not confirmed by a primary source or two independent reputable sources in this sweep.
- **DISPUTED** = a primary source says it, but the defense, the subject, or experts publicly contest it.
- Research date: 2026-11-05.

---

## 1. Ross Ulbricht / Silk Road ("Dread Pirate Roberts"), 2013

- **Layers used**: network (Tor hidden service for site and admin access, VPN); identity (pseudonym DPR); money (Bitcoin-only market); infrastructure (offshore servers).
- **Failed layer: identity.** In Jan 2011 a user "altoid" promoted Silk Road on shroomery.org and Bitcoin Talk. In Oct 2011 the same "altoid" posted an "IT pro needed" job ad on Bitcoin Talk telling people to reply to "rossulbricht at gmail dot com". He also had a real-name Stack Overflow account asking about Tor hidden service code. ([NBC](https://www.nbcnews.com/news/world/end-silk-road-slip-ups-building-internet-drug-market-led-flna8c11326181), [Courthouse News](https://www.courthousenews.com/want-ad-could-costsilk-roads-ross-ulbricht/), [Computerworld](https://computerworld.com/article/2875655/simple-google-search-outed-alleged-silk-road-founder.html))
- **How it was exploited**: IRS-CI agent Gary Alford testified at trial that he Googled for the earliest mentions of Silk Road, found "altoid", then found the Gmail address ([Computerworld](https://computerworld.com/article/2875655/simple-google-search-outed-alleged-silk-road-founder.html)). Google records showed the Gmail account logging in from an internet cafe, including on a day a VPN tied to the Silk Road server was used from there ([NBC](https://www.nbcnews.com/news/world/end-silk-road-slip-ups-building-internet-drug-market-led-flna8c11326181)).
- **Secondary failures**:
  - Identity/behavior: the complaint describes a package of fake IDs intercepted at the border and addressed to him ([NBC](https://www.nbcnews.com/news/world/end-silk-road-slip-ups-building-internet-drug-market-led-flna8c11326181)).
  - Infrastructure, **DISPUTED**: the FBI's Tarbell declaration (Sept 2014) says the server's real IP (in Iceland) leaked through the login CAPTCHA when probed from a non-Tor browser. Nicholas Weaver (ICSI/UC Berkeley), analyzing the server config the government produced, said the server would have refused non-Tor requests on the claimed date and that the logs looked more like a phpMyAdmin page. Defense expert Joshua Horowitz also called the account implausible. ([Krebs](https://krebsonsecurity.com/2014/10/silk-road-lawyers-poke-holes-in-fbis-story/), [The Register](https://www.theregister.com/2014/09/08/leaky_captcha_behind_fbis_silk_road_rapture/), [SecurityWeek](https://www.securityweek.com/fbi-says-leaky-captcha-was-used-locate-silk-road-server-experts-doubtful/))
- **Outcome**: Arrested 1 Oct 2013 in San Francisco ([DOJ SDNY](https://www.justice.gov/usao-sdny/pr/manhattan-us-attorney-announces-indictment-ross-ulbricht-creator-and-owner-silk-road)). Convicted 2015 and sentenced to life without parole (his site says double life plus 40 years). Trump granted him a full pardon on 21 Jan 2025 ([CNBC](https://www.cnbc.com/2025/01/21/trump-pardons-silk-road-ross-ulbricht-.html)).

## 2. Hector Monsegur "Sabu" / LulzSec, 2011

- **Layers used**: network (proxies / Tor / hacked boxes); identity (handle "Sabu").
- **Failed layer: network** (**DISPUTED**). In March 2012 Fox News reported that "Sabu had always been cautious, hiding his IP address through proxy servers", but "logged into an Internet relay chatroom from his own IP address without masking it" ([Fox News](https://www.foxnews.com/tech/exclusive-unmasking-the-worlds-most-wanted-hacker)). Secondary outlets retold this as "once without Tor" ([Errata Security](https://blog.erratasec.com/2012/03/notes-on-sabu-arrest.html), [The Register](https://www.theregister.com/2012/03/07/lulzsec_takedown_analysis/)).
- **Dispute**: Monsegur says he always connected through hacked boxes. His version is that he was identified through a much older dox on EFnet IRC that agents later obtained (The Register editor's note, [The Register](https://www.theregister.com/2012/03/07/lulzsec_takedown_analysis/)). On this account the failed layer would be identity, not network. The site should present both.
- **How it was exploited**: Arrested 7 June 2011. He then became an FBI informant and helped identify other LulzSec/AntiSec members (see Hammond) ([CBS](https://www.cbsnews.com/news/hacker-who-helped-feds-faces-no-more-prison-time/), [NPR](https://www.npr.org/sections/thetwo-way/2014/05/27/316337873/former-lulzsec-hacker-turned-informant-avoids-further-jail-time)).
- **Outcome**: Sentenced 27 May 2014 to time served (about 7 months) plus 1 year supervised release, citing "extraordinary cooperation" ([CBS](https://www.cbsnews.com/news/hacker-who-helped-feds-faces-no-more-prison-time/)).

## 3. Jeremy Hammond ("Anarchaos", "sup_g"), AntiSec / Stratfor hack, 2011-2012

- **Layers used**: network (Tor); identity (multiple rotating handles: anarchaos, sup_g, burn, yohoho, crediblethreat).
- **Failed layer: human.** He chatted with Sabu, who was already an FBI informant. ([Dark Reading](https://www.darkreading.com/cyberattacks-data-breaches/stratfor-hacker-fbi-entrapment-shaped-my-case), [Fox News](https://www.foxnews.com/tech/lulzsec-linked-hacker-mocked-september-11-threatened-to-burn-down-white-house))
- **Mechanism**: In chats logged via the informant, he revealed biographical details: previous arrests, friends' arrests, and time in federal prison. The FBI used federal criminal records to narrow the suspects, and Sabu tied "sup_g" to "Anarchaos", an alias the FBI already associated with Hammond. The complaint was filed by FBI agent Milan Patel on 6 Mar 2012. ([Fox News](https://www.foxnews.com/tech/lulzsec-linked-hacker-mocked-september-11-threatened-to-burn-down-white-house), [Dark Reading](https://www.darkreading.com/cyberattacks-data-breaches/stratfor-hacker-fbi-entrapment-shaped-my-case))
  - **UNVERIFIED**: which specific arrest/city he mentioned. Secondary timelines are internally inconsistent (e.g. "RNC in Denver 2004"), so check the complaint text.
- **Outcome**: Pleaded guilty to one count of computer hacking conspiracy. Sentenced 15 Nov 2013 to 10 years ([DOJ SDNY](https://www.justice.gov/usao-sdny/pr/jeremy-hammond-sentenced-10-years-prison-hacking-stratfor-website-and-other-company)).

## 4. Eldo Kim, Harvard bomb hoax, 2013

- **Layers used**: network (Tor Browser); identity (Guerrilla Mail disposable email).
- **Failed layer: behavior** (context and timing). He used Tor from Harvard's own wireless network, which requires a login. Per the FBI affidavit, "Harvard University was able to determine that, in the several hours leading up to the receipt of the e-mail messages ... Eldo Kim accessed TOR using Harvard's wireless network" ([CNN](https://edition.cnn.com/2013/12/17/justice/massachusetts-harvard-hoax), [DOJ D.Mass.](https://www.justice.gov/usao-ma/pr/harvard-student-charged-bomb-hoax)). Tor hid what he did, but not the fact that he was using Tor on a small, authenticated network at the critical time.
- **How it was exploited**: Network logs gave a short suspect list. In an interview with FBI and Harvard police he admitted writing the emails to avoid a final exam ([The Crimson](https://www.thecrimson.com/article/2013/12/17/student-charged-bomb-threat/), [NBC](https://www.nbcnews.com/technolog/failing-grade-alleged-harvard-bomb-hoaxer-needed-more-tor-cover-2d11767028)).
  - The popular "he was the only Tor user" claim is **UNVERIFIED** as phrased. The affidavit, as quoted, says he accessed Tor in that window, not that he was the only one.
- **Outcome**: 18-month deferred prosecution / pretrial diversion with 4 months home confinement, 750 hours community service and restitution ([DOJ D.Mass. 2014](https://www.justice.gov/usao-ma/pr/harvard-student-charged-making-hoax-bomb-threat)).

## 5. Eric Eoin Marques / Freedom Hosting, 2013

- **Layers used**: network/infrastructure (Tor hidden-service hosting for 200+ sites); money (paid hosting).
- **Failed layer: infrastructure.** The FBI identified the IP address of a Freedom Hosting server by a method it **never disclosed** ("an investigation in 2013"). The server was at OVH in France and rented in Marques's name, paid from a US bank account. ([MIT Technology Review](https://www.technologyreview.com/2020/02/08/349016/a-dark-web-tycoon-pleads-guilty-but-how-was-he-caught/))
- **How it was exploited**: Once hosting records named him, the FBI obtained a server copy and took over the service. It then served a Firefox exploit to visitors that bypassed Tor Browser and sent visitors' real IPs to a server in Virginia. This was the "device" layer attack on users, not on Marques. ([Wikipedia summary of contemporaneous reporting](https://en.wikipedia.org/wiki/Freedom_Hosting), [Help Net Security](https://www.helpnetsecurity.com/2013/09/16/fbi-confirms-they-were-behind-freedom-hostings-takeover/))
- **Outcome**: Arrested in Dublin in Aug 2013, extradited in 2019, pleaded guilty in Feb 2020, sentenced Sept 2021 to 27 years ([The Record](https://therecord.media/freedom-hosting-admin-gets-27-years-in-prison-for-hosting-child-pornography), [Malwarebytes](https://www.malwarebytes.com/blog/news/2021/09/freedom-hosting-operator-gets-27-years-for-hosting-dark-web-child-abuse-sites)).
- **Caveat**: How the server IP was first found remains publicly unknown.

## 6. Alexandre Cazes "Alpha02" / AlphaBay, 2017

- **Layers used**: network (Tor); identity (handle Alpha02 / admin); money (Bitcoin, Monero).
- **Failed layer: identity.** Per the forfeiture complaint, for a period in Dec 2014 AlphaBay's welcome email and password-reset emails carried his personal address <pimp_alex_91@hotmail.com> in the header ([The Register](https://www.theregister.com/2017/07/20/alphabay_hotmail_fbi/), [BleepingComputer](https://www.bleepingcomputer.com/news/security/series-of-monumental-opsec-mistakes-led-to-alphabays-demise/)). The "91" matched his birth year.
- **How it was exploited**: The Hotmail address led to:
  - a 2008 tech-forum post as "Alpha02" signed "Alexandre Cazes";
  - PayPal accounts in his name;
  - his LinkedIn and his company EBX Technologies.
  ([CBC](https://www.cbc.ca/news/canada/montreal/alexandre-cazes-millionaire-cars-property-alphabay-1.4215894), [BleepingComputer](https://www.bleepingcomputer.com/news/security/series-of-monumental-opsec-mistakes-led-to-alphabays-demise/))
- **Secondary failure: device.** At his arrest in Bangkok on 5 July 2017, police found his laptop "open and in an unencrypted state", logged in as AlphaBay admin. He had been rebooting the server after a law-enforcement-induced outage. The laptop also held a "Total Net Worth" file. ([Lawfare](https://www.lawfaremedia.org/article/cybercrime-roundup-international-takedown-two-online-illicit-marketplaces), [CNN](https://www.cnn.com/2017/07/20/politics/doj-takes-down-dark-web-marketplace-alphabay))
- **Outcome**: Died in Thai custody on 12 July 2017 (apparent suicide). His assets were forfeited via civil forfeiture in E.D. Cal. in 2018 ([CNN](https://www.cnn.com/2017/07/20/politics/doj-takes-down-dark-web-marketplace-alphabay), [CoinDesk](https://www.coindesk.com/markets/2018/09/17/us-government-seizes-lambo-and-crypto-millions-from-dead-dark-web-kingpin)).

## 7. Blake Benthall "Defcon" / Silk Road 2.0, 2014 (+ Brian Farrell / CMU)

- **Layers used**: network (Tor hidden service); identity (handle Defcon); money (Bitcoin).
- **Failed layer: human** (undercover). An HSI undercover agent joined Silk Road 2.0's support staff and got access to private admin areas ([Krebs](https://krebsonsecurity.com/2014/11/feds-arrest-alleged-silk-road-2-admin-seize-servers/comment-page-1/), [NBC](https://www.nbcnews.com/tech/security/fbi-arrests-alleged-silk-road-2-0-operator-blake-benthall-n242751)).
  - Competing candidate: infrastructure. In May 2014 the FBI identified a foreign server hosting the site. The provider's records said it was "controlled and maintained ... by an individual using the email account <blake@benthall.net>" ([complaint PDF](https://freeross.org/wp-content/uploads/2018/06/Blake_Benthall_Criminal_Complaint.pdf), [Krebs](https://krebsonsecurity.com/2014/11/feds-arrest-alleged-silk-road-2-admin-seize-servers/comment-page-1/)). The real-name email on the hosting account was the decisive identity leak. For the site, show "infrastructure -> identity".
- **How the server was found**: The complaint does not say publicly. In the related Farrell ("DoctorClu") case, a 23 Feb 2016 W.D. Wash. order says Farrell's IP was identified by Carnegie Mellon's SEI during DoD-funded Tor research and obtained by FBI subpoena ([Gizmodo](https://gizmodo.com/judge-confirms-carnegie-mellon-hacked-tor-and-provided-1761191933), [Threatpost](https://threatpost.com/judge-confirms-dod-funded-research-to-decloak-tor-users/116464/)). Whether the CMU attack also located the SR2 server is **UNVERIFIED**.
- **Outcome**: He admitted to everything after Miranda warnings, per the prosecutor ([NBC](https://www.nbcnews.com/tech/security/silk-road-2-0-suspect-blake-benthall-admitted-everything-prosecutor-n243056)). He cooperated, and Motherboard reported a DOJ document suggesting he might face only tax charges ([Vice](https://www.vice.com/en/article/silk-road-2-admin-defcon-blake-benthall-tax-crimes-cooperate/)). His final sentence is **UNVERIFIED**. Farrell got 8 years ([DOJ W.D. Wash.](https://justice.gov/usao-wdwa/pr/key-player-silk-road-20-sentenced-eight-years-prison)).

## 8. Steven Chase / Playpen + FBI NIT, 2014-2015

- **Layers used**: network (Tor hidden service); identity (pseudonymous admin).
- **Failed layer: infrastructure.** In Dec 2014 Chase "slipped up and revealed Playpen's unique IP address", a location in the US. A foreign agency tipped off the FBI. ([FBI](https://www.fbi.gov/news/stories/playpen-creator-sentenced-to-30-years), [EFF](https://www.eff.org/pages/playpen-cases-frequently-asked-questions)) The exact misconfiguration is not described publicly (**UNVERIFIED** detail).
- **How it was exploited**: The server was seized at a hosting facility in Lenoir, NC. Agents then got email warrants and "followed the money", which led to Chase ([FBI](https://www.fbi.gov/news/stories/playpen-creator-sentenced-to-30-years)). The FBI then ran Playpen for about 13 days and deployed a "Network Investigative Technique": a Tor Browser/Firefox exploit (device layer) that sent users' real IP, MAC address and other data outside Tor. Reporting says about 8,700 IPs were obtained. Courts split on the warrant: the 3rd Circuit in *Werdene* found it exceeded the warrant but applied the good-faith exception. ([EFF](https://www.eff.org/pages/playpen-cases-frequently-asked-questions), [Vice](https://www.vice.com/en/article/the-fbi-used-a-non-public-vulnerability-to-hack-suspects-on-tor/), [The Register](https://www.theregister.com/2018/02/24/tor_fbi_hacking_appeal/))
- **Outcome**: Chase sentenced May 2017 to 30 years. Co-admins got 20 years each ([DOJ](https://www.justice.gov/opa/pr/florida-man-sentenced-prison-engaging-child-exploitation-enterprise)).

## 9. Ardit Ferizi "Th3Dir3ctorY" / ISIL hacker, 2015

- **Layers used**: identity (handle, group name KHS); no meaningful network anonymization per the complaint.
- **Failed layer: network.** The hacked victim server's logs showed the attacking IP 210.186.111.14, a Malaysian ISP. The same IP logged into:
  - his Facebook account "ardit.ferizi01", the day before and the day of the intrusion;
  - his Twitter @Th3Dir3ctorY, at least nine logins between 5 and 13 July 2015.
  ([FBI affidavit](https://www.investigativeproject.org/case_docs/us-v-ferizi-aka-th3dir3ctory/2999/affidavit.pdf), [Nizkor text](https://derechos.org/nizkor/espana/doc/ferizi.html), [IBTimes](https://www.ibtimes.co.uk/fbi-criminal-complaint-reveals-alleged-isis-hacker-ardit-ferizi-really-wasnt-that-hard-catch-1525259))
- **How it was exploited**: The FBI correlated the server logs with Twitter/Facebook records. The Twitter account was registered with a Hotmail address from a Kosovo-area ISP. He also left an admin account named "KHS" (Kosova Hacker's Security) on the server. Malaysia arrested him on a US provisional warrant.
- **Outcome**: Pleaded guilty June 2016. Sentenced 23 Sept 2016 to 20 years ([DOJ](https://www.justice.gov/archives/opa/pr/isil-linked-kosovo-hacker-sentenced-20-years-prison)). Granted compassionate release to Kosovo around 2020-21, per a later DOJ N.D. Cal. filing ([DOJ](https://www.justice.gov/usao-ndca/pr/convicted-hacker-charged-fraud-and-identity-theft-committed-while-incarcerated-federal)).

## 10. "Guccifer 2.0" / GRU Units 26165 & 74455, 2016 (indicted 2018)

- **Layers used**: identity (fake "lone Romanian hacker" persona, DCLeaks persona); network (VPNs, e.g. Elite VPN); money (Bitcoin to pay for infrastructure); infrastructure (leased servers, domains).
- **Failed layer: network** (single anonymous-source report). The Daily Beast (Mar 2018) reported that Guccifer 2.0 once failed to turn on the VPN before logging in. That left a Moscow IP in the logs of a US social media company, which investigators tied to a specific GRU officer at Grizodubovoy St. HQ. ([Daily Beast](https://www.thedailybeast.com/exclusive-lone-dnc-hacker-guccifer-20-slipped-up-and-revealed-he-was-a-russian-intelligence-officer/), [TechCrunch](https://techcrunch.com/2018/03/22/more-evidence-ties-guccifer-2-0-to-russian-intelligence/)) **Not in the indictment.**
- **What the indictment itself alleges** (money + infrastructure + behavior):
  - On 15 June 2016, conspirators logged into a Moscow-based server managed by Unit 74455 and searched for English phrases such as "some hundred sheets" and "worldwide known". Those phrases appeared in Guccifer 2.0's first post about two hours later.
  - The same pool of bitcoin paid for the dcleaks.com server and a VPN account later used to log into @Guccifer_2.
  ([DOJ press release](https://www.justice.gov/archives/opa/pr/grand-jury-indicts-12-russian-intelligence-officers-hacking-offenses-related-2016-election), [The Intercept](https://theintercept.com/2018/07/18/mueller-indictment-russian-hackers/))
- **Outcome**: 12 GRU officers indicted 13 July 2018 in D.D.C. None are in custody. **DISPUTED** by skeptics, who say no public evidence shows how the Moscow server was attributed ([g-2.space](http://g-2.space/guccifer2-evidence-versus-gru-attribution/), an advocacy site).

## 11. Jong Woo Son / Welcome to Video, 2017-2018

- **Layers used**: network (Tor hidden service); money (Bitcoin, a unique deposit address per user).
- **Failed layer: money.** IRS-CI made purchases, traced the outflows from site wallets to a KYC'd exchange account, and got his name, phone and email from it ([DOJ](https://www.justice.gov/archives/opa/pr/south-korean-national-and-hundreds-others-charged-worldwide-takedown-largest-darknet-child), [CNN](https://www.cnn.com/2019/10/19/asia/south-korea-child-exploitation-international-police-intl-hnk/index.html)).
- **Also infrastructure**: Per the indictment as reported, "view page source" on the homepage exposed an unconcealed server IP, a Korea Telecom address, because some resources were linked by IP instead of the .onion address ([Wikipedia summary](https://en.wikipedia.org/wiki/Welcome_to_Video_case), [CNN](https://www.cnn.com/2019/10/19/asia/south-korea-child-exploitation-international-police-intl-hnk/index.html)). Sources differ on which came first; IRS-CI also cited a confidential tip.
- **How it was exploited**: The server was seized in South Korea on 5 Mar 2018. Tracing of user payments led to 337 users charged worldwide, per DOJ (country count varies between sources).
- **Outcome**: Son served 18 months in South Korea. Reports that South Korea refused US extradition in 2020 are **UNVERIFIED** in this sweep. In July 2022 he got 2 more years in Korea for laundering the proceeds (per Wikipedia; **UNVERIFIED** against Korean court primary).

## 12. 2020 Twitter hack: Graham Ivan Clark "Kirk", Mason Sheppard "Chaewon", Nima Fazeli "Rolex", Joseph O'Connor "PlugwalkJoe"

- **Layers used**: identity (Discord/OGUsers handles); money (Bitcoin); network (VPN, partially).
- **Failed layer: money** (exchange KYC).
  - Sheppard: blockchain analysis tied the "Chaewon" wallet to Binance and Coinbase accounts. Coinbase KYC included his driver's license, and Binance had a photo of him holding the same license.
  - Fazeli: the "Nim F" Coinbase account was verified with his driver's license.
  ([Chainalysis](https://www.chainalysis.com/blog/chainalysis-doj-twitter-hack-2020/), [SecurityWeek](https://www.securityweek.com/bitcoin-transactions-led-fbi-twitter-hackers/), [The Register](https://www.theregister.com/2020/08/06/mason_sheppard_twitter_hack_nca/))
- **Supporting identity failure**: The leaked OGUsers database showed "Chaewon" shared an IP with another account, "Mas". Fazeli used the same Florida IPs for Discord and Coinbase.
- O'Connor: identified partly through an interview with "Juvenile 2" (human layer) ([Gizmodo](https://gizmodo.com/joseph-o-connor-twitter-hacker-gets-prison-sentence-1850575900)).
- Clark: how he was identified is **UNVERIFIED** in sources reviewed.
- **Outcome**:
  - Clark: plea in Florida as a youthful offender, 3 years juvenile prison plus 3 years probation.
  - O'Connor: 5 years federal (SDNY, June 2023).
  ([Gizmodo](https://gizmodo.com/joseph-o-connor-twitter-hacker-gets-prison-sentence-1850575900), [Malay Mail](https://www.malaymail.com/news/world/2021/03/17/us-teen-mastermind-in-epic-twitter-hack-sentenced-to-prison/1958685))

## 13. Ilya Lichtenstein & Heather Morgan / Bitfinex hack laundering, 2016-2022

- **Layers used**: money (peel chains, mixers, chain-hopping, AlphaBay deposits to break the trail, Monero, gold coins); identity (fake-identity exchange accounts); infrastructure (automation scripts).
- **Failed layer: money -> device/cloud.**
  - Laundered funds were traced into exchange accounts in their real names at six exchanges.
  - A search warrant on Lichtenstein's US cloud storage account (2021) yielded a spreadsheet tying accounts together and an encrypted file with about 2,000 addresses and private keys. Agents decrypted it on 31 Jan 2022 and seized about 94,000 BTC (about $3.6B).
  ([DOJ Statement of Facts](https://www.justice.gov/d9/press-releases/attachments/2022/02/08/statement_of_facts.pdf))
- **Outcome**:
  - Lichtenstein: pleaded guilty in Aug 2023 (and admitted to the hack). Sentenced 14 Nov 2024 to 5 years.
  - Morgan: 18 months.
  ([DOJ USAO-DC](https://www.justice.gov/usao-dc/pr/bitfinex-hacker-sentenced-money-laundering-conspiracy-involving-billions-stolen))
  - Lichtenstein was reported released early in Jan 2026 ([CNN](https://cnn.com/2026/10/31/business/crypto-hacker-money-laundering)).

## 14. Arion Kurtaj "White" / Lapsus$, 2021-2023

- **Layers used**: identity (handles White, Breachbase, WhiteDoxbin); network (VPN).
- **Failed layer: human** (rivals). After he bought the doxxing site Doxbin and leaked its whole dataset on Telegram (Jan 2022), the Doxbin community published "perhaps the most thorough dox the community had ever produced": his name, his family, and videos shot outside his UK home ([Krebs](https://krebsonsecurity.com/2022/03/a-closer-look-at-the-lapsus-data-extortion-group/), [Wikipedia](https://en.wikipedia.org/wiki/Lapsus$)).
- **How it was exploited**: Police raided his home in Dec 2021, and City of London Police arrested seven people in Mar 2022. While on bail and under police protection in a hotel, he hacked Rockstar using an Amazon Fire Stick and a hotel TV. ([The Record](https://therecord.media/lapsus$-hacker-sentencing-uk))
  - Whether police identification depended on the dox, rather than independent investigation, is **UNVERIFIED**.
- **Outcome**: Found unfit to stand trial. In Aug 2023 a jury found he had committed the acts. In Dec 2023 he received an indefinite hospital order ([The Record](https://therecord.media/lapsus$-hacker-sentencing-uk)).

## 15. Mikhail Matveev "Wazawaka" / Babuk, LockBit, Hive affiliate, 2021-2023

- **Layers used**: identity (many handles: Wazawaka, Babuk, Orange, BorisElcin, m1x); network.
- **Failed layer: identity** (reuse over a decade). Krebs linked Wazawaka to Matveev through:
  - passwords reused across aliases (from breach data);
  - Yandex/Mail.ru emails that registered a VK account under "Mikhail 'Mix' Matveev";
  - domain WHOIS in his name in Abakan;
  - a shared phone number;
  - an ICQ number he posted on Exploit;
  - a 2009 freelance profile.
  ([Krebs Jan 2022](https://krebsonsecurity.com/2022/01/who-is-the-network-access-broker-wazawaka/))
- **Behavior**: He later confirmed several aliases in an interview with The Record ([The Record](https://therecord.media/alleged-babuk-ransomware-leader-sanctioned-and-indicted-by-us)).
- **Outcome**:
  - US: indicted in D.N.J. and D.D.C., sanctioned, with a $10M reward (May 2023) ([DOJ](https://www.justice.gov/archives/opa/pr/russian-national-charged-ransomware-attacks-against-critical-infrastructure), [Krebs](https://krebsonsecurity.com/2023/05/russian-hacker-wazawaka-indicted-for-ransomware/)).
  - Russia: charged in Kaliningrad in Dec 2024 ([BankInfoSecurity](https://www.bankinfosecurity.com/russian-court-indicts-ransomware-hacker-wanted-by-fbi-a-26948)).
  - Not in US custody.

## 16. Dmitry Khoroshev "LockBitSupp" / LockBit, 2024

- **Layers used**: network (Tor leak sites, Tox); identity (LockBitSupp, putinkrab); money (crypto); infrastructure (RaaS panel). He publicly offered $10M to anyone who could unmask him ([NCA](https://nca-newsroom.prgloo.com/news/op-cronos)).
- **Failed layer: infrastructure / human** (seized servers) — the **authorities' method is UNVERIFIED**.
  - Operation Cronos (Feb 2024) seized LockBit's infrastructure, including 34 servers, the affiliate panel data and over 200 crypto accounts. The NCA said the investigation "uncovered" his identity but did not explain how. ([NCA](https://nca-newsroom.prgloo.com/news/op-cronos), [SecurityWeek](https://www.securityweek.com/lockbit-ransomware-mastermind-unmasked-charged/))
  - LockBitSupp himself said the charges do not show how he was linked ([Krebs](https://krebsonsecurity.com/2024/05/how-did-authorities-identify-the-alleged-lockbit-boss/)).
- **Independent OSINT (identity layer)**: Krebs traced:
  - the sanctions-listed emails to domains registered as "Dmitrij Ju Horoshev";
  - from there, to ICQ 669316 and the 2011 malware-dev handle "NeroWolfe" (<d.horoshev@gmail.com>, a Voronezh IP), via reused passwords and emails.
  - Krebs explicitly says this does not prove NeroWolfe = LockBitSupp, and found no direct link to "putinkrab".
  ([Krebs](https://krebsonsecurity.com/2024/05/how-did-authorities-identify-the-alleged-lockbit-boss/))
- **Outcome**: Named on 7 May 2024. Indicted on 26 counts in D.N.J., sanctioned by the UK, US and Australia, with a $10M US reward. At large in Russia. ([NCA](https://nca-newsroom.prgloo.com/news/op-cronos))

## 17. Rui-Siang Lin "Pharoah" / Incognito Market, 2020-2024

- **Layers used**: network (Tor); money (BTC to XMR swaps, Monero); identity (handle Pharoah).
- **Failed layer: money.**
  - BTC from the market's admin wallet went through a swap service, and within minutes matching amounts of XMR landed in an exchange account in his name, with KYC email and phone.
  - He also bought domains on Namecheap with admin-wallet funds through an account in his real name.
  ([DOJ SDNY](https://www.justice.gov/usao-sdny/pr/incognito-market-owner-arrested-operating-one-largest-illegal-narcotics-marketplaces), [ReHack summary of the complaint](https://rehack.com/cybersecurity/how-was-incognito-market-owner-caught/), [TRM Labs](https://www.trmlabs.com/resources/blog/administrator-of-darknet-narcotics-market-incognito-arrested))
  - The specific exchange and swap names are in the complaint PDF (linked from the DOJ release), not re-verified here.
- **Notable**: He worked for Taiwan's Ministry of Foreign Affairs and, per TRM, had trained police on blockchain analysis. Arrested at JFK on 18 May 2024 while in transit.
- **Outcome**: Pleaded guilty Dec 2024. Sentenced Feb 2026 to 30 years and forfeiture of about $105M ([DOJ SDNY](https://www.justice.gov/usao-sdny/pr/incognito-market-owner-sentenced-30-years-operating-one-worlds-largest-online)).

## 18. Christina Chapman / DPRK IT-worker "laptop farm", 2020-2025

- **Layers used**: network/infrastructure (company laptops hosted in her Arizona home so DPRK workers appeared to work from US residential IPs); identity (68 stolen US identities); money (payroll to US accounts, then laundered).
- **Failed layer: human / infrastructure.** The anonymizing layer was a real, physically locatable US person.
  - Prosecutors tied her to the separate Oleksandr Didenko laptop-farm network: one of Didenko's DPRK customers asked for a laptop to be shipped to Chapman's farm. Employer records then matched the machines found at her home.
  - Her TikTok videos showing racks of laptops were also used as evidence.
  ([CNN](https://www.cnn.com/interactive/2025/08/05/world/north-korea-it-worker-scheme-vis-intl-hnk/index.html), [DOJ OPA](https://www.justice.gov/opa/pr/arizona-woman-sentenced-17m-information-technology-worker-fraud-scheme-generated-revenue))
  - What first tipped investigators is **UNVERIFIED**.
- **How it was exploited**: The Oct 2023 search found 90+ laptops labeled with the company and identity each one served. She had shipped 49 laptops abroad, some to near the China-DPRK border. The scheme reached 309 US businesses and generated at least $17.1M.
- **Outcome**: Pleaded guilty Feb 2025. Sentenced 24 July 2025 to 102 months ([DOJ OPA](https://www.justice.gov/opa/pr/arizona-woman-sentenced-17m-information-technology-worker-fraud-scheme-generated-revenue), [The Record](https://therecord.media/arizona-woman-sentenced-north-korean-laptop-farm)). The North Korean workers themselves were not identified by name in these sources.

## 19. 片山祐輔 / PC遠隔操作事件 (Japan remote-control virus case), 2012-2014

- **Layers used**:
  - network: Tor for board posts and for sending commands;
  - device: the iesys.exe trojan, which turned victims' PCs into his proxies by polling a bulletin board for encrypted commands, so innocent people sent the threats;
  - identity: proxy-posting threads.
  ([ja.wikipedia](https://ja.wikipedia.org/wiki/パソコン遠隔操作事件)) Four innocent people were wrongly arrested ([ITmedia](https://www.itmedia.co.jp/news/articles/1502/04/news068.html)).
- **Failed layer: behavior** (physical world). On 5 Jan 2013 he emailed media a "puzzle" saying a memory card with the virus code was on the collar of a community cat on Enoshima. Enoshima had 35 new security cameras installed on 21 Dec 2012. Footage from 3 Jan 2013 (15:00-15:15) showed only one man who could plausibly have put a collar on the cat, and then showed him leaving by motorbike. He was arrested on 10 Feb 2013. ([ja.wikipedia](https://ja.wikipedia.org/wiki/パソコン遠隔操作事件), [日経](https://www.nikkei.com/article/DGXNASDG1201R_S3A210C1CC0000/)) A deleted copy of the cat photo was reportedly recovered from a phone he had sold (per Nikkei, as summarized).
- **Second slip (behavior)**: In May 2014, while on bail and claiming innocence, he sent a "true culprit" email from a secretly acquired smartphone. Police tailing him watched him bury it on the Arakawa riverbank on 15 May. It contained the email text and his DNA. He was re-detained and confessed on 22 May. ([ja.wikipedia](https://ja.wikipedia.org/wiki/パソコン遠隔操作事件))
- **Contested at the time**: The defense argued that touching the cat did not prove he attached the collar, and the collar purchase was disputed ([Yahoo!ニュース 江川紹子](https://news.yahoo.co.jp/expert/articles/3cec696196f11273ea20eaa3463509bd732f9a73), [郷原信郎](https://nobuogohara.com/2013/02/20/%EF%BD%90%EF%BD%83%E9%81%A0%E9%9A%94%E6%93%8D%E4%BD%9C%E4%BA%8B%E4%BB%B6%EF%BC%9A%E5%8F%8D%E7%9C%81%E3%81%AA%E3%81%8D%E3%80%8C%E6%9C%89%E7%BD%AA%E8%A6%96%E5%A0%B1%E9%81%93%E3%80%8D%E3%81%AE%E6%A7%8B/)). His 2014 confession settled the question.
- **Outcome**: Tokyo District Court, 4 Feb 2015: 8 years (prosecutors had sought 10). Not appealed. ([ITmedia](https://www.itmedia.co.jp/news/articles/1502/04/news068.html), [日経](https://www.nikkei.com/article/DGKKZO82788850U5A200C1CC0000/))

---

## Dropped / not researched

- Kevin Mitnick: optional, older, and his identification story (Shimomura tracking) is heavily dramatized. Not researched this pass.
- Fxmsp: not researched this pass.

## Cross-case observations (inference, not sourced claims)

- Tor itself was almost never "broken" by cryptanalysis. When the network layer failed, it was through:
  - not using it (Ferizi, reportedly Sabu and Guccifer 2.0);
  - using it in a tiny, logged context (Eldo Kim);
  - a browser exploit against the endpoint (Freedom Hosting, Playpen NIT: the device layer);
  - a research-grade relay attack (CMU / SR2 Farrell).
- Money is the most consistent late-stage failure. Crypto ends at a KYC exchange (Welcome to Video, Twitter 2020, Incognito, Bitfinex).
- Early-life identity reuse is the most common root cause for long-running personas: emails, passwords and handles from years before the crime (Ulbricht, Cazes, Matveev, Khoroshev OSINT).

---

## Summary table

| # | Case | Year | Layers used | Failed layer | One-line mechanism |
|---|------|------|-------------|--------------|--------------------|
| 1 | Ross Ulbricht / Silk Road | 2013 | network, identity, money, infra | identity | "altoid" promo posts later listed <rossulbricht@gmail.com>; Googled by IRS-CI (CAPTCHA IP leak story DISPUTED) |
| 2 | Sabu / LulzSec | 2011 | network, identity | network (DISPUTED) | Fox: logged into IRC once from his own IP; Sabu says an old IRC dox |
| 3 | Jeremy Hammond | 2012 | network, identity | human | Chatted with informant Sabu; revealed past arrests and prison time, matched to records |
| 4 | Eldo Kim / Harvard hoax | 2013 | network, identity | behavior | Used Tor on Harvard's logged Wi-Fi just before the threats; confessed |
| 5 | Freedom Hosting / Marques | 2013 | network, infra, money | infrastructure | Server IP found (method undisclosed); OVH server rented in his name |
| 6 | AlphaBay / Cazes | 2017 | network, identity, money | identity | Personal Hotmail in welcome/reset email headers; laptop seized unlocked |
| 7 | Silk Road 2.0 / Benthall | 2014 | network, identity, money | human (+infra) | HSI undercover on staff; server hosting account under <blake@benthall.net> |
| 8 | Playpen / Chase (+NIT) | 2014-15 | network, identity | infrastructure | Hidden service leaked its real US IP; FBI then used a Tor Browser exploit on users |
| 9 | Ardit Ferizi | 2015 | identity | network | Same Malaysian IP hit victim server and logged into his Twitter/Facebook |
| 10 | Guccifer 2.0 / GRU | 2016 | identity, network, money, infra | network (reported) | Daily Beast: forgot VPN once, Moscow IP; indictment: Moscow server searches + shared BTC pool |
| 11 | Welcome to Video / Son | 2018 | network, money | money | Bitcoin traced to KYC exchange; server IP also visible in page source |
| 12 | Twitter hack 2020 | 2020 | identity, money, network | money | Wallets traced to Coinbase/Binance KYC with driver's licenses; OGUsers DB leak linked IPs |
| 13 | Bitfinex / Lichtenstein & Morgan | 2022 | money, identity, infra | money | Funds hit real-name exchange accounts; cloud-storage warrant gave private keys |
| 14 | Lapsus$ / Kurtaj | 2022 | identity, network | human | Doxed by Doxbin rivals after leaking their data |
| 15 | Wazawaka / Matveev | 2022-23 | identity, network | identity | Reused passwords/emails led to VK, WHOIS and phone in his real name |
| 16 | LockBitSupp / Khoroshev | 2024 | network, identity, money, infra | infra/human (method UNVERIFIED) | Op Cronos seized servers/panel; NCA has not disclosed how; Krebs OSINT via old emails |
| 17 | Incognito / Rui-Siang Lin | 2024 | network, money, identity | money | Admin BTC swapped to XMR, landed in his KYC exchange account; Namecheap in real name |
| 18 | DPRK IT workers / Chapman | 2023-25 | network/infra, identity, money | human/infra | Laptop farm was a real US home; linked via Didenko network and employer records |
| 19 | PC遠隔操作事件 / 片山祐輔 | 2013-14 | network, device, identity | behavior | Enoshima security cameras caught him collaring the cat; later seen burying a phone |
