import { describe, expect, it } from "vitest";
import { FIELDS, HOPS, OBSERVERS, ROUTES, SCENARIOS, type Scenario, verdict, view } from "../../src/lib/vantage.ts";

const onRoute = (s: Scenario) => ROUTES[s];

describe("view", () => {
  it("returns null for observers that are not on the route", () => {
    expect(view("direct", "guard")).toBeNull();
    expect(view("tor", "vpn")).toBeNull();
  });

  it("returns a complete record for every observer on every route", () => {
    for (const s of SCENARIOS) {
      for (const h of onRoute(s)) {
        const rec = view(s, h);
        expect(rec, `${s}/${h}`).not.toBeNull();
        for (const f of FIELDS) {
          expect(rec![f].text.en.length > 0 || rec![f].state === "hidden", `${s}/${h}/${f}`).toBe(true);
          expect(/[぀-ヿ一-鿿]/.test(rec![f].text.en), `${s}/${h}/${f} en has no Japanese`).toBe(false);
        }
      }
    }
  });

  it("never shows content to anyone but the website (HTTPS everywhere)", () => {
    for (const s of SCENARIOS) {
      for (const h of HOPS.filter((x) => x !== "site")) {
        const rec = view(s, h);
        if (rec) expect(rec.content.state, `${s}/${h}`).toBe("hidden");
      }
    }
  });

  it("hides the real address from the website once any anonymity hop is used", () => {
    for (const s of SCENARIOS.filter((x) => x !== "direct")) {
      expect(view(s, "site")!.src.state, s).toBe("visible");
    }
    expect(view("direct", "site")!.src.state).toBe("leak");
  });

  it("gives the Tor guard the VPN's address, not the person's, in VPN-then-Tor", () => {
    expect(view("tor", "guard")!.src.state).toBe("leak");
    expect(view("vpnTor", "guard")!.src.state).toBe("visible");
  });

  it("shows the logged-in account as a leak only in the login scenario", () => {
    expect(view("torLogin", "site")!.account.state).toBe("leak");
    expect(view("tor", "site")!.account.state).toBe("visible");
  });
});

describe("verdict", () => {
  it("the ISP alone identifies a direct visit", () => {
    expect(verdict("direct", ["isp"])).toBe("linked");
  });

  it("the VPN provider alone identifies a VPN user", () => {
    expect(verdict("vpn", ["vpn"])).toBe("linked");
    expect(verdict("vpn", ["isp"])).toBe("unlinked");
    expect(verdict("vpn", ["site"])).toBe("unlinked");
  });

  it("no single Tor relay or vantage point links a Tor user", () => {
    for (const o of OBSERVERS) {
      if (o === "global") continue;
      if (!onRoute("tor").includes(o as never)) continue;
      expect(verdict("tor", [o]), o).toBe("unlinked");
    }
  });

  it("guard and exit colluding can correlate Tor traffic by timing", () => {
    expect(verdict("tor", ["guard", "exit"])).toBe("correlatable");
    expect(verdict("tor", ["isp", "site"])).toBe("correlatable");
    expect(verdict("tor", ["middle", "exit"])).toBe("unlinked");
  });

  it("a global watcher correlates Tor, and simply sees a direct visit", () => {
    expect(verdict("tor", ["global"])).toBe("correlatable");
    expect(verdict("vpnTor", ["global"])).toBe("correlatable");
    expect(verdict("direct", ["global"])).toBe("linked");
  });

  it("in VPN-then-Tor the VPN provider replaces the ISP as the entry-side witness", () => {
    expect(verdict("vpnTor", ["guard", "exit"])).toBe("unlinked");
    expect(verdict("vpnTor", ["vpn", "exit"])).toBe("correlatable");
  });

  it("logging in defeats the whole network route", () => {
    expect(verdict("torLogin", ["site"])).toBe("linked");
  });

  it("an empty selection links nothing", () => {
    for (const s of SCENARIOS) expect(verdict(s, [])).toBe("unlinked");
  });
});

import { formatState, layersOn, parseState } from "../../src/lib/vantage.ts";

describe("layersOn", () => {
  it("is HTTPS only on a direct route", () => {
    expect(layersOn("direct", "person")).toBe(1);
    expect(layersOn("direct", "isp")).toBe(1);
    expect(layersOn("direct", "site")).toBe(0);
  });
  it("adds one layer up to the VPN server", () => {
    expect(layersOn("vpn", "isp")).toBe(2);
    expect(layersOn("vpn", "vpn")).toBe(1);
  });
  it("peels one Tor layer at each relay", () => {
    expect(layersOn("tor", "isp")).toBe(4);
    expect(layersOn("tor", "guard")).toBe(3);
    expect(layersOn("tor", "middle")).toBe(2);
    expect(layersOn("tor", "exit")).toBe(1);
  });
  it("stacks VPN and Tor", () => {
    expect(layersOn("vpnTor", "isp")).toBe(5);
    expect(layersOn("vpnTor", "vpn")).toBe(4);
  });
  it("is zero for hops not on the route", () => {
    expect(layersOn("direct", "guard")).toBe(0);
  });
});

describe("state hash", () => {
  it("round-trips", () => {
    const s = { scenario: "vpnTor" as const, observers: ["vpn" as const, "exit" as const] };
    expect(parseState(`#${formatState(s)}`)).toEqual(s);
  });
  it("drops observers that are not on the route and rejects unknown scenarios", () => {
    expect(parseState("#v=direct:guard,isp")).toEqual({ scenario: "direct", observers: ["isp"] });
    expect(parseState("#v=nope:isp")).toBeNull();
    expect(parseState("#other")).toBeNull();
    expect(parseState("#v=tor")).toEqual({ scenario: "tor", observers: [] });
  });
});
