"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Share, History, Clock, MessageSquare, User, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Workflow {
  id: string;
  title: string;
  description: string | null;
  content: string;
  isPublic: boolean;
  updatedAt: string;
  owner: { id: string; name: string; email: string };
  versions: { id: string; content: string; note: string; createdAt: string }[];
  comments: Array<{
    id: string;
    body: string;
    createdAt: string;
    user: { id: string; name: string; email: string };
  }>;
}

export default function ViewWorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Array<{
    id: string;
    body: string;
    createdAt: string;
    user: { id: string; name: string; email: string };
  }>>([]);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  useEffect(() => {
    fetchWorkflow();
    fetchComments();

    // Set up real-time polling every 30 seconds
    const interval = setInterval(() => {
      fetchWorkflow();
      fetchComments();
    }, 30000);

    return () => clearInterval(interval);
  }, [params.id]);

  const fetchWorkflow = async () => {
    try {
      const res = await fetch(`/api/workflows/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setWorkflow(data);
      } else if (res.status === 403) {
        toast.error("You don't have permission to view this workflow");
        router.push("/workflows");
      } else {
        toast.error("Workflow not found");
        router.push("/workflows");
      }
    } catch (error) {
      toast.error("Failed to load workflow");
      router.push("/workflows");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/workflows/${params.id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to load comments");
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setPostingComment(true);
    try {
      const res = await fetch(`/api/workflows/${params.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment }),
      });

      if (res.ok) {
        const comment = await res.json();
        setComments(prev => [...prev, comment]);
        setNewComment("");
        toast.success("Comment posted");
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  const handleShare = async () => {
    try {
      const res = await fetch(`/api/workflows/${params.id}/share`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const shareUrl = `${window.location.origin}/public/${data.token}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard");
      } else {
        toast.error("Failed to create share link");
      }
    } catch (error) {
      toast.error("Failed to create share link");
    }
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
                  View Workflow
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

                <Link href={`/workflows/${params.id}/edit`}>
                  <button className="group/btn relative bg-black">
                    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/btn:translate-x-[4px] group-hover/btn:translate-y-[4px]" />
                    <div className="px-6 py-3 bg-black text-white text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2">
                      <History className="w-4 h-4" strokeWidth={1.5} />
                      Edit
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content - 2/3 width */}
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
                <div className="p-12">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/80 text-sm font-light leading-relaxed whitespace-pre-line">
                      {workflow.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Workflow Details */}
            <div className="relative group mb-8">
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
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase font-light">Owner</p>
                    <p className="text-sm text-white/70 font-light mt-1">
                      {workflow.owner.name || workflow.owner.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase font-light">Visibility</p>
                    <p className="text-sm text-white/70 font-light mt-1">
                      {workflow.isPublic ? "Public" : "Private"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                    Comments ({comments.length})
                  </h2>
                </div>
                <div className="p-8">
                  {/* Add Comment */}
                  <div className="mb-6">
                    <div className="flex gap-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={3}
                        className="flex-1 p-3 border border-white/20 bg-black text-white text-sm font-light focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                      />
                      <button
                        onClick={handlePostComment}
                        disabled={postingComment || !newComment.trim()}
                        className="group/post relative disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-white/5 translate-x-[1px] translate-y-[1px] border border-white/20" />
                        <div className="relative p-3 bg-white text-black transition-transform duration-300 group-hover/post:-translate-x-[1px] group-hover/post:-translate-y-[1px]">
                          <Send className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  {comments.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1.5} />
                      <p className="text-white/40 text-sm font-light">No comments yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {comments.map((comment, index) => (
                        <div key={comment.id} className={`${index !== comments.length - 1 ? 'border-b border-white/10 pb-6' : ''}`}>
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col gap-1 mb-2">
                                <span className="text-sm font-light text-white truncate">
                                  {comment.user.name || comment.user.email}
                                </span>
                                <span className="text-xs text-white/40 font-mono">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-white/70 font-light leading-relaxed">
                                {comment.body}
                              </p>
                            </div>
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
      </div>
    </main>
  );
}
