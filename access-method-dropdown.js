/**
 * Custom Access Method Dropdown - Coinbase Style
 * This script creates a dropdown selector at the top of the Access Methods sidebar
 * with category headers like Coinbase's documentation.
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

  // Configuration: Define access methods with categories
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
    'INTEGRATIONS': [
      { id: 'trino-connector', name: 'Trino Connector', href: '/access-methods/trino-connector/index' },
      { id: 'dbt-connector', name: 'dbt Connector', href: '/access-methods/dbt-connector/index' }
    ],
    'FOR BLOCKCHAINS': [
      { id: 'catalyst', name: 'Catalyst', href: '/access-methods/catalyst/index' }
    ]
  };

  // Check if we're on an Access Methods page
  function isAccessMethodsPage() {
    const path = window.location.pathname;
    // Only match paths that start with /access-methods/
    return path.startsWith('/access-methods/') || path === '/access-methods';
  }

  // Detect current access method from URL
  function getCurrentMethod() {
    const path = window.location.pathname;
    for (const category of Object.values(ACCESS_METHODS)) {
      for (const method of category) {
        if (path.includes(`/access-methods/${method.id}`)) {
          return method;
        }
      }
    }
    return ACCESS_METHODS['EXPLORE AND ANALYZE'][0]; // Default to Analytics Hub
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

  // Remove any existing dropdown
  function removeDropdown() {
    const existing = document.getElementById('access-method-dropdown');
    if (existing) {
      existing.remove();
    }
  }

  // Insert dropdown into the sidebar
  function insertDropdown() {
    // ONLY run on Access Methods pages
    if (!isAccessMethodsPage()) {
      removeDropdown();
      return;
    }

    // Find the sidebar content area
    const sidebar = document.querySelector('#sidebar-content') || 
                    document.querySelector('[class*="SidebarContent"]') ||
                    document.querySelector('.sidebar-content') ||
                    document.querySelector('[id*="sidebar"] > div');
    
    if (!sidebar) {
      // Retry after a short delay if sidebar not found
      setTimeout(insertDropdown, 500);
      return;
    }

    // Check if dropdown already exists
    if (document.getElementById('access-method-dropdown')) {
      return;
    }

    // Create dropdown element
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.innerHTML = createDropdownHTML();
    
    // Insert at the top of sidebar
    sidebar.insertBefore(dropdownWrapper.firstElementChild, sidebar.firstChild);

    // Add event listeners
    setupEventListeners();
  }

  // Setup dropdown event listeners
  function setupEventListeners() {
    const trigger = document.getElementById('access-dropdown-trigger');
    const menu = document.getElementById('access-dropdown-menu');
    
    if (!trigger || !menu) return;

    // Toggle dropdown on click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#access-method-dropdown')) {
        menu.classList.remove('open');
        trigger.classList.remove('open');
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
        trigger.classList.remove('open');
      }
    });
  }

  // Handle navigation changes (SPA behavior)
  function handleNavigation() {
    if (isAccessMethodsPage()) {
      if (!document.getElementById('access-method-dropdown')) {
        insertDropdown();
      }
    } else {
      removeDropdown();
    }
  }

  // Initialize
  function init() {
    // Only proceed if on Access Methods page
    if (!isAccessMethodsPage()) {
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertDropdown);
    } else {
      insertDropdown();
    }

    // Watch for navigation changes (SPA)
    let lastPath = window.location.pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        handleNavigation();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleNavigation);
  }

  init();
})();
