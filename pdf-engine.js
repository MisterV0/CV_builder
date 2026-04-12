function wrapText(doc, text, maxWidth, lineHeight) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = doc.getTextWidth(testLine);
        
        if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}

function addNewPageIfNeeded(doc, currentY, requiredHeight, pageHeight, margin) {
    if (currentY + requiredHeight > pageHeight - margin) {
        doc.addPage();
        return margin + 8; // extra top padding on new pages
    }
    return currentY;
}

// Estimate the total height of a block (experience/education/project) to avoid page splitting
function estimateBlockH(doc, desc, fixedH, maxWidth, lineHeight, fontSize) {
    if (!desc) return fixedH;
    const prevSize = doc.getFontSize();
    const prevFont = doc.getFont();
    doc.setFontSize(fontSize);
    doc.setFont('NotoSans', 'normal');
    const lines = wrapText(doc, desc.replace(/\n/g, ' '), maxWidth, lineHeight);
    doc.setFontSize(prevSize);
    doc.setFont(prevFont.fontName, prevFont.fontStyle);
    return fixedH + lines.length * lineHeight;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert a data-URL image (e.g. WebP) to JPEG data-URL via an off-screen canvas.
// Returns null on failure. Works synchronously because the image is already loaded
// as a data-URL and we pre-cache the converted result during generateCV.
let _convertedPhotoCache = null;
function convertToJpegSync(dataUrl) {
    if (_convertedPhotoCache && _convertedPhotoCache.src === dataUrl) {
        return _convertedPhotoCache.jpeg;
    }
    return null; // fallback handled by async pre-conversion
}
function preConvertPhoto(dataUrl) {
    return new Promise((resolve) => {
        if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
            resolve(dataUrl);
            return;
        }
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const jpeg = canvas.toDataURL('image/jpeg', 0.92);
            _convertedPhotoCache = { src: dataUrl, jpeg: jpeg };
            resolve(jpeg);
        };
        img.onerror = function() { resolve(dataUrl); };
        img.src = dataUrl;
    });
}

function addImageToPDF(doc, imageData, x, y, width, height, circular) {
    if (!imageData) {
        return false;
    }
    
    try {
        // Handle data URL (data:image/jpeg;base64,... or data:image/png;base64,...)
        let imageFormat = 'JPEG';
        if (imageData.startsWith('data:image/png')) {
            imageFormat = 'PNG';
        } else if (imageData.startsWith('data:image/jpeg') || imageData.startsWith('data:image/jpg')) {
            imageFormat = 'JPEG';
        } else if (imageData.startsWith('data:image/webp')) {
            // WebP not supported by jsPDF — convert via canvas
            imageFormat = 'JPEG';
            imageData = convertToJpegSync(imageData);
            if (!imageData) return false;
        }
        
        if (circular) {
            // Circular clipping using save/restore and ellipse clip path
            const cx = x + width / 2;
            const cy = y + height / 2;
            const rx = width / 2;
            const ry = height / 2;
            doc.saveGraphicsState();
            doc.circle(cx, cy, rx, null);
            doc.clip();
            doc.discardPath();
            doc.addImage(imageData, imageFormat, x, y, width, height);
            doc.restoreGraphicsState();
        } else {
            doc.addImage(imageData, imageFormat, x, y, width, height);
        }
        return true;
    } catch (error) {
        // If image fails, continue without it (fallback to non-circular)
        try {
            doc.addImage(imageData, imageFormat, x, y, width, height);
            return true;
        } catch (e2) {
            console.warn('Could not add image to PDF:', error);
            return false;
        }
    }
}

function drawRoundedRect(doc, x, y, w, h, r, mode) {
    // Check if roundedRect method exists (available in jsPDF 2.0+)
    if (typeof doc.roundedRect === 'function') {
        doc.roundedRect(x, y, w, h, r, r, mode);
    } else {
        // Fallback to regular rectangle
        if (mode === 'F' || mode === 'FD') {
            doc.rect(x, y, w, h, 'F');
        }
        if (mode === 'D' || mode === 'FD') {
            doc.rect(x, y, w, h, 'D');
        }
    }
}

// --- PDF ICON HELPERS ---
function svgToPngDataUrl(svgStr) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 64, 64);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
    });
}

async function generateSocialIconsForPDF(socials) {
    const icons = {};
    const pdfSvgs = {
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"><\/path><rect x="2" y="9" width="4" height="12"><\/rect><circle cx="4" cy="4" r="2"><\/circle><\/svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.17 6.84 9.49.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.11 2.54.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.82-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10Z"/><\/svg>`,
        website: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"><\/circle><line x1="2" y1="12" x2="22" y2="12"><\/line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"><\/path><\/svg>`,
        verified: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"><\/path><polyline points="22 4 12 14.01 9 11.01"><\/polyline><\/svg>`
    };
    for (const s of socials) {
        if (!icons[s.type] && pdfSvgs[s.type]) {
            try { icons[s.type] = await svgToPngDataUrl(pdfSvgs[s.type]); } catch (e) { console.warn(e); }
        }
    }
    // Always load verified icon
    if (!icons.verified) try { icons.verified = await svgToPngDataUrl(pdfSvgs.verified); } catch (e) { console.warn(e); }
    
    return icons;
}

function renderMinimalPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons) {
    let yPos = margin;
    
    // Header Section
    const headerStartY = yPos;
    doc.setFontSize(30);
    doc.setFont('NotoSans', 'bold');
    doc.setTextColor(17, 17, 17); // #111
    doc.text(cvData.name.toUpperCase(), margin, yPos);
    yPos += 12;
    
    if (cvData.title) {
        doc.setFontSize(15);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(0, 113, 227); // #0071E3
        doc.text(cvData.title, margin, yPos);
        yPos += 8;
    }
    
    // Contact info
    doc.setFontSize(12);
    doc.setFont('NotoSans', 'normal');
    doc.setTextColor(85, 85, 85); // #555
    const contactInfo = [cvData.email, cvData.phone, cvData.loc].filter(Boolean).join(' • ');
    if (contactInfo) {
        doc.text(contactInfo, margin, yPos);
        yPos += 6;
    }
    
    // Social links
    if (cvData.socials && cvData.socials.length > 0) {
        let currentX = margin;
        for (const s of cvData.socials) {
            const iconData = socialIcons[s.type];
            const text = s.val;
            const textWidth = doc.getTextWidth(text);
            const iconSize = 4;
            const itemWidth = iconSize + 2 + textWidth + 6;
            
            if (currentX + itemWidth > pageWidth - margin) { currentX = margin; yPos += 6; }
            
            if (iconData) doc.addImage(iconData, 'PNG', currentX, yPos - 3, iconSize, iconSize);
            doc.text(text, currentX + iconSize + 2, yPos);
            currentX += itemWidth;
        }
        if (cvData.socials.length > 0) {
            yPos += 6;
        }
    }
    
    // Photo (right side of header)
    if (cvData.photo) {
        const photoSize = 22; // mm
        const photoX = pageWidth - margin - photoSize;
        addImageToPDF(doc, cvData.photo, photoX, headerStartY, photoSize, photoSize, true);
    }
    
    // Header bottom border
    yPos += 5;
    doc.setDrawColor(17, 17, 17); // #111
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // Summary
    if (cvData.summary) {
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(51, 51, 51); // #333
        const summaryLines = wrapText(doc, cvData.summary.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
        summaryLines.forEach(line => {
            yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
            doc.text(line, margin, yPos);
            yPos += lineHeight;
        });
        yPos += 10;
    }
    
    // Work Experience
    if (cvData.exp && cvData.exp.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const expTitle = typeof t === 'function' ? t('sections.workExperience') : 'Experience';
        doc.text(expTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221); // #ddd
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.exp.forEach(exp => {
            const _expH = estimateBlockH(doc, exp.desc, 20, pageWidth - 2 * margin, lineHeight, 12);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_expH, pageHeight - 2 * margin), pageHeight, margin);
            
            // Title and date on same line
            doc.setFontSize(14);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            const titleWidth = doc.getTextWidth(exp.title);
            doc.text(exp.title, margin, yPos);
            
            if (exp.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102); // #666
                doc.text(exp.date, pageWidth - margin - doc.getTextWidth(exp.date), yPos);
            }
            yPos += 6;
            
            // Company and location
            if (exp.company) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'italic');
                doc.setTextColor(68, 68, 68); // #444
                const companyText = exp.company + (exp.location ? `, ${exp.location}` : '');
                doc.text(companyText, margin, yPos);
                yPos += 6;
            }
            
            // Description
            if (exp.desc) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, exp.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 8;
        });
    }
    
    // Education
    if (cvData.edu && cvData.edu.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const eduTitle = typeof t === 'function' ? t('sections.education') : 'Education';
        doc.text(eduTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.edu.forEach(edu => {
            const _eduH = estimateBlockH(doc, edu.desc, 20, pageWidth - 2 * margin, lineHeight, 12);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_eduH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold'); 
            doc.setTextColor(17, 17, 17);
            
            const degreeText = formatDegreeWithField(edu.degree, edu.field);
            const degreeLines = doc.splitTextToSize(degreeText, pageWidth - margin - 50);
            doc.text(degreeLines, margin, yPos);
            
            // Adjust yPos if degree wrapped
            if (degreeLines.length > 1) yPos += (degreeLines.length - 1) * 5;
            
            if (edu.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                doc.text(edu.date, pageWidth - margin - doc.getTextWidth(edu.date), yPos);
            }
            yPos += 6;
            
            if (edu.school) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                doc.text(edu.school, margin, yPos);
                yPos += 8;
            }
            if (edu.desc) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, edu.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += 4;
            }
        });
    }
    
    // Certifications
    if (cvData.certs && cvData.certs.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const certTitle = typeof t === 'function' ? t('sections.certifications') : 'Certifications';
        doc.text(certTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.certs.forEach(cert => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            
            doc.text(cert.name, margin, yPos);
            
            // Verified Badge
            if (cert.url && socialIcons.verified) {
                doc.addImage(socialIcons.verified, 'PNG', margin + doc.getTextWidth(cert.name) + 2, yPos - 3, 4, 4);
            }
            
            if (cert.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), yPos);
            }
            yPos += 5;
            
            if (cert.issuer) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                doc.text(cert.issuer, margin, yPos);
                yPos += 5;
            }
            
            // Add URL if available
            if (cert.url) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(0, 113, 227); // Blue color for link
                const urlText = cert.url.startsWith('http') ? cert.url : `https://${cert.url}`;
                doc.text(`View Certificate: ${urlText}`, margin, yPos);
                yPos += 8;
            } else {
                yPos += 3;
            }
        });
    }
    
    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const skillsTitle = typeof t === 'function' ? t('sections.skills') : 'Skills';
        doc.text(skillsTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        
        cvData.skills.forEach(skillCat => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(0, 113, 227); // #0071E3
            doc.text(skillCat.cat, margin, yPos);
            yPos += 6;
            
            // Skills in category
            let xPos = margin;
            skillCat.items.forEach((skill, idx) => {
                const skillText = skill.name + (skill.level ? ` • ${getProficiencyLabel(skill.level, false)}` : '');
                const textWidth = doc.getTextWidth(skillText) + 4;
                
                if (xPos + textWidth > pageWidth - margin) {
                    yPos += 6;
                    xPos = margin;
                }
                
                // Background box
                doc.setFillColor(242, 242, 247); // #F2F2F7
                drawRoundedRect(doc, xPos - 2, yPos - 4, textWidth, 5, 1, 'F');
                
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(skillText, xPos, yPos);
                xPos += textWidth + 3;
            });
            yPos += 10;
        });
    }
    
    // Languages
    if (cvData.languages && cvData.languages.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const langTitle = typeof t === 'function' ? t('sections.languages') : 'Languages';
        doc.text(langTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        const langPerRow = 2;
        const langColWidth = (pageWidth - 2 * margin) / langPerRow;
        
        cvData.languages.forEach((lang, idx) => {
            const col = idx % langPerRow;
            const row = Math.floor(idx / langPerRow);
            
            if (col === 0 && idx > 0) {
                yPos += 6;
            }
            
            const langX = margin + col * langColWidth;
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            doc.text(lang.name, langX, yPos);
            
            doc.setFont('NotoSans', 'normal');
            doc.setTextColor(102, 102, 102);
            doc.text(`— ${lang.level}`, langX + doc.getTextWidth(lang.name) + 2, yPos);
        });
    }
    
    // Personal Projects
    if (cvData.projects && cvData.projects.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const projTitle = typeof t === 'function' ? t('sections.personalProjects') : 'Personal Projects';
        doc.text(projTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.projects.forEach(proj => {
            const _projH = estimateBlockH(doc, proj.desc, 12, pageWidth - 2 * margin, lineHeight, 12);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_projH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            doc.text(proj.name, margin, yPos);
            
            if (proj.link) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(0, 113, 227);
                const linkText = proj.link.startsWith('http') ? proj.link : `https://${proj.link}`;
                doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), yPos);
            }
            yPos += 6;
            
            if (proj.desc) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                const descLines = wrapText(doc, proj.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 4;
        });
    }
    
    return yPos;
}

