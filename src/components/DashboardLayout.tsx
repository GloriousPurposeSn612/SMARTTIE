import { useAuth } from "@/lib/authContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Search, LogOut, User, BookmarkCheck, History, Bell } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-background rounded-sm" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg">SMARTTIE</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-mono">
            <Link to="/dashboard" className={`transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
              Dashboard
            </Link>
            <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
              History
            </Link>
            <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
              Bookmarks
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-mono text-primary animate-pulse-glow">SYSTEM_READY</span>
            
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <AnimatePresence>
                {showNotif && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-72 glass-card p-4 z-50"
                  >
                    <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Notifications</p>
                    <div className="space-y-2">
                      <div className="text-sm p-2 rounded bg-secondary">
                        <p className="text-foreground">New insight generated</p>
                        <p className="text-xs text-muted-foreground mt-1">Isotretinoin analysis updated</p>
                      </div>
                      <div className="text-sm p-2 rounded bg-secondary">
                        <p className="text-foreground">Trending alert</p>
                        <p className="text-xs text-muted-foreground mt-1">Ozempic discussions +34%</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setShowProfile(!showProfile)} className="w-8 h-8 rounded-full border border-border bg-secondary flex items-center justify-center hover:border-primary transition-colors">
                <User className="w-4 h-4 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-56 glass-card p-3 z-50"
                  >
                    <p className="text-sm font-medium px-2 mb-1">{user?.name}</p>
                    <p className="text-xs text-muted-foreground px-2 mb-3">{user?.email}</p>
                    <div className="border-t border-border pt-2 space-y-1">
                      <button className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-secondary transition-colors flex items-center gap-2">
                        <BookmarkCheck className="w-3.5 h-3.5" /> Saved Analyses
                      </button>
                      <button className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-secondary transition-colors flex items-center gap-2">
                        <History className="w-3.5 h-3.5" /> Search History
                      </button>
                      <button onClick={handleLogout} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-destructive/20 text-destructive transition-colors flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer Disclaimer */}
      <footer className="fixed bottom-0 left-0 w-full p-3 bg-background/80 backdrop-blur-xl border-t border-border">
        <p className="text-[10px] text-center uppercase tracking-widest text-muted-foreground">
          Disclaimer: SMARTTIE provides informational insights from public discussions and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
}
