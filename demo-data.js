function fillDemoData() {
    const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : (window.currentLanguage || 'en');
    if (lang === 'it') { _fillDemoDataIT(); return; }
    if (lang === 'ro') { _fillDemoDataRO(); return; }
    if (lang === 'ru') { _fillDemoDataRU(); return; }
    if (lang === 'uk') { _fillDemoDataUK(); return; }
    _fillDemoDataEN();
}

function _fillDemoDataEN() {
    // 1. Clear the form silently (no modal, no toast)
    _demoSilentReset();

    // 2. Personal info
    document.getElementById('fullName').value = 'John Doe';
    document.getElementById('jobTitle').value = 'Senior Software Engineer';
    document.getElementById('summary').value =
        'Passionate software engineer with 7+ years of experience building scalable web applications and leading cross-functional teams. ' +
        'Adept at transforming complex problems into elegant, maintainable solutions. ' +
        'Track record of shipping products that reach millions of users.';
    document.getElementById('email').value = 'john.doe@email.com';
    document.getElementById('phone').value = '+1 (555) 123-4567';
    document.getElementById('location').value = 'San Francisco, CA';
    document.getElementById('openToRelocate').checked = true;

    // 3. Social links
    addSocial('linkedin');
    const linkedinInput = document.querySelector('#socialLinksContainer .social-input[data-type="linkedin"]');
    if (linkedinInput) linkedinInput.value = 'https://linkedin.com/in/johndoe';

    addSocial('github');
    const githubInput = document.querySelector('#socialLinksContainer .social-input[data-type="github"]');
    if (githubInput) githubInput.value = 'https://github.com/johndoe';

    addSocial('website');
    const websiteInput = document.querySelector('#socialLinksContainer .social-input[data-type="website"]');
    if (websiteInput) websiteInput.value = 'https://johndoe.dev';

    // 4. Work Experience
    addExperience();
    const exp1 = document.querySelectorAll('#experienceList .dynamic-item')[0];
    exp1.querySelector('.exp-title').value = 'Senior Software Engineer';
    exp1.querySelector('.exp-company').value = 'TechCorp Inc.';
    exp1.querySelector('.exp-loc').value = 'San Francisco, CA';
    _setPickerDate(exp1, 'start', 1, 2021);
    const exp1CurrentCheckbox = exp1.querySelector('.is-current');
    exp1CurrentCheckbox.checked = true;
    if (typeof toggleEndDate === 'function') toggleEndDate(exp1CurrentCheckbox);
    exp1.querySelector('.exp-desc').value =
        'Led development of core microservices architecture handling 10M+ daily requests. ' +
        'Mentored 5 junior engineers and drove adoption of TypeScript across the team, reducing production bugs by 35%. ' +
        'Collaborated with product and design to define technical roadmap.';

    addExperience();
    const exp2 = document.querySelectorAll('#experienceList .dynamic-item')[1];
    exp2.querySelector('.exp-title').value = 'Software Engineer';
    exp2.querySelector('.exp-company').value = 'StartupHub';
    exp2.querySelector('.exp-loc').value = 'New York, NY';
    _setPickerDate(exp2, 'start', 3, 2018);
    _setPickerDate(exp2, 'end', 12, 2020);
    exp2.querySelector('.exp-desc').value =
        'Built and shipped 3 full-stack products from 0 to 1. ' +
        'Delivered features used by 100K+ users and reduced API response time by 40% through strategic caching and query optimisation.';

    addExperience();
    const exp3 = document.querySelectorAll('#experienceList .dynamic-item')[2];
    exp3.querySelector('.exp-title').value = 'Junior Developer';
    exp3.querySelector('.exp-company').value = 'WebAgency Co.';
    exp3.querySelector('.exp-loc').value = 'Boston, MA';
    _setPickerDate(exp3, 'start', 6, 2016);
    _setPickerDate(exp3, 'end', 2, 2018);
    exp3.querySelector('.exp-desc').value =
        'Developed and maintained client websites using React and PHP. ' +
        'Improved page load speed by 50% through image optimisation and lazy loading.';

    // 5. Education
    addEducation();
    const edu1 = document.querySelectorAll('#educationList .dynamic-item')[0];
    edu1.querySelector('.edu-degree').value = 'Bachelor of Science';
    edu1.querySelector('.edu-field').value = 'Computer Science';
    edu1.querySelector('.edu-school').value = 'Massachusetts Institute of Technology';
    _setPickerDate(edu1, 'grad', 5, 2018);
    edu1.querySelector('.edu-desc').value =
        "Graduated with honours. Dean's List for 3 consecutive years. Thesis on distributed systems and fault tolerance.";

    // 6. Certifications
    addCertification();
    const cert1 = document.querySelectorAll('#certList .dynamic-item')[0];
    cert1.querySelector('.cert-name').value = 'AWS Certified Solutions Architect';
    cert1.querySelector('.cert-issuer').value = 'Amazon Web Services';
    _setPickerDate(cert1, 'cert', 3, 2023);
    cert1.querySelector('.cert-url').value = 'https://aws.amazon.com/certification/';

    addCertification();
    const cert2 = document.querySelectorAll('#certList .dynamic-item')[1];
    cert2.querySelector('.cert-name').value = 'Google Cloud Professional Data Engineer';
    cert2.querySelector('.cert-issuer').value = 'Google';
    _setPickerDate(cert2, 'cert', 9, 2022);
    cert2.querySelector('.cert-url').value = 'https://cloud.google.com/certification/';

    // 7. Skills
    addSkillCategory();
    const skill1 = document.querySelectorAll('#skillsList .dynamic-item')[0];
    skill1.querySelector('.skill-cat').value = 'Frontend';
    skill1.querySelector('.skill-name').value = 'React, TypeScript, Vue.js';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(skill1.querySelector('.skill-name'));
    _setSegmentLevel(skill1, 3, false);

    addSkillCategory();
    const skill2 = document.querySelectorAll('#skillsList .dynamic-item')[1];
    skill2.querySelector('.skill-cat').value = 'Backend';
    skill2.querySelector('.skill-name').value = 'Node.js, Python, Go';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(skill2.querySelector('.skill-name'));
    _setSegmentLevel(skill2, 3, false);

    addSkillCategory();
    const skill3 = document.querySelectorAll('#skillsList .dynamic-item')[2];
    skill3.querySelector('.skill-cat').value = 'DevOps';
    skill3.querySelector('.skill-name').value = 'Docker, Kubernetes, CI/CD';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(skill3.querySelector('.skill-name'));
    _setSegmentLevel(skill3, 2, false);

    // 8. Languages
    addLanguage();
    const lang1 = document.querySelectorAll('#languageList .dynamic-item')[0];
    lang1.querySelector('.lang-name').value = 'English';
    _setSegmentLevel(lang1, 3, true);

    addLanguage();
    const lang2 = document.querySelectorAll('#languageList .dynamic-item')[1];
    lang2.querySelector('.lang-name').value = 'Spanish';
    _setSegmentLevel(lang2, 2, true);

    // 9. Personal Projects
    addProject();
    const proj1 = document.querySelectorAll('#projectList .dynamic-item')[0];
    proj1.querySelector('.proj-name').value = 'OpenTask';
    proj1.querySelector('.proj-link').value = 'https://github.com/johndoe/opentask';
    proj1.querySelector('.proj-desc').value =
        'Open-source task management tool with real-time sync, built with React and Firebase. ' +
        '2K+ GitHub stars and 150+ contributors worldwide.';

    addProject();
    const proj2 = document.querySelectorAll('#projectList .dynamic-item')[1];
    proj2.querySelector('.proj-name').value = 'DataFlow CLI';
    proj2.querySelector('.proj-link').value = 'https://github.com/johndoe/dataflow';
    proj2.querySelector('.proj-desc').value =
        'Command-line tool for ETL pipelines written in Python. ' +
        'Used by 500+ developers worldwide to automate data transformations between databases and cloud storage.';

    // 10. Refresh progress bar and health score
    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHealthScore === 'function') updateHealthScore();

    // 11. Show success toast
    if (typeof showToast === 'function') showToast('demo.loaded');
}

