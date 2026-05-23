// ===================================
// Box Content Builder
// Handles special boxes: keyPrinciple, warningBox, etc.
// ===================================

export function buildBoxes(content) {
    let html = '';
    
    // Key Principle box
    if (content.keyPrinciple) {
        html += `
            <div class="key-principle">
                <h4>${content.keyPrinciple.title}</h4>
                <p>${content.keyPrinciple.content}</p>
            </div>
        `;
    }
    
    // Warning/Avoid box
    if (content.warningBox) {
        html += `
            <div class="warning-box">
                <h4>⚠ ${content.warningBox.title}</h4>
                ${content.warningBox.content ? `<p>${content.warningBox.content}</p>` : ''}
        `;
        
        if (content.warningBox.items && Array.isArray(content.warningBox.items)) {
            html += `<ul>`;
            content.warningBox.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += `</ul>`;
        }
        
        if (content.warningBox.points && Array.isArray(content.warningBox.points)) {
            html += `<ul>`;
            content.warningBox.points.forEach(point => {
                html += `<li>${point}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // Warning (standalone - Chapter 4 style)
    if (content.warning && typeof content.warning === 'object') {
        html += `
            <div class="warning-box">
                <h4>⚠ ${content.warning.type || 'Warning'}</h4>
                ${content.warning.text ? `<p>${content.warning.text}</p>` : ''}
            </div>
        `;
    }
    
    return html;
}
