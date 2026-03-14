import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_EMAIL = "demo@smarttie.ai";
const DEMO_PASSWORD = "demo123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("smarttie_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const registeredUsers = JSON.parse(localStorage.getItem("smarttie_users") || "{}");
    
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const u = { email, name: "Demo Researcher" };
      setUser(u);
      sessionStorage.setItem("smarttie_user", JSON.stringify(u));
      setIsLoading(false);
      return true;
    }
    
    if (registeredUsers[email] && registeredUsers[email].password === password) {
      const u = { email, name: registeredUsers[email].name };
      setUser(u);
      sessionStorage.setItem("smarttie_user", JSON.stringify(u));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const registeredUsers = JSON.parse(localStorage.getItem("smarttie_users") || "{}");
    if (registeredUsers[email]) {
      setIsLoading(false);
      return false;
    }
    registeredUsers[email] = { password, name };
    localStorage.setItem("smarttie_users", JSON.stringify(registeredUsers));
    const u = { email, name };
    setUser(u);
    sessionStorage.setItem("smarttie_user", JSON.stringify(u));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("smarttie_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
