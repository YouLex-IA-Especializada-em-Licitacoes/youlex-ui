"use client";

import type { ComponentType } from "react";
import { META, type Meta } from "./meta";
import LoadingState from "@/components/primitives/LoadingState";
import PromptBar from "@/components/primitives/PromptBar";
import { ContextCardsDemo, FilterTableDemo, DiffTableDemo, SearchListDemo, RecommendationCardDemo, ApprovalCardDemo, TaskRowsDemo, FineTuneCardDemo, ToolChipsDemo, FlowchartDemo, SidebarNavDemo, CitationCardDemo, ChatComposerDemo, StreamingTextDemo, CodeBlockDemo, InsightCardsDemo, RecordsTableDemo, ThinkingStateDemo, SelectionActionsDemo } from "@/components/site/demo-data";

export type Entry = Meta & { Demo: ComponentType<{ variant?: string }> };

const DEMOS: Record<string, ComponentType<{ variant?: string }>> = {
  "loading-state": LoadingState,
  "thinking-state": ThinkingStateDemo,
  "streaming-text": StreamingTextDemo,
  "chat-composer": ChatComposerDemo,
  "prompt-bar": PromptBar,
  "approval-card": ApprovalCardDemo,
  "task-rows": TaskRowsDemo,
  "recommendation-card": RecommendationCardDemo,
  "context-cards": ContextCardsDemo,
  "diff-table": DiffTableDemo,
  "fine-tune-card": FineTuneCardDemo,
  "filter-table": FilterTableDemo,
  "records-table": RecordsTableDemo,
  "sidebar-nav": SidebarNavDemo,
  "flowchart": FlowchartDemo,
  "insight-cards": InsightCardsDemo,
  "code-block": CodeBlockDemo,
  "tool-chips": ToolChipsDemo,
  "search": SearchListDemo,
  "selection-actions": SelectionActionsDemo,
  "citation-card": CitationCardDemo,
};

export const REGISTRY: Entry[] = META.map((m) => ({ ...m, Demo: DEMOS[m.id] }));