// ─── ITALIAN DEMO DATA ────────────────────────────────────────────────────────
function _fillDemoDataIT() {
    _demoSilentReset();

    document.getElementById('fullName').value = 'Marco Rossi';
    document.getElementById('jobTitle').value = 'Ingegnere del Software Senior';
    document.getElementById('summary').value =
        'Ingegnere del software appassionato con oltre 7 anni di esperienza nello sviluppo di applicazioni web scalabili e nella guida di team eterogenei. ' +
        'Specializzato nella trasformazione di problemi complessi in soluzioni eleganti e manutenibili. ' +
        'Storico di successo nel rilascio di prodotti utilizzati da milioni di utenti.';
    document.getElementById('email').value = 'marco.rossi@email.it';
    document.getElementById('phone').value = '+39 02 1234 5678';
    document.getElementById('location').value = 'Milano, Italia';
    document.getElementById('openToRelocate').checked = true;

    addSocial('linkedin');
    const li = document.querySelector('#socialLinksContainer .social-input[data-type="linkedin"]');
    if (li) li.value = 'https://linkedin.com/in/marcorossi';
    addSocial('github');
    const gh = document.querySelector('#socialLinksContainer .social-input[data-type="github"]');
    if (gh) gh.value = 'https://github.com/marcorossi';
    addSocial('website');
    const ws = document.querySelector('#socialLinksContainer .social-input[data-type="website"]');
    if (ws) ws.value = 'https://marcorossi.dev';

    addExperience();
    const exp1 = document.querySelectorAll('#experienceList .dynamic-item')[0];
    exp1.querySelector('.exp-title').value = 'Ingegnere del Software Senior';
    exp1.querySelector('.exp-company').value = 'FinTech Solutions SpA';
    exp1.querySelector('.exp-loc').value = 'Milano, Italia';
    _setPickerDate(exp1, 'start', 3, 2021);
    const exp1Cur = exp1.querySelector('.is-current');
    exp1Cur.checked = true;
    if (typeof toggleEndDate === 'function') toggleEndDate(exp1Cur);
    exp1.querySelector('.exp-desc').value =
        'Guida dello sviluppo di microservizi bancari ad alta disponibilità che gestiscono oltre 8 milioni di transazioni giornaliere. ' +
        'Mentoring di 4 ingegneri junior e introduzione di pratiche DevOps che hanno ridotto i tempi di deploy del 60%. ' +
        'Coordinamento con i team di prodotto e design per definire la roadmap tecnica trimestrale.';

    addExperience();
    const exp2 = document.querySelectorAll('#experienceList .dynamic-item')[1];
    exp2.querySelector('.exp-title').value = 'Sviluppatore Full-Stack';
    exp2.querySelector('.exp-company').value = 'E-Commerce Italia Srl';
    exp2.querySelector('.exp-loc').value = 'Roma, Italia';
    _setPickerDate(exp2, 'start', 5, 2018);
    _setPickerDate(exp2, 'end', 2, 2021);
    exp2.querySelector('.exp-desc').value =
        'Sviluppo e lancio di 2 piattaforme e-commerce da zero, raggiungendo 200.000+ utenti attivi mensili. ' +
        'Riduzione del tempo di risposta API del 45% tramite caching strategico e ottimizzazione delle query.';

    addExperience();
    const exp3 = document.querySelectorAll('#experienceList .dynamic-item')[2];
    exp3.querySelector('.exp-title').value = 'Sviluppatore Junior';
    exp3.querySelector('.exp-company').value = 'Agenzia Web Roma';
    exp3.querySelector('.exp-loc').value = 'Roma, Italia';
    _setPickerDate(exp3, 'start', 9, 2016);
    _setPickerDate(exp3, 'end', 4, 2018);
    exp3.querySelector('.exp-desc').value =
        'Sviluppo e manutenzione di siti web per clienti corporate con React e PHP. ' +
        'Miglioramento delle performance di caricamento pagina del 55% tramite ottimizzazione immagini e lazy loading.';

    addEducation();
    const edu1 = document.querySelectorAll('#educationList .dynamic-item')[0];
    edu1.querySelector('.edu-degree').value = 'Laurea Magistrale';
    edu1.querySelector('.edu-field').value = 'Ingegneria Informatica';
    edu1.querySelector('.edu-school').value = 'Politecnico di Milano';
    _setPickerDate(edu1, 'grad', 7, 2016);
    edu1.querySelector('.edu-desc').value =
        'Votazione: 110/110 con lode. Tesi sull\'architettura a microservizi e fault tolerance nei sistemi distribuiti.';

    addCertification();
    const cert1 = document.querySelectorAll('#certList .dynamic-item')[0];
    cert1.querySelector('.cert-name').value = 'AWS Certified Solutions Architect';
    cert1.querySelector('.cert-issuer').value = 'Amazon Web Services';
    _setPickerDate(cert1, 'cert', 6, 2023);
    cert1.querySelector('.cert-url').value = 'https://aws.amazon.com/certification/';

    addCertification();
    const cert2 = document.querySelectorAll('#certList .dynamic-item')[1];
    cert2.querySelector('.cert-name').value = 'Kubernetes Application Developer (CKAD)';
    cert2.querySelector('.cert-issuer').value = 'Cloud Native Computing Foundation';
    _setPickerDate(cert2, 'cert', 11, 2022);
    cert2.querySelector('.cert-url').value = 'https://www.cncf.io/certification/ckad/';

    addSkillCategory();
    const sk1 = document.querySelectorAll('#skillsList .dynamic-item')[0];
    sk1.querySelector('.skill-cat').value = 'Backend';
    sk1.querySelector('.skill-name').value = 'Java, Spring Boot, Microservizi';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk1.querySelector('.skill-name'));
    _setSegmentLevel(sk1, 3, false);

    addSkillCategory();
    const sk2 = document.querySelectorAll('#skillsList .dynamic-item')[1];
    sk2.querySelector('.skill-cat').value = 'Frontend';
    sk2.querySelector('.skill-name').value = 'Angular, TypeScript, Vue.js';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk2.querySelector('.skill-name'));
    _setSegmentLevel(sk2, 3, false);

    addSkillCategory();
    const sk3 = document.querySelectorAll('#skillsList .dynamic-item')[2];
    sk3.querySelector('.skill-cat').value = 'DevOps';
    sk3.querySelector('.skill-name').value = 'Docker, Kubernetes, CI/CD';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk3.querySelector('.skill-name'));
    _setSegmentLevel(sk3, 2, false);

    addLanguage();
    const lang1 = document.querySelectorAll('#languageList .dynamic-item')[0];
    lang1.querySelector('.lang-name').value = 'Italiano';
    _setSegmentLevel(lang1, 3, true);
    addLanguage();
    const lang2 = document.querySelectorAll('#languageList .dynamic-item')[1];
    lang2.querySelector('.lang-name').value = 'Inglese';
    _setSegmentLevel(lang2, 2, true);

    addProject();
    const proj1 = document.querySelectorAll('#projectList .dynamic-item')[0];
    proj1.querySelector('.proj-name').value = 'PayTrack';
    proj1.querySelector('.proj-link').value = 'https://github.com/marcorossi/paytrack';
    proj1.querySelector('.proj-desc').value =
        'Piattaforma open-source per il tracciamento delle spese personali con sincronizzazione in tempo reale, sviluppata con React e Firebase. ' +
        'Oltre 1.500 stelle su GitHub e 80+ contributori.';

    addProject();
    const proj2 = document.querySelectorAll('#projectList .dynamic-item')[1];
    proj2.querySelector('.proj-name').value = 'FatturAPI';
    proj2.querySelector('.proj-link').value = 'https://github.com/marcorossi/fatturapi';
    proj2.querySelector('.proj-desc').value =
        'Libreria Python per l\'integrazione con il Sistema di Interscambio (SDI) per la fatturazione elettronica italiana. ' +
        'Utilizzata da oltre 300 sviluppatori e studi commercialisti.';

    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHealthScore === 'function') updateHealthScore();
    if (typeof showToast === 'function') showToast('demo.loaded');
}

