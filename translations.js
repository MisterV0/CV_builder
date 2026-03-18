const TRANSLATIONS = {
    en: {
        // Form Section Titles
        sections: {
            personalProfile: "Personal Profile",
            workExperience: "Work Experience",
            education: "Education",
            certifications: "Certifications",
            skills: "Skills",
            languages: "Languages",
            personalProjects: "Personal Projects"
        },

        // Form Labels
        labels: {
            fullName: "Full Name",
            targetRole: "Target Role",
            summary: "Summary",
            email: "Email",
            phone: "Phone",
            location: "Location",
            openToRelocate: "Open to relocate",
            jobTitle: "Job Title",
            company: "Company",
            timeline: "Timeline",
            description: "Description",
            currentlyWorking: "Currently working",
            present: "Present",
            degree: "Degree",
            fieldOfStudy: "Field of Study",
            school: "School",
            graduation: "Graduation",
            category: "Category",
            skill: "Skill",
            name: "Name",
            issuer: "Issuer",
            date: "Date",
            url: "URL",
            projectName: "Project Name",
            projectDescription: "Description",
            projectLink: "Link"
        },

        // Placeholders
        placeholders: {
            summary: "Brief professional intro...",
            location: "City, Country",
            linkedin: "linkedin.com/in/username or username",
            github: "github.com/username or username",
            website: "www.portfolio.com",
            skillCategory: "e.g. Design",
            skillName: "e.g. Figma",
            languageName: "e.g. English",
            projectLink: "https://github.com/user/project"
        },

        // Buttons
        buttons: {
            addPosition: "+ Add Position",
            addEducation: "+ Add Education",
            addCertificate: "+ Add Certificate",
            addSkill: "+ Add Skill",
            addLanguage: "+ Add Language",
            generatePDF: "Generate PDF",
            remove: "Remove",
            back: "Back",
            downloadPDF: "Download PDF",
            showFinalResult: "Show Final Result",
            resetAll: "Reset all fields",
            resetCancel: "Cancel",
            resetConfirm: "Reset All",
            addProject: "+ Add Project"
        },
        reset: {
            title: "Are you sure?",
            message: "This action cannot be undone. All your entered data will be permanently deleted.",
            success: "All fields have been successfully reset."
        },

        demo: {
            bannerText: "Want to see how a completed CV looks?",
            buttonLabel: "Try Demo Data",
            loaded: "Demo data loaded! Feel free to generate a PDF."
        },

        // Social Links
        social: {
            linkedin: "LinkedIn",
            github: "GitHub",
            website: "Website",
            addLinkedIn: "Add LinkedIn",
            addGitHub: "Add GitHub",
            addWebsite: "Add Website"
        },

        // Date Picker
        datePicker: {
            month: "Month",
            year: "Year"
        },

        // Months (full names)
        months: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],

        // Proficiency Levels
        proficiency: {
            noLevel: "No Level",
            // Skills
            beginner: "Beginner",
            competent: "Competent",
            expert: "Expert",
            // Languages
            basicUser: "Basic User",
            independentUser: "Independent User",
            proficientUser: "Proficient User"
        },

        // Loading Modal
        loading: {
            title: "Generating Your CV",
            subtitle: "Please wait while we prepare your document"
        },

        // Preview Toolbar
        preview: {
            modern: "Modern",
            serif: "Serif",
            jakarta: "Jakarta",
            robotic: "Robotic",
            elegant: "Elegant"
        },

        // Tooltips
        tooltips: {
            photo: "CVs with a professional photo are 40% more likely to attract recruiter attention",
            certification: "Adding the link to your certification will display a verified badge in your CV",
            skills: "Click a level segment to show it. Click again to remove it."
        },

        // Character Counter
        counter: {
            characters: "characters",
            over: "over"
        },

        // ATS Score Checker (from validation.js)
        ats: {
            button: "Check ATS Score",
            modalTitle: "Analyze your CV's ATS compatibility",
            addContent: "Add Content to Analyze",
            addContentMessage: "Please add at least one of the following to get your ATS score:",
            profileSummary: "Profile Summary",
            skillsSection: "Skills Section",
            workExperience: "Work Experience Descriptions",
            scoreLabel: "ATS Compatibility Score",
            foundKeywords: "Found Keywords",
            suggestedKeywords: "Suggested Keywords",
            tipGreat: "Great! Your CV has good ATS compatibility. Keep it up!",
            tipGood: "Your CV could benefit from more action verbs and relevant keywords in your experience descriptions.",
            tipNeedsWork: "Consider adding more action verbs, skills, and quantifiable results to improve your ATS score."
        },

        // CV Health Score
        healthScore: {
            tooltip: "Click to view detailed CV health analysis",
            modalTitle: "CV Health Score",
            completeness: "Completeness",
            length: {
                label: "Length:",
                tooShort: "Too Short",
                good: "Good (1 page)",
                perfect: "Perfect (1-2 pages)",
                long: "Long (2+ pages)"
            },
            warnings: {
                label: "Warnings",
                noPhone: "No phone number",
                noSkills: "Skills section empty",
                noSummary: "No profile summary",
                noLinkedIn: "No LinkedIn profile",
                noWorkExperience: "No work experience",
                noEducation: "No education entries",
                noLocation: "No location specified"
            },
            suggestions: {
                label: "Suggestions",
                addSkills: "Add 2-3 skills",
                addOneMoreSkill: "Add 1 more skill",
                addTwoMoreSkills: "Add 2 more skills",
                addSocialLinks: "Add GitHub or personal website for bonus points",
                expandSummary: "Expand your profile summary",
                quantifyAchievements: "Quantify achievements with numbers",
                completeOneWorkEntry: "Complete 1 work experience entry",
                completeMultipleWorkEntries: "Complete {count} work experience entries"
            }
        },

        // Language Change Warning
        languageChange: {
            warning: "Change Language?",
            message: "If you choose to change the language now, all inserted information will be lost.",
            confirm: "Change Language",
            cancel: "Cancel"
        }
    },

    it: {
        // Form Section Titles
        sections: {
            personalProfile: "Profilo Personale",
            workExperience: "Esperienza Lavorativa",
            education: "Istruzione",
            certifications: "Certificazioni",
            skills: "Competenze",
            languages: "Lingue",
            personalProjects: "Progetti Personali"
        },

        // Form Labels
        labels: {
            fullName: "Nome Completo",
            targetRole: "Ruolo Obiettivo",
            summary: "Riassunto",
            email: "Email",
            phone: "Telefono",
            location: "Posizione",
            openToRelocate: "Disponibile a trasferirsi",
            jobTitle: "Posizione Lavorativa",
            company: "Azienda",
            timeline: "Periodo",
            description: "Descrizione",
            currentlyWorking: "Attualmente in carica",
            present: "Presente",
            degree: "Titolo di Studio",
            fieldOfStudy: "Campo di Studi",
            school: "Istituto",
            graduation: "Laurea",
            category: "Categoria",
            skill: "Competenza",
            name: "Nome",
            issuer: "Ente Rilasciante",
            date: "Data",
            url: "URL",
            projectName: "Nome Progetto",
            projectDescription: "Descrizione",
            projectLink: "Link"
        },

        // Placeholders
        placeholders: {
            summary: "Breve introduzione professionale...",
            location: "Città, Paese",
            linkedin: "linkedin.com/in/nomeutente o nomeutente",
            github: "github.com/nomeutente o nomeutente",
            website: "www.portfolio.com",
            skillCategory: "es. Design",
            skillName: "es. Figma",
            languageName: "es. Italiano",
            projectLink: "https://github.com/utente/progetto"
        },

        // Buttons
        buttons: {
            addPosition: "+ Aggiungi Posizione",
            addEducation: "+ Aggiungi Istruzione",
            addCertificate: "+ Aggiungi Certificato",
            addSkill: "+ Aggiungi Competenza",
            addLanguage: "+ Aggiungi Lingua",
            generatePDF: "Genera PDF",
            remove: "Rimuovi",
            back: "Indietro",
            downloadPDF: "Scarica PDF",
            showFinalResult: "Mostra Risultato Finale",
            resetAll: "Reimposta tutti i campi",
            resetCancel: "Annulla",
            resetConfirm: "Reimposta tutto",
            addProject: "+ Aggiungi Progetto"
        },
        reset: {
            title: "Sei sicuro?",
            message: "Questa azione non può essere annullata. Tutti i dati inseriti verranno eliminati definitivamente.",
            success: "Tutti i campi sono stati ripristinati con successo."
        },

        demo: {
            bannerText: "Vuoi vedere come appare un CV completo?",
            buttonLabel: "Prova i Dati Demo",
            loaded: "Dati demo caricati! Prova a generare un PDF."
        },

        // Social Links
        social: {
            linkedin: "LinkedIn",
            github: "GitHub",
            website: "Sito Web",
            addLinkedIn: "Aggiungi LinkedIn",
            addGitHub: "Aggiungi GitHub",
            addWebsite: "Aggiungi Sito Web"
        },

        // Date Picker
        datePicker: {
            month: "Mese",
            year: "Anno"
        },

        // Months (full names in Italian)
        months: [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ],

        // Proficiency Levels
        proficiency: {
            noLevel: "Nessun Livello",
            // Skills
            beginner: "Principiante",
            competent: "Competente",
            expert: "Esperto",
            // Languages
            basicUser: "Utente Base",
            independentUser: "Utente Indipendente",
            proficientUser: "Utente Esperto"
        },

        // Loading Modal
        loading: {
            title: "Generazione del Tuo CV",
            subtitle: "Attendere mentre prepariamo il documento"
        },

        // Preview Toolbar
        preview: {
            modern: "Moderno",
            serif: "Serif",
            jakarta: "Jakarta",
            robotic: "Robotico",
            elegant: "Elegante"
        },

        // Tooltips
        tooltips: {
            photo: "I CV con una foto professionale hanno il 40% di probabilità in più di attirare l'attenzione dei recruiter",
            certification: "Aggiungere il link alla tua certificazione mostrerà un badge verificato nel tuo CV",
            skills: "Clicca su un segmento di livello per mostrarlo. Clicca di nuovo per rimuoverlo."
        },

        // Character Counter
        counter: {
            characters: "caratteri",
            over: "oltre"
        },

        // ATS Score Checker
        ats: {
            button: "Verifica Punteggio ATS",
            modalTitle: "Analizza la compatibilità ATS del tuo CV",
            addContent: "Aggiungi Contenuto da Analizzare",
            addContentMessage: "Aggiungi almeno uno dei seguenti per ottenere il tuo punteggio ATS:",
            profileSummary: "Riassunto del Profilo",
            skillsSection: "Sezione Competenze",
            workExperience: "Descrizioni Esperienza Lavorativa",
            scoreLabel: "Punteggio Compatibilità ATS",
            foundKeywords: "Parole Chiave Trovate",
            suggestedKeywords: "Parole Chiave Suggerite",
            tipGreat: "Ottimo! Il tuo CV ha una buona compatibilità ATS. Continua così!",
            tipGood: "Il tuo CV potrebbe beneficiare di più verbi d'azione e parole chiave rilevanti nelle descrizioni dell'esperienza.",
            tipNeedsWork: "Considera di aggiungere più verbi d'azione, competenze e risultati quantificabili per migliorare il tuo punteggio ATS."
        },

        // CV Health Score
        healthScore: {
            tooltip: "Clicca per visualizzare l'analisi dettagliata della salute del CV",
            modalTitle: "Punteggio Salute CV",
            completeness: "Completezza",
            length: {
                label: "Lunghezza:",
                tooShort: "Troppo Corto",
                good: "Buono (1 pagina)",
                perfect: "Perfetto (1-2 pagine)",
                long: "Lungo (2+ pagine)"
            },
            warnings: {
                label: "Avvisi",
                noPhone: "Nessun numero di telefono",
                noSkills: "Sezione competenze vuota",
                noSummary: "Nessun riassunto del profilo",
                noLinkedIn: "Nessun profilo LinkedIn",
                noWorkExperience: "Nessuna esperienza lavorativa",
                noEducation: "Nessuna voce di istruzione",
                noLocation: "Nessuna posizione specificata"
            },
            suggestions: {
                label: "Suggerimenti",
                addSkills: "Aggiungi 2-3 competenze",
                addOneMoreSkill: "Aggiungi 1 competenza in più",
                addTwoMoreSkills: "Aggiungi 2 competenze in più",
                addSocialLinks: "Aggiungi GitHub o sito web personale per punti bonus",
                expandSummary: "Espandi il riassunto del tuo profilo",
                quantifyAchievements: "Quantifica i risultati con numeri",
                completeOneWorkEntry: "Completa 1 voce di esperienza lavorativa",
                completeMultipleWorkEntries: "Completa {count} voci di esperienza lavorativa"
            }
        },

        // Language Change Warning
        languageChange: {
            warning: "Cambiare Lingua?",
            message: "Se scegli di cambiare lingua ora, tutte le informazioni inserite verranno perse.",
            confirm: "Cambia Lingua",
            cancel: "Annulla"
        }
    },

    ro: {
        // Form Section Titles
        sections: {
            personalProfile: "Profil Personal",
            workExperience: "Experiență Profesională",
            education: "Educație",
            certifications: "Certificări",
            skills: "Competențe",
            languages: "Limbi",
            personalProjects: "Proiecte Personale"
        },

        // Form Labels
        labels: {
            fullName: "Nume Complet",
            targetRole: "Rol Vizat",
            summary: "Rezumat",
            email: "Email",
            phone: "Telefon",
            location: "Locație",
            openToRelocate: "Deschis la relocare",
            jobTitle: "Funcție",
            company: "Companie",
            timeline: "Perioadă",
            description: "Descriere",
            currentlyWorking: "În prezent activez",
            present: "Prezent",
            degree: "Diplomă",
            fieldOfStudy: "Domeniu de Studiu",
            school: "Instituție",
            graduation: "Absolvire",
            category: "Categorie",
            skill: "Competență",
            name: "Nume",
            issuer: "Organizație Emitentă",
            date: "Data",
            url: "URL",
            projectName: "Nume Proiect",
            projectDescription: "Descriere",
            projectLink: "Link"
        },

        // Placeholders
        placeholders: {
            summary: "Prezentare profesională scurtă...",
            location: "Oraș, Țară",
            linkedin: "linkedin.com/in/username sau username",
            github: "github.com/username sau username",
            website: "www.portfolio.com",
            skillCategory: "ex. Design",
            skillName: "ex. Figma",
            languageName: "ex. Română",
            projectLink: "https://github.com/utilizator/proiect"
        },

        // Buttons
        buttons: {
            addPosition: "+ Adaugă Post",
            addEducation: "+ Adaugă Educație",
            addCertificate: "+ Adaugă Certificat",
            addSkill: "+ Adaugă Competență",
            addLanguage: "+ Adaugă Limbă",
            generatePDF: "Generează PDF",
            remove: "Elimină",
            back: "Înapoi",
            downloadPDF: "Descarcă PDF",
            showFinalResult: "Afișează Rezultatul Final",
            resetAll: "Resetează toate câmpurile",
            resetCancel: "Anulează",
            resetConfirm: "Resetează Tot",
            addProject: "+ Adaugă Proiect"
        },
        reset: {
            title: "Ești sigur?",
            message: "Această acțiune nu poate fi anulată. Toate datele introduse vor fi șterse definitiv.",
            success: "Toate câmpurile au fost resetate cu succes."
        },

        demo: {
            bannerText: "Vrei să vezi cum arată un CV completat?",
            buttonLabel: "Încearcă Date Demo",
            loaded: "Date demo încărcate! Încearcă să generezi un PDF."
        },

        // Social Links
        social: {
            linkedin: "LinkedIn",
            github: "GitHub",
            website: "Site Web",
            addLinkedIn: "Adaugă LinkedIn",
            addGitHub: "Adaugă GitHub",
            addWebsite: "Adaugă Site Web"
        },

        // Date Picker
        datePicker: {
            month: "Lună",
            year: "An"
        },

        // Months (full names in Romanian)
        months: [
            "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
            "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
        ],

        // Proficiency Levels
        proficiency: {
            noLevel: "Fără Nivel",
            // Skills
            beginner: "Începător",
            competent: "Competent",
            expert: "Expert",
            // Languages
            basicUser: "Utilizator de Bază",
            independentUser: "Utilizator Independent",
            proficientUser: "Utilizator Avansat"
        },

        // Loading Modal
        loading: {
            title: "Generarea CV-ului Tău",
            subtitle: "Te rugăm să aștepți în timp ce pregătim documentul"
        },

        // Preview Toolbar
        preview: {
            modern: "Modern",
            serif: "Serif",
            jakarta: "Jakarta",
            robotic: "Robotic",
            elegant: "Elegant"
        },

        // Tooltips
        tooltips: {
            photo: "CV-urile cu fotografie profesională au cu 40% mai multe șanse să atragă atenția recrutatorilor",
            certification: "Adăugarea link-ului la certificarea ta va afișa un badge verificat în CV-ul tău",
            skills: "Apasă pe un segment de nivel pentru a-l afișa. Apasă din nou pentru a-l elimina."
        },

        // Character Counter
        counter: {
            characters: "caractere",
            over: "peste"
        },

        // ATS Score Checker
        ats: {
            button: "Verifică Scorul ATS",
            modalTitle: "Analizează compatibilitatea ATS a CV-ului tău",
            addContent: "Adaugă Conținut pentru Analiză",
            addContentMessage: "Te rugăm să adaugi cel puțin unul dintre următoarele pentru a obține scorul ATS:",
            profileSummary: "Rezumat Profil",
            skillsSection: "Secțiunea Competențe",
            workExperience: "Descrieri Experiență Profesională",
            scoreLabel: "Scor Compatibilitate ATS",
            foundKeywords: "Cuvinte Cheie Găsite",
            suggestedKeywords: "Cuvinte Cheie Sugerate",
            tipGreat: "Excelent! CV-ul tău are o bună compatibilitate ATS. Continuă tot așa!",
            tipGood: "CV-ul tău ar putea beneficia de mai mulți verbi de acțiune și cuvinte cheie relevante în descrierile experienței tale.",
            tipNeedsWork: "Luați în considerare adăugarea mai multor verbi de acțiune, competențe și rezultate cuantificabile pentru a îmbunătăți scorul ATS."
        },

        // CV Health Score
        healthScore: {
            tooltip: "Apasă pentru a vedea analiza detaliată a sănătății CV-ului",
            modalTitle: "Scor Sănătate CV",
            completeness: "Completitudine",
            length: {
                label: "Lungime:",
                tooShort: "Prea Scurt",
                good: "Bun (1 pagină)",
                perfect: "Perfect (1-2 pagini)",
                long: "Lung (2+ pagini)"
            },
            warnings: {
                label: "Avertismente",
                noPhone: "Fără număr de telefon",
                noSkills: "Secțiunea competențe goală",
                noSummary: "Fără rezumat profil",
                noLinkedIn: "Fără profil LinkedIn",
                noWorkExperience: "Fără experiență profesională",
                noEducation: "Fără intrări educaționale",
                noLocation: "Fără locație specificată"
            },
            suggestions: {
                label: "Sugestii",
                addSkills: "Adaugă 2-3 competențe",
                addOneMoreSkill: "Adaugă 1 competență în plus",
                addTwoMoreSkills: "Adaugă 2 competențe în plus",
                addSocialLinks: "Adaugă GitHub sau site web personal pentru puncte bonus",
                expandSummary: "Extinde rezumatul profilului tău",
                quantifyAchievements: "Cuantifică realizările cu numere",
                completeOneWorkEntry: "Completează 1 intrare experiență profesională",
                completeMultipleWorkEntries: "Completează {count} intrări experiență profesională"
            }
        },

        // Language Change Warning
        languageChange: {
            warning: "Schimbare Limbă?",
            message: "Dacă alegi să schimbi limba acum, toate informațiile introduse vor fi pierdute.",
            confirm: "Schimbă Limba",
            cancel: "Anulează"
        }
    },

    ru: {
        // Form Section Titles
        sections: {
            personalProfile: "Личная Информация",
            workExperience: "Опыт Работы",
            education: "Образование",
            certifications: "Сертификаты",
            skills: "Навыки",
            languages: "Языки",
            personalProjects: "Личные Проекты"
        },

        // Form Labels
        labels: {
            fullName: "Полное Имя",
            targetRole: "Целевая Должность",
            summary: "Краткое Описание",
            email: "Email",
            phone: "Телефон",
            location: "Местоположение",
            openToRelocate: "Готов к переезду",
            jobTitle: "Должность",
            company: "Компания",
            timeline: "Период",
            description: "Описание",
            currentlyWorking: "Работаю в настоящее время",
            present: "По настоящее время",
            degree: "Степень",
            fieldOfStudy: "Область Изучения",
            school: "Учебное Заведение",
            graduation: "Окончание",
            category: "Категория",
            skill: "Навык",
            name: "Название",
            issuer: "Организация",
            date: "Дата",
            url: "URL",
            projectName: "Название Проекта",
            projectDescription: "Описание",
            projectLink: "Ссылка"
        },

        // Placeholders
        placeholders: {
            summary: "Краткое профессиональное введение...",
            location: "Город, Страна",
            linkedin: "linkedin.com/in/username или username",
            github: "github.com/username или username",
            website: "www.portfolio.com",
            skillCategory: "например, Дизайн",
            skillName: "например, Figma",
            languageName: "например, Русский",
            projectLink: "https://github.com/user/project"
        },

        // Buttons
        buttons: {
            addPosition: "+ Добавить Должность",
            addEducation: "+ Добавить Образование",
            addCertificate: "+ Добавить Сертификат",
            addSkill: "+ Добавить Навык",
            addLanguage: "+ Добавить Язык",
            generatePDF: "Создать PDF",
            remove: "Удалить",
            back: "Назад",
            downloadPDF: "Скачать PDF",
            showFinalResult: "Показать Результат",
            resetAll: "Сбросить все поля",
            resetCancel: "Отмена",
            resetConfirm: "Сбросить все",
            addProject: "+ Добавить Проект"
        },
        reset: {
            title: "Вы уверены?",
            message: "Это действие необратимо. Все введенные данные будут безвозвратно удалены.",
            success: "Все поля были успешно сброшены."
        },

        demo: {
            bannerText: "Хотите увидеть, как выглядит заполненное резюме?",
            buttonLabel: "Заполнить демо-данными",
            loaded: "Демо-данные загружены! Попробуйте создать PDF."
        },

        // Social Links
        social: {
            linkedin: "LinkedIn",
            github: "GitHub",
            website: "Веб-сайт",
            addLinkedIn: "Добавить LinkedIn",
            addGitHub: "Добавить GitHub",
            addWebsite: "Добавить Веб-сайт"
        },

        // Date Picker
        datePicker: {
            month: "Месяц",
            year: "Год"
        },

        // Months (full names in Russian)
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],

        // Proficiency Levels
        proficiency: {
            noLevel: "Без Уровня",
            // Skills
            beginner: "Начинающий",
            competent: "Компетентный",
            expert: "Эксперт",
            // Languages
            basicUser: "Базовый Пользователь",
            independentUser: "Независимый Пользователь",
            proficientUser: "Свободный Пользователь"
        },

        // Loading Modal
        loading: {
            title: "Создание Вашего Резюме",
            subtitle: "Пожалуйста, подождите, пока мы подготовим ваш документ"
        },

        // Preview Toolbar
        preview: {
            modern: "Современный",
            serif: "С засечками",
            jakarta: "Джакарта",
            robotic: "Роботический",
            elegant: "Элегантный"
        },

        // Tooltips
        tooltips: {
            photo: "Резюме с профессиональной фотографией на 40% чаще привлекают внимание рекрутеров",
            certification: "Добавление ссылки на ваш сертификат отобразит проверенный значок в вашем резюме",
            skills: "Нажмите на сегмент уровня, чтобы показать его. Нажмите снова, чтобы убрать."
        },

        // Character Counter
        counter: {
            characters: "символов",
            over: "сверх"
        },

        // ATS Score Checker
        ats: {
            button: "Проверить ATS Оценку",
            modalTitle: "Проанализируйте ATS-совместимость вашего резюме",
            addContent: "Добавьте Контент для Анализа",
            addContentMessage: "Пожалуйста, добавьте хотя бы одно из следующего, чтобы получить вашу ATS оценку:",
            profileSummary: "Краткое Описание Профиля",
            skillsSection: "Раздел Навыков",
            workExperience: "Описания Опыта Работы",
            scoreLabel: "Оценка ATS Совместимости",
            foundKeywords: "Найденные Ключевые Слова",
            suggestedKeywords: "Рекомендуемые Ключевые Слова",
            tipGreat: "Отлично! Ваше резюме имеет хорошую ATS совместимость. Продолжайте в том же духе!",
            tipGood: "Ваше резюме может выиграть от большего количества глаголов действия и релевантных ключевых слов в описаниях вашего опыта.",
            tipNeedsWork: "Рассмотрите возможность добавления большего количества глаголов действия, навыков и количественных результатов для улучшения вашей ATS оценки."
        },

        // CV Health Score
        healthScore: {
            tooltip: "Нажмите, чтобы просмотреть подробный анализ здоровья резюме",
            modalTitle: "Оценка Здоровья Резюме",
            completeness: "Полнота",
            length: {
                label: "Длина:",
                tooShort: "Слишком Короткое",
                good: "Хорошо (1 страница)",
                perfect: "Отлично (1-2 страницы)",
                long: "Длинное (2+ страницы)"
            },
            warnings: {
                label: "Предупреждения",
                noPhone: "Нет номера телефона",
                noSkills: "Раздел навыков пуст",
                noSummary: "Нет краткого описания профиля",
                noLinkedIn: "Нет профиля LinkedIn",
                noWorkExperience: "Нет опыта работы",
                noEducation: "Нет записей об образовании",
                noLocation: "Местоположение не указано"
            },
            suggestions: {
                label: "Предложения",
                addSkills: "Добавьте 2-3 навыка",
                addOneMoreSkill: "Добавьте 1 навык",
                addTwoMoreSkills: "Добавьте 2 навыка",
                addSocialLinks: "Добавьте GitHub или личный веб-сайт для бонусных баллов",
                expandSummary: "Расширьте краткое описание вашего профиля",
                quantifyAchievements: "Количественно оцените достижения с помощью чисел",
                completeOneWorkEntry: "Завершите 1 запись об опыте работы",
                completeMultipleWorkEntries: "Завершите {count} записей об опыте работы"
            }
        },

        // Language Change Warning
        languageChange: {
            warning: "Изменить Язык?",
            message: "Если вы выберете изменить язык сейчас, вся введенная информация будет потеряна.",
            confirm: "Изменить Язык",
            cancel: "Отмена"
        }
    },

    uk: {
        // Form Section Titles
        sections: {
            personalProfile: "Особиста Інформація",
            workExperience: "Досвід Роботи",
            education: "Освіта",
            certifications: "Сертифікати",
            skills: "Навички",
            languages: "Мови",
            personalProjects: "Особисті Проекти"
        },

        // Form Labels
        labels: {
            fullName: "Повне Ім'я",
            targetRole: "Цільова Посада",
            summary: "Короткий Опис",
            email: "Email",
            phone: "Телефон",
            location: "Місцезнаходження",
            openToRelocate: "Готовий до переїзду",
            jobTitle: "Посада",
            company: "Компанія",
            timeline: "Період",
            description: "Опис",
            currentlyWorking: "Працюю в даний час",
            present: "Поточний час",
            degree: "Ступінь",
            fieldOfStudy: "Галузь Знань",
            school: "Навчальний Заклад",
            graduation: "Закінчення",
            category: "Категорія",
            skill: "Навичка",
            name: "Назва",
            issuer: "Організація",
            date: "Дата",
            url: "URL",
            projectName: "Назва Проекту",
            projectDescription: "Опис",
            projectLink: "Посилання"
        },

        // Placeholders
        placeholders: {
            summary: "Короткий професійний вступ...",
            location: "Місто, Країна",
            linkedin: "linkedin.com/in/username або username",
            github: "github.com/username або username",
            website: "www.portfolio.com",
            skillCategory: "наприклад, Дизайн",
            skillName: "наприклад, Figma",
            languageName: "наприклад, Українська",
            projectLink: "https://github.com/user/project"
        },

        // Buttons
        buttons: {
            addPosition: "+ Додати Посаду",
            addEducation: "+ Додати Освіту",
            addCertificate: "+ Додати Сертифікат",
            addSkill: "+ Додати Навичку",
            addLanguage: "+ Додати Мову",
            generatePDF: "Створити PDF",
            remove: "Видалити",
            back: "Назад",
            downloadPDF: "Завантажити PDF",
            showFinalResult: "Показати Результат",
            resetAll: "Скинути всі поля",
            resetCancel: "Скасувати",
            resetConfirm: "Скинути все",
            addProject: "+ Додати Проект"
        },
        reset: {
            title: "Ви впевнені?",
            message: "Цю дію неможливо скасувати. Всі введені дані будуть остаточно видалені.",
            success: "Всі поля були успішно скинуті."
        },

        demo: {
            bannerText: "Хочете побачити, як виглядає заповнене резюме?",
            buttonLabel: "Заповнити демо-даними",
            loaded: "Демо-дані завантажено! Спробуйте створити PDF."
        },

        // Social Links
        social: {
            linkedin: "LinkedIn",
            github: "GitHub",
            website: "Веб-сайт",
            addLinkedIn: "Додати LinkedIn",
            addGitHub: "Додати GitHub",
            addWebsite: "Додати Веб-сайт"
        },

        // Date Picker
        datePicker: {
            month: "Місяць",
            year: "Рік"
        },

        // Months (full names in Ukrainian)
        months: [
            "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
            "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
        ],

        // Proficiency Levels
        proficiency: {
            noLevel: "Без Рівня",
            // Skills
            beginner: "Початківець",
            competent: "Компетентний",
            expert: "Експерт",
            // Languages
            basicUser: "Базовий Користувач",
            independentUser: "Незалежний Користувач",
            proficientUser: "Вільний Користувач"
        },

        // Loading Modal
        loading: {
            title: "Створення Вашого Резюме",
            subtitle: "Будь ласка, зачекайте, поки ми підготуємо ваш документ"
        },

        // Preview Toolbar
        preview: {
            modern: "Сучасний",
            serif: "З засічками",
            jakarta: "Джакарта",
            robotic: "Роботичний",
            elegant: "Елегантний"
        },

        // Tooltips
        tooltips: {
            photo: "Резюме з професійною фотографією на 40% частіше привертають увагу рекрутерів",
            certification: "Додавання посилання на ваш сертифікат відобразить перевірений значок у вашому резюме",
            skills: "Натисніть на сегмент рівня, щоб показати його. Натисніть знову, щоб прибрати."
        },

        // Character Counter
        counter: {
            characters: "символів",
            over: "понад"
        },

        // ATS Score Checker
        ats: {
            button: "Перевірити ATS Оцінку",
            modalTitle: "Проаналізуйте ATS-сумісність вашого резюме",
            addContent: "Додайте Контент для Аналізу",
            addContentMessage: "Будь ласка, додайте принаймні одне з наступного, щоб отримати вашу ATS оцінку:",
            profileSummary: "Короткий Опис Профілю",
            skillsSection: "Розділ Навичок",
            workExperience: "Описи Досвіду Роботи",
            scoreLabel: "Оцінка ATS Сумісності",
            foundKeywords: "Знайдені Ключові Слова",
            suggestedKeywords: "Рекомендовані Ключові Слова",
            tipGreat: "Чудово! Ваше резюме має хорошу ATS сумісність. Продовжуйте в тому ж дусі!",
            tipGood: "Ваше резюме може виграти від більшої кількості дієслів дії та релевантних ключових слів у описях вашого досвіду.",
            tipNeedsWork: "Розгляньте можливість додавання більшої кількості дієслів дії, навичок та кількісних результатів для покращення вашої ATS оцінки."
        },

        // CV Health Score
        healthScore: {
            tooltip: "Натисніть, щоб переглянути детальний аналіз здоров'я резюме",
            modalTitle: "Оцінка Здоров'я Резюме",
            completeness: "Повнота",
            length: {
                label: "Довжина:",
                tooShort: "Занадто Коротке",
                good: "Добре (1 сторінка)",
                perfect: "Відмінно (1-2 сторінки)",
                long: "Довге (2+ сторінки)"
            },
            warnings: {
                label: "Попередження",
                noPhone: "Немає номера телефону",
                noSkills: "Розділ навичок порожній",
                noSummary: "Немає короткого опису профілю",
                noLinkedIn: "Немає профілю LinkedIn",
                noWorkExperience: "Немає досвіду роботи",
                noEducation: "Немає записів про освіту",
                noLocation: "Місцезнаходження не вказано"
            },
            suggestions: {
                label: "Пропозиції",
                addSkills: "Додайте 2-3 навички",
                addOneMoreSkill: "Додайте 1 навичку",
                addTwoMoreSkills: "Додайте 2 навички",
                addSocialLinks: "Додайте GitHub або особистий веб-сайт для бонусних балів",
                expandSummary: "Розширте короткий опис вашого профілю",
                quantifyAchievements: "Кількісно оцініть досягнення за допомогою чисел",
                completeOneWorkEntry: "Завершіть 1 запис про досвід роботи",
                completeMultipleWorkEntries: "Завершіть {count} записів про досвід роботи"
            }
        },

        // Language Change Warning
        languageChange: {
            warning: "Змінити Мову?",
            message: "Якщо ви виберете змінити мову зараз, вся введена інформація буде втрачена.",
            confirm: "Змінити Мову",
            cancel: "Скасувати"
        }
    }
};

function getCurrentLanguage() {
    const savedLang = localStorage.getItem('cv-language');
    return savedLang || 'en';
}

/**
 * Translation function - retrieves translated string by key path
 * Usage: t('sections.personalProfile') or t('labels.fullName')
 */
function t(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = TRANSLATIONS[lang];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if key not found
            value = TRANSLATIONS.en;
            for (const k2 of keys) {
                if (value && typeof value === 'object' && k2 in value) {
                    value = value[k2];
                } else {
                    return key; // Return key if not found in English either
                }
            }
            break;
        }
    }

    return typeof value === 'string' ? value : key;
}

function getMonthName(index) {
    const lang = getCurrentLanguage();
    return TRANSLATIONS[lang].months[index] || TRANSLATIONS.en.months[index] || '';
}