/**
 * Render Exec Template PDF
 */
function renderExecPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons) {
    let yPos = margin;
    
    // Photo (centered above name)
    if (cvData.photo) {
        const photoSize = 22;
        const photoX = (pageWidth - photoSize) / 2;
        addImageToPDF(doc, cvData.photo, photoX, yPos, photoSize, photoSize, true);
        yPos += photoSize + 6;
    }
    
    // Centered header
    doc.setFontSize(22);
    doc.setFont('NotoSans', 'bold');
    doc.setTextColor(17, 17, 17);
    const nameWidth = doc.getTextWidth(cvData.name || '');
    doc.text(cvData.name || '', (pageWidth - nameWidth) / 2, yPos);
    yPos += 8;
    
    if (cvData.title) {
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(85, 85, 85);
        const titleText = cvData.title.toUpperCase();
        const titleWidth = doc.getTextWidth(titleText);
        doc.text(titleText, (pageWidth - titleWidth) / 2, yPos);
        yPos += 5;
    }
    
    // Contact bar with borders
    const contactBar = [cvData.email, cvData.phone, cvData.loc].filter(Boolean);
    
    if (contactBar.length > 0 || cvData.socials.length > 0) {
        yPos += 5;
        doc.setDrawColor(238, 238, 238); // #eee
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
        
        if (cvData.socials && cvData.socials.length > 0) {
            contactBar.push(...cvData.socials.map(s => s.val));
        }
        
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(68, 68, 68);
        const contactText = contactBar.join(' | ');
        const maxContactW = pageWidth - 2 * margin;
        const contactLines = doc.splitTextToSize(contactText, maxContactW);
        contactLines.forEach(line => {
            const lw = doc.getTextWidth(line);
            doc.text(line, Math.max(margin, (pageWidth - lw) / 2), yPos);
            yPos += 5;
        });
        
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;
    }
    
    // Summary
    if (cvData.summary) {
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(51, 51, 51);
        const summaryLines = wrapText(doc, cvData.summary, pageWidth - 2 * margin, lineHeight);
        summaryLines.forEach(line => {
            yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
            doc.text(line, margin, yPos);
            yPos += lineHeight;
        });
        yPos += 10;
    }
    
    // Work Experience
    if (cvData.exp && cvData.exp.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const expTitle = typeof t === 'function' ? t('sections.workExperience') : 'Experience';
        doc.text(expTitle.toUpperCase(), margin, yPos);
        yPos += 2;
        doc.setDrawColor(51, 51, 51); // #333
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.exp.forEach(exp => {
            const _expH = estimateBlockH(doc, exp.desc, 20, pageWidth - 2 * margin, lineHeight, 13);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_expH, pageHeight - 2 * margin), pageHeight, margin);
            
            // Company first
            doc.setFontSize(14);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            const companyText = exp.company + (exp.location ? `, ${exp.location}` : '');
            const companyWidth = doc.getTextWidth(companyText);
            doc.text(companyText, margin, yPos);
            
            if (exp.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(68, 68, 68);
                doc.text(exp.date, pageWidth - margin - doc.getTextWidth(exp.date), yPos);
            }
            yPos += 6;
            
            // Title (italic)
            if (exp.title) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'italic');
                doc.setTextColor(51, 51, 51);
                doc.text(exp.title, margin, yPos);
                yPos += 6;
            }
            
            // Description
            if (exp.desc) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, exp.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 8;
        });
    }
    
    // Education
    if (cvData.edu && cvData.edu.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const eduTitle = typeof t === 'function' ? t('sections.education') : 'Education';
        doc.text(eduTitle.toUpperCase(), margin, yPos);
        yPos += 2;
        doc.setDrawColor(51, 51, 51);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.edu.forEach(edu => {
            const _eduH = estimateBlockH(doc, edu.desc, 18, pageWidth - 2 * margin, lineHeight, 12);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_eduH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            doc.text(edu.school, margin, yPos);
            
            if (edu.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(edu.date, pageWidth - margin - doc.getTextWidth(edu.date), yPos);
            }
            yPos += 5;
            
            const degreeText = formatDegreeWithField(edu.degree, edu.field);
            if (degreeText) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(degreeText, margin, yPos);
                yPos += 8;
            }
            if (edu.desc) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, edu.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += 4;
            }
        });
    }
    
    // Certifications
    if (cvData.certs && cvData.certs.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const certTitle = typeof t === 'function' ? t('sections.certifications') : 'Certifications';
        doc.text(certTitle.toUpperCase(), margin, yPos);
        yPos += 2;
        doc.setDrawColor(51, 51, 51);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.certs.forEach(cert => {
            yPos = addNewPageIfNeeded(doc, yPos, 18, pageHeight, margin);
            
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            doc.text(cert.name, margin, yPos);
            
            // Verified Badge
            if (cert.url && socialIcons.verified) {
                doc.addImage(socialIcons.verified, 'PNG', margin + doc.getTextWidth(cert.name) + 2, yPos - 3, 4, 4);
            }
            
            if (cert.date) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), yPos);
            }
            yPos += 5;
            
            if (cert.issuer) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(cert.issuer, margin, yPos);
                yPos += 5;
            }
            
            // Add URL if available
            if (cert.url) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(0, 113, 227); // Blue color for link
                const urlText = cert.url.startsWith('http') ? cert.url : `https://${cert.url}`;
                doc.text(`View Certificate: ${urlText}`, margin, yPos);
                yPos += 8;
            } else {
                yPos += 3;
            }
        });
    }
    
    // Personal Projects
    if (cvData.projects && cvData.projects.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(17, 17, 17);
        const projTitle = typeof t === 'function' ? t('sections.personalProjects') : 'Personal Projects';
        doc.text(projTitle.toUpperCase(), margin, yPos);
        yPos += 2;
        doc.setDrawColor(51, 51, 51);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.projects.forEach(proj => {
            const _projH = estimateBlockH(doc, proj.desc, 12, pageWidth - 2 * margin, lineHeight, 13);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_projH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(17, 17, 17);
            doc.text(proj.name, margin, yPos);
            if (proj.link) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(0, 113, 227);
                const linkText = proj.link.startsWith('http') ? proj.link : `https://${proj.link}`;
                doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), yPos);
            }
            yPos += 5;
            if (proj.desc) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, proj.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 4;
        });
    }
    
    return yPos;
}

