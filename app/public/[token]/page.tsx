"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, MessageSquare, Eye, Clock } from "lucide-react";

interface PublicWorkflow {
  id: string;
  title: string;
  description: string | null;
  content: string;
  isPublic: boolean;
  updatedAt: string;
  owner: { id: string; name: string; email: string };
  comments: Array<{
    id: string;
    body: string;
    createdAt: string;
    user: { id: string; name: string; email: string };
  }>;
}

export default function PublicWorkflowPage() {
  const token = "sample-token";
  const [workflow, setWorkflow] = useState<PublicWorkflow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflow();
  }, [token]);

  const fetchWorkflow = async () => {
    try {
      // Mock workflow data
      const mockWorkflow: PublicWorkflow = {
        id: "1",
        title: "Employee Onboarding Process",
        description: "Complete guide for onboarding new team members with step-by-step procedures and best practices",
        content: "# Onboarding Process\n\n## Step 1: Pre-boarding\n\nBefore the new employee's first day:\n- Send welcome email with company information\n- Prepare workspace and necessary equipment\n- Order laptop, monitor, and office supplies\n- Set up email accounts and system access\n\n## Step 2: First Day\n\nMake a great first impression:\n- Office tour and facility introduction\n- Team introductions and meet-and-greet\n- System setup and software installation\n- Review of company policies and procedures\n\n## Step 3: First Week\n\nEstablish foundation:\n- Comprehensive training sessions\n- Shadow experienced team members\n- Review company culture and values\n- Set initial goals and expectations\n\n## Step 4: First Month\n\nBuild momentum:\n- Weekly check-ins with manager\n- Department-specific training\n- Introduction to ongoing projects\n- Performance review and feedback session",
        isPublic: true,
        updatedAt: new Date().toISOString(),
        owner: { id: "1", name: "Sarah Johnson", email: "sarah@example.com" },
        comments: [
          {
            id: "1",
            body: "Great workflow! Very comprehensive and easy to follow.",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            user: { id: "2", name: "Michael Chen", email: "michael@example.com" }
          },
          {
            id: "2",
            body: "We've implemented this at our company. Works perfectly!",
            createdAt: new Date(Date.now() - 43200000).toISOString(),
            user: { id: "3", name: "Emily Rodriguez", email: "emily@example.com" }
          },
        ],
      };
      
      setWorkflow(mockWorkflow);
    } catch (error) {
      console.error("Failed to load workflow");
    } finally {
      setLoading(false);
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
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
        
        <div className="relative z-10 text-center max-w-2xl px-6">
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10" />
            <div className="w-24 h-24 border border-white/20 flex items-center justify-center mx-auto mb-8">
              <Eye className="w-12 h-12 text-white/40" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-extralight mb-4 tracking-tighter uppercase">Workflow Not Found</h1>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
              This workflow may not exist or is no longer public.
            </p>
            <button className="group relative inline-block">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative px-10 py-4 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                Go Home
              </div>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <button className="text-xs text-white/40 hover:text-white tracking-widest uppercase font-light transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to Home
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/5 translate-x-[1px] translate-y-[1px]" />
                  <div className="relative px-4 py-2 bg-black border border-white/20 text-xs text-white/80 tracking-wide font-light uppercase flex items-center gap-2">
                    <Eye className="w-3 h-3" strokeWidth={1.5} />
                    Public
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight mb-6 tracking-tighter leading-none">
                {workflow.title}
              </h1>
              
              {workflow.description && (
                <p className="text-lg text-white/60 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                  {workflow.description}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-white/60">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  <span className="font-light">{workflow.owner.name || workflow.owner.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span className="font-light font-mono text-xs">
                    {new Date(workflow.updatedAt).toLocaleDateString()}
                  </span>
                </div>
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                    Comments ({workflow.comments.length})
                  </h2>
                </div>
                <div className="p-8">
                  {workflow.comments.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1.5} />
                      <p className="text-white/40 text-sm font-light">No comments yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {workflow.comments.map((comment, index) => (
                        <div key={comment.id} className={`${index !== workflow.comments.length - 1 ? 'border-b border-white/10 pb-6' : ''}`}>
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