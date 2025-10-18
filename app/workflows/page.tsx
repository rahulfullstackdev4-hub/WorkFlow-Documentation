"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText, Calendar, Eye, Lock, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";

interface Workflow {
  id: string;
  title: string;
  description: string | null;
  content: string;
  isPublic: boolean;
  updatedAt: string;
  versions: { id: string; content: string; note: string; createdAt: string }[];
  comments: { id: string; body: string; createdAt: string; user: { id: string; name: string; email: string } }[];
}

export default function WorkflowsPage() {
  const [search, setSearch] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: workflows, error, isLoading, mutate } = useSWR("/api/workflows", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true, // Revalidate when window gains focus
    revalidateOnReconnect: true, // Revalidate on network reconnect
  });
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this workflow?")) return;

    try {
      const res = await fetch(`/api/workflows/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        mutate(); // Revalidate the data after deletion
        toast.success("Workflow deleted successfully");
      } else {
        toast.error("Failed to delete workflow");
      }
    } catch (error) {
      console.error("Failed to delete workflow");
      toast.error("Failed to delete workflow");
    }
  };

  const filteredWorkflows = workflows?.filter((w: Workflow) =>
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.description?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-2 border-white/20 border-t-purple-500 mx-auto mb-6 animate-spin" />
          <p className="text-white/60 text-sm tracking-widest uppercase font-light">Loading Workflows...</p>
        </div>
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
              <div>
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Workspace</div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-none uppercase">
                  My Workflows
                </h1>
              </div>
              <Link href="/workflows/new">
                <button className="group/btn relative inline-block">
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                  <div className="relative px-10 py-4 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px] flex items-center gap-3">
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    New Workflow
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="relative group max-w-2xl">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-6 flex items-center gap-4">
              <Search className="w-5 h-5 text-white/40" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search workflows..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm font-light tracking-wide"
              />
            </div>
          </div>
        </motion.div>

        {/* Workflows Grid */}
        {filteredWorkflows.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-20 text-center">
              <div className="w-24 h-24 border border-white/20 flex items-center justify-center mx-auto mb-8">
                <FileText className="w-12 h-12 text-white/40" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">No Workflows Found</h3>
              <p className="text-white/60 text-sm font-light tracking-wide mb-8">
                {search ? "Try adjusting your search terms." : "Create your first workflow to get started."}
              </p>
              {!search && (
                <Link href="/workflows/new">
                  <button className="group/btn relative inline-block">
                    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                    <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px] flex items-center gap-3">
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                      Create Workflow
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
              {filteredWorkflows.map((workflow: Workflow, index: number) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-black cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                  <div className="p-10 h-full flex flex-col">
                    {/* Header with Status */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        {workflow.isPublic ? (
                          <Eye className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                        ) : (
                          <Lock className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                        )}
                        <span className="text-xs text-white/40 tracking-widest uppercase font-light">
                          {workflow.isPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                        <span className="text-xs text-white/60 font-mono">
                          {new Date(workflow.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-light tracking-tight mb-4 line-clamp-2 leading-tight">
                      {workflow.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm font-light leading-relaxed line-clamp-3 mb-8">
                      {workflow.description}
                    </p>

                    {/* Footer Stats */}
                    <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/40 tracking-widest uppercase font-light mb-1">Versions</div>
                        <div className="text-lg font-light">{workflow.versions.length}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 tracking-widest uppercase font-light mb-1">Comments</div>
                        <div className="text-lg font-light">{workflow.comments.length}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-[2px] bg-white/10 border border-white/10 mt-6">
                      <Link href={`/workflows/${workflow.id}/edit`}>
                        <button className="px-4 py-3 bg-white text-black text-center text-xs font-light tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(workflow.id);
                        }}
                        className="px-4 py-3 bg-black text-white text-center text-xs font-light tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
