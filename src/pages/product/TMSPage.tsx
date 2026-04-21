import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";

/* ─── Icon Components ─── */
function ClipboardIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function TruckIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 003 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 003.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  );
}

function MapPinIcon({ className = "w-6 h-6" }: { className?: string }) {
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

function ChartIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

// function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2.5}
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//     </svg>
//   );
// }

function MapQuestionIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0zM12 9v1.5m0 3h.01"
      />
    </svg>
  );
}

function UsersWarningIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm6.75 2.25v2.25m0 3h.01"
      />
    </svg>
  );
}

function DocumentWarningIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v2.25m0 3h.008v.008h-.008v-.008z"
      />
    </svg>
  );
}

function ExclamationTriangleIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
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
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function GiftIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25m17.25 0V9a1.5 1.5 0 00-1.5-1.5H5.25A1.5 1.5 0 003.75 9v2.25m17.25 0h-17.25m17.25 0h-17.25m11.25-9A3.375 3.375 0 0012 3a3.375 3.375 0 00-2.25 1.125m11.25 0A3.375 3.375 0 0112 3a3.375 3.375 0 01-2.25 1.125M12 3v18"
      />
    </svg>
  );
}

function BanknotesIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
      />
    </svg>
  );
}

function TimerIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0zM15.75 3h-7.5M12 1.5v3"
      />
    </svg>
  );
}

