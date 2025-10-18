"use client";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Zap } from "lucide-react";

export default function AboutPage() {
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
          className="mb-32"
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">About Us</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight tracking-tighter leading-none mb-8">
                <span className="block">ABOUT THIS</span>
                <span className="block text-white/40">PLATFORM</span>
              </h1>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-16">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80 text-center max-w-4xl mx-auto">
                This platform is designed to help users <span className="text-white">create, manage, and share documentation</span> for their workflows efficiently. Our goal is to provide a <span className="text-white">seamless experience</span> for teams to collaborate and maintain up-to-date documentation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tighter uppercase">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            {[
              { 
                icon: Users, 
                title: "Collaboration First", 
                desc: "Built for teams to work together seamlessly across all workflows and documentation processes" 
              },
              { 
                icon: Target, 
                title: "Purpose Driven", 
                desc: "Every feature designed with clear intent to solve real documentation challenges" 
              },
              { 
                icon: Zap, 
                title: "Efficiency Focused", 
                desc: "Streamlined tools and AI assistance to maximize productivity and minimize friction" 
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-12 h-full flex flex-col">
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8 relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <value.icon className="w-8 h-8 text-white/60 relative z-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">{value.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-16">
              <h2 className="text-xs text-white/40 tracking-widest uppercase font-light mb-8">Who We Serve</h2>
              
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                {[
                  { role: "Developers", desc: "Technical documentation, API guides, and code workflows" },
                  { role: "Project Managers", desc: "Project timelines, team processes, and milestone tracking" },
                  { role: "Support Teams", desc: "Help articles, troubleshooting guides, and knowledge bases" }
                ].map((audience, index) => (
                  <div key={index} className="border-l-2 border-white/10 pl-6">
                    <h3 className="text-xl font-light tracking-tight mb-3 uppercase">{audience.role}</h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed">{audience.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-white/70 text-base font-light leading-relaxed mt-12 text-center">
                Whether you're a developer, project manager, or part of a support team, our tools are tailored to meet your documentation needs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight mb-6 tracking-tighter leading-none uppercase">
                Ready to learn more?
              </h2>
              <p className="text-white/60 mb-12 font-light tracking-wide text-lg">
                Explore our comprehensive documentation to get started with the platform
              </p>
              
              <button className="group/btn relative inline-block">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-16 py-6 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px] flex items-center gap-3">
                  View Documentation
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}