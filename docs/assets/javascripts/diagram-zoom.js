/**
 * HubNest Documentation - Interactive Diagram Pan & Zoom Lightbox
 * Adds an interactive floating "Zoom & Pan" button to all architecture diagrams and flowcharts.
 * Clicking opens a full-screen modal allowing users to drag & pan, zoom with mouse wheel,
 * pinch to zoom, and reset or close.
 */

(function () {
  'use strict';

  let modalOverlay = null;
  let modalCanvas = null;
  let zoomBadge = null;

  // Transform state
  let scale = 1;
  let fitScale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Touch pinch state
  let initialPinchDistance = null;
  let initialScale = 1;

  const MIN_SCALE = 0.15;
  const MAX_SCALE = 6.0;

  /**
   * Ensure modal overlay exists in document.body
   */
  function ensureModal() {
    if (modalOverlay) return;

    modalOverlay = document.createElement('div');
    modalOverlay.className = 'diagram-modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-label', 'Diagram Zoom and Pan Viewer');

    modalOverlay.innerHTML = `
      <div class="diagram-modal-header">
        <div class="diagram-modal-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>Interactive Diagram Viewer</span>
          <span class="diagram-modal-hint">• 🖱️ Drag to pan | Scroll to zoom | Double-click to reset</span>
        </div>
        <div class="diagram-modal-controls">
          <span class="diagram-zoom-level-badge" style="font-size: 11px; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.1); color: #10b981; font-weight: 700; min-width: 45px; text-align: center;">100%</span>
          <button type="button" class="diagram-ctrl-btn" id="diagram-btn-zoom-in" title="Zoom In (+)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>In</span>
          </button>
          <button type="button" class="diagram-ctrl-btn" id="diagram-btn-zoom-out" title="Zoom Out (-)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Out</span>
          </button>
          <button type="button" class="diagram-ctrl-btn" id="diagram-btn-reset" title="Reset View (Double Click)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            <span>Reset</span>
          </button>
          <button type="button" class="diagram-ctrl-btn close-btn" id="diagram-btn-close" title="Close (Esc)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Close</span>
          </button>
        </div>
      </div>
      <div class="diagram-modal-viewport" id="diagram-viewport">
        <div class="diagram-modal-canvas" id="diagram-canvas"></div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    modalCanvas = document.getElementById('diagram-canvas');
    zoomBadge = modalOverlay.querySelector('.diagram-zoom-level-badge');
    const viewport = document.getElementById('diagram-viewport');

    // Button actions
    document.getElementById('diagram-btn-zoom-in').addEventListener('click', (e) => {
      e.stopPropagation();
      applyZoom(scale * 1.25);
    });

    document.getElementById('diagram-btn-zoom-out').addEventListener('click', (e) => {
      e.stopPropagation();
      applyZoom(scale / 1.25);
    });

    document.getElementById('diagram-btn-reset').addEventListener('click', (e) => {
      e.stopPropagation();
      resetTransform();
    });

    document.getElementById('diagram-btn-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    // Close when clicking empty viewport backdrop
    viewport.addEventListener('click', (e) => {
      if (e.target === viewport) {
        if (!isDragging) {
          closeModal();
        }
      }
    });

    // Mouse drag / pan
    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Left click only
      isDragging = true;
      viewport.classList.add('dragging');
      startX = e.clientX - panX;
      startY = e.clientY - panY;
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

    // Double click to reset
    viewport.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      resetTransform();
    });

    // Mouse wheel zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      applyZoom(scale * zoomFactor);
    }, { passive: false });

    // Touch support (drag & pinch zoom)
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - panX;
        startY = e.touches[0].clientY - panY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialPinchDistance = getTouchDistance(e.touches);
        initialScale = scale;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        updateTransform();
      } else if (e.touches.length === 2 && initialPinchDistance) {
        const currentDistance = getTouchDistance(e.touches);
        const factor = currentDistance / initialPinchDistance;
        applyZoom(initialScale * factor);
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        isDragging = false;
        initialPinchDistance = null;
      }
    });

    // Keyboard ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function updateTransform() {
    if (!modalCanvas) return;
    modalCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
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

  function openModal(mermaidContainer) {
    ensureModal();

    modalCanvas.innerHTML = '';

    const svgEl = mermaidContainer.querySelector('svg');
    if (!svgEl) return;

    // Detect natural viewBox dimensions
    let vbWidth = 900;
    let vbHeight = 500;
    const viewBoxAttr = svgEl.getAttribute('viewBox');
    if (viewBoxAttr) {
      const parts = viewBoxAttr.trim().split(/[\s,]+/).filter(Boolean);
      if (parts.length === 4) {
        vbWidth = Math.max(parseFloat(parts[2]), 100);
        vbHeight = Math.max(parseFloat(parts[3]), 100);
      }
    } else {
      const bbox = svgEl.getBBox ? svgEl.getBBox() : svgEl.getBoundingClientRect();
      if (bbox.width > 0) vbWidth = bbox.width;
      if (bbox.height > 0) vbHeight = bbox.height;
    }

    // Deep clone the SVG
    const clone = svgEl.cloneNode(true);
    clone.setAttribute('width', `${vbWidth}`);
    clone.setAttribute('height', `${vbHeight}`);
    clone.style.width = `${vbWidth}px`;
    clone.style.height = `${vbHeight}px`;
    clone.style.maxWidth = 'none';
    clone.style.maxHeight = 'none';
    clone.style.display = 'block';

    // Wrap in a presentation card
    const card = document.createElement('div');
    card.className = 'diagram-canvas-card';
    card.appendChild(clone);
    modalCanvas.appendChild(card);

    // Calculate smart initial fit scale based on viewport
    const availWidth = window.innerWidth * 0.88;
    const availHeight = (window.innerHeight - 70) * 0.82;
    const fitScaleX = availWidth / (vbWidth + 60);
    const fitScaleY = availHeight / (vbHeight + 60);
    fitScale = Math.min(fitScaleX, fitScaleY, 1.25);
    if (fitScale < 0.25) fitScale = 0.25;

    scale = fitScale;
    panX = 0;
    panY = 0;
    updateTransform();

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modalCanvas) modalCanvas.innerHTML = '';
    }, 200);
  }

  /**
   * Scan for rendered Mermaid SVGs and attach the floating Zoom & Pan button
   */
  function scanAndAttach() {
    ensureModal();

    const svgs = document.querySelectorAll('.mermaid svg, pre.mermaid svg, div.mermaid svg');
    svgs.forEach((svg) => {
      const container = svg.closest('.mermaid') || svg.parentElement;
      if (!container) return;

      let wrapper = container.closest('.diagram-zoom-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'diagram-zoom-wrapper';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
      }

      if (wrapper.querySelector('.diagram-zoom-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'diagram-zoom-btn';
      btn.title = 'Click to open diagram with zoom, pan, and drag controls';
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <span>Zoom & Pan</span>
      `;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(container);
      });

      wrapper.style.position = 'relative';
      wrapper.appendChild(btn);
    });
  }

  function init() {
    ensureModal();
    scanAndAttach();

    // Observe body for dynamically rendered Mermaid SVGs
    if (document.body) {
      const observer = new MutationObserver(() => {
        scanAndAttach();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Support for MkDocs Material instant navigation
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      scanAndAttach();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', scanAndAttach);
})();
