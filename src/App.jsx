import { useState, useMemo } from 'react';
import scenarios from './data/scenarios';
import Header from './components/Header';
import Footer from './components/Footer';
import ScenarioList from './components/ScenarioList';
import ScenarioDetail from './components/ScenarioDetail';
import RecipeSidebar from './components/RecipeSidebar';

const App = () => {
  const [activeScenario, setActiveScenario] = useState('java_npe');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScenarios = useMemo(() => {
    if (!searchTerm.trim()) return Object.entries(scenarios);
    const term = searchTerm.toLowerCase();
    return Object.entries(scenarios).filter(
      ([, s]) =>
        s.title.toLowerCase().includes(term) ||
        s.good.prompt.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const currentScenario = scenarios[activeScenario];

  return (
    <div
      className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden selection:bg-blue-500/30 p-3 lg:p-4"
      dir="rtl"
    >
      <Header />

      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-b-2xl">
        <ScenarioList
          scenarios={filteredScenarios}
          activeScenario={activeScenario}
          onSelect={setActiveScenario}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          totalCount={filteredScenarios.length}
        />

        <ScenarioDetail
          scenario={currentScenario}
          scenarioId={activeScenario}
        />

        <RecipeSidebar />
      </main>

      <Footer />
    </div>
  );
};

export default App;
