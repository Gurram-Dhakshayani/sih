/**
 * main.js
 * Master Application Controller & Router for MPLAD SENTINEL (SIH26102)
 */

import { MPLAD_DATA } from './data/mplad-data.js';
import { renderAshokaEmblem } from './components/AshokaEmblem.js';
import { renderIndiaNightMap } from './components/IndiaMap.js';
import { OrbitalNetworkGraph } from './components/OrbitalGraph.js';
import { HexGridMap } from './components/HexGridMap.js';
import { DetectiveStringBoard } from './components/StringBoard.js';
import { TerminalTyper } from './components/TerminalTyper.js';

class SentinelApp {
  constructor() {
    this.currentScreen = 'screen-0-login';
    this.currentSubscreen = 'screen-1-radar';
    this.orbitalGraph = null;
    this.hexMap = null;
    this.stringBoard = null;
    this.terminalTyper = null;
    this.scrubberPlaying = false;
    this.scrubberInterval = null;
    this.activeQuarterIndex = 4; // Q1 2024 active
    this.registeredUsers = {
      'ramanathan.cag@gov.in': {
        name: 'Dr. S. K. Ramanathan',
        initials: 'SR',
        role: 'Lead Auditor (Dy. CAG)',
        email: 'ramanathan.cag@gov.in'
      }
    };

    this.init();
  }

  init() {
    this.renderScreen0Assets();
    this.bindLoginEvents();
    this.bindNavigationEvents();
    this.bindGlobalSearch();
    this.bindGlobalKeyboardShortcuts();

    // Render Subscreens data
    this.renderScreen1Radar();
    this.renderScreen2CaseFile();
    this.renderScreen3Contractor();
    this.renderScreen4Heatmap();
    this.renderScreen5Investigation();
    this.renderScreen6Ledger();
  }

  // =========================================================================
  // SCREEN 0: LOGIN & ACCESS GATE & USER AUTH
  // =========================================================================
  renderScreen0Assets() {
    const emblemContainer = document.getElementById('ashokaEmblemContainer');
    if (emblemContainer) {
      emblemContainer.innerHTML = renderAshokaEmblem(88);
    }

    const mapWrapper = document.getElementById('loginIndiaMapWrapper');
    if (mapWrapper) {
      mapWrapper.innerHTML = renderIndiaNightMap(520, 420);
    }
  }

  parseUserFromInput(inputStr) {
    let clean = (inputStr || '').trim();
    if (!clean) {
      clean = 'Dr. S. K. Ramanathan';
    }

    let displayName = clean;
    let initials = 'U';

    if (clean.includes('@')) {
      let handle = clean.split('@')[0];
      if (handle.length >= 2) {
        initials = handle.substring(0, 2).toUpperCase();
      } else if (handle.length === 1) {
        initials = handle[0].toUpperCase();
      }
    } else {
      let words = clean.split(' ').filter(Boolean);
      if (words.length >= 2) {
        initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
      } else if (clean.length >= 2) {
        initials = clean.substring(0, 2).toUpperCase();
      } else {
        initials = clean[0].toUpperCase();
      }
    }

    return {
      name: displayName,
      initials: initials,
      role: 'Lead Auditor (CAG)',
      email: clean.includes('@') ? clean : `${clean}@cag.gov.in`
    };
  }

  updateUserProfileUI(user) {
    this.currentUser = user;
    const profileNameEl = document.querySelector('.user-profile-badge .user-name');
    const profileAvatarEl = document.querySelector('.user-profile-badge .user-avatar-circle');
    const profileRoleEl = document.querySelector('.user-profile-badge .user-role-label');

    if (profileNameEl) profileNameEl.textContent = user.name;
    if (profileAvatarEl) profileAvatarEl.textContent = user.initials;
    if (profileRoleEl) profileRoleEl.textContent = user.role;

    // Update Auditor Sticky Note in Screen 5
    const stickyTitle = document.querySelector('.auditor-sticky-note .sticky-note-title');
    if (stickyTitle) {
      stickyTitle.textContent = `AUDITOR NOTE • ${user.name.toUpperCase()}`;
    }
  }

