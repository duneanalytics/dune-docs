/**
 * Custom Access Method Dropdown - Coinbase Style
 * This script creates a dropdown selector at the top of the Access Methods sidebar
 * with category headers like Coinbase's documentation.
 */

(function() {
  'use strict';

  // Configuration: Define access methods with categories
  const ACCESS_METHODS = {
    'EXPLORE AND ANALYZE': [
      { id: 'analytics-hub', name: 'Analytics Hub', icon: '📊', href: '/access-methods/analytics-hub/index' }
    ],
    'PROGRAMMATIC ACCESS': [
      { id: 'api-reference', name: 'API Reference', icon: '🔌', href: '/access-methods/api-reference/index' },
      { id: 'client-sdks', name: 'Client SDKs', icon: '📦', href: '/access-methods/client-sdks/index' },
      { id: 'real-time-apis', name: 'Real-Time APIs', icon: '⚡', href: '/access-methods/real-time-apis/index' },
      { id: 'webhooks', name: 'Webhooks', icon: '🔔', href: '/access-methods/webhooks/index' }
    ],
    'DATA DELIVERY': [
      { id: 'datashare', name: 'Datashare', icon: '❄️', href: '/access-methods/datashare/index' }
    ],
    'INTEGRATIONS': [
      { id: 'trino-connector', name: 'Trino Connector', icon: '🔗', href: '/access-methods/trino-connector/index' },
      { id: 'dbt-connector', name: 'dbt Connector', icon: '🔧', href: '/access-methods/dbt-connector/index' }
    ],
    'FOR BLOCKCHAINS': [
      { id: 'catalyst', name: 'Catalyst', icon: '⛓️', href: '/access-methods/catalyst/index' }
    ]
  };

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
    return ACCESS_METHODS['EXPLORE AND ANALYZE'][0]; // Default to Analytics Hub
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
            <span class="access-dropdown-item-icon">${method.icon}</span>
            <span class="access-dropdown-item-name">${method.name}</span>
            ${method.id === current.id ? '<span class="access-dropdown-item-check">✓</span>' : ''}
          </a>
        `).join('')}
      </div>`;
    }

    return `
      <div class="access-dropdown-container" id="access-method-dropdown">
        <button class="access-dropdown-trigger" id="access-dropdown-trigger">
          <span class="access-dropdown-trigger-icon">${current.icon}</span>
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

  // Insert dropdown into the sidebar
  function insertDropdown() {
    // Only run on Access Methods pages
    if (!window.location.pathname.includes('access-methods')) {
      return;
    }

    // Find the sidebar content area
    const sidebar = document.querySelector('#sidebar-content') || 
                    document.querySelector('[id*="sidebar"]') ||
                    document.querySelector('.sidebar-content');
    
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

  // Initialize when DOM is ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertDropdown);
    } else {
      insertDropdown();
    }

    // Also try on navigation (for SPA behavior)
    const observer = new MutationObserver(() => {
      if (window.location.pathname.includes('access-methods') && !document.getElementById('access-method-dropdown')) {
        insertDropdown();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  init();
})();
