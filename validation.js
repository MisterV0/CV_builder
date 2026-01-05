/**
 * CV Builder - ATS Score Validation
 * Analyzes CV against common ATS keywords (no AI, just keyword matching)
 * Language-aware keyword matching for multiple languages
 */

// ATS Keywords Database - Multi-language support
const ATS_KEYWORDS = {
    en: {
        actionVerbs: [
            'achieved', 'managed', 'developed', 'implemented', 'designed', 'created',
            'improved', 'increased', 'reduced', 'led', 'coordinated', 'executed',
            'optimized', 'analyzed', 'resolved', 'collaborated', 'delivered', 'established',
            'initiated', 'maintained', 'produced', 'streamlined', 'supervised', 'transformed'
        ],
        skills: [
            'leadership', 'communication', 'problem-solving', 'teamwork', 'project management',
            'analytical', 'strategic planning', 'customer service', 'time management', 'adaptability',
            'innovation', 'critical thinking', 'decision making', 'negotiation', 'presentation',
            'data analysis', 'quality assurance', 'risk management', 'budget management', 'stakeholder management'
        ],
        technical: [
            'software', 'technology', 'system', 'platform', 'application', 'database',
            'programming', 'coding', 'development', 'implementation', 'integration', 'automation',
            'cloud', 'security', 'network', 'infrastructure', 'api', 'framework'
        ],
        results: [
            'increased', 'decreased', 'improved', 'achieved', 'exceeded', 'delivered',
            'reduced', 'optimized', 'enhanced', 'maximized', 'minimized', 'accelerated'
        ]
    },
    it: {
        actionVerbs: [
            'raggiunto', 'gestito', 'sviluppato', 'implementato', 'progettato', 'creato',
            'migliorato', 'aumentato', 'ridotto', 'guidato', 'coordinato', 'eseguito',
            'ottimizzato', 'analizzato', 'risolto', 'collaborato', 'consegnato', 'stabilito',
            'iniziato', 'mantenuto', 'prodotto', 'semplificato', 'supervisionato', 'trasformato'
        ],
        skills: [
            'leadership', 'comunicazione', 'risoluzione problemi', 'lavoro di squadra', 'gestione progetti',
            'analitico', 'pianificazione strategica', 'servizio clienti', 'gestione del tempo', 'adattabilità',
            'innovazione', 'pensiero critico', 'presa di decisioni', 'negoziazione', 'presentazione',
            'analisi dati', 'assicurazione qualità', 'gestione rischi', 'gestione budget', 'gestione stakeholder'
        ],
        technical: [
            'software', 'tecnologia', 'sistema', 'piattaforma', 'applicazione', 'database',
            'programmazione', 'codifica', 'sviluppo', 'implementazione', 'integrazione', 'automazione',
            'cloud', 'sicurezza', 'rete', 'infrastruttura', 'api', 'framework'
        ],
        results: [
            'aumentato', 'diminuito', 'migliorato', 'raggiunto', 'superato', 'consegnato',
            'ridotto', 'ottimizzato', 'migliorato', 'massimizzato', 'minimizzato', 'accelerato'
        ]
    },
    ro: {
        actionVerbs: [
            'realizat', 'administrat', 'dezvoltat', 'implementat', 'proiectat', 'creat',
            'îmbunătățit', 'crescut', 'redus', 'condus', 'coordonat', 'executat',
            'optimizat', 'analizat', 'rezolvat', 'colaborat', 'livrat', 'stabilit',
            'inițiat', 'menținut', 'produs', 'simplificat', 'supervizat', 'transformat'
        ],
        skills: [
            'leadership', 'comunicare', 'rezolvarea problemelor', 'munca în echipă', 'management proiect',
            'analitic', 'planificare strategică', 'serviciu clienți', 'management timp', 'adaptabilitate',
            'inovație', 'gândire critică', 'luare decizii', 'negociere', 'prezentare',
            'analiză date', 'asigurare calitate', 'management risc', 'management buget', 'management stakeholder'
        ],
        technical: [
            'software', 'tehnologie', 'sistem', 'platformă', 'aplicație', 'bază de date',
            'programare', 'codare', 'dezvoltare', 'implementare', 'integrare', 'automatizare',
            'cloud', 'securitate', 'rețea', 'infrastructură', 'api', 'framework'
        ],
        results: [
            'crescut', 'scăzut', 'îmbunătățit', 'realizat', 'depășit', 'livrat',
            'redus', 'optimizat', 'îmbunătățit', 'maximizat', 'minimizat', 'accelerat'
        ]
    },
    ru: {
        actionVerbs: [
            'достиг', 'управлял', 'разработал', 'внедрил', 'спроектировал', 'создал',
            'улучшил', 'увеличил', 'сократил', 'руководил', 'координировал', 'выполнил',
            'оптимизировал', 'проанализировал', 'решил', 'сотрудничал', 'поставил', 'установил',
            'инициировал', 'поддерживал', 'произвел', 'упростил', 'контролировал', 'трансформировал'
        ],
        skills: [
            'лидерство', 'коммуникация', 'решение проблем', 'работа в команде', 'управление проектами',
            'аналитический', 'стратегическое планирование', 'обслуживание клиентов', 'управление временем', 'адаптивность',
            'инновации', 'критическое мышление', 'принятие решений', 'переговоры', 'презентация',
            'анализ данных', 'обеспечение качества', 'управление рисками', 'управление бюджетом', 'управление заинтересованными сторонами'
        ],
        technical: [
            'программное обеспечение', 'технология', 'система', 'платформа', 'приложение', 'база данных',
            'программирование', 'кодирование', 'разработка', 'внедрение', 'интеграция', 'автоматизация',
            'облако', 'безопасность', 'сеть', 'инфраструктура', 'api', 'фреймворк'
        ],
        results: [
            'увеличил', 'уменьшил', 'улучшил', 'достиг', 'превысил', 'поставил',
            'сократил', 'оптимизировал', 'улучшил', 'максимизировал', 'минимизировал', 'ускорил'
        ]
    },
    uk: {
        actionVerbs: [
            'досяг', 'керував', 'розробив', 'впровадив', 'спроєктував', 'створив',
            'покращив', 'збільшив', 'зменшив', 'очолював', 'координував', 'виконав',
            'оптимізував', 'проаналізував', 'вирішив', 'співпрацював', 'поставив', 'встановив',
            'ініціював', 'підтримував', 'виробив', 'спростив', 'контролював', 'трансформував'
        ],
        skills: [
            'лідерство', 'комунікація', 'вирішення проблем', 'робота в команді', 'управління проектами',
            'аналітичний', 'стратегічне планування', 'обслуговування клієнтів', 'управління часом', 'адаптивність',
            'інновації', 'критичне мислення', 'прийняття рішень', 'переговори', 'презентація',
            'аналіз даних', 'забезпечення якості', 'управління ризиками', 'управління бюджетом', 'управління зацікавленими сторонами'
        ],
        technical: [
            'програмне забезпечення', 'технологія', 'система', 'платформа', 'додаток', 'база даних',
            'програмування', 'кодування', 'розробка', 'впровадження', 'інтеграція', 'автоматизація',
            'хмара', 'безпека', 'мережа', 'інфраструктура', 'api', 'фреймворк'
        ],
        results: [
            'збільшив', 'зменшив', 'покращив', 'досяг', 'перевищив', 'поставив',
            'скоротив', 'оптимізував', 'покращив', 'максимізував', 'мінімізував', 'прискорив'
        ]
    }
};

