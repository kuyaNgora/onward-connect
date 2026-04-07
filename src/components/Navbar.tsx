import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/produk/tms', label: 'TMS' },
    { to: '/produk/wms', label: 'WMS' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-surface-950/80 backdrop-blur-xl shadow-lg shadow-surface-950/30'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/logotype-white.png" 
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
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-surface-300 hover:text-white hover:bg-surface-800/50'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary-400" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-surface-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-surface-800/50"
            >
              Masuk
            </Link>
            <Link
              to="/signup"
              className="relative overflow-hidden gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Daftar</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-surface-300 hover:text-white hover:bg-surface-800/50 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-surface-300 hover:text-white hover:bg-surface-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-surface-700/50 space-y-2">
              <Link
                to="/login"
                className="block text-center px-4 py-3 rounded-xl text-surface-300 hover:text-white text-sm font-medium hover:bg-surface-800/50 transition-all duration-300"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                className="block text-center gradient-primary text-white px-4 py-3 rounded-xl text-sm font-semibold"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
