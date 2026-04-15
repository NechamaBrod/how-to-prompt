import { CheckCircle2 } from 'lucide-react';

const Footer = () => (
  <footer
    className="py-2 px-6 border-t border-slate-800/50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-between shrink-0 rounded-b-2xl"
    role="contentinfo"
  >
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
        <span>Learning Dashboard Active</span>
      </div>
    </div>
    <p className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-black">
      Prompt Smart. Accept Wise.
    </p>
  </footer>
);

export default Footer;
