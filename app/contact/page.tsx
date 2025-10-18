"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
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
              <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Get In Touch</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight tracking-tighter leading-none mb-8">
                <span className="block">CONTACT</span>
                <span className="block text-white/40">US</span>
              </h1>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                If you have any questions, feedback, or need assistance, please feel free to reach out to us. We're here to help!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tighter uppercase">Contact Methods</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/10 border border-white/10">
            {[
              {
                icon: Mail,
                title: "Email",
                content: "support@workflowdocs.com",
                href: "mailto:support@workflowdocs.com",
                desc: "Send us an email anytime"
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+91 12345 67890",
                href: "tel:+911234567890",
                desc: "Available during business hours"
              },
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-12 h-full flex flex-col">
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8 relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <method.icon className="w-8 h-8 text-white/60 relative z-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-4">{method.title}</h3>
                  <a 
                    href={method.href}
                    className="text-2xl font-light tracking-tight mb-4 hover:text-purple-500 transition-colors duration-300"
                  >
                    {method.content}
                  </a>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{method.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Office Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-16">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-20 h-20 border border-white/20 flex items-center justify-center shrink-0 relative overflow-hidden group/icon">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                  <MapPin className="w-10 h-10 text-white/60 relative z-10" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xs text-white/40 tracking-widest uppercase font-light mb-6">Office Address</h2>
                  <div className="space-y-2 text-lg font-light leading-relaxed">
                    <p className="text-white">Workflow Docs Pvt. Ltd.</p>
                    <p className="text-white/70">4th Floor, Tower A, Cyber City,</p>
                    <p className="text-white/70">Gurugram, Haryana, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-12">
              <div className="flex items-center gap-6 justify-center">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Clock className="w-6 h-6 text-white/60 relative z-10" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-white/40 tracking-widest uppercase font-light mb-1">Response Time</p>
                  <p className="text-lg font-light text-white/70">We'll get back to you within 24–48 hours</p>
                </div>
              </div>
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
                Prefer to reach out<br />another way?
              </h2>
              <p className="text-white/60 mb-12 font-light tracking-wide text-lg">
                Visit our documentation for FAQs and additional support resources
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group/btn relative inline-block">
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                  <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px]">
                    View Documentation
                  </div>
                </button>
                
                <button className="group/btn relative inline-block">
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                  <div className="relative px-12 py-5 bg-black text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:-translate-x-[2px] hover:-translate-y-[2px]">
                    Visit Support
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}