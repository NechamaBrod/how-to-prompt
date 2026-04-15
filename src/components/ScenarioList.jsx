import { Search, ChevronRight } from 'lucide-react';
import { renderScenarioIcon } from '../utils/iconMap';

const ScenarioList = ({
  scenarios,
  activeScenario,
  onSelect,
  searchTerm,
  onSearchChange,
  totalCount,
}) => (
  <nav
    className="lg:col-span-3 border-l border-slate-800/50 flex flex-col overflow-hidden h-full bg-slate-900/10"
    aria-label="רשימת תרחישים"
  >
    {/* Search Header */}
    <div className="p-4 border-b border-slate-800/50 shrink-0 space-y-3 bg-slate-950/40">
      <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between px-1">
        <span>במה נתקעת היום?</span>
        <span className="bg-indigo-500/15 text-indigo-400 px-2.5 py-0.5 rounded-full text-[9px] font-bold">
          {totalCount}
        </span>
      </h2>
      <div className="relative group">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="חפשי תרחיש..."
          value={searchTerm}
          onChange={onSearchChange}
          aria-label="חיפוש תרחיש"
          className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl py-2.5 pr-9 pl-4 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
        />
      </div>
    </div>

    {/* Scenario Buttons */}
    <div className="flex-1 overflow-y-auto p-2.5 custom-scrollbar" role="tablist" aria-label="תרחישים">
      {scenarios.map(([id, s]) => {
        const isActive = activeScenario === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={`w-full text-right p-3.5 rounded-xl transition-all duration-250 flex items-center gap-3 mb-1.5 border ${
              isActive
                ? 'bg-indigo-600/10 border-indigo-500/25 text-indigo-50 shadow-lg shadow-indigo-500/5 scenario-btn-active'
                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 hover:border-slate-700/30'
            }`}
          >
            <div
              className={`p-2 rounded-lg shrink-0 transition-all ${
                isActive ? 'bg-indigo-500/20 text-indigo-400 scale-110' : 'bg-slate-800/60'
              }`}
            >
              {renderScenarioIcon(id)}
            </div>
            <span className="font-bold text-[13px] flex-1 truncate">{s.title}</span>
            <ChevronRight
              className={`w-3.5 h-3.5 transition-all duration-200 shrink-0 ${
                isActive ? 'rotate-90 opacity-100 text-indigo-400' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  </nav>
);

export default ScenarioList;
