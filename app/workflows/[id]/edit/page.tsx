"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/Editor/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Share, History, Clock, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { debounce } from "lodash";

interface Workflow {
  id: string;
  title: string;
  description: string | null;
  content: string;
  isPublic: boolean;
  updatedAt: string;
  versions: { id: string; content: string; note: string; createdAt: string }[];
}

export default function EditWorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchWorkflow();
  }, [params.id]);

  const fetchWorkflow = async () => {
    try {
      const res = await fetch(`/api/workflows/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setWorkflow(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setContent(data.content);
      } else if (res.status === 403) {
        toast.error("You don't have permission to edit this workflow");
        router.push("/workflows");
      } else {
        toast.error("Workflow not found");
        router.push("/workflows");
      }
    } catch {
      toast.error("Failed to load workflow");
      router.push("/workflows");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSave = useCallback(
    debounce(async (updatedData: { title: string; description: string; content: string }) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/workflows/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (res.ok) {
          setWorkflow(prev => prev ? { ...prev, ...updatedData } : null);
          toast.success("Auto-saved");
        } else {
          toast.error("Failed to save changes");
        }
      } catch {
        toast.error("Failed to save changes");
      } finally {
        setSaving(false);
      }
    }, 2000),
    [params.id]
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    debouncedSave({ title: newTitle, description, content });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    debouncedSave({ title, description: newDescription, content });
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    debouncedSave({ title, description, content: newContent });
  };

  const handleShare = async () => {
    try {
      const res = await fetch(`/api/workflows/${params.id}/share`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const shareUrl = `${window.location.origin}/public/${data.token}`;
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Share link copied to clipboard");
        } catch (clipboardError) {
          // Fallback: show the URL in the toast if clipboard fails
          toast.success(`Share link created: ${shareUrl}`);
        }
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        toast.error(`Failed to create share link: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Failed to create share link");
    }
  };

  const handleHistory = () => {
    setShowHistory(true);
  };



  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-2 border-white/20 border-t-purple-500 mx-auto mb-6 animate-spin" />
          <p className="text-white/60 text-sm tracking-widest uppercase font-light">Loading Workflow...</p>
        </div>
      </main>
    );
  }

  if (!workflow) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60 text-lg tracking-widest uppercase font-light">Workflow Not Found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
              <div className="flex-1">
                <Link href="/workflows">
                  <button className="text-xs text-white/40 hover:text-white tracking-widest uppercase font-light mb-4 transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    Back to Workflows
                  </button>
                </Link>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight tracking-tighter leading-none uppercase">
                  Edit Workflow
                </h1>
              </div>

              <div className="flex flex-wrap gap-[2px] bg-white/10 border border-white/10">
                <button
                  onClick={handleShare}
                  className="group/btn relative bg-black"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/btn:translate-x-[4px] group-hover/btn:translate-y-[4px]" />
                  <div className="px-6 py-3 bg-black text-white text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2">
                    <Share className="w-4 h-4" strokeWidth={1.5} />
                    Share
                  </div>
                </button>

                <Link href={`/workflows/${params.id}`}>
                  <button className="group/btn relative bg-black">
                    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/btn:translate-x-[4px] group-hover/btn:translate-y-[4px]" />
                    <div className="px-6 py-3 bg-black text-white text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2">
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                      View
                    </div>
                  </button>
                </Link>

                <button
                  onClick={handleHistory}
                  className="group/btn relative bg-black"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/btn:translate-x-[4px] group-hover/btn:translate-y-[4px]" />
                  <div className="px-6 py-3 bg-black text-white text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2">
                    <History className="w-4 h-4" strokeWidth={1.5} />
                    History
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Editor - 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light">Workflow Content</h2>
                </div>
                <div className="p-8">
                  <TiptapEditor
                    content={content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Workflow Details */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light">Workflow Details</h2>
                </div>
                <div className="p-8 space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-xs text-white/40 tracking-widest uppercase font-light mb-3">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter workflow title"
                      className="w-full p-4 border border-white/20 bg-black text-white text-sm font-light focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-xs text-white/40 tracking-widest uppercase font-light mb-3">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      placeholder="Enter workflow description"
                      rows={4}
                      className="w-full p-4 border border-white/20 bg-black text-white text-sm font-light focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase font-light">Last Updated</p>
                    <p className="text-sm text-white/70 font-mono mt-1">
                      {new Date(workflow.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {saving && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-white/60 tracking-wide font-light flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-purple-600 animate-pulse" />
                      Auto-saving changes...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative border border-white/10 bg-black">
                  <div className="p-8 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-light tracking-widest uppercase">Version History</h2>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {workflow.versions.length === 0 ? (
                      <p className="text-white/60 text-center py-8">No versions found</p>
                    ) : (
                      <div className="space-y-4">
                        {workflow.versions.map((version, index) => (
                          <div key={version.id} className="border border-white/10 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-sm font-light tracking-widest uppercase text-white/60">
                                  Version {workflow.versions.length - index}
                                </h3>
                                <p className="text-xs text-white/40 mt-1">
                                  {new Date(version.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  setContent(version.content);
                                  setTitle(workflow.title);
                                  setDescription(workflow.description || "");
                                  setShowHistory(false);
                                  toast.success("Restored to this version");
                                }}
                              >
                                Restore
                              </Button>
                            </div>
                            {version.note && (
                              <p className="text-sm text-white/70 mb-4 italic">
                                &ldquo;{version.note}&rdquo;
                              </p>
                            )}
                            <div className="bg-black/50 p-4 border border-white/10 max-h-32 overflow-y-auto">
                              <div
                                className="text-sm text-white/70 prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: version.content.slice(0, 200) + (version.content.length > 200 ? '...' : '') }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
