"use client";

import { useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * CHAT — interactive panel with tabs, replies, and composer.
 * The reply sequence begins only after the user sends.
 * ───────────────────────────────────────────────────────── */

/* one scripted agent reply in the thread */
export type ChatMessage = {
  label: string;
  sub: string;
  time: string;
  body: string;
};

export type ChatComposerLabels = {
  /** the pre-filled prompt shown in the first user bubble */
  initialPrompt: string;
  /** composer input placeholder */
  placeholder: string;
};

const DEFAULT_LABELS: ChatComposerLabels = {
  initialPrompt: "Compare este edital com o julgamento do TCU do ano passado",
  placeholder: "Pergunte algo ou marque um documento com @",
};

function Section({
  label,
  sub,
  time,
  body,
  delayMs = 0,
}: {
  label: string;
  sub: string;
  time: string;
  body: string;
  /** purely visual stagger between replies — never gates whether a reply renders */
  delayMs?: number;
}) {
  return (
    <div
      className="flex w-full flex-col gap-1.5"
      style={{
        animation: `fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${delayMs}ms both`,
      }}
    >
      <div className="flex items-center gap-1 text-[12px] leading-[1.3]">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-2">{sub}</span>
        <span className="text-ink">em {time}</span>
      </div>
      <p className="text-[13px] leading-normal text-ink">{body}</p>
    </div>
  );
}

/** Pure iteration over `messages` — extracted so the 0/1/2/5-entry
 * behaviour is testable without simulating the send interaction. */
export function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <>
      {messages.map((message, i) => (
        <Section
          key={i}
          label={message.label}
          sub={message.sub}
          time={message.time}
          body={message.body}
          delayMs={i * 150}
        />
      ))}
    </>
  );
}

export default function ChatComposer({
  messages = [],
  suggestions = [],
  labels,
  onSend,
}: {
  variant?: string;
  /** scripted agent replies revealed after the user sends */
  messages?: ChatMessage[];
  /** header chips (tabs) for switching context */
  suggestions?: string[];
  /** prominent copy strings */
  labels?: Partial<ChatComposerLabels>;
  /** fired with the trimmed prompt text when the user sends */
  onSend?: (text: string) => void;
} = {}) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState(l.initialPrompt);
  const [tab, setTab] = useState(suggestions[0] ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const canSend = draft.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    const text = draft.trim();
    setSubmitted(text);
    onSend?.(text);
    setDraft("");
    setSent(true);
  };

  return (
    <div className="flex h-[288px] w-full max-w-95 flex-col self-start overflow-hidden rounded-[14px] bg-surface shadow-card">
      {/* header — tabs + actions */}
      <div className="flex shrink-0 items-center justify-between border-b border-line p-1.5">
        <div className="flex items-center">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={`rounded-[6px] px-2 py-[3px] text-[13px] text-ink transition-[background-color,opacity] duration-100 ${tab === item ? "bg-field" : "opacity-50 hover:opacity-75"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[
            <path key="p" d="M12 5v14M5 12h14" />,
            <g key="h"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
            <g key="e" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></g>,
          ].map((icon, i) => (
            <button
              key={i}
              type="button"
              aria-label="Action"
              className="flex size-6 items-center justify-center rounded-[6px] text-ink-3
                transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* conversation — fixed region so the card never changes shape */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
        {/* user bubble — right aligned, soft block */}
        <div className="flex justify-end pl-14">
          <div
            className="rounded-xl bg-field px-3 py-1.5 text-[13px] leading-[1.4] text-ink
              transition-[opacity,transform] duration-300"
            style={{
              opacity: sent ? 1 : 0,
              transform: sent ? "translateY(0)" : "translateY(10px)",
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {submitted}
          </div>
        </div>

        {sent && <ChatMessageList messages={messages} />}
      </div>

      {/* composer */}
      <div className="mt-auto shrink-0 p-1.5">
        <div
          role="presentation"
          onClick={() => inputRef.current?.focus()}
          className="flex cursor-text flex-col gap-2 rounded-control border border-line bg-field p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.035)] transition-[border-color,box-shadow] duration-150 focus-within:border-line-strong focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.025)]"
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send();
            }}
            placeholder={l.placeholder}
            aria-label="Chat prompt"
            className="min-h-4.5 bg-transparent text-[13px] leading-[1.4] text-ink outline-none placeholder:text-ink-3"
          />
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={send}
              className="flex size-7 items-center justify-center rounded-[8px]
                transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]"
              style={{
                background: canSend ? "var(--ink)" : "var(--line-strong)",
                color: canSend ? "var(--surface)" : "var(--ink-2)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
