// Scenario data for the "How to Prompt" dashboard
// Each scenario has: title, lazy (prompt, response, drawback), good (prompt, response, benefit)

export const scenarios = {
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

export const scenarioKeys = Object.keys(scenarios);
export const scenarioCount = scenarioKeys.length;

export default scenarios;
