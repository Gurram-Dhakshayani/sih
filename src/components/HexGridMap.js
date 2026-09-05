/**
 * HexGridMap.js
 * Interactive Hex-Grid District Risk Heatmap with Thermal Burn Shader Effect,
 * Top-to-Bottom Surveillance Scan Line, and Click-Point Ripple Rings.
 */

export class HexGridMap {
  constructor(containerElement, districtsData, onSelectDistrict) {
    this.container = containerElement;
    this.districts = districtsData;
    this.onSelect = onSelectDistrict;
    this.selectedDistrictId = "d-varanasi";
    this.ripples = [];
    this.render();
  }

  render() {
    // Generate hex coordinate layout
    // Flat-topped or pointy hexes arranged in geographic clusters representing India's districts
    const hexRadius = 26;
    const hexWidth = hexRadius * Math.sqrt(3);
    const hexHeight = hexRadius * 2;
    const vertSpacing = hexHeight * 0.75;
    const horizSpacing = hexWidth;

    const hexSvgElements = this.districts.map(dist => {
      const q = dist.q;
      const r = dist.r;
      // Axial to pixel conversion
      const cx = 50 + q * horizSpacing + (r % 2 === 1 ? horizSpacing / 2 : 0);
      const cy = 60 + r * vertSpacing;

      let fillColor = '#22C55E';
      let strokeColor = '#22C55E';
      let burnFilter = '';
      let isBurn = false;

      if (dist.risk === 'high') {
        fillColor = dist.score > 85 ? '#EF4444' : '#F43F5E';
        strokeColor = '#EF4444';
        isBurn = true;
        burnFilter = 'filter="url(#thermalBurnGlow)"';
      } else if (dist.risk === 'med') {
        fillColor = '#F59E0B';
        strokeColor = '#F59E0B';
      } else {
        fillColor = '#10B981';
        strokeColor = '#10B981';
      }

      const isSelected = dist.id === this.selectedDistrictId;

      // Hexagon points
      const points = [];
      for (let a = 0; a < 6; a++) {
        const angle_deg = 60 * a - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        points.push(`${cx + hexRadius * Math.cos(angle_rad)},${cy + hexRadius * Math.sin(angle_rad)}`);
      }
      const pointsStr = points.join(' ');

      return `
        <g class="hex-district-group ${isSelected ? 'hex-selected' : ''} ${isBurn ? 'hex-thermal-burn' : ''}" 
           data-id="${dist.id}" 
           data-name="${dist.name}" 
           data-cx="${cx}" 
           data-cy="${cy}" 
           style="cursor: pointer;">
          
          <!-- Outer Thermal Halo for High Risk -->
          ${isBurn ? `
            <polygon points="${pointsStr}" fill="${fillColor}" opacity="0.25" ${burnFilter} transform="scale(1.15)" transform-origin="${cx} ${cy}" />
          ` : ''}

          <!-- Base Hex Polygon -->
          <polygon 
            points="${pointsStr}" 
            fill="${isSelected ? fillColor : '#12161F'}" 
            fill-opacity="${isSelected ? '0.85' : '0.65'}"
            stroke="${strokeColor}" 
            stroke-width="${isSelected ? '2.2' : '1.2'}" 
            class="hex-cell-polygon"
          />

          <!-- Inner Risk Dot / Score -->
          <circle cx="${cx}" cy="${cy - 4}" r="${isSelected ? '4' : '3'}" fill="${fillColor}" />
          
          <!-- Monospace District Code / Name -->
          <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="${isSelected ? '#FFFFFF' : '#CBD5E1'}" class="hex-text">
            ${dist.name.substring(0, 3).toUpperCase()}
          </text>
          <text x="${cx}" y="${cy + 17}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" fill="${fillColor}">
            ${dist.score}
          </text>
        </g>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="hex-map-canvas-wrap" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: radial-gradient(circle at 45% 45%, #141A28 0%, #0A0E16 85%); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
        <!-- Top Scanning Line -->
        <div class="heatmap-scanline"></div>
        
        <!-- Interactive Hex SVG Canvas -->
        <svg width="100%" height="100%" viewBox="0 0 680 500" preserveAspectRatio="xMidYMid meet" class="hex-svg-board">
          <defs>
            <filter id="thermalBurnGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern id="radarGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(76,141,255,0.04)" stroke-width="0.5" />
              <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(76,141,255,0.04)" stroke-width="0.5" />
            </pattern>
          </defs>

          <!-- Forensic Background Grid -->
          <rect width="680" height="500" fill="url(#radarGridPattern)" />

          <!-- Regional Connection Trails -->
          <path d="M 180 180 Q 320 220 440 220" stroke="rgba(239,68,68,0.2)" stroke-width="1.2" fill="none" stroke-dasharray="3,3" />
          <path d="M 280 120 Q 380 160 480 160" stroke="rgba(245,158,11,0.2)" stroke-width="1.2" fill="none" stroke-dasharray="3,3" />
          <path d="M 180 320 Q 260 380 360 420" stroke="rgba(34,197,94,0.2)" stroke-width="1.2" fill="none" stroke-dasharray="3,3" />

          <!-- Hex Cells -->
          <g class="hex-grid-layer">
            ${hexSvgElements}
          </g>

          <!-- Dynamic Ripple Ring Layer -->
          <g id="hexRippleContainer"></g>
        </svg>

        <!-- Map Control Overlay -->
        <div class="hex-legend-overlay">
          <div class="legend-chip"><span class="legend-dot" style="background:#EF4444; box-shadow: 0 0 8px #EF4444;"></span> High Anomaly (Score > 75)</div>
          <div class="legend-chip"><span class="legend-dot" style="background:#F59E0B;"></span> Moderate Risk (50-75)</div>
          <div class="legend-chip"><span class="legend-dot" style="background:#22C55E;"></span> Normal Flow (< 50)</div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const hexGroups = this.container.querySelectorAll('.hex-district-group');
    const rippleContainer = this.container.querySelector('#hexRippleContainer');

    hexGroups.forEach(group => {
      group.addEventListener('click', (e) => {
        const distId = group.getAttribute('data-id');
        const cx = parseFloat(group.getAttribute('data-cx'));
        const cy = parseFloat(group.getAttribute('data-cy'));

        this.triggerRipple(rippleContainer, cx, cy);
        this.selectedDistrictId = distId;
        
        // Highlight active group
        hexGroups.forEach(g => g.classList.remove('hex-selected'));
        group.classList.add('hex-selected');

        const found = this.districts.find(d => d.id === distId);
        if (found && this.onSelect) {
          this.onSelect(found);
        }
      });
    });
  }

  triggerRipple(container, cx, cy) {
    if (!container) return;
    const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ripple.setAttribute('cx', cx);
    ripple.setAttribute('cy', cy);
    ripple.setAttribute('r', '4');
    ripple.setAttribute('fill', 'none');
    ripple.setAttribute('stroke', '#F2B341');
    ripple.setAttribute('stroke-width', '2');
    ripple.setAttribute('class', 'hex-click-ripple');
    container.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }
}
