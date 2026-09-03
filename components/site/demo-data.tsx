"use client";

/* ─────────────────────────────────────────────────────────
 * VITRINE DEMO DATA
 * The gallery is the only place that shows domain content by
 * default. Each primitive ships with no default data (YLX-287);
 * this file supplies the same showcase data the primitives used
 * to bake in, now wired through explicit props so the gallery
 * still renders exactly as before.
 * ───────────────────────────────────────────────────────── */

import type { ComponentProps } from "react";
import ContextCards, { type ContextChunk } from "@/components/primitives/ContextCards";
import FilterTable, { type TableRow } from "@/components/primitives/FilterTable";
import DiffTable, { type DiffRow } from "@/components/primitives/DiffTable";
import SearchList, { type SearchItem } from "@/components/primitives/SearchList";
import RecommendationCard, { type RecommendationOption } from "@/components/primitives/RecommendationCard";
import { EntityChip } from "@/components/atoms/EntityChip";
import { ValuePill } from "@/components/atoms/ValuePill";
import ApprovalCard, { type ApprovalQuestion } from "@/components/primitives/ApprovalCard";
import TaskRows, { type TaskRow } from "@/components/primitives/TaskRows";
import FineTuneCard, { type FineTuneField, type FineTuneState } from "@/components/primitives/FineTuneCard";
import ToolChips, { type ToolStep, type ToolDiff, type ToolDiffLine } from "@/components/primitives/ToolChips";
import Flowchart, { type StepNode } from "@/components/primitives/Flowchart";
import SidebarNav, { type SidebarRecent } from "@/components/primitives/SidebarNav";
import CitationCard, { type Citation } from "@/components/primitives/CitationCard";
import ChatComposer, { type ChatMessage } from "@/components/primitives/ChatComposer";
import StreamingText, { type StreamingToken, type StreamingSource } from "@/components/primitives/StreamingText";
import CodeBlock, { type DiffRow as CodeDiffRow } from "@/components/primitives/CodeBlock";
import InsightCards, { DEMO_PAGES as INSIGHT_CARDS_PAGES } from "@/components/primitives/InsightCards";
import RecordsTable, { DEMO_ROWS as RECORDS_TABLE_ROWS } from "@/components/primitives/RecordsTable";
import ThinkingState, { type ThinkingData } from "@/components/primitives/ThinkingState";
import SelectionActions, { type SelectionText } from "@/components/primitives/SelectionActions";

const CONTEXT_CHUNKS: ContextChunk[] = [
  {
    title: "Habilitação jurídica — cláusula 7.2",
    chars: "290 caracteres",
    body: "A comprovação de regularidade fiscal e trabalhista deve ser verificada antes da assinatura do contrato administrativo com o licitante vencedor.",
    source: "Edital de Pregão Eletrônico nº 014-2026.pdf",
    badge: "PDF",
    tone: "bg-red",
  },
  {
    title: "Jurisprudência — julgamento por lotes",
    chars: "1.250 caracteres",
    body: "TCU, Acórdão 2.622/2015: o julgamento por lotes só se justifica quando a divisão do objeto em itens for tecnicamente inviável, sob pena de restrição à competitividade.",
    source: "Acordao_TCU_2622-2015.csv",
    badge: "CSV",
    tone: "bg-green",
  },
];

export function ContextCardsDemo(props: ComponentProps<typeof ContextCards>) {
  return <ContextCards {...props} chunks={CONTEXT_CHUNKS} />;
}

const FILTER_TABLE_ROWS: TableRow[] = [
  { task: "Conferir edital nº 042/2026 — Pregão Eletrônico", date: "03 dez", status: "todo", owner: "Prefeitura de Osasco" },
  { task: "Elaborar impugnação de edital", date: "22 set", status: "progress", owner: "Secretaria de Saúde SP" },
  { task: "Cadastrar proposta no ComprasNet", date: "02 jan", status: "todo", owner: "Governo do Estado do RJ" },
  { task: "Revisar minuta de contrato administrativo", date: "08 nov", status: "progress", owner: "Câmara Municipal de Campinas" },
  { task: "Protocolar recurso administrativo", date: "14 abr", status: "done", owner: "Ministério da Infraestrutura" },
];

