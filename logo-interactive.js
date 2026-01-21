/**
 * Dune/Sim Interactive Toggle Logo
 * 
 * This script adds interactivity to the Mintlify-embedded toggle SVG.
 * It finds the logo that Mintlify renders and attaches hover/click handlers.
 * 
 * Behavior:
 * - Default: Dune highlighted (on slider), Sim grayed out
 * - Hover Dune: Slider inverts colors
 * - Hover Sim: Background fills, slider moves right, Sim highlighted
 * - Click Dune: Opens docs.sim.dune.com in new tab
 * - Click Sim: Opens sim.dune.com in new tab
 */
(function() {
  'use strict';

  // Logo dimensions
  const LOGO_WIDTH = 220;
  const LOGO_HEIGHT = 48;
  
  // Slider width for translation calculation
  const SLIDER_WIDTH = 110;

  // Track if we've already initialized to prevent duplicates
  let initialized = false;

  /**
   * Detect if we're in dark mode
   */
  function isDarkMode() {
    // Check Mintlify's theme
    const html = document.documentElement;
    if (html.classList.contains('dark')) return true;
    if (html.getAttribute('data-theme') === 'dark') return true;
    
    // Check body classes
    if (document.body?.classList.contains('dark')) return true;
    
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Get theme-appropriate colors
   */
  function getColors() {
    const dark = isDarkMode();
    return {
      // Default state colors
      defaultBorderStroke: dark ? '#3a3a3a' : '#ccc',
      defaultSliderFill: dark ? '#000' : '#fff',
      defaultDuneFill: dark ? '#fff' : '#000',
      defaultSimFill: dark ? '#666' : '#999',
      
      // Hover Dune state
      hoverDuneBorderStroke: dark ? '#fff' : '#000',
      hoverDuneSliderFill: dark ? '#fff' : '#000',
      hoverDuneDuneFill: dark ? '#000' : '#fff',
      
      // Hover Sim state  
      hoverSimBgFill: dark ? '#fff' : '#000',
      hoverSimBorderStroke: dark ? '#fff' : '#000',
      hoverSimDuneFill: dark ? '#000' : '#fff',
      hoverSimSimFill: dark ? '#fff' : '#000',
    };
  }

  /**
   * Attach interactivity to the toggle SVG elements
   */
  function attachInteractivity(svg) {
    // Mark as initialized
    if (svg.dataset.interactiveInitialized) return;
    svg.dataset.interactiveInitialized = 'true';

    const toggleBg = svg.querySelector('#toggleBg, .toggle-bg, [class*="toggle-bg"]');
    const slider = svg.querySelector('#slider, .slider, [class*="slider"]');
    const logoLeft = svg.querySelector('#logoLeft');
    const logoRight = svg.querySelector('#logoRight');
    const textLeft = svg.querySelector('#textLeft');
    const textRight = svg.querySelector('#textRight');
    let clickRight = svg.querySelector('#clickRight');
    let clickLeft = svg.querySelector('#clickLeft');

    if (!toggleBg || !slider) {
      console.warn('Dune Toggle: Could not find required SVG elements (toggleBg, slider)');
      return;
    }

    // If click targets don't exist, create them
    if (!clickLeft || !clickRight) {
      // Create invisible click targets
      const ns = 'http://www.w3.org/2000/svg';
      
      clickLeft = document.createElementNS(ns, 'rect');
      clickLeft.setAttribute('id', 'clickLeft');
      clickLeft.setAttribute('x', '0');
      clickLeft.setAttribute('y', '0');
      clickLeft.setAttribute('width', '140');
      clickLeft.setAttribute('height', '56');
      clickLeft.setAttribute('fill', 'transparent');
      clickLeft.style.cursor = 'pointer';
      svg.appendChild(clickLeft);

      clickRight = document.createElementNS(ns, 'rect');
      clickRight.setAttribute('id', 'clickRight');
      clickRight.setAttribute('x', '140');
      clickRight.setAttribute('y', '0');
      clickRight.setAttribute('width', '140');
      clickRight.setAttribute('height', '56');
      clickRight.setAttribute('fill', 'transparent');
      clickRight.style.cursor = 'pointer';
      svg.appendChild(clickRight);
    }

    // Ensure click targets have pointer cursor
    clickLeft.style.cursor = 'pointer';
    clickRight.style.cursor = 'pointer';

    // Hover over Dune (left side)
    clickLeft.addEventListener('mouseenter', function() {
      const colors = getColors();
      
      // Border changes
      toggleBg.style.stroke = colors.hoverDuneBorderStroke;
      
      // Slider inverts
      slider.style.fill = colors.hoverDuneSliderFill;
      
      // Dune turns opposite color (on inverted slider)
      if (logoLeft) {
        logoLeft.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.hoverDuneDuneFill));
      }
      if (textLeft) {
        textLeft.setAttribute('fill', colors.hoverDuneDuneFill);
      }
    });

    // Mouse leaves Dune area - reset to default
    clickLeft.addEventListener('mouseleave', function() {
      const colors = getColors();
      
      // Border back to default
      toggleBg.style.stroke = colors.defaultBorderStroke;
      toggleBg.style.fill = 'transparent';
      
      // Slider back to default
      slider.style.fill = colors.defaultSliderFill;
      
      // Dune back to default
      if (logoLeft) {
        logoLeft.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.defaultDuneFill));
      }
      if (textLeft) {
        textLeft.setAttribute('fill', colors.defaultDuneFill);
      }
    });

    // Hover over Sim (right side)
    clickRight.addEventListener('mouseenter', function() {
      const colors = getColors();
      
      // Background fills, border changes
      toggleBg.style.fill = colors.hoverSimBgFill;
      toggleBg.style.stroke = colors.hoverSimBorderStroke;
      
      // Slider moves right (total width - slider width - small offset)
      slider.style.transform = 'translateX(' + (SLIDER_WIDTH - 2) + 'px)';
      
      // Dune turns opposite (now on filled background)
      if (logoLeft) {
        logoLeft.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.hoverSimDuneFill));
      }
      if (textLeft) {
        textLeft.setAttribute('fill', colors.hoverSimDuneFill);
      }
      
      // Sim becomes visible and highlighted (on slider)
      if (logoRight) {
        logoRight.style.opacity = '1';
        logoRight.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.hoverSimSimFill));
      }
      if (textRight) {
        textRight.setAttribute('fill', colors.hoverSimSimFill);
      }
    });

    // Mouse leaves Sim area - reset to default
    clickRight.addEventListener('mouseleave', function() {
      const colors = getColors();
      
      // Background back to transparent
      toggleBg.style.fill = 'transparent';
      toggleBg.style.stroke = colors.defaultBorderStroke;
      
      // Slider moves back left
      slider.style.transform = 'translateX(0)';
      
      // Dune back to default
      if (logoLeft) {
        logoLeft.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.defaultDuneFill));
      }
      if (textLeft) {
        textLeft.setAttribute('fill', colors.defaultDuneFill);
      }
      
      // Sim back to hidden/gray
      if (logoRight) {
        logoRight.style.opacity = '0';
      }
      if (textRight) {
        textRight.setAttribute('fill', colors.defaultSimFill);
      }
    });

    // Click on Dune opens docs.sim.dune.com in new tab
    clickLeft.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.open('https://docs.sim.dune.com/', '_blank');
    });

    // Click on Sim opens sim.dune.com in new tab
    clickRight.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.open('https://sim.dune.com/', '_blank');
    });

    // Prevent parent link navigation
    const parentLink = svg.closest('a');
    if (parentLink) {
      parentLink.addEventListener('click', function(e) {
        e.preventDefault();
      });
    }

    console.log('Dune Toggle: Interactivity attached successfully');
  }

  /**
   * Find all toggle SVGs and show only the appropriate one for current theme
   */
  function handleDuplicateLogos() {
    const dark = isDarkMode();
    
    // Find light and dark logos by their unique IDs
    const lightLogos = document.querySelectorAll('svg#dune-toggle-light, svg.dune-toggle-light');
    const darkLogos = document.querySelectorAll('svg#dune-toggle-dark, svg.dune-toggle-dark');
    
    // Hide/show based on theme
    lightLogos.forEach(svg => {
      const parent = svg.closest('a') || svg.parentElement;
      if (dark) {
        // Dark mode: hide light logos
        svg.style.display = 'none';
        if (parent && parent.tagName === 'A') parent.style.display = 'none';
      } else {
        // Light mode: show light logos
        svg.style.display = '';
        if (parent && parent.tagName === 'A') parent.style.display = '';
      }
    });
    
    darkLogos.forEach(svg => {
      const parent = svg.closest('a') || svg.parentElement;
      if (dark) {
        // Dark mode: show dark logos
        svg.style.display = '';
        if (parent && parent.tagName === 'A') parent.style.display = '';
      } else {
        // Light mode: hide dark logos
        svg.style.display = 'none';
        if (parent && parent.tagName === 'A') parent.style.display = 'none';
      }
    });
    
    if (lightLogos.length > 0 || darkLogos.length > 0) {
      console.log(`Dune Toggle: Theme=${dark ? 'dark' : 'light'}, showing ${dark ? 'dark' : 'light'} logos`);
    }
  }

  /**
   * Set the correct size on the SVG
   */
  function setSvgSize(svg) {
    svg.setAttribute('width', LOGO_WIDTH);
    svg.setAttribute('height', LOGO_HEIGHT);
    svg.style.width = LOGO_WIDTH + 'px';
    svg.style.height = LOGO_HEIGHT + 'px';
    svg.style.minWidth = LOGO_WIDTH + 'px';
    svg.style.minHeight = LOGO_HEIGHT + 'px';
  }

  /**
   * Find the Mintlify logo and attach interactivity
   */
  function initializeToggle() {
    // Look for SVG with our toggle elements (Mintlify inlines SVGs)
    // First try the specific IDs, then fall back to structure-based detection
    const toggleSvgs = document.querySelectorAll(
      'svg#dune-toggle-light, svg#dune-toggle-dark, ' +
      'svg.dune-toggle-light, svg.dune-toggle-dark, ' +
      'svg:has(#toggleBg)'
    );
    
    // Always handle duplicates first
    handleDuplicateLogos();

    // Attach interactivity to all found toggle SVGs (both light and dark)
    toggleSvgs.forEach(svg => {
      if (!svg.dataset.interactiveInitialized) {
        setSvgSize(svg);
        attachInteractivity(svg);
      }
    });

    if (toggleSvgs.length > 0) {
      initialized = true;
      return;
    }

    // If we didn't find it, Mintlify might be using an img tag
    // In that case, we need to fetch and inline the SVG
    const logoImgs = document.querySelectorAll('header img[src*="toggle"], nav img[src*="toggle"], a[href] img[src*="dune"]');
    
    for (const img of logoImgs) {
      const src = img.getAttribute('src');
      if (src && src.includes('toggle')) {
        // Fetch the SVG and inline it
        fetch(src)
          .then(response => response.text())
          .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svg = svgDoc.querySelector('svg');
            
            if (svg) {
              setSvgSize(svg);
              
              // Replace img with inline SVG
              img.replaceWith(svg);
              
              // Attach interactivity
              attachInteractivity(svg);
              initialized = true;
            }
          })
          .catch(err => console.warn('Dune Toggle: Failed to fetch SVG', err));
        return;
      }
    }
  }

  /**
   * Initialize when DOM is ready and watch for changes
   */
  function init() {
    // Function to run initialization
    const runInit = () => {
      initializeToggle();
      // Run again after a short delay to catch any late-rendered elements
      setTimeout(() => {
        handleDuplicateLogos();
        initializeToggle();
      }, 300);
    };

    // Try to initialize immediately if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runInit, 100);
      });
    } else {
      setTimeout(runInit, 100);
    }

    // Watch for dynamic changes (Mintlify uses client-side routing)
    let debounceTimer;
    const observer = new MutationObserver(function() {
      // Debounce to avoid excessive calls
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        // Handle any duplicate logos
        handleDuplicateLogos();
        
        // Check if any toggles need interactivity attached
        const svgs = document.querySelectorAll(
          'svg#dune-toggle-light, svg#dune-toggle-dark, ' +
          'svg.dune-toggle-light, svg.dune-toggle-dark, ' +
          'svg:has(#toggleBg)'
        );
        svgs.forEach(svg => {
          if (!svg.dataset.interactiveInitialized) {
            setSvgSize(svg);
            attachInteractivity(svg);
          }
        });
      }, 50);
    });

    // Start observing once body exists
    const startObserving = () => {
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };

    if (document.body) {
      startObserving();
    } else {
      document.addEventListener('DOMContentLoaded', startObserving);
    }

    // Listen for theme changes
    const handleThemeChange = () => {
      // Handle duplicate logos (show/hide based on new theme)
      handleDuplicateLogos();
      
      // Reset colors on all visible toggle SVGs
      const svgs = document.querySelectorAll(
        'svg#dune-toggle-light, svg#dune-toggle-dark, ' +
        'svg.dune-toggle-light, svg.dune-toggle-dark, ' +
        'svg:has(#toggleBg)'
      );
      svgs.forEach(svg => {
        // Skip hidden SVGs
        if (svg.style.display === 'none') return;
        const parent = svg.closest('a');
        if (parent && parent.style.display === 'none') return;
        
        const colors = getColors();
        const toggleBg = svg.querySelector('#toggleBg');
        const slider = svg.querySelector('#slider');
        const logoLeft = svg.querySelector('#logoLeft');
        const textLeft = svg.querySelector('#textLeft');
        const textRight = svg.querySelector('#textRight');
        
        if (toggleBg) {
          toggleBg.style.stroke = colors.defaultBorderStroke;
          toggleBg.style.fill = 'transparent';
        }
        if (slider) {
          slider.style.fill = colors.defaultSliderFill;
          slider.style.transform = 'translateX(0)';
        }
        if (logoLeft) {
          logoLeft.querySelectorAll('.logo-path, path').forEach(p => p.setAttribute('fill', colors.defaultDuneFill));
        }
        if (textLeft) textLeft.setAttribute('fill', colors.defaultDuneFill);
        if (textRight) textRight.setAttribute('fill', colors.defaultSimFill);
      });
    };

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
    
    // Also watch for Mintlify's theme toggle (class changes on html/body)
    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          handleThemeChange();
          break;
        }
      }
    });
    
    // Observe html and body for class changes
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    if (document.body) {
      themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    }
  }

  init();
})();