// ─── ROMANIAN DEMO DATA ───────────────────────────────────────────────────────
function _fillDemoDataRO() {
    _demoSilentReset();

    document.getElementById('fullName').value = 'Andrei Ionescu';
    document.getElementById('jobTitle').value = 'Inginer Software Senior';
    document.getElementById('summary').value =
        'Inginer software cu peste 7 ani de experiență în dezvoltarea aplicațiilor web scalabile și coordonarea echipelor multifuncționale. ' +
        'Expert în transformarea problemelor complexe în soluții elegante și ușor de întreținut. ' +
        'Experiență dovedită în livrarea de produse utilizate de milioane de utilizatori.';
    document.getElementById('email').value = 'andrei.ionescu@email.ro';
    document.getElementById('phone').value = '+40 21 123 4567';
    document.getElementById('location').value = 'București, România';
    document.getElementById('openToRelocate').checked = true;

    addSocial('linkedin');
    const li = document.querySelector('#socialLinksContainer .social-input[data-type="linkedin"]');
    if (li) li.value = 'https://linkedin.com/in/andreiionescu';
    addSocial('github');
    const gh = document.querySelector('#socialLinksContainer .social-input[data-type="github"]');
    if (gh) gh.value = 'https://github.com/andreiionescu';
    addSocial('website');
    const ws = document.querySelector('#socialLinksContainer .social-input[data-type="website"]');
    if (ws) ws.value = 'https://andreiionescu.dev';

    addExperience();
    const exp1 = document.querySelectorAll('#experienceList .dynamic-item')[0];
    exp1.querySelector('.exp-title').value = 'Inginer Software Senior';
    exp1.querySelector('.exp-company').value = 'TotalSoft SA';
    exp1.querySelector('.exp-loc').value = 'București, România';
    _setPickerDate(exp1, 'start', 2, 2021);
    const exp1Cur = exp1.querySelector('.is-current');
    exp1Cur.checked = true;
    if (typeof toggleEndDate === 'function') toggleEndDate(exp1Cur);
    exp1.querySelector('.exp-desc').value =
        'Conducerea dezvoltării unui sistem ERP multi-tenant utilizat de peste 500 de companii din România și Republica Moldova. ' +
        'Mentorat pentru 5 ingineri juniori și implementarea arhitecturii CQRS care a redus timpul de răspuns cu 50%. ' +
        'Colaborare strânsă cu echipele de produs pentru definirea foii de parcurs tehnice.';

    addExperience();
    const exp2 = document.querySelectorAll('#experienceList .dynamic-item')[1];
    exp2.querySelector('.exp-title').value = 'Dezvoltator .NET';
    exp2.querySelector('.exp-company').value = 'Fortech SRL';
    exp2.querySelector('.exp-loc').value = 'Cluj-Napoca, România';
    _setPickerDate(exp2, 'start', 4, 2018);
    _setPickerDate(exp2, 'end', 1, 2021);
    exp2.querySelector('.exp-desc').value =
        'Dezvoltarea și livrarea a 3 aplicații enterprise pentru clienți din Germania și Austria, cu 150.000+ utilizatori activi. ' +
        'Reducerea timpului de răspuns API cu 40% prin implementarea caching-ului Redis și optimizarea interogărilor SQL.';

    addExperience();
    const exp3 = document.querySelectorAll('#experienceList .dynamic-item')[2];
    exp3.querySelector('.exp-title').value = 'Dezvoltator Junior';
    exp3.querySelector('.exp-company').value = 'Zitec SA';
    exp3.querySelector('.exp-loc').value = 'București, România';
    _setPickerDate(exp3, 'start', 10, 2016);
    _setPickerDate(exp3, 'end', 3, 2018);
    exp3.querySelector('.exp-desc').value =
        'Dezvoltarea și menținerea site-urilor web pentru clienți corporate utilizând C# și Angular. ' +
        'Îmbunătățirea vitezei de încărcare a paginilor cu 50% prin optimizarea imaginilor și lazy loading.';

    addEducation();
    const edu1 = document.querySelectorAll('#educationList .dynamic-item')[0];
    edu1.querySelector('.edu-degree').value = 'Licență';
    edu1.querySelector('.edu-field').value = 'Calculatoare și Tehnologia Informației';
    edu1.querySelector('.edu-school').value = 'Universitatea Politehnica din București';
    _setPickerDate(edu1, 'grad', 6, 2016);
    edu1.querySelector('.edu-desc').value =
        'Absolvit cu Distincție. Lucrare de licență despre sisteme distribuite și toleranță la defecțiuni.';

    addCertification();
    const cert1 = document.querySelectorAll('#certList .dynamic-item')[0];
    cert1.querySelector('.cert-name').value = 'Microsoft Azure Developer Associate';
    cert1.querySelector('.cert-issuer').value = 'Microsoft';
    _setPickerDate(cert1, 'cert', 5, 2023);
    cert1.querySelector('.cert-url').value = 'https://learn.microsoft.com/en-us/certifications/azure-developer/';

    addCertification();
    const cert2 = document.querySelectorAll('#certList .dynamic-item')[1];
    cert2.querySelector('.cert-name').value = 'Professional Scrum Master I';
    cert2.querySelector('.cert-issuer').value = 'Scrum.org';
    _setPickerDate(cert2, 'cert', 9, 2021);
    cert2.querySelector('.cert-url').value = 'https://www.scrum.org/certificates/psm-i';

    addSkillCategory();
    const sk1 = document.querySelectorAll('#skillsList .dynamic-item')[0];
    sk1.querySelector('.skill-cat').value = 'Backend';
    sk1.querySelector('.skill-name').value = 'C#, .NET, Entity Framework';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk1.querySelector('.skill-name'));
    _setSegmentLevel(sk1, 3, false);

    addSkillCategory();
    const sk2 = document.querySelectorAll('#skillsList .dynamic-item')[1];
    sk2.querySelector('.skill-cat').value = 'Frontend';
    sk2.querySelector('.skill-name').value = 'Angular, TypeScript, HTML/CSS';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk2.querySelector('.skill-name'));
    _setSegmentLevel(sk2, 3, false);

    addSkillCategory();
    const sk3 = document.querySelectorAll('#skillsList .dynamic-item')[2];
    sk3.querySelector('.skill-cat').value = 'Baze de date';
    sk3.querySelector('.skill-name').value = 'SQL Server, PostgreSQL, Redis';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk3.querySelector('.skill-name'));
    _setSegmentLevel(sk3, 2, false);

    addLanguage();
    const lang1 = document.querySelectorAll('#languageList .dynamic-item')[0];
    lang1.querySelector('.lang-name').value = 'Română';
    _setSegmentLevel(lang1, 3, true);
    addLanguage();
    const lang2 = document.querySelectorAll('#languageList .dynamic-item')[1];
    lang2.querySelector('.lang-name').value = 'Engleză';
    _setSegmentLevel(lang2, 2, true);

    addProject();
    const proj1 = document.querySelectorAll('#projectList .dynamic-item')[0];
    proj1.querySelector('.proj-name').value = 'BugetRO';
    proj1.querySelector('.proj-link').value = 'https://github.com/andreiionescu/bugetro';
    proj1.querySelector('.proj-desc').value =
        'Aplicație open-source pentru gestionarea bugetului personal, cu sincronizare în timp real construită cu Angular și .NET. ' +
        'Peste 900 de stele pe GitHub și 60+ colaboratori din România și Republica Moldova.';

    addProject();
    const proj2 = document.querySelectorAll('#projectList .dynamic-item')[1];
    proj2.querySelector('.proj-name').value = 'FacturiNet';
    proj2.querySelector('.proj-link').value = 'https://github.com/andreiionescu/facturinet';
    proj2.querySelector('.proj-desc').value =
        'Bibliotecă .NET pentru integrarea cu ANAF și generarea facturilor electronice conform standardelor europene. ' +
        'Folosită de peste 200 de firme mici și mijlocii din România.';

    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHealthScore === 'function') updateHealthScore();
    if (typeof showToast === 'function') showToast('demo.loaded');
}