export function FilterTableDemo(props: { variant?: string }) {
  return <FilterTable {...props} rows={FILTER_TABLE_ROWS} />;
}

const DIFF_TABLE_ROWS: DiffRow[] = [
  { key: "clausula-multa", id: "Cláusula 8ª — Multa", dept: "Penalidades", email: "v3-recurso", removed: true },
  { key: "clausula-prazo", id: "Cláusula 4ª — Prazo de entrega", dept: "Execução", email: "v2-minuta", removed: true },
  { key: "clausula-garantia", id: "Cláusula 6ª — Garantia contratual", dept: "Execução", email: "v3-recurso", removed: false },
];

export function DiffTableDemo(props: ComponentProps<typeof DiffTable>) {
  return <DiffTable {...props} rows={DIFF_TABLE_ROWS} />;
}

const SEARCH_LIST_ITEMS: SearchItem[] = [
  "Jurisprudência sobre reequilíbrio econômico-financeiro",
  "Buscar editais de pregão eletrônico em aberto",
  "Comparar minutas de contrato administrativo",
  "Rascunhar recurso administrativo",
  "Verificar status de habilitação",
  "Auditar prazos de impugnação",
  "Arquivar licitações encerradas",
];

export function SearchListDemo(props: { variant?: string }) {
  return <SearchList {...props} items={SEARCH_LIST_ITEMS} />;
}

const RECOMMENDATION_OPTIONS: RecommendationOption[] = [
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

export function RecommendationCardDemo(props: ComponentProps<typeof RecommendationCard>) {
  return <RecommendationCard {...props} options={RECOMMENDATION_OPTIONS} />;
}

const APPROVAL_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "Deseja que eu prossiga com a impugnação ao edital?",
    type: "radio",
    options: ["Sim, protocolar impugnação", "Não, apenas registrar ressalva em ata", "Aguardar orientação do cliente"],
  },
  {
    q: "Quais anexos devo incluir na petição de recurso?",
    type: "check",
    options: ["Ata da sessão de julgamento", "Parecer técnico da área de engenharia", "Jurisprudência do TCU citada"],
  },
  {
    q: "Em qual processo devo aplicar esta minuta de contrato?",
    type: "radio",
    options: ["Pregão Eletrônico nº 014-2026", "Concorrência nº 002-2026", "Dispensa de Licitação nº 031-2026"],
  },
];

export function ApprovalCardDemo(props: ComponentProps<typeof ApprovalCard>) {
  return <ApprovalCard {...props} questions={APPROVAL_QUESTIONS} />;
}

const TASK_ROWS_DEMO: TaskRow[] = [
  {
    key: "verify",
    label: "Verificação de documentos de habilitação",
    amount: "12 documentos",
    status: "done",
    details: [
      { label: "Certidões negativas conferidas", meta: "12/12" },
      { label: "Documentos vencidos sinalizados", meta: "0" },
    ],
  },
  {
    key: "index",
    label: "Montar minuta de recurso administrativo",
    amount: "7 cláusulas",
    status: "running",
    step: 2,
    details: [
      { label: "Lendo edital de Pregão Eletrônico nº 014-2026", meta: "3 arquivos" },
      { label: "Avaliando risco de inabilitação", meta: "68%" },
    ],
  },
  {
    key: "draft",
    label: "Redigir petições",
    amount: "2 minutas",
    status: "sequence",
    step: 3,
    details: [
      { label: "Impugnação ao edital", meta: "rascunho" },
      { label: "Pedido de esclarecimento", meta: "rascunho" },
    ],
  },
];

export function TaskRowsDemo(props: ComponentProps<typeof TaskRows>) {
  return <TaskRows {...props} rows={TASK_ROWS_DEMO} />;
}

