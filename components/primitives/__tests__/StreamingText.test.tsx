import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { StreamTokens, type StreamingSource, type StreamingToken } from "../StreamingText";

/* YLX-287 §4.2 — every `cite` token rendered `sources[0]`, a literal index,
 * regardless of which source it actually referred to. StreamTokens consumes
 * `sources` in order instead; this asserts distinct cite tokens resolve to
 * distinct sources, not the same first one every time. */

function source(domain: string): StreamingSource {
  return { name: domain, domain, href: `https://${domain}`, image: "" };
}

describe("StreamTokens (StreamingText §4.2)", () => {
  test("each cite token consumes the next source, not always sources[0]", () => {
    const tokens: StreamingToken[] = [
      { text: "a" },
      { text: "", cite: true },
      { text: "b" },
      { text: "", cite: true },
    ];
    const sources = [source("one.gov.br"), source("two.gov.br")];
    const html = renderToStaticMarkup(<StreamTokens tokens={tokens} sources={sources} />);
    const oneIndex = html.indexOf("one.gov.br");
    const twoIndex = html.indexOf("two.gov.br");
    expect(oneIndex).toBeGreaterThan(-1);
    expect(twoIndex).toBeGreaterThan(-1);
    expect(oneIndex).toBeLessThan(twoIndex);
  });

  for (const count of [0, 1, 2, 5]) {
    test(`renders exactly ${count} word token(s) for ${count} input(s)`, () => {
      const tokens: StreamingToken[] = Array.from({ length: count }, (_, i) => ({ text: `w${i}` }));
      const html = renderToStaticMarkup(<StreamTokens tokens={tokens} sources={[]} />);
      expect((html.match(/w\d+/g) ?? []).length).toBe(count);
    });
  }
});
