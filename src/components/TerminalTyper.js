/**
 * TerminalTyper.js
 * Monospace automated typewriter effect for forensic case insights.
 */

export class TerminalTyper {
  constructor(containerElement, lines = [], speed = 22) {
    this.container = containerElement;
    this.lines = lines;
    this.speed = speed;
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.isTyping = false;
    this.timeoutId = null;
  }

  start() {
    this.container.innerHTML = '';
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.isTyping = true;
    this.typeNextChar();
  }

  typeNextChar() {
    if (!this.isTyping || this.currentLineIndex >= this.lines.length) {
      this.isTyping = false;
      return;
    }

    const currentLine = this.lines[this.currentLineIndex];
    
    // Check if line DOM element exists
    let lineElem = this.container.children[this.currentLineIndex];
    if (!lineElem) {
      lineElem = document.createElement('div');
      lineElem.className = 'terminal-line';
      lineElem.style.fontFamily = "'JetBrains Mono', monospace";
      lineElem.style.fontSize = '12px';
      lineElem.style.lineHeight = '1.7';
      lineElem.style.color = currentLine.includes('ALERT') || currentLine.includes('RECOMMENDATION') || currentLine.includes('higher than') ? '#F2B341' : '#CBD5E1';
      this.container.appendChild(lineElem);
    }

    lineElem.textContent = currentLine.substring(0, this.currentCharIndex + 1);
    this.currentCharIndex++;

    if (this.currentCharIndex < currentLine.length) {
      this.timeoutId = setTimeout(() => this.typeNextChar(), this.speed);
    } else {
      this.currentLineIndex++;
      this.currentCharIndex = 0;
      this.timeoutId = setTimeout(() => this.typeNextChar(), 180);
    }
  }

  stop() {
    this.isTyping = false;
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