/**
 * HOW THE ATS SCORE CHECKER WORKS:
 * 
 * 1. DATA COLLECTION:
 *    - Collects text from: Summary, Skills, Experience descriptions
 *    - Converts all text to lowercase for case-insensitive matching
 * 
 * 2. KEYWORD MATCHING (4 Categories):
 *    a) Summary Section (20 points max):
 *       - Searches for action verbs in summary
 *       - Each found keyword = +2 points (max 20)
 * 
 *    b) Skills Section (30 points max):
 *       - Searches for skill keywords in skills list
 *       - Each found keyword = +3 points (max 30)
 * 
 *    c) Experience Descriptions (30 points max):
 *       - Searches for action verbs AND results-oriented words
 *       - Each found keyword = +2 points (max 30)
 * 
 *    d) Technical Keywords (20 points max):
 *       - Searches across all sections for technical terms
 *       - Each found keyword = +2 points (max 20)
 * 
 * 3. SCORE CALCULATION:
 *    - Total possible: 100 points
 *    - Score = (found points / 100) * 100 = percentage
 *    - Tracks found keywords and missing keywords
 * 
 * 4. DISPLAY:
 *    - Shows percentage score with color coding
 *    - Lists found keywords (green badges)
 *    - Suggests missing keywords (gray badges)
 *    - Provides tips based on score range
 */

/**
 * Collect CV Data for ATS Analysis
 */
function collectCVData() {
    const data = {
        summary: document.getElementById('summary')?.value || '',
        skills: [],
        exp: []
    };
    
    // Collect skills
    document.querySelectorAll('#skillsList .dynamic-item').forEach(item => {
        const category = item.querySelector('.skill-cat')?.value || '';
        const skillInputs = item.querySelectorAll('.skill-name');
        const skills = Array.from(skillInputs).map(input => input.value).filter(v => v);
        if (category || skills.length) {
            data.skills.push({ cat: category, items: skills });
        }
    });
    
    // Collect experience
    document.querySelectorAll('#experienceList .dynamic-item').forEach(item => {
        const desc = item.querySelector('.exp-desc')?.value || '';
        if (desc) {
            data.exp.push({ desc });
        }
    });
    
    return data;
}

/**
 * Get ATS Keywords for current language
 */
function getATSKeywords() {
    // Get current language (fallback to 'en' if not available)
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    return ATS_KEYWORDS[lang] || ATS_KEYWORDS.en;
}

/**
 * Calculate ATS Score
 */
function calculateATSScore() {
    const cvData = collectCVData();
    const keywords = getATSKeywords(); // Get language-specific keywords
    let score = 0;
    let maxScore = 0;
    // Use Set from the start to prevent duplicates efficiently
    const foundKeywordsSet = new Set();
    const missingKeywordsSet = new Set();
    
    // Check summary
    const summary = (cvData.summary || '').toLowerCase();
    maxScore += 20;
    let summaryScore = 0;
    
    keywords.actionVerbs.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (summary.includes(keywordLower)) {
            summaryScore += 1;
            foundKeywordsSet.add(keyword);
        }
    });
    
    score += Math.min(summaryScore * 2, 20);
    
    // Check skills section
    const skills = (cvData.skills || []).map(s => s.items || []).flat().join(' ').toLowerCase();
    maxScore += 30;
    let skillsScore = 0;
    
    keywords.skills.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (skills.includes(keywordLower)) {
            skillsScore += 1;
            foundKeywordsSet.add(keyword);
        } else {
            missingKeywordsSet.add(keyword);
        }
    });
    
    score += Math.min(skillsScore * 3, 30);
    
    // Check experience descriptions
    const experiences = (cvData.exp || []).map(e => (e.desc || '').toLowerCase()).join(' ');
    maxScore += 30;
    let expScore = 0;
    
    keywords.actionVerbs.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (experiences.includes(keywordLower)) {
            expScore += 1;
            foundKeywordsSet.add(keyword);
        }
    });
    
    keywords.results.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (experiences.includes(keywordLower)) {
            expScore += 1;
            foundKeywordsSet.add(keyword);
        }
    });
    
    score += Math.min(expScore * 2, 30);
    
    // Check technical keywords
    const allText = [summary, skills, experiences].join(' ').toLowerCase();
    maxScore += 20;
    let techScore = 0;
    
    keywords.technical.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (allText.includes(keywordLower)) {
            techScore += 1;
            foundKeywordsSet.add(keyword);
        } else {
            missingKeywordsSet.add(keyword);
        }
    });
    
    score += Math.min(techScore * 2, 20);
    
    const percentage = Math.round((score / maxScore) * 100);
    
    return {
        score: percentage,
        foundKeywords: Array.from(foundKeywordsSet),
        missingKeywords: Array.from(missingKeywordsSet).slice(0, 10), // Top 10 missing
        details: {
            summary: summaryScore,
            skills: skillsScore,
            experience: expScore,
            technical: techScore
        }
    };
}

/**
 * Validate if minimum CV data exists for ATS analysis
 */
function hasMinimumCVData() {
    const cvData = collectCVData();
    const hasSummary = (cvData.summary || '').trim().length > 0;
    const hasSkills = (cvData.skills || []).length > 0;
    const hasExperience = (cvData.exp || []).length > 0;
    
    // Need at least one section filled
    return hasSummary || hasSkills || hasExperience;
}

/**
 * Show ATS Score Modal
 */
