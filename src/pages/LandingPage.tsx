import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, Brain, BarChart3, Shield, ArrowRight, Zap } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Treatment Summaries", desc: "Transform scattered patient discussions into structured treatment insights using Generative AI." },
  { icon: Activity, title: "Recovery Timeline Modeling", desc: "Visualize real-world treatment trajectories from thousands of patient experiences." },
  { icon: BarChart3, title: "Side Effect Pattern Detection", desc: "Identify probability-weighted side effects across treatment populations." },
  { icon: Shield, title: "Confidence Scoring", desc: "Every insight is backed by statistical confidence derived from data density analysis." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-background rounded-sm" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg">SMARTTIE</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Login
            </Link>
            <Link to="/login?mode=signup" className="text-sm font-mono bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/3 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-6 border border-border rounded-full px-4 py-1.5 bg-secondary/50">
              <Zap className="w-3 h-3" />
              Sequential Medical Analytics Engine
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">SMART</span>
            <span className="text-primary">TIE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-xl sm:text-2xl text-primary font-light mb-4"
          >
            AI-powered treatment journey intelligence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A platform that transforms scattered patient discussions into structured treatment insights 
            using Generative AI. Understand real-world treatment trajectories before they happen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-mono text-sm hover:opacity-90 transition-all"
            >
              Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login?demo=true"
              className="flex items-center gap-2 border border-border bg-secondary text-foreground px-6 py-3 rounded-md font-mono text-sm hover:border-primary transition-colors"
            >
              Try Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Capabilities</p>
            <h2 className="text-3xl font-bold tracking-tight">Intelligence Architecture</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="glass-card p-8 group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "24K+", label: "Discussions Analyzed" },
              { value: "94.2%", label: "AI Accuracy" },
              { value: "1,204", label: "Active Nodes" },
              { value: "<24ms", label: "Latency" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl font-mono font-bold text-primary font-tabular">{s.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Disclaimer: SMARTTIE provides informational insights from public discussions and does not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
