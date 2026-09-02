export type Meta = {
  id: string;
  title: string;
  caption: string;
  file: string;
  variants?: string[];
  /** other files in this repo the component imports (ids in INTERNAL) — copy these too */
  deps?: string[];
  /** npm packages the component imports — install these */
  npm?: string[];
  /** shape of the real data this component needs to receive from the backend
   * (event/prop payload), for cards without a backend contract yet — see
   * docs/direcionamento/55_CONTRATO_BACKEND_CHAT_01-09-2026.md */
  dataShape?: string;
};

/** Shared building blocks that primitives import but that don't get their own
 * gallery card. Copy these alongside any component that lists them in `deps`. */
export const INTERNAL: Record<string, { title: string; path: string }> = {
  button: { title: "Button", path: "components/atoms/Button.tsx" },
  "glide-menu": { title: "GlideMenu", path: "components/primitives/GlideMenu.tsx" },
  "entity-chip": { title: "EntityChip", path: "components/atoms/EntityChip.tsx" },
  "value-pill": { title: "ValuePill", path: "components/atoms/ValuePill.tsx" },
  shimmer: { title: "Shimmer", path: "components/atoms/Shimmer.tsx" },
  "stream-text": { title: "StreamText", path: "components/atoms/StreamText.tsx" },
};