function showATSScore() {
    // Validate minimum data before showing score
    if (!hasMinimumCVData()) {
        // Show helpful message instead of 0% score
        const modalContent = `
            <div style="padding: 20px; text-align: center;">
                <div style="text-align: left; background: rgba(251, 113, 133, 0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #FB7185;">
                    <div style="font-size: 13px; color: var(--text-primary); margin-bottom: 8px;">${t('ats.profileSummary')}</div>
                    <div style="font-size: 13px; color: var(--text-primary); margin-bottom: 8px;">${t('ats.skillsSection')}</div>
                    <div style="font-size: 13px; color: var(--text-primary);">${t('ats.workExperience')}</div>
                </div>
            </div>
        `;
        
        // Find or create ATS modal
        let atsModal = document.getElementById('ats-modal');
        if (!atsModal) {
            atsModal = document.createElement('div');
            atsModal.id = 'ats-modal';
            atsModal.className = 'premium-modal';
            atsModal.innerHTML = `
                <div class="premium-modal-container">
                    <div class="premium-modal-header">
                        <button class="premium-modal-close" onclick="closeATSModal()" aria-label="Close">×</button>
                        <p class="premium-modal-subtitle">${t('ats.modalTitle')}</p>
                    </div>
                    <div class="premium-modal-content" id="ats-modal-content">
                    </div>
                </div>
            `;
            document.body.appendChild(atsModal);
            
            // Add click outside to close
            atsModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeATSModal();
                }
            });
        }
        
        document.getElementById('ats-modal-content').innerHTML = modalContent;
        atsModal.classList.add('show');
        return;
    }
    
    const result = calculateATSScore();
    
    // Create modal content
    const modalContent = `
        <div style="padding: 20px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 48px; font-weight: 700; color: ${result.score >= 70 ? '#10B981' : result.score >= 50 ? '#FB7185' : '#F43F5E'}; margin-bottom: 8px;">
                    ${result.score}%
                </div>
                <div style="font-size: 14px; color: var(--text-secondary);">${t('ats.scoreLabel')}</div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                    ${t('ats.foundKeywords')} (${result.foundKeywords.length})
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${result.foundKeywords.slice(0, 15).map(kw => 
                        `<span style="background: rgba(251, 113, 133, 0.1); color: #FB7185; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;">${kw}</span>`
                    ).join('')}
                </div>
            </div>
            
            ${result.missingKeywords.length > 0 ? `
            <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                    ${t('ats.suggestedKeywords')}
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${result.missingKeywords.map(kw => 
                        `<span style="background: rgba(55, 65, 81, 0.1); color: var(--text-secondary); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;">${kw}</span>`
                    ).join('')}
                </div>
            </div>
            ` : ''}
            
            <div style="background: rgba(251, 113, 133, 0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #FB7185;">
                <div style="font-size: 12px; line-height: 1.6; color: var(--text-primary);">
                    <strong>Tip:</strong> ${result.score >= 70 
                        ? t('ats.tipGreat')
                        : result.score >= 50 
                        ? t('ats.tipGood')
                        : t('ats.tipNeedsWork')}
                </div>
            </div>
        </div>
    `;
    
    // Find or create ATS modal
    let atsModal = document.getElementById('ats-modal');
    if (!atsModal) {
        atsModal = document.createElement('div');
        atsModal.id = 'ats-modal';
        atsModal.className = 'premium-modal';
            atsModal.innerHTML = `
                <div class="premium-modal-container">
                    <div class="premium-modal-header">
                        <button class="premium-modal-close" onclick="closeATSModal()" aria-label="Close">×</button>
                        <p class="premium-modal-subtitle">${t('ats.modalTitle')}</p>
                    </div>
                    <div class="premium-modal-content" id="ats-modal-content">
                    </div>
                </div>
            `;
        document.body.appendChild(atsModal);
        
        // Add click outside to close
        atsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeATSModal();
            }
        });
    }
    
    document.getElementById('ats-modal-content').innerHTML = modalContent;
    atsModal.classList.add('show');
}

/**
 * Close ATS Modal
 */