/**
 * Render Elegant Template PDF
 */
function renderElegantPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons) {
    let yPos = margin;
    const gold = [139, 105, 20];
    const dark = [28, 28, 30];
    const grey = [153, 153, 153];

    // Photo (top-right corner)
    if (cvData.photo) {
        const photoSize = 20;
        addImageToPDF(doc, cvData.photo, pageWidth - margin - photoSize, margin, photoSize, photoSize, true);
    }

    // Centered name
    doc.setFontSize(28);
    doc.setFont('NotoSans', 'bold');
    doc.setTextColor(...dark);
    const nameW = doc.getTextWidth(cvData.name.toUpperCase());
    doc.text(cvData.name.toUpperCase(), (pageWidth - nameW) / 2, yPos);
    yPos += 10;

    // Title in gold
    if (cvData.title) {
        doc.setFontSize(10);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(...gold);
        const titleW = doc.getTextWidth(cvData.title.toUpperCase());
        doc.text(cvData.title.toUpperCase(), (pageWidth - titleW) / 2, yPos);
        yPos += 7;
    }

    // Thin gold divider
    doc.setDrawColor(212, 168, 67);
    doc.setLineWidth(0.3);
    const divW = 40;
    doc.line((pageWidth - divW) / 2, yPos, (pageWidth + divW) / 2, yPos);
    yPos += 7;

    // Contact info centered
    doc.setFontSize(10);
    doc.setFont('NotoSans', 'normal');
    doc.setTextColor(102, 102, 102);
    const contactInfo = [cvData.email, cvData.phone, cvData.loc].filter(Boolean).join(' · ');
    if (contactInfo) {
        const cw = doc.getTextWidth(contactInfo);
        doc.text(contactInfo, (pageWidth - cw) / 2, yPos);
        yPos += 6;
    }

    // Social links
    if (cvData.socials && cvData.socials.length > 0) {
        const socialText = cvData.socials.map(s => s.val).join(' · ');
        doc.setFontSize(10);
        doc.setTextColor(...gold);
        const sw = doc.getTextWidth(socialText);
        doc.text(socialText, (pageWidth - sw) / 2, yPos);
        yPos += 8;
    }

    // Summary italic centered
    if (cvData.summary) {
        yPos += 4;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'italic');
        doc.setTextColor(85, 85, 85);
        const summaryLines = wrapText(doc, cvData.summary.replace(/\n/g, ' '), pageWidth - 5 * margin, lineHeight);
        summaryLines.forEach(line => {
            yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
            const lw = doc.getTextWidth(line);
            doc.text(line, (pageWidth - lw) / 2, yPos);
            yPos += lineHeight;
        });
        yPos += 6;
    }

    // Section helper
    function elegantSection(title) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 3;
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(...gold);
        doc.text(title, margin, yPos);
        yPos += 3;
        doc.setDrawColor(212, 168, 67);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
    }

    // Experience
    if (cvData.exp && cvData.exp.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.workExperience') : 'Experience');
        cvData.exp.forEach(exp => {
            const _expH = estimateBlockH(doc, exp.desc, 20, pageWidth - 2 * margin, lineHeight, 11);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_expH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...dark);
            doc.text(exp.title, margin, yPos);
            if (exp.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'italic');
                doc.setTextColor(...grey);
                doc.text(exp.date, pageWidth - margin - doc.getTextWidth(exp.date), yPos);
            }
            yPos += 6;
            if (exp.company) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(...gold);
                doc.text(exp.company + (exp.location ? ` · ${exp.location}` : ''), margin, yPos);
                yPos += 6;
            }
            if (exp.desc) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                wrapText(doc, exp.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight).forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 8;
        });
    }

    // Education
    if (cvData.edu && cvData.edu.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.education') : 'Education');
        cvData.edu.forEach(edu => {
            const _eduH = estimateBlockH(doc, edu.desc, 20, pageWidth - 2 * margin, lineHeight, 11);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_eduH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...dark);
            doc.text(formatDegreeWithField(edu.degree, edu.field), margin, yPos);
            if (edu.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'italic');
                doc.setTextColor(...grey);
                doc.text(edu.date, pageWidth - margin - doc.getTextWidth(edu.date), yPos);
            }
            yPos += 6;
            if (edu.school) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(...gold);
                doc.text(edu.school, margin, yPos);
                yPos += 7;
            }
            if (edu.desc) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                wrapText(doc, edu.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight).forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += 4;
            }
        });
    }

    // Certifications
    if (cvData.certs && cvData.certs.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.certifications') : 'Certifications');
        cvData.certs.forEach(cert => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...dark);
            doc.text(cert.name, margin, yPos);
            if (cert.url && socialIcons.verified) {
                doc.addImage(socialIcons.verified, 'PNG', margin + doc.getTextWidth(cert.name) + 2, yPos - 3, 4, 4);
            }
            if (cert.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'italic');
                doc.setTextColor(...grey);
                doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), yPos);
            }
            yPos += 5;
            if (cert.issuer) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(...gold);
                doc.text(cert.issuer, margin, yPos);
                yPos += 7;
            }
        });
    }

    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.skills') : 'Skills');
        cvData.skills.forEach(skillCat => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            doc.setFontSize(11);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...gold);
            doc.text(skillCat.cat, margin, yPos);
            yPos += 6;
            let xPos = margin;
            skillCat.items.forEach(skill => {
                const skillText = skill.name + (skill.level ? ` · ${getProficiencyLabel(skill.level, false)}` : '');
                const textWidth = doc.getTextWidth(skillText) + 4;
                if (xPos + textWidth > pageWidth - margin) { yPos += 6; xPos = margin; }
                doc.setFillColor(253, 248, 238);
                drawRoundedRect(doc, xPos - 2, yPos - 4, textWidth, 5, 1, 'F');
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(44, 44, 44);
                doc.text(skillText, xPos, yPos);
                xPos += textWidth + 3;
            });
            yPos += 10;
        });
    }

    // Languages
    if (cvData.languages && cvData.languages.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.languages') : 'Languages');
        const langPerRow = 2;
        const langColWidth = (pageWidth - 2 * margin) / langPerRow;
        cvData.languages.forEach((lang, idx) => {
            const col = idx % langPerRow;
            if (col === 0 && idx > 0) yPos += 6;
            const langX = margin + col * langColWidth;
            doc.setFontSize(11);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...dark);
            doc.text(lang.name, langX, yPos);
            doc.setFont('NotoSans', 'italic');
            doc.setTextColor(...grey);
            doc.text(`— ${lang.level}`, langX + doc.getTextWidth(lang.name) + 2, yPos);
        });
        yPos += 8;
    }

    // Projects
    if (cvData.projects && cvData.projects.length > 0) {
        elegantSection(typeof t === 'function' ? t('sections.personalProjects') : 'Personal Projects');
        cvData.projects.forEach(proj => {
            const _projH = estimateBlockH(doc, proj.desc, 12, pageWidth - 2 * margin, lineHeight, 11);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_projH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(...dark);
            doc.text(proj.name, margin, yPos);
            if (proj.link) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(...gold);
                const linkText = proj.link.startsWith('http') ? proj.link : `https://${proj.link}`;
                doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), yPos);
            }
            yPos += 6;
            if (proj.desc) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                wrapText(doc, proj.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight).forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 4;
        });
    }

    return yPos;
}

function renderJakartaPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons) {
    let yPos = margin;
    
    // Header with photo
    const headerStartY = yPos;
    let textStartX = margin;
    
    if (cvData.photo) {
        const photoSize = 22;
        addImageToPDF(doc, cvData.photo, margin, yPos, photoSize, photoSize, true);
        textStartX = margin + 24;
    }
    
    doc.setFontSize(38);
    doc.setFont('NotoSans', 'bold');
    doc.setTextColor(26, 26, 26); // #1a1a1a
    
    const nameLines = doc.splitTextToSize(cvData.name || '', pageWidth - textStartX - margin);
    doc.text(nameLines, textStartX, yPos + 12);
    yPos += 12 + (nameLines.length * 14);
    
    if (cvData.title) {
        doc.setFontSize(15);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(44, 62, 80); // #2C3E50
        doc.text(cvData.title, textStartX, yPos);
        yPos += 8;
    }
    
    // Contact info
    doc.setFontSize(12);
    doc.setFont('NotoSans', 'normal');
    doc.setTextColor(85, 85, 85);
    const contactInfo = [cvData.email, cvData.phone, cvData.loc].filter(Boolean).join(' • ');
    if (contactInfo) {
        doc.text(contactInfo, textStartX, yPos);
        yPos += 6;
    }
    
    // Social links
    if (cvData.socials && cvData.socials.length > 0) {
        let currentX = textStartX;
        for (const s of cvData.socials) {
            const iconData = socialIcons[s.type];
            const text = s.val;
            const textWidth = doc.getTextWidth(text);
            const iconSize = 4;
            const itemWidth = iconSize + 2 + textWidth + 6;
            
            if (currentX + itemWidth > pageWidth - margin) { currentX = textStartX; yPos += 6; }
            
            if (iconData) doc.addImage(iconData, 'PNG', currentX, yPos - 3, iconSize, iconSize);
            doc.text(text, currentX + iconSize + 2, yPos);
            currentX += itemWidth;
        }
        if (cvData.socials.length > 0) {
            yPos += 6;
        }
    }
    
    // Header border
    yPos = Math.max(yPos, headerStartY + 30);
    yPos += 5;
    doc.setDrawColor(44, 62, 80); // #2C3E50
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // Summary
    if (cvData.summary) {
        doc.setFontSize(13);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(51, 51, 51);
        const summaryLines = wrapText(doc, cvData.summary.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
        summaryLines.forEach(line => {
            yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
            doc.text(line, margin, yPos);
            yPos += lineHeight;
        });
        yPos += 10;
    }
    
    // Work Experience
    if (cvData.exp && cvData.exp.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const expTitle = typeof t === 'function' ? t('sections.workExperience') : 'Experience';
        doc.text(expTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.exp.forEach(exp => {
            const _expH = estimateBlockH(doc, exp.desc, 20, pageWidth - 2 * margin, lineHeight, 12);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_expH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(14);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 26, 26);
            const titleWidth = doc.getTextWidth(exp.title);
            doc.text(exp.title, margin, yPos);
            
            if (exp.date) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136); // #888
                doc.text(exp.date, pageWidth - margin - doc.getTextWidth(exp.date), yPos);
            }
            yPos += 6;
            
            if (exp.company) {
                doc.setFontSize(13);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(44, 62, 80);
                const companyText = exp.company + (exp.location ? ` • ${exp.location}` : '');
                doc.text(companyText, margin, yPos);
                yPos += 6;
            }
            
            if (exp.desc) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                const descLines = wrapText(doc, exp.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 8;
        });
    }
    
    // Education
    if (cvData.edu && cvData.edu.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const eduTitle = typeof t === 'function' ? t('sections.education') : 'Education';
        doc.text(eduTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.edu.forEach(edu => {
            const _eduH = estimateBlockH(doc, edu.desc, 20, pageWidth - 2 * margin, lineHeight, 11);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_eduH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 26, 26);
            
            const degreeText = formatDegreeWithField(edu.degree, edu.field);
            const degreeLines = doc.splitTextToSize(degreeText, pageWidth - margin - 50);
            doc.text(degreeLines, margin, yPos);
            
            if (degreeLines.length > 1) yPos += (degreeLines.length - 1) * 5;
            
            if (edu.date) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136);
                doc.text(edu.date, pageWidth - margin - doc.getTextWidth(edu.date), yPos);
            }
            yPos += 5;
            
            if (edu.school) {
                doc.setFontSize(12);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text(edu.school, margin, yPos);
                yPos += 8;
            }
            if (edu.desc) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const descLines = wrapText(doc, edu.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += 4;
            }
        });
    }
    
    // Certifications
    if (cvData.certs && cvData.certs.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const certTitle = typeof t === 'function' ? t('sections.certifications') : 'Certifications';
        doc.text(certTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.certs.forEach(cert => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 26, 26);
            doc.text(cert.name, margin, yPos);
            
            // Verified Badge
            if (cert.url && socialIcons.verified) {
                doc.addImage(socialIcons.verified, 'PNG', margin + doc.getTextWidth(cert.name) + 2, yPos - 3, 4, 4);
            }
            
            if (cert.date) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136);
                doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), yPos);
            }
            yPos += 5;
            
            if (cert.issuer) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                doc.text(cert.issuer, margin, yPos);
                yPos += 5;
            }
            
            // Add URL if available
            if (cert.url) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(44, 62, 80); // Navy color matching template
                const urlText = cert.url.startsWith('http') ? cert.url : `https://${cert.url}`;
                doc.text(`View Certificate: ${urlText}`, margin, yPos);
                yPos += 8;
            } else {
                yPos += 3;
            }
        });
    }
    
    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const skillsTitle = typeof t === 'function' ? t('sections.skills') : 'Skills';
        doc.text(skillsTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        
        cvData.skills.forEach(skillCat => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            
            doc.setFontSize(11);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(44, 62, 80);
            doc.text(skillCat.cat.toUpperCase(), margin, yPos);
            yPos += 6;
            
            let xPos = margin;
            skillCat.items.forEach(skill => {
                const skillText = skill.name + (skill.level ? ` • ${getProficiencyLabel(skill.level, false)}` : '');
                const textWidth = doc.getTextWidth(skillText) + 4;
                
                if (xPos + textWidth > pageWidth - margin) {
                    yPos += 6;
                    xPos = margin;
                }
                
                doc.setFillColor(240, 245, 250); // #F0F5FA
                doc.setDrawColor(212, 224, 240); // #D4E0F0
                doc.setLineWidth(0.2);
                drawRoundedRect(doc, xPos - 2, yPos - 4, textWidth, 5, 1.5, 'FD');
                
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                doc.text(skillText, xPos, yPos);
                xPos += textWidth + 2;
            });
            yPos += 10;
        });
    }
    
    // Languages
    if (cvData.languages && cvData.languages.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const langTitle = typeof t === 'function' ? t('sections.languages') : 'Languages';
        doc.text(langTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        const langColWidth = (pageWidth - 2 * margin) / 2;
        cvData.languages.forEach((lang, idx) => {
            const col = idx % 2;
            if (col === 0 && idx > 0) yPos += 6;
            
            const langX = margin + col * langColWidth;
            doc.setFontSize(12);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 26, 26);
            doc.text(lang.name, langX, yPos);
            
            doc.setFont('NotoSans', 'normal');
            doc.setTextColor(136, 136, 136);
            doc.setFontSize(11);
            doc.text(`— ${lang.level}`, langX + doc.getTextWidth(lang.name) + 2, yPos);
        });
    }
    
    // Personal Projects
    if (cvData.projects && cvData.projects.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 26, 26);
        const projTitle = typeof t === 'function' ? t('sections.personalProjects') : 'Personal Projects';
        doc.text(projTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        cvData.projects.forEach(proj => {
            const _projH = estimateBlockH(doc, proj.desc, 12, pageWidth - 2 * margin, lineHeight, 11);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_projH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(13);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 26, 26);
            doc.text(proj.name, margin, yPos);
            if (proj.link) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(44, 62, 80);
                const linkText = proj.link.startsWith('http') ? proj.link : `https://${proj.link}`;
                doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), yPos);
            }
            yPos += 5;
            if (proj.desc) {
                doc.setFontSize(11);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(85, 85, 85);
                const descLines = wrapText(doc, proj.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 4;
        });
    }
    
    return yPos;
}

