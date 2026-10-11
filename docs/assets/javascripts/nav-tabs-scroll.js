/**
 * HubNest Documentation - Navigation Tabs Left-to-Right Scrolling
 * Features:
 * 1. Mouse wheel horizontal scrolling
 * 2. Drag-to-scroll with mouse
 * 3. Left and Right clickable chevron buttons
 * 4. Auto-scroll active tab into view on page load
 */

(function () {
  'use strict';

  function initNavTabsScroll() {
    const tabsNav = document.querySelector('.md-tabs');
    const tabsList = document.querySelector('.md-tabs__list');
    if (!tabsNav || !tabsList) return;

    // Avoid duplicate initialization
    if (tabsNav.getAttribute('data-scroll-initialized') === 'true') return;
    tabsNav.setAttribute('data-scroll-initialized', 'true');

    // Create Left & Right scroll buttons
    const leftBtn = document.createElement('button');
    leftBtn.type = 'button';
    leftBtn.className = 'md-tabs-scroll-btn md-tabs-scroll-btn--left is-hidden';
    leftBtn.setAttribute('aria-label', 'Scroll tabs left');
    leftBtn.title = 'Scroll left';
    leftBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    `;

    const rightBtn = document.createElement('button');
    rightBtn.type = 'button';
    rightBtn.className = 'md-tabs-scroll-btn md-tabs-scroll-btn--right';
    rightBtn.setAttribute('aria-label', 'Scroll tabs right');
    rightBtn.title = 'Scroll right';
    rightBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    `;

    tabsNav.appendChild(leftBtn);
    tabsNav.appendChild(rightBtn);

    // Update button visibility based on scroll position
    function updateButtons() {
      const scrollLeft = tabsList.scrollLeft;
      const maxScroll = tabsList.scrollWidth - tabsList.clientWidth;

      if (maxScroll <= 5) {
        leftBtn.classList.add('is-hidden');
        rightBtn.classList.add('is-hidden');
        return;
      }

      if (scrollLeft <= 10) {
        leftBtn.classList.add('is-hidden');
      } else {
        leftBtn.classList.remove('is-hidden');
      }

      if (scrollLeft >= maxScroll - 10) {
        rightBtn.classList.add('is-hidden');
      } else {
        rightBtn.classList.remove('is-hidden');
      }
    }

    // Button click handlers
    leftBtn.addEventListener('click', function (e) {
      e.preventDefault();
      tabsList.scrollBy({ left: -260, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', function (e) {
      e.preventDefault();
      tabsList.scrollBy({ left: 260, behavior: 'smooth' });
    });

    // 1. Mouse wheel horizontal scrolling
    tabsNav.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        tabsList.scrollLeft += e.deltaY * 1.2;
        updateButtons();
      }
    }, { passive: false });

    // 2. Drag-to-scroll
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    tabsList.addEventListener('mousedown', function (e) {
      // Don't trigger drag on clicking tab links
      isDown = true;
      startX = e.pageX - tabsList.offsetLeft;
      scrollStart = tabsList.scrollLeft;
    });

    window.addEventListener('mouseup', function () {
      isDown = false;
    });

    tabsList.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tabsList.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed
      tabsList.scrollLeft = scrollStart - walk;
      updateButtons();
    });

    // Listen to scroll events
    tabsList.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Initial check
    setTimeout(updateButtons, 150);

    // 3. Auto-scroll active tab into view
    const activeTab = tabsList.querySelector('.md-tabs__item--active');
    if (activeTab) {
      setTimeout(function () {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setTimeout(updateButtons, 300);
      }, 200);
    }
  }

  // Initialize on DOMContentLoaded and on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavTabsScroll);
  } else {
    initNavTabsScroll();
  }

  // Support for Material for MkDocs page navigation
  window.addEventListener('pageshow', initNavTabsScroll);
})();
