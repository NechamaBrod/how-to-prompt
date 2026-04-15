import React, { useState, useMemo } from 'react';
import { 
  Terminal, User, ShieldCheck, AlertCircle, Zap, ChevronRight, 
  Code2, Layers, Info, Database, Lock, Cpu, Share2, Cloud, 
  Box, Binary, Settings, Layout, Repeat, MessageSquare, 
  TestTube, Activity, Link, Server, Coffee, CheckCircle2, Search, X,
  MapPin, Edit3, RefreshCw, HelpCircle, ArrowDown, Monitor, GitBranch
} from 'lucide-react';

const scenarios = {
  java_npe: {
    title: "Java - התוכנית קרסה (NPE)",
    lazy: {
      prompt: "Exception in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.length()\" because \"name\" is null",
      response: "המשתנה name הוא null. תוסיפי בדיקה אם הוא לא ריק לפני שאת בודקת אורך.",
      drawback: "הודעת שגיאה בלבד גורמת ל-AI לנחש. הוא לא יודע מאיפה הנתון מגיע."
    },
    good: {
      prompt: "סמנתי את השורה שקורסת — @workspace למה name יכול להיות null כאן? תעקבי מאיפה הוא מגיע בפרויקט",
      response: "Copilot יסרוק את כל הפרויקט, יראה את כל המקומות ש-name מקבל ערך ויצביע על הנקודה שבה הוא לא אותחל.",
      benefit: "AI שרואה את כל הפרויקט → אבחון מדויק פי כמה."
    }
  },
  java_spring: {
    title: "Java - שגיאה בהפעלת השרת",
    lazy: {
      prompt: "Error creating bean with name 'userController': Unsatisfied dependency expressed through constructor parameter 0",
      response: "חסר לך @Service או @Repository באחד המחלקות שלך.",
      drawback: "היא תתחיל לשים אנוטציות בכל מקום בלי להבין איזו מחלקה באמת חסרה."
    },
    good: {
      prompt: "@workspace יש לי שגיאת 'Unsatisfied dependency' ב-UserController. תסרקי את הפרויקט ותבדקי אם UserService מוגדרת נכון כ-Spring Bean",
      response: "Copilot יסרוק את כל המחלקות, ימצא ש-UserService חסרת @Service ויסביר למה Spring לא מזהה אותה.",
      benefit: "AI שרואה את כל המחלקות בפרויקט = אבחון תוך שניות."
    }
  },
  python_env: {
    title: "Python - הספרייה נעלמה",
    lazy: {
      prompt: "ModuleNotFoundError: No module named 'requests'",
      response: "תריצי pip install requests בטרמינל.",
      drawback: "זה לא יעזור אם היא בתוך Virtual Env ב-VS Code והטרמינל בחוץ."
    },
    good: {
      prompt: "ב-VS Code מופיע 'No module named requests'. @workspace תבדקי איזה Python interpreter פעיל ובאיזו סביבה הותקנה הספרייה",
      response: "Copilot יזהה את הסביבה הפעילה, יבין שיש קונפליקט בין ה-interpreter לvenv ויסביר איך לתקן ב-2 לחיצות.",
      benefit: "פתרון בעיות סביבה בלי לאבד שעה בגוגל."
    }
  },
  cors: {
    title: "Web - הדפדפן חוסם אותי",
    lazy: {
      prompt: "Access to fetch at 'http://localhost:5000' has been blocked by CORS policy",
      response: "תתקיני חבילת cors ותוסיפי אותה ב-Node.",
      drawback: "פתרון 'טכני' שלא מסביר למה זה קורה ואיך לעשות את זה בטוח."
    },
    good: {
      prompt: "@workspace הדפדפן חוסם CORS מ-localhost:3000 לשרת שלי. תראי לי את הגדרות השרת הנוכחיות ותוסיפי את ה-middleware הנכון",
      response: "Copilot יקרא את קוד השרת, יראה שחסר הגדרת CORS ויוסיף את הקוד המדויק המותאם לפרויקט שלך.",
      benefit: "פתרון בהקשר מלא של הפרויקט — לא עצה גנרית."
    }
  },
  java_maven: {
    title: "Java - הספריות לא יורדות",
    lazy: {
      prompt: "Could not resolve dependencies for project: Unresolved dependency 'org.json:json:jar:20230227'",
      response: "ה-Version לא נכון או שאין לך אינטרנט. תבדקי ב-Maven Central.",
      drawback: "תשובה קרה שלא עוזרת לג'וניורית להבין איפה הקובץ שצריך לערוך."
    },
    good: {
      prompt: "@workspace יש קו אדום ב-pom.xml על 'org.json:json:jar:20230227'. תסבירי למה ותציעי את הגרסה הנכונה",
      response: "Copilot יזהה שהגרסה לא קיימת ב-Maven Central, יציע גרסה תקינה ויסביר איך לבצע Reload.",
      benefit: "עריכת config files עם מישהו שמבין Maven."
    }
  },
  react_loop: {
    title: "React - הכל תקוע",
    lazy: {
      prompt: "Too many re-renders. React limits the number of renders to prevent an infinite loop.",
      response: "יש לך לופ ב-useEffect. אל תעדכני State בלי Dependency Array.",
      drawback: "היא תשים [] בכל מקום ותקבל באגים של מידע שלא מתעדכן."
    },
    good: {
      prompt: "סמנתי את ה-useEffect שגורם לשגיאת 'Too many re-renders'. @workspace תסבירי למה זה קורה ותציעי תיקון",
      response: "Copilot יראה את ה-useEffect המסומן, יזהה שה-state מתעדכן בפנים בלי תנאי ויסביר כיצד לתקן עם dependency array נכון.",
      benefit: "הבנת React Lifecycle עם הקוד שלך לנגד עיניים."
    }
  },
  node_auth: {
    title: "Backend - 'לא מורשית'",
    lazy: {
      prompt: "GET /api/data 401 (Unauthorized)",
      response: "חסר לך Token בבקשה. תבדקי את ה-Headers.",
      drawback: "היא לא תדע איך 'להדביק' את הטוקן בצורה שהשרת מצפה לה."
    },
    good: {
      prompt: "@workspace תבדקי את ה-auth middleware שלי — למה הוא מחזיר 401 גם כשיש Token תקין בבקשה?",
      response: "Copilot יקרא את ה-middleware, ימצא שהוא מחפש 'Bearer token' אבל הקוד לא מפצל נכון — ויתקן.",
      benefit: "דיבאג auth flow עם ראייה של כל הקוד."
    }
  },
  git_conflict: {
    title: "Git - חצים מוזרים בקוד",
    lazy: {
      prompt: "CONFLICT (content): Merge conflict in src/App.js",
      response: "תפתחי את הקובץ ותמחקי את ה-HEAD והחצים.",
      drawback: "מפחיד. היא עלולה למחוק קוד חשוב בלי להבין מה היא עושה."
    },
    good: {
      prompt: "יש לי merge conflict ב-App.js. @workspace תסבירי מה ההבדל בין 'Current Change' ל-'Incoming Change' ואיזו גרסה עדיפה לשמור",
      response: "Copilot יקרא את שני הצדדים, יסביר מה כל גרסה עושה ויעזור לבחור — או למזג — בחכמה.",
      benefit: "פתרון קונפליקטים מבוסס הבנה, לא ניחוש."
    }
  },
  sql_slow: {
    title: "SQL - לוקח מלא זמן",
    lazy: {
      prompt: "SELECT * FROM users WHERE email = 'test@test.com' takes 8 seconds",
      response: "תוסיפי Index לעמודת ה-email.",
      drawback: "היא תחשוב שאינדקס זה קסם ותשים אותו על כל הטבלה."
    },
    good: {
      prompt: "@workspace הquery הזה על users.email לוקח 10 שניות. תסתכלי על ה-schema ותגידי מה חסר כדי לזרז אותו",
      response: "Copilot יראה את מבנה הטבלה, יזהה שחסר INDEX על email ויכתוב את פקודת ה-SQL המדויקת ליצירתו.",
      benefit: "אופטימיזציה מבוססת הקשר אמיתי של הפרויקט."
    }
  },
  next_client: {
    title: "Next.js - 'אי אפשר להשתמש בזה פה'",
    lazy: {
      prompt: "Error: useState only works in Client Components. Add the \"use client\" directive.",
      response: "תכתבי \"use client\" בשורה הראשונה של הקובץ.",
      drawback: "היא תהפוך את כל האתר שלה ל-Client Side ותאבד את היתרון של Next.js."
    },
    good: {
      prompt: "סמנתי את הקומפוננטה שנותנת שגיאת useState. @workspace האם כל הקובץ צריך 'use client' או רק חלק ממנו? תציעי ארכיטקטורה נכונה",
      response: "Copilot יראה את הקומפוננטה, יציע לחלץ רק את האינטראקטיבי לקובץ נפרד עם 'use client' — ויכתוב את זה.",
      benefit: "ארכיטקטורת Next.js נכונה עם יד מכוונת."
    }
  },
  css_layout: {
    title: "CSS - הכל זז",
    lazy: {
      prompt: "How to center a div with text?",
      response: "Use display: flex; justify-content: center; align-items: center;",
      drawback: "תשובה גנרית. לפעמים זה דווקא יהרוס לה את שאר העיצוב בדף."
    },
    good: {
      prompt: "סמנתי את ה-div שהטקסט לא מרוכז בתוכו. @workspace תסתכלי על ה-CSS הקיים ותציעי תיקון שלא ישבור את שאר הדף",
      response: "Copilot יראה את ה-CSS של הdiv וסביבתו, ויוסיף flexbox ממוקד שלא פוגע בשאר האלמנטים.",
      benefit: "CSS מותאם לקוד הקיים — לא copy-paste מ-Stack Overflow."
    }
  },
  mcp_basics: {
    title: "MCP - שה-AI יכיר את הקוד",
    lazy: {
      prompt: "How to use MCP tools?",
      response: "Install the MCP SDK and define your tools in a JSON config.",
      drawback: "זה נשמע כמו משימה בלתי אפשרית לג'וניורית."
    },
    good: {
      prompt: "@workspace אני רוצה להוסיף Tool חדש ל-MCP server שלי שיחזיר רשימת קבצים בתיקייה. תסתכלי על הקוד הקיים ותכתבי Tool שמתאים לסגנון שלו",
      response: "Copilot תקרא את ה-server הקיים, תבין את המבנה ותכתוב Tool חדש שמשתלב בצורה עקבית עם הקוד.",
      benefit: "הרחבת MCP עם AI שמכיר את הקוד שלך."
    }
  },
  docker_run: {
    title: "Docker - לא מצליחה להריץ",
    lazy: {
      prompt: "Docker failed to start container: port already in use",
      response: "תסגרי את התוכנה שתופסת את הפורט או תשני פורט ב-Docker.",
      drawback: "היא לא תדע איך למצוא מה תופס את הפורט במחשב שלה."
    },
    good: {
      prompt: "@workspace תסתכלי על ה-Dockerfile וה-docker-compose שלי — איזה פורט מוגדר ואיך אני יכולה לשנות אותו בלי לשבור כלום",
      response: "Copilot תקרא את ה-Dockerfile, תזהה את PORT שמוגדר ותציע שינוי port mapping מדויק עם הסבר.",
      benefit: "תיקון Docker config עם הבנה של הפרויקט."
    }
  },
  debugging: {
    title: "דיבאג - 'זה לא עובד לי'",
    lazy: {
      prompt: "My function is not working, it returns undefined.",
      response: "תוסיפי console.log לפני ה-return.",
      drawback: "היא תוסיף לוג אחד ולא תבין את כל השרשרת של המידע."
    },
    good: {
      prompt: "סמנתי את הפונקציה שמחזירה undefined. @workspace תציעי איפה לשים Breakpoint ותסבירי איך לעקוב אחרי המשתנה ב-VS Code Debugger",
      response: "Copilot תזהה את הפונקציה, תציע היכן לשים Breakpoint ותסביר איך לראות את ערך המשתנה שלב אחרי שלב.",
      benefit: "Debugging מקצועי עם כלי ה-IDE — לא רק console.log."
    }
  },
  api_design: {
    title: "API - לשלוח מידע מורכב",
    lazy: {
      prompt: "How to send a list of products in a POST request?",
      response: "Send an array of objects in the request body.",
      drawback: "היא תשלח רשימה מבולגנת בלי שמות שדות ברורים."
    },
    good: {
      prompt: "@workspace תסתכלי על ה-POST endpoint בשרת ועל ה-fetch ב-Frontend — תבדקי שמבנה ה-JSON תואם משני הצדדים",
      response: "Copilot תשווה בין ה-Backend לה-Frontend, תמצא אי-התאמות בשמות השדות ותציע תיקון מסונכרן.",
      benefit: "בדיקת consistency בין Client לServer ברגע."
    }
  },
  ide_blind_accept: {
    title: "Accept בלי לקרוא ⚠️",
    lazy: {
      prompt: "Copilot הציע שינוי ולחצתי Accept — עכשיו האפליקציה קרסה לגמרי",
      response: "תעשי Ctrl+Z או תסגרי בלי לשמור.",
      drawback: "Undo לא תמיד עובד אחרי שמירה — וגם אז, היא לא לומדת למה זה נשבר."
    },
    good: {
      prompt: "Copilot הציע שינוי ב-X. לפני שאני לוחצת Accept: 'תסבירי מה השינוי הזה עושה ואיך הוא משפיע על שאר הקוד'",
      response: "Copilot יסביר כל שורה שהשתנתה, למה היא נכתבה כך ומה ההשפעה על הפרויקט — ואז תחליטי אם לקבל.",
      benefit: "Accept מושכל = למידה אמיתית, לא רק העתקה."
    }
  },
  ide_refactor: {
    title: "לשפר קוד ישן ♻️",
    lazy: {
      prompt: "refactor this function",
      response: "ה-AI יכתוב גרסה שונה — אבל אין לך מושג אם היא טובה יותר.",
      drawback: "Refactor ללא הנחיות = שינוי אקראי שאולי שובר לוגיקה קיימת."
    },
    good: {
      prompt: "סמנתי את הפונקציה. @workspace תשפרי את הקריאות בלי לשנות את הלוגיקה — ותסבירי כל שינוי שעשית ולמה",
      response: "Copilot תעשה refactor ממוקד עם הסבר לכל שינוי: שמות משתנים, חלוקה לפונקציות, הסרת כפילויות.",
      benefit: "קוד נקי עם שליטה מלאה על מה שהשתנה."
    }
  },
  ide_context: {
    title: "שואלת בלי הקשר 🎯",
    lazy: {
      prompt: "why is this not working?",
      response: "ה-AI ינחש על איזה קוד את מדברת ויתן תשובה כללית ולא מועילה.",
      drawback: "בלי הקשר גם ב-IDE הוא מנחש בחושך — בדיוק כמו צ'אט חיצוני."
    },
    good: {
      prompt: "סמני את הקוד הספציפי ← פתחי Inline Chat ← 'למה הפונקציה הזו מחזירה ערך שגוי כשה-input ריק?'",
      response: "עם הסימון Copilot רואה בדיוק את הקוד הרלוונטי ונותן תשובה מדויקת — לא תיאוריה כללית.",
      benefit: "שימוש נכון בכוח האמיתי של כלי IDE."
    }
  }
};

