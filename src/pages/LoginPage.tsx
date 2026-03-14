import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState(isDemo ? "demo@smarttie.ai" : "");
  const [password, setPassword] = useState(isDemo ? "demo123" : "");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    if (mode === "login") {
      const ok = await login(email, password);
      if (!ok) setError("Invalid credentials. Try demo@smarttie.ai / demo123");
    } else {
      if (!name) { setError("Name is required."); return; }
      const ok = await signup(email, password, name);
      if (!ok) setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-sm" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-2xl">SMARTTIE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Access your research terminal." : "Initialize a new research account."}
          </p>
        </div>

        <div className="glass-card p-8">
          {/* Demo hint */}
          {mode === "login" && (
            <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs font-mono text-primary">
                DEMO ACCESS: demo@smarttie.ai / demo123
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                  placeholder="Dr. Jane Smith"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="researcher@institution.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-10 text-foreground"
                  placeholder="••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-0.5 bg-primary-foreground/50 rounded overflow-hidden">
                    <span className="scanning-bar block h-full w-1/3" />
                  </span>
                  Authenticating...
                </span>
              ) : mode === "login" ? "Access Terminal" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
