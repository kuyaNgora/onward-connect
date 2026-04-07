import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

/* ─── SVG Icon Components ─── */
function TruckIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function WarehouseIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function ChartIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}

function CubeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    </svg>
  );
}

function MapPinIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

/* ─── Scroll Observer Hook (inline) ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const targets = el.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale",
    );
    targets.forEach((t) => observer.observe(t));
    if (
      el.classList.contains("scroll-animate") ||
      el.classList.contains("scroll-animate-scale")
    ) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Page Component ─── */
export default function HomePage() {
  const aboutRef = useScrollReveal();
  const produkRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div>
      <Helmet>
        <title>Onward Connect | Platform Logistik Terintegrasi</title>
        <meta
          name="description"
          content="Platform logistik terpadu untuk mengelola gudang dan armada. Hubungkan Onward TMS dan Onward WMS dalam satu dashboard."
        />
      </Helmet>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url(/images/hero_logistics_1775469197698.png)",
          }}
        />
        <div className="absolute inset-0 bg-surface-950/70" />
        <div className="absolute inset-0 bg-linear-to-t from-surface-950 via-surface-950/30 to-surface-900/10" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Badge */}
          <div
            className="inline-flex items-center glass-accent rounded-full px-5 py-2 mb-8 animate-fade-in-down"
            style={{
              animationDelay: "0.2s",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-2 h-2 bg-primary-400 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-medium text-white shadow-sm">
              Platform Logistik Terintegrasi
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display leading-[0.95] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-white drop-shadow-md">Kelola Logistik</span>
            <br />
            <span
              className="gradient-text drop-shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(64.61% .1943 41.12), oklch(75% .15 41.12))",
              }}
            >
              Lebih Cerdas
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-surface-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-medium drop-shadow-sm"
            style={{ animationDelay: "0.6s" }}
          >
            Gudang, armada, dan pengiriman — dalam satu sistem yang mudah
            digunakan. Connect membantu perusahaan logistik menjalankan
            operasional lebih rapi, lebih cepat, dan lebih terkontrol.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              to="/signup"
              className="group relative overflow-hidden gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                Gabung Daftar Tunggu
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
              </span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              to="/produk/tms"
              className="group glass-light text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up glass rounded-3xl p-6 border border-white/10"
            style={{ animationDelay: "1s" }}
          >
            {[
              { value: "2", label: "Produk Utama" },
              { value: "100%", label: "Terintegrasi Penuh" },
              { value: "24/7", label: "Monitoring Real-time" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-display text-white">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-surface-300 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* APA ITU CONNECT? (Image Side by Side) */}
      {/* ═════════════════════════════════════════════════════════ */}
      <section
        ref={aboutRef}
        className="relative min-h-screen py-32 overflow-hidden bg-surface-950 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <span className="scroll-animate inline-block text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Tentang Platform
            </span>
            <h2 className="scroll-animate stagger-1 text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Apa itu <span className="gradient-text">Connect</span>?
            </h2>
            <p className="scroll-animate stagger-2 text-lg text-surface-300 leading-relaxed mb-10 max-w-xl">
              Connect adalah platform terpadu yang membantu perusahaan logistik
              mengelola seluruh operasional dalam satu ekosistem. Mulai dari
              visibilitas gudang, optimalisasi rute, pengelolaan armada, hingga
              kepuasan pelanggan akhir.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <CubeIcon className="w-6 h-6" />,
                  title: "Manajemen Inventori & Gudang",
                },
                {
                  icon: <TruckIcon className="w-6 h-6" />,
                  title: "Pengaturan & Pelacakan Armada",
                },
                {
                  icon: <MapPinIcon className="w-6 h-6" />,
                  title: "Optimasi Rute Pengiriman",
                },
                {
                  icon: <ChartIcon className="w-6 h-6" />,
                  title: "Analisis & Laporan Operasional",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`scroll-animate-left stagger-${i + 2} flex items-center`}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 text-primary-400 flex items-center justify-center mr-5 border border-primary-500/20">
                    {item.icon}
                  </div>
                  <span className="text-white font-medium text-lg">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 scroll-animate-right stagger-3 relative w-full mt-10 lg:mt-0">
            <div className="relative flex items-center justify-center">
              {/* Soft ambient glow behind the holographic network */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />

              <img
                src="/images/connect_network_visual.png"
                alt="Onward Connect Network"
                className="relative z-10 w-full md:w-[115%] md:-ml-[5%] lg:w-[125%] lg:-ml-[10%] max-w-none h-auto object-contain transform hover:scale-[1.03] transition-transform duration-700"
                style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.5))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* PRODUK EKOSISTEM (Cards with Background Images) */}
      {/* ═════════════════════════════════════════════════════════ */}
      <section
        ref={produkRef}
        className="relative min-h-screen py-32 overflow-hidden bg-surface-900 flex items-center"
      >
        {/* Background decorations */}
        <div
          className="orb orb-primary w-150 h-150 -top-40 right-10"
          style={{ animation: "orbFloat1 18s ease-in-out infinite" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="scroll-animate inline-block text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Ekosistem Produk
            </span>
            <h2 className="scroll-animate stagger-1 text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Sistem yang Menggerakkan{" "}
              <span className="gradient-text">Bisnis Anda</span>
            </h2>
            <p className="scroll-animate stagger-2 text-lg text-surface-300">
              Pilih produk yang sesuai dengan kebutuhan operasional Anda, atau
              gunakan keduanya untuk integrasi tanpa batas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* TMS Card */}
            <Link
              to="/produk/tms"
              className="scroll-animate stagger-3 group flex flex-col glass rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 border border-surface-700"
            >
              {/* Image Header */}
              <div className="h-72 w-full relative overflow-hidden shrink-0">
                <img
                  src="/images/fleet_trucks_1775469273861.png"
                  alt="Fleet Trucks"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-900 via-surface-900/60 to-transparent" />

                <div className="absolute bottom-6 left-8 flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center mr-4 shadow-lg shadow-primary-500/50">
                    <TruckIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold font-display text-white drop-shadow-md">
                      Onward TMS
                    </h3>
                    <p className="text-primary-200 font-medium text-sm drop-shadow">
                      Transport Management System
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 grow flex flex-col">
                <div className="inline-flex items-center glass-accent rounded-full px-4 py-1.5 mb-4 border border-accent-500/30 self-start">
                  <span className="text-sm mr-2 leading-none">🎉</span>
                  <span className="text-xs font-bold text-accent-300 uppercase tracking-wider">
                    100% Gratis Selamanya
                  </span>
                </div>
                <p className="text-surface-300 text-lg mb-6 leading-relaxed">
                  Platform lengkap tanpa biaya untuk memantau armada kendaraan,
                  manajemen rute, dan melacak pengiriman.
                </p>
                <div className="mt-auto">
                  <ul className="space-y-3 mb-6">
                    {[
                      "Unlimited User & Order",
                      "Live Tracking Armada",
                      "Driver & Trip Management",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-surface-300 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center text-primary-400 font-bold group-hover:text-primary-300 transition-colors text-lg">
                    Pelajari TMS Lebih Lanjut
                    <svg
                      className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* WMS Card */}
            <Link
              to="/produk/wms"
              className="scroll-animate stagger-4 group flex flex-col glass rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-accent-500/20 transition-all duration-500 border border-surface-700"
            >
              {/* Image Header */}
              <div className="h-72 w-full relative overflow-hidden shrink-0">
                <img
                  src="/images/warehouse_interior_1775469508413.png"
                  alt="Warehouse Interior"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-900 via-surface-900/60 to-transparent" />

                <div className="absolute bottom-6 left-8 flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent-500 flex items-center justify-center mr-4 shadow-lg shadow-accent-500/50">
                    <WarehouseIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold font-display text-white drop-shadow-md">
                      Onward WMS
                    </h3>
                    <p className="text-accent-200 font-medium text-sm drop-shadow">
                      Warehouse Management System
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 grow flex flex-col">
                <p className="text-surface-300 text-lg mb-8 leading-relaxed">
                  Sistem cerdas untuk mengelola stok inventori, memproses
                  penerimaan barang, dan mengotomatisasi proses picking &
                  packing.
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-accent-400 font-bold group-hover:text-accent-300 transition-colors text-lg">
                    Pelajari WMS Lebih Lanjut
                    <svg
                      className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* CTA SECTION */}
      {/* ═════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        {/* Full animated gradient background */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(22% .038 168.94) 0%, oklch(30% .058 168.94) 25%, oklch(37.8% .073 168.94) 50%, oklch(30% .06 41.12) 75%, oklch(22% .038 168.94) 100%)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-125 h-125 rounded-full mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, oklch(59.6% .1274 163.23 / 0.3) 0%, transparent 70%)",
              top: "5%",
              right: "-5%",
              animation: "orbFloat1 10s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h2 className="scroll-animate text-5xl md:text-6xl font-bold font-display text-white mb-6">
            Siap Mengubah Cara
            <br /> Anda Beroperasi?
          </h2>

          <p className="scroll-animate stagger-2 text-xl text-surface-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan daftar tunggu kami sekarang dan bersiaplah untuk
            meningkatkan efisiensi logistik Anda ke level berikutnya.
          </p>

          <div className="scroll-animate stagger-3">
            <Link
              to="/signup"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-white text-surface-950 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center">
                Mulai Sekarang — Gratis
                <svg
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-primary-50 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          <p className="scroll-animate stagger-4 text-surface-400 mt-6 text-sm font-medium">
            Tidak ada komitmen. Batalkan kapan saja.
          </p>
        </div>
      </section>
    </div>
  );
}
