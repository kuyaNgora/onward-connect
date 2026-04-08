import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import SessionRestorer from "./components/SessionRestorer";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/home/HomePage"));
const TMSPage = lazy(() => import("./pages/product/TMSPage"));
const WMSPage = lazy(() => import("./pages/product/WMSPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
}

// 404 Page component
function NotFoundPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen relative overflow-hidden">
      <div
        className="orb orb-primary w-100 h-100 -top-20 -right-20"
        style={{ animation: "orbFloat1 15s ease-in-out infinite" }}
      />
      <div
        className="orb orb-accent w-75 h-75 -bottom-20 -left-20"
        style={{ animation: "orbFloat2 18s ease-in-out infinite" }}
      />
      <div className="text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-black font-display gradient-text mb-6">
          404
        </h1>
        <p className="text-xl text-surface-400 mb-10 font-display">
          Halaman tidak ditemukan
        </p>
        <a
          href="/"
          className="inline-flex items-center gradient-primary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all duration-300 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <SessionRestorer>
      <Suspense fallback={<PageLoader />}>
        <Routes>
        {/* Public routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="produk/tms" element={<TMSPage />} />
          <Route path="produk/wms" element={<WMSPage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>

        {/* Auth routes */}
        {/* Full screen split layout for login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Full screen split layout for signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Redirect /produk to /produk/tms */}
        <Route path="/produk" element={<Navigate to="/produk/tms" replace />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </SessionRestorer>
  );
}

export default App;
