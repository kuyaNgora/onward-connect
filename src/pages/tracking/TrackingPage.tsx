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
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
          Order Tracking System
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-black text-surface-950 mb-6 tracking-tight text-center">
          Dimana{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
            Pesanan Saya?
          </span>{" "}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-surface-600 max-w-lg mx-auto leading-relaxed text-center mb-10">
          Masukkan nomor order atau resi di bawah untuk melihat perjalanan pesanan
          Anda secara real-time.
        </p>

        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto w-full relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-2 sm:p-4 shadow-xl shadow-surface-200/40 border border-surface-200">
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
                      className={`w-5 h-5 transition-colors duration-300 ${isFocused ? "text-primary-600" : ""}`}
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
                    className={`w-full pl-12 pr-4 py-4 text-sm font-medium bg-surface-50 text-surface-950 rounded-xl border-2 transition-all duration-300 outline-none ${
                      error
                        ? "border-red-400 bg-red-50"
                        : isFocused
                        ? "border-primary-400 bg-white ring-4 ring-primary-500/10"
                        : "border-surface-200 hover:border-surface-300"
                    } placeholder:text-surface-400`}
                  />

                  {/* Error message */}
                  {error && (
                     <div className="absolute -top-8 left-0 text-[11px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200 backdrop-blur-sm">
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!orderNumber.trim()}
                  className="px-8 py-4 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none whitespace-nowrap"
                >
                  Lacak
                </button>
              </div>

              {/* Examples */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 items-center">
                <span className="text-[10px] font-bold text-surface-500 uppercase tracking-widest bg-surface-100 px-2 py-0.5 rounded">
                  Examples:
                </span>
                <button
                  type="button"
                  className="text-[11px] font-mono font-medium text-surface-600 hover:text-surface-950 bg-white hover:bg-primary-50 hover:border-primary-300 border border-surface-200 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm"
                >
                  ORD-001
                </button>
                <button
                  type="button"
                  className="text-[11px] font-mono font-medium text-surface-600 hover:text-surface-950 bg-white hover:bg-primary-50 hover:border-primary-300 border border-surface-200 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm"
                >
                  TRK-123
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto w-full">
          <div className="text-left overflow-hidden group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-surface-200 shadow-lg shadow-surface-200/30 hover:border-primary-300 hover:shadow-xl transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-100 group-hover:text-primary-100 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              1
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-surface-950 mb-2">
                Real-Time
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Instant status updates
              </p>
            </div>
          </div>

          <div className="text-left overflow-hidden group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-surface-200 shadow-lg shadow-surface-200/30 hover:border-primary-300 hover:shadow-xl transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
             <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-100 group-hover:text-primary-100 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              2
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-surface-950 mb-2">
                Timeline
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Detailed journey log
              </p>
            </div>
          </div>

          <div className="text-left overflow-hidden group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-surface-200 shadow-lg shadow-surface-200/30 hover:border-primary-300 hover:shadow-xl transition-all duration-500 relative min-h-[160px] flex flex-col justify-end">
             <div className="absolute top-1/2 -translate-y-1/2 -left-4 text-[140px] sm:text-[180px] font-black leading-none text-surface-100 group-hover:text-primary-100 group-hover:scale-110 origin-left transition-all duration-700 select-none z-0">
              3
            </div>
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="text-sm font-bold text-surface-950 mb-2">
                Proof
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Signatures & photos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
