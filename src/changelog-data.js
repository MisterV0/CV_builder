window.CHANGELOG_DATA = {
    entries: [
        {
            version: 'Prerelease 1.0',
            accent: '#10B981',
            items: [
                'App launched with full functionality',
                'Supports 5 languages (English, Italian, Romanian, Russian, Ukrainian)',
                '5 different CV templates (Modern, Serif, Jakarta, Robotic, Elegant)',
                'PDF download functionality',
                'CV Health Score analysis',
                'ATS compatibility checker'
            ]
        }
    ]
};

window.renderChangelogEntries = function renderChangelogEntries(container) {
    if (!container) return;

    const entries = Array.isArray(window.CHANGELOG_DATA?.entries) ? window.CHANGELOG_DATA.entries : [];

    container.innerHTML = entries.map((entry) => `
        <div style="margin-bottom: 32px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 8px; height: 8px; background: ${entry.accent || '#10B981'}; border-radius: 50%;"></div>
                <h3 style="font-size: 18px; font-weight: 700; color: #111827; margin: 0;">${entry.version}</h3>
            </div>
            <div style="padding-left: 20px; border-left: 2px solid #E5E7EB;">
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                    ${entry.items.map((item) => `
                        <li style="display: flex; align-items: start; gap: 12px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${entry.accent || '#10B981'}" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span style="font-size: 14px; color: #374151; line-height: 1.6;">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
};
