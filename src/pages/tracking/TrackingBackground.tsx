export const TrackingBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-surface-50">
    {/* Base lighting / radial glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/60 rounded-full blur-[120px] opacity-80" />
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-100/40 rounded-full blur-[100px] opacity-80 -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-[100px] opacity-80 translate-y-1/3 -translate-x-1/3" />

    {/* Map / Routes SVG */}
    <svg className="absolute w-full h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Dot pattern to give a radar/map feel */}
        <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="fill-surface-300/60" />
        </pattern>
        
        {/* Gradient for main active route */}
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className="text-primary-500" />
          <stop offset="100%" stopColor="currentColor" className="text-accent-500" />
        </linearGradient>

        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" className="text-surface-50" stopOpacity="0.6" />
          <stop offset="5%" stopColor="currentColor" className="text-surface-50" stopOpacity="0" />
          <stop offset="95%" stopColor="currentColor" className="text-surface-50" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" className="text-surface-50" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      <g strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Background Routes (Solid but dim) */}
        <path d="M -100 20% Q 30% 10% 50% 40% T 120% 30%" className="stroke-surface-300/60" />
        <path d="M 20% 120% Q 40% 60% 70% 50% T 120% 80%" className="stroke-surface-300/60" />
        <path d="M 120% 10% Q 90% 30% 80% 60% T -10% 80%" className="stroke-surface-300/60" />
        <path d="M 10% -10% Q 20% 40% 60% 60% T 90% 120%" className="stroke-surface-300/60" />

        {/* Animated Cargo Tracks (Dashed moving lines) */}
        {/* Track 1 */}
        <path 
          d="M -100 20% Q 30% 10% 50% 40% T 120% 30%" 
          stroke="url(#routeGradient)"
          strokeWidth="2.5"
          strokeDasharray="4 24"
          className="opacity-80"
        >
          <animate attributeName="stroke-dashoffset" values="28;0" dur="2s" repeatCount="indefinite" />
        </path>

        {/* Track 2 */}
        <path 
          d="M 20% 120% Q 40% 60% 70% 50% T 120% 80%" 
          className="stroke-accent-500 opacity-60"
          strokeWidth="2"
          strokeDasharray="4 30"
        >
          <animate attributeName="stroke-dashoffset" values="34;0" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Track 3 */}
        <path 
          d="M 120% 10% Q 90% 30% 80% 60% T -10% 80%" 
          className="stroke-primary-500 opacity-50"
          strokeWidth="2"
          strokeDasharray="6 40"
        >
          <animate attributeName="stroke-dashoffset" values="0;46" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Connecting network lines */}
        <path d="M 50% 40% L 70% 50%" className="stroke-surface-300/40" strokeDasharray="2 4" />
        <path d="M 70% 50% L 80% 60%" className="stroke-surface-300/40" strokeDasharray="2 4" />
        <path d="M 50% 40% L 80% 60%" className="stroke-surface-300/40" strokeDasharray="2 4" />
      </g>

      {/* Hubs / Node Markers */}
      <g>
        {/* Main Hub */}
        <circle cx="50%" cy="40%" r="5" className="fill-primary-500">
          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="40%" r="15" className="fill-primary-500/15">
          <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Secondary Hubs */}
        <circle cx="70%" cy="50%" r="4" className="fill-accent-500" />
        <circle cx="70%" cy="50%" r="10" className="fill-accent-500/15">
           <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle cx="80%" cy="60%" r="4" className="fill-primary-500" />
        <circle cx="80%" cy="60%" r="10" className="fill-primary-500/15">
           <animate attributeName="r" values="8;16;8" dur="2.5s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="20%" cy="40%" r="3" className="fill-surface-400" />
        <circle cx="60%" cy="60%" r="3" className="fill-surface-400" />
        <circle cx="90%" cy="30%" r="3" className="fill-surface-400" />
      </g>

      {/* Vignette mask to fade out edges */}
      <rect width="100%" height="100%" fill="url(#fadeGradient)" />
    </svg>
  </div>
);