const FINE_TUNE_FIELDS: FineTuneField[] = [
  { key: "width", label: "W", value: 324, min: 40, max: 999 },
  { key: "height", label: "H", value: 96, min: 24, max: 999 },
  { key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
  { key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
];
const FINE_TUNE_OPTIONS = ["Cláusula padrão", "Cláusula específica", "Cláusula excepcional"];

export function FineTuneCardDemo(props: { variant?: string; onChange?: (state: FineTuneState) => void }) {
  return <FineTuneCard {...props} fields={FINE_TUNE_FIELDS} options={FINE_TUNE_OPTIONS} />;
}

const TOOL_CHIPS_STEPS: ToolStep[] = [
  {
    icon: "think", label: "Pensando", chip: "Planejando a estratégia recursal…", mono: false, detailMono: false,
    detail: [
      { text: "O prazo recursal de 3 dias úteis conta a partir da intimação em ata." },
      { text: "Há dois fundamentos: preço inexequível e restrição indevida de competitividade." },
    ],
  },
  {
    icon: "write", label: "Escrever 204 linhas", chip: "minuta_recurso.docx", mono: true, detailMono: true,
    detail: [
      { text: "+ Fundamento: art. 59, Lei 14.133/2021 — julgamento por lotes", tone: "add" },
      { text: "+ Pedido: reabertura do prazo para nova diligência", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Revisar e protocolar", chip: "protocolar_peticao.sh", mono: true, detailMono: true,
    detail: [
      { text: "✓ formatação da petição validada" },
      { text: "✓ 34 verificações concluídas" },
    ],
  },
  {
    icon: "read", label: "Ler imagem", chip: "grafico-prazos.png", mono: true, detailMono: false,
    detail: [
      { text: "1280 × 720 · gráfico de linha, três exercícios." },
      { text: "Prazo médio de julgamento sobe 12% até julho." },
    ],
  },
];

const TOOL_CHIPS_DIFFS: ToolDiff[] = [
  { file: "clausulas.css", add: 13, del: 0 },
  { file: "minuta_recurso.docx", add: 74, del: 41 },
  { file: "sumario.ts", add: 8, del: 2 },
];

const TOOL_CHIPS_DIFF_LINES: Record<string, ToolDiffLine[]> = {
  "clausulas.css": [
    { text: ".clausula-card {", tone: "ctx" },
    { text: "  gap: 14px;", tone: "del" },
    { text: "  gap: 12px;", tone: "add" },
    { text: "  container-type: inline-size;", tone: "add" },
    { text: "}", tone: "ctx" },
  ],
  "minuta_recurso.docx": [
    { text: "const fundamentos = art59(edital);", tone: "ctx" },
    { text: "const pedido = fundamentos;", tone: "del" },
    { text: "const pedido = fundamentos.filter(", tone: "add" },
    { text: "  (f) => f.prazo <= 3,", tone: "add" },
    { text: ");", tone: "add" },
  ],
  "sumario.ts": [
    { text: "export const tese = \"preco-inexequivel\";", tone: "del" },
    { text: "export const tese = \"restricao-competitividade\";", tone: "add" },
  ],
};

export function ToolChipsDemo(props: ComponentProps<typeof ToolChips>) {
  return <ToolChips {...props} steps={TOOL_CHIPS_STEPS} diffs={TOOL_CHIPS_DIFFS} diffLines={TOOL_CHIPS_DIFF_LINES} />;
}

const FLOWCHART_PURPLE = "var(--accent)";
const FLOWCHART_AMBER = "var(--orange)";
const FLOWCHART_NODES: StepNode[] = [
  {
    id: "trigger",
    row: 0,
    x: 0.5,
    w: 300,
    kind: { label: "Gatilho", hue: FLOWCHART_PURPLE },
    hue: FLOWCHART_PURPLE,
    title: "Nova licitação publicada",
    caption: "Disparado quando um novo edital é publicado",
  },
  {
    id: "cond",
    row: 1,
    x: 0.5,
    w: 356,
    kind: { label: "If / Else", hue: FLOWCHART_AMBER },
    condition: true,
  },
];

export function FlowchartDemo(props: { variant?: string }) {
  return <Flowchart {...props} steps={FLOWCHART_NODES} />;
}

const SIDEBAR_RECENTS: SidebarRecent[] = [
  { id: "editais", label: "Editais em análise" },
  { id: "urgentes", label: "Pendências urgentes de hoje" },
  { id: "ticket", label: "Chamado sobre edital nº 042/2026" },
  { id: "resumo", label: "Resumo da carga de trabalho" },
  { id: "encerrar", label: "Encerrar acompanhamento de licitação" },
  { id: "protocolo", label: "Protocolar recursos em lote" },
  { id: "recurso", label: "Propor minuta de recurso" },
  { id: "prazos", label: "Prazos da semana" },
];

export function SidebarNavDemo(props: { variant?: string }) {
  return <SidebarNav {...props} recents={SIDEBAR_RECENTS} />;
}

const CITATION_CARD_CITATION: Citation = {
  reference: "Lei nº 14.133/2021, art. 75, II",
  source: "Planalto — legislação federal",
  excerpt:
    "É dispensável a licitação para contratação que envolva valores inferiores a R$ 59.906,02, no caso de obras e serviços de engenharia ou de serviços de manutenção de veículos automotores.",
  kind: "lei",
};

export function CitationCardDemo(props: { variant?: string }) {
  return <CitationCard {...props} citation={CITATION_CARD_CITATION} />;
}

const CHAT_COMPOSER_MESSAGES: ChatMessage[] = [
  {
    label: "Histórico Processual",
    sub: "Dados do Edital",
    time: "4s",
    body: "Recuperei os 3 últimos julgamentos do TCU sobre julgamento por lotes para comparação.",
  },
  {
    label: "Comparação",
    sub: "Detecção de Tese",
    time: "2s",
    body: "A tese de restrição à competitividade tem 12% mais chance de acolhimento com picos em recursos recentes.",
  },
];
const CHAT_COMPOSER_SUGGESTIONS = ["Editais", "Jurisprudência"];

export function ChatComposerDemo(props: { variant?: string }) {
  return <ChatComposer {...props} messages={CHAT_COMPOSER_MESSAGES} suggestions={CHAT_COMPOSER_SUGGESTIONS} />;
}

const STREAMING_SOURCE_IMAGES = {
  scoop:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M20 36c0 7 5.4 12 12 12s12-5 12-12H20Z' fill='%23fff'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23bff3dd'/%3E%3Cpath d='M24 24c4-7 13-7 17 0' fill='none' stroke='%231f7a5f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
  trends:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232f6fec'/%3E%3Cpath d='M15 43 27 31l8 7 14-18' fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='49' cy='20' r='5' fill='%23bfe0ff'/%3E%3C/svg%3E",
  market:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23e56d24'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3Cpath d='M16 49h32' stroke='%23ffd6b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
};

const STREAMING_TOKENS: StreamingToken[] = [
  ..."O julgamento por lotes neste edital só se sustenta se a divisão do objeto em itens for tecnicamente inviável — do contrário, restringe indevidamente a competitividade."
    .split(" ")
    .map((text) => ({ text })),
  { text: "", cite: true },
  ..."O TCU já pacificou esse entendimento em precedentes recentes."
    .split(" ")
    .map((text) => ({ text })),
];

const STREAMING_SOURCES: StreamingSource[] = [
  { name: "Jurisprudência TCU", domain: "tcu.gov.br", href: "https://portal.tcu.gov.br/jurisprudencia/", image: STREAMING_SOURCE_IMAGES.scoop },
  { name: "Lei 14.133/2021", domain: "planalto.gov.br", href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm", image: STREAMING_SOURCE_IMAGES.trends },
  { name: "ComprasNet", domain: "comprasnet.gov.br", href: "https://www.gov.br/compras/pt-br", image: STREAMING_SOURCE_IMAGES.market },
];

const STREAMING_FOLLOW_UPS = [
  "Quais os prazos recursais aplicáveis a este edital",
  "Comparar este julgado com o Acórdão 2.622/2015",
];

export function StreamingTextDemo(props: ComponentProps<typeof StreamingText>) {
  return <StreamingText {...props} content={STREAMING_TOKENS} sources={STREAMING_SOURCES} followUps={STREAMING_FOLLOW_UPS} />;
}

const CODE_BLOCK_FILE = "calcula-prazo-recursal.ts";
const CODE_BLOCK_LINES = [
  "export async function calcularPrazoRecursal() {",
  '  const edital = await getEdital("pregao-014-2026");',
  "  const intimacao = await ata.fetch({ edital });",
  '  await prazo.registrar(intimacao, { dias: "3-uteis" });',
  "  if (!intimacao.publicada) return null;",
  "  return intimacao.dataLimite;",
  "}",
];
const CODE_BLOCK_DIFF: CodeDiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "export async function calcularPrazoRecursal() {" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: '  const edital = await getEdital("pregao-014-2026");' }] },
  { old: 3, cur: 3, type: "ctx", pieces: [{ text: "  const intimacao = await ata.fetch({ edital });" }] },
  { old: 4, cur: null, type: "del", pieces: [{ text: "  await prazo.registrar(intimacao, { dias: " }, { text: '"5-uteis"', change: "del" }, { text: " });" }] },
  { old: null, cur: 4, type: "add", pieces: [{ text: "  await prazo.registrar(intimacao, { dias: " }, { text: '"3-uteis"', change: "add" }, { text: " });" }] },
  { old: null, cur: 5, type: "add", pieces: [{ text: "  if (!intimacao.publicada) return null;" }] },
  { old: 5, cur: 6, type: "ctx", pieces: [{ text: "  return intimacao.dataLimite;" }] },
  { old: 6, cur: 7, type: "ctx", pieces: [{ text: "}" }] },
];

export function CodeBlockDemo(props: { variant?: string }) {
  return <CodeBlock {...props} lines={CODE_BLOCK_LINES} diff={CODE_BLOCK_DIFF} filename={CODE_BLOCK_FILE} />;
}

export function InsightCardsDemo(props: ComponentProps<typeof InsightCards>) {
  return <InsightCards {...props} pages={INSIGHT_CARDS_PAGES} />;
}

export function RecordsTableDemo(props: ComponentProps<typeof RecordsTable>) {
  return <RecordsTable {...props} rows={RECORDS_TABLE_ROWS} />;
}

const THINKING_VARIANTS: Record<string, ThinkingData> = {
  Steps: {
    active: "Pensando",
    done: "Pensou por 4 segundos",
    rows: [
      { primary: "Lendo o edital" },
      { primary: "Verificando prazos recursais" },
      { primary: "Comparando com jurisprudência do TCU", secondary: "6 acórdãos" },
      { primary: "Redigindo a minuta de recurso" },
    ],
  },
  Reasoning: {
    active: "Pensando",
    done: "Pensou por 4 segundos",
    rows: [
      { primary: "O edital exige atestado de capacidade técnica em quantidade superior à jurisprudência do TCU admite como razoável." },
      { primary: "Devo verificar o prazo decadencial antes de recomendar a impugnação." },
    ],
  },
  Search: {
    active: "Pesquisando na web",
    done: "Pesquisou na web",
    query: "acórdão TCU julgamento por lotes licitação",
    rows: [
      { primary: "TCU — Portal de Jurisprudência", secondary: "tcu.gov.br", href: "https://portal.tcu.gov.br/jurisprudencia/" },
      { primary: "Planalto — Lei 14.133/2021", secondary: "planalto.gov.br", href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm" },
      { primary: "ComprasNet — Editais", secondary: "comprasnet.gov.br", href: "https://www.gov.br/compras/pt-br" },
    ],
  },
  Coding: {
    active: "Executando ferramentas",
    done: "Executou 3 ferramentas",
    rows: [
      { primary: "Ler", secondary: "edital_pregao_014-2026.pdf", mono: true },
      { primary: "Editar", secondary: "minuta_recurso.docx", mono: true, add: 74, del: 41 },
      { primary: "Executar", secondary: "protocolar_peticao.sh", mono: true },
    ],
  },
};

export function ThinkingStateDemo(props: { variant?: string; onSettled?: () => void }) {
  const variant = props.variant ?? "Steps";
  return <ThinkingState {...props} data={THINKING_VARIANTS[variant] ?? THINKING_VARIANTS.Steps} />;
}

const SELECTION_ACTIONS_TEXT: SelectionText = {
  lead: "A contratada deverá cumprir o prazo estabelecido no edital. ",
  original: "Entregar o objeto em até 30 dias corridos, contados da assinatura do contrato, sob pena de multa.",
  rewrite: "Entregar o objeto em até 30 dias corridos, contados da assinatura do contrato, sob pena de multa diária de 0,5% sobre o valor total.",
};

export function SelectionActionsDemo(props: ComponentProps<typeof SelectionActions>) {
  return <SelectionActions {...props} text={SELECTION_ACTIONS_TEXT} />;
}
