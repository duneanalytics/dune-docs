/**
 * Custom Access Method Dropdown - Coinbase Style
 * This script creates a dropdown selector at the top of the Access Methods sidebar
 * with category headers like Coinbase's documentation.
 * 
 * When a product is selected, ONLY that product's sidebar content is shown.
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

  // Map of sidebar group names to their IDs
  const SIDEBAR_GROUPS = {
    'analytics-hub': ['Analytics Hub', 'Query Editor', 'Visualizations', 'Dashboards', 'Decoding'],
    'api-reference': ['API Reference', 'Executions', 'Query Management', 'Data Uploads', 'Materialized Views', 'Post-processing', 'Resources'],
    'client-sdks': ['Client SDKs'],
    'real-time-apis': ['Real-Time APIs'],
    'webhooks': ['Webhooks'],
    'datashare': ['Datashare', 'Snowflake', 'BigQuery'],
    'trino-connector': ['Trino Connector'],
    'dbt-connector': ['dbt Connector'],
    'catalyst': ['Catalyst', 'Integration Routes']
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
    return ACCESS_METHODS['EXPLORE AND ANALYZE'][0]; // Default to Analytics Hub
  }

  // Get icon for a method
  function getIcon(methodId) {
    return ICONS[methodId] || ICONS['api-reference'];
  }

  // Hide sidebar groups that don't belong to the current method
  function filterSidebarGroups() {
    const currentMethod = getCurrentMethod();
    const allowedGroups = SIDEBAR_GROUPS[currentMethod.id] || [];
    
    console.log('[Access Dropdown] Filtering sidebar for:', currentMethod.name);
    console.log('[Access Dropdown] Allowed groups:', allowedGroups);

    // Find all sidebar groups/sections
    const sidebarGroups = document.querySelectorAll('[class*="sidebar-group"], [class*="SidebarGroup"], [id*="sidebar-group"], .sidebar-nav-group, nav ul > li, aside nav > div > div');
    
    sidebarGroups.forEach(group => {
      // Get the group header/title text
      const header = group.querySelector('button, h3, h4, span, [class*="header"], [class*="title"]');
      const headerText = header ? header.textContent.trim() : '';
      
      // Check if this group should be visible
      const shouldShow = allowedGroups.some(allowed => 
        headerText.toLowerCase().includes(allowed.toLowerCase()) ||
        allowed.toLowerCase().includes(headerText.toLowerCase())
      );
      
      // Also check if the group contains links to the current method's pages
      const links = group.querySelectorAll('a');
      const hasRelevantLinks = Array.from(links).some(link => 
        link.href && link.href.includes(currentMethod.id)
      );
      
      if (shouldShow || hasRelevantLinks) {
        group.style.display = '';
        group.classList.remove('access-dropdown-hidden');
      } else if (headerText && !headerText.includes('Access Methods')) {
        // Hide groups that don't match, but don't hide the main "Access Methods" link
        group.style.display = 'none';
        group.classList.add('access-dropdown-hidden');
      }
    });

    // Alternative approach: hide by matching href patterns
    const allNavItems = document.querySelectorAll('nav a, aside a');
    allNavItems.forEach(link => {
      const href = link.getAttribute('href') || '';
      const parentLi = link.closest('li');
      const parentDiv = link.closest('div[class*="group"]');
      
      // Skip the dropdown itself
      if (link.closest('#access-method-dropdown')) return;
      
      // Skip if it's the Access Methods index
      if (href === '/access-methods/index' || href === '/access-methods') return;
      
      // Check if this link belongs to a different access method
      const belongsToDifferentMethod = Object.keys(SIDEBAR_GROUPS).some(methodId => {
        if (methodId === currentMethod.id) return false;
        return href.includes(`/access-methods/${methodId}`);
      });
      
      if (belongsToDifferentMethod) {
        const container = parentLi || parentDiv;
        if (container && !container.closest('#access-method-dropdown')) {
          container.style.display = 'none';
          container.classList.add('access-dropdown-hidden');
        }
      }
    });
    
    // Hide group headers that have no visible children
    setTimeout(() => {
      document.querySelectorAll('[class*="sidebar-group"], [class*="SidebarGroup"]').forEach(group => {
        const visibleChildren = group.querySelectorAll('a:not([style*="display: none"]), li:not([style*="display: none"]):not(.access-dropdown-hidden)');
        if (visibleChildren.length === 0) {
          group.style.display = 'none';
        }
      });
    }, 100);
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
    // Also restore hidden elements
    document.querySelectorAll('.access-dropdown-hidden').forEach(el => {
      el.style.display = '';
      el.classList.remove('access-dropdown-hidden');
    });
  }

  // Find the sidebar element using multiple selectors
  function findSidebar() {
    const selectors = [
      '#sidebar-content',
      '#SidebarContent',
      '[id*="sidebar-content"]',
      '[id*="SidebarContent"]',
      '.sidebar-content',
      '[class*="SidebarContent"]',
      '#sidebar > div',
      '#Sidebar > div',
      'nav[class*="sidebar"] > div',
      'aside > nav',
      'aside > div',
      '#navigation-items',
      '[id="navigation-items"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    }

    const aside = document.querySelector('aside');
    if (aside) {
      return aside.querySelector('nav') || aside.querySelector('div');
    }

    return null;
  }

  // Insert dropdown into the sidebar
  function insertDropdown() {
    if (!isAccessMethodsPage()) {
      removeDropdown();
      return;
    }

    if (document.getElementById('access-method-dropdown')) {
      // Dropdown exists, just filter the sidebar
      filterSidebarGroups();
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
    
    // Filter sidebar after inserting dropdown
    setTimeout(filterSidebarGroups, 100);
  }

  // Setup dropdown event listeners
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

  // Handle navigation changes
  function handleNavigation() {
    if (isAccessMethodsPage()) {
      insertDropdown();
      filterSidebarGroups();
    } else {
      removeDropdown();
    }
  }

  // Initialize
  function init() {
    insertDropdown();
    setTimeout(insertDropdown, 1000);
    setTimeout(insertDropdown, 2000);

    let lastPath = window.location.pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        handleNavigation();
      }
      if (isAccessMethodsPage()) {
        if (!document.getElementById('access-method-dropdown')) {
          insertDropdown();
        }
        // Re-apply filtering in case DOM changed
        filterSidebarGroups();
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
