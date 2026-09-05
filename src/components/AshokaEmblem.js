/**
 * AshokaEmblem.js
 * Precision SVG Line-Art representation of the State Emblem of India (Lion Capital of Ashoka)
 * with "सत्यमेव जयते" motto underneath in light gray/white line-art.
 */

export function renderAshokaEmblem(height = 92) {
  return `
    <div class="ashoka-emblem-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
      <svg width="${Math.round(height * 0.78)}" height="${height}" viewBox="0 0 120 154" fill="none" xmlns="http://www.w3.org/2000/svg" class="ashoka-emblem-svg">
        <defs>
          <linearGradient id="emblemGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#CBD5E1" stop-opacity="0.75" />
          </linearGradient>
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Lions Top Capital Heads -->
        <!-- Center Lion -->
        <path d="M60 12 C52 12, 48 18, 48 26 C48 34, 52 38, 56 42 L56 50 C54 52, 52 56, 52 62 C52 70, 56 74, 60 74 C64 74, 68 70, 68 62 C68 56, 66 52, 64 50 L64 42 C68 38, 72 34, 72 26 C72 18, 68 12, 60 12 Z" stroke="url(#emblemGlow)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Center Lion Mane & Crown Details -->
        <path d="M52 24 C56 20, 64 20, 68 24 M54 30 C57 28, 63 28, 66 30 M55 36 L65 36 M58 44 L62 44 M56 56 C58 58, 62 58, 64 56 M60 62 L60 68" stroke="url(#emblemGlow)" stroke-width="1.4" stroke-linecap="round" />

        <!-- Left Lion -->
        <path d="M48 28 C42 26, 32 30, 30 38 C28 46, 32 54, 38 58 L40 64 C38 68, 38 72, 42 76 C46 78, 50 76, 52 72 L48 52 C44 48, 44 40, 48 28 Z" stroke="url(#emblemGlow)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Left Lion Details -->
        <path d="M34 36 C38 34, 42 38, 44 42 M34 46 C37 46, 42 48, 44 52 M38 60 C40 62, 44 64, 46 64" stroke="url(#emblemGlow)" stroke-width="1.3" stroke-linecap="round" />

        <!-- Right Lion -->
        <path d="M72 28 C78 26, 88 30, 90 38 C92 46, 88 54, 82 58 L80 64 C82 68, 82 72, 78 76 C74 78, 70 76, 68 72 L72 52 C76 48, 76 40, 72 28 Z" stroke="url(#emblemGlow)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Right Lion Details -->
        <path d="M86 36 C82 34, 78 38, 76 42 M86 46 C83 46, 78 48, 76 52 M82 60 C80 62, 76 64, 74 64" stroke="url(#emblemGlow)" stroke-width="1.3" stroke-linecap="round" />

        <!-- Capital Plinth / Abacus -->
        <rect x="22" y="78" width="76" height="24" rx="2" stroke="url(#emblemGlow)" stroke-width="1.8" fill="rgba(10, 14, 22, 0.4)" />
        
        <!-- Ashoka Chakra (Central Wheel) in Abacus -->
        <circle cx="60" cy="90" r="8.5" stroke="url(#emblemGlow)" stroke-width="1.5" />
        <circle cx="60" cy="90" r="2" fill="url(#emblemGlow)" />
        <!-- Chakra Spokes -->
        <path d="M60 81.5 L60 98.5 M51.5 90 L68.5 90 M54 84 L66 96 M54 96 L66 84" stroke="url(#emblemGlow)" stroke-width="1.1" />

        <!-- Galloping Horse (Left of Chakra) -->
        <path d="M30 92 C32 88, 36 86, 40 88 C42 89, 44 87, 46 88 C48 90, 48 94, 44 95 L40 95 C36 96, 32 94, 30 92 Z" stroke="url(#emblemGlow)" stroke-width="1.3" stroke-linejoin="round" />
        <!-- Bull (Right of Chakra) -->
        <path d="M90 92 C88 88, 84 86, 80 88 C78 89, 76 87, 74 88 C72 90, 72 94, 76 95 L80 95 C84 96, 88 94, 90 92 Z" stroke="url(#emblemGlow)" stroke-width="1.3" stroke-linejoin="round" />

        <!-- Inverted Lotus Base -->
        <path d="M26 102 C36 108, 84 108, 94 102 C92 114, 84 122, 60 124 C36 122, 28 114, 26 102 Z" stroke="url(#emblemGlow)" stroke-width="1.8" stroke-linejoin="round" />
        <!-- Lotus Petal Flares -->
        <path d="M34 105 C40 114, 52 118, 60 118 C68 118, 80 114, 86 105 M46 104 L48 116 M74 104 L72 116 M60 104 L60 120" stroke="url(#emblemGlow)" stroke-width="1.2" stroke-linecap="round" />

        <!-- Pedestal Base Plate -->
        <rect x="18" y="124" width="84" height="6" rx="1.5" stroke="url(#emblemGlow)" stroke-width="1.6" />
      </svg>
      <div class="satyameva-text" style="font-family: 'Inter', 'Noto Sans Devanagari', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2.2px; color: #E2E8F0; text-transform: uppercase; margin-top: 2px;">
        सत्यमेव जयते
      </div>
    </div>
  `;
}
