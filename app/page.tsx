"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-12 relative group"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative flex items-center gap-3 border border-white/10 px-6 py-3 bg-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-purple-600 relative z-10" />
              <span className="text-xs tracking-widest text-white/60 font-light uppercase relative z-10">AI-Powered Documentation</span>
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight mb-6 sm:mb-8 tracking-tighter leading-none">
            <span className="block">WORKFLOW</span>
            <span className="block text-white/40">DOCUMENTATION</span>
          </h1>

          {/* Divider */}
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-12" />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/60 mb-12 sm:mb-16 max-w-2xl mx-auto font-light tracking-wide leading-relaxed px-4 sm:px-0"
          >
            Professional documentation platform for streamlined workflow management and collaborative development
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <button className="group relative inline-block" onClick={() => router.push('/workflows')}>
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] flex items-center gap-3">
                Get Started
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </button>
            
            <button className="group relative inline-block" onClick={() => window.open('https://www.linkedin.com/company/purplemerit/posts/?feedView=all', '_blank')}>
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative px-12 py-5 bg-black text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:-translate-x-[2px] hover:-translate-y-[2px]">
                View Demo
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">Core Features</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            {[
              { num: "01", title: "Document", desc: "Create and organize comprehensive workflow documentation with intelligent templates", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { num: "02", title: "Collaborate", desc: "Work together with teams in real-time collaborative environments", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
              { num: "03", title: "Deploy", desc: "Publish and share documentation with stakeholders seamlessly", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-12 h-full flex flex-col">
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8 relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <svg className="w-8 h-8 text-white/60 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d={feature.icon} />
                    </svg>
                  </div>
                  <div className="text-5xl font-extralight text-white/40 mb-6">{feature.num}</div>
                  <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">{feature.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            {[
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "24/7", label: "Support Available" },
              { value: "∞", label: "Scalability" }
            ].map((stat, index) => (
              <div key={index} className="relative bg-black p-12 text-center group">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="text-6xl font-extralight tracking-tighter mb-4">{stat.value}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-extralight mb-6 tracking-tighter leading-none uppercase">
                Ready to streamline<br />your workflow?
              </h2>
              <p className="text-white/60 mb-12 font-light tracking-wide text-lg">
                Join thousands of teams using our platform to create better documentation
              </p>
              
              <button className="group/btn relative inline-block">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-16 py-6 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px]">
                  Start Free Trial
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-white/20 bg-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm tracking-widest uppercase font-light">Workflow</span>
              </div>
              <p className="text-sm text-white/60 font-light leading-relaxed max-w-md">
                Professional documentation platform for streamlined workflow management and collaborative development.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-xs tracking-widest uppercase font-light text-white/40 mb-6">Product</h3>
              <ul className="space-y-4">
                {["Features", "Pricing", "Documentation", "Updates"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs tracking-widest uppercase font-light text-white/40 mb-6">Company</h3>
              <ul className="space-y-4">
                {["About", "Contact", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/10 gap-4 sm:gap-6">
            <p className="text-white/40 text-xs tracking-widest uppercase font-light">
              © 2025 Workflow Documentation. All Rights Reserved.
            </p>
            <div className="flex gap-6 sm:gap-8">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase font-light"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}