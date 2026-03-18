// Language Switcher for Bilingual Blog
// Handles language detection, persistence, and switching

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEY = 'preferred_lang';
  const DEFAULT_LANG = 'en';

  /**
   * Get user's preferred language
   * Priority: localStorage > browser > default
   */
  function getPreferredLanguage() {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['en', 'zh'].includes(stored)) {
      return stored;
    }

    // Auto-detect from browser
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('zh')) {
      return 'zh';
    }

    return DEFAULT_LANG;
  }

  /**
   * Set preferred language
   */
  function setPreferredLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  /**
   * Get translated URL for current page
   */
  function getTranslatedUrl(currentLang, targetLang) {
    const currentPath = window.location.pathname;

    // Handle homepage: /index.en/ <-> /index.zh/
    if (currentPath === '/index.en/' || currentPath === '/index.en.html' || currentPath === '/' || currentPath === '/index.html') {
      if (targetLang === 'zh') {
        return '/index.zh/';
      } else if (targetLang === 'en') {
        return '/index.en/';
      }
    }
    if (currentPath === '/index.zh/' || currentPath === '/index.zh.html') {
      if (targetLang === 'en') {
        return '/index.en/';
      }
    }

    // For posts: swap .en. <-> .zh.
    let newPath = currentPath;
    if (currentLang === 'en' && targetLang === 'zh') {
      newPath = currentPath.replace('.en/', '.zh/');
    } else if (currentLang === 'zh' && targetLang === 'en') {
      newPath = currentPath.replace('.zh/', '.en/');
    }

    return newPath;
  }

  /**
   * Get current language from URL (more reliable than HTML lang attribute)
   */
  function getCurrentLangFromUrl() {
    const path = window.location.pathname;

    // Homepage: /index.en/ or /index.zh/
    if (path.indexOf('/index.zh/') !== -1 || path.indexOf('/index.zh.html') !== -1) {
      return 'zh';
    }
    if (path.indexOf('/index.en/') !== -1 || path.indexOf('/index.en.html') !== -1) {
      return 'en';
    }

    // Posts: /posts/*.en/ or /posts/*.zh/
    if (path.indexOf('.zh/') !== -1 || path.indexOf('.zh.html') !== -1) {
      return 'zh';
    }
    if (path.indexOf('.en/') !== -1 || path.indexOf('.en.html') !== -1) {
      return 'en';
    }

    // Fall back to HTML lang attribute
    const htmlLang = document.documentElement.lang || DEFAULT_LANG;
    return (htmlLang === 'zh' || htmlLang === 'en') ? htmlLang : DEFAULT_LANG;
  }

  /**
   * Switch to target language
   */
  function switchLanguage(targetLang) {
    const currentLang = getCurrentLangFromUrl();

    // Already on target language
    if (targetLang === currentLang) {
      return;
    }

    // Store preference
    setPreferredLanguage(targetLang);

    // Get translated URL
    const newPath = getTranslatedUrl(currentLang, targetLang);

    // Check if translation exists
    fetch(newPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.location.href = newPath;
        } else {
          console.log('Translation not available for this page');
        }
      })
      .catch(() => {
        console.log('Translation not available for this page');
      });
  }

  /**
   * Initialize language switcher UI
   */
  function initLanguageSwitcher() {
    const toggle = document.getElementById('lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');

    if (!toggle || !dropdown) return;

    // Toggle dropdown visibility
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.add('hidden');
    });

    // Handle language option clicks
    dropdown.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        switchLanguage(lang);
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // Auto-detect and store language preference on first visit
  if (!localStorage.getItem(STORAGE_KEY)) {
    const preferred = getPreferredLanguage();
    setPreferredLanguage(preferred);
  }

  // Expose switchLanguage globally for inline handlers
  window.switchLanguage = switchLanguage;

})();