// ─── RUSSIAN DEMO DATA ────────────────────────────────────────────────────────
function _fillDemoDataRU() {
    _demoSilentReset();

    document.getElementById('fullName').value = 'Алексей Иванов';
    document.getElementById('jobTitle').value = 'Старший Инженер-программист';
    document.getElementById('summary').value =
        'Увлечённый инженер-программист с более чем 7-летним опытом разработки масштабируемых веб-приложений и руководства кросс-функциональными командами. ' +
        'Специализируется на трансформации сложных задач в элегантные, легко сопровождаемые решения. ' +
        'Подтверждённый опыт запуска продуктов, которыми пользуются миллионы пользователей.';
    document.getElementById('email').value = 'alexey.ivanov@email.ru';
    document.getElementById('phone').value = '+7 (495) 123-45-67';
    document.getElementById('location').value = 'Москва, Россия';
    document.getElementById('openToRelocate').checked = false;

    addSocial('linkedin');
    const li = document.querySelector('#socialLinksContainer .social-input[data-type="linkedin"]');
    if (li) li.value = 'https://linkedin.com/in/alexeyivanov';
    addSocial('github');
    const gh = document.querySelector('#socialLinksContainer .social-input[data-type="github"]');
    if (gh) gh.value = 'https://github.com/alexeyivanov';
    addSocial('website');
    const ws = document.querySelector('#socialLinksContainer .social-input[data-type="website"]');
    if (ws) ws.value = 'https://alexeyivanov.dev';

    addExperience();
    const exp1 = document.querySelectorAll('#experienceList .dynamic-item')[0];
    exp1.querySelector('.exp-title').value = 'Старший Backend-разработчик';
    exp1.querySelector('.exp-company').value = 'Яндекс';
    exp1.querySelector('.exp-loc').value = 'Москва, Россия';
    _setPickerDate(exp1, 'start', 1, 2021);
    const exp1Cur = exp1.querySelector('.is-current');
    exp1Cur.checked = true;
    if (typeof toggleEndDate === 'function') toggleEndDate(exp1Cur);
    exp1.querySelector('.exp-desc').value =
        'Руководство разработкой высоконагруженных микросервисов, обрабатывающих свыше 15 миллионов запросов в день. ' +
        'Менторинг 6 junior-разработчиков и внедрение Go в основной стек, что сократило потребление памяти на 40%. ' +
        'Тесное взаимодействие с командами продукта и дизайна при формировании технической дорожной карты.';

    addExperience();
    const exp2 = document.querySelectorAll('#experienceList .dynamic-item')[1];
    exp2.querySelector('.exp-title').value = 'Python-разработчик';
    exp2.querySelector('.exp-company').value = 'Mail.ru Group';
    exp2.querySelector('.exp-loc').value = 'Москва, Россия';
    _setPickerDate(exp2, 'start', 6, 2018);
    _setPickerDate(exp2, 'end', 12, 2020);
    exp2.querySelector('.exp-desc').value =
        'Разработка и запуск 3 full-stack продуктов с нуля, достигших аудитории 500 000+ активных пользователей. ' +
        'Снижение времени отклика API на 35% благодаря стратегическому кэшированию и оптимизации запросов.';

    addExperience();
    const exp3 = document.querySelectorAll('#experienceList .dynamic-item')[2];
    exp3.querySelector('.exp-title').value = 'Junior-разработчик';
    exp3.querySelector('.exp-company').value = 'Студия веб-разработки «Код»';
    exp3.querySelector('.exp-loc').value = 'Санкт-Петербург, Россия';
    _setPickerDate(exp3, 'start', 9, 2016);
    _setPickerDate(exp3, 'end', 5, 2018);
    exp3.querySelector('.exp-desc').value =
        'Разработка и поддержка корпоративных сайтов с использованием Django и Vue.js. ' +
        'Ускорение загрузки страниц на 50% за счёт оптимизации изображений и ленивой загрузки.';

    addEducation();
    const edu1 = document.querySelectorAll('#educationList .dynamic-item')[0];
    edu1.querySelector('.edu-degree').value = 'Бакалавр';
    edu1.querySelector('.edu-field').value = 'Прикладная математика и информатика';
    edu1.querySelector('.edu-school').value = 'Московский государственный университет';
    _setPickerDate(edu1, 'grad', 6, 2016);
    edu1.querySelector('.edu-desc').value =
        'Окончил с отличием. Диплом по распределённым вычислениям и отказоустойчивым системам.';

    addCertification();
    const cert1 = document.querySelectorAll('#certList .dynamic-item')[0];
    cert1.querySelector('.cert-name').value = 'Google Cloud Professional Data Engineer';
    cert1.querySelector('.cert-issuer').value = 'Google';
    _setPickerDate(cert1, 'cert', 4, 2023);
    cert1.querySelector('.cert-url').value = 'https://cloud.google.com/certification/data-engineer';

    addCertification();
    const cert2 = document.querySelectorAll('#certList .dynamic-item')[1];
    cert2.querySelector('.cert-name').value = 'Certified Kubernetes Administrator (CKA)';
    cert2.querySelector('.cert-issuer').value = 'Cloud Native Computing Foundation';
    _setPickerDate(cert2, 'cert', 10, 2022);
    cert2.querySelector('.cert-url').value = 'https://www.cncf.io/certification/cka/';

    addSkillCategory();
    const sk1 = document.querySelectorAll('#skillsList .dynamic-item')[0];
    sk1.querySelector('.skill-cat').value = 'Языки и фреймворки';
    sk1.querySelector('.skill-name').value = 'Python, Go, Django';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk1.querySelector('.skill-name'));
    _setSegmentLevel(sk1, 3, false);

    addSkillCategory();
    const sk2 = document.querySelectorAll('#skillsList .dynamic-item')[1];
    sk2.querySelector('.skill-cat').value = 'Базы данных';
    sk2.querySelector('.skill-name').value = 'PostgreSQL, Redis, ClickHouse';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk2.querySelector('.skill-name'));
    _setSegmentLevel(sk2, 3, false);

    addSkillCategory();
    const sk3 = document.querySelectorAll('#skillsList .dynamic-item')[2];
    sk3.querySelector('.skill-cat').value = 'Инфраструктура';
    sk3.querySelector('.skill-name').value = 'Kubernetes, Docker, Terraform';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk3.querySelector('.skill-name'));
    _setSegmentLevel(sk3, 2, false);

    addLanguage();
    const lang1 = document.querySelectorAll('#languageList .dynamic-item')[0];
    lang1.querySelector('.lang-name').value = 'Русский';
    _setSegmentLevel(lang1, 3, true);
    addLanguage();
    const lang2 = document.querySelectorAll('#languageList .dynamic-item')[1];
    lang2.querySelector('.lang-name').value = 'Английский';
    _setSegmentLevel(lang2, 2, true);

    addProject();
    const proj1 = document.querySelectorAll('#projectList .dynamic-item')[0];
    proj1.querySelector('.proj-name').value = 'TaskFlow';
    proj1.querySelector('.proj-link').value = 'https://github.com/alexeyivanov/taskflow';
    proj1.querySelector('.proj-desc').value =
        'Open-source инструмент управления задачами с синхронизацией в реальном времени, построенный на FastAPI и Vue.js. ' +
        'Более 1800 звёзд на GitHub и 100+ контрибьюторов.';

    addProject();
    const proj2 = document.querySelectorAll('#projectList .dynamic-item')[1];
    proj2.querySelector('.proj-name').value = 'DataPipe';
    proj2.querySelector('.proj-link').value = 'https://github.com/alexeyivanov/datapipe';
    proj2.querySelector('.proj-desc').value =
        'Python-библиотека для построения ETL-пайплайнов с поддержкой ClickHouse и S3. ' +
        'Используется более чем 400 разработчиками для автоматизации потоков данных.';

    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHealthScore === 'function') updateHealthScore();
    if (typeof showToast === 'function') showToast('demo.loaded');
}

