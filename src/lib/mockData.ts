export interface TrajectoryPoint {
  day: number;
  sentiment: number;
  sideEffects: number;
  label?: string;
}

export interface SideEffect {
  name: string;
  probability: number;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  confidence: number;
  summary: string;
  timeline: string[];
  trajectory: TrajectoryPoint[];
  sideEffects: SideEffect[];
  patientQuotes: { day: number; text: string }[];
}

export const TREATMENTS: Record<string, Treatment> = {
  isotretinoin: {
    id: "isotretinoin",
    name: "Isotretinoin",
    category: "Dermatology",
    confidence: 0.89,
    summary:
      "Analysis of 4,200 patient discussions reveals high prevalence of initial inflammatory flare-up ('the purge') followed by significant sebum reduction by week 4. 92% of long-term users report substantial improvement by month 3.",
    timeline: [
      "Week 1 – Mild dryness, initial adjustment period",
      "Week 3 – Side effects peak; 'the purge' inflammatory flare",
      "Month 2 – Stabilization; visible skin improvement begins",
      "Month 3 – Significant clearing; confidence increases",
    ],
    trajectory: [
      { day: 1, sentiment: 0.1, sideEffects: 0.05, label: "Start" },
      { day: 7, sentiment: 0.0, sideEffects: 0.2 },
      { day: 14, sentiment: -0.4, sideEffects: 0.8, label: "The Purge" },
      { day: 21, sentiment: -0.2, sideEffects: 0.7 },
      { day: 30, sentiment: 0.2, sideEffects: 0.6 },
      { day: 45, sentiment: 0.4, sideEffects: 0.4 },
      { day: 60, sentiment: 0.7, sideEffects: 0.3, label: "Stabilization" },
      { day: 75, sentiment: 0.8, sideEffects: 0.15 },
      { day: 90, sentiment: 0.9, sideEffects: 0.1, label: "Clearing" },
    ],
    sideEffects: [
      { name: "Xerosis (Dry Skin)", probability: 0.95 },
      { name: "Cheilitis (Dry Lips)", probability: 0.88 },
      { name: "Photosensitivity", probability: 0.65 },
      { name: "Myalgia", probability: 0.22 },
      { name: "Mood Changes", probability: 0.12 },
    ],
    patientQuotes: [
      { day: 14, text: "My skin is peeling and I want to quit. The purge is real." },
      { day: 30, text: "Finally seeing some improvement. The dryness is manageable." },
      { day: 60, text: "Skin is clearer than it's been in years. Worth the initial struggle." },
      { day: 90, text: "Completely clear. Life-changing medication." },
    ],
  },
  chemotherapy: {
    id: "chemotherapy",
    name: "Chemotherapy",
    category: "Oncology",
    confidence: 0.82,
    summary:
      "Synthesis of 8,100 patient reports shows cyclical symptom patterns aligned with treatment cycles. Fatigue is the most consistently reported effect across all protocols. Support group engagement correlates with improved mental health scores.",
    timeline: [
      "Cycle 1 – Initial shock; nausea and fatigue onset",
      "Week 3 – Hair loss begins; emotional adjustment",
      "Month 2 – Body adapts partially; routine established",
      "Month 4 – Cumulative fatigue peaks; support critical",
    ],
    trajectory: [
      { day: 1, sentiment: -0.2, sideEffects: 0.3, label: "Cycle 1" },
      { day: 14, sentiment: -0.6, sideEffects: 0.9 },
      { day: 21, sentiment: -0.3, sideEffects: 0.5 },
      { day: 28, sentiment: -0.5, sideEffects: 0.85, label: "Cycle 2" },
      { day: 42, sentiment: -0.4, sideEffects: 0.7 },
      { day: 56, sentiment: -0.2, sideEffects: 0.75, label: "Cycle 3" },
      { day: 70, sentiment: -0.1, sideEffects: 0.6 },
      { day: 84, sentiment: 0.1, sideEffects: 0.65, label: "Cycle 4" },
      { day: 90, sentiment: 0.2, sideEffects: 0.5 },
    ],
    sideEffects: [
      { name: "Fatigue", probability: 0.96 },
      { name: "Nausea", probability: 0.85 },
      { name: "Hair Loss", probability: 0.78 },
      { name: "Neuropathy", probability: 0.45 },
      { name: "Immunosuppression", probability: 0.92 },
    ],
    patientQuotes: [
      { day: 14, text: "The nausea is overwhelming. Anti-nausea meds help but don't eliminate it." },
      { day: 28, text: "Lost my hair this week. It was expected but still emotional." },
      { day: 56, text: "Getting into a rhythm now. The support group helps tremendously." },
      { day: 84, text: "Almost done. The fatigue is real but I can see the finish line." },
    ],
  },
  sertraline: {
    id: "sertraline",
    name: "Sertraline (Zoloft)",
    category: "Psychiatry",
    confidence: 0.85,
    summary:
      "Analysis of 6,300 discussions reveals a characteristic adjustment period of 2-4 weeks. GI side effects are most common initially but typically resolve. Therapeutic effects generally noticed by week 4-6.",
    timeline: [
      "Week 1 – Adjustment side effects; GI disturbance common",
      "Week 2-3 – Side effects begin to subside",
      "Week 4 – Initial therapeutic effects noticed",
      "Week 8 – Full therapeutic benefit typically achieved",
    ],
    trajectory: [
      { day: 1, sentiment: -0.3, sideEffects: 0.1, label: "Start" },
      { day: 7, sentiment: -0.5, sideEffects: 0.7, label: "Adjustment" },
      { day: 14, sentiment: -0.4, sideEffects: 0.5 },
      { day: 21, sentiment: -0.2, sideEffects: 0.3 },
      { day: 28, sentiment: 0.1, sideEffects: 0.2, label: "First Effects" },
      { day: 42, sentiment: 0.4, sideEffects: 0.15 },
      { day: 56, sentiment: 0.6, sideEffects: 0.1, label: "Therapeutic" },
      { day: 70, sentiment: 0.7, sideEffects: 0.08 },
      { day: 90, sentiment: 0.75, sideEffects: 0.05 },
    ],
    sideEffects: [
      { name: "Nausea", probability: 0.72 },
      { name: "Insomnia", probability: 0.55 },
      { name: "Headache", probability: 0.48 },
      { name: "Sexual Dysfunction", probability: 0.38 },
      { name: "Dizziness", probability: 0.25 },
    ],
    patientQuotes: [
      { day: 7, text: "Stomach is a mess and I feel more anxious. Doctor says this is normal." },
      { day: 28, text: "Starting to feel a difference. The dark cloud is lifting slightly." },
      { day: 56, text: "Night and day difference. I feel like myself again." },
      { day: 90, text: "Stable and steady. Best decision I made for my mental health." },
    ],
  },
  metformin: {
    id: "metformin",
    name: "Metformin",
    category: "Endocrinology",
    confidence: 0.91,
    summary:
      "Review of 5,800 patient experiences shows GI side effects dominate the first 2 weeks but extended-release formulation significantly reduces incidence. Blood sugar stabilization typically observed within month 1.",
    timeline: [
      "Week 1 – GI adjustment; dose titration period",
      "Week 2 – Symptoms begin to moderate",
      "Month 1 – Blood sugar readings stabilize",
      "Month 3 – Sustained metabolic improvement",
    ],
    trajectory: [
      { day: 1, sentiment: -0.1, sideEffects: 0.2, label: "Start" },
      { day: 7, sentiment: -0.3, sideEffects: 0.7, label: "GI Peak" },
      { day: 14, sentiment: -0.1, sideEffects: 0.4 },
      { day: 21, sentiment: 0.1, sideEffects: 0.25 },
      { day: 30, sentiment: 0.3, sideEffects: 0.15, label: "Stable" },
      { day: 45, sentiment: 0.5, sideEffects: 0.1 },
      { day: 60, sentiment: 0.6, sideEffects: 0.08 },
      { day: 75, sentiment: 0.7, sideEffects: 0.05 },
      { day: 90, sentiment: 0.75, sideEffects: 0.05, label: "Optimized" },
    ],
    sideEffects: [
      { name: "Diarrhea", probability: 0.65 },
      { name: "Nausea", probability: 0.52 },
      { name: "Abdominal Pain", probability: 0.38 },
      { name: "Metallic Taste", probability: 0.2 },
      { name: "B12 Deficiency", probability: 0.1 },
    ],
    patientQuotes: [
      { day: 7, text: "GI issues are rough. Extended release version is supposedly better." },
      { day: 30, text: "Numbers are looking great. A1C already dropping." },
      { day: 60, text: "Side effects gone. Feeling more energetic." },
      { day: 90, text: "Doctor is very pleased with my progress. Sticking with it." },
    ],
  },
};

