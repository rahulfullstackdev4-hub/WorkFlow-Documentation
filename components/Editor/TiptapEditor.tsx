"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  Sparkles,
  FileText,
  MessageSquare
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Start writing your workflow...",
  className = "",
}: TiptapEditorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      Bold,
      Italic,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleAISuggest = useCallback(async () => {
    if (!editor) return;
    setIsLoading(true);
    try {
      const currentContent = editor.getText();
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "suggest", content: currentContent }),
      });

      if (res.ok) {
        const data = await res.json();
        const suggestions = JSON.parse(data.text);
        const suggestionText = suggestions.map((step: string, i: number) => `${i + 1}. ${step}`).join("\n");
        editor.commands.insertContent(`\n\nSuggested steps:\n${suggestionText}\n`);
        toast.success("AI suggestions added");
      } else {
        toast.error("Failed to get AI suggestions");
      }
    } catch {
      toast.error("Failed to get AI suggestions");
    } finally {
      setIsLoading(false);
    }
  }, [editor]);

  const handleAISummarize = useCallback(async () => {
    if (!editor) return;
    setIsLoading(true);
    try {
      const currentContent = editor.getText();
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "summarize", content: currentContent }),
      });

      if (res.ok) {
        const data = await res.json();
        editor.commands.insertContent(`\n\nSummary:\n${data.text}\n`);
        toast.success("Summary added");
      } else {
        toast.error("Failed to generate summary");
      }
    } catch {
      toast.error("Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  }, [editor]);

  const handleAIGenerate = useCallback(async () => {
    if (!editor) return;
    setIsLoading(true);
    try {
      const currentContent = editor.getText();
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", content: currentContent }),
      });

      if (res.ok) {
        const data = await res.json();
        editor.commands.insertContent(`\n\nGenerated content:\n${data.text}\n`);
        toast.success("Content generated");
      } else {
        toast.error("Failed to generate content");
      }
    } catch {
      toast.error("Failed to generate content");
    } finally {
      setIsLoading(false);
    }
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <BoldIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleAISuggest}
          disabled={isLoading}
          className="gap-1"
        >
          <Sparkles className="h-4 w-4" />
          Suggest Steps
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAISummarize}
          disabled={isLoading}
          className="gap-1"
        >
          <FileText className="h-4 w-4" />
          Summarize
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAIGenerate}
          disabled={isLoading}
          className="gap-1"
        >
          <MessageSquare className="h-4 w-4" />
          Generate
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[300px]"
        placeholder={placeholder}
      />
    </div>
  );
}
