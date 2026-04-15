import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SSO_TARGETS } from "@/config/env";
import { useAuth } from "@/services/auth/hooks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setSelectedSystem } from "@/services/auth/slice";
import { useFormActions } from "@/services/form/hooks";
import { FormInput } from "@/components/ui/FormInput";
import { useFormErrors } from "@/hooks/useFormErrors";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { login, loginResult } = useAuth();
  const { isLoading } = loginResult;
  const { authenticated, session } = useAppSelector((state) => state.auth);
  const { reset: resetForm } = useFormActions();
  const { getFieldError, getGeneralError, clearErrorOnInput } = useFormErrors();

  // State for login flow
  const [loginStep, setLoginStep] = useState<"form" | "selection">("form");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedSystemLocal, setSelectedSystemLocal] = useState<
    "tms" | "wms" | null
  >(null);

  // Check if user already has valid session on mount
  useEffect(() => {
    if (authenticated && session && (session.tms_token || session.wms_token)) {
      // User already logged in, skip to selection
      // Note: Don't pre-select any system - let user choose manually every time
      setLoginStep("selection");
    }
  }, [authenticated, session]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm(); // Clear previous errors before submitting
    await login(identifier, password);
  };

  // Clear errors when user types
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    clearErrorOnInput("identifier");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearErrorOnInput("password");
  };

  // Watch for successful login to show system selection
  useEffect(() => {
    if (loginResult.isSuccess) {
      setLoginStep("selection");
    }
  }, [loginResult.isSuccess]);

  const handleSystemSelect = (system: "tms" | "wms") => {
    setSelectedSystemLocal(system);
    // Dispatch to Redux which updates the cookie with selected_system
    dispatch(setSelectedSystem(system));

    // Redirect to target system with session cookie (cross-domain SSO)
    // The target system will read the cookie and use the appropriate token
    const targetUrl =
      system === "tms"
        ? SSO_TARGETS.TMS + "/auth/login"
        : SSO_TARGETS.WMS + "/login";
    window.location.href = targetUrl;
  };

  return (
    <>
      <Helmet>
        <title>Masuk | Onward Connect</title>
        <meta
          name="description"
          content="Masuk ke Onward TMS atau Onward WMS"
        />
      </Helmet>

      {/* Full Screen Split Layout */}
      <div className="flex w-full h-screen bg-white text-surface-950 overflow-hidden font-sans">
        {/* LEFT SIDE - Form Content */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-hide relative p-8 sm:p-12 md:p-24 z-10 flex flex-col">
          {/* Subtle background glow for form area */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none min-h-200">
            <div className="absolute w-96 h-96 bg-primary-100/60 rounded-full blur-[100px] top-0 left-0 animate-pulse" />
            <div className="absolute w-125 h-125 bg-accent-100/40 rounded-full blur-[120px] bottom-0 right-0 opacity-50" />
          </div>

          <div className="w-full max-w-md mx-auto my-auto relative py-8">
            {/* Logo */}
            <div className="mb-10">
              <Link
                to="/"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/logotype.png"
                  alt="Onward Connect Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Dynamic Titles */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-surface-950 font-display tracking-tight mb-3">
                {loginStep === "form" ? "Selamat Datang" : "Pilih Sistem"}
              </h1>
              <p className="text-lg text-surface-500">
                {loginStep === "form"
                  ? "Masukkan kredensial Anda untuk mengakses platform logistik terpadu."
                  : "Pilih sistem operasional Anda untuk melanjutkan."}
              </p>
            </div>

            {/* Dynamic Forms / Selection */}
            <div className="relative min-h-100">
              {/* Step 1: Login Form */}
              <div
                className={`transition-all duration-700 ease-in-out ${loginStep === "form" ? "opacity-100 translate-x-0 relative z-10" : "opacity-0 -translate-x-12 absolute inset-0 pointer-events-none"}`}
              >
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {/* General Error Message */}
                  {getGeneralError() && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600 text-sm font-medium">
                        {getGeneralError()}
                      </p>
                    </div>
                  )}
                  <FormInput
                    type="text"
                    id="identifier"
                    label="Email / Username"
                    value={identifier}
                    onChange={handleIdentifierChange}
                    placeholder="anda@perusahaan.com"
                    error={getFieldError("identifier")}
                  />

                  <FormInput
                    type="password"
                    id="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    error={getFieldError("password")}
                  />

                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-surface-300 bg-white text-primary-500 focus:ring-primary-500/50 transition-colors cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-3 text-sm font-medium text-surface-600 select-none cursor-pointer"
                    >
                      Ingat Saya
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white py-4 mt-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <svg
                        className="w-7 h-7 text-white animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center">
                          Masuk
                          <svg
                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 text-surface-500">
                  Belum memiliki akun operasional?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              </div>

              {/* Step 2: System Selection */}
              <div
                className={`transition-all duration-700 ease-in-out ${loginStep === "selection" ? "opacity-100 translate-x-0 relative z-10" : "opacity-0 translate-x-12 absolute inset-0 pointer-events-none"}`}
              >
                <div className="space-y-5">
                  <button
                    onClick={() => handleSystemSelect("tms")}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 flex items-center group ${
                      selectedSystemLocal === "tms"
                        ? "border-primary-500 bg-primary-50"
                        : "border-surface-200 bg-white hover:border-primary-300 hover:bg-surface-50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center mr-5 group-hover:bg-primary-100 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-surface-950 text-xl font-display mb-1">
                        Onward TMS
                      </h3>
                      <p className="text-surface-500 text-sm">
                        Sistem Manajemen Transportasi
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 text-surface-400 ml-auto group-hover:text-primary-600 group-hover:translate-x-2 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSystemSelect("wms")}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 flex items-center group ${
                      selectedSystemLocal === "wms"
                        ? "border-accent-500 bg-accent-50"
                        : "border-surface-200 bg-white hover:border-accent-300 hover:bg-surface-50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-accent-50 flex items-center justify-center mr-5 group-hover:bg-accent-100 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-accent-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-surface-950 text-xl font-display mb-1">
                        Onward WMS
                      </h3>
                      <p className="text-surface-500 text-sm">
                        Sistem Manajemen Gudang
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 text-surface-400 ml-auto group-hover:text-accent-600 group-hover:translate-x-2 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Back to Home Mobile-only (since desktop has nav space or side panel) */}
            <div className="mt-8 pt-6 border-t border-surface-200">
              <Link
                to="/"
                className="text-surface-500 hover:text-surface-700 font-medium transition-colors inline-flex items-center group"
              >
                <svg
                  className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke beranda
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Abstract Visual / Banner */}
        <div className="hidden lg:block lg:w-1/2 relative bg-surface-900 border-l border-surface-200 overflow-hidden group">
          <img
            src="/images/login_banner.png"
            alt="Logistics Infrastructure"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15s] ease-linear group-hover:scale-110"
          />
          {/* Overlay gradient to blend text nicely if needed, or just darken it */}
          <div className="absolute inset-0 bg-linear-to-tr from-surface-950 via-surface-950/40 to-transparent" />
          <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay" />

          {/* Subtle text overlay */}
          <div className="absolute bottom-16 left-16 right-16 z-10 bg-surface-950/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-black text-white font-display uppercase tracking-wider mb-2">
              The Digital Supply Chain
            </h2>
            <p className="text-surface-100 text-lg leading-relaxed font-medium opacity-90">
              Mengakselerasi operasional pergudangan dan eksekusi transportasi
              melalui intelijen real-time dan ekosistem logistik yang terhubung
              secara penuh.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
