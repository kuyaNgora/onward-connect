import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";

/* ─── Icon Components ─── */
function PackageIcon({ className = "w-8 h-8" }: { className?: string }) {
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

function ScanIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
      />
    </svg>
  );
}

function ClockIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LayoutIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function EyeIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function TrendIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  );
}

function SmartphoneIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  );
}

function BarChartIcon({ className = "w-8 h-8" }: { className?: string }) {
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

function ChevronIcon({
  className = "w-5 h-5",
  open = false,
}: {
  className?: string;
  open?: boolean;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={open ? "M19.5 8.25l-7.5 7.5-7.5-7.5" : "M6 9l6 6 6-6"}
      />
    </svg>
  );
}

function ShieldIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function BoltIcon({ className = "w-8 h-8" }: { className?: string }) {
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
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
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
        d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
      />
    </svg>
  );
}

/* ─── Device Mockup Components ─── */
function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      {/* Laptop body */}
      <div className="relative bg-[#1a1a1a] rounded-2xl p-1.5 shadow-2xl shadow-black/40 border border-surface-700/30">
        {/* Camera notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-700 rounded-full z-10" />
        {/* Screen bezel */}
        <div className="bg-[#0d0d0d] rounded-xl overflow-hidden aspect-16/10">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top-left"
          />
        </div>
      </div>
      {/* Laptop base/hinge */}
      <div className="relative mx-auto w-[110%] -ml-[5%] h-3 bg-linear-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-xl border-x border-b border-surface-700/20" />
      <div className="relative mx-auto w-[30%] h-1 bg-[#2a2a2a] rounded-b-lg" />
    </div>
  );
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative inline-block mx-auto">
      {/* Phone body */}
      <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-1.5 shadow-2xl shadow-black/40 border border-surface-700/30">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0d0d0d] rounded-full z-10" />
        {/* Side button - right */}
        <div className="absolute -right-0.5 top-24 w-0.75 h-8 bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute -right-0.5 top-36 w-0.75 h-12 bg-[#2a2a2a] rounded-r-sm" />
        {/* Side button - left */}
        <div className="absolute -left-0.5 top-28 w-0.75 h-10 bg-[#2a2a2a] rounded-l-sm" />
        {/* Screen */}
        <div className="bg-[#0d0d0d] rounded-[2.2rem] overflow-hidden">
          <img src={src} alt={alt} className="w-full block" />
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll Animation Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("animate-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const targets = el.querySelectorAll(".scroll-animate");
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

/* ─── Data ─── */
const stats = [
  { value: 99.9, suffix: "%", label: "Akurasi Inventori" },
  { value: 3, suffix: "x", label: "Lebih Cepat Picking" },
  { value: 40, suffix: "%", label: "Reduksi Biaya Operasional" },
  { value: 24, suffix: "/7", label: "Monitoring Real-Time" },
];

const features = [
  {
    id: "layout",
    icon: <LayoutIcon className="w-7 h-7" />,
    title: "Custom Layout Designer",
    headline: "Desain Gudang Digital Anda",
    description:
      "Buat replika digital gudang dengan alat drag-and-drop intuitif. Visualisasikan kapasitas, optimalkan alur barang, dan rencanakan ekspansi — semuanya dari satu layar.",
    bullets: [
      "Pemetaan drag-and-drop multi-area",
      "Konfigurasi zona dan bin otomatis",
      "Simulasi kapasitas realistis",
    ],
    image: "/images/lp-features1.png",
    accent: "primary",
  },
  {
    id: "analytics",
    icon: <BarChartIcon className="w-7 h-7" />,
    title: "Real-time Analytics Suite",
    headline: "Data yang Menggerakkan Keputusan",
    description:
      "Jangan tebak — ketahui pasti. Dashboard analitik real-time mengungkap bottleneck tersembunyi, mengukur kecepatan tim, dan membantu Anda ambil keputusan 10x lebih cepat.",
    bullets: [
      "Dashboard kesehatan gudang",
      "Deteksi bottleneck otomatis",
      "Pelacakan throughput per zona",
    ],
    image: "/images/wms_hero.png?v=2",
    accent: "accent",
  },
  {
    id: "mobile",
    icon: <SmartphoneIcon className="w-7 h-7" />,
    title: "Worker Companion App",
    headline: "Produktivitas di Genggaman",
    description:
      "Tingkatkan efisiensi tenaga kerja dengan PWA mobile-first yang bekerja di semua perangkat — bahkan offline. Picking, packing, dan scan barcode jadi lebih cepat.",
    bullets: [
      "Berjalan di smartphone/tablet apa pun",
      "Mode offline untuk area tanpa sinyal",
      "Scan barcode terintegrasi",
    ],
    image: "/images/lp-features3.png",
    accent: "primary",
  },
];

const benefits = [
  {
    icon: <PackageIcon className="w-7 h-7" />,
    title: "Presisi Inventori",
    desc: "Pelacakan real-time hingga level bin untuk menghilangkan kehilangan stok.",
  },
  {
    icon: <ScanIcon className="w-7 h-7" />,
    title: "Picking Tanpa Error",
    desc: "Validasi barcode menjamin 100% akurasi pesanan.",
  },
  {
    icon: <ClockIcon className="w-7 h-7" />,
    title: "Pengelolaan Tenggat",
    desc: "Peringatan SLA otomatis menjaga setiap pengiriman sesuai jadwal.",
  },
  {
    icon: <EyeIcon className="w-7 h-7" />,
    title: "Visibilitas Total",
    desc: "Pantau setiap pergerakan inventori di fasilitas Anda secara instan.",
  },
  {
    icon: <TrendIcon className="w-7 h-7" />,
    title: "Skalabilitas Cepat",
    desc: "Tambah pengguna dan lokasi tanpa downtime.",
  },
  {
    icon: <ShieldIcon className="w-7 h-7" />,
    title: "Keamanan Enterprise",
    desc: "Enkripsi end-to-end dan backup otomatis harian.",
  },
  {
    icon: <BoltIcon className="w-7 h-7" />,
    title: "Setup Instan",
    desc: "Mulai operasional dalam hitungan jam, bukan minggu.",
  },
  {
    icon: <CubeIcon className="w-7 h-7" />,
    title: "Multi-Gudang",
    desc: "Kelola banyak lokasi dari satu dashboard terpusat.",
  },
];

const faqs = [
  {
    q: "Apa itu Onward WMS?",
    a: "Onward WMS adalah Sistem Manajemen Gudang komprehensif yang dirancang untuk menyederhanakan operasional, meningkatkan akurasi inventori, dan meningkatkan produktivitas tenaga kerja melalui pelacakan real-time dan otomatisasi cerdas.",
  },
  {
    q: "Apakah data saya aman dan tersimpan cadangan?",
    a: "Ya, kami menggunakan enkripsi tingkat enterprise dan melakukan cadangan otomatis harian untuk memastikan kelangsungan bisnis Anda. Data Anda disimpan di pusat data yang aman dan redundan.",
  },
  {
    q: "Apakah platform dapat diakses melalui mobile?",
    a: "Tentu saja. Aplikasi Companion kami adalah Progressive Web App (PWA) yang bekerja di smartphone atau tablet apa pun, memungkinkan tenaga kerja Anda mengelola tugas dari mana saja di gudang.",
  },
  {
    q: "Apakah saya dapat melakukan upgrade dengan mudah saat berkembang?",
    a: "Ya, platform kami dibangun untuk pertumbuhan. Anda dapat dengan mudah meningkatkan paket, menambah pengguna, dan memperluas ke beberapa lokasi gudang tanpa downtime sistem.",
  },
  {
    q: "Apakah saya memerlukan perangkat keras khusus?",
    a: "Tidak diperlukan perangkat keras proprietary khusus. Sistem kami bekerja dengan barcode scanner standar, smartphone, dan tablet, mengurangi biaya investasi awal Anda.",
  },
];

/* ─── Stat Counter Component ─── */
function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-6xl font-black font-display text-white mb-2 tabular-nums">
        {count}
        <span className="gradient-text">{suffix}</span>
      </div>
      <div className="text-surface-400 text-sm font-medium uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function WMSPage() {
  const featureRef = useScrollReveal();
  const benefitRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveFeature((current) => (current + 1) % features.length);
          return 0;
        }
        return prev + 1;
      });
    }, 60); // 6 seconds total cycle (100 * 60ms)

    return () => clearInterval(timer);
  }, [isPaused, features.length]);

  // Handle manual tab change
  const handleTabChange = (index: number) => {
    setActiveFeature(index);
    setProgress(0);
  };

  // Scroll synchronization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-feature-index"),
            );
            if (!isNaN(index)) {
              setActiveFeature(index);
              setProgress(0);
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    const triggers = document.querySelectorAll(".feature-scroll-trigger");
    triggers.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentFeature = features[activeFeature];

  return (
    <>
      <Helmet>
        <title>Onward WMS | Sistem Manajemen Gudang</title>
        <meta
          name="description"
          content="Optimalkan operasional gudang dengan sistem manajemen gudang Onward WMS. Capai akurasi inventori 99% dan visibilitas real-time."
        />
      </Helmet>

      <div>
        {/* ═══════════════════════════════════════════════════════ */}
        {/* HERO SECTION — Split layout with floating cards */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-950">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/wms_hero_bg_generated_1775529707132.png"
                alt=""
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-linear-to-r from-surface-950 via-surface-950/80 to-surface-950/40" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-surface-950" />
            </div>
            <div className="absolute top-1/4 right-1/4 w-125 h-125 bg-primary-500/8 rounded-full blur-[120px] animate-pulse" />
            <div
              className="absolute bottom-1/4 left-1/3 w-100 h-100 bg-accent-500/6 rounded-full blur-[100px] animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text content */}
              <div>
                <div className="inline-flex items-center glass rounded-full px-5 py-2.5 mb-8 border border-primary-500/30">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3 animate-pulse" />
                  <span className="text-primary-300 text-sm font-bold tracking-wide">
                    Warehouse Management System
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-white mb-6 leading-[1.1]">
                  Gudang Cerdas,{" "}
                  <span className="gradient-text block">
                    Bisnis Lebih Maju.
                  </span>
                </h1>

                <p className="text-xl text-surface-300 mb-10 max-w-xl leading-relaxed">
                  Hilangkan kekacauan inventori dan ubah gudang Anda menjadi
                  mesin presisi dengan visibilitas{" "}
                  <strong className="text-white">real-time</strong> dan
                  otomatisasi cerdas.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    to="/signup"
                    className="group inline-flex items-center justify-center gradient-primary text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105"
                  >
                    Mulai Gratis
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
                  </Link>
                  <Link
                    to="#features"
                    className="group inline-flex items-center justify-center border-2 border-surface-700 text-surface-300 hover:text-white hover:bg-surface-800 glass px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                  >
                    Jelajahi Fitur
                  </Link>
                </div>

                <div className="flex gap-8 text-sm text-surface-400">
                  {[
                    "Tanpa kartu kredit",
                    "Setup 5 menit",
                    "Batalkan kapan saja",
                  ].map((t, i) => (
                    <div key={i} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Floating stat cards + laptop mockup */}
              <div className="relative hidden lg:block">
                <div className="relative w-full">
                  {/* Laptop Mockup */}
                  <LaptopMockup
                    src="/images/wms_hero.png?v=2"
                    alt="WMS Dashboard"
                  />

                  {/* Floating stat card - top right */}
                  <div
                    className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-4 border border-primary-500/30 shadow-xl animate-bounce z-10"
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="text-xs text-surface-400 mb-1">
                      Akurasi Inventori
                    </div>
                    <div className="text-2xl font-black text-white">
                      99.9<span className="text-primary-400">%</span>
                    </div>
                  </div>

                  {/* Floating stat card - bottom left */}
                  <div
                    className="absolute bottom-8 -left-4 glass rounded-2xl px-5 py-4 border border-accent-500/30 shadow-xl animate-bounce z-10"
                    style={{
                      animationDuration: "3.5s",
                      animationDelay: "0.5s",
                    }}
                  >
                    <div className="text-xs text-surface-400 mb-1">
                      Order Hari Ini
                    </div>
                    <div className="text-2xl font-black text-white">
                      2,847{" "}
                      <span className="text-accent-400 text-sm">↑12%</span>
                    </div>
                  </div>

                  {/* Floating badge - mid left */}
                  <div
                    className="absolute top-1/3 -left-6 glass rounded-xl px-4 py-3 border border-surface-600/50 shadow-lg animate-bounce z-10"
                    style={{ animationDuration: "4s", animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm font-semibold text-green-300">
                        Semua Sistem Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STATS COUNTER BAR */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="relative py-20 bg-surface-950 border-y border-surface-800/50">
          <div className="absolute inset-0 bg-linear-to-r from-primary-500/3 via-transparent to-accent-500/3" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <StatCounter
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FEATURE EXPLORER — Interactive Tabs */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section
          ref={featureRef}
          id="features"
          className="py-32 bg-surface-950 relative overflow-hidden"
        >
          <div
            className="orb orb-primary w-125 h-125 -right-40 top-20"
            style={{ animation: "orbFloat2 15s ease-in-out infinite" }}
          />
          <div
            className="orb orb-accent w-100 h-100 -left-20 bottom-20"
            style={{ animation: "orbFloat1 18s ease-in-out infinite" }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className="text-center mb-16"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <span className="inline-block text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Fitur Unggulan
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                Alat yang Mengubah{" "}
                <span className="gradient-text">Cara Kerja Gudang</span>
              </h2>
              <p className="text-xl text-surface-400 max-w-2xl mx-auto">
                Tiga pilar teknologi yang membuat gudang Anda beroperasi di
                level berikutnya.
              </p>
            </div>

            {/* Tab Buttons with Progress Bar */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {features.map((feature, i) => (
                <button
                  key={feature.id}
                  onClick={() => handleTabChange(i)}
                  className={`group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-base transition-all duration-500 border overflow-hidden ${
                    activeFeature === i
                      ? "gradient-primary text-white border-primary-500/50 shadow-lg shadow-primary-500/20 scale-105"
                      : "glass text-surface-300 border-surface-700/50 hover:border-primary-500/30 hover:text-white"
                  }`}
                >
                  {/* Progress Line */}
                  {activeFeature === i && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <span
                    className={`transition-transform duration-300 ${activeFeature === i ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    {feature.icon}
                  </span>
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Scroll Triggers (Invisible markers for scroll-sync) */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
              <div
                className="feature-scroll-trigger h-1/3"
                data-feature-index="0"
              />
              <div
                className="feature-scroll-trigger h-1/3"
                data-feature-index="1"
              />
              <div
                className="feature-scroll-trigger h-1/3"
                data-feature-index="2"
              />
            </div>

            {/* Active Feature Content */}
            <div
              className="scroll-animate grid lg:grid-cols-2 gap-12 items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Text side */}
              <div className="order-2 lg:order-1" key={currentFeature.id}>
                <div
                  className={`inline-flex items-center rounded-full px-4 py-2 mb-6 text-sm font-bold ${
                    currentFeature.accent === "primary"
                      ? "bg-primary-500/10 text-primary-300 border border-primary-500/20"
                      : "bg-accent-500/10 text-accent-300 border border-accent-500/20"
                  }`}
                >
                  {currentFeature.icon}
                  <span className="ml-2">{currentFeature.title}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-5 leading-tight">
                  {currentFeature.headline}
                </h3>
                <p className="text-lg text-surface-400 mb-8 leading-relaxed">
                  {currentFeature.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {currentFeature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          currentFeature.accent === "primary"
                            ? "bg-primary-500/20"
                            : "bg-accent-500/20"
                        }`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 ${currentFeature.accent === "primary" ? "text-primary-400" : "text-accent-400"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-surface-300 text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`inline-flex items-center font-bold text-lg transition-all duration-300 group ${
                    currentFeature.accent === "primary"
                      ? "text-primary-400 hover:text-primary-300"
                      : "text-accent-400 hover:text-accent-300"
                  }`}
                >
                  Coba Fitur Ini
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
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

              {/* Image side */}
              <div className="order-1 lg:order-2">
                <div className="relative group flex items-center justify-center h-95 lg:h-120">
                  <div
                    className={`absolute -inset-4 rounded-[2.5rem] blur-2xl transition-opacity duration-700 ${
                      currentFeature.accent === "primary"
                        ? "bg-primary-500/10"
                        : "bg-accent-500/10"
                    }`}
                  />
                  <div className="relative w-full z-10">
                    {currentFeature.id === "mobile" ? (
                      <div className="flex justify-center">
                        <div className="w-55 lg:w-65 group-hover:scale-[1.02] transition-transform duration-700">
                          <PhoneMockup
                            src={currentFeature.image}
                            alt={currentFeature.title}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="group-hover:scale-[1.02] transition-transform duration-700 w-full max-w-lg mx-auto">
                        <LaptopMockup
                          src={currentFeature.image}
                          alt={currentFeature.title}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* BENEFITS — Staggered card grid */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section
          ref={benefitRef}
          className="py-32 bg-surface-900 border-y border-surface-800/50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary-500)_0%,transparent_70%)] opacity-[0.03]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Keunggulan
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
                Mengapa Tim Gudang Memilih{" "}
                <span className="gradient-text">Onward WMS</span>
              </h2>
              <p className="text-lg text-surface-400 max-w-2xl mx-auto">
                Delapan alasan mengapa ratusan gudang telah beralih ke platform
                kami.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="scroll-animate group relative glass rounded-3xl p-7 transition-all duration-500 border border-surface-700/50 hover:-translate-y-2 hover:border-primary-500/40"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-surface-800 rounded-xl flex items-center justify-center text-primary-400 mb-5 border border-surface-700/50 group-hover:bg-primary-500/10 group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-500 shadow-lg">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-primary-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-surface-400 text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* HOW IT WORKS — Visual Process */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-32 bg-surface-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Cara Kerja
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                Tiga Langkah Menuju Gudang Digital
              </h2>
            </div>

            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-1 bg-surface-800 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-primary-600 via-primary-400 to-primary-600 opacity-50" />
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                {[
                  {
                    n: "1",
                    title: "Setup & Import",
                    desc: "Import data master gudang, SKU, dan konfigurasi lokasi penyimpanan dalam hitungan menit melalui CSV atau API.",
                  },
                  {
                    n: "2",
                    title: "Operasikan",
                    desc: "Mulai kelola inbound, outbound, picking, dan packing dengan bantuan otomatisasi cerdas.",
                  },
                  {
                    n: "3",
                    title: "Optimasi & Skalakan",
                    desc: "Gunakan insight analitik untuk terus mengoptimalkan operasi dan memperluas ke gudang baru.",
                  },
                ].map((step, i) => (
                  <div key={i} className="relative group">
                    <div className="relative z-10 w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center font-bold font-display text-white text-2xl shadow-[0_0_30px_rgba(var(--color-primary-500),0.3)] border-4 border-surface-950 group-hover:scale-125 transition-transform duration-500">
                      {step.n}
                    </div>
                    <div className="mt-8 text-center glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 border border-surface-700/50 group-hover:border-primary-500/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-primary-300 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-surface-400 leading-relaxed text-sm">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FAQ SECTION */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section
          ref={faqRef}
          className="py-32 bg-surface-950 border-t border-surface-800/50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="scroll-animate glass rounded-3xl overflow-hidden border border-surface-700/50 hover:border-primary-500/50 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-semibold text-white pr-4 group-hover:text-primary-300 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center glass shrink-0 transition-transform duration-500 ${openFaq === i ? "rotate-180 bg-primary-500/20" : ""}`}
                    >
                      <ChevronIcon
                        className="w-5 h-5 text-surface-300"
                        open={openFaq === i}
                      />
                    </div>
                  </button>
                  <div
                    className={`px-8 text-surface-400 leading-relaxed transition-all duration-500 delay-75 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-8 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                  >
                    <div className="w-full h-px bg-surface-800/50 mb-6" />
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* CTA SECTION */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-32 gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-surface-950/40 backdrop-blur-md" />
          <div className="orb orb-primary w-125 h-125 -right-40 -top-40" />
          <div className="orb orb-accent w-100 h-100 -left-20 -bottom-40" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white mb-8">
              Transformasi Gudang Anda{" "}
              <span className="gradient-text">Dimulai Hari Ini</span>.
            </h2>
            <p className="text-xl text-surface-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Bergabunglah bersama ratusan tim gudang yang sudah merasakan
              presisi dan kecepatan Onward WMS.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gradient-primary text-white px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105 active:scale-95"
              >
                Buat Akun WMS Gratis
                <svg
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform"
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
              <Link
                to="#demo"
                className="group inline-flex items-center justify-center glass border border-surface-600 text-white hover:bg-surface-800 px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Lihat Demo
              </Link>
            </div>

            <p className="mt-8 text-surface-500 font-medium">
              Tidak perlu kartu kredit • Siap dipakai dalam 5 menit
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
