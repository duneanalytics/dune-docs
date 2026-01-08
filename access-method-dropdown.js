/**
 * Custom Access Method Dropdown - Coinbase Style
 * 
 * Replaces Mintlify's default anchor selector with a Coinbase-style dropdown
 * that has category headers. Works with the anchors-based navigation structure.
 * 
 * ONLY runs on /access-methods/ pages
 */

(function() {
  'use strict';

  // SVG Icons (Mintlify-style line icons)
  const ICONS = {
    'analytics-hub': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    'api-reference': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'client-sdks': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    'real-time-apis': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'webhooks': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    'datashare': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    'trino-connector': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'dbt-connector': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    'catalyst': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>'
  };

  // Configuration: Define access methods with categories (as agreed in original prompt)
  const ACCESS_METHODS = {
    'EXPLORE AND ANALYZE': [
      { id: 'analytics-hub', name: 'Analytics Hub', href: '/access-methods/analytics-hub/index' }
    ],
    'PROGRAMMATIC ACCESS': [
      { id: 'api-reference', name: 'API Reference', href: '/access-methods/api-reference/index' },
      { id: 'client-sdks', name: 'Client SDKs', href: '/access-methods/client-sdks/index' },
      { id: 'real-time-apis', name: 'Real-Time APIs', href: '/access-methods/real-time-apis/index' },
      { id: 'webhooks', name: 'Webhooks', href: '/access-methods/webhooks/index' }
    ],
    'DATA DELIVERY': [
      { id: 'datashare', name: 'Datashare', href: '/access-methods/datashare/index' }
    ],
    'CONNECT YOUR TOOLS': [
      { id: 'trino-connector', name: 'Trino Connectors', href: '/access-methods/trino-connector/index' }
    ],
    'TRANSFORM DATA': [
      { id: 'dbt-connector', name: 'dbt Connector', href: '/access-methods/dbt-connector/index' }
    ],
    'FOR BLOCKCHAINS': [
      { id: 'catalyst', name: 'Catalyst', href: '/access-methods/catalyst/index' }
    ]
  };

  // Check if we're on an Access Methods page
  function isAccessMethodsPage() {
    const path = window.location.pathname;
    return path.includes('/access-methods') || path.includes('access-methods');
  }

  // Detect current access method from URL
  function getCurrentMethod() {
    const path = window.location.pathname;
    for (const category of Object.values(ACCESS_METHODS)) {
      for (const method of category) {
        if (path.includes(method.id)) {
          return method;
        }
      }
    }
    return ACCESS_METHODS['EXPLORE AND ANALYZE'][0];
  }

  // Get icon for a method
  function getIcon(methodId) {
    return ICONS[methodId] || ICONS['api-reference'];
  }

  // Create the dropdown HTML
  function createDropdownHTML() {
    const current = getCurrentMethod();
    
    let categoriesHTML = '';
    for (const [category, methods] of Object.entries(ACCESS_METHODS)) {
      categoriesHTML += `<div class="access-dropdown-category">
        <div class="access-dropdown-category-header">${category}</div>
        ${methods.map(method => `
          <a href="${method.href}" class="access-dropdown-item ${method.id === current.id ? 'active' : ''}">
            <span class="access-dropdown-item-icon">${getIcon(method.id)}</span>
            <span class="access-dropdown-item-name">${method.name}</span>
            ${method.id === current.id ? '<span class="access-dropdown-item-check">✓</span>' : ''}
          </a>
        `).join('')}
      </div>`;
    }

    return `
      <div class="access-dropdown-container" id="access-method-dropdown">
        <button class="access-dropdown-trigger" id="access-dropdown-trigger">
          <span class="access-dropdown-trigger-icon">${getIcon(current.id)}</span>
          <span class="access-dropdown-trigger-name">${current.name}</span>
          <span class="access-dropdown-trigger-chevron">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </button>
        <div class="access-dropdown-menu" id="access-dropdown-menu">
          ${categoriesHTML}
        </div>
      </div>
    `;
  }

  // Hide Mintlify's default anchor selector
  function hideDefaultAnchorSelector() {
    // Find and hide Mintlify's anchor/dropdown elements
    const selectors = [
      '[class*="nav-anchor"]',
      '[class*="NavAnchor"]',
      '[class*="anchor-selector"]',
      '[class*="AnchorSelector"]',
      '#nav-anchors',
      '[id*="nav-anchor"]',
      // Also hide any existing dropdown triggers at the top
      '.nav-dropdown-trigger:not(#access-dropdown-trigger)',
      '[class*="DropdownTrigger"]:not(#access-dropdown-trigger)'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.closest('#access-method-dropdown')) {
          el.style.display = 'none';
        }
      });
    });
  }

  // Find the sidebar
  function findSidebar() {
    const selectors = [
      '#sidebar-content',
      '[id*="sidebar-content"]',
      '.sidebar-content',
      '[class*="SidebarContent"]',
      '#sidebar > div',
      'aside > nav',
      'aside > div',
      '#navigation-items'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }

    const aside = document.querySelector('aside');
    if (aside) {
      return aside.querySelector('nav') || aside.querySelector('div');
    }
    return null;
  }

  // Remove existing dropdown
  function removeDropdown() {
    const existing = document.getElementById('access-method-dropdown');
    if (existing) existing.remove();
  }

  // Insert dropdown
  function insertDropdown() {
    if (!isAccessMethodsPage()) {
      removeDropdown();
      return;
    }

    // Hide the default anchor selector
    hideDefaultAnchorSelector();

    if (document.getElementById('access-method-dropdown')) {
      return;
    }

    const sidebar = findSidebar();
    if (!sidebar) {
      setTimeout(insertDropdown, 500);
      return;
    }

    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.innerHTML = createDropdownHTML();
    sidebar.insertBefore(dropdownWrapper.firstElementChild, sidebar.firstChild);
    setupEventListeners();
  }

  // Setup event listeners
  function setupEventListeners() {
    const trigger = document.getElementById('access-dropdown-trigger');
    const menu = document.getElementById('access-dropdown-menu');
    if (!trigger || !menu) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#access-method-dropdown')) {
        menu.classList.remove('open');
        trigger.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
        trigger.classList.remove('open');
      }
    });
  }

  // Handle navigation
  function handleNavigation() {
    if (isAccessMethodsPage()) {
      insertDropdown();
      hideDefaultAnchorSelector();
    } else {
      removeDropdown();
    }
  }

  // Initialize
  function init() {
    insertDropdown();
    setTimeout(insertDropdown, 500);
    setTimeout(insertDropdown, 1000);
    setTimeout(insertDropdown, 2000);

    // Keep hiding the default anchor selector
    setInterval(hideDefaultAnchorSelector, 1000);

    let lastPath = window.location.pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        handleNavigation();
      }
      if (isAccessMethodsPage()) {
        hideDefaultAnchorSelector();
        if (!document.getElementById('access-method-dropdown')) {
          insertDropdown();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', handleNavigation);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