const App = () => {
  const [activeScenario, setActiveScenario] = useState('java_npe');
  const [searchTerm, setSearchTerm] = useState('');

  const current = scenarios[activeScenario];

  const filteredScenarios = useMemo(() => {
    if (!searchTerm.trim()) return Object.entries(scenarios);
    const term = searchTerm.toLowerCase();
    return Object.entries(scenarios).filter(([id, s]) =>
      s.title.toLowerCase().includes(term) ||
      s.good.prompt.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const getIcon = (id) => {
    switch (id) {
      case 'java_npe':
      case 'java_spring':
      case 'java_maven': return <Coffee className="w-5 h-5 text-orange-400" />;
      case 'python_env': return <Box className="w-5 h-5 text-yellow-400" />;
      case 'cors': return <Share2 className="w-5 h-5 text-blue-400" />;
      case 'react_loop': return <Repeat className="w-5 h-5 text-orange-400" />;
      case 'git_conflict': return <GitBranch className="w-5 h-5 text-rose-400" />;
      case 'sql_slow': return <Database className="w-5 h-5 text-green-400" />;
      case 'next_client': return <Server className="w-5 h-5 text-indigo-400" />;
      case 'docker_run': return <Box className="w-5 h-5 text-blue-300" />;
      case 'api_design': return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'debugging': return <Activity className="w-5 h-5 text-lime-400" />;
      case 'mcp_basics': return <Settings className="w-5 h-5 text-emerald-400" />;
      case 'css_layout': return <Layout className="w-5 h-5 text-pink-400" />;
      case 'node_auth': return <Lock className="w-5 h-5 text-amber-400" />;
      case 'ide_blind_accept': return <Monitor className="w-5 h-5 text-violet-400" />;
      case 'ide_refactor': return <Edit3 className="w-5 h-5 text-violet-400" />;
      case 'ide_context': return <MessageSquare className="w-5 h-5 text-violet-400" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden selection:bg-blue-500/30 p-3 lg:p-4" dir="rtl">

      {/* Header */}
      <header className="py-3 px-6 border-b border-slate-800/60 shrink-0 bg-slate-950/90 backdrop-blur-xl z-30 rounded-t-2xl">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex flex-col items-start px-2">
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-400 to-violet-500 tracking-tight leading-none">
              ללמוד לשאול נכון
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">Mastering AI Communication in Your IDE</p>
          </div>
          <div className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity px-2">
            <Monitor className="w-4 h-4 text-indigo-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Copilot · Claude Code · Cursor (18 Examples)</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-b-2xl">

        {/* RIGHT: Scenario List (3/12) */}
        <div className="lg:col-span-3 border-l border-slate-800/50 flex flex-col overflow-hidden h-full bg-slate-900/10">
          <div className="p-4 border-b border-slate-800/50 shrink-0 space-y-3 bg-slate-950/40">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between px-1">
              <span>במה נתקעת היום?</span>
              <span className="bg-indigo-500/15 text-indigo-400 px-2.5 py-0.5 rounded-full text-[9px] font-bold">{filteredScenarios.length}</span>
            </h2>
            <div className="relative group">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="חפשי תרחיש..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl py-2.5 pr-9 pl-4 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2.5 custom-scrollbar">
            {filteredScenarios.map(([id, s]) => (
              <button
                key={id}
                onClick={() => setActiveScenario(id)}
                className={`w-full text-right p-3.5 rounded-xl transition-all duration-250 flex items-center gap-3 mb-1.5 border ${
                  activeScenario === id
                    ? 'bg-indigo-600/10 border-indigo-500/25 text-indigo-50 shadow-lg shadow-indigo-500/5 scenario-btn-active'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 hover:border-slate-700/30'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 transition-all ${activeScenario === id ? 'bg-indigo-500/20 text-indigo-400 scale-110' : 'bg-slate-800/60'}`}>
                  {getIcon(id)}
                </div>
                <span className="font-bold text-[13px] flex-1 truncate">{s.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 shrink-0 ${activeScenario === id ? 'rotate-90 opacity-100 text-indigo-400' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE: THE STAGE (6/12) */}
        <div className="lg:col-span-6 flex flex-col overflow-hidden h-full bg-slate-950 p-4 gap-4">

          {/* Lazy Section */}
          <div className="shrink-0 flex flex-col animate-fade-slide-in" key={`lazy-${activeScenario}`}>
            <div className="flex items-center gap-2 mb-2.5 text-red-400 px-4">
              <User className="w-4 h-4" />
              <span className="text-[13px] font-black tracking-wide">הגישה ה"עצלנית" – מה לא לעשות</span>
            </div>
            <div className="bg-slate-900/30 border border-red-500/15 rounded-2xl p-4 shadow-sm flex flex-col gap-3 hover:border-red-500/25 transition-colors">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/40">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">הפרומפט (דל):</p>
                  <p className="text-[13px] text-slate-400 italic line-clamp-3 leading-relaxed">"{current.lazy.prompt}"</p>
                </div>
                <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/30">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">התשובה שתקבלי:</p>
                  <p className="text-[13px] text-slate-400 italic line-clamp-3 leading-relaxed">{current.lazy.response}</p>
                </div>
              </div>
              <div className="pt-2.5 border-t border-red-500/15 flex items-center gap-3 text-red-400/90">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-[11px] font-semibold">{current.lazy.drawback}</p>
              </div>
            </div>
          </div>

          {/* Good Approach Section */}
          <div className="flex-1 flex flex-col min-h-0 animate-fade-slide-in" key={`good-${activeScenario}`}>
            <div className="flex items-center gap-2 mb-2.5 text-indigo-400 px-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[13px] font-black tracking-wide">הגישה המקצועית – ישר ב-IDE</span>
            </div>
            <div className="flex-1 bg-slate-900 gradient-border-indigo rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 animate-glow-pulse">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.07] blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/[0.04] blur-[100px] pointer-events-none" />

              <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                {/* Prompt Box */}
                <div className="flex flex-col min-h-0">
                  <p className="text-[11px] font-bold text-indigo-400/90 mb-2.5 uppercase tracking-wider px-1">הפרומפט ב-Copilot / Claude Code:</p>
                  <div className="flex-1 bg-slate-950/90 p-5 rounded-2xl border border-indigo-900/40 text-blue-50 text-[15px] leading-[1.8] font-medium shadow-2xl overflow-y-auto custom-scrollbar">
                    "{current.good.prompt}"
                  </div>
                </div>

                {/* Response Box */}
                <div className="flex flex-col min-h-0">
                  <p className="text-[11px] font-bold text-slate-400 mb-2.5 uppercase px-1">התשובה המנצחת שתקבלי:</p>
                  <div className="flex-1 bg-indigo-950/25 p-5 rounded-2xl border border-indigo-800/25 text-slate-200 text-[15px] leading-[1.8] overflow-y-auto custom-scrollbar backdrop-blur-sm">
                    {current.good.response}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-1 pt-3.5 border-t border-indigo-500/15 flex items-center justify-center gap-3 shrink-0">
                <div className="flex items-center gap-2.5 bg-emerald-500/10 px-5 py-2 rounded-full border border-emerald-500/20">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-[12px] font-black tracking-wide text-emerald-400">{current.good.benefit}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* LEFT: THE RECIPE FLOW (3/12) */}
        <div className="lg:col-span-3 border-r border-slate-800/50 flex flex-col overflow-hidden h-full bg-slate-950/30">
          <div className="p-4 border-b border-slate-800/50 shrink-0 bg-slate-950/80">
            <h2 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.15em] flex items-center gap-2.5">
              <Code2 className="w-4 h-4" />
              מתכון הפרומפט ב-IDE
            </h2>
            <p className="text-[10px] text-slate-500 mt-1.5">Copilot · Claude Code · Cursor</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 pt-7 flex flex-col gap-5 overflow-x-visible">

            {/* Step 1 */}
            <div className="recipe-step">
              <div className="relative overflow-visible bg-slate-900/70 border border-blue-500/20 p-5 pt-6 rounded-2xl flex flex-col gap-3 hover-lift hover:border-blue-500/40 transition-all cursor-default">
                <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/30 ring-4 ring-slate-950 z-10">1</div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-slate-100 mb-1">סמני</h4>
                  <p className="text-[12px] text-slate-400 leading-relaxed">סמני את הקוד הרלוונטי לפני ששואלת. השתמשי ב-<span className="text-blue-300 font-mono">@workspace</span> לסריקת כל הפרויקט או <span className="text-blue-300 font-mono">#file</span> לקובץ ספציפי.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="recipe-step">
              <div className="relative overflow-visible bg-slate-900/70 border border-purple-500/20 p-5 pt-6 rounded-2xl flex flex-col gap-3 hover-lift hover:border-purple-500/40 transition-all cursor-default">
                <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30 ring-4 ring-slate-950 z-10">2</div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-slate-100 mb-1">שאלי ממוקד</h4>
                  <p className="text-[12px] text-slate-400 leading-relaxed">"למה הפונקציה מחזירה null?" עדיף על "זה לא עובד". <span className="text-purple-300">ה-AI כבר רואה את הקוד — פרומפט קצר = תשובה טובה יותר</span>.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="recipe-step">
              <div className="relative overflow-visible bg-slate-900/70 border border-emerald-500/20 p-5 pt-6 rounded-2xl flex flex-col gap-3 hover-lift hover:border-emerald-500/40 transition-all cursor-default">
                <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-500/30 ring-4 ring-slate-950 z-10">3</div>
                <div className="flex items-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-slate-100 mb-1">קראי לפני ✅</h4>
                  <p className="text-[12px] text-slate-400 leading-relaxed">ה-AI הציע שינוי? <span className="text-emerald-300">קראי כל שורה</span>. "תסבירי מה שינית ולמה" — <span className="text-emerald-300 font-bold">לפני שלוחצים Accept</span>.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="recipe-step">
              <div className="relative overflow-visible bg-slate-900/70 border border-amber-500/20 p-5 pt-6 rounded-2xl flex flex-col gap-3 hover-lift hover:border-amber-500/40 transition-all cursor-default">
                <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-amber-500/30 ring-4 ring-slate-950 z-10">4</div>
                <div className="flex items-center">
                  <HelpCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-slate-100 mb-1">למה?</h4>
                  <p className="text-[12px] text-slate-400 leading-relaxed">"למה הדרך הזו עדיפה?" — <span className="text-amber-300">זה הטיפ הכי חשוב</span>. בלי זה את רק לוחצת Accept בלי ללמוד.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-2 px-6 border-t border-slate-800/50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-between shrink-0 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Learning Dashboard Active</span>
          </div>
        </div>
        <p className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-black">
          Prompt Smart. Accept Wise.
        </p>
      </footer>

    </div>
  );
};

export default App;
