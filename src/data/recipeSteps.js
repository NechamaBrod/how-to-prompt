// Recipe steps data for the "How to Prompt" sidebar
// Each step: { color, iconName, title, description (JSX-ready text parts) }

export const recipeSteps = [
  {
    color: 'blue',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-700',
    shadowColor: 'shadow-blue-500/30',
    borderColor: 'border-blue-500/20',
    hoverBorderColor: 'hover:border-blue-500/40',
    iconColor: 'text-blue-400',
    highlightColor: 'text-blue-300',
    iconName: 'MapPin',
    title: 'סמני',
    description: 'סמני את הקוד הרלוונטי לפני ששואלת. השתמשי ב-',
    highlights: [
      { text: '@workspace', isCode: true },
      { text: ' לסריקת כל הפרויקט או ' },
      { text: '#file', isCode: true },
      { text: ' לקובץ ספציפי.' }
    ]
  },
  {
    color: 'purple',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-700',
    shadowColor: 'shadow-purple-500/30',
    borderColor: 'border-purple-500/20',
    hoverBorderColor: 'hover:border-purple-500/40',
    iconColor: 'text-purple-400',
    highlightColor: 'text-purple-300',
    iconName: 'Zap',
    title: 'שאלי ממוקד',
    description: '"למה הפונקציה מחזירה null?" עדיף על "זה לא עובד". ',
    highlights: [
      { text: 'ה-AI כבר רואה את הקוד — פרומפט קצר = תשובה טובה יותר', isHighlight: true },
      { text: '.' }
    ]
  },
  {
    color: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-700',
    shadowColor: 'shadow-emerald-500/30',
    borderColor: 'border-emerald-500/20',
    hoverBorderColor: 'hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
    highlightColor: 'text-emerald-300',
    iconName: 'ShieldCheck',
    title: 'קראי לפני ✅',
    description: 'ה-AI הציע שינוי? ',
    highlights: [
      { text: 'קראי כל שורה', isHighlight: true },
      { text: '. "תסבירי מה שינית ולמה" — ' },
      { text: 'לפני שלוחצים Accept', isHighlight: true, isBold: true },
      { text: '.' }
    ]
  },
  {
    color: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-700',
    shadowColor: 'shadow-amber-500/30',
    borderColor: 'border-amber-500/20',
    hoverBorderColor: 'hover:border-amber-500/40',
    iconColor: 'text-amber-400',
    highlightColor: 'text-amber-300',
    iconName: 'HelpCircle',
    title: 'למה?',
    description: '"למה הדרך הזו עדיפה?" — ',
    highlights: [
      { text: 'זה הטיפ הכי חשוב', isHighlight: true },
      { text: '. בלי זה את רק לוחצת Accept בלי ללמוד.' }
    ]
  }
];

export default recipeSteps;