export const META: Meta[] = [
  {
    id: "loading-state",
    title: "Loading State",
    caption: "Pixel-grid loader with shimmer and elapsed time.",
    file: "LoadingState.tsx",
    variants: ["Drive", "Dots", "Orbit", "Surfer"],
    dataShape:
      "No backend contract needed — driven by an elapsed-time counter (ms since request start) that the caller ticks locally, plus the current phase label.",
  },
  {
    id: "thinking-state",
    title: "Thinking",
    caption: "Expandable traces — steps, reasoning, search, coding.",
    file: "ThinkingState.tsx",
    variants: ["Steps", "Reasoning", "Search", "Coding"],
    dataShape:
      "No backend contract today (YLX-208). Proposed stream event: {type: 'thinking', content: string, final?: boolean} intercalated with 'token', mapped to this component's Row[] (label + collapsible detail text). See docs/direcionamento/55_CONTRATO_BACKEND_CHAT_01-09-2026.md §3.1.",
  },
  {
    id: "streaming-text",
    title: "Streaming Text",
    caption: "Streamed answer with inline sources, actions, and follow-ups.",
    file: "StreamingText.tsx",
    dataShape:
      "StreamingToken[] ({text, cite?}) appended token-by-token from the existing 'token' SSE event; StreamingSource[] ({name, domain, href, image}) for inline citations, sourced today from the context-cards regex parser in useChat.ts (candidate for the same context_sources migration as ContextCards, below).",
  },
  {
    id: "approval-card",
    title: "Approval Card",
    caption: "Human-in-the-loop questions the agent asks before acting.",
    file: "ApprovalCard.tsx",
    deps: ["button", "glide-menu"],
    dataShape:
      "No backend contract today (YLX-206, alto custo — toca persistência de estado). Proposed: stream pauses on {type: 'approval_required', approval_id, prompt, options?: [{id,label}], context?} mapped to this component's ApprovalQuestion; decision posts to POST /api/v1/chat/threads/{thread_id}/approvals/{approval_id} {decision: 'approve'|'reject'|option_id, note?}. See doc §2.2.",
  },
  {
    id: "tool-chips",
    title: "Tool Chips",
    caption: "Code edits and tool calls as compact chips.",
    file: "ToolChips.tsx",
    dataShape:
      "ToolStep[]/ToolDiff[]/ToolDiffLine[] driven by the existing 'tool_start'/'tool_output' stream events — no new contract needed, this is a rendering of data already on the wire.",
  },
  {
    id: "task-rows",
    title: "Task Rows",
    caption: "Live agent task status — running, failed, completed.",
    file: "TaskRows.tsx",
    variants: ["Capsules", "List"],
    dataShape:
      "No backend contract today (YLX-207, condicional). Proposed: {type: 'plan_created', steps: [{id,label}]} once, then {type: 'plan_step_update', step_id, status: 'pending'|'running'|'done'|'failed'} per step, mapped to this component's TaskRow[]. Only meaningful if the agent plans ahead — see doc §2.3 ressalva.",
  },
  {
    id: "chat-composer",
    title: "Chat",
    caption: "Tabbed chat panel with reasoning replies and a composer.",
    file: "ChatComposer.tsx",
    dataShape:
      "ChatMessage[] (role, phase, content) built from the existing chat stream ('token' concatenation, 'message_finalize' to close a turn) — no new event needed for the composer shell itself.",
  },
  {
    id: "prompt-bar",
    title: "Prompt Bar",
    caption: "Composer with @ sources, / commands, model picker, and dictation.",
    file: "PromptBar.tsx",
    npm: ["glimm"],
    variants: ["Rounded", "Pill"],
    dataShape:
      "Local input state plus a Source[] list for the '@' picker (id/label/kind) — sourced from whatever document/thread index endpoint the app already uses to list attachable context, not from the chat stream.",
  },
  {
    id: "context-cards",
    title: "Context Cards",
    caption: "Retrieved knowledge chunks with their sources.",
    file: "ContextCards.tsx",
    dataShape:
      "ContextChunk[] (id, text). Today re-extracted client-side by regex from 'tool_output' prose (features/chat/hooks/useChat.ts, parseSources). Proposed (YLX-205, prioridade 1, custo baixo): structured event {type: 'context_sources', sources: [{id, text, score?, doc_type?: 'edital'|'jurisprudencia'|'outro'}]}, preferred when present, falling back to the regex parser until backend confirms it stopped emitting prose. See doc §2.1.",
  },
  {
    id: "diff-table",
    title: "Diff Table",
    caption: "AI-proposed edits sweeping through tabular data.",
    file: "DiffTable.tsx",
    deps: ["button"],
  },
  {
    id: "records-table",
    title: "Records Table",
    caption: "CRM-style grid with tags, sorting, and relationship status.",
    file: "RecordsTable.tsx",
    deps: ["glide-menu"],
  },
  {
    id: "filter-table",
    title: "Filter Table",
    caption: "Status chips that reorganize live data.",
    file: "FilterTable.tsx",
  },
  {
    id: "sidebar-nav",
    title: "Sidebar Nav",
    caption: "Collapsible workspace and chat navigation with gliding hover states.",
    file: "SidebarNav.tsx",
    deps: ["glide-menu"],
    npm: ["lucide-react"],
  },
  {
    id: "search",
    title: "Search",
    caption: "Command search with live filtering and an empty state.",
    file: "SearchList.tsx",
    deps: ["glide-menu"],
  },
  {
    id: "flowchart",
    title: "Flowchart",
    caption: "Workflow trigger and condition steps on a dotted canvas.",
    file: "Flowchart.tsx",
  },
  {
    id: "insight-cards",
    title: "Insight Cards",
    caption: "Paged agent insights with scrub-ready live charts.",
    file: "InsightCards.tsx",
    npm: ["liveline"],
  },
  {
    id: "code-block",
    title: "Code Block",
    caption: "A line-numbered listing and a unified diff.",
    file: "CodeBlock.tsx",
    variants: ["Code", "Diff"],
    dataShape:
      "CodePiece[]/DiffRow[] (text, add/del change markers) sourced from the existing 'tool_output' event when the tool is a file edit — same wire data as ToolChips' diff view, no new contract needed.",
  },
  {
    id: "fine-tune-card",
    title: "Fine-tune Card",
    caption: "The agent adjusts design properties in an inspector.",
    file: "FineTuneCard.tsx",
    deps: ["glide-menu"],
  },
  {
    id: "selection-actions",
    title: "Selection Actions",
    caption: "Highlight a passage and hand it to the agent to rewrite.",
    file: "SelectionActions.tsx",
    deps: ["button", "shimmer", "stream-text"],
    npm: ["lucide-react"],
  },
  {
    id: "citation-card",
    title: "Citation Card",
    caption: "Lei, jurisprudência ou cláusula de edital que fundamenta a resposta — com o ciclo de carregar, vazio e erro.",
    file: "CitationCard.tsx",
    variants: ["Padrão", "Carregando", "Vazio", "Erro"],
    deps: ["button"],
    dataShape:
      "Citation ({reference, source, excerpt, kind: 'lei'|'jurisprudencia'|'edital'}) resolvido de forma assíncrona pelo backend a partir da citação que o agente aponta na resposta; sem contrato de stream event ainda — candidato ao mesmo esforço de contrato descrito para ContextCards/StreamingText em docs/direcionamento/55_CONTRATO_BACKEND_CHAT_01-09-2026.md.",
  },
];