function closeATSModal() {
    const modal = document.getElementById('ats-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Add ATS Score Checker Button
 */
function addATSCheckerButton() {
    // Find the action container with Generate PDF button
    const actionContainer = document.querySelector('.action-container');
    if (!actionContainer) return;
    
    // Check if button already exists
    if (document.getElementById('ats-checker-btn')) return;
    
    // Create button
    const button = document.createElement('button');
    button.id = 'ats-checker-btn';
    button.type = 'button';
    button.className = 'ats-checker-button';
    
    // Only show icon if there's minimum CV data
    const hasData = hasMinimumCVData();
    if (hasData) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.style.marginRight = '8px';
        svg.className = 'ats-icon';
        
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M9 11l3 3L22 4');
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7');
        
        svg.appendChild(path1);
        svg.appendChild(path2);
        button.appendChild(svg);
    }
    
    const span = document.createElement('span');
    span.textContent = t('ats.button');
    span.className = 'ats-text';
    
    button.appendChild(span);
    button.onclick = showATSScore;
    
    // Store reference to span for language updates
    button.dataset.atsTextSpan = 'true';
    
    // Add styles
    if (!document.getElementById('ats-checker-styles')) {
        const style = document.createElement('style');
        style.id = 'ats-checker-styles';
        style.textContent = `
            .action-container {
                display: flex;
                gap: 16px;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .ats-checker-button {
                padding: 14px 28px;
                background: transparent;
                color: var(--brand-primary);
                border: 2px solid var(--brand-primary);
                border-radius: 50px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: all 0.3s var(--transition-smooth);
                font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
                position: relative;
                overflow: hidden;
            }
            
            .ats-checker-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background: linear-gradient(135deg, #FB7185 0%, #F43F5E 100%);
                transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 0;
            }
            
            .ats-checker-button svg,
            .ats-checker-button span {
                position: relative;
                z-index: 1;
            }
            
            .ats-checker-button .ats-icon {
                display: inline-block;
                margin-right: 8px;
            }
            
            .ats-checker-button .ats-text {
                margin-left: 0;
            }
            
            .ats-checker-button:hover {
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(251, 113, 133, 0.3);
            }
            
            .ats-checker-button:hover::before {
                width: 100%;
            }
            
            .ats-checker-button:active {
                transform: translateY(0);
            }
            
            @media (max-width: 768px) {
                .action-container {
                    flex-direction: column;
                }
                
                .ats-checker-button,
                .btn-generate {
                    width: 100%;
                    max-width: 300px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Insert button before Generate PDF button
    actionContainer.insertBefore(button, actionContainer.firstChild);
}

/**
 * PROGRESS WIDGET
 * Updates the completion percentage widget with section-based scoring
 * Each section has a specific weight and scoring system
 */
function updateProgress() {
    // Section weights (total = 100%)
    const SECTION_WEIGHTS = {
        profile: 20,      // 20% - Personal Profile section
        skills: 20,       // 20% - Skills section
        work: 25,         // 25% - Work Experience section
        education: 15,    // 15% - Education section
        languages: 10,    // 10% - Languages section
        certifications: 10 // 10% - Certifications section
    };
    
    let totalScore = 0;
    
    // 1. PROFILE SECTION (20%)
    let profileScore = 0;
    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const summary = document.getElementById('summary')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const location = document.getElementById('location')?.value.trim() || '';
    
    // Required fields (60% of profile section = 12% of total)
    if (fullName) profileScore += 0.3;
    if (jobTitle) profileScore += 0.2;
    if (email) profileScore += 0.1;
    
    // Social links (40% of profile section = 8% of total)
    const socialInputs = document.querySelectorAll('#socialLinksContainer .social-input');
    let hasLinkedIn = false;
    let hasGitHub = false;
    let hasWebsite = false;
    
    socialInputs.forEach(input => {
        const type = input.getAttribute('data-type');
        const value = input.value.trim();
        if (value) {
            // Check if validateSocialLink exists, if not just check if value exists
            const isValid = typeof validateSocialLink === 'function' ? validateSocialLink(input) : true;
            if (isValid) {
                if (type === 'linkedin') hasLinkedIn = true;
                if (type === 'github') hasGitHub = true;
                if (type === 'website') hasWebsite = true;
            }
        }
    });
    
    // LinkedIn gives maximum points (20% of profile section = 4% of total)
    if (hasLinkedIn) profileScore += 0.2;
    // GitHub and Website give bonus points (10% each = 2% of total each)
    if (hasGitHub) profileScore += 0.1;
    if (hasWebsite) profileScore += 0.1;
    
    totalScore += profileScore * SECTION_WEIGHTS.profile;
    
    // 2. SKILLS SECTION (20%)
    let skillsScore = 0;
    const skillItems = document.querySelectorAll('#skillsList .dynamic-item');
    let totalSkillsCount = 0;
    
    skillItems.forEach(item => {
        const skillInputs = item.querySelectorAll('.skill-name');
        skillInputs.forEach(input => {
            if (input.value.trim()) totalSkillsCount++;
        });
    });
    
    // Minimum points for 1 skill, maximum for 5+ skills
    if (totalSkillsCount >= 1) {
        skillsScore = Math.min(1, 0.2 + (totalSkillsCount - 1) * 0.2); // 20% for 1, 40% for 2, 60% for 3, 80% for 4, 100% for 5+
    }
    
    totalScore += skillsScore * SECTION_WEIGHTS.skills;
    
    // 3. WORK EXPERIENCE SECTION (25%)
    let workScore = 0;
    const workItems = document.querySelectorAll('#experienceList .dynamic-item');
    
    workItems.forEach(item => {
        const title = item.querySelector('.exp-title')?.value.trim() || '';
        const company = item.querySelector('.exp-company')?.value.trim() || '';
        const desc = item.querySelector('.exp-desc')?.value.trim() || '';
        const startMonth = item.querySelector('.start-month')?.value || '';
        const startYear = item.querySelector('.start-year')?.value || '';
        const endMonth = item.querySelector('.end-month')?.value || '';
        const endYear = item.querySelector('.end-year')?.value || '';
        const isCurrent = item.querySelector('.is-current')?.checked || false;
        
        // Check if entry is completely filled
        const hasDates = (startMonth && startYear) && (isCurrent || (endMonth && endYear));
        const isComplete = title && company && desc && hasDates;
        
        if (isComplete) {
            workScore = 1; // Maximum points if at least one entry is complete
            return;
        }
    });
    
    totalScore += workScore * SECTION_WEIGHTS.work;
    
    // 4. EDUCATION SECTION (15%)
    let educationScore = 0;
    const educationItems = document.querySelectorAll('#educationList .dynamic-item');
    
    educationItems.forEach(item => {
        const degree = item.querySelector('.edu-degree')?.value.trim() || '';
        const school = item.querySelector('.edu-school')?.value.trim() || '';
        const gradMonth = item.querySelector('.grad-month')?.value || '';
        const gradYear = item.querySelector('.grad-year')?.value || '';
        const location = item.querySelector('.edu-loc')?.value.trim() || '';
        
        // Check if entry is completely filled
        const hasDate = gradMonth && gradYear;
        const isComplete = degree && school && hasDate;
        
        if (isComplete) {
            educationScore = 1; // Maximum points if at least one entry is complete
            return;
        }
    });
    
    totalScore += educationScore * SECTION_WEIGHTS.education;
    
    // 5. LANGUAGES SECTION (10%)
    let languagesScore = 0;
    const languageItems = document.querySelectorAll('#languageList .dynamic-item');
    let hasLanguage = false;
    
    languageItems.forEach(item => {
        const langName = item.querySelector('.lang-name')?.value.trim() || '';
        if (langName) {
            hasLanguage = true;
        }
    });
    
    // Complete points if at least one language is added
    if (hasLanguage) {
        languagesScore = 1;
    }
    
    totalScore += languagesScore * SECTION_WEIGHTS.languages;
    
    // 6. CERTIFICATIONS SECTION (10%)
    let certsScore = 0;
    const certItems = document.querySelectorAll('#certList .dynamic-item');
    let hasCompleteCert = false;
    
    certItems.forEach(item => {
        const name = item.querySelector('.cert-name')?.value.trim() || '';
        const issuer = item.querySelector('.cert-issuer')?.value.trim() || '';
        const certMonth = item.querySelector('.cert-month')?.value || '';
        const certYear = item.querySelector('.cert-year')?.value || '';
        
        // Check if entry is completely filled
        const hasDate = certMonth && certYear;
        const isComplete = name && issuer && hasDate;
        
        if (isComplete) {
            hasCompleteCert = true;
        }
    });
    
    if (hasCompleteCert) {
        certsScore = 1;
    }
    
    totalScore += certsScore * SECTION_WEIGHTS.certifications;
    
    // Calculate final percentage
    const pct = Math.min(100, Math.round(totalScore));
    
    // Update progress widget
    const progressText = document.getElementById('progress-text');
    const progressCircle = document.getElementById('progress-circle');
    if (progressText) progressText.innerText = pct + "%";
    if (progressCircle) progressCircle.style.strokeDashoffset = 94.2 - (94.2 * pct / 100);
}

/**
 * CHARACTER COUNTER CONFIGURATION
 * Premium feature to guide users on optimal text length
 */
const CHARACTER_LIMITS = {
    summary: 250,      // Profile Summary - optimal for 2-3 lines
    workDescription: 400  // Work Description - optimal per experience entry
};

/**
 * Initialize Character Counter for Profile Summary
 */
function initSummaryCharacterCounter() {
    const summaryTextarea = document.getElementById('summary');
    if (!summaryTextarea) return;
    
    // Check if counter already exists
    const formGroup = summaryTextarea.closest('.form-group');
    if (formGroup && formGroup.querySelector('.char-counter')) return;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'char-counter char-counter-summary';
    counter.setAttribute('data-max', CHARACTER_LIMITS.summary);
    updateCharacterCounter(summaryTextarea, counter, CHARACTER_LIMITS.summary);
    
    // Append counter to form-group
    if (formGroup) {
        formGroup.style.position = 'relative';
        formGroup.appendChild(counter);
    }
    
    // Add event listeners
    summaryTextarea.addEventListener('input', function() {
        updateCharacterCounter(this, counter, CHARACTER_LIMITS.summary);
    });
    
    // Handle focus/blur for border styling
    summaryTextarea.addEventListener('focus', function() {
        const currentLen = this.value.length;
        if (currentLen > CHARACTER_LIMITS.summary) {
            this.style.borderColor = 'var(--danger)';
            this.style.boxShadow = '0 0 0 5px rgba(239, 68, 68, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
        } else if (currentLen > CHARACTER_LIMITS.summary * 0.8) {
            this.style.borderColor = '#F59E0B';
            this.style.boxShadow = '0 0 0 5px rgba(245, 158, 11, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
        }
    });
    
    summaryTextarea.addEventListener('blur', function() {
        updateCharacterCounter(this, counter, CHARACTER_LIMITS.summary);
    });
}

/**
 * Initialize Character Counter for Work Description
 * Handles both existing and dynamically added experience items
 */
function initWorkDescriptionCharacterCounters() {
    const workDescriptions = document.querySelectorAll('.exp-desc');
    
    workDescriptions.forEach(textarea => {
        // Skip if counter already exists
        const formGroup = textarea.closest('.form-group');
        if (formGroup && formGroup.querySelector('.char-counter')) return;
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'char-counter char-counter-work';
        counter.setAttribute('data-max', CHARACTER_LIMITS.workDescription);
        updateCharacterCounter(textarea, counter, CHARACTER_LIMITS.workDescription);
        
        // Append counter to form-group
        if (formGroup) {
            formGroup.style.position = 'relative';
            formGroup.appendChild(counter);
        }
        
        // Add event listeners
        textarea.addEventListener('input', function() {
            updateCharacterCounter(this, counter, CHARACTER_LIMITS.workDescription);
        });
        
        // Handle focus/blur for border styling
        textarea.addEventListener('focus', function() {
            const currentLen = this.value.length;
            if (currentLen > CHARACTER_LIMITS.workDescription) {
                this.style.borderColor = 'var(--danger)';
                this.style.boxShadow = '0 0 0 5px rgba(239, 68, 68, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
            } else if (currentLen > CHARACTER_LIMITS.workDescription * 0.8) {
                this.style.borderColor = '#F59E0B';
                this.style.boxShadow = '0 0 0 5px rgba(245, 158, 11, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
            }
        });
        
        textarea.addEventListener('blur', function() {
            updateCharacterCounter(this, counter, CHARACTER_LIMITS.workDescription);
        });
    });
}

/**
 * Update Character Counter Display
 * Provides visual feedback based on character count
 */
function updateCharacterCounter(textarea, counterElement, maxChars) {
    const currentLength = textarea.value.length;
    
    // Determine status and color
    let status, color, message;
    const charsText = t('counter.characters');
    const overText = t('counter.over');
    if (currentLength === 0) {
        status = 'empty';
        color = 'var(--text-tertiary)';
        message = `${currentLength} / ${maxChars} ${charsText}`;
    } else if (currentLength <= maxChars * 0.8) {
        status = 'good';
        color = 'var(--success)';
        message = `${currentLength} / ${maxChars} ${charsText}`;
    } else if (currentLength <= maxChars) {
        status = 'warning';
        color = '#F59E0B';
        message = `${currentLength} / ${maxChars} ${charsText}`;
    } else {
        status = 'exceeded';
        color = 'var(--danger)';
        message = `${currentLength} / ${maxChars} ${charsText} (${currentLength - maxChars} ${overText})`;
    }
    
    // Update counter element
    counterElement.textContent = message;
    counterElement.style.color = color;
    counterElement.setAttribute('data-status', status);
    
    // Add visual indicator on textarea border (only when not focused to preserve focus styles)
    if (document.activeElement !== textarea) {
        if (status === 'exceeded') {
            textarea.style.borderColor = 'var(--danger)';
            textarea.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else if (status === 'warning') {
            textarea.style.borderColor = '#F59E0B';
            textarea.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
        } else {
            // Reset to default
            textarea.style.borderColor = '';
            textarea.style.boxShadow = '';
        }
    }
}

/**
 * Add Character Counter Styles
 */
function addCharacterCounterStyles() {
    if (document.getElementById('char-counter-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'char-counter-styles';
    style.textContent = `
        .char-counter {
            position: absolute;
            bottom: 8px;
            right: 12px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.02em;
            font-family: var(--font-body, 'Inter', -apple-system, sans-serif);
            pointer-events: none;
            transition: color 0.3s var(--transition-smooth, cubic-bezier(0.2, 0.8, 0.2, 1));
            z-index: 10;
            background: rgba(255, 255, 255, 0.95);
            padding: 4px 8px;
            border-radius: 6px;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .form-group {
            position: relative;
        }
        
        .char-counter[data-status="good"] {
            color: var(--success, #10B981);
        }
        
        .char-counter[data-status="warning"] {
            color: #F59E0B;
        }
        
        .char-counter[data-status="exceeded"] {
            color: var(--danger, #EF4444);
            animation: pulse-warning 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse-warning {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }
        
        /* Ensure textarea has proper padding for counter */
        #summary + .char-counter,
        .exp-desc + .char-counter {
            position: absolute;
            bottom: 8px;
            right: 12px;
        }
        
        textarea {
            padding-bottom: 32px !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize All Character Counters
 */
function initCharacterCounters() {
    addCharacterCounterStyles();
    initSummaryCharacterCounter();
    initWorkDescriptionCharacterCounters();
}

/**
 * Observe DOM for dynamically added work descriptions
 * Uses MutationObserver to handle new experience items
 */
function observeWorkDescriptions() {
    const experienceList = document.getElementById('experienceList');
    if (!experienceList) return;
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList && node.classList.contains('dynamic-item')) {
                    // New experience item added, initialize its character counter
                    setTimeout(function() {
                        const textarea = node.querySelector('.exp-desc');
                        if (textarea) {
                            const counter = document.createElement('div');
                            counter.className = 'char-counter char-counter-work';
                            counter.setAttribute('data-max', CHARACTER_LIMITS.workDescription);
                            updateCharacterCounter(textarea, counter, CHARACTER_LIMITS.workDescription);
                            
                            const formGroup = textarea.closest('.form-group');
                            if (formGroup) {
                                formGroup.style.position = 'relative';
                                formGroup.appendChild(counter);
                                
                                textarea.addEventListener('input', function() {
                                    updateCharacterCounter(this, counter, CHARACTER_LIMITS.workDescription);
                                });
                                
                                // Handle focus/blur for border styling
                                textarea.addEventListener('focus', function() {
                                    const currentLen = this.value.length;
                                    if (currentLen > CHARACTER_LIMITS.workDescription) {
                                        this.style.borderColor = 'var(--danger)';
                                        this.style.boxShadow = '0 0 0 5px rgba(239, 68, 68, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
                                    } else if (currentLen > CHARACTER_LIMITS.workDescription * 0.8) {
                                        this.style.borderColor = '#F59E0B';
                                        this.style.boxShadow = '0 0 0 5px rgba(245, 158, 11, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.04)';
                                    }
                                });
                                
                                textarea.addEventListener('blur', function() {
                                    updateCharacterCounter(this, counter, CHARACTER_LIMITS.workDescription);
                                });
                            }
                        }
                    }, 50);
                }
            });
        });
    });
    
    observer.observe(experienceList, {
        childList: true,
        subtree: false
    });
}

/**
 * CV HEALTH SCORE DASHBOARD
 * Comprehensive analysis of CV completeness, ATS compatibility, and suggestions
 */

/**
 * Calculate CV Health Score
 * Returns an object with completeness, ATS compatibility, length, warnings, and suggestions
 */
function calculateHealthScore() {
    const result = {
        completeness: 0,
        ats_compatibility: 0,
        length: "Unknown",
        warnings: [],
        suggestions: []
    };
    
    // Calculate completeness (reuse updateProgress logic)
    const SECTION_WEIGHTS = {
        profile: 20,
        skills: 20,
        work: 25,
        education: 15,
        languages: 10,
        certifications: 10
    };
    
    let totalScore = 0;
    let profileScore = 0;
    let skillsScore = 0;
    let workScore = 0;
    let educationScore = 0;
    let languagesScore = 0;
    let certsScore = 0;
    
    // Profile section
    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const summary = document.getElementById('summary')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const location = document.getElementById('location')?.value.trim() || '';
    
    if (fullName) profileScore += 0.3;
    if (jobTitle) profileScore += 0.2;
    if (email) profileScore += 0.1;
    
    const socialInputs = document.querySelectorAll('#socialLinksContainer .social-input');
    let hasLinkedIn = false;
    let hasGitHub = false;
    let hasWebsite = false;
    
    socialInputs.forEach(input => {
        const type = input.getAttribute('data-type');
        const value = input.value.trim();
        if (value) {
            // Check if validateSocialLink exists, if not just check if value exists
            const isValid = typeof validateSocialLink === 'function' ? validateSocialLink(input) : true;
            if (isValid) {
                if (type === 'linkedin') hasLinkedIn = true;
                if (type === 'github') hasGitHub = true;
                if (type === 'website') hasWebsite = true;
            }
        }
    });
    
    if (hasLinkedIn) profileScore += 0.2;
    if (hasGitHub) profileScore += 0.1;
    if (hasWebsite) profileScore += 0.1;
    
    totalScore += profileScore * SECTION_WEIGHTS.profile;
    
    // Skills section
    const skillItems = document.querySelectorAll('#skillsList .dynamic-item');
    let totalSkillsCount = 0;
    skillItems.forEach(item => {
        const skillInputs = item.querySelectorAll('.skill-name');
        skillInputs.forEach(input => {
            if (input.value.trim()) totalSkillsCount++;
        });
    });
    
    if (totalSkillsCount >= 1) {
        skillsScore = Math.min(1, 0.2 + (totalSkillsCount - 1) * 0.2);
    }
    
    totalScore += skillsScore * SECTION_WEIGHTS.skills;
    
    // Work experience
    const workItems = document.querySelectorAll('#experienceList .dynamic-item');
    let hasCompleteWork = false;
    workItems.forEach(item => {
        const title = item.querySelector('.exp-title')?.value.trim() || '';
        const company = item.querySelector('.exp-company')?.value.trim() || '';
        const desc = item.querySelector('.exp-desc')?.value.trim() || '';
        const startMonth = item.querySelector('.start-month')?.value || '';
        const startYear = item.querySelector('.start-year')?.value || '';
        const endMonth = item.querySelector('.end-month')?.value || '';
        const endYear = item.querySelector('.end-year')?.value || '';
        const isCurrent = item.querySelector('.is-current')?.checked || false;
        const hasDates = (startMonth && startYear) && (isCurrent || (endMonth && endYear));
        if (title && company && desc && hasDates) {
            hasCompleteWork = true;
        }
    });
    
    if (hasCompleteWork) workScore = 1;
    totalScore += workScore * SECTION_WEIGHTS.work;
    
    // Education
    const educationItems = document.querySelectorAll('#educationList .dynamic-item');
    let hasCompleteEducation = false;
    educationItems.forEach(item => {
        const degree = item.querySelector('.edu-degree')?.value.trim() || '';
        const school = item.querySelector('.edu-school')?.value.trim() || '';
        const gradMonth = item.querySelector('.grad-month')?.value || '';
        const gradYear = item.querySelector('.grad-year')?.value || '';
        if (degree && school && gradMonth && gradYear) {
            hasCompleteEducation = true;
        }
    });
    
    if (hasCompleteEducation) educationScore = 1;
    totalScore += educationScore * SECTION_WEIGHTS.education;
    
    // Languages
    const languageItems = document.querySelectorAll('#languageList .dynamic-item');
    let hasLanguage = false;
    languageItems.forEach(item => {
        if (item.querySelector('.lang-name')?.value.trim()) {
            hasLanguage = true;
        }
    });
    
    if (hasLanguage) languagesScore = 1;
    totalScore += languagesScore * SECTION_WEIGHTS.languages;
    
    // Certifications
    const certItems = document.querySelectorAll('#certList .dynamic-item');
    let hasCompleteCert = false;
    certItems.forEach(item => {
        const name = item.querySelector('.cert-name')?.value.trim() || '';
        const issuer = item.querySelector('.cert-issuer')?.value.trim() || '';
        const certMonth = item.querySelector('.cert-month')?.value || '';
        const certYear = item.querySelector('.cert-year')?.value || '';
        if (name && issuer && certMonth && certYear) {
            hasCompleteCert = true;
        }
    });
    
    if (hasCompleteCert) certsScore = 1;
    totalScore += certsScore * SECTION_WEIGHTS.certifications;
    
    result.completeness = Math.min(100, Math.round(totalScore));
    
    // Calculate ATS compatibility
    if (hasMinimumCVData()) {
        const atsResult = calculateATSScore();
        result.ats_compatibility = atsResult.score;
    } else {
        result.ats_compatibility = 0;
    }
    
    // Assess length
    const summaryLength = summary.length;
    const workDescriptions = Array.from(document.querySelectorAll('.exp-desc')).map(textarea => textarea.value.length).reduce((a, b) => a + b, 0);
    const totalLength = summaryLength + workDescriptions;
    
    if (totalLength < 200) {
        result.length = typeof t === 'function' ? t('healthScore.length.tooShort') : "Too Short";
    } else if (totalLength < 800) {
        result.length = typeof t === 'function' ? t('healthScore.length.good') : "Good (1 page)";
    } else if (totalLength < 1500) {
        result.length = typeof t === 'function' ? t('healthScore.length.perfect') : "Perfect (1-2 pages)";
    } else {
        result.length = typeof t === 'function' ? t('healthScore.length.long') : "Long (2+ pages)";
    }
    
    // Generate warnings
    if (!phone) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noPhone') : "No phone number");
    if (totalSkillsCount === 0) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noSkills') : "Skills section empty");
    if (!summary) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noSummary') : "No profile summary");
    if (!hasLinkedIn) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noLinkedIn') : "No LinkedIn profile");
    if (workItems.length === 0) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noWorkExperience') : "No work experience");
    if (educationItems.length === 0) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noEducation') : "No education entries");
    if (!location) result.warnings.push(typeof t === 'function' ? t('healthScore.warnings.noLocation') : "No location specified");
    
    // Generate suggestions
    if (totalSkillsCount > 0 && totalSkillsCount < 3) {
        const remaining = 3 - totalSkillsCount;
        if (remaining === 1) {
            result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.addOneMoreSkill') : "Add 1 more skill");
        } else {
            result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.addTwoMoreSkills') : `Add ${remaining} more skills`);
        }
    } else if (totalSkillsCount === 0) {
        result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.addSkills') : "Add 2-3 skills");
    }
    
    if (!hasGitHub && !hasWebsite) {
        result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.addSocialLinks') : "Add GitHub or personal website for bonus points");
    }
    
    if (summaryLength < 100) {
        result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.expandSummary') : "Expand your profile summary");
    }
    
    // Check for quantifiable achievements
    const hasNumbers = /(\d+|percent|%|million|thousand|k|increased|decreased|improved)/i.test(summary + ' ' + Array.from(document.querySelectorAll('.exp-desc')).map(textarea => textarea.value).join(' '));
    if (!hasNumbers) {
        result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.quantifyAchievements') : "Quantify achievements with numbers");
    }
    
    if (workItems.length > 0) {
        const incompleteWork = Array.from(workItems).filter(item => {
            const title = item.querySelector('.exp-title')?.value.trim() || '';
            const company = item.querySelector('.exp-company')?.value.trim() || '';
            const desc = item.querySelector('.exp-desc')?.value.trim() || '';
            return !title || !company || !desc;
        }).length;
        
        if (incompleteWork > 0) {
            if (incompleteWork === 1) {
                result.suggestions.push(typeof t === 'function' ? t('healthScore.suggestions.completeOneWorkEntry') : "Complete 1 work experience entry");
            } else {
                const suggestion = typeof t === 'function' ? t('healthScore.suggestions.completeMultipleWorkEntries') : `Complete ${incompleteWork} work experience entries`;
                result.suggestions.push(suggestion.replace('{count}', incompleteWork));
            }
        }
    }
    
    return result;
}

/**
 * Show CV Health Score Dashboard Modal
 */
function showHealthScoreDashboard() {
    // Ensure styles are loaded
    addHealthScoreStyles();
    
    const healthScore = calculateHealthScore();
    
    // Get translations
    const modalTitle = typeof t === 'function' ? t('healthScore.modalTitle') : 'CV Health Score';
    const completenessLabel = typeof t === 'function' ? t('healthScore.completeness') : 'Completeness';
    const lengthLabel = typeof t === 'function' ? t('healthScore.length.label') : 'Length:';
    const warningsLabel = typeof t === 'function' ? t('healthScore.warnings.label') : 'Warnings';
    const suggestionsLabel = typeof t === 'function' ? t('healthScore.suggestions.label') : 'Suggestions';
    
    // Check if length is good (using translation-aware check)
    const lengthIsGood = healthScore.length.includes('Perfect') || healthScore.length.includes('Good') || 
                         healthScore.length.includes('Perfetto') || healthScore.length.includes('Bun') ||
                         healthScore.length.includes('Bine') || healthScore.length.includes('Отлично') ||
                         healthScore.length.includes('Відмінно');
    
    // Create modal HTML
    const modalHTML = `
        <div class="health-score-modal" id="health-score-modal">
            <div class="health-score-container">
                <div class="health-score-header">
                    <button class="health-score-close" onclick="closeHealthScoreModal()" aria-label="Close">×</button>
                </div>
                <div class="health-score-content">
                    <div class="health-score-metrics">
                        <div class="health-metric">
                            <div class="circular-progress" data-percent="${healthScore.completeness}">
                                <svg class="progress-ring" width="120" height="120">
                                    <circle class="progress-ring-circle-bg" cx="60" cy="60" r="54"></circle>
                                    <circle class="progress-ring-circle" cx="60" cy="60" r="54" data-percent="${healthScore.completeness}"></circle>
                                </svg>
                                <div class="progress-text">
                                    <span class="progress-value">${healthScore.completeness}%</span>
                                    <span class="progress-label">${completenessLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="health-score-info">
                        <div class="health-info-item">
                            <span class="health-info-label">${lengthLabel}</span>
                            <span class="health-info-value ${lengthIsGood ? 'good' : 'warning'}">${healthScore.length}</span>
                        </div>
                    </div>
                    
                    ${(healthScore.warnings.length > 0 || healthScore.suggestions.length > 0) ? `
                    <div class="health-warnings-suggestions-container">
                        ${healthScore.warnings.length > 0 ? `
                        <div class="health-warnings">
                            <h3 class="health-section-title">${warningsLabel}</h3>
                            <ul class="health-list">
                                ${healthScore.warnings.map(warning => `<li>${warning}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${healthScore.suggestions.length > 0 ? `
                        <div class="health-suggestions">
                            <h3 class="health-section-title">${suggestionsLabel}</h3>
                            <ul class="health-list">
                                ${healthScore.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('health-score-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Animate circular progress
    setTimeout(() => {
        const circle = document.querySelector('#health-score-modal .progress-ring-circle');
        if (circle) {
            const percent = parseInt(circle.getAttribute('data-percent'));
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            
            // Set color based on percentage
            if (percent >= 70) {
                circle.style.stroke = '#10B981'; // Green
            } else if (percent >= 50) {
                circle.style.stroke = '#F59E0B'; // Orange
            } else {
                circle.style.stroke = '#EF4444'; // Red
            }
        }
    }, 100);
    
    // Show modal
    setTimeout(() => {
        const modal = document.getElementById('health-score-modal');
        modal.classList.add('show');
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeHealthScoreModal();
            }
        });
    }, 50);
}

/**
 * Close Health Score Modal
 */
function closeHealthScoreModal() {
    const modal = document.getElementById('health-score-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Add Health Score Modal Styles
 * Styles for the health score modal (button removed - progress widget serves that purpose)
 */
function addHealthScoreStyles() {
    // Add styles if not already added
    if (!document.getElementById('health-score-styles')) {
        const style = document.createElement('style');
        style.id = 'health-score-styles';
        style.textContent = `
            .health-score-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .health-score-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .health-score-container {
                background: white;
                border-radius: 24px;
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .health-score-modal.show .health-score-container {
                transform: scale(1) translateY(0);
            }
            
            .health-score-header {
                padding: 12px 16px;
                border-bottom: 1px solid #E5E7EB;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                position: relative;
            }
            
            .health-score-close {
                background: none;
                border: none;
                font-size: 28px;
                color: #6B7280;
                cursor: pointer;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.2s;
            }
            
            .health-score-close:hover {
                background: #F3F4F6;
                color: #111827;
            }
            
            .health-score-content {
                padding: 28px;
            }
            
            .health-score-metrics {
                display: flex;
                justify-content: center;
                gap: 32px;
                margin-bottom: 32px;
            }
            
            .circular-progress {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto;
            }
            
            .progress-ring {
                transform: rotate(-90deg);
            }
            
            .progress-ring-circle-bg {
                fill: none;
                stroke: #E5E7EB;
                stroke-width: 8;
            }
            
            .progress-ring-circle {
                fill: none;
                stroke-width: 8;
                stroke-linecap: round;
                transition: stroke-dashoffset 1s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .circular-progress[data-percent] .progress-ring-circle {
                stroke: #10B981;
            }
            
            .circular-progress[data-percent="0"] .progress-ring-circle {
                stroke: #EF4444;
            }
            
            .circular-progress[data-percent^="0"] .progress-ring-circle,
            .circular-progress[data-percent^="1"] .progress-ring-circle,
            .circular-progress[data-percent^="2"] .progress-ring-circle,
            .circular-progress[data-percent^="3"] .progress-ring-circle,
            .circular-progress[data-percent^="4"] .progress-ring-circle {
                stroke: #EF4444;
            }
            
            .circular-progress[data-percent^="5"] .progress-ring-circle,
            .circular-progress[data-percent^="6"] .progress-ring-circle {
                stroke: #F59E0B;
            }
            
            .circular-progress[data-percent^="7"] .progress-ring-circle,
            .circular-progress[data-percent^="8"] .progress-ring-circle,
            .circular-progress[data-percent^="9"] .progress-ring-circle,
            .circular-progress[data-percent="100"] .progress-ring-circle {
                stroke: #10B981;
            }
            
            .progress-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
            }
            
            .progress-value {
                display: block;
                font-size: 28px;
                font-weight: 700;
                color: #111827;
            }
            
            .progress-label {
                display: block;
                font-size: 12px;
                color: #6B7280;
                margin-top: 4px;
            }
            
            .health-score-info {
                margin-bottom: 24px;
                padding: 16px;
                background: #F9FAFB;
                border-radius: 12px;
            }
            
            .health-info-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .health-info-label {
                font-size: 14px;
                color: #6B7280;
                font-weight: 600;
            }
            
            .health-info-value {
                font-size: 14px;
                font-weight: 700;
            }
            
            .health-info-value.good {
                color: #10B981;
            }
            
            .health-info-value.warning {
                color: #F59E0B;
            }
            
            .health-warnings-suggestions-container {
                display: flex;
                gap: 24px;
                margin-top: 24px;
            }
            
            .health-warnings,
            .health-suggestions {
                flex: 1;
                min-width: 0;
            }
            
            .health-section-title {
                font-size: 16px;
                font-weight: 700;
                color: #111827;
                margin-bottom: 12px;
            }
            
            .health-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .health-list li {
                padding: 12px 16px;
                background: #F9FAFB;
                border-radius: 8px;
                margin-bottom: 8px;
                font-size: 14px;
                color: #374151;
                border-left: 3px solid #EF4444;
            }
            
            .health-suggestions .health-list li {
                border-left-color: #10B981;
            }
            
            @media (max-width: 768px) {
                .health-score-metrics {
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                }
                
                .health-warnings-suggestions-container {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .health-score-container {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .health-score-header {
                    padding: 10px 12px;
                }
                
                .health-score-content {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            addATSCheckerButton();
            addHealthScoreStyles();
            initCharacterCounters();
            observeWorkDescriptions();
        }, 500);
    });
} else {
    setTimeout(function() {
        addATSCheckerButton();
        addHealthScoreStyles();
        initCharacterCounters();
        observeWorkDescriptions();
    }, 500);
}