// ─── UKRAINIAN DEMO DATA ──────────────────────────────────────────────────────
function _fillDemoDataUK() {
    _demoSilentReset();

    document.getElementById('fullName').value = 'Олексій Коваленко';
    document.getElementById('jobTitle').value = 'Старший інженер-програміст';
    document.getElementById('summary').value =
        'Захоплений інженер-програміст із понад 7-річним досвідом розробки масштабованих веб-додатків та керівництва командами. ' +
        'Спеціалізується на перетворенні складних завдань на елегантні, підтримувані рішення. ' +
        'Підтверджений досвід запуску продуктів, якими користуються мільйони людей.';
    document.getElementById('email').value = 'oleksii.kovalenko@email.ua';
    document.getElementById('phone').value = '+380 44 123 45 67';
    document.getElementById('location').value = 'Київ, Україна';
    document.getElementById('openToRelocate').checked = true;

    addSocial('linkedin');
    const li = document.querySelector('#socialLinksContainer .social-input[data-type="linkedin"]');
    if (li) li.value = 'https://linkedin.com/in/oleksiikovalenko';
    addSocial('github');
    const gh = document.querySelector('#socialLinksContainer .social-input[data-type="github"]');
    if (gh) gh.value = 'https://github.com/oleksiikovalenko';
    addSocial('website');
    const ws = document.querySelector('#socialLinksContainer .social-input[data-type="website"]');
    if (ws) ws.value = 'https://oleksiikovalenko.dev';

    addExperience();
    const exp1 = document.querySelectorAll('#experienceList .dynamic-item')[0];
    exp1.querySelector('.exp-title').value = 'Старший Frontend-розробник';
    exp1.querySelector('.exp-company').value = 'Grammarly';
    exp1.querySelector('.exp-loc').value = 'Київ, Україна';
    _setPickerDate(exp1, 'start', 3, 2021);
    const exp1Cur = exp1.querySelector('.is-current');
    exp1Cur.checked = true;
    if (typeof toggleEndDate === 'function') toggleEndDate(exp1Cur);
    exp1.querySelector('.exp-desc').value =
        'Розробка ключових компонентів редактора, що використовуються понад 30 мільйонами користувачів щодня. ' +
        'Менторинг 4 junior-розробників та впровадження React 18, що скоротило час першого завантаження на 35%. ' +
        'Співпраця з продуктовими та дизайнерськими командами для визначення технічної дорожньої карти.';

    addExperience();
    const exp2 = document.querySelectorAll('#experienceList .dynamic-item')[1];
    exp2.querySelector('.exp-title').value = 'Full-Stack JavaScript розробник';
    exp2.querySelector('.exp-company').value = 'MacPaw';
    exp2.querySelector('.exp-loc').value = 'Київ, Україна';
    _setPickerDate(exp2, 'start', 7, 2018);
    _setPickerDate(exp2, 'end', 2, 2021);
    exp2.querySelector('.exp-desc').value =
        'Розробка та запуск 2 повноцінних SaaS-продуктів із базою понад 200 000 активних користувачів. ' +
        'Зниження часу відповіді API на 45% завдяки стратегічному кешуванню та оптимізації запитів.';

    addExperience();
    const exp3 = document.querySelectorAll('#experienceList .dynamic-item')[2];
    exp3.querySelector('.exp-title').value = 'Junior розробник';
    exp3.querySelector('.exp-company').value = 'DataArt';
    exp3.querySelector('.exp-loc').value = 'Харків, Україна';
    _setPickerDate(exp3, 'start', 10, 2016);
    _setPickerDate(exp3, 'end', 6, 2018);
    exp3.querySelector('.exp-desc').value =
        'Розробка та підтримка веб-застосунків для іноземних клієнтів із використанням React і Node.js. ' +
        'Покращення швидкості завантаження сторінок на 50% через оптимізацію зображень і lazy loading.';

    addEducation();
    const edu1 = document.querySelectorAll('#educationList .dynamic-item')[0];
    edu1.querySelector('.edu-degree').value = 'Бакалавр';
    edu1.querySelector('.edu-field').value = 'Комп\'ютерні науки';
    edu1.querySelector('.edu-school').value = 'Київський політехнічний інститут';
    _setPickerDate(edu1, 'grad', 6, 2016);
    edu1.querySelector('.edu-desc').value =
        'Закінчив з відзнакою. Дипломна робота з розподілених систем та відмовостійкості.';

    addCertification();
    const cert1 = document.querySelectorAll('#certList .dynamic-item')[0];
    cert1.querySelector('.cert-name').value = 'AWS Certified Developer – Associate';
    cert1.querySelector('.cert-issuer').value = 'Amazon Web Services';
    _setPickerDate(cert1, 'cert', 3, 2023);
    cert1.querySelector('.cert-url').value = 'https://aws.amazon.com/certification/certified-developer-associate/';

    addCertification();
    const cert2 = document.querySelectorAll('#certList .dynamic-item')[1];
    cert2.querySelector('.cert-name').value = 'Professional Scrum Master I';
    cert2.querySelector('.cert-issuer').value = 'Scrum.org';
    _setPickerDate(cert2, 'cert', 8, 2022);
    cert2.querySelector('.cert-url').value = 'https://www.scrum.org/certificates/psm-i';

    addSkillCategory();
    const sk1 = document.querySelectorAll('#skillsList .dynamic-item')[0];
    sk1.querySelector('.skill-cat').value = 'Frontend';
    sk1.querySelector('.skill-name').value = 'React, TypeScript, Next.js';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk1.querySelector('.skill-name'));
    _setSegmentLevel(sk1, 3, false);

    addSkillCategory();
    const sk2 = document.querySelectorAll('#skillsList .dynamic-item')[1];
    sk2.querySelector('.skill-cat').value = 'Backend';
    sk2.querySelector('.skill-name').value = 'Node.js, Express, GraphQL';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk2.querySelector('.skill-name'));
    _setSegmentLevel(sk2, 3, false);

    addSkillCategory();
    const sk3 = document.querySelectorAll('#skillsList .dynamic-item')[2];
    sk3.querySelector('.skill-cat').value = 'DevOps';
    sk3.querySelector('.skill-name').value = 'Docker, AWS, GitHub Actions';
    if (typeof updateSkillCounter === 'function') updateSkillCounter(sk3.querySelector('.skill-name'));
    _setSegmentLevel(sk3, 2, false);

    addLanguage();
    const lang1 = document.querySelectorAll('#languageList .dynamic-item')[0];
    lang1.querySelector('.lang-name').value = 'Українська';
    _setSegmentLevel(lang1, 3, true);
    addLanguage();
    const lang2 = document.querySelectorAll('#languageList .dynamic-item')[1];
    lang2.querySelector('.lang-name').value = 'Англійська';
    _setSegmentLevel(lang2, 2, true);

    addProject();
    const proj1 = document.querySelectorAll('#projectList .dynamic-item')[0];
    proj1.querySelector('.proj-name').value = 'UkraineMap';
    proj1.querySelector('.proj-link').value = 'https://github.com/oleksiikovalenko/ukrainemap';
    proj1.querySelector('.proj-desc').value =
        'Відкрита інтерактивна карта для візуалізації публічних даних регіонів України, побудована на React та Mapbox. ' +
        'Понад 1200 зірок на GitHub та 70+ контриб\'юторів.';

    addProject();
    const proj2 = document.querySelectorAll('#projectList .dynamic-item')[1];
    proj2.querySelector('.proj-name').value = 'OpenCVBuilder';
    proj2.querySelector('.proj-link').value = 'https://github.com/oleksiikovalenko/opencvbuilder';
    proj2.querySelector('.proj-desc').value =
        'Безкоштовний конструктор резюме на основі браузера з підтримкою кількох мов та миттєвим завантаженням PDF. ' +
        'Використовується понад 5000 користувачів щомісяця.';

    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHealthScore === 'function') updateHealthScore();
    if (typeof showToast === 'function') showToast('demo.loaded');
}

