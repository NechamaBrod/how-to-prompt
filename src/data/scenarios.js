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
      prompt: "סמנתי את השורה שקורסת. הנה ה-Stack Trace מהטרמינל:\n\njava.lang.NullPointerException: Cannot invoke \"String.length()\"\n  at UserService.validate(UserService.java:42)\n  at MainApp.run(MainApp.java:18)\n\n@workspace — למה name יכול להיות null בשורה 42? תעקבי מאיפה הוא מגיע בפרויקט ותראי לי את כל השרשרת",
      response: "Copilot יסרוק את כל הפרויקט, יראה את כל המקומות ש-name מקבל ערך ויצביע על הנקודה שבה הוא לא אותחל.",
      benefit: "Stack Trace + @workspace = אבחון מדויק פי כמה."
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
      prompt: "הנה הלוג האדום שקפץ בקונסול כשהרצתי את השרת:\n\nError creating bean 'userController': Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'com.app.service.UserService'\n\n@workspace תסרקי את הפרויקט — UserService קיימת בקובץ UserService.java אבל Spring לא מזהה אותה. מה חסר?",
      response: "Copilot יסרוק את כל המחלקות, ימצא ש-UserService חסרת @Service ויסביר למה Spring לא מזהה אותה.",
      benefit: "לוג מלא + שם הקובץ = אבחון תוך שניות."
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
      prompt: "ב-VS Code מופיע קו אדום מתחת ל-import requests, וכשאני מריצה מהטרמינל:\n\nModuleNotFoundError: No module named 'requests'\n\nכבר עשיתי pip install requests והוא אמר שזה מותקן.\nה-interpreter שנבחר למטה ב-VS Code הוא Python 3.11.4.\n@workspace — תבדקי למה זה לא מוצא את הספרייה. אולי venv לא מסונכרן עם ה-interpreter?",
      response: "Copilot יזהה את הסביבה הפעילה, יבין שיש קונפליקט בין ה-interpreter לvenv ויסביר איך לתקן ב-2 לחיצות.",
      benefit: "פירוט מה כבר ניסית = AI לא חוזר על עצות שלא עבדו."
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
      prompt: "מקבלת את השגיאה הזו ב-DevTools Console:\n\nAccess to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header\n\nה-Frontend רץ על 3000, השרת על 5000.\n@workspace — תראי לי את הגדרות השרת הנוכחיות ותוסיפי CORS middleware שיעבוד רק מהדומיין שלי ולא '*'",
      response: "Copilot יקרא את קוד השרת, יראה שחסר הגדרת CORS ויוסיף את הקוד המדויק המותאם לפרויקט שלך.",
      benefit: "הודעת שגיאה מלאה מ-DevTools = פתרון מדויק וגם מאובטח."
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
      prompt: "יש קו אדום ב-pom.xml בשורה הזו:\n\n<dependency>\n  <groupId>org.json</groupId>\n  <artifactId>json</artifactId>\n  <version>20230227</version>\n</dependency>\n\nהשגיאה: Could not resolve dependencies.\n@workspace — תבדקי מה הגרסה הנכונה שקיימת ב-Maven Central ותתקני לי את ה-pom.xml",
      response: "Copilot יזהה שהגרסה לא קיימת ב-Maven Central, יציע גרסה תקינה ויסביר איך לבצע Reload.",
      benefit: "העתקת הקוד הבעייתי + השגיאה = תיקון כירורגי."
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
      prompt: "הדפדפן נתקע ואני מקבלת בקונסול:\nToo many re-renders. React limits the number of renders to prevent an infinite loop.\n\nסמנתי את הקומפוננטה — זה ה-useEffect שלי:\n\nuseEffect(() => {\n  setItems(fetchData());\n});\n\n@workspace — למה זה גורם ללופ אינסופי? איך מתקנים בלי לשבור את העדכון?",
      response: "Copilot יראה את ה-useEffect המסומן, יזהה שה-state מתעדכן בפנים בלי תנאי ויסביר כיצד לתקן עם dependency array נכון.",
      benefit: "הקוד הבעייתי מודבק → AI רואה בדיוק את הבעיה."
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
      prompt: "אני שולחת בקשה מ-Postman ומקבלת 401.\nהנה ה-Headers שאני שולחת:\nAuthorization: Bearer eyJhbGciOiJIUzI1...\n\nוהנה התשובה מהשרת:\n{ \"error\": \"jwt malformed\" }\n\n@workspace — תבדקי את ה-auth middleware שלי. אני כן שולחת Token, אז למה הוא לא מתקבל?",
      response: "Copilot יקרא את ה-middleware, ימצא שהוא מחפש 'Bearer token' אבל הקוד לא מפצל נכון — ויתקן.",
      benefit: "Headers + תשובת שרת מודבקים = AI מבין את שני הצדדים."
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
      prompt: "אחרי git merge נוצר conflict ב-App.js. הנה מה שאני רואה בקובץ:\n\n<<<<<<< HEAD\n<Header title=\"Dashboard\" />\n=======\n<Header title=\"לוח בקרה\" showLogo={true} />\n>>>>>>> feature/hebrew\n\nאני רוצה גם את הלוגו וגם את השם בעברית.\n@workspace — תעזרי לי למזג את שני הצדדים בצורה שמשלבת את שניהם",
      response: "Copilot יקרא את שני הצדדים, יבין שאת רוצה את שני השינויים ויכתוב שורה ממוזגת שכוללת גם עברית וגם לוגו.",
      benefit: "הדבקת הקונפליקט + מה שאת רוצה = מיזוג חכם."
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
      prompt: "ה-Query הזה לוקח 10 שניות:\nSELECT * FROM users WHERE email = 'test@test.com';\n\nהרצתי EXPLAIN ומצאתי:\nSeq Scan on users  (rows=50000)\n\nהנה ה-schema:\nCREATE TABLE users (id SERIAL, name VARCHAR, email VARCHAR, created_at TIMESTAMP);\n\n@workspace — מה חסר כאן כדי לזרז? ואיך אני מוודאת שזה לא יפגע ב-INSERT?",
      response: "Copilot יראה את ה-EXPLAIN ואת ה-schema, יזהה שחסר INDEX על email ויכתוב את פקודת ה-SQL המדויקת עם הסבר על ה-tradeoff.",
      benefit: "EXPLAIN + Schema מודבקים = אופטימיזציה מבוססת עובדות."
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
      prompt: "מקבלת שגיאה אדומה בדפדפן:\nError: useState only works in Client Components.\n\nהקובץ הוא app/dashboard/page.tsx — הוא Server Component שמושך data מ-DB אבל גם מציג טאבים אינטראקטיביים עם useState.\n\n@workspace — האם כל הקובץ צריך 'use client' או שעדיף לפצל? תציעי ארכיטקטורה שמשאירה את ה-data fetching בצד שרת",
      response: "Copilot יראה את הקומפוננטה, יציע לחלץ רק את הטאבים לקובץ Client נפרד — ולהשאיר את ה-data fetching ב-Server.",
      benefit: "הסבר מה הקובץ עושה → AI מציע ארכיטקטורה, לא תיקון עיוור."
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
      prompt: "צילום מסך מצורף — הטקסט צמוד לשמאל למרות שהגדרתי מרכוז.\n\nהנה ה-CSS הנוכחי של הקונטיינר:\n.card { display: flex; width: 100%; }\n.card-text { margin: auto; }\n\nואבא שלו:\n.grid { display: grid; grid-template-columns: 1fr 1fr; }\n\n@workspace — למה ה-text-align לא עובד? תתקני בלי לשבור את ה-Grid של שאר הכרטיסיות",
      response: "Copilot יראה את ה-CSS של הdiv וסביבתו, יזהה ש-flex דורס את ה-margin: auto ויציע תיקון ממוקד.",
      benefit: "צילום מסך + CSS מודבק = תיקון שלא שובר כלום."
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
      prompt: "יש לי MCP server שעובד עם 2 Tools קיימים (ראי את index.ts).\nאני רוצה להוסיף Tool שלישי שמחזיר רשימת קבצים מתיקייה.\n\nהנה דוגמה ל-Tool קיים שעובד אצלי:\n\nserver.tool('get-user', { id: z.string() }, async ({ id }) => {\n  return { content: [{ type: 'text', text: JSON.stringify(db.getUser(id)) }] };\n});\n\n@workspace — תכתבי Tool חדש באותו סגנון שמקבל path ומחזיר את רשימת הקבצים",
      response: "Copilot תקרא את ה-server הקיים, תבין את המבנה ותכתוב Tool חדש שמשתלב בצורה עקבית עם הקוד.",
      benefit: "דוגמה עובדת מהקוד שלך = AI ממשיך באותו סגנון בדיוק."
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
      prompt: "הרצתי docker-compose up ומקבלת:\n\nError: Bind for 0.0.0.0:3000 failed: port is already allocated\n\nכבר הרצתי lsof -i :3000 וראיתי שהפורט תפוס ע\"י node (PID 12345).\n\n@workspace — תסתכלי על ה-Dockerfile וה-docker-compose שלי. אני רוצה לשנות את הפורט ל-3001 — מה צריך לעדכן בכל הקבצים כדי שלא ישבר?",
      response: "Copilot תקרא את כל קבצי ה-config, תזהה כל מקום שמפנה לפורט 3000 ותציע שינוי מסונכרן בכולם.",
      benefit: "מה כבר בדקת + שאלה ממוקדת = תיקון בלי ניסוי וטעייה."
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
      prompt: "הפונקציה getTotal מחזירה undefined. הוספתי כמה לוגים:\n\nconsole.log('items:', items)  // → [{price: 10}, {price: 20}]\nconsole.log('result:', result) // → undefined\n\nהנה הפונקציה עצמה (סימנתי אותה).\nנראה שהמידע נכנס תקין אבל התוצאה ריקה.\n\n@workspace — למה result יוצא undefined? תסבירי מה קורה שלב אחרי שלב ותציעי Breakpoint שיעזור",
      response: "Copilot תזהה שהפונקציה אסינכרונית וחסר await, תסביר את ה-flow ותציע Breakpoint מדויק.",
      benefit: "לוגים שכבר הרצת + הקוד = AI לא צריך לנחש."
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
      prompt: "ה-Frontend שולח POST עם הגוף הזה:\n{ products: [{ name: \"Chair\", price: 100 }] }\n\nאבל השרת מחזיר 400 עם:\n{ error: \"items is required\" }\n\nנראה שהשרת מצפה לשדה 'items' ולא 'products'.\n@workspace — תשווי את ה-POST endpoint בשרת עם ה-fetch ב-Frontend ותתקני את אי-ההתאמה",
      response: "Copilot תשווה בין ה-Backend לה-Frontend, תמצא שהשרת מצפה ל-items והלקוח שולח products — ותציע תיקון מסונכרן.",
      benefit: "Request + Response מודבקים = AI רואה את הפער מיד."
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
      prompt: "Copilot הציע לשנות את fetchUsers מ-async/await לשימוש ב-.then().\nלפני שאני לוחצת Accept:\n\nהנה הקוד הנוכחי שעובד:\nasync function fetchUsers() {\n  const res = await fetch('/api/users');\n  return res.json();\n}\n\nתסבירי — מה ההבדל בין שתי הגישות? האם השינוי ישפיע על הקוד שקורא לפונקציה הזו?",
      response: "Copilot יסביר את ההבדל, יראה שקוד אחר ב-codebase משתמש ב-await על fetchUsers ולכן שינוי ל-.then() ישבור אותם.",
      benefit: "שואלת לפני Accept = למידה אמיתית + מונעת באגים."
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
      prompt: "סמנתי את הפונקציה processOrder (50 שורות). הבעיות שאני רואה:\n1. שמות משתנים לא ברורים (a, b, tmp)\n2. יש 3 בלוקים של if-else שנראים דומים\n3. חלקים חוזרים על עצמם\n\n@workspace — תשפרי קריאות בלי לשנות לוגיקה. תסבירי כל שינוי שעשית ולמה, ותוודאי שהפלט זהה",
      response: "Copilot תעשה refactor ממוקד: תשנה שמות ל-meaningful, תאחד את הכפילויות לפונקציה, תשאיר לוגיקה זהה — עם הסבר לכל שינוי.",
      benefit: "את מכוונת את ה-refactor → הוא לא משנה מה שלא ביקשת."
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
      prompt: "סמנתי את שורות 14-22 ב-CartService.js.\nפתחתי Inline Chat:\n\n'הפונקציה calcDiscount מחזירה 0 כשיש 3 פריטים בעגלה, למרות שלפי הלוגיקה צריכה להחזיר 10%.\nהנה דוגמת input: items = [{price:50}, {price:30}, {price:20}].\nלמה?'",
      response: "עם הסימון + דוגמת input Copilot רואה בדיוק מה לא עובד, מריץ את הלוגיקה בראש ומוצא את הבאג.",
      benefit: "סימון + דוגמה + שאלה ממוקדת = הכוח האמיתי של IDE."
    }
  }
};

export const scenarioKeys = Object.keys(scenarios);
export const scenarioCount = scenarioKeys.length;

export default scenarios;