function HeartIcon({ className = "w-6 h-6" }: { className?: string }) {
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
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function TrendingUpIcon({ className = "w-6 h-6" }: { className?: string }) {
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

function DevicePhoneMobileIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
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

function GlobeAsiaAustraliaIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
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
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function WrenchScrewdriverIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
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
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
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

/* ─── Data ─── */
const problems = [
  {
    icon: <MapQuestionIcon className="w-8 h-8" />,
    title: "Sulit melacak pengiriman secara real-time",
    description:
      'Anda tidak tahu di mana posisi armada dan barang saat ini. Customer selalu bertanya "barang saya di mana?" dan Anda tidak punya jawaban pasti.',
  },
  {
    icon: <UsersWarningIcon className="w-8 h-8" />,
    title: "Puluhan driver dan rute yang harus diatur manual",
    description:
      "Setiap hari Anda harus menghubungi driver satu per satu untuk membagi order. Salah penugasan bisa menyebabkan keterlambatan dan biaya tambahan.",
  },
  {
    icon: <DocumentWarningIcon className="w-8 h-8" />,
    title: "Laporan yang butuh waktu berhari-hari untuk dibuat",
    description:
      "Akhir bulan selalu sibuk mengumpulkan data dari berbagai sumber. Sulit mengetahui driver mana yang performanya baik atau buruk.",
  },
  {
    icon: <ExclamationTriangleIcon className="w-8 h-8" />,
    title: "Masalah di lapangan baru diketahui setelah terlambat",
    description:
      "Driver mogok, kendaraan rusak, atau customer batal - Anda baru tahu saat sudah terlambat. Tidak ada sistem peringatan dini untuk mengatasi masalah.",
  },
];

const steps = [
  {
    number: "1",
    title: "Daftar Akun (1 menit)",
    description: "Isi nama dan email. Anda sudah bisa pakai langsung.",
  },
  {
    number: "2",
    title: "Buat Order Pertama (10 menit)",
    description:
      'Klik "Buat Order", isi detail pengiriman. Pilih driver dan armada. Selesai!',
  },
  {
    number: "3",
    title: "Pantau & Kelola",
    description:
      "Lihat status semua pengiriman di satu tampilan. Atur masalah kalau ada.",
  },
];

const benefits = [
  {
    icon: <GiftIcon className="w-8 h-8" />,
    title: "100% Gratis",
    desc: "Selamanya gratis, tanpa biaya setup, per user, atau per order",
  },
  {
    icon: <TimerIcon className="w-8 h-8" />,
    title: "Hemat Waktu",
    desc: "Proses manual yang memakan waktu berjam-jam kini selesai dalam menitan",
  },
  {
    icon: <BanknotesIcon className="w-8 h-8" />,
    title: "Kurangi Biaya",
    desc: "Hindari double-shipment, rute tidak efisien, dan penugasan salah",
  },
  {
    icon: <HeartIcon className="w-8 h-8" />,
    title: "Customer Lebih Tenang",
    desc: "Lacak langsung bikin customer lebih tenang dan percaya",
  },
  {
    icon: <TrendingUpIcon className="w-8 h-8" />,
    title: "Bisnis Bertumbuh",
    desc: "Fokus kembangkan bisnis, bukan urusan administrasi",
  },
  {
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    title: "Bisa Dibuka Di Mana Saja",
    desc: "Bisa diakses online, dari kantor maupun di lapangan",
  },
  {
    icon: <GlobeAsiaAustraliaIcon className="w-8 h-8" />,
    title: "Dibuat untuk Indonesia",
    desc: "Mengerti kebutuhan logistik lokal dengan data wilayah Indonesia lengkap",
  },
  {
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    title: "Bantuan Terjamin",
    desc: "Tim bantuan lokal siap membantu kalau Anda butuh bantuan",
  },
];

// const freeFeatures = [
//   {
//     text: "Unlimited User",
//     desc: "Tambah user sebanyak yang Anda butuhkan - admin, dispatcher, finance, semua gratis",
//   },
//   {
//     text: "Unlimited Order",
//     desc: "Tidak ada batas jumlah order yang bisa Anda kelola",
//   },
//   {
//     text: "Unlimited Trips",
//     desc: "Kelola trip sebanyak armada Anda, tanpa batasan",
//   },
//   {
//     text: "Semua Fitur Lengkap",
//     desc: "Order management, trip management, live tracking, exception handling, laporan - semuanya gratis",
//   },
//   {
//     text: "Master Data Lengkap",
//     desc: "Customer, driver, kendaraan, pricing matrix - kelola semuanya tanpa batas",
//   },
//   {
//     text: "Laporan & Analitik",
//     desc: "Generate laporan kapan saja, tanpa biaya tambahan",
//   },
//   {
//     text: "Support Gratis",
//     desc: "Tim support kami siap bantu via email dan dokumentasi lengkap",
//   },
//   {
//     text: "Update Fitur Berkala",
//     desc: "Dapatkan fitur baru dan improvement secara gratis",
//   },
// ];

const faqs = [
  {
    q: "Apakah benar gratis selamanya?",
    a: "Ya! Onward TMS 100% gratis selamanya tanpa biaya tersembunyi. Tidak ada biaya daftar, tidak ada biaya per pengguna, tidak ada biaya per order. Anda bisa pakai semua fitur tanpa batasan.",
  },
  {
    q: "Apakah sulit pindah dari sistem lama?",
    a: "Tidak sulit! Kami sediakan format CSV yang bisa Anda isi untuk pindah data utama (pelanggan, driver, kendaraan). Cukup upload file CSV dan data akan masuk otomatis. Tim bantuan kami juga siap membantu kalau ada kendala.",
  },
  {
    q: "Apakah driver saya perlu pasang aplikasi?",
    a: "Tidak perlu! Driver cukup buka browser di HP mereka dan login ke Onward TMS. Tidak ada instalasi aplikasi yang makan memori. Ada juga fitur yang mudah dipakai driver untuk update status pengiriman.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya, data Anda dicadangkan setiap hari dan disimpan di server Indonesia. Kami pakai pengamanan SSL dan ikuti standar keamanan data. Anda juga bisa download data Anda kapan saja.",
  },
  {
    q: "Berapa lama bisa dipakai?",
    a: "Setelah daftar, Anda bisa langsung pakai dalam hitungan menit. Isi data pelanggan, driver, dan kendaraan. Sudah bisa buat order pertama Anda. Kalau butuh bantuan, tim kami siap pandu.",
  },
];

export default function TMSPage() {
  const heroRef = useScrollReveal();
  const problemRef = useScrollReveal();
  const featureRef = useScrollReveal();
  const stepsRef = useScrollReveal();
  const benefitRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>
          Onward TMS - Sistem Manajemen Transportasi Gratis Selamanya | #1 di Indonesia
        </title>
        <meta
          name="description"
          content="Onward TMS - Sistem manajemen transportasi gratis selamanya dari Onward. Kelola armada, driver, pengiriman, dan rute dengan mudah. Solusi logistik #1 untuk perusahaan Indonesia."
        />
        <meta name="keywords" content="Onward, Onward TMS, sistem manajemen transportasi, TMS gratis, software logistik Indonesia, kelola armada, manajemen pengiriman, transport management system, logistik Indonesia, tracking pengiriman, rute pengiriman" />
        <meta name="author" content="Onward" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onward.id/transportasi" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onward.id/transportasi" />
        <meta property="og:title" content="Onward TMS - Sistem Manajemen Transportasi Gratis Selamanya" />
        <meta property="og:description" content="Kelola armada, driver, dan pengiriman dengan mudah. Solusi logistik gratis selamanya dari Onward untuk perusahaan Indonesia." />
        <meta property="og:image" content="https://onward.id/images/tms-og-image.jpg" />
        <meta property="og:site_name" content="Onward" />
        <meta property="og:locale" content="id_ID" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://onward.id/transportasi" />
        <meta name="twitter:title" content="Onward TMS - Sistem Manajemen Transportasi Gratis Selamanya" />
        <meta name="twitter:description" content="Kelola armada, driver, dan pengiriman dengan mudah. Solusi logistik gratis selamanya dari Onward." />
        <meta name="twitter:image" content="https://onward.id/images/tms-twitter-image.jpg" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Onward TMS",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "500"
              },
              "author": {
                "@type": "Organization",
                "name": "Onward"
              },
              "description": "Sistem manajemen transportasi gratis selamanya untuk kelola armada, driver, dan pengiriman.",
              "keywords": "Onward TMS, transport management system, logistik Indonesia, software armada"
            }
          `}
        </script>
      </Helmet>

      <div>
        {/* ═════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-emerald-950"
        >
          <div className="absolute inset-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/tms_hero_bg_emerald.svg"
                alt="Logistics Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-emerald-950/20" />
              <div className="absolute inset-0 bg-linear-to-b from-emerald-950/80 via-emerald-950/20 to-transparent" />
            </div>

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse z-0" />
            <div
              className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse z-0"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-[10px] font-bold uppercase tracking-widest mb-8 animate-reveal delay-200 shadow-sm">
                <span className="text-sm mr-2 leading-none">🎉</span>
                100% Gratis - Selamanya
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-white mb-6 leading-[1.1]">
                <span className="inline-block animate-elastic delay-400">Kelola Pengiriman</span>
                <br />
                <span className="inline-block gradient-text animate-elastic delay-600">Tanpa Pusing</span>
              </h1>
              <p className="text-xl text-surface-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-reveal delay-800">
                Sistem manajemen transportasi{" "}
                <strong className="text-white">gratis selamanya</strong> yang
                dirancang khusus untuk perusahaan logistik di Indonesia. Lacak
                pengiriman, kelola driver, dan pantau armada dalam satu platform
                tanpa biaya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/30 hover:scale-105 animate-reveal delay-1000"
                >
                  Daftar Sekarang - Gratis
                  <svg
                    className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
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
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* PROBLEM SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section
          ref={problemRef}
          className="relative py-32 bg-surface-50 border-t border-surface-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-red-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-red-50 rounded-full px-5 py-2 mb-6 border border-red-200 text-red-600">
                <ExclamationTriangleIcon className="w-5 h-5 mr-3" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  Mimpi Buruk Logistik
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-surface-950 mb-6">
                Capek Mengelola <br className="hidden md:block" /> Logistik
                dengan Excel?
              </h2>
              <p className="text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
                Manajemen manual menyebabkan kebocoran biaya dan kepuasan
                pelanggan menurun. Jika Anda merasakan hal ini, Anda tidak
                sendiri.
              </p>
            </div>

            <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="scroll-animate group relative bg-white rounded-4xl p-6 md:p-8 hover:translate-x-2 transition-all duration-500 shadow-lg shadow-surface-200/40 border border-surface-100"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-red-50 to-transparent rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 border border-surface-100 group-hover:border-red-300 rounded-4xl transition-colors duration-500" />
                  <div className="absolute inset-y-8 left-0 w-0.5 bg-linear-to-b from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100 group-hover:bg-red-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-sm">
                      {problem.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-surface-950 mb-2 md:mb-3 leading-snug group-hover:text-red-700 transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-surface-600 leading-relaxed text-base md:text-lg">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* SOLUTION SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-primary-600 text-white relative">
          <div className="absolute inset-0 bg-primary-700/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Satu Platform untuk Semua Operasional Logistik Anda
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Dari order masuk hingga pengiriman selesai -{" "}
              <strong className="text-white">Onward TMS</strong> memudahkan
              setiap langkahnya.{" "}
              <span className="text-primary-200 font-bold">
                100% gratis, tanpa batasan.
              </span>
            </p>
            <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <ClockIcon className="w-6 h-6 text-primary-200" />
              <span className="ml-3 font-medium text-white">
                Dari manual ke digital dalam hitungan hari
              </span>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* FEATURES SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section
          ref={featureRef}
          className="py-32 bg-white relative overflow-hidden"
        >
          <div
            className="orb orb-primary w-[31rem] h-[31rem] -right-40 top-40"
            style={{ animation: "orbFloat2 15s ease-in-out infinite" }}
          />
          <div
            className="orb orb-accent w-[25rem] h-[25rem] -left-20 bottom-40"
            style={{ animation: "orbFloat1 18s ease-in-out infinite" }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                Fitur Lengkap
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-surface-950">
                Semua yang Anda Butuh untuk Kelola Logistik
              </h2>
            </div>

            <div className="space-y-24">
              <div className="grid md:grid-cols-3 gap-6 auto-rows-[400px]">
                {/* Card 1: Live Tracking (Wide) */}
                <div className="scroll-animate md:col-span-2 group relative rounded-[2.5rem] p-10 overflow-hidden border border-surface-200 shadow-xl shadow-surface-200/40 hover:border-primary-300 transition-all duration-500 flex flex-col justify-end">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-t from-surface-950 via-surface-950/40 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/images/tms_viz_tracking.svg"
                      alt="Live Tracking Map"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="relative z-20">
                    <div className="w-14 h-14 bg-white/90 rounded-2xl flex items-center justify-center text-primary-600 mb-6 border border-white/50 backdrop-blur-md shadow-sm">
                      <MapPinIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3 tracking-tight">
                      Live Tracking & Monitoring
                    </h3>
                    <p className="text-surface-200 text-lg max-w-xl">
                      Pantau posisi armada di peta secara real-time. Berikan
                      informasi yang akurat kepada pelanggan tanpa perlu sering
                      menelepon supir.
                    </p>
                  </div>
                </div>

                {/* Card 2: Manajemen Order (Square) */}
                <div className="scroll-animate md:col-span-1 group relative rounded-[2.5rem] p-10 overflow-hidden border border-surface-200 shadow-xl shadow-surface-200/40 hover:border-primary-300 transition-all duration-500 flex flex-col justify-end">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-t from-surface-950 via-surface-950/20 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/images/tms_viz_orders.svg"
                      alt="Order Management"
                      className="absolute top-0 left-0 w-[150%] h-[150%] object-cover object-top-left opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="relative z-20">
                    <div className="w-14 h-14 bg-white/90 rounded-2xl flex items-center justify-center text-primary-600 mb-6 border border-white/50 backdrop-blur-md shadow-sm">
                      <ClipboardIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white mb-3">
                      Manajemen Order
                    </h3>
                    <p className="text-surface-200 text-base">
                      Terima dan kelola ratusan order ekspedisi dengan sistem
                      terpusat. Proses dokumen menjadi lebih cepat dan minim
                      kesalahan manual.
                    </p>
                  </div>
                </div>

                {/* Card 3: Penugasan & Rute Otomatis (Square) */}
                <div className="scroll-animate md:col-span-1 group relative rounded-[2.5rem] p-10 overflow-hidden border border-surface-200 shadow-xl shadow-surface-200/40 hover:border-accent-300 transition-all duration-500 flex flex-col justify-end">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-t from-surface-950 via-surface-950/20 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/images/tms_viz_routes.svg"
                      alt="Penugasan Armada"
                      className="absolute top-0 left-0 w-[150%] h-[150%] object-cover object-top-left opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="relative z-20 flex-1 flex flex-col justify-end">
                    <div className="w-14 h-14 bg-white/90 rounded-2xl flex items-center justify-center text-accent-600 mb-6 border border-white/50 backdrop-blur-md shadow-sm">
                      <TruckIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white mb-3">
                      Penugasan Rute
                    </h3>
                    <p className="text-surface-200 text-base">
                      Optimasi penugasan tanpa membuang armada secara berlebih.
                      Pilih rute perjalanan paling logis yang menghemat bahan
                      bakar.
                    </p>
                  </div>
                </div>

                {/* Card 4: Analitik & Laporan (Wide) */}
                <div className="scroll-animate md:col-span-2 group relative rounded-[2.5rem] p-10 overflow-hidden border border-surface-200 shadow-xl shadow-surface-200/40 hover:border-accent-300 transition-all duration-500 flex flex-col justify-end">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-t from-surface-950 via-surface-950/40 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/images/tms_dashboard.png"
                      alt="Laporan & Analitik"
                      className="absolute top-0 right-0 w-full h-[80%] object-cover object-top-left opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="relative z-20 flex-1 flex flex-col justify-end">
                    <div className="w-14 h-14 bg-white/90 rounded-2xl flex items-center justify-center text-accent-600 mb-6 border border-white/50 backdrop-blur-md shadow-sm">
                      <ChartIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3 tracking-tight">
                      Analitik & Laporan
                    </h3>
                    <p className="text-surface-200 text-lg max-w-xl">
                      Ambil keputusan bisnis berdasarkan data performa yang
                      terukur secara akurat. Dapatkan rekapitulasi data harian
                      hingga bulanan dalam satu klik cepat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* HOW IT WORKS SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section
          ref={stepsRef}
          className="py-32 bg-surface-50 border-y border-surface-200 relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                Cara Mulai
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-surface-950">
                Gunakan Onward TMS dalam 3 Langkah Mudah
              </h2>
            </div>

            <div className="relative mt-20 md:mt-24">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-1 bg-surface-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-primary-400 via-primary-500 to-primary-400 opacity-50" />
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="scroll-animate relative group"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {/* Progress Connecting Node */}
                    <div className="relative z-10 w-12 h-12 mx-auto bg-primary-600 rounded-full flex items-center justify-center font-bold font-display text-white text-xl shadow-lg shadow-primary-600/30 border-4 border-surface-50 group-hover:scale-125 transition-transform duration-500 delay-75">
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="mt-8 text-center bg-white rounded-4xl p-8 hover:-translate-y-2 transition-all duration-500 border border-surface-100 shadow-lg shadow-surface-200/40 group-hover:border-primary-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-b from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold font-display text-surface-950 mb-3 group-hover:text-primary-700 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-surface-600 leading-relaxed text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* BENEFITS SUMMARY SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section ref={benefitRef} className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block text-accent-600 text-sm font-semibold uppercase tracking-widest mb-4">
                Keunggulan
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-surface-950">
                Mengapa Memilih Onward TMS?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8 md:gap-y-10">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="scroll-animate group relative bg-white rounded-4xl p-8 transition-all duration-500 border border-surface-100 shadow-lg shadow-surface-200/30 hover:-translate-y-2 hover:border-primary-300 hover:shadow-xl"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary-50 to-transparent rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 border border-primary-100 group-hover:bg-primary-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-sm">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display text-surface-950 mb-3 group-hover:text-primary-700 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-surface-600 text-sm md:text-base leading-relaxed wrap-break-word">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* FAQ SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section
          ref={faqRef}
          className="py-32 bg-surface-50 border-t border-surface-200"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-surface-950">
                Pertanyaan Umum
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="scroll-animate bg-white rounded-3xl overflow-hidden border border-surface-100 shadow-md shadow-surface-200/30 hover:border-primary-300 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-semibold text-surface-950 pr-4 group-hover:text-primary-700 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface-50 shrink-0 transition-transform duration-500 ${openFaq === i ? "rotate-180 bg-primary-50" : ""}`}
                    >
                      <ChevronIcon
                        className="w-5 h-5 text-surface-500"
                        open={openFaq === i}
                      />
                    </div>
                  </button>
                  <div
                    className={`px-8 text-surface-600 leading-relaxed transition-all duration-500 delay-75 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-8 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                  >
                    <div className="w-full h-px bg-surface-200 mb-6" />
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* FINAL CTA SECTION */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-surface-50 text-surface-950 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute rounded-full mix-blend-multiply w-[45rem] h-[45rem]" style={{ background: "radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, transparent 70%)", top: "5%", right: "-5%", animation: "orbFloat1 10s ease-in-out infinite" }} />
            <div className="absolute rounded-full mix-blend-multiply w-[45rem] h-[45rem]" style={{ background: "radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, transparent 70%)", bottom: "-10%", left: "-10%", animation: "orbFloat2 15s ease-in-out infinite" }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-surface-950 mb-8">
              Siap Bertransformasi{" "}
              <span className="gradient-text">Tanpa Biaya</span>?
            </h2>
            <p className="text-xl text-surface-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Gabung dengan komunitas logistik Indonesia yang telah berevolusi
              bersama Onward TMS.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center bg-primary-600 text-white px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/30 hover:scale-105 active:scale-95"
              >
                Buat Akun Gratis
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
