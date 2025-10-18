"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, FileText } from "lucide-react";
import { toast } from "sonner";

export default function NewWorkflowPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content }),
      });

      if (res.ok) {
        const workflow = await res.json();
        toast.success("Workflow created successfully!");
        router.push(`/workflows/${workflow.id}/edit`);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to create workflow");
      }
    } catch (error) {
      console.error("Failed to create workflow:", error);
      toast.error("Failed to create workflow");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-20 h-20 border border-white/20 bg-black flex items-center justify-center relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                <Plus className="w-10 h-10 relative z-10" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <button className="text-xs text-white/40 hover:text-white tracking-widest uppercase font-light mb-4 transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  Back to Workflows
                </button>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight tracking-tighter leading-none uppercase">
                  Create New Workflow
                </h1>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light">Workflow Details</h2>
                </div>
                <div className="p-8 space-y-8">
                  {/* Title */}
                  <div>
                    <label className="block text-xs text-white/40 tracking-widest uppercase font-light mb-3">
                      Title <span className="text-purple-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-4 border border-white/20 bg-black text-white text-lg font-light focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Enter workflow title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs text-white/40 tracking-widest uppercase font-light mb-3">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full p-4 border border-white/20 bg-black text-white text-sm font-light focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                      placeholder="Enter workflow description (optional)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light">
                    Initial Content <span className="text-purple-500">*</span>
                  </h2>
                </div>
                <div className="p-8">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[500px] bg-transparent text-white text-sm font-light leading-relaxed focus:outline-none resize-none"
                    placeholder="Start writing your workflow content..."
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group/submit relative disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/submit:-translate-x-[2px] group-hover/submit:-translate-y-[2px] disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" strokeWidth={1.5} />
                    Create Workflow
                  </>
                )}
              </div>
            </button>
            
            <button className="group/cancel relative">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative px-12 py-5 bg-black text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:-translate-x-[2px] hover:-translate-y-[2px]">
                Cancel
              </div>
            </button>
          </motion.div>
        </div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-8">
              <div className="flex items-start gap-4">
                <FileText className="w-5 h-5 text-white/40 shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <p className="text-xs text-white/40 tracking-widest uppercase font-light mb-2">Pro Tip</p>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    Use markdown formatting in your content for better organization. You can always edit and refine your workflow after creation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}