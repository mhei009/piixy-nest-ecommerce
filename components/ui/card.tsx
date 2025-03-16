
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div
        className={`bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg ${className}`}
      >
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="text-center">{children}</div>;
  }
  