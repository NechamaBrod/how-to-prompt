import { Monitor } from 'lucide-react';

const Header = () => (
  <header
    className="py-3 px-6 border-b border-slate-800/60 shrink-0 bg-slate-950/90 backdrop-blur-xl z-30 rounded-t-2xl"
    role="banner"
  >
    <div className="max-w-full mx-auto flex items-center justify-between">
      <div className="flex flex-col items-start px-2">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-400 to-violet-500 tracking-tight leading-none">
          ללמוד לשאול נכון
        </h1>
        <p dir="ltr" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">
          Mastering AI Communication in Your IDE
        </p>
      </div>
      <div className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity px-2">
        <Monitor className="w-4 h-4 text-indigo-400" aria-hidden="true" />
      </div>
    </div>
  </header>
);

export default Header;
