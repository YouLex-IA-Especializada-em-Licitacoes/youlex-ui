import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import InsightCards, {
  CompareCard,
  AnomalyCard,
  AllocationCard,
} from "../InsightCards";

/* YLX-287 (remate) — o default de `series`/`data`/`segments` era a constante
 * de vitrine, e o delta em AnomalyCard estava cravado no JSX ignorando
 * qualquer prop. Sem prop nenhuma, nada com "R$" pode aparecer na saída. */

describe("InsightCards sem prop nenhuma (YLX-287)", () => {
  test("InsightCards() não renderiza R$", () => {
    const html = renderToStaticMarkup(<InsightCards />);
    expect(html).not.toContain("R$");
  });

  test("CompareCard() não renderiza R$", () => {
    const html = renderToStaticMarkup(<CompareCard />);
    expect(html).not.toContain("R$");
  });

  test("AnomalyCard() não renderiza R$", () => {
    const html = renderToStaticMarkup(<AnomalyCard />);
    expect(html).not.toContain("R$");
  });

  test("AllocationCard() não renderiza R$", () => {
    const html = renderToStaticMarkup(<AllocationCard />);
    expect(html).not.toContain("R$");
  });
});
