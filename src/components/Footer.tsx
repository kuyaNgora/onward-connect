import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-surface-950 border-t border-surface-800/50">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <img
                src="/logotype-white.png"
                alt="Onward Connect"
                className="h-8 w-auto object-contain opacity-90"
              />
            </div>
            <p className="text-surface-400 mb-6 leading-relaxed max-w-sm">
              Platform digital untuk mengelola transportasi dan gudang secara
              efisien. Satu ekosistem untuk seluruh operasional logistik Anda.
            </p>
            <div className="flex space-x-3">
              {/* Social Icons */}
              {[
                {
                  label: "Twitter",
                  path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                },
                {
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  label: "LinkedIn",
                  path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-surface-800/50 flex items-center justify-center text-surface-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Produk
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/transportasi"
                  className="text-surface-400 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mr-3 group-hover:bg-primary-400 transition-colors" />
                  Onward TMS
                </Link>
              </li>
              <li>
                <Link
                  to="/gudang"
                  className="text-surface-400 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mr-3 group-hover:bg-primary-400 transition-colors" />
                  Onward WMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Beranda" },
                { to: "/login", label: "Masuk" },
                { to: "/signup", label: "Daftar" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-surface-400 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mr-3 group-hover:bg-primary-400 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Mulai Sekarang
            </h3>
            <p className="text-surface-400 text-sm mb-4 leading-relaxed">
              Gabung ke daftar tunggu dan jadi yang pertama mencoba.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-300 group"
            >
              Daftar
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-surface-500 text-sm">
              &copy; {new Date().getFullYear()} Onward Connect. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-2 text-surface-500 text-xs">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span>Platform dalam pengembangan aktif</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
