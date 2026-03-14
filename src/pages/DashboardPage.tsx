import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, Users } from "lucide-react";
import { TRENDING, SEARCH_SUGGESTIONS } from "@/lib/mockData";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (query?: string) => {
    const q = query || search;
    if (q.trim()) {
      navigate(`/analysis/${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-16">
        {/* Greeting */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Welcome, {user?.name?.split(" ")[0] || "Researcher"}
          </h1>
          <p className="text-muted-foreground">Initialize a new treatment trajectory analysis.</p>
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mb-16"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            className="w-full bg-secondary border border-border rounded-2xl py-5 sm:py-6 px-12 text-base sm:text-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
            placeholder='Search treatment (e.g., "Isotretinoin", "Chemotherapy"...)'
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-2">
            <kbd className="bg-muted px-2 py-1 rounded text-xs font-mono text-muted-foreground">⌘</kbd>
            <kbd className="bg-muted px-2 py-1 rounded text-xs font-mono text-muted-foreground">K</kbd>
          </div>

          {showSuggestions && search && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 w-full glass-card p-2 z-40"
            >
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  onMouseDown={() => handleSearch(s)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-sm flex items-center gap-3"
                >
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Trending Treatments" subtitle="Real-time patient sentiment" delay={0.2}>
            <div className="mt-4 space-y-3">
              {TRENDING.map((t) => (
                <button
                  key={t.name}
                  onClick={() => handleSearch(t.name)}
                  className="w-full flex justify-between items-center p-3 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="text-left">
                    <span className="font-medium text-sm">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.category}</span>
                  </div>
                  <span className="text-primary text-xs font-mono font-tabular">{t.change}</span>
                </button>
              ))}
            </div>
          </DataCard>

          <DataCard title="Confidence Engine" subtitle="Global AI Accuracy" delay={0.3}>
            <div className="mt-8 flex flex-col items-center">
              <div className="text-5xl font-mono font-bold text-accent font-tabular">94.2%</div>
              <div className="w-full bg-muted h-1.5 mt-6 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94.2%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 font-mono">24,200 data points synthesized</p>
            </div>
          </DataCard>

          <DataCard title="System Status" delay={0.4}>
            <div className="mt-4 space-y-3 text-xs font-mono">
              {[
                { key: "NODES_ACTIVE", value: "1,204", icon: Users },
                { key: "LATENCY", value: "24ms", icon: Clock },
                { key: "UPTIME", value: "99.97%", icon: TrendingUp },
              ].map((s) => (
                <div key={s.key} className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="w-3.5 h-3.5" />
                    {s.key}
                  </span>
                  <span className="text-primary font-tabular">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                <span className="text-muted-foreground">DATA_STREAMS</span>
                <span className="text-primary">REDDIT, WEBMD, X</span>
              </div>
            </div>
          </DataCard>
        </div>

        {/* Recent Analyses */}
        <div className="mt-12">
          <DataCard title="Recent Analyses" subtitle="Your latest research queries" delay={0.5}>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Isotretinoin", date: "2 hours ago", confidence: "89%" },
                { name: "Sertraline", date: "Yesterday", confidence: "85%" },
                { name: "Metformin", date: "3 days ago", confidence: "91%" },
                { name: "Chemotherapy", date: "1 week ago", confidence: "82%" },
              ].map((a) => (
                <button
                  key={a.name}
                  onClick={() => handleSearch(a.name)}
                  className="flex justify-between items-center p-4 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="text-left">
                    <span className="font-medium text-sm">{a.name}</span>
                    <span className="block text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <span className="text-xs font-mono text-primary font-tabular">{a.confidence}</span>
                </button>
              ))}
            </div>
          </DataCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
