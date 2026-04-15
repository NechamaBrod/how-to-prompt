import { Code2 } from 'lucide-react';
import { recipeSteps } from '../data/recipeSteps';
import RecipeStep from './RecipeStep';

const RecipeSidebar = () => (
  <aside
    className="lg:col-span-3 border-r border-slate-800/50 flex flex-col overflow-hidden h-full bg-slate-950/30"
    role="complementary"
    aria-label="מתכון הפרומפט"
  >
    {/* Sidebar Header */}
    <div className="p-4 border-b border-slate-800/50 shrink-0 bg-slate-950/80">
      <h2 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.15em] flex items-center gap-2.5">
        <Code2 className="w-4 h-4" aria-hidden="true" />
        מתכון הפרומפט ב-IDE
      </h2>
      <p className="text-[10px] text-slate-500 mt-1.5">Copilot · Claude Code · Cursor</p>
    </div>

    {/* Steps List */}
    <div className="flex-1 overflow-y-auto p-5 pt-7 flex flex-col gap-5 overflow-x-visible custom-scrollbar">
      {recipeSteps.map((step, i) => (
        <RecipeStep key={step.iconName} step={step} index={i + 1} />
      ))}
    </div>
  </aside>
);

export default RecipeSidebar;
