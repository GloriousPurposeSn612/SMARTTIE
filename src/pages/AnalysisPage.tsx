import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { ScanningLoader } from "@/components/ScanningLoader";
import { findTreatment, type Treatment } from "@/lib/mockData";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, ChevronRight, Sparkles, AlertTriangle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

export default function AnalysisPage() {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState("");

  useEffect(() => {
    setLoading(true);
    setShowTypewriter(false);
    setDisplayedSummary("");
    const timer = setTimeout(() => {
      const t = findTreatment(query || "");
      setTreatment(t);
      setLoading(false);
      if (t) setShowTypewriter(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [query]);

  // Typewriter effect
  useEffect(() => {
    if (!showTypewriter || !treatment) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedSummary(treatment.summary.slice(0, i + 1));
      i++;
      if (i >= treatment.summary.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [showTypewriter, treatment]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="pb-16">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-8">Analyzing: {decodeURIComponent(query || "")}</h1>
          <ScanningLoader text={`Scanning ${Math.floor(2000 + Math.random() * 6000)} data points...`} />
        </div>
      </DashboardLayout>
    );
  }

  if (!treatment) {
    return (
      <DashboardLayout>
        <div className="pb-16 text-center py-20">
          <p className="text-muted-foreground">No data found for "{decodeURIComponent(query || "")}"</p>
          <button onClick={() => navigate("/dashboard")} className="mt-4 text-primary font-mono text-sm hover:underline">
            Return to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const confidencePercent = Math.round(treatment.confidence * 100);

  return (
    <DashboardLayout>
      <div className="pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-3xl font-bold tracking-tight">{treatment.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primary px-2 py-1 rounded bg-primary/10">{treatment.category}</span>
              <span className="text-xs font-mono text-muted-foreground font-tabular">{confidencePercent}% confidence</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono border transition-colors ${saved ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:border-primary/30'}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-primary' : ''}`} />
              {saved ? "Saved" : "Save"}
            </button>
            <Link
              to={`/trajectory/${treatment.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Trajectory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* AI Summary */}
        <DataCard title="AI-Generated Summary" subtitle={`Analysis complete. ${Math.floor(2000 + Math.random() * 6000).toLocaleString()} data points synthesized.`} delay={0.1}>
          <div className="mt-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {displayedSummary}
                {displayedSummary.length < treatment.summary.length && (
                  <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
                )}
              </p>
            </div>
          </div>
        </DataCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Timeline */}
          <DataCard title="Treatment Timeline" subtitle="Key milestones identified" delay={0.2}>
            <div className="mt-4 space-y-4">
              {treatment.timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5" />
                    {i < treatment.timeline.length - 1 && <div className="w-px h-8 bg-border mt-1" />}
                  </div>
                  <p className="text-sm">{t}</p>
                </motion.div>
              ))}
            </div>
          </DataCard>

          {/* Side Effects */}
          <DataCard title="Side Effect Probability" subtitle="Population-weighted analysis" delay={0.3}>
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={treatment.sideEffects} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} stroke="#444" fontSize={10} />
                  <YAxis type="category" dataKey="name" width={120} stroke="#444" fontSize={10} tick={{ fill: "hsl(210 20% 85%)" }} />
                  <Tooltip
                    formatter={(v: number) => `${Math.round(v * 100)}%`}
                    contentStyle={{ backgroundColor: "#0A0C10", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    itemStyle={{ color: "#4FD1C5" }}
                  />
                  <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                    {treatment.sideEffects.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "hsl(174 60% 56%)" : i === 1 ? "hsl(174 60% 56% / 0.7)" : "hsl(174 60% 56% / 0.4)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DataCard>
        </div>

        {/* Sentiment Preview */}
        <DataCard title="Sentiment Trajectory Preview" subtitle="Patient sentiment over treatment period" delay={0.4} className="mt-6">
          <div className="mt-4 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={treatment.trajectory}>
                <defs>
                  <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174 60% 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174 60% 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#444" fontSize={10} tickFormatter={(v) => `Day ${v}`} />
                <YAxis stroke="#444" fontSize={10} domain={[-1, 1]} tickFormatter={(v) => v > 0 ? "+" + v : v} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0A0C10", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#4FD1C5" }}
                  labelFormatter={(v) => `Day ${v}`}
                  formatter={(v: number) => [v.toFixed(2), "Sentiment"]}
                />
                <Area type="monotone" dataKey="sentiment" stroke="hsl(174 60% 56%)" fillOpacity={1} fill="url(#colorSentiment)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={`/trajectory/${treatment.id}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
            >
              View full trajectory analysis <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </DataCard>

        {/* Patient Quotes */}
        <DataCard title="Patient Signals" subtitle="Sampled from public discussions" delay={0.5} className="mt-6">
          <div className="mt-4 space-y-3">
            {treatment.patientQuotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-lg bg-secondary border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-primary font-tabular">DAY {q.day}</span>
                  <AlertTriangle className="w-3 h-3 text-warning" />
                </div>
                <p className="text-sm italic text-muted-foreground">"{q.text}"</p>
              </motion.div>
            ))}
          </div>
        </DataCard>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-mono text-sm hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" /> Generate New Insight
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
