"use client";

import { useState } from "react";
import { Button, type ButtonVariant } from "@/components/atoms/Button";
import { EntityChip } from "@/components/atoms/EntityChip";
import { ValuePill } from "@/components/atoms/ValuePill";

/* ─────────────────────────────────────────────────────────
 * RECOMMENDATION CARD
 * The card holds its shape. Pressing "Alternatives" opens a
 * new drawer listing the other options; picking one promotes
 * it to the recommendation. The primary action confirms.
 * ───────────────────────────────────────────────────────── */

export type RecommendationOption = {
  key: string;
  body: React.ReactNode;
  short: string;
  signal: number;
  tone: string;
  label: string;
  cta: string;
  ctaVariant: ButtonVariant;
};

export type RecommendationLabels = {
  title: string;
  alternatives: string;
  otherOptions: string;
  accepted: string;
};

const DEFAULT_LABELS: RecommendationLabels = {
  title: "Quer que eu recomende participar desta licitação?",
  alternatives: "Alternativas",
  otherOptions: "Outras opções",
  accepted: "Aceito",
};

const OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Participar do Pregão Eletrônico{" "}
        <EntityChip name="042/2026 — Prefeitura de Osasco" />{" "}
        com prazo de habilitação <ValuePill tone="green">7 dias</ValuePill>
      </>
    ),
    short: "Pregão 042/2026 · prazo de 7 dias",
    signal: 3,
    tone: "var(--green)",
    label: "Alta confiança",
    cta: "Aceitar",
    ctaVariant: "accent",
  },
  {
    key: "review",
    body: (
      <>
        Revisar a proposta técnica para atender ao critério <ValuePill>Melhor técnica e preço</ValuePill> antes de submeter.
      </>
    ),
    short: "Revisar proposta técnica",
    signal: 2,
    tone: "var(--orange)",
    label: "Precisa de revisão",
    cta: "Configurar",
    ctaVariant: "primary",
  },
  {
    key: "none",
    body: (
      <>
        Acompanhar <span className="font-medium text-ink">sem submeter proposta</span> por enquanto.
      </>
    ),
    short: "Acompanhar sem submeter proposta",
    signal: 0,
    tone: "var(--ink-3)",
    label: "Sem sinal suficiente",
    cta: "Acompanhar mesmo assim",
    ctaVariant: "primary",
  },
];

function Meter({ signal, tone }: { signal: number; tone: string }) {
  return (
    <span className="flex items-end gap-0.5">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="w-1 rounded-full transition-colors duration-300"
          style={{ height: 10, background: bar < signal ? tone : "var(--line-strong)" }}
        />
      ))}
    </span>
  );
}

export default function RecommendationCard({
  options = OPTIONS,
  labels,
}: {
  options?: RecommendationOption[];
  labels?: Partial<RecommendationLabels>;
  variant?: string;
} = {}) {
  const t = { ...DEFAULT_LABELS, ...labels };
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const active = options[selected];
  const others = options.map((o, i) => ({ o, i })).filter(({ i }) => i !== selected);

  return (
    <div className="w-full max-w-95 overflow-hidden rounded-card bg-surface shadow-card">
      <div className="primitive-card-pad">
        <span className="text-[14px] font-medium text-ink">
          {t.title}
        </span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 text-[13px] leading-relaxed text-ink-2"
          style={{ animation: "fade-in 180ms ease-out both" }}
        >
          {active.body}
        </p>
      </div>

      {/* alternatives drawer — a distinctly new section of the card */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line bg-surface px-2 py-2">
            <p className="px-1.5 pb-1 text-[11px] font-medium text-ink-3">
              {t.otherOptions}
            </p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                onClick={() => {
                  setSelected(i);
                  setAccepted(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-control px-1.5 py-1.5
                  text-left transition-colors duration-100 hover:bg-hover"
              >
                <Meter signal={o.signal} tone={o.tone} />
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{o.short}</span>
                <span className="shrink-0 text-[11px] text-ink-3">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="primitive-card-footer flex items-center justify-between gap-3 bg-surface">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} tone={active.tone} />
          <span className="text-[12.5px] font-medium text-ink-2">{active.label}</span>
        </span>

        <span className="-mr-0.5 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="px-2.5 text-[12.5px]"
          >
            {t.alternatives}
          </Button>
          <Button
            variant={accepted ? "success" : active.ctaVariant}
            size="sm"
            onClick={() => setAccepted(true)}
            className="text-[12.5px]"
          >
            {accepted ? t.accepted : active.cta}
          </Button>
        </span>
      </div>
    </div>
  );
}
