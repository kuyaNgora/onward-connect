import { useState, FormEvent, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { TrackingBackground } from "./TrackingBackground";

export default function TrackingPage() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    if (orderNumber.trim().length < 3) {
      setError("Number too short");
      return;
    }

    const trimmedOrderNumber = orderNumber.trim().toUpperCase();
    navigate(`/lacak/${trimmedOrderNumber}`);
  };

  const handleInputChange = (value: string) => {
    setOrderNumber(value);
    if (error) setError("");
  };

  return (
    <>
      <Helmet>
        <title>Lacak Pengiriman | Onward Connect</title>
        <meta
          name="description"
          content="Lacak status pengiriman pesanan Anda dengan mudah"
        />
      </Helmet>

      {/* Beautiful Animated Background */}
      <TrackingBackground />

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative z-10">
        {/* Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-surface-900/80 backdrop-blur-md border border-primary-500/20 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(var(--color-primary-500),0.2)]">
          Order Tracking System
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight text-center drop-shadow-xl">
          Dimana{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
            Pesanan Saya?
          </span>{" "}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-surface-300 max-w-lg mx-auto leading-relaxed text-center mb-10 drop-shadow-md">
          Masukkan nomor order atau resi di bawah untuk melihat perjalanan pesanan
          Anda secara real-time.
        </p>

        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto w-full relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative bg-surface-900/60 backdrop-blur-xl rounded-2xl p-2 sm:p-4 shadow-2xl shadow-black/50 border border-surface-700/50">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-2 relative">
                <div
                  className={`relative flex-1 transition-all duration-300 ${
                    isFocused ? "scale-[1.01]" : ""
                  }`}
                >
                  {/* Search icon */}
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-surface-400">
                    <svg
                      className={`w-5 h-5 transition-colors duration-300 ${isFocused ? "text-primary-400 drop-shadow-[0_0_8px_rgba(var(--color-primary-400),0.5)]" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    value={orderNumber}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Search order number..."
                    className={`w-full pl-12 pr-4 py-4 text-sm font-medium bg-surface-950/50 text-white rounded-xl border-2 transition-all duration-300 outline-none ${
                      error
                        ? "border-red-500/50 bg-red-500/10"
                        : isFocused
                        ? "border-primary-500/40 bg-surface-900/80 ring-4 ring-primary-500/10 shadow-[inner_0_0_20px_rgba(var(--color-primary-500),0.1)]"
                        : "border-surface-700/50 hover:border-surface-600/80"
                    } placeholder:text-surface-500`}
                  />

                  {/* Error message */}
                  {error && (
                     <div className="absolute -top-8 left-0 text-[11px] font-bold text-red-400 uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 backdrop-blur-sm">
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!orderNumber.trim()}
                  className="px-8 py-4 gradient-primary text-white text-sm font-bold rounded-xl shadow-xl shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none whitespace-nowrap"
                >
                  Lacak
                </button>
              </div>

              {/* Examples */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 items-center">
                <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest bg-surface-900/50 px-2 py-0.5 rounded">
                  Examples:
                </span>
                <button
                  type="button"
                  className="text-[11px] font-mono font-medium text-surface-300 hover:text-white bg-surface-800/50 hover:bg-primary-500/20 hover:border-primary-500/30 border border-surface-700/50 px-3 py-1 rounded-full transition-all cursor-pointer"
                >
                  ORD-001
                </button>
                <button
                  type="button"
                  className="text-[11px] font-mono font-medium text-surface-300 hover:text-white bg-surface-800/50 hover:bg-primary-500/20 hover:border-primary-500/30 border border-surface-700/50 px-3 py-1 rounded-full transition-all cursor-pointer"
                >
                  TRK-123
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto w-full">
          <div className="text-left overflow-hidden group bg-surface-900/40 backdrop-blur-md rounded-2xl p-6 border border-surface-800/50 hover:border-primary-500/30 hover:bg-surface-800/60 transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-800/20 group-hover:text-primary-500/25 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              1
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-white mb-2">
                Real-Time
              </h3>
              <p className="text-xs text-surface-400 leading-relaxed">
                Instant status updates
              </p>
            </div>
          </div>

          <div className="text-left overflow-hidden group bg-surface-900/40 backdrop-blur-md rounded-2xl p-6 border border-surface-800/50 hover:border-primary-500/30 hover:bg-surface-800/60 transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
             <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-800/20 group-hover:text-primary-500/25 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              2
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-white mb-2">
                Timeline
              </h3>
              <p className="text-xs text-surface-400 leading-relaxed">
                Detailed journey log
              </p>
            </div>
          </div>

          <div className="text-left overflow-hidden group bg-surface-900/40 backdrop-blur-md rounded-2xl p-6 border border-surface-800/50 hover:border-primary-500/30 hover:bg-surface-800/60 transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
             <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-800/20 group-hover:text-primary-500/25 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              3
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-white mb-2">
                Proof
              </h3>
              <p className="text-xs text-surface-400 leading-relaxed">
                Signatures & photos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
