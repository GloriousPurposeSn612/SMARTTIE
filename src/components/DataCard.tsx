import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DataCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function DataCard({ title, subtitle, children, className = "", delay = 0 }: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={`glass-card p-6 group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      {title && (
        <div className="mb-4 relative z-10">
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
