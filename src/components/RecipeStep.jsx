import {
  MapPin, Zap, ShieldCheck, HelpCircle
} from 'lucide-react';

// Map icon names to components
const iconComponents = {
  MapPin,
  Zap,
  ShieldCheck,
  HelpCircle,
};

const RecipeStep = ({ step, index }) => {
  const IconComponent = iconComponents[step.iconName];

  return (
    <div className="recipe-step">
      <div
        className={`relative overflow-visible bg-slate-900/70 border ${step.borderColor} p-5 pt-6 rounded-2xl flex flex-col gap-3 hover-lift ${step.hoverBorderColor} transition-all cursor-default`}
      >
        {/* Step Number Badge */}
        <div
          className={`absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} flex items-center justify-center text-white font-black text-sm shadow-lg ${step.shadowColor} ring-4 ring-slate-950 z-10`}
          aria-hidden="true"
        >
          {index}
        </div>

        {/* Icon */}
        <div className="flex items-center">
          {IconComponent && (
            <IconComponent className={`w-6 h-6 ${step.iconColor}`} aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div>
          <h4 className="text-[15px] font-black text-slate-100 mb-1">{step.title}</h4>
          <p className="text-[12px] text-slate-400 leading-relaxed">
            {step.description}
            {step.highlights.map((part, i) => {
              if (part.isCode) {
                return (
                  <span key={i} className={`${step.highlightColor} font-mono`}>
                    {part.text}
                  </span>
                );
              }
              if (part.isHighlight) {
                return (
                  <span
                    key={i}
                    className={`${step.highlightColor} ${part.isBold ? 'font-bold' : ''}`}
                  >
                    {part.text}
                  </span>
                );
              }
              return <span key={i}>{part.text}</span>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeStep;