/**
 * Render Robotic Template PDF
 */
function renderRoboticPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons) {
    let yPos = margin;
    const headerStartY = yPos;
    
    // Header
    doc.setFontSize(26);
    doc.setFont('NotoSans', 'bold');
    doc.setTextColor(26, 58, 82); // #1A3A52
    doc.text(cvData.name.toUpperCase() || '', margin, yPos);
    yPos += 8;
    
    if (cvData.title) {
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        doc.text(cvData.title.toUpperCase(), margin, yPos);
        yPos += 6;
    }
    
    // Contact info
    doc.setFontSize(10);
    doc.setFont('NotoSans', 'normal');
    doc.setTextColor(85, 85, 85);
    const contactInfo = [cvData.email, cvData.phone, cvData.loc].filter(Boolean).join(' • ');
    if (contactInfo) {
        doc.text(contactInfo, margin, yPos);
        yPos += 5;
    }
    
    if (cvData.socials && cvData.socials.length > 0) {
        let currentX = margin;
        for (const s of cvData.socials) {
            const iconData = socialIcons[s.type];
            const text = s.val;
            const textWidth = doc.getTextWidth(text);
            const iconSize = 3.5;
            const itemWidth = iconSize + 2 + textWidth + 6;
            
            if (currentX + itemWidth > pageWidth - margin) { currentX = margin; yPos += 5; }
            
            if (iconData) doc.addImage(iconData, 'PNG', currentX, yPos - 2.5, iconSize, iconSize);
            doc.text(text, currentX + iconSize + 2, yPos);
            currentX += itemWidth;
        }
        if (cvData.socials.length > 0) {
            yPos += 5;
        }
    }
    
    // Photo (right side of header)
    if (cvData.photo) {
        const photoSize = 22;
        const photoX = pageWidth - margin - photoSize;
        addImageToPDF(doc, cvData.photo, photoX, headerStartY, photoSize, photoSize, true);
    }
    
    // Header border
    yPos += 3;
    doc.setDrawColor(232, 238, 245); // #E8EEF5
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    // Summary with left border
    if (cvData.summary) {
        doc.setFillColor(232, 238, 245);
        doc.rect(margin, yPos - 3, 1, 15, 'F');
        
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(51, 51, 51);
        const summaryLines = wrapText(doc, cvData.summary.replace(/\n/g, ' '), pageWidth - 2 * margin - 5, lineHeight);
        summaryLines.forEach(line => {
            yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
            doc.text(line, margin + 4, yPos);
            yPos += lineHeight;
        });
        yPos += 8;
    }
    
    // Work Experience
    if (cvData.exp && cvData.exp.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 2;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const expTitle = typeof t === 'function' ? t('sections.workExperience') : 'Experience';
        doc.text(expTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        cvData.exp.forEach(exp => {
            const _expH = estimateBlockH(doc, exp.desc, 16, pageWidth - 2 * margin, lineHeight, 10);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_expH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(11);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 58, 82);
            const titleText = exp.title.toUpperCase();
            const titleWidth = doc.getTextWidth(titleText);
            doc.text(titleText, margin, yPos);
            
            if (exp.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136);
                doc.text(exp.date, pageWidth - margin - doc.getTextWidth(exp.date), yPos);
            }
            yPos += 5;
            
            if (exp.company) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(51, 51, 51);
                const companyText = exp.company + (exp.location ? ` • ${exp.location}` : '');
                doc.text(companyText, margin, yPos);
                yPos += 5;
            }
            
            if (exp.desc) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                const descLines = wrapText(doc, exp.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 6;
        });
    }
    
    // Education
    if (cvData.edu && cvData.edu.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 2;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const eduTitle = typeof t === 'function' ? t('sections.education') : 'Education';
        doc.text(eduTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        cvData.edu.forEach(edu => {
            const _eduH = estimateBlockH(doc, edu.desc, 18, pageWidth - 2 * margin, lineHeight, 10);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_eduH, pageHeight - 2 * margin), pageHeight, margin);
            
            doc.setFontSize(10);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 58, 82);
            
            const degreeText = formatDegreeWithField(edu.degree, edu.field).toUpperCase();
            const degreeLines = doc.splitTextToSize(degreeText, pageWidth - margin - 50);
            doc.text(degreeLines, margin, yPos);
            
            if (degreeLines.length > 1) yPos += (degreeLines.length - 1) * 4;
            
            if (edu.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136);
                doc.text(edu.date, pageWidth - margin - doc.getTextWidth(edu.date), yPos);
            }
            yPos += 5;
            
            if (edu.school) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(85, 85, 85);
                doc.text(edu.school, margin, yPos);
                yPos += 6;
            }
            if (edu.desc) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                const descLines = wrapText(doc, edu.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += 4;
            }
        });
    }
    
    // Certifications
    if (cvData.certs && cvData.certs.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 2;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const certTitle = typeof t === 'function' ? t('sections.certifications') : 'Certifications';
        doc.text(certTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        cvData.certs.forEach(cert => {
            yPos = addNewPageIfNeeded(doc, yPos, 15, pageHeight, margin);
            
            doc.setFontSize(10);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 58, 82);
            doc.text(cert.name.toUpperCase(), margin, yPos);
            
            // Verified Badge
            if (cert.url && socialIcons.verified) {
                doc.addImage(socialIcons.verified, 'PNG', margin + doc.getTextWidth(cert.name.toUpperCase()) + 2, yPos - 2.5, 3.5, 3.5);
            }
            
            if (cert.date) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(136, 136, 136);
                doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), yPos);
            }
            yPos += 5;
            
            if (cert.issuer) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                doc.text(cert.issuer, margin, yPos);
                yPos += 5;
            }
            
            // Add URL if available
            if (cert.url) {
                doc.setFontSize(9);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(26, 58, 82); // Template color
                const urlText = cert.url.startsWith('http') ? cert.url : `https://${cert.url}`;
                doc.text(`View Certificate: ${urlText}`, margin, yPos);
                yPos += 6;
            } else {
                yPos += 3;
            }
        });
    }
    
    // Skills with progress bars
    if (cvData.skills && cvData.skills.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 2;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const skillsTitle = typeof t === 'function' ? t('sections.skills') : 'Skills';
        doc.text(skillsTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        cvData.skills.forEach(skillCat => {
            yPos = addNewPageIfNeeded(doc, yPos, skillCat.items.length * 8 + 10, pageHeight, margin);
            
            doc.setFontSize(10);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 58, 82);
            doc.text(skillCat.cat.toUpperCase(), margin, yPos);
            yPos += 6;

            // Pre-compute aligned bar start: max skill name width + gap
            doc.setFontSize(10);
            doc.setFont('NotoSans', 'normal');
            const maxSkillNameW = skillCat.items.reduce((m, s) => Math.max(m, doc.getTextWidth(s.name)), 0);
            const skillBarX = margin + maxSkillNameW + 6;
            // Dynamically compute max level label width
            doc.setFontSize(9);
            doc.setFont('NotoSans', 'bold');
            const skillLevelW = skillCat.items.reduce((m, s) => {
                if (!s.level) return m;
                return Math.max(m, doc.getTextWidth(getProficiencyLabel(s.level, false)));
            }, 0) + 4;
            const skillBarWidth = Math.max(15, pageWidth - skillBarX - margin - skillLevelW);

            skillCat.items.forEach(skill => {
                yPos = addNewPageIfNeeded(doc, yPos, 8, pageHeight, margin);
                
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(51, 51, 51);
                const skillName = skill.name;
                doc.text(skillName, margin, yPos);
                
                // Progress bar (starts after longest skill name)
                const barX = skillBarX;
                const barWidth = skillBarWidth;
                const barY = yPos - 2;
                const barHeight = 1.5;
                
                // Background bar
                doc.setFillColor(232, 238, 245);
                doc.rect(barX, barY, barWidth, barHeight, 'F');
                
                // Filled bar
                const levelPercent = skill.level ? (skill.level * 33.33) : 0;
                const fillWidth = (barWidth * levelPercent) / 100;
                
                doc.setFillColor(46, 80, 144); // #2E5090
                doc.rect(barX, barY, fillWidth, barHeight, 'F');
                
                // Level label
                if (skill.level) {
                    doc.setFontSize(9);
                    doc.setFont('NotoSans', 'bold');
                    doc.setTextColor(46, 80, 144);
                    const levelText = getProficiencyLabel(skill.level, false);
                    doc.text(levelText, pageWidth - margin - doc.getTextWidth(levelText), yPos);
                }
                
                yPos += 5;
            });
            yPos += 3;
        });
    }
    
    // Languages with progress bars
    if (cvData.languages && cvData.languages.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, cvData.languages.length * 8 + 15, pageHeight, margin);
        yPos += 2;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const langTitle = typeof t === 'function' ? t('sections.languages') : 'Languages';
        doc.text(langTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        // Pre-compute aligned bar start for languages
        doc.setFontSize(10);
        doc.setFont('NotoSans', 'normal');
        const maxLangNameW = cvData.languages.reduce((m, l) => Math.max(m, doc.getTextWidth(l.name)), 0);
        const langBarX = margin + maxLangNameW + 6;
        // Dynamically compute max level label width
        doc.setFontSize(9);
        doc.setFont('NotoSans', 'bold');
        const langLevelW = cvData.languages.reduce((m, l) => Math.max(m, doc.getTextWidth(l.level)), 0) + 4;
        const langBarWidth = Math.max(15, pageWidth - langBarX - margin - langLevelW);

        cvData.languages.forEach(lang => {
            yPos = addNewPageIfNeeded(doc, yPos, 8, pageHeight, margin);
            
            doc.setFontSize(10);
            doc.setFont('NotoSans', 'normal');
            doc.setTextColor(51, 51, 51);
            doc.text(lang.name, margin, yPos);
            
            // Progress bar (starts after longest language name)
            const barX = langBarX;
            const barWidth = langBarWidth;
            const barY = yPos - 2;
            const barHeight = 1.5;
            
            // Background bar
            doc.setFillColor(232, 238, 245);
            doc.rect(barX, barY, barWidth, barHeight, 'F');
            
            // Filled bar based on numeric level (1=33%, 2=66%, 3=100%)
            let levelPercent = 0;
            if (lang.levelNum) {
                levelPercent = lang.levelNum * 33.33;
            } else {
                // Fallback: string matching for English labels
                if (lang.level.includes('Independent') || lang.level.includes('Independ')) levelPercent = 66;
                else if (lang.level.includes('Proficient') || lang.level.includes('Expert') || lang.level.includes('Эксперт')) levelPercent = 100;
                else levelPercent = 33;
            }
            
            const fillWidth = (barWidth * levelPercent) / 100;
            
            doc.setFillColor(46, 80, 144);
            doc.rect(barX, barY, fillWidth, barHeight, 'F');
            
            // Level label
            doc.setFontSize(9);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(46, 80, 144);
            doc.text(lang.level, pageWidth - margin - doc.getTextWidth(lang.level), yPos);
            
            yPos += 5;
        });
        yPos += 6;
    }
    
    // Personal Projects
    if (cvData.projects && cvData.projects.length > 0) {
        yPos = addNewPageIfNeeded(doc, yPos, 45, pageHeight, margin);
        yPos += 4;
        doc.setFontSize(11);
        doc.setFont('NotoSans', 'bold');
        doc.setTextColor(26, 58, 82);
        const projTitle = typeof t === 'function' ? t('sections.personalProjects') : 'Personal Projects';
        doc.text(projTitle.toUpperCase(), margin, yPos);
        yPos += 3;
        doc.setDrawColor(232, 238, 245);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        cvData.projects.forEach(proj => {
            const _projH = estimateBlockH(doc, proj.desc, 12, pageWidth - 2 * margin, lineHeight, 10);
            yPos = addNewPageIfNeeded(doc, yPos, Math.min(_projH, pageHeight - 2 * margin), pageHeight, margin);
            doc.setFontSize(11);
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(26, 58, 82);
            doc.text(proj.name, margin, yPos);
            if (proj.link) {
                doc.setFontSize(9);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(46, 80, 144);
                const linkText = proj.link.startsWith('http') ? proj.link : `https://${proj.link}`;
                doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), yPos);
            }
            yPos += 5;
            if (proj.desc) {
                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.setTextColor(102, 102, 102);
                const descLines = wrapText(doc, proj.desc.replace(/\n/g, ' '), pageWidth - 2 * margin, lineHeight);
                descLines.forEach(line => {
                    yPos = addNewPageIfNeeded(doc, yPos, lineHeight, pageHeight, margin);
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
            }
            yPos += 4;
        });
    }
    
    return yPos;
}

