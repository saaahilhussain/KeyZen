"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconUpload,
  IconRotate,
  IconSparkles,
  IconFileText,
} from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CornerBrackets } from "@/components/corner-brackets";
import { DEFAULT_CUSTOM_TEXT } from "@/lib/test-storage";
import { cn } from "@/lib/utils";

const MAX_CHARS = 20000;

interface CustomTextDialogProps {
  value: string;
  onSave: (next: string) => void;
  trigger: React.ReactNode;
}

export function CustomTextDialog({
  value,
  onSave,
  trigger,
}: CustomTextDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const words = draft.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = draft.length;
  const overLimit = charCount > MAX_CHARS;

  async function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".txt") && file.type !== "text/plain") {
      toast.error("only .txt files are supported");
      return;
    }
    if (file.size > MAX_CHARS * 4) {
      toast.error("file is too large");
      return;
    }
    try {
      const text = await file.text();
      setDraft(text);
      toast.success(`loaded ${file.name}`);
    } catch {
      toast.error("could not read file");
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    void handleFile(f);
  }

  function handleSave() {
    const cleaned = draft.trim();
    if (!cleaned) {
      toast.error("text cannot be empty");
      return;
    }
    if (overLimit) {
      toast.error(`text too long (${charCount}/${MAX_CHARS})`);
      return;
    }
    onSave(cleaned);
    toast.success("custom text saved");
    setOpen(false);
  }

  function resetToDefault() {
    setDraft(DEFAULT_CUSTOM_TEXT);
  }

  function clearAll() {
    setDraft("");
  }

  const dirty = draft !== value;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[860px] w-[min(860px,calc(100vw-2rem))] p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-0 md:grid md:grid-cols-[1.6fr_1fr]">
          {/* Left column: editor */}
          <div className="flex flex-col gap-3 border-b border-border p-5 md:border-r md:border-b-0">
            <DialogHeader className="gap-1">
              <DialogTitle className="font-(family-name:--font-doto) text-2xl font-bold tracking-wide">
                Custom Text
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Paste anything. Words split on whitespace. Test ends on the last word.
              </DialogDescription>
            </DialogHeader>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative flex-1"
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                spellCheck={false}
                placeholder="Paste your text here…"
                className={cn(
                  "font-mono block h-64 w-full resize-none rounded-md border border-border bg-background/40 p-3 text-sm leading-relaxed text-foreground",
                  "placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
                  overLimit && "border-destructive focus-visible:ring-destructive/40",
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute right-3 bottom-2 font-mono text-[10px] uppercase tracking-widest",
                  overLimit ? "text-destructive" : "text-muted-foreground/50",
                )}
              >
                {charCount}/{MAX_CHARS}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/60">
              <span>
                <span className="text-primary tabular-nums">{wordCount}</span> words
              </span>
              <span className="opacity-40">·</span>
              <span>
                <span className="text-primary tabular-nums">{charCount}</span> chars
              </span>
              {dirty && (
                <>
                  <span className="opacity-40">·</span>
                  <span className="text-primary">unsaved</span>
                </>
              )}
            </div>
          </div>

          {/* Right column: actions */}
          <div className="flex flex-col gap-4 p-5">
            <section className="flex flex-col gap-2">
              <h3 className="font-(family-name:--font-doto) text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Source
              </h3>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex items-center gap-3 rounded-md border border-dashed border-border px-3 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <IconUpload size={16} stroke={1.5} className="shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="font-medium text-foreground">Upload .txt</span>
                  <span className="text-[10px] text-muted-foreground/60">
                    or drop one onto the editor
                  </span>
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,text/plain"
                className="hidden"
                onChange={(e) => {
                  void handleFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </section>

            <div className="h-px bg-border" />

            <section className="flex flex-col gap-2">
              <h3 className="font-(family-name:--font-doto) text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Tools
              </h3>
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconSparkles size={14} stroke={1.5} />
                Load sample pangram
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconRotate size={14} stroke={1.5} />
                Clear editor
              </button>
            </section>

            <div className="h-px bg-border" />

            <section className="flex flex-col gap-2 text-[10px] leading-relaxed text-muted-foreground/60">
              <h3 className="font-(family-name:--font-doto) text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Tips
              </h3>
              <p className="flex items-start gap-1.5">
                <IconFileText size={11} className="mt-[1px] shrink-0 opacity-60" />
                Punctuation and casing are preserved.
              </p>
              <p className="flex items-start gap-1.5">
                <IconFileText size={11} className="mt-[1px] shrink-0 opacity-60" />
                Line breaks are collapsed into spaces.
              </p>
            </section>

            <div className="mt-auto flex flex-col gap-2 pt-2">
              <CornerBrackets className="inline-flex">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={overLimit || draft.trim().length === 0}
                  className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save and Start
                </button>
              </CornerBrackets>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-1 text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
