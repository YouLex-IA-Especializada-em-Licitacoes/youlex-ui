"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";

/* ─────────────────────────────────────────────────────────
 * CITATION CARD
 * A legal citation the agent grounds an answer on — lei/artigo,
 * jurisprudência (TCU/STJ), ou cláusula de edital — with the
 * async lifecycle of actually fetching that source text: it
 * can still be loading, come back empty (nothing selected yet),
 * or fail (source unreachable). Distinct from ContextCards
 * (already-retrieved chunks, always present): this is the
 * citation itself, before and while it resolves.
 * ───────────────────────────────────────────────────────── */

export type Citation = {
  reference: string;
  source: string;
  excerpt: string;
  kind: "lei" | "jurisprudencia" | "edital";
};

export type CitationCardLabels = {
  loading: string;
  empty: string;
  emptyHint: string;
  error: string;
  retry: string;
  openSource: string;
};

const DEFAULT_LABELS: CitationCardLabels = {
  loading: "Localizando a fonte…",
  empty: "Nenhuma citação selecionada",
  emptyHint: "Peça ao agente para fundamentar a resposta em lei, jurisprudência ou cláusula do edital.",
  error: "Não foi possível carregar esta citação",
  retry: "Tentar de novo",
  openSource: "Abrir fonte",
};

const DEFAULT_CITATION: Citation = {
  reference: "Lei nº 14.133/2021, art. 75, II",
  source: "Planalto — legislação federal",
  excerpt:
    "É dispensável a licitação para contratação que envolva valores inferiores a R$ 59.906,02, no caso de obras e serviços de engenharia ou de serviços de manutenção de veículos automotores.",
  kind: "lei",
};

const KIND_LABEL: Record<Citation["kind"], string> = {
  lei: "Lei",
  jurisprudencia: "Jurisprudência",
  edital: "Edital",
};

function ScaleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0zM5 8h6M13 8h6M8 21h8" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-95 overflow-hidden rounded-card bg-surface shadow-card">
      {children}
    </div>
  );
}

function LoadingBody({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-5 text-[13px] text-ink-2">
      <span className="relative flex size-3.5 shrink-0 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-accent" />
      </span>
      {label}
    </div>
  );
}

function EmptyBody({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-3.5 py-6 text-center">
      <span className="flex size-7 items-center justify-center rounded-full bg-inset text-ink-3">
        <InboxIcon />
      </span>
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <span className="max-w-64 text-[12px] leading-relaxed text-ink-3">{hint}</span>
    </div>
  );
}

function ErrorBody({
  label,
  retryLabel,
  onRetry,
}: {
  label: string;
  retryLabel: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-3.5 py-6 text-center">
      <span className="flex size-7 items-center justify-center rounded-full bg-red-tint text-red">
        <AlertIcon />
      </span>
      <span className="max-w-64 text-[12.5px] leading-relaxed text-ink-2">{label}</span>
      <Button variant="secondary" size="xs" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  );
}

export default function CitationCard({
  variant = "Padrão",
  citation = DEFAULT_CITATION,
  labels,
  className,
}: {
  variant?: string;
  citation?: Citation;
  labels?: Partial<CitationCardLabels>;
  className?: string;
} = {}) {
  const copy = { ...DEFAULT_LABELS, ...labels };
  const [retried, setRetried] = useState(false);
  const state = retried ? "Padrão" : variant;

  return (
    <div className={className}>
      <CardShell>
        <div className="primitive-card-bar flex items-center gap-2 border-b border-line">
          <span className="flex size-5 items-center justify-center rounded-[6px] bg-accent-tint text-accent-ink">
            <ScaleIcon />
          </span>
          <span className="text-[12.5px] font-medium text-ink-2">
            {state === "Padrão" ? KIND_LABEL[citation.kind] : "Citação"}
          </span>
        </div>

        {state === "Carregando" && <LoadingBody label={copy.loading} />}
        {state === "Vazio" && <EmptyBody label={copy.empty} hint={copy.emptyHint} />}
        {state === "Erro" && (
          <ErrorBody label={copy.error} retryLabel={copy.retry} onRetry={() => setRetried(true)} />
        )}
        {state === "Padrão" && (
          <div className="flex flex-col gap-2 px-3.5 py-3">
            <span className="text-[13px] font-semibold text-ink">{citation.reference}</span>
            <p className="text-[12.5px] leading-relaxed text-ink-2">“{citation.excerpt}”</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="truncate text-[11.5px] text-ink-3">{citation.source}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-accent-ink">
                {copy.openSource}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
              </span>
            </div>
          </div>
        )}
      </CardShell>
    </div>
  );
}