/**
 * Main PDF Download Function - Pure jsPDF
 */
async function downloadPDF() {
    // Validate cvData exists
    if (!cvData || !cvData.name) {
        alert('Please generate your CV before downloading.');
        return;
    }
    
    // Get full name from cvData
    const fullName = cvData.name.replace(/\s+/g, '_');
    
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // Get current language code
    const lang = currentLanguage || 'en';
    
    // Create filename: {fullName}_CV_{YYYY-MM-DD}_{LANG}.pdf
    const filename = `${fullName}_CV_${dateStr}_${lang}.pdf`;
    
    // Generate icons
    const socialIcons = await generateSocialIconsForPDF(cvData.socials);

    // Pre-convert WebP photo to JPEG for jsPDF compatibility
    if (cvData.photo && cvData.photo.startsWith('data:image/webp')) {
        cvData.photo = await preConvertPhoto(cvData.photo);
    }

    try {
        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        });

        // --- EMBED NOTO SANS (Latin + Romanian + Cyrillic) ---
        doc.addFileToVFS('NotoSans-Regular.ttf', _NS_R);
        doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
        doc.addFileToVFS('NotoSans-Bold.ttf', _NS_B);
        doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');
        doc.addFileToVFS('NotoSans-Italic.ttf', _NS_I);
        doc.addFont('NotoSans-Italic.ttf', 'NotoSans', 'italic');
        // -----------------------------------------------

        // Page dimensions in mm (A4)
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const lineHeight = 6;
        
        // Render based on template
        let finalY;
        if (currentTemplate === 'minimal') {
            finalY = renderMinimalPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        } else if (currentTemplate === 'exec') {
            finalY = renderExecPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        } else if (currentTemplate === 'jakarta') {
            finalY = renderJakartaPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        } else if (currentTemplate === 'robotic') {
            finalY = renderRoboticPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        } else if (currentTemplate === 'elegant') {
            finalY = renderElegantPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        } else {
            // Default to minimal
            finalY = renderMinimalPDF(doc, cvData, pageWidth, pageHeight, margin, lineHeight, socialIcons);
        }
        
        // Save PDF
        doc.save(filename);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again. Check console for details.');
                }
}
