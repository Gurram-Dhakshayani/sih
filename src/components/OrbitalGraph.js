/**
 * OrbitalGraph.js
 * High-performance HTML5 Canvas Force-Directed Orbital Network Graph
 * For Screen 3: Contractor Network Hero Visualization
 */

export class OrbitalNetworkGraph {
  constructor(canvasElement, tooltipElement, initialData) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.tooltip = tooltipElement;
    this.data = initialData;
    this.nodes = [];
    this.edges = [];
    this.particles = [];
    this.animFrameId = null;
    this.time = 0;
    
    this.draggedNode = null;
    this.hoveredNode = null;
    this.isDragging = false;
    this.mousePos = { x: 0, y: 0 };
    this.offset = { x: 0, y: 0 };
    this.scale = 1.0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupNodesAndEdges();
    this.setupParticles();
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  setupNodesAndEdges() {
    const rawNodes = this.data.nodes;
    this.nodes = rawNodes.map(n => {
      let x = this.centerX;
      let y = this.centerY;
      if (!n.fixed) {
        const angle = n.angle || Math.random() * Math.PI * 2;
        const orbit = n.orbit || 180;
        x = this.centerX + Math.cos(angle) * orbit;
        y = this.centerY + Math.sin(angle) * orbit;
      }
      return {
        ...n,
        x,
        y,
        baseOrbit: n.orbit || 180,
        currentAngle: n.angle || Math.random() * Math.PI * 2,
        orbitSpeed: (n.fixed ? 0 : 0.0015 / (1 + (n.orbit || 180) / 100)),
        vx: 0,
        vy: 0,
        glowPulse: Math.random() * Math.PI
      };
    });

    this.edges = this.data.edges.map(e => {
      const source = this.nodes.find(n => n.id === e.from);
      const target = this.nodes.find(n => n.id === e.to);
      return {
        ...e,
        sourceNode: source,
        targetNode: target
      };
    }).filter(e => e.sourceNode && e.targetNode);
  }

