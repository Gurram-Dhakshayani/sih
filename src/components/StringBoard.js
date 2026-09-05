/**
 * StringBoard.js
 * Calculates dynamic curved SVG red/amber string lines connecting pinned evidence cards on the case board.
 */

export class DetectiveStringBoard {
  constructor(svgElement, boardContainer) {
    this.svg = svgElement;
    this.board = boardContainer;
    this.lines = [];
    this.init();
  }

  init() {
    this.updateLines();
    window.addEventListener('resize', () => this.updateLines());
  }

  updateLines() {
    if (!this.svg || !this.board) return;
    
    const boardRect = this.board.getBoundingClientRect();
    const centerCard = this.board.querySelector('#centerFlaggedCard');
    const primaryCards = this.board.querySelectorAll('.primary-evidence-card');
    const secondaryCards = this.board.querySelectorAll('.secondary-lead-card');

    if (!centerCard) return;

    const centerRect = centerCard.getBoundingClientRect();
    const centerPinX = (centerRect.left + centerRect.width / 2) - boardRect.left;
    const centerPinY = (centerRect.top + 16) - boardRect.top; // At pushpin location

    let pathHtml = '';

    // Connect Center to Primary Evidence Cards
    primaryCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const pinX = (cardRect.left + cardRect.width / 2) - boardRect.left;
      const pinY = (cardRect.top + 14) - boardRect.top;

      const strokeColor = index === 2 ? 'rgba(245, 158, 11, 0.75)' : 'rgba(239, 68, 68, 0.85)';
      const shadowColor = index === 2 ? '#F59E0B' : '#EF4444';
      
      // Calculate realistic hanging bezier string sag
      const midX = (centerPinX + pinX) / 2;
      const midY = (centerPinY + pinY) / 2 + 18 + (index * 4); // String sag due to gravity

      pathHtml += `
        <g class="evidence-string-group">
          <!-- Ambient shadow on cork -->
          <path d="M ${centerPinX} ${centerPinY + 3} Q ${midX} ${midY + 4} ${pinX} ${pinY + 3}" 
                stroke="rgba(0,0,0,0.4)" stroke-width="2.5" fill="none" />
          <!-- Red/Amber braided string -->
          <path d="M ${centerPinX} ${centerPinY} Q ${midX} ${midY} ${pinX} ${pinY}" 
                stroke="${strokeColor}" stroke-width="1.8" fill="none" stroke-dasharray="8,1" />
        </g>
      `;
    });

    // Connect Primary to Secondary Leads (outer ring)
    secondaryCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const secPinX = (cardRect.left + cardRect.width / 2) - boardRect.left;
      const secPinY = (cardRect.top + 12) - boardRect.top;

      const targetPrimary = primaryCards[index % primaryCards.length];
      if (targetPrimary) {
        const primRect = targetPrimary.getBoundingClientRect();
        const primPinX = (primRect.left + primRect.width / 2) - boardRect.left;
        const primPinY = (primRect.top + 14) - boardRect.top;

        const midX = (primPinX + secPinX) / 2;
        const midY = (primPinY + secPinY) / 2 + 12;

        pathHtml += `
          <g class="secondary-string-group">
            <path d="M ${primPinX} ${primPinY + 2} Q ${midX} ${midY + 3} ${secPinX} ${secPinY + 2}" 
                  stroke="rgba(0,0,0,0.3)" stroke-width="1.8" fill="none" />
            <path d="M ${primPinX} ${primPinY} Q ${midX} ${midY} ${secPinX} ${secPinY}" 
                  stroke="rgba(242, 179, 65, 0.45)" stroke-width="1.2" fill="none" stroke-dasharray="4,4" />
          </g>
        `;
      }
    });

    this.svg.innerHTML = pathHtml;
  }
}
