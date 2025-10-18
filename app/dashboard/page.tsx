"use client";
import { motion } from "framer-motion";
import { Plus, FileText, Users, Share } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardStats {
  totalWorkflows: number;
  sharedWorkflows: number;
  totalComments: number;
  aiSuggestions: number;
}

export default function DashboardPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkflows: 0,
    sharedWorkflows: 0,
    totalComments: 0,
    aiSuggestions: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && clerkUser) {
      fetchStats();
      // Set up polling for real-time updates every 30 seconds
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoaded, clerkUser]);

  const statsConfig = [
    { label: "Total Workflows", value: stats.totalWorkflows, change: "Total created", icon: FileText },
    { label: "Shared Workflows", value: stats.sharedWorkflows, change: "Publicly accessible", icon: Share },
    { label: "Comments", value: stats.totalComments, change: "Total interactions", icon: Users },
    { label: "AI Suggestions", value: stats.aiSuggestions, change: "Versions created", icon: Plus },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
              <div>
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Dashboard</div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-none">
                  WELCOME BACK,<br />
                  <span className="text-white/40">{clerkUser?.firstName?.toUpperCase()}</span>
                </h1>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xs text-white/40 tracking-widest mb-2 uppercase">Your Account</div>
                <div className="text-sm font-light text-white/60">{clerkUser?.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter uppercase">Analytics Overview</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/10 border border-white/10">
            {statsConfig.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-xs text-white/40 tracking-widest uppercase font-light">{stat.label}</div>
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center relative overflow-hidden group/icon">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <stat.icon className="w-5 h-5 text-white/60 relative z-10" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-5xl font-extralight tracking-tighter mb-3">{stat.value}</div>
                  <div className="text-xs text-white/40 tracking-wide font-light">{stat.change}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter uppercase">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            {[
              { num: "01", title: "Create Workflow", desc: "Start a new workflow documentation", icon: Plus, onClick: () => router.push("/workflows/new") },
              { num: "02", title: "View Workflows", desc: "Browse your existing workflows", icon: FileText, onClick: () => router.push("/workflows") },
              { num: "03", title: "Share & Collaborate", desc: "Invite team members to collaborate", icon: Share, onClick: () => router.push("/workflows") }
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black cursor-pointer"
                onClick={action.onClick}
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-12 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-5xl font-extralight text-white/40">{action.num}</div>
                    <action.icon className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">{action.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{action.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 border border-white/20 flex items-center justify-center mx-auto mb-8 relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                <Plus className="w-10 h-10 relative z-10" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight mb-6 tracking-tighter leading-none uppercase">
                Ready to create<br />your first workflow?
              </h2>
              <p className="text-white/60 mb-12 font-light tracking-wide text-lg">
                Start documenting your processes with AI-powered assistance
              </p>
              
              <button
                className="group/btn relative inline-block"
                onClick={() => router.push("/workflows/new")}
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-16 py-6 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px] flex items-center gap-3">
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  Create New Workflow
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}