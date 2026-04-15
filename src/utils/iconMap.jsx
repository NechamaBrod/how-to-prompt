import {
  Coffee, Box, Share2, Repeat, GitBranch, Database,
  Server, Code2, Activity, Settings, Layout, Lock,
  Monitor, Edit3, MessageSquare
} from 'lucide-react';

// O(1) icon lookup map - replaces the switch statement in App.jsx
const iconMap = {
  java_npe:         { Icon: Coffee,         color: 'text-orange-400' },
  java_spring:      { Icon: Coffee,         color: 'text-orange-400' },
  java_maven:       { Icon: Coffee,         color: 'text-orange-400' },
  python_env:       { Icon: Box,            color: 'text-yellow-400' },
  cors:             { Icon: Share2,          color: 'text-blue-400' },
  react_loop:       { Icon: Repeat,          color: 'text-orange-400' },
  git_conflict:     { Icon: GitBranch,       color: 'text-rose-400' },
  sql_slow:         { Icon: Database,        color: 'text-green-400' },
  next_client:      { Icon: Server,          color: 'text-indigo-400' },
  docker_run:       { Icon: Box,            color: 'text-blue-300' },
  api_design:       { Icon: Code2,           color: 'text-sky-400' },
  debugging:        { Icon: Activity,        color: 'text-lime-400' },
  mcp_basics:       { Icon: Settings,        color: 'text-emerald-400' },
  css_layout:       { Icon: Layout,          color: 'text-pink-400' },
  node_auth:        { Icon: Lock,            color: 'text-amber-400' },
  ide_blind_accept: { Icon: Monitor,         color: 'text-violet-400' },
  ide_refactor:     { Icon: Edit3,           color: 'text-violet-400' },
  ide_context:      { Icon: MessageSquare,   color: 'text-violet-400' },
};

const defaultIcon = { Icon: Settings, color: 'text-slate-400' };

/**
 * Get the icon component and color for a scenario ID.
 * @param {string} id - The scenario key
 * @returns {{ Icon: React.ComponentType, color: string }}
 */
export const getScenarioIcon = (id) => iconMap[id] || defaultIcon;

/**
 * Render the icon element for a scenario ID.
 * @param {string} id - The scenario key
 * @returns {JSX.Element}
 */
export const renderScenarioIcon = (id) => {
  const { Icon, color } = getScenarioIcon(id);
  return <Icon className={`w-5 h-5 ${color}`} />;
};

export default iconMap;
