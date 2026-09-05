/**
 * MPLAD Sentinel — AI Audit Intelligence Dataset
 * Authentic Indian MPLAD Domain Data (Districts, Contractors, Projects, Case Files, Blockchain Ledger)
 */

export const MPLAD_DATA = {
  stats: {
    totalProjects: 14892,
    totalAllocationCr: "24,850.00",
    totalDisbursedCr: "21,420.50",
    flaggedAnomalyAmountCr: "1,428.60",
    highRiskCount: 184,
    mediumRiskCount: 642,
    lowRiskCount: 14066,
    activeDistricts: 766,
    activeContractors: 4120,
    chainHeight: 14892,
    consensusNodes: ["MoSPI-HQ-Node01", "CAG-Audit-Node04", "NIC-Gov-Node02"],
    systemStatus: "ONLINE | NODE-04 | SHA-256 ACTIVE",
    currentUser: {
      name: "Dr. S. K. Ramanathan",
      role: "Lead Forensic Auditor (Dy. CAG / MoSPI)",
      avatar: "SR",
      badge: "Govt. of India • Tier 1 Clearance",
      districtAssigned: "National Audit Cell"
    }
  },

  // Screen 1: Top High-Risk Projects
  highRiskProjects: [
    {
      id: "MPLAD-1024",
      name: "Road Construction Phase II (Shivpur-Rohania Link)",
      district: "Varanasi, Uttar Pradesh",
      state: "UP",
      mpConstituency: "Varanasi",
      contractor: "M/S Bharat Infracon Corp",
      contractorId: "CON-UP-883",
      amountCr: "4.85",
      riskScore: 94,
      riskLevel: "high",
      tags: ["Expenditure +76%", "16d Rapid Disbursement", "Single Bidder Cartel"],
      sanctionDate: "12 Jan 2024",
      status: "Under Forensic Review",
      leadInvestigator: "Dr. S. K. Ramanathan",
      primaryAnomaly: "Project cost ₹1.42 Cr/km exceeds district median by 76%; funds disbursed in 16 days vs 145d norm."
    },
    {
      id: "MPLAD-2041",
      name: "Solar Mini-Grid Installation & Battery Bank",
      district: "Gorakhpur, Uttar Pradesh",
      state: "UP",
      mpConstituency: "Gorakhpur Rural",
      contractor: "Om Sai Infratech Pvt Ltd",
      contractorId: "CON-UP-912",
      amountCr: "3.20",
      riskScore: 91,
      riskLevel: "high",
      tags: ["Duplicate GST Invoice", "Nodal Kinship Link", "Zero Geo-Proof"],
      sanctionDate: "04 Feb 2024",
      status: "High Vigilance Alert",
      leadInvestigator: "Anita Sharma (Sr. Auditor)",
      primaryAnomaly: "Duplicate GST invoices submitted across 3 related suppliers; zero ground solar panels found."
    },
    {
      id: "MPLAD-3088",
      name: "Community Health Center Oxygen Pipeline & ICU Bed Unit",
      district: "Wayanad, Kerala",
      state: "KL",
      mpConstituency: "Wayanad",
      contractor: "Apex Health Infra Ltd",
      contractorId: "CON-KL-409",
      amountCr: "2.75",
      riskScore: 88,
      riskLevel: "high",
      tags: ["Equipment Markup 2.3x", "90% Advance Day 3", "Shell Subcontractor"],
      sanctionDate: "19 Feb 2024",
      status: "Forensic Audit Active",
      leadInvestigator: "K. Muraleedharan",
      primaryAnomaly: "Medical equipment invoiced at 230% of standard GEM portal prices; 90% advance released on day 3."
    },
    {
      id: "MPLAD-4112",
      name: "Deep Borewell Network & Solar Desalination Units",
      district: "Barmer, Rajasthan",
      state: "RJ",
      mpConstituency: "Barmer",
      contractor: "Marwar Water Works",
      contractorId: "CON-RJ-311",
      amountCr: "5.60",
      riskScore: 86,
      riskLevel: "high",
      tags: ["Ghost Borewell Coords", "Shared IFSC Cluster", "Pre-Poll Rush"],
      sanctionDate: "28 Jan 2024",
      status: "Vigilance Notice Issued",
      leadInvestigator: "Rajendra Bhati",
      primaryAnomaly: "Geo-tagged photo coordinates match barren sand dunes with no water pump machinery installed."
    },
    {
      id: "MPLAD-5290",
      name: "High School Digital Lab & Smart Classrooms Phase 1",
      district: "Pune, Maharashtra",
      state: "MH",
      mpConstituency: "Haveli-Pune",
      contractor: "Sahyadri Tech Solutions",
      contractorId: "CON-MH-552",
      amountCr: "1.95",
      riskScore: 82,
      riskLevel: "high",
      tags: ["Hardware Markup 180%", "Debarred Vendor", "Fake AMC Bond"],
      sanctionDate: "15 Mar 2024",
      status: "Inspection Scheduled",
      leadInvestigator: "Pooja Kulkarni",
      primaryAnomaly: "Computers and interactive panels supplied by a vendor debarred from public procurement in 2022."
    },
    {
      id: "MPLAD-6334",
      name: "Panchayat Bhavan Solar Rooftop & CCTV Surveillance Hub",
      district: "Patna, Bihar",
      state: "BR",
      mpConstituency: "Patna Sahib",
      contractor: "M/S Bharat Infracon Corp",
      contractorId: "CON-UP-883",
      amountCr: "3.40",
      riskScore: 79,
      riskLevel: "high",
      tags: ["Repeat Tender Monopoly", "SqFt Cost +92%", "Ghost Subcontract"],
      sanctionDate: "02 Feb 2024",
      status: "Evidence Corroborated",
      leadInvestigator: "Dr. S. K. Ramanathan",
      primaryAnomaly: "Awarded to Bharat Infracon without competitive e-procurement; cost per sq.ft is 92% above PWD schedule."
    },
    {
      id: "MPLAD-7819",
      name: "Tribal Skill Development Center & Handicraft Sheds",
      district: "Ranchi, Jharkhand",
      state: "JH",
      mpConstituency: "Ranchi",
      contractor: "Birsa Infra Ventures",
      contractorId: "CON-JH-119",
      amountCr: "4.10",
      riskScore: 75,
      riskLevel: "med",
      tags: ["100% Subcontracted", "Spoofed Biometrics", "Material Variance"],
      sanctionDate: "21 Dec 2023",
      status: "Under Clarification",
      leadInvestigator: "S. N. Soren",
      primaryAnomaly: "100% of execution subcontracted to unregistered third-party entity contrary to tender Clause 14."
    }
  ],

  // Screen 2 & Screen 5: Active Case File Deep-Dive
  caseFile: {
    projectCode: "MPLAD-1024",
    title: "Road Construction Phase II (Shivpur-Rohania Link)",
    district: "Varanasi (UP)",
    constituency: "Varanasi Parliamentary Constituency",
    implementingAgency: "DRDA Varanasi / PWD Circle 3",
    sanctionDate: "12 Jan 2024",
    sanctionedAmount: "₹4,85,00,000",
    disbursedAmount: "₹4,85,00,000 (100%)",
    physicalProgress: "38%",
    riskScore: 94,
    riskLevel: "HIGH RISK",
    stampText: "HIGH RISK — PRIORITY 1",
    contractorName: "M/S Bharat Infracon Corp",
    contractorGstin: "09AAACB4910K1ZT",
    nodalOfficer: "Er. V. K. Tripathi (Superintending Engineer, Circle 3)",
    
    // Expenditure horizontal ruler comparison
    expenditureComparison: [
      {
        label: "This Project (MPLAD-1024)",
        costPerUnit: "₹1.42 Cr / km",
        totalAmount: "₹4.85 Cr",
        percent: 94,
        isTarget: true,
        alert: "Exceeds norms by +76.5%"
      },
      {
        label: "District Average (Varanasi Roads)",
        costPerUnit: "₹0.81 Cr / km",
        totalAmount: "₹2.75 Cr",
        percent: 54,
        isTarget: false
      },
      {
        label: "State CPWD Normative Rate",
        costPerUnit: "₹0.72 Cr / km",
        totalAmount: "₹2.45 Cr",
        percent: 48,
        isTarget: false
      }
    ],

    // ECG Heartbeat Timeline
    timelineEvents: [
      {
        id: "M1",
        label: "Admin Sanction",
        date: "12 Jan 2024",
        gapDays: 0,
        status: "normal",
        note: "Initial proposal approved by District Planning Committee"
      },
      {
        id: "M2",
        label: "Tender Published",
        date: "28 Jan 2024",
        gapDays: 16,
        status: "normal",
        note: "Limited e-tender published on state portal"
      },
      {
        id: "M3",
        label: "Work Order Issued",
        date: "14 Feb 2024",
        gapDays: 17,
        status: "normal",
        note: "Awarded to M/S Bharat Infracon (Sole technical bidder)"
      },
      {
        id: "M4",
        label: "100% Fund Disbursed",
        date: "01 Mar 2024",
        gapDays: 16,
        status: "anomalous",
        anomalyTag: "16 days vs. 120–180 day norm ⚠",
        note: "Entire sanction disbursed prior to inspection milestone"
      },
      {
        id: "M5",
        label: "Completion Cert Issued",
        date: "15 Mar 2024",
        gapDays: 14,
        status: "anomalous",
        anomalyTag: "14 days for 4.2 km road ⚠",
        note: "Certified 100% complete despite ground progress of only 38%"
      }
    ],

    // Monospace Terminal Insights
    terminalInsights: [
      "> AUDIT ENGINE v4.2.8 INITIATED ON CASE FILE MPLAD-1024",
      "> Project cost is 1.76x higher than Varanasi district median (₹1.42 Cr/km vs ₹0.81 Cr/km).",
      "> Milestone M3 -> M4 executed in 16 days against national statutory norm of 145 days.",
      "> Entity 'M/S Bharat Infracon' shares registered address with 3 competing bidders (GSTIN: 09AAACB4910K1ZT).",
      "> ISRO Bhuvan satellite NDVI multispectral scan shows 0% asphalt cover at 25.3176°N, 82.9739°E.",
      "> Bank transfer trail: 62% of advance moved to shell firm 'Shree Ganesh Earthmovers' within 48h.",
      "> RECOMMENDATION: Freeze account #7721099238 at SBI Main Branch and issue CAG Section 14 notice."
    ],

    // Screen 5 Case Board Evidence Cards
    evidenceCards: [
      {
        id: "ev-1",
        title: "EXPENDITURE ANOMALY",
        severity: "high",
        stat: "+76.5% OVERRUN",
        detail: "Invoiced at ₹1.42 Cr/km vs ₹0.81 Cr/km district average. ₹2.10 Cr unverified cost inflation.",
        type: "financial",
        pinColor: "#EF4444"
      },
      {
        id: "ev-2",
        title: "TIMELINE COMPRESSION",
        severity: "high",
        stat: "16-DAY PAYOUT",
        detail: "100% fund disbursement released in 16 days. Average execution cycle in UP is 145 days.",
        type: "timeline",
        pinColor: "#EF4444"
      },
      {
        id: "ev-3",
        title: "CONTRACTOR MONOPOLY",
        severity: "high",
        stat: "14 OF 15 BIDS WON",
        detail: "Bharat Infracon won 93.3% of tenders under DRDA Circle 3 during FY 2023-24 with zero price negotiation.",
        type: "contractor",
        pinColor: "#F59E0B"
      },
      {
        id: "ev-4",
        title: "SHELL SYNDICATE LINK",
        severity: "high",
        stat: "COMMON GST OFFICE",
        detail: "Registered address 42-B Lahartara shared with 3 competing bidders; bank signatory is Nodal Officer's nephew.",
        type: "cartel",
        pinColor: "#EF4444"
      }
    ],

    relatedLeads: [
      {
        id: "lead-1",
        code: "MPLAD-1019",
        title: "Shivpur Drainage Culvert",
        contractor: "Shree Ganesh Earthmovers",
        amount: "₹1.20 Cr",
        risk: "HIGH (91)",
        reason: "Subcontractor shell entity"
      },
      {
        id: "lead-2",
        code: "MPLAD-6334",
        title: "Patna Solar CCTV Hub",
        contractor: "M/S Bharat Infracon",
        amount: "₹3.40 Cr",
        risk: "HIGH (79)",
        reason: "Same contractor, duplicate GST bill"
      },
      {
        id: "lead-3",
        code: "MPLAD-1088",
        title: "Varanasi Community Center",
        contractor: "Eastern Infra Consortium",
        amount: "₹2.10 Cr",
        risk: "MED (68)",
        reason: "Common director DIN link"
      }
    ]
  },

  // Screen 3: Contractor Network Hero Visualization
  contractorNetwork: {
    selectedContractor: {
      id: "CON-UP-883",
      name: "M/S Bharat Infracon Corp",
      directors: ["Rajiv K. Gupta", "Sunil V. Tripathi"],
      gstin: "09AAACB4910K1ZT",
      pan: "AAACB4910K",
      riskScore: 96,
      riskTier: "high",
      totalProjectsWon: 28,
      totalValueCr: "118.40",
      flaggedProjectsCount: 14,
      flaggedAmountCr: "64.80",
      trendDelta: "+4 projects (Q1 2024)",
      trendType: "worsening"
    },
    
    // Orbital Graph Nodes
    nodes: [
      { id: "hub", label: "M/S Bharat Infracon Corp", role: "Primary Target Entity", type: "contractor", risk: "high", score: 96, radius: 36, x: 0, y: 0, fixed: true },
      { id: "proj-1", label: "Shivpur-Rohania Road (MPLAD-1024)", role: "High-Risk Project", type: "project", risk: "high", score: 94, radius: 24, orbit: 160, angle: 0.2 },
      { id: "proj-2", label: "Patna Solar CCTV Hub (MPLAD-6334)", role: "High-Risk Project", type: "project", risk: "high", score: 79, radius: 20, orbit: 180, angle: 1.4 },
      { id: "proj-3", label: "Varanasi Drainage Channel Ph-1", role: "Flagged Project", type: "project", risk: "high", score: 86, radius: 19, orbit: 220, angle: 2.7 },
      { id: "proj-4", label: "Gorakhpur Bypass Service Link", role: "Flagged Project", type: "project", risk: "med", score: 68, radius: 17, orbit: 190, angle: 3.9 },
      { id: "proj-5", label: "Ranchi Paving Project (MPLAD-7819)", role: "Monitored Project", type: "project", risk: "low", score: 28, radius: 14, orbit: 240, angle: 5.1 },
      
      // Connected Entities / Shells / Officers
      { id: "shell-1", label: "Shree Ganesh Earthmovers", role: "Shell Subcontractor", type: "shell", risk: "high", score: 92, radius: 22, orbit: 260, angle: 0.9 },
      { id: "officer-1", label: "Er. V. K. Tripathi (PWD SE)", role: "Nodal Approving Officer", type: "officer", risk: "high", score: 90, radius: 20, orbit: 280, angle: 2.1 },
      { id: "sister-1", label: "Eastern Infra Consortium", role: "Cartel Sister Firm", type: "sister", risk: "high", score: 88, radius: 21, orbit: 250, angle: 3.4 },
      { id: "vendor-1", label: "Apex Cement & Bitumen Corp", role: "Inflated Material Supplier", type: "vendor", risk: "med", score: 64, radius: 16, orbit: 290, angle: 4.5 },
      { id: "dist-1", label: "DRDA Varanasi Nodal Cell", role: "Public Implementing Agency", type: "agency", risk: "low", score: 18, radius: 16, orbit: 310, angle: 5.8 }
    ],

    // Edges with fund transfer and cartel relationships
    edges: [
      { from: "hub", to: "proj-1", label: "₹4.85 Cr Sanction", flow: 1.0, risk: "high" },
      { from: "hub", to: "proj-2", label: "₹3.40 Cr Award", flow: 0.8, risk: "high" },
      { from: "hub", to: "proj-3", label: "₹2.90 Cr Award", flow: 0.7, risk: "high" },
      { from: "hub", to: "proj-4", label: "₹1.75 Cr Award", flow: 0.5, risk: "med" },
      { from: "hub", to: "proj-5", label: "₹0.95 Cr Sub", flow: 0.3, risk: "low" },
      
      { from: "hub", to: "shell-1", label: "₹3.01 Cr Kickback Diverted", flow: 0.9, risk: "high", dashed: true },
      { from: "hub", to: "officer-1", label: "Kinship & Direct Approval", flow: 0.6, risk: "high", dotted: true },
      { from: "hub", to: "sister-1", label: "Shared GSTIN & Directors", flow: 0.8, risk: "high", dashed: true },
      { from: "proj-1", to: "vendor-1", label: "Over-invoiced ₹1.10 Cr", flow: 0.5, risk: "med" },
      { from: "officer-1", to: "dist-1", label: "Administrative Control", flow: 0.4, risk: "low" }
    ],

    // Right-hand ranked contractor risk table
    contractorRanking: [
      { rank: 1, name: "M/S Bharat Infracon Corp", score: 96, delta: "+4", deltaType: "up-red", district: "Varanasi / UP", amountCr: "118.4" },
      { rank: 2, name: "Om Sai Infratech Pvt Ltd", score: 91, delta: "+2", deltaType: "up-red", district: "Gorakhpur / UP", amountCr: "76.2" },
      { rank: 3, name: "Marwar Water Works", score: 89, delta: "+5", deltaType: "up-red", district: "Barmer / RJ", amountCr: "64.0" },
      { rank: 4, name: "Apex Health Infra Ltd", score: 87, delta: "-1", deltaType: "down-green", district: "Wayanad / KL", amountCr: "42.8" },
      { rank: 5, name: "Sahyadri Tech Solutions", score: 82, delta: "+1", deltaType: "up-red", district: "Pune / MH", amountCr: "31.5" },
      { rank: 6, name: "Birsa Infra Ventures", score: 75, delta: "0", deltaType: "same-gray", district: "Ranchi / JH", amountCr: "28.9" },
      { rank: 7, name: "Ganga Basin Utilities", score: 68, delta: "-2", deltaType: "down-green", district: "Patna / BR", amountCr: "24.1" },
      { rank: 8, name: "Deccan Power & Infra", score: 34, delta: "0", deltaType: "same-gray", district: "Hyderabad / TS", amountCr: "55.0" },
      { rank: 9, name: "Kerala Health Systems", score: 22, delta: "-3", deltaType: "down-green", district: "Kozhikode / KL", amountCr: "19.4" }
    ],

    // Timeline Scrubber Quarters
    timelineQuarters: [
      { id: "2023-Q1", label: "Q1 2023", projectCount: 4, totalCr: "14.2", riskAvg: 42 },
      { id: "2023-Q2", label: "Q2 2023", projectCount: 7, totalCr: "26.8", riskAvg: 58 },
      { id: "2023-Q3", label: "Q3 2023", projectCount: 11, totalCr: "44.5", riskAvg: 72 },
      { id: "2023-Q4", label: "Q4 2023", projectCount: 16, totalCr: "68.2", riskAvg: 84 },
      { id: "2024-Q1", label: "Q1 2024 (Active)", projectCount: 28, totalCr: "118.4", riskAvg: 96 }
    ]
  },

  // Screen 4: District Risk Heatmap Matrix
  districtHeatmap: {
    selectedDistrict: {
      name: "Varanasi District",
      state: "Uttar Pradesh",
      mpName: "Varanasi PC",
      riskScore: 89,
      riskLevel: "HIGH RISK",
      burnIntensity: "high",
      totalProjects: 142,
      highRiskCount: 18,
      medRiskCount: 34,
      lowRiskCount: 90,
      totalSanctionCr: "42.80",
      flaggedAmountCr: "14.90",
      topRiskFactors: [
        { label: "Contractor Cartelization (Top 2 firms hold 72% funds)", severity: "high" },
        { label: "Inflated Road Tariffs (+76% above CPWD Schedule)", severity: "high" },
        { label: "Ghost Completion Certs (38% physical progress vs 100% payout)", severity: "high" },
        { label: "Rapid Year-End Fund Release (42% in final 15 days)", severity: "med" }
      ],
      recentFlaggedList: [
        { code: "MPLAD-1024", title: "Shivpur-Rohania Road Ph II", amount: "₹4.85 Cr", risk: 94 },
        { code: "MPLAD-1019", title: "Shivpur Drainage Culvert", amount: "₹1.20 Cr", risk: 91 },
        { code: "MPLAD-1088", title: "Varanasi Community Center", amount: "₹2.10 Cr", risk: 68 }
      ]
    },

    // Matrix of interactive district hexes across India
    districts: [
      { id: "d-varanasi", name: "Varanasi", state: "UP", score: 89, risk: "high", q: 6, r: 4, projects: 142, highCount: 18, amountCr: "42.8" },
      { id: "d-gorakhpur", name: "Gorakhpur", state: "UP", score: 84, risk: "high", q: 7, r: 3, projects: 118, highCount: 14, amountCr: "38.2" },
      { id: "d-barmer", name: "Barmer", state: "RJ", score: 82, risk: "high", q: 2, r: 4, projects: 94, highCount: 12, amountCr: "31.4" },
      { id: "d-patna", name: "Patna", state: "BR", score: 79, risk: "high", q: 8, r: 4, projects: 130, highCount: 15, amountCr: "46.0" },
      { id: "d-wayanad", name: "Wayanad", state: "KL", score: 74, risk: "high", q: 3, r: 9, projects: 68, highCount: 9, amountCr: "18.5" },
      
      { id: "d-ranchi", name: "Ranchi", state: "JH", score: 68, risk: "med", q: 7, r: 5, projects: 88, highCount: 6, amountCr: "24.6" },
      { id: "d-pune", name: "Pune", state: "MH", score: 62, risk: "med", q: 3, r: 6, projects: 156, highCount: 8, amountCr: "58.2" },
      { id: "d-sambalpur", name: "Sambalpur", state: "OD", score: 55, risk: "med", q: 7, r: 6, projects: 72, highCount: 4, amountCr: "19.0" },
      { id: "d-jaipur", name: "Jaipur", state: "RJ", score: 51, risk: "med", q: 3, r: 3, projects: 112, highCount: 5, amountCr: "39.4" },
      { id: "d-gwalior", name: "Gwalior", state: "MP", score: 58, risk: "med", q: 4, r: 4, projects: 84, highCount: 6, amountCr: "27.1" },
      { id: "d-guwahati", name: "Kamrup (Guwahati)", state: "AS", score: 63, risk: "med", q: 10, r: 4, projects: 76, highCount: 5, amountCr: "22.8" },
      
      { id: "d-indore", name: "Indore", state: "MP", score: 28, risk: "low", q: 4, r: 5, projects: 96, highCount: 1, amountCr: "32.0" },
      { id: "d-coimbatore", name: "Coimbatore", state: "TN", score: 19, risk: "low", q: 4, r: 9, projects: 84, highCount: 0, amountCr: "29.5" },
      { id: "d-shimla", name: "Shimla", state: "HP", score: 14, risk: "low", q: 4, r: 2, projects: 52, highCount: 0, amountCr: "16.2" },
      { id: "d-ahmedabad", name: "Ahmedabad", state: "GJ", score: 22, risk: "low", q: 2, r: 5, projects: 144, highCount: 2, amountCr: "51.0" },
      { id: "d-mysuru", name: "Mysuru", state: "KA", score: 25, risk: "low", q: 3, r: 8, projects: 78, highCount: 1, amountCr: "26.4" },
      { id: "d-bhubaneswar", name: "Khordha (Bhubaneswar)", state: "OD", score: 31, risk: "low", q: 8, r: 6, projects: 90, highCount: 1, amountCr: "30.1" },
      { id: "d-chandigarh", name: "Chandigarh", state: "UT", score: 12, risk: "low", q: 4, r: 1, projects: 38, highCount: 0, amountCr: "14.0" },
      { id: "d-nagpur", name: "Nagpur", state: "MH", score: 36, risk: "low", q: 5, r: 5, projects: 102, highCount: 2, amountCr: "35.2" },
      { id: "d-visakhapatnam", name: "Visakhapatnam", state: "AP", score: 29, risk: "low", q: 6, r: 7, projects: 88, highCount: 1, amountCr: "31.8" }
    ]
  },

  // Screen 6: Tamper-Proof Audit Trail / Blockchain Ledger
  auditLedger: {
    chainStatus: "VERIFIED",
    totalBlocks: 14892,
    lastVerified: "0.4s ago (Auto-Block Polling)",
    merkleRoot: "0x98f4e201bb874a91c0e39401dd892fa4492c10aa",
    blocks: [
      {
        blockNum: 14892,
        timestamp: "05 SEP 2026 14:32:08 IST",
        auditor: "Dr. S. K. Ramanathan (Lead Auditor, MoSPI)",
        action: "FLAGGED_ANOMALY_ESCALATION",
        projectId: "MPLAD-1024",
        details: "Attached ISRO Bhuvan satellite NDVI multispectral confirmation showing 0% asphalt cover on Shivpur link.",
        prevHash: "0x3f7a892b91c0e812d4a51189c92e718b42a99182",
        blockHash: "0x8f2a66b910e14a899c34109db8120e8841a29910",
        verified: true,
        riskTier: "high"
      },
      {
        blockNum: 14891,
        timestamp: "05 SEP 2026 11:18:44 IST",
        auditor: "CAG Forensic Intelligence Unit (HQ-04)",
        action: "CARTEL_SYNDICATE_CONFIRMED",
        projectId: "MPLAD-1024 / CON-UP-883",
        details: "Corroborated 3 competing bidders share identical registered GST address at 42-B Lahartara.",
        prevHash: "0x91d4e08b1a329f7728a00192e441c99831a00219",
        blockHash: "0x3f7a892b91c0e812d4a51189c92e718b42a99182",
        verified: true,
        riskTier: "high"
      },
      {
        blockNum: 14890,
        timestamp: "04 SEP 2026 16:55:12 IST",
        auditor: "Dr. S. K. Ramanathan (Lead Auditor)",
        action: "CASE_FILE_OPENED",
        projectId: "MPLAD-1024",
        details: "Initiated deep-dive case review following AI Risk Radar score spike to 94/100.",
        prevHash: "0x44ab0192ef99821431c0e892d1928374a81920b1",
        blockHash: "0x91d4e08b1a329f7728a00192e441c99831a00219",
        verified: true,
        riskTier: "high"
      },
      {
        blockNum: 14889,
        timestamp: "03 SEP 2026 09:22:31 IST",
        auditor: "AI Anomaly Radar Daemon (Worker-08)",
        action: "TIMELINE_ANOMALY_TRIGGER",
        projectId: "MPLAD-1024",
        details: "Z-score alert: Milestone 3->4 100% fund release executed in 16 days (Z = +4.12 vs national mean).",
        prevHash: "0x77ee2910a44b9102c91829001b928374182930a4",
        blockHash: "0x44ab0192ef99821431c0e892d1928374a81920b1",
        verified: true,
        riskTier: "high"
      },
      {
        blockNum: 14888,
        timestamp: "02 SEP 2026 18:40:02 IST",
        auditor: "Anita Sharma (Sr. Auditor)",
        action: "DUPLICATE_GST_FLAG",
        projectId: "MPLAD-2041",
        details: "Flagged duplicate invoice #GST-UP-9921 submitted by Om Sai Infratech in Gorakhpur.",
        prevHash: "0x12bb993041ea992019c04918273645a82910029b",
        blockHash: "0x77ee2910a44b9102c91829001b928374182930a4",
        verified: true,
        riskTier: "high"
      },
      {
        blockNum: 14887,
        timestamp: "01 SEP 2026 10:05:19 IST",
        auditor: "Consensus Engine (MoSPI / NIC / CAG)",
        action: "MERKLE_EPOCH_ROOT_COMMITTED",
        projectId: "GLOBAL_STATE",
        details: "Epoch 88419 cryptographic state hash validated across all 3 validator nodes with 100% quorum.",
        prevHash: "0x890123efab99120934c891027162534a8190291c",
        blockHash: "0x12bb993041ea992019c04918273645a82910029b",
        verified: true,
        riskTier: "low"
      }
    ]
  }
};
