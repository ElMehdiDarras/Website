// Simplified language.js using data attributes with no fetch/loading
function setLanguage(lang) {
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Apply language to elements with data-* attributes
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });
    
    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.removeAttribute('dir');
    }
    
    // Show/hide language-specific content
    document.querySelectorAll('#english-content, #arabic-content').forEach(content => {
        if ((content.id === 'english-content' && lang === 'en') || 
            (content.id === 'arabic-content' && lang === 'ar')) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
    
    // Text alignment for items in Arabic
    if (lang === 'ar') {
        document.querySelectorAll('.work-item, .education-item, .cert-item').forEach(item => {
            item.style.textAlign = 'right';
        });
    } else {
        document.querySelectorAll('.work-item, .education-item, .cert-item').forEach(item => {
            item.style.textAlign = 'left';
        });
    }
    
    // Handle direction for marquee elements
    document.querySelectorAll('marquee').forEach(marquee => {
        if (lang === 'ar') {
            marquee.setAttribute('direction', 'right');
        } else {
            marquee.removeAttribute('direction');
        }
    });
    
    // Update active class for selected language
    document.querySelectorAll('.language-selector a').forEach(langLink => {
        if (langLink.textContent.toLowerCase().includes(lang)) {
            langLink.classList.add('active-lang');
        } else {
            langLink.classList.remove('active-lang');
        }
    });
    
    // Set active class for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize language when DOM is loaded (no fetch)
document.addEventListener('DOMContentLoaded', function() {
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(lang);
});