function _demoSilentReset() {
    const form = document.getElementById('cvForm');
    if (form) form.reset();

    ['experienceList', 'educationList', 'certList', 'skillsList', 'languageList', 'projectList'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    const socialContainer = document.getElementById('socialLinksContainer');
    if (socialContainer) socialContainer.innerHTML = '';

    // Clear photo
    const avatarImg = document.getElementById('avatarImg');
    if (avatarImg) { avatarImg.style.display = 'none'; avatarImg.src = ''; }
    const placeholderIcon = document.querySelector('.placeholder-icon');
    if (placeholderIcon) placeholderIcon.style.display = 'block';

    // Reset global state variables defined in index.html
    /* global photoData, cvData */
    if (typeof photoData !== 'undefined') { window.photoData = null; }
    if (typeof cvData !== 'undefined' && cvData) cvData.photo = null;
}

/**
 * Sets a custom date picker (month + year) on a given container element.
 * @param {Element} container  - The .dynamic-item wrapper
 * @param {string}  prefix     - 'start' | 'end' | 'grad' | 'cert'
 * @param {number}  month      - 1-based month (1 = January)
 * @param {number}  year       - 4-digit year
 */
function _setPickerDate(container, prefix, month, year) {
    _setPicker(container, `${prefix}-month`, month);
    _setPicker(container, `${prefix}-year`, year);
}

function _setPicker(container, inputClass, value) {
    const hiddenInput = container.querySelector(`.${inputClass}`);
    if (!hiddenInput) return;
    const wrapper = hiddenInput.closest('.custom-select-wrapper');
    if (!wrapper) return;
    const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
    const matchingOption = wrapper.querySelector(`.custom-option[data-value="${value}"]`);

    hiddenInput.value = value;

    if (matchingOption) {
        wrapper.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
        matchingOption.classList.add('selected');
        if (triggerSpan) {
            triggerSpan.textContent = matchingOption.textContent;
            triggerSpan.style.color = '#1D1D1F';
        }
    }
}

/**
 * Sets the segmented level bar on a skill or language item.
 * @param {Element} container  - The .dynamic-item wrapper
 * @param {number}  level      - 1 | 2 | 3
 * @param {boolean} isLanguage - true for language items, false for skills
 */
function _setSegmentLevel(container, level, isLanguage) {
    const segContainer = container.querySelector('.segmented-control-container');
    if (!segContainer) return;

    const hiddenInput = segContainer.querySelector('input[type="hidden"]');
    const bar = segContainer.querySelector('.segmented-bar');
    const labelDiv = segContainer.querySelector('.segment-label');

    if (hiddenInput) hiddenInput.value = level;

    if (bar) {
        Array.from(bar.children).forEach((seg, i) => {
            seg.classList.toggle('active', i < level);
        });
    }

    if (labelDiv && typeof getProficiencyLabel === 'function') {
        labelDiv.textContent = getProficiencyLabel(level, isLanguage);
    }
}