  bindLoginEvents() {
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const signInFormView = document.getElementById('signInFormView');
    const signUpFormView = document.getElementById('signUpFormView');
    const authFormTitle = document.getElementById('authFormTitle');
    const authFormSub = document.getElementById('authFormSub');

    const btnSignIn = document.getElementById('btnSignIn');
    const btnSignUpSubmit = document.getElementById('btnSignUpSubmit');
    const togglePassBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('loginPassword');
    const loginInput = document.getElementById('loginUsername');
    const btnSignOut = document.getElementById('btnSignOut');

    // Tab Switching: Sign In vs Sign Up
    if (tabSignIn && tabSignUp) {
      tabSignIn.addEventListener('click', () => {
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        if (signInFormView) signInFormView.style.display = 'block';
        if (signUpFormView) signUpFormView.style.display = 'none';
        if (authFormTitle) authFormTitle.textContent = 'Welcome Back!';
        if (authFormSub) authFormSub.textContent = 'Enter your email or username to access the dashboard';
      });

      tabSignUp.addEventListener('click', () => {
        tabSignUp.classList.add('active');
        tabSignIn.classList.remove('active');
        if (signInFormView) signInFormView.style.display = 'none';
        if (signUpFormView) signUpFormView.style.display = 'block';
        if (authFormTitle) authFormTitle.textContent = 'Create New Account';
        if (authFormSub) authFormSub.textContent = 'Fill in your details to register as an officer';
      });
    }

    const performLoginTransition = (user) => {
      this.updateUserProfileUI(user);

      const screen0 = document.getElementById('screen-0-login');
      const inProductApp = document.getElementById('in-product-app');

      screen0.classList.remove('active');
      inProductApp.classList.add('active');
      this.currentScreen = 'in-product-app';

      // Switch to Screen 1 (Radar)
      this.navigateToSubscreen('screen-1-radar');
    };

    // Sign In Submit
    if (btnSignIn) {
      btnSignIn.addEventListener('click', () => {
        const inputVal = loginInput ? loginInput.value : '';
        const user = this.parseUserFromInput(inputVal);
        performLoginTransition(user);
      });
    }

    // Sign Up Submit
    if (btnSignUpSubmit) {
      btnSignUpSubmit.addEventListener('click', () => {
        const nameInput = document.getElementById('signUpFullName');
        const emailInput = document.getElementById('signUpEmail');
        
        const typedName = nameInput ? nameInput.value.trim() : '';
        const typedEmail = emailInput ? emailInput.value.trim() : '';
        
        const rawInput = typedName || typedEmail || 'Audit Officer';
        const user = this.parseUserFromInput(rawInput);
        performLoginTransition(user);
      });
    }

    if (loginInput) {
      loginInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const user = this.parseUserFromInput(loginInput.value);
          performLoginTransition(user);
        }
      });
    }
    if (passwordInput) {
      passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const user = this.parseUserFromInput(loginInput ? loginInput.value : '');
          performLoginTransition(user);
        }
      });
    }

    // Password Toggle
    if (togglePassBtn && passwordInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
      });
    }

    // Topbar Profile Badge Click Handler for Quick Edit
    const profileBadge = document.getElementById('userProfileBadge');
    if (profileBadge) {
      profileBadge.style.cursor = 'pointer';
      profileBadge.title = 'Click to edit your display name and role';
      profileBadge.addEventListener('click', () => {
        const newName = prompt('Enter your Display Name:', this.currentUser ? this.currentUser.name : 'Rina Sharma');
        if (newName && newName.trim()) {
          const newRole = prompt('Enter your Officer Role:', this.currentUser ? this.currentUser.role : 'Lead Forensic Auditor (CAG)') || 'Audit Officer';
          
          const words = newName.trim().split(' ').filter(Boolean);
          let initials = 'AO';
          if (words.length >= 2) initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
          else if (words.length === 1) initials = words[0].substring(0, 2).toUpperCase();

          this.updateUserProfileUI({
            name: newName.trim(),
            initials: initials,
            role: newRole.trim(),
            email: this.currentUser ? this.currentUser.email : 'user@cag.gov.in'
          });
        }
      });
    }

    // Sign out
    if (btnSignOut) {
      btnSignOut.addEventListener('click', () => {
        document.getElementById('in-product-app').classList.remove('active');
        document.getElementById('screen-0-login').classList.add('active');
        this.currentScreen = 'screen-0-login';
      });
    }
  }

  // =========================================================================
  // NAVIGATION & ROUTING (SCREENS 1–6)
  // =========================================================================
  bindNavigationEvents() {
    const navButtons = document.querySelectorAll('.nav-item-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        this.navigateToSubscreen(target);
      });
    });

    // Screen 3 View Tabs: Network vs Heatmap
    const tabHeatmap = document.getElementById('tabViewHeatmap');
    const tabNetwork = document.getElementById('tabViewNetwork');

    if (tabHeatmap) {
      tabHeatmap.addEventListener('click', () => {
        this.navigateToSubscreen('screen-4-heatmap');
      });
    }
    if (tabNetwork) {
      tabNetwork.addEventListener('click', () => {
        this.navigateToSubscreen('screen-3-contractor');
      });
    }

    // Top Alert Ticker Quick Trigger
    const topAlertTicker = document.getElementById('topAlertTicker');
    if (topAlertTicker) {
      topAlertTicker.addEventListener('click', () => {
        this.triggerLockOnProject('MPLAD-1024');
      });
    }

    // Launch Investigation button in Screen 2
    const btnLaunchInv = document.getElementById('btnLaunchInvestigation');
    if (btnLaunchInv) {
      btnLaunchInv.addEventListener('click', () => {
        this.navigateToSubscreen('screen-5-investigation');
      });
    }
  }

  navigateToSubscreen(subscreenId) {
    this.currentSubscreen = subscreenId;

    // Update active nav buttons
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      if (btn.getAttribute('data-target') === subscreenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Toggle subscreen visibility
    document.querySelectorAll('.content-subscreen').forEach(view => {
      view.classList.remove('active');
      view.style.display = 'none';
    });

    const activeView = document.getElementById(subscreenId);
    if (activeView) {
      activeView.style.display = 'block';
      setTimeout(() => activeView.classList.add('active'), 20);
    }

    // Screen specific triggers
    if (subscreenId === 'screen-2-casefile' && this.terminalTyper) {
      this.terminalTyper.start();
    } else if (subscreenId === 'screen-3-contractor') {
      if (this.orbitalGraph) this.orbitalGraph.resize();
      const tabHeatmap = document.getElementById('tabViewHeatmap');
      const tabNetwork = document.getElementById('tabViewNetwork');
      if (tabHeatmap) tabHeatmap.classList.remove('active');
      if (tabNetwork) tabNetwork.classList.add('active');
    } else if (subscreenId === 'screen-4-heatmap') {
      this.renderScreen4Heatmap();
    } else if (subscreenId === 'screen-5-investigation' && this.stringBoard) {
      setTimeout(() => this.stringBoard.updateLines(), 100);
    }
  }

  bindGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) return;

        if (q.includes('1024') || q.includes('varanasi') || q.includes('road')) {
          this.triggerLockOnProject('MPLAD-1024');
        } else if (q.includes('bharat') || q.includes('contractor') || q.includes('883')) {
          this.navigateToSubscreen('screen-3-contractor');
        } else if (q.includes('heat') || q.includes('district') || q.includes('map')) {
          this.navigateToSubscreen('screen-4-heatmap');
        } else if (q.includes('chain') || q.includes('block') || q.includes('ledger') || q.includes('audit')) {
          this.navigateToSubscreen('screen-6-ledger');
        } else {
          this.navigateToSubscreen('screen-1-radar');
        }
      }
    });
  }

  bindGlobalKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) searchInput.focus();
      }
    });
  }

  // =========================================================================
  // SCREEN 1: RISK RADAR (MAIN DASHBOARD)
  // =========================================================================
  renderScreen1Radar() {
    const listContainer = document.getElementById('radarRankedProjectsList');
    if (!listContainer) return;

    const renderList = (projects) => {
      listContainer.innerHTML = projects.map((p, idx) => {
        const rankClass = idx === 0 ? 'rank-top-1' : idx === 1 ? 'rank-top-2' : idx === 2 ? 'rank-top-3' : '';
        const riskColor = p.riskScore >= 80 ? '#EF4444' : p.riskScore >= 50 ? '#F59E0B' : '#22C55E';
        
        return `
          <div class="project-ranked-row" data-id="${p.id}" id="row-${p.id}">
            <!-- Rank Badge -->
            <div class="rank-badge-circle ${rankClass}">${idx + 1}</div>

            <!-- Project Name + District -->
            <div class="project-info-block">
              <div class="project-name-text">${p.name}</div>
              <div class="project-meta-caption">
                <span>${p.id}</span> &bull; 
                <span>${p.district}</span> &bull; 
                <span>Contractor: ${p.contractor}</span>
              </div>
            </div>

            <!-- Anomaly Tags -->
            <div class="project-anomaly-tags-wrap">
              ${p.tags.map(t => `<span class="tag-pill-sm">${t}</span>`).join('')}
            </div>

            <!-- Amount in Mono -->
            <div class="project-amount-mono font-mono">₹${p.amountCr} Cr</div>

            <!-- Mini Score Ring -->
            <div class="row-score-ring-wrap">
              <svg width="28" height="28" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#1E293B" stroke-width="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="${riskColor}" stroke-width="3"
                        stroke-dasharray="${(p.riskScore / 100) * 88} 88" stroke-linecap="round" transform="rotate(-90 18 18)" />
              </svg>
              <span class="score-mini-num font-mono" style="color: ${riskColor};">${p.riskScore}</span>
            </div>

            <!-- Inspect Action Button -->
            <button class="row-action-inspect-btn font-mono" title="Lock-on and investigate">
              <span>Inspect</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        `;
      }).join('');

      // Bind row clicks for lock-on targeting
      listContainer.querySelectorAll('.project-ranked-row').forEach(row => {
        row.addEventListener('click', () => {
          const pid = row.getAttribute('data-id');
          this.triggerLockOnProject(pid);
        });
      });
    };

    renderList(MPLAD_DATA.highRiskProjects);

    // Filter Pills Handler
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');
        let filtered = MPLAD_DATA.highRiskProjects;
        if (filter === 'expenditure') {
          filtered = MPLAD_DATA.highRiskProjects.filter(p => p.tags.some(t => t.includes('Expenditure') || t.includes('Markup') || t.includes('Cost')));
        } else if (filter === 'cartel') {
          filtered = MPLAD_DATA.highRiskProjects.filter(p => p.tags.some(t => t.includes('Cartel') || t.includes('Monopoly') || t.includes('Sister')));
        } else if (filter === 'rapid') {
          filtered = MPLAD_DATA.highRiskProjects.filter(p => p.tags.some(t => t.includes('Rapid') || t.includes('Advance') || t.includes('Pre-Poll')));
        }
        renderList(filtered);
      });
    });
  }

  triggerLockOnProject(projectId) {
    const row = document.getElementById(`row-${projectId}`);
    if (row) {
      row.classList.add('locking-on');
    }

    setTimeout(() => {
      if (row) row.classList.remove('locking-on');
      // Navigate to Screen 2 (Case File)
      this.navigateToSubscreen('screen-2-casefile');
    }, 380);
  }

  // =========================================================================
  // SCREEN 2: EXPENDITURE & TIMELINE ANALYSIS (CASE FILE)
  // =========================================================================
  renderScreen2CaseFile() {
    const bulletContainer = document.getElementById('expenditureBulletChartContainer');
    const milestoneRow = document.getElementById('milestoneEventsRow');
    const terminalOutput = document.getElementById('terminalOutputFeed');

    // Render Bullet Ruler
    if (bulletContainer) {
      bulletContainer.innerHTML = MPLAD_DATA.caseFile.expenditureComparison.map(b => `
        <div class="bullet-chart-row">
          <div class="bullet-labels-row">
            <span class="bullet-entity-name">${b.label}</span>
            <span class="bullet-unit-cost font-mono">${b.costPerUnit} (${b.totalAmount})</span>
          </div>
          <div class="bullet-ruler-track">
            <div class="bullet-fill-bar ${b.isTarget ? 'bullet-fill-target' : 'bullet-fill-benchmark'}" style="width: ${b.percent}%;">
              ${b.alert ? `<span class="bullet-overflow-marker">${b.alert} ⚠</span>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Render Milestone Cards
    if (milestoneRow) {
      milestoneRow.innerHTML = MPLAD_DATA.caseFile.timelineEvents.map(m => `
        <div class="milestone-card-item ${m.status === 'anomalous' ? 'anomalous' : ''}">
          <span class="milestone-name">${m.label}</span>
          <span class="milestone-date-mono font-mono">${m.date}</span>
          ${m.anomalyTag ? `<span class="milestone-anomaly-pill font-mono">${m.anomalyTag}</span>` : ''}
        </div>
      `).join('');
    }

    // Initialize Terminal Typer
    if (terminalOutput) {
      this.terminalTyper = new TerminalTyper(terminalOutput, MPLAD_DATA.caseFile.terminalInsights, 18);
    }
  }

  // =========================================================================
  // SCREEN 3: CONTRACTOR NETWORK (HERO 3D DISPLAY)
  // =========================================================================
  renderScreen3Contractor() {
    const canvas = document.getElementById('orbitalNetworkCanvas');
    const tooltip = document.getElementById('orbitalNodeTooltip');
    const rankingList = document.getElementById('contractorRankingList');
    const quarterNodes = document.getElementById('quarterNodesList');

    if (canvas && tooltip) {
      this.orbitalGraph = new OrbitalNetworkGraph(canvas, tooltip, MPLAD_DATA.contractorNetwork);
    }

    // Render Right Ranking List
    if (rankingList) {
      rankingList.innerHTML = MPLAD_DATA.contractorNetwork.contractorRanking.map(c => `
        <div class="contractor-rank-row ${c.rank === 1 ? 'selected' : ''}" data-name="${c.name}">
          <div class="rank-row-left">
            <span class="rank-num-mono font-mono">${c.rank}</span>
            <div class="contractor-info">
              <span class="contractor-name">${c.name}</span>
              <span class="contractor-sub-mono font-mono">${c.district} &bull; ₹${c.amountCr} Cr</span>
            </div>
          </div>
          <div class="rank-row-right">
            <span class="contractor-score-badge font-mono" style="color: ${c.score >= 80 ? '#EF4444' : c.score >= 60 ? '#F59E0B' : '#22C55E'};">
              ${c.score}
            </span>
            <span class="trend-delta-indicator font-mono trend-${c.deltaType}">
              ${c.deltaType.startsWith('up') ? '▲' : c.deltaType.startsWith('down') ? '▼' : '▬'} ${c.delta}
            </span>
          </div>
        </div>
      `).join('');

      rankingList.querySelectorAll('.contractor-rank-row').forEach(row => {
        row.addEventListener('click', () => {
          rankingList.querySelectorAll('.contractor-rank-row').forEach(r => r.classList.remove('selected'));
          row.classList.add('selected');
        });
      });
    }

    // Render Quarter Nodes
    if (quarterNodes) {
      quarterNodes.innerHTML = MPLAD_DATA.contractorNetwork.timelineQuarters.map((q, idx) => `
        <div class="quarter-node-chip ${idx === this.activeQuarterIndex ? 'active' : ''}" data-index="${idx}">
          <span class="quarter-dot"></span>
          <span class="quarter-label font-mono">${q.label}</span>
        </div>
      `).join('');

      quarterNodes.querySelectorAll('.quarter-node-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const idx = parseInt(chip.getAttribute('data-index'));
          this.setScrubberQuarter(idx);
        });
      });
    }

    // Scrubber Play/Step Controls
    const btnPlay = document.getElementById('btnScrubPlay');
    const btnPrev = document.getElementById('btnScrubPrev');
    const btnNext = document.getElementById('btnScrubNext');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.toggleScrubberPlay();
      });
    }
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        this.setScrubberQuarter(Math.max(0, this.activeQuarterIndex - 1));
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.setScrubberQuarter(Math.min(MPLAD_DATA.contractorNetwork.timelineQuarters.length - 1, this.activeQuarterIndex + 1));
      });
    }

    // Slider filter
    const scoreSlider = document.getElementById('scoreRangeSlider');
    const sliderVal = document.getElementById('sliderScoreVal');
    if (scoreSlider && sliderVal) {
      scoreSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        sliderVal.textContent = `${val} - 100`;
      });
    }
  }

  setScrubberQuarter(idx) {
    this.activeQuarterIndex = idx;
    const chips = document.querySelectorAll('.quarter-node-chip');
    chips.forEach((c, i) => {
      if (i === idx) c.classList.add('active');
      else c.classList.remove('active');
    });

    const quarter = MPLAD_DATA.contractorNetwork.timelineQuarters[idx];
    const narrativeBtn = document.getElementById('contractorSelectorBtn');
    if (narrativeBtn && quarter) {
      narrativeBtn.querySelector('span').textContent = `M/S Bharat Infracon Corp (${quarter.label} • ${quarter.projectCount} Projects • ₹${quarter.totalCr} Cr)`;
    }
  }

  toggleScrubberPlay() {
    this.scrubberPlaying = !this.scrubberPlaying;
    const btnPlay = document.getElementById('btnScrubPlay');
    
    if (this.scrubberPlaying) {
      if (btnPlay) btnPlay.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      this.scrubberInterval = setInterval(() => {
        let nextIdx = (this.activeQuarterIndex + 1) % MPLAD_DATA.contractorNetwork.timelineQuarters.length;
        this.setScrubberQuarter(nextIdx);
      }, 1400);
    } else {
      if (btnPlay) btnPlay.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      if (this.scrubberInterval) clearInterval(this.scrubberInterval);
    }
  }

  // =========================================================================
  // SCREEN 4: DISTRICT RISK HEATMAP
  // =========================================================================
  renderScreen4Heatmap() {
    const mapContainer = document.getElementById('hexGridMapContainer');
    const summaryContainer = document.getElementById('districtSummaryStack');

    if (mapContainer) {
      this.hexMap = new HexGridMap(mapContainer, MPLAD_DATA.districtHeatmap.districts, (district) => {
        this.updateDistrictSummary(district);
      });
    }

    this.updateDistrictSummary(MPLAD_DATA.districtHeatmap.selectedDistrict);
  }

  updateDistrictSummary(district) {
    const container = document.getElementById('districtSummaryStack');
    if (!container) return;

    const name = district.name || district.id || 'District';
    const state = district.state || 'Uttar Pradesh';
    const mpName = district.mpConstituency || district.mpName || `${name} Parliamentary Constituency`;
    const riskScore = district.riskScore || district.score || 75;
    const isHigh = riskScore >= 75;
    const isMed = riskScore >= 50 && riskScore < 75;
    const ringColor = isHigh ? '#EF4444' : isMed ? '#F59E0B' : '#22C55E';
    
    const totalProj = district.totalProjects || district.projects || (isHigh ? 134 : isMed ? 88 : 64);
    const highCount = district.highRiskCount || district.highCount || (isHigh ? 16 : isMed ? 5 : 1);
    const medCount = district.medRiskCount || Math.round(totalProj * (isHigh ? 0.25 : isMed ? 0.35 : 0.15));
    const lowCount = Math.max(0, totalProj - highCount - medCount);

    let riskFactorsHtml = '';
    if (district.topRiskFactors && district.topRiskFactors.length > 0) {
      riskFactorsHtml = district.topRiskFactors.map(f => 
        `<div class="factor-pill-chip ${f.severity === 'med' ? 'severity-med' : ''}">${f.label}</div>`
      ).join('');
    } else if (isHigh) {
      riskFactorsHtml = `
        <div class="factor-pill-chip">Contractor Cartelization (Top 2 firms hold >70% funds)</div>
        <div class="factor-pill-chip">Inflated Unit Cost Tariffs (+65% to +85% above PWD Schedule)</div>
        <div class="factor-pill-chip">Ghost Completion Certificates (Disbursement prior to work)</div>
        <div class="factor-pill-chip severity-med">Rapid Year-End Fund Release (High velocity anomaly)</div>
      `;
    } else if (isMed) {
      riskFactorsHtml = `
        <div class="factor-pill-chip severity-med">Subcontractor Clause Variance (100% outsourced)</div>
        <div class="factor-pill-chip severity-med">Material Rate Inflation (+28% above CPWD index)</div>
        <div class="factor-pill-chip">Biometric Verification Gap (Physical audit pending)</div>
      `;
    } else {
      riskFactorsHtml = `
        <div class="factor-pill-chip" style="border-left-color: #22C55E;">Verified Physical Milestones (100% Geo-tagged)</div>
        <div class="factor-pill-chip" style="border-left-color: #22C55E;">Competitive Open e-Procurement (>5 Bidders)</div>
        <div class="factor-pill-chip" style="border-left-color: #22C55E;">Clean Ledger Audit Trail</div>
      `;
    }

    container.innerHTML = `
      <div class="summary-header-block">
        <h3 class="summary-district-title">${name}</h3>
        <span class="summary-state-sub font-mono">${state} &bull; ${mpName}</span>
      </div>

      <!-- Big Circular Score Ring -->
      <div class="district-score-ring-wrap">
        <svg class="score-ring-svg" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#161E2E" stroke-width="10" />
          <circle cx="70" cy="70" r="54" fill="none" stroke="${ringColor}" stroke-width="10"
                  stroke-dasharray="${(riskScore / 100) * 339} 339" stroke-linecap="round" transform="rotate(-90 70 70)" />
        </svg>
        <div class="score-ring-center-val">
          <span class="ring-score-big font-mono" style="color: ${ringColor};">${riskScore}</span>
          <span class="ring-score-caption font-mono">RISK SCORE</span>
        </div>
      </div>

      <!-- Slim Horizontal Count Bars -->
      <div class="district-counts-bars-stack">
        <div class="count-bar-row">
          <div class="count-bar-labels">
            <span class="count-bar-name">Total Sanctioned Projects</span>
            <span class="count-bar-num font-mono">${totalProj}</span>
          </div>
          <div class="count-bar-track"><div class="count-bar-fill" style="width: 100%; background: #3B82F6;"></div></div>
        </div>

        <div class="count-bar-row">
          <div class="count-bar-labels">
            <span class="count-bar-name">High Risk Anomalies</span>
            <span class="count-bar-num font-mono" style="color: #EF4444;">${highCount}</span>
          </div>
          <div class="count-bar-track"><div class="count-bar-fill" style="width: ${Math.round((highCount/totalProj)*100)}%; background: #EF4444;"></div></div>
        </div>

        <div class="count-bar-row">
          <div class="count-bar-labels">
            <span class="count-bar-name">Medium Watchlist</span>
            <span class="count-bar-num font-mono" style="color: #F59E0B;">${medCount}</span>
          </div>
          <div class="count-bar-track"><div class="count-bar-fill" style="width: ${Math.round((medCount/totalProj)*100)}%; background: #F59E0B;"></div></div>
        </div>

        <div class="count-bar-row">
          <div class="count-bar-labels">
            <span class="count-bar-name">Cleared / Low Risk</span>
            <span class="count-bar-num font-mono" style="color: #22C55E;">${lowCount}</span>
          </div>
          <div class="count-bar-track"><div class="count-bar-fill" style="width: ${Math.round((lowCount/totalProj)*100)}%; background: #22C55E;"></div></div>
        </div>
      </div>

      <!-- Top Risk Factors Pill Chips -->
      <div class="risk-factors-section">
        <span class="risk-factors-title font-mono">Top Audit Findings</span>
        <div class="risk-factors-chips-list">
          ${riskFactorsHtml}
        </div>
      </div>

      <!-- Action Button -->
      <button class="btn-inspect-district-projects" id="btnInspectDistrictProjects">
        <span>Inspect ${highCount} Flagged Projects in ${name}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;

    const btnInspect = container.querySelector('#btnInspectDistrictProjects');
    if (btnInspect) {
      btnInspect.addEventListener('click', () => {
        this.navigateToSubscreen('screen-1-radar');
      });
    }
  }

  // =========================================================================
  // SCREEN 5: INVESTIGATION MODE (CASE BOARD)
  // =========================================================================
  renderScreen5Investigation() {
    const svgCord = document.getElementById('caseStringCanvasSvg');
    const boardLayer = document.getElementById('caseBoardItemsLayer');

    if (svgCord && boardLayer) {
      this.stringBoard = new DetectiveStringBoard(svgCord, boardLayer);
    }

    // Mark for Verification button
    const btnVerify = document.getElementById('btnMarkVerification');
    const btnFalsePos = document.getElementById('btnFalsePositive');

    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        btnVerify.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Flagged for CAG Vigilance Notice!</span>
        `;
        btnVerify.style.background = '#22C55E';
        btnVerify.style.color = '#FFFFFF';
        setTimeout(() => {
          this.navigateToSubscreen('screen-6-ledger');
        }, 800);
      });
    }

    if (btnFalsePos) {
      btnFalsePos.addEventListener('click', () => {
        btnFalsePos.textContent = 'Status: False Positive Recorded';
        btnFalsePos.style.color = '#94A3B8';
      });
    }
  }

  // =========================================================================
  // SCREEN 6: TAMPER-PROOF AUDIT TRAIL (BLOCKCHAIN LEDGER)
  // =========================================================================
  renderScreen6Ledger() {
    const chainFeed = document.getElementById('blockchainChainFeed');
    const btnVerify = document.getElementById('btnVerifyChainIntegrity');
    const verifyLabel = document.getElementById('verifyBtnLabel');

    if (!chainFeed) return;

    // Render Blocks
    const blocksHtml = MPLAD_DATA.auditLedger.blocks.map((b, idx) => `
      <div class="block-card-wrapper" id="blockCard-${idx}">
        <div class="block-card">
          
          <div class="block-header-row">
            <div class="block-num-badge font-mono">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              <span>BLOCK #${b.blockNum}</span>
            </div>
            <div class="block-timestamp-mono font-mono">${b.timestamp}</div>
          </div>

          <div class="block-action-title font-mono">
            <span class="badge-risk-high" style="background: rgba(34,197,94,0.12); color: #22C55E; border-color: rgba(34,197,94,0.3); font-size: 10.5px;">
              ${b.action}
            </span>
            <span>${b.projectId}</span>
          </div>

          <div class="block-auditor-line">
            Auditor / Actor: <span>${b.auditor}</span>
          </div>

          <div class="block-details-text">
            ${b.details}
          </div>

          <div class="block-crypto-footer">
            <div class="crypto-hash-item">
              <span class="crypto-hash-label">PREVIOUS BLOCK HASH</span>
              <span class="crypto-hash-val font-mono">${b.prevHash}</span>
            </div>
            <div class="crypto-hash-item">
              <span class="crypto-hash-label">MERKLE STATE HASH</span>
              <span class="crypto-hash-val font-mono">${b.blockHash}</span>
            </div>
          </div>

        </div>

        ${idx < MPLAD_DATA.auditLedger.blocks.length - 1 ? `
          <div class="chain-link-midpoint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
        ` : ''}
      </div>
    `).join('');

    chainFeed.innerHTML = `
      <div class="blockchain-spine-line"></div>
      ${blocksHtml}
    `;

    // Cascade Verification Trigger Animation (~80ms per block)
    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        btnVerify.classList.add('verifying');
        verifyLabel.textContent = 'Verifying Merkle Roots…';

        const blockCards = chainFeed.querySelectorAll('.block-card');
        blockCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('flash-verify');
            setTimeout(() => card.classList.remove('flash-verify'), 450);
          }, index * 90);
        });

        setTimeout(() => {
          btnVerify.classList.remove('verifying');
          verifyLabel.textContent = '✓ 100% Chain Integrity Re-Verified';
          setTimeout(() => {
            verifyLabel.textContent = 'Verify Chain Integrity';
          }, 3000);
        }, blockCards.length * 90 + 500);
      });
    }
  }
}

// Initialize Application when DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.sentinelApp = new SentinelApp();
});
