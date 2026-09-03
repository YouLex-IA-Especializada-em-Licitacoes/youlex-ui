import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatMessageList, type ChatMessage } from "../ChatComposer";

/* YLX-287 §4.2 — ChatComposer used to render only messages[0]/messages[1]
 * (a literal index), so passing more than two messages silently dropped
 * the rest. ChatMessageList iterates instead; this asserts the rendered
 * reply count always matches the input length, not a hardcoded ceiling. */

function makeMessages(count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, i) => ({
    label: `Label ${i}`,
    sub: `Sub ${i}`,
    time: `${i}s`,
    body: `Body ${i}`,
  }));
}

function countRendered(count: number): number {
  const html = renderToStaticMarkup(<ChatMessageList messages={makeMessages(count)} />);
  return (html.match(/Label \d+/g) ?? []).length;
}

describe("ChatMessageList (ChatComposer §4.2)", () => {
  for (const count of [0, 1, 2, 5]) {
    test(`renders exactly ${count} message(s) for ${count} input(s)`, () => {
      expect(countRendered(count)).toBe(count);
    });
  }
});
