import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/services/auth/hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useFormActions } from "@/services/form/hooks";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { useFormErrors } from "@/hooks/useFormErrors";

export default function SignupPage() {
  const navigate = useNavigate();
  const { register, registerResult } = useAuth();
  const { isLoading, isSuccess } = registerResult;
  const { authenticated } = useAppSelector((state) => state.auth);
  const { reset: resetForm } = useFormActions();
  const { getFieldError, getGeneralError, clearErrorOnInput } = useFormErrors();

  // Redirect authenticated users to login (they already have an account)
  useEffect(() => {
    if (authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Watch for successful registration
  useEffect(() => {
    if (isSuccess) {
      setSubmitted(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm(); // Clear previous errors before submitting

    if (formData.password !== formData.confirm_password) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    // Call register with the exact payload format needed
    await register({
      company_name: formData.company_name,
      address: formData.address,
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirm_password: formData.confirm_password,
      phone: formData.phone,
    });
  };

  // Clear errors when user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    clearErrorOnInput(e.target.name);
  };

  return (
    <>
      <Helmet>
        <title>Daftar | Onward Connect</title>
        <meta
          name="description"
          content="Daftar untuk akses penuh ke Onward TMS dan WMS - Solusi logistik terpadu"
        />
      </Helmet>

      {/* Full Screen Split Layout */}
      <div className="flex w-full h-screen bg-white text-surface-950 overflow-hidden font-sans">
        {/* LEFT SIDE - Form Content */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-hide relative p-8 sm:p-12 md:p-16 xl:p-24 z-10 flex flex-col">
          {/* Subtle background glow for form area */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none min-h-200">
            <div className="absolute w-96 h-96 bg-primary-100/60 rounded-full blur-[100px] top-0 left-0 animate-pulse" />
            <div className="absolute w-125 h-125 bg-accent-100/40 rounded-full blur-[120px] bottom-0 right-0 opacity-50" />
          </div>

          <div className="w-full max-w-lg mx-auto my-auto relative py-8">
            {/* Logo */}
            <div className="mb-8">
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

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-surface-950 font-display tracking-tight mb-3">
                Buat Akun Perusahaan
              </h1>
              <p className="text-lg text-surface-500">
                Dapatkan akses penuh ke TMS dan WMS untuk transformasi rantai pasok
                cerdas.
              </p>
            </div>

            {submitted ? (
              <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 text-center animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-10 h-10 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-black text-surface-950 text-2xl font-display mb-2">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-surface-600 text-base leading-relaxed">
                  Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman
                  login dalam beberapa detik...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8 animate-fade-in"
              >
                {/* SECTION 1: Company Information */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-2 border-b border-surface-200">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-surface-950">Informasi Perusahaan</h3>
                  </div>

                  {/* Company Name */}
                  <FormInput
                    type="text"
                    id="company_name"
                    name="company_name"
                    label="Nama Perusahaan"
                    requiredMark
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="PT Lorem Ipsum"
                    error={getFieldError("company_name")}
                  />

                  {/* Address */}
                  <FormTextArea
                    id="address"
                    name="address"
                    label="Alamat Perusahaan"
                    requiredMark
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Jl. Raya Darmo Permai III No. 45"
                    rows={2}
                    error={getFieldError("address")}
                  />
                </div>

                {/* SECTION 2: Administrator Account */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-2 border-b border-surface-200">
                    <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-surface-950">Akun Administrator</h3>
                  </div>

                  {/* Username & Full Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      type="text"
                      id="username"
                      name="username"
                      label="Username"
                      requiredMark
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="admin"
                      error={getFieldError("username")}
                    />

                    <FormInput
                      type="text"
                      id="name"
                      name="name"
                      label="Nama Lengkap"
                      requiredMark
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Budi Santoso"
                      error={getFieldError("name")}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      requiredMark
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      error={getFieldError("email")}
                    />

                    <FormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      label="Nomor Telepon"
                      requiredMark
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08123456789"
                      error={getFieldError("phone")}
                    />
                  </div>
                </div>

                {/* SECTION 3: Security */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-2 border-b border-surface-200">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-surface-950">Keamanan</h3>
                  </div>

                  {/* Password */}
                  <FormInput
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    requiredMark
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    error={getFieldError("password")}
                    helperText="Minimal 6 karakter"
                  />

                  {/* Confirm Password */}
                  <FormInput
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    label="Konfirmasi Password"
                    requiredMark
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    error={getFieldError("confirm_password")}
                  />
                </div>

                {/* Error Message */}
                {getGeneralError() && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-sm font-medium">{getGeneralError()}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
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
                          Daftar Sekarang
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-surface-500 mt-4 leading-relaxed">
                    Dengan mendaftar, Anda menyetujui Syarat & Ketentuan serta
                    <br /> Kebijakan Privasi Onward Connect.
                  </p>
                </div>
              </form>
            )}

            {/* Login Link */}
            <div
              className={`mt-8 text-surface-500 ${submitted ? "text-center" : ""}`}
            >
              Sudah memiliki akun?{" "}
              <Link
                to="/login"
                className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
              >
                Masuk di sini
              </Link>
            </div>

            {/* Back to Home Mobile-only */}
            <div
              className={`mt-8 pt-6 border-t border-surface-200 ${submitted ? "text-center" : ""}`}
            >
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
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15s] ease-linear group-hover:scale-[1.05]"
          />
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
