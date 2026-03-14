export function ScanningLoader({ text = "Analyzing data streams..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
        <div className="scanning-bar h-full w-1/3" />
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{text}</p>
    </div>
  );
}
