import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center py-12">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 100%)'
        }} 
      />
      
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />

      <div className="relative z-10 w-full max-w-md px-6">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-black border border-white/10 shadow-none relative",
              headerTitle: "text-4xl font-extralight tracking-tighter uppercase text-white",
              headerSubtitle: "text-sm text-white/60 font-light tracking-wide",
              socialButtonsBlockButton: "bg-black text-white border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-light tracking-widest uppercase",
              socialButtonsBlockButtonText: "font-light tracking-widest uppercase text-xs",
              formButtonPrimary: "bg-white text-black hover:bg-white/90 text-xs font-light tracking-widest uppercase py-4 shadow-none border border-white/20",
              formFieldLabel: "text-xs text-white/40 tracking-widest uppercase font-light",
              formFieldInput: "bg-black border border-white/20 text-white text-sm font-light focus:border-purple-500/50 focus:ring-0",
              footerActionLink: "text-white hover:text-purple-500 transition-colors font-light",
              identityPreviewText: "text-white/80 font-light",
              identityPreviewEditButton: "text-white/60 hover:text-purple-500",
              formFieldInputShowPasswordButton: "text-white/60 hover:text-white",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40 text-xs tracking-widest uppercase font-light",
              footer: "bg-black border-t border-white/10",
              footerActionText: "text-white/60 font-light",
              formHeaderTitle: "text-2xl font-light tracking-tight text-white",
              formHeaderSubtitle: "text-sm text-white/60 font-light",
              otpCodeFieldInput: "bg-black border border-white/20 text-white focus:border-purple-500/50",
              formResendCodeLink: "text-white/60 hover:text-purple-500 transition-colors",
              alertText: "text-white/80 text-sm font-light",
              formFieldAction: "text-white/60 hover:text-purple-500 transition-colors text-xs font-light",
              formFieldSuccessText: "text-green-400 text-xs font-light",
              formFieldErrorText: "text-red-400 text-xs font-light",
              formFieldWarningText: "text-yellow-400 text-xs font-light",
              formFieldHintText: "text-white/40 text-xs font-light",
              identifierFieldInput: "bg-black border border-white/20 text-white focus:border-purple-500/50",
              phoneInputBox: "bg-black border border-white/20 text-white focus-within:border-purple-500/50",
              selectButton: "bg-black border border-white/20 text-white hover:border-white/40",
              selectOptionsContainer: "bg-black border border-white/20",
              selectOption: "text-white hover:bg-white/10",
              accordionTriggerButton: "text-white/60 hover:text-white border-white/20",
              accordionContent: "text-white/80",
              formFieldRow: "gap-4",
              main: "gap-6",
            },
          }}
        />
      </div>
    </main>
  );
}