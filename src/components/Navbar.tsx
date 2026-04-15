import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAuth } from "@/services/auth/hooks";
import { SSO_TARGETS } from "@/config/env";
import { setSelectedSystem } from "@/services/auth/slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  // Auth state
  const dispatch = useAppDispatch();
  const { authenticated, session, selectedSystem } = useAppSelector(
    (state) => state.auth,
  );
  const { logout } = useAuth();

  // Get user info
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Beranda" },
    { to: "/transportasi", label: "Transportasi (TMS)" },
    { to: "/gudang", label: "Gudang (WMS)" },
    { to: "/lacak", label: "Lacak Pengiriman" },
  ];

  const isActive = (path: string) => {
    if (path === "/lacak") {
      return location.pathname.startsWith("/lacak");
    }
    return location.pathname === path;
  };

  const handlePlatformSwitch = (system: "tms" | "wms") => {
    dispatch(setSelectedSystem(system));
    const targetUrl =
      system === "tms"
        ? SSO_TARGETS.TMS + "/auth/login"
        : SSO_TARGETS.WMS + "/login";
    window.location.href = targetUrl;
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const darkHeroRoutes = ["/", "/transportasi", "/gudang"];
  const isDarkHero = !scrolled && darkHeroRoutes.includes(location.pathname);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-xl shadow-lg shadow-surface-200/30"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={isDarkHero ? "/logotype-white.png" : "/logotype.png"}
              alt="Onward Connect"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? isDarkHero ? "text-white bg-white/10" : "text-primary-600 bg-primary-50"
                    : isDarkHero ? "text-surface-100 hover:text-white hover:bg-white/5" : "text-surface-700 hover:text-primary-600 hover:bg-surface-100"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary-400" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {!authenticated ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkHero ? "text-white hover:bg-white/10" : "text-surface-700 hover:text-primary-600 hover:bg-surface-100"}`}
                >
                  Masuk
                </Link>
                <Link
                  to="/signup"
                  className="relative overflow-hidden bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/30 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Daftar</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-200 transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-surface-950">
                      {user?.name}
                    </p>
                    <p className="text-xs text-surface-600">
                      {user?.email || "User"}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-surface-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-72 bg-white border border-surface-200 rounded-2xl shadow-xl shadow-surface-200/50 overflow-hidden transition-all duration-300 origin-top-right ${
                    profileOpen
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-surface-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-lg font-bold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-semibold text-surface-950">{user?.name}</p>
                        <p className="text-sm text-surface-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform Selection */}
                  <div className="p-3">
                    <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-2 px-2">
                      Pilih Platform
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => handlePlatformSwitch("tms")}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          selectedSystem === "tms"
                            ? "bg-primary-500/10 border border-primary-500/30"
                            : "hover:bg-surface-50 border border-transparent"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-surface-950">
                            Onward TMS
                          </p>
                          <p className="text-xs text-surface-600">
                            Transportasi
                          </p>
                        </div>
                        {selectedSystem === "tms" && (
                          <span className="w-2 h-2 rounded-full bg-primary-400" />
                        )}
                      </button>

                      <button
                        onClick={() => handlePlatformSwitch("wms")}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          selectedSystem === "wms"
                            ? "bg-accent-500/10 border border-accent-500/30"
                            : "hover:bg-surface-50 border border-transparent"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-accent-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-surface-950">
                            Onward WMS
                          </p>
                          <p className="text-xs text-surface-600">Gudang</p>
                        </div>
                        {selectedSystem === "wms" && (
                          <span className="w-2 h-2 rounded-full bg-accent-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="p-3 border-t border-surface-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${isDarkHero ? "text-white hover:bg-white/10" : "text-surface-700 hover:text-primary-600 hover:bg-surface-100"}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out bg-white ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4 shadow-xl rounded-2xl" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? "text-primary-600 bg-primary-500/10"
                    : "text-surface-700 hover:text-primary-600 hover:bg-surface-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile: Auth / Profile */}
            <div className="pt-3 mt-3 border-t border-surface-200 space-y-2">
              {!authenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block text-center px-4 py-3 rounded-xl text-surface-700 hover:text-primary-600 text-sm font-medium hover:bg-surface-100 transition-all duration-300"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center bg-primary-600 text-white px-4 py-3 rounded-xl text-sm font-semibold"
                  >
                    Daftar
                  </Link>
                </>
              ) : (
                <>
                  {/* User Profile Card */}
                  <div className="px-4 py-3 rounded-xl bg-surface-50 flex items-center space-x-3 border border-surface-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-950">
                        {user?.name}
                      </p>
                      <p className="text-xs text-surface-600">{user?.email}</p>
                    </div>
                  </div>

                  {/* Mobile Platform Selection */}
                  <div className="px-2">
                    <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-2 px-2">
                      Pilih Platform
                    </p>
                    <button
                      onClick={() => handlePlatformSwitch("tms")}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-surface-50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-surface-950">
                          Onward TMS
                        </p>
                        <p className="text-xs text-surface-600">Transportasi</p>
                      </div>
                      <svg
                        className="w-4 h-4 text-surface-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handlePlatformSwitch("wms")}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-surface-50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-accent-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-surface-950">
                          Onward WMS
                        </p>
                        <p className="text-xs text-surface-600">Gudang</p>
                      </div>
                      <svg
                        className="w-4 h-4 text-surface-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Keluar</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
