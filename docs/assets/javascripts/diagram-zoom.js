/**
 * HubNest Documentation - Interactive In-Page Popup Lightbox
 * Professional Implementation:
 * - Mounts an Eye Icon on both Images and Flowcharts (Mermaid)
 * - Opens a clean, responsive In-Page Popup Dialog (no redirects, no broken layouts)
 * - Smooth Drag-to-Pan, Mouse Wheel Zoom, Reset, and Close
 */

// 0. Ensure Shadow DOM mode is open even if Material attempts closed mode
(function () {
  if (typeof Element !== 'undefined' && Element.prototype && Element.prototype.attachShadow && !window.__hubnestShadowPatched) {
    window.__hubnestShadowPatched = true;
    const _origAttach = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (options) {
      const opts = Object.assign({}, options, { mode: 'open' });
      const shadow = _origAttach.call(this, opts);
      try {
        this._hubnestShadow = shadow;
      } catch (e) {}
      return shadow;
    };
  }
})();

(function () {
  'use strict';

  // Shared Eye Icon SVG
  const EYE_SVG = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  let popupOverlay = null;
  let popupCanvas = null;
  let popupTitle = null;
  let zoomBadge = null;

  // Zoom / Pan state
  let scale = 1;
  let fitScale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const MIN_SCALE = 0.2;
  const MAX_SCALE = 5.0;

  /**
   * Helper: Retrieve SVG from element, shadowRoot, or cached shadow
   */
  function getSvgFromDiagram(el) {
    if (!el) return null;
    // Direct child SVG
    let svg = el.querySelector('svg');
    if (svg) return svg;

    // Shadow DOM SVG
    if (el.shadowRoot) {
      svg = el.shadowRoot.querySelector('svg');
      if (svg) return svg;
    }

    if (el._hubnestShadow) {
      svg = el._hubnestShadow.querySelector('svg');
      if (svg) return svg;
    }

    // Nested child container with shadowRoot
    const childContainers = el.querySelectorAll('div.mermaid, pre.mermaid, .mermaid');
    for (let i = 0; i < childContainers.length; i++) {
      const child = childContainers[i];
      if (child.shadowRoot) {
        svg = child.shadowRoot.querySelector('svg');
        if (svg) return svg;
      }
      if (child._hubnestShadow) {
        svg = child._hubnestShadow.querySelector('svg');
        if (svg) return svg;
      }
      svg = child.querySelector('svg');
      if (svg) return svg;
    }

    return null;
  }

  /**
   * Helper: Extract styles that belong to the diagram
   */
  function getStylesFromDiagram(el) {
    const styles = [];
    if (!el) return styles;

    if (el.shadowRoot) {
      el.shadowRoot.querySelectorAll('style').forEach((s) => styles.push(s.cloneNode(true)));
    }
    if (el._hubnestShadow) {
      el._hubnestShadow.querySelectorAll('style').forEach((s) => styles.push(s.cloneNode(true)));
    }
    el.querySelectorAll('style').forEach((s) => styles.push(s.cloneNode(true)));
    return styles;
  }

  /**
   * 1. Initialize Popup Modal
   */
  function ensurePopupModal() {
    if (popupOverlay) return;

    popupOverlay = document.createElement('div');
    popupOverlay.className = 'hubnest-popup-overlay';
    popupOverlay.setAttribute('role', 'dialog');
    popupOverlay.setAttribute('aria-modal', 'true');

    popupOverlay.innerHTML = `
      <div class="hubnest-popup-window" id="hubnest-popup-window">
        <div class="hubnest-popup-header">
          <div class="hubnest-popup-title-area">
            <span class="hubnest-popup-icon">${EYE_SVG}</span>
            <span class="hubnest-popup-title" id="hubnest-popup-title-text">Preview</span>
          </div>
          <div class="hubnest-popup-controls">
            <span class="hubnest-zoom-badge">100%</span>
            <button type="button" class="hubnest-popup-btn" id="hubnest-btn-zoom-in" title="Zoom In (+)">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button type="button" class="hubnest-popup-btn" id="hubnest-btn-zoom-out" title="Zoom Out (-)">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button type="button" class="hubnest-popup-btn" id="hubnest-btn-reset" title="Reset (0)">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            </button>
            <button type="button" class="hubnest-popup-btn hubnest-popup-close-btn" id="hubnest-btn-close" title="Close (Esc)">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div class="hubnest-popup-body" id="hubnest-popup-viewport">
          <div class="hubnest-popup-canvas" id="hubnest-popup-canvas"></div>
        </div>

        <div class="hubnest-popup-footer">
          <span>🖱️ Mouse wheel to zoom &bull; Drag to pan &bull; Click anywhere outside or Esc to close</span>
        </div>
      </div>
    `;

    document.body.appendChild(popupOverlay);

    popupCanvas = document.getElementById('hubnest-popup-canvas');
    popupTitle = document.getElementById('hubnest-popup-title-text');
    zoomBadge = popupOverlay.querySelector('.hubnest-zoom-badge');
    const viewport = document.getElementById('hubnest-popup-viewport');

    document.getElementById('hubnest-btn-zoom-in').addEventListener('click', (e) => {
      e.stopPropagation();
      applyZoom(scale * 1.25);
    });

    document.getElementById('hubnest-btn-zoom-out').addEventListener('click', (e) => {
      e.stopPropagation();
      applyZoom(scale / 1.25);
    });

    document.getElementById('hubnest-btn-reset').addEventListener('click', (e) => {
      e.stopPropagation();
      resetTransform();
    });

    document.getElementById('hubnest-btn-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
    });

    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!popupOverlay.classList.contains('active')) return;
      if (e.key === 'Escape') closePopup();
      if (e.key === '+' || e.key === '=') applyZoom(scale * 1.2);
      if (e.key === '-' || e.key === '_') applyZoom(scale / 1.2);
      if (e.key === '0') resetTransform();
    });

    // Pan
    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      viewport.classList.add('dragging');
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (viewport) viewport.classList.remove('dragging');
      }
    });

    // Wheel Zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      applyZoom(scale * zoomFactor);
    }, { passive: false });
  }

  function updateTransform() {
    if (!popupCanvas) return;
    popupCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    if (zoomBadge) {
      zoomBadge.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  function applyZoom(newScale) {
    scale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    updateTransform();
  }

  function resetTransform() {
    scale = fitScale;
    panX = 0;
    panY = 0;
    updateTransform();
  }

  function closePopup() {
    if (!popupOverlay) return;
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (popupCanvas) popupCanvas.innerHTML = '';
    }, 200);
  }

  /**
   * 2. Open Diagram in Popup
   */
  function openDiagramPopup(svgElement, styles) {
    ensurePopupModal();
    popupCanvas.innerHTML = '';
    if (popupTitle) popupTitle.textContent = 'Flow Diagram & Architecture';

    if (!svgElement) return;

    let vbWidth = 900;
    let vbHeight = 500;
    const viewBoxAttr = svgElement.getAttribute('viewBox');
    if (viewBoxAttr) {
      const parts = viewBoxAttr.trim().split(/[\s,]+/).filter(Boolean);
      if (parts.length === 4) {
        vbWidth = Math.max(parseFloat(parts[2]), 100);
        vbHeight = Math.max(parseFloat(parts[3]), 100);
      }
    } else {
      const bbox = svgElement.getBBox ? svgElement.getBBox() : svgElement.getBoundingClientRect();
      if (bbox.width > 0) vbWidth = bbox.width;
      if (bbox.height > 0) vbHeight = bbox.height;
    }

    const clone = svgElement.cloneNode(true);
    clone.setAttribute('width', `${vbWidth}`);
    clone.setAttribute('height', `${vbHeight}`);
    clone.style.width = `${vbWidth}px`;
    clone.style.height = `${vbHeight}px`;
    clone.style.maxWidth = 'none';
    clone.style.maxHeight = 'none';
    clone.style.display = 'block';

    const card = document.createElement('div');
    card.className = 'hubnest-popup-diagram-card';

    // Inject styles
    if (styles && styles.length) {
      styles.forEach((st) => card.appendChild(st));
    }

    card.appendChild(clone);
    popupCanvas.appendChild(card);

    const boxWidth = Math.min(window.innerWidth * 0.90, 1100) - 60;
    const boxHeight = Math.min(window.innerHeight * 0.85, 800) - 130;
    const fitScaleX = boxWidth / vbWidth;
    const fitScaleY = boxHeight / vbHeight;
    fitScale = Math.min(fitScaleX, fitScaleY, 1.4);
    if (fitScale < 0.25) fitScale = 0.25;

    scale = fitScale;
    panX = 0;
    panY = 0;
    updateTransform();

    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 3. Open Image in Popup
   */
  function openImagePopup(imgEl) {
    ensurePopupModal();
    popupCanvas.innerHTML = '';
    if (popupTitle) {
      popupTitle.textContent = imgEl.alt ? imgEl.alt : 'Image & Screenshot Preview';
    }

    const naturalWidth = imgEl.naturalWidth || imgEl.clientWidth || 1200;
    const naturalHeight = imgEl.naturalHeight || imgEl.clientHeight || 700;

    const clone = document.createElement('img');
    clone.src = imgEl.src;
    clone.alt = imgEl.alt || 'Popup Preview';
    clone.style.width = `${naturalWidth}px`;
    clone.style.height = `${naturalHeight}px`;
    clone.style.maxWidth = 'none';
    clone.style.maxHeight = 'none';
    clone.style.display = 'block';
    clone.style.borderRadius = '8px';

    const card = document.createElement('div');
    card.className = 'hubnest-popup-image-card';
    card.appendChild(clone);
    popupCanvas.appendChild(card);

    const boxWidth = Math.min(window.innerWidth * 0.90, 1150) - 60;
    const boxHeight = Math.min(window.innerHeight * 0.85, 800) - 130;
    const fitScaleX = boxWidth / naturalWidth;
    const fitScaleY = boxHeight / naturalHeight;
    fitScale = Math.min(fitScaleX, fitScaleY, 1.0);
    if (fitScale < 0.2) fitScale = 0.2;

    scale = fitScale;
    panX = 0;
    panY = 0;
    updateTransform();

    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 4. Wrap a Diagram Block in an explicit relative wrapper with Eye Button
   */
  function wrapDiagramWithEye(el) {
    if (!el) return;

    // Retrieve SVG
    const svg = getSvgFromDiagram(el);
    if (!svg) {
      return; // Not ready yet
    }

    if (el.dataset.eyeWrapped === 'true' && el.parentElement?.classList.contains('diagram-zoom-wrapper')) {
      return;
    }

    el.dataset.eyeWrapped = 'true';

    // Check if el already has a .diagram-zoom-wrapper parent
    let wrapper = el.parentElement;
    if (!wrapper || !wrapper.classList.contains('diagram-zoom-wrapper')) {
      wrapper = document.createElement('div');
      wrapper.className = 'diagram-zoom-wrapper';
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }

    if (wrapper.querySelector('.diagram-eye-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'diagram-eye-btn';
    btn.title = 'View enlarged flow diagram in popup';
    btn.setAttribute('aria-label', 'View enlarged diagram');
    btn.innerHTML = EYE_SVG;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentSvg = getSvgFromDiagram(el) || svg;
      const styles = getStylesFromDiagram(el);
      openDiagramPopup(currentSvg, styles);
    });

    wrapper.appendChild(btn);
  }

  /**
   * 5. Scan Diagrams (Mermaid)
   */
  function scanDiagrams() {
    ensurePopupModal();

    // Strategy 1: Find all pre.mermaid / .mermaid / [data-processed="true"]
    const containers = document.querySelectorAll('pre.mermaid, .mermaid, div.mermaid, .language-mermaid, [data-processed="true"]');
    containers.forEach((container) => {
      wrapDiagramWithEye(container);
    });

    // Strategy 2: Find all standalone Mermaid SVGs in normal DOM
    const svgs = document.querySelectorAll('svg[id^="mermaid-"], svg.mermaid');
    svgs.forEach((svg) => {
      const parent = svg.closest('.mermaid') || svg.closest('pre') || svg.closest('.diagram-zoom-wrapper') || svg.parentElement;
      if (parent) {
        wrapDiagramWithEye(parent);
      }
    });

    // Strategy 3: Find any custom element with shadowRoot containing an svg
    const allDivs = document.querySelectorAll('div, pre');
    allDivs.forEach((div) => {
      if (div.shadowRoot || div._hubnestShadow) {
        if (getSvgFromDiagram(div)) {
          wrapDiagramWithEye(div);
        }
      }
    });
  }

  /**
   * 6. Scan Content Images
   */
  function scanImages() {
    ensurePopupModal();

    const images = document.querySelectorAll('article.md-content__inner img, .md-content img, .md-typeset img');
    images.forEach((img) => {
      if (
        img.closest('.md-header') ||
        img.closest('.md-nav') ||
        img.closest('.md-tabs') ||
        img.closest('.md-footer') ||
        img.closest('.hubnest-popup-overlay') ||
        img.classList.contains('no-zoom') ||
        img.classList.contains('twemoji') ||
        img.classList.contains('emojione') ||
        (img.width > 0 && img.width < 45 && img.height > 0 && img.height < 45) ||
        img.dataset.eyeAttached
      ) {
        return;
      }

      img.dataset.eyeAttached = 'true';

      let wrapper = img.closest('.image-zoom-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'image-zoom-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      }

      wrapper.style.position = 'relative';

      if (wrapper.querySelector('.image-eye-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'image-eye-btn';
      btn.title = 'Click to enlarge photo in popup';
      btn.setAttribute('aria-label', 'Click to enlarge image');
      btn.innerHTML = EYE_SVG;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openImagePopup(img);
      });

      wrapper.appendChild(btn);
    });
  }

  function scanAll() {
    scanDiagrams();
    scanImages();
  }

  let scanRafId = null;
  function debouncedScanAll() {
    if (scanRafId) return;
    scanRafId = requestAnimationFrame(() => {
      scanRafId = null;
      scanAll();
    });
  }

  function init() {
    ensurePopupModal();
    scanAll();

    // Polling check to catch async Mermaid SVG replacement
    const interval = setInterval(debouncedScanAll, 300);
    setTimeout(() => clearInterval(interval), 4000);

    if (document.body) {
      const observer = new MutationObserver((mutations) => {
        // Ignore mutations triggered by our own popup overlay
        const isSelfMutation = mutations.every((m) => {
          return m.target && (m.target.closest?.('.hubnest-popup-overlay') || m.target.classList?.contains('hubnest-popup-overlay'));
        });
        if (!isSelfMutation) {
          debouncedScanAll();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // MkDocs instant navigation support
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      scanAll();
      const intv = setInterval(scanAll, 200);
      setTimeout(() => clearInterval(intv), 4000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', () => {
    scanAll();
    setTimeout(scanAll, 300);
    setTimeout(scanAll, 1000);
    setTimeout(scanAll, 2500);
  });
})();
