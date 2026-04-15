import { User, ShieldCheck, AlertCircle, Zap } from 'lucide-react';

const LazySection = ({ lazy }) => (
  <div className="shrink-0 flex flex-col">
    <div className="flex items-center gap-2 mb-2.5 text-red-400 px-4">
      <User className="w-4 h-4" aria-hidden="true" />
      <h3 className="text-[13px] font-black tracking-wide">הגישה ה"עצלנית" – מה לא לעשות</h3>
    </div>
    <div className="bg-slate-900/30 border border-red-500/15 rounded-2xl p-4 shadow-sm flex flex-col gap-3 hover:border-red-500/25 transition-colors">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/40">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">הפרומפט (דל):</p>
          <p className="text-[13px] text-slate-400 italic line-clamp-3 leading-relaxed" dir="auto">
            "{lazy.prompt}"
          </p>
        </div>
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/30">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">התשובה שתקבלי:</p>
          <p className="text-[13px] text-slate-400 italic line-clamp-3 leading-relaxed" dir="auto">
            {lazy.response}
          </p>
        </div>
      </div>
      <div className="pt-2.5 border-t border-red-500/15 flex items-center gap-3 text-red-400/90">
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
        <p className="text-[11px] font-semibold">{lazy.drawback}</p>
      </div>
    </div>
  </div>
);

const GoodSection = ({ good }) => (
  <div className="flex-1 flex flex-col min-h-0">
    <div className="flex items-center gap-2 mb-2.5 text-indigo-400 px-4">
      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
      <h3 className="text-[13px] font-black tracking-wide">הגישה המקצועית – ישר ב-IDE</h3>
    </div>
    <div className="flex-1 bg-slate-900 gradient-border-indigo rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 animate-glow-pulse">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.07] blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        {/* Prompt Box */}
        <div className="flex flex-col min-h-0">
          <p className="text-[11px] font-bold text-indigo-400/90 mb-2.5 uppercase tracking-wider px-1">
            הפרומפט ב-Copilot / Claude Code:
          </p>
          <div className="flex-1 bg-slate-950/90 p-5 rounded-2xl border border-indigo-900/40 text-blue-50 text-[13px] leading-[1.8] font-medium shadow-2xl overflow-y-auto custom-scrollbar whitespace-pre-wrap bidi-plaintext">
            "{good.prompt}"
          </div>
        </div>

        {/* Response Box */}
        <div className="flex flex-col min-h-0">
          <p className="text-[11px] font-bold text-slate-400 mb-2.5 uppercase px-1">
            התשובה המנצחת שתקבלי:
          </p>
          <div className="flex-1 bg-indigo-950/25 p-5 rounded-2xl border border-indigo-800/25 text-slate-200 text-[15px] leading-[1.8] overflow-y-auto custom-scrollbar backdrop-blur-sm" dir="auto">
            {good.response}
          </div>
        </div>
      </div>

      {/* Benefit */}
      <div className="mt-1 pt-3.5 border-t border-indigo-500/15 flex items-center justify-center gap-3 shrink-0">
        <div className="flex items-center gap-2.5 bg-emerald-500/10 px-5 py-2 rounded-full border border-emerald-500/20">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <p className="text-[12px] font-black tracking-wide text-emerald-400" dir="auto">{good.benefit}</p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * ScenarioDetail – shows the lazy vs. professional approach for a scenario.
 *
 * Note: `key` is used on the animated wrappers to trigger CSS entry animation
 * via unmount/remount. For heavier UIs consider framer-motion AnimatePresence.
 */
const ScenarioDetail = ({ scenario, scenarioId }) => (
  <section
    className="lg:col-span-6 flex flex-col overflow-hidden h-full bg-slate-950 p-4 gap-4"
    role="tabpanel"
    aria-label={scenario.title}
  >
    <div className="animate-fade-slide-in" key={`lazy-${scenarioId}`}>
      <LazySection lazy={scenario.lazy} />
    </div>
    <div className="animate-fade-slide-in flex-1 flex flex-col min-h-0" key={`good-${scenarioId}`}>
      <GoodSection good={scenario.good} />
    </div>
  </section>
);

export default ScenarioDetail;