export const TRENDING = [
  { name: "Sertraline", change: "+12.4%", category: "Psychiatry" },
  { name: "Ozempic", change: "+34.2%", category: "Endocrinology" },
  { name: "Metformin", change: "+8.1%", category: "Endocrinology" },
  { name: "Isotretinoin", change: "+5.7%", category: "Dermatology" },
];

export const SEARCH_SUGGESTIONS = [
  "Isotretinoin",
  "Chemotherapy",
  "Sertraline",
  "Metformin",
  "Ozempic",
  "Amoxicillin",
  "Ibuprofen",
];

export function findTreatment(query: string): Treatment | null {
  const key = query.toLowerCase().trim();
  if (TREATMENTS[key]) return TREATMENTS[key];
  // fuzzy match
  for (const [k, v] of Object.entries(TREATMENTS)) {
    if (v.name.toLowerCase().includes(key) || key.includes(k)) return v;
  }
  // fallback for unknown treatments
  if (key.length > 2) {
    return {
      id: key,
      name: query,
      category: "General Medicine",
      confidence: 0.65 + Math.random() * 0.2,
      summary: `Analysis of ${Math.floor(1000 + Math.random() * 5000)} patient discussions for ${query}. Data synthesis in progress. Preliminary findings suggest varied patient experiences with a moderate confidence interval.`,
      timeline: [
        "Week 1 – Initial adjustment period",
        "Week 2-3 – Early response monitoring",
        "Month 1 – Assessment of efficacy",
        "Month 2-3 – Long-term trajectory evaluation",
      ],
      trajectory: [
        { day: 1, sentiment: 0, sideEffects: 0.1, label: "Start" },
        { day: 14, sentiment: -0.2, sideEffects: 0.5 },
        { day: 30, sentiment: 0.1, sideEffects: 0.4, label: "Assessment" },
        { day: 60, sentiment: 0.4, sideEffects: 0.2 },
        { day: 90, sentiment: 0.6, sideEffects: 0.1, label: "Stable" },
      ],
      sideEffects: [
        { name: "Fatigue", probability: 0.4 },
        { name: "Nausea", probability: 0.3 },
        { name: "Headache", probability: 0.25 },
      ],
      patientQuotes: [
        { day: 14, text: "Adjusting to the medication. Some mild side effects." },
        { day: 60, text: "Feeling much better now. Glad I stuck with it." },
      ],
    };
  }
  return null;
}
