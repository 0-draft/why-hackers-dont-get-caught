# One worked example, one vocabulary

Every network, device, identity and basics figure shows the same scene, so each new figure is a new view of something the reader already knows. Use these values and these words; do not invent new ones.

## The scene

| thing | value |
| --- | --- |
| the person's home connection (public IP) | `198.51.100.23` |
| the person's laptop on the home network | `192.168.1.10` |
| a shared carrier-grade NAT address, when NAT is the topic | `100.64.12.7` (port `40123`) |
| the website | `forum.example` |
| the website's server | `203.0.113.10` |
| the VPN server | `203.0.113.80` |
| Tor guard / middle / exit | `192.0.2.14` / `192.0.2.77` / `192.0.2.201` |
| DNS resolver | `192.0.2.53` |
| a pseudonymous account | `anon_4471` |
| an account in the person's real name | `taro.yamada` |
| a timestamp | `2026-03-14 03:14:07 UTC` |

## Words

| concept | English | 日本語 (本文) | 日本語 (図の短いラベル) |
| --- | --- | --- | --- |
| the person being hidden | the person | 本人 | 本人 |
| website | website | Web サイト | サイト |
| Internet service provider | ISP | ISP | ISP |
| VPN operator | VPN provider | VPN 事業者 | VPN |
| Tor entry relay | guard (guard relay) | ガードリレー | ガード |
| Tor middle relay | middle relay | 中間リレー | 中間 |
| Tor exit relay | exit (exit relay) | 出口リレー | 出口 |
| the five fields of the record | sender address, destination, content, timing and volume, account | 送信元アドレス、宛先、中身、時刻と量、アカウント | 送信元、宛先、中身、時刻、アカウント |
| an observer watching every link | global watcher | 全経路の監視者 | 全経路の監視者 |
| matching flows by timing | traffic correlation | トラフィック相関 | 相関 |

## Marks

The three marks keep one meaning each, everywhere: black bar = hidden from the observer in question; yellow = readable to them; magenta = points at the real person. Any other category (on a blocklist, active hour, ranked 2–20, a cluster before it has a name, a network cloud) uses ink outline, hatch or grey, never one of the three marks.

## Defaults

A reader who never clicks must still get the caption's claim from the default state of an interactive figure. Prefer side-by-side small multiples to a toggle when there are two or three states.
