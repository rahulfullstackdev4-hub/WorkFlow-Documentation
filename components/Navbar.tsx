'use client';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-white/10 relative">
      {/* Shadow Effect */}
      <div className="absolute inset-0 bg-white/5 translate-x-0 translate-y-[1px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Left - Logo & Main Links */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 border border-white/20 bg-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm tracking-widest uppercase font-light">Workflow</span>
            </Link>

            {/* Main Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard"
                className="text-xs text-white/60 hover:text-white tracking-widest uppercase font-light transition-colors duration-300"
              >
                Dashboard
              </Link>
              <Link
                href="/workflows"
                className="text-xs text-white/60 hover:text-white tracking-widest uppercase font-light transition-colors duration-300"
              >
                Workflows
              </Link>
            </div>
          </div>

          {/* Right - Secondary Links & Auth */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Secondary Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/about"
                className="text-xs text-white/40 hover:text-white/80 tracking-widest uppercase font-light transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-xs text-white/40 hover:text-white/80 tracking-widest uppercase font-light transition-colors duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border border-white/20",
                      userButtonPopoverCard: "bg-black border border-white/10",
                      userButtonPopoverActionButton: "hover:bg-white/5",
                    },
                  }}
                />
              </SignedIn>

              <SignedOut>
                <Link href="/sign-in" className="group relative inline-block">
                  <div className="absolute inset-0 bg-white/5 translate-x-[1px] translate-y-[1px]" />
                  <div className="relative px-6 py-2 bg-white text-black text-xs font-light tracking-widest uppercase border border-white/20 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                    Sign In
                  </div>
                </Link>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 border border-white/20 flex items-center justify-center relative overflow-hidden group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {isMenuOpen ? (
                <X className="w-5 h-5 relative z-10" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5 relative z-10" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-white/60 hover:text-white tracking-widest uppercase font-light transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/workflows"
                className="text-sm text-white/60 hover:text-white tracking-widest uppercase font-light transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Workflows
              </Link>
              <Link
                href="/about"
                className="text-sm text-white/40 hover:text-white/80 tracking-widest uppercase font-light transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/40 hover:text-white/80 tracking-widest uppercase font-light transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