  setupParticles() {
    this.particles = [];
    this.edges.forEach((edge, idx) => {
      const count = edge.risk === 'high' ? 3 : 2;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          edge,
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.004,
          size: edge.risk === 'high' ? 3.0 : 2.0
        });
      }
    });
  }

  bindEvents() {
    const getCanvasCoords = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    this.canvas.addEventListener('mousemove', (e) => {
      const pos = getCanvasCoords(e);
      this.mousePos = pos;

      if (this.isDragging && this.draggedNode) {
        this.draggedNode.x = pos.x;
        this.draggedNode.y = pos.y;
        return;
      }

      // Find hovered node
      let found = null;
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const n = this.nodes[i];
        const dx = pos.x - n.x;
        const dy = pos.y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) <= (n.radius + 6)) {
          found = n;
          break;
        }
      }

      this.hoveredNode = found;
      this.canvas.style.cursor = found ? 'grab' : 'crosshair';

      if (found && this.tooltip) {
        this.showTooltip(found, e.clientX, e.clientY);
      } else if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.hoveredNode) {
        this.isDragging = true;
        this.draggedNode = this.hoveredNode;
        this.canvas.style.cursor = 'grabbing';
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.draggedNode = null;
      if (this.canvas) {
        this.canvas.style.cursor = this.hoveredNode ? 'grab' : 'crosshair';
      }
    });
  }

  showTooltip(node, screenX, screenY) {
    const riskBadgeColor = node.risk === 'high' ? '#EF4444' : node.risk === 'med' ? '#F59E0B' : '#22C55E';
    this.tooltip.innerHTML = `
      <div style="font-family: 'Inter', sans-serif; font-size: 11px; padding: 2px;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
          <span style="font-weight: 700; color: #FFFFFF; font-size: 12px;">${node.label}</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: ${riskBadgeColor}; background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px;">
            SCORE ${node.score}/100
          </span>
        </div>
        <div style="color: #94A3B8; font-size: 11px; margin-bottom: 3px;">Role: <span style="color: #E2E8F0;">${node.role}</span></div>
        <div style="color: #94A3B8; font-size: 11px;">Type: <span style="color: #F2B341; text-transform: uppercase;">${node.type}</span></div>
      </div>
    `;
    this.tooltip.style.display = 'block';
    this.tooltip.style.left = `${screenX + 14}px`;
    this.tooltip.style.top = `${screenY - 14}px`;
  }

  startLoop() {
    const animate = () => {
      this.time += 0.02;
      this.updatePhysics();
      this.draw();
      this.animFrameId = requestAnimationFrame(animate);
    };
    this.animFrameId = requestAnimationFrame(animate);
  }

  updatePhysics() {
    // Ambient slow orbital drift for unpinned nodes
    this.nodes.forEach(node => {
      if (!node.fixed && node !== this.draggedNode) {
        node.currentAngle += node.orbitSpeed;
        const drift = Math.sin(this.time + node.glowPulse) * 4;
        const targetX = this.centerX + Math.cos(node.currentAngle) * (node.baseOrbit + drift);
        const targetY = this.centerY + Math.sin(node.currentAngle) * (node.baseOrbit + drift);
        
        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;
      }
    });

    // Update particle flow along edges
    this.particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw background orbital guide rings
    const orbits = [160, 220, 280, 340];
    orbits.forEach(r => {
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, r, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(76, 141, 255, 0.04)';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 6]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // Draw Edges (curved lines)
    this.edges.forEach(edge => {
      const s = edge.sourceNode;
      const t = edge.targetNode;
      if (!s || !t) return;

      const midX = (s.x + t.x) / 2;
      const midY = (s.y + t.y) / 2;
      // Slight curve
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const cpX = midX - dy * 0.12;
      const cpY = midY + dx * 0.12;

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.quadraticCurveTo(cpX, cpY, t.x, t.y);

      let strokeColor = 'rgba(255, 255, 255, 0.15)';
      if (edge.risk === 'high') {
        strokeColor = 'rgba(239, 68, 68, 0.35)';
      } else if (edge.risk === 'med') {
        strokeColor = 'rgba(245, 158, 11, 0.25)';
      }

      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = edge.risk === 'high' ? 1.6 : 1.0;

      if (edge.dashed) {
        this.ctx.setLineDash([5, 4]);
      } else if (edge.dotted) {
        this.ctx.setLineDash([2, 3]);
      } else {
        this.ctx.setLineDash([]);
      }

      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // Draw Flowing Particles along Edges
    this.particles.forEach(p => {
      const s = p.edge.sourceNode;
      const t = p.edge.targetNode;
      if (!s || !t) return;

      const midX = (s.x + t.x) / 2;
      const midY = (s.y + t.y) / 2;
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const cpX = midX - dy * 0.12;
      const cpY = midY + dx * 0.12;

      // Quadratic bezier point formula
      const pr = p.progress;
      const inv = 1 - pr;
      const px = inv * inv * s.x + 2 * inv * pr * cpX + pr * pr * t.x;
      const py = inv * inv * s.y + 2 * inv * pr * cpY + pr * pr * t.y;

      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.edge.risk === 'high' ? '#EF4444' : '#F2B341';
      this.ctx.shadowColor = p.edge.risk === 'high' ? '#EF4444' : '#F2B341';
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // Draw Nodes
    this.nodes.forEach(node => {
      const isHub = node.id === 'hub';
      const isHover = node === this.hoveredNode;
      
      let baseColor = node.risk === 'high' ? '#EF4444' : node.risk === 'med' ? '#F59E0B' : '#22C55E';
      if (node.type === 'agency') baseColor = '#3B82F6';

      // Outer Glow Halo
      const pulse = Math.sin(this.time * 2 + node.glowPulse) * 3;
      const glowR = node.radius + 8 + (isHover ? 4 : 0) + (isHub ? 6 : 0) + pulse;
      
      const grad = this.ctx.createRadialGradient(node.x, node.y, node.radius * 0.4, node.x, node.y, glowR);
      grad.addColorStop(0, baseColor + (node.risk === 'high' ? '66' : '33'));
      grad.addColorStop(1, 'transparent');

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Node Body Circle
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#12161F';
      this.ctx.fill();
      this.ctx.lineWidth = isHover ? 2.5 : isHub ? 2.2 : 1.5;
      this.ctx.strokeStyle = baseColor;
      this.ctx.stroke();

      // Node Inner Icon / Core Ring
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius * 0.45, 0, Math.PI * 2);
      this.ctx.fillStyle = baseColor;
      this.ctx.fill();

      // Node Label (Monospace/Sans)
      this.ctx.font = isHub ? '600 11px Inter, sans-serif' : '500 10px Inter, sans-serif';
      this.ctx.fillStyle = isHover ? '#FFFFFF' : '#CBD5E1';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.label, node.x, node.y + node.radius + 14);

      if (isHub || node.score >= 90) {
        this.ctx.font = '700 9px "JetBrains Mono", monospace';
        this.ctx.fillStyle = baseColor;
        this.ctx.fillText(`${node.score}/100`, node.x, node.y + node.radius + 25);
      }
    });
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}
