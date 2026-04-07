# Technical Specification

## Enigma Connect Unified Website

---

# 1. Technology Stack

Frontend framework:

* React
* Vite

Styling:

* Tailwind CSS

State Management:

* Redux Toolkit

Routing:

* React Router

Language:

* TypeScript (recommended)

---

# 2. Project Structure

Recommended folder structure:

src/
│
├ components
│
├ features
│
├ layouts
│
├ pages
│
├ routes
│
├ store
│
├ services
│
├ hooks
│
└ utils

---

# 3. Pages Structure

pages/
│
├ home
├ product
│   ├ tms
│   └ wms
├ about
├ contact
├ auth
│   ├ login
│   └ signup

---

# 4. Routing

Routing menggunakan React Router.

Example routes:

/
/produk/tms
/produk/wms
/about
/contact
/login
/signup

---

# 5. Layout System

Website menggunakan reusable layout.

layouts/

MainLayout
AuthLayout

MainLayout digunakan untuk halaman utama website.

AuthLayout digunakan untuk halaman login dan signup.

---

# 6. State Management

Redux Toolkit digunakan untuk:

* auth state
* user selection
* signup form
* UI state

Example store structure:

store/

store.ts
authSlice.ts
uiSlice.ts

---

# 7. API Layer

API requests menggunakan fetch atau axios.

Disarankan menggunakan pattern service.

services/

authService.ts
signupService.ts

---

# 8. Login System Flow

Login page menampilkan pilihan sistem.

User memilih:

* Enigma TMS
* Enigma WMS

Setelah dipilih:

User diarahkan ke endpoint login masing-masing sistem.

Example:

tms.example.com/login
wms.example.com/login

---

# 9. Signup API

POST /signup

Payload example:

{
companyName: string
fullName: string
email: string
phone: string
product: "tms" | "wms"
}

---

# 10. Component Structure

components/

Navbar
Footer
HeroSection
ProductCard
FeatureList
CTASection
ContactForm

Components harus reusable.

---

# 11. Styling Convention

Tailwind CSS digunakan untuk styling.

Guidelines:

* gunakan utility class
* hindari inline CSS
* gunakan design tokens

Example:

text-primary
bg-primary
rounded-lg

---

# 12. Environment Variables

VITE_API_URL=

Digunakan untuk endpoint backend.

---

# 13. Performance Optimization

Gunakan:

* Lazy loading pages
* Code splitting
* Image optimization

Example:

React.lazy()

---

# 14. SEO Considerations

Gunakan:

* meta tags
* semantic HTML
* sitemap.xml
* robots.txt

---

# 15. Accessibility

Website harus memenuhi standar dasar accessibility:

* alt text pada gambar
* semantic HTML
* keyboard navigation

---

# 16. Deployment

Build menggunakan Vite:

npm run build

Output:

dist/

Deployment dapat dilakukan ke:

* Vercel
* Netlify
* AWS S3 + CloudFront
* Nginx server

---

# 17. CI/CD (Optional)

CI/CD pipeline dapat menggunakan:

* GitHub Actions
* GitLab CI

Steps:

1. install dependencies
2. run build
3. deploy

---

# 18. Security

Basic security practices:

* sanitize form input
* rate limit signup endpoint
* use HTTPS
# 19. SEO Implementation

Website harus dioptimalkan untuk Search Engine Optimization (SEO).

---

# 19.1 Page Metadata

Setiap halaman harus memiliki metadata yang unik.

Contoh:

Home Page

title:
Enigma Connect | Platform Manajemen Logistik

meta description:
Platform digital untuk mengelola transportasi dan gudang secara efisien menggunakan Enigma TMS dan Enigma WMS.

---

TMS Page

title:
Enigma TMS | Sistem Manajemen Transportasi

meta description:
Kelola pengiriman, armada, dan rute transportasi dengan sistem manajemen transportasi Enigma TMS.

---

WMS Page

title:
Enigma WMS | Sistem Manajemen Gudang

meta description:
Optimalkan operasional gudang dengan sistem manajemen gudang Enigma WMS.

---

# 19.2 React SEO Library

Disarankan menggunakan library berikut:

react-helmet-async

Fungsi:

* mengatur title
* mengatur meta description
* mengatur open graph

Example:

import { Helmet } from "react-helmet-async"

<Helmet>
<title>Enigma TMS | Sistem Manajemen Transportasi</title>
<meta name="description" content="Kelola pengiriman dan armada secara efisien menggunakan Enigma TMS." />
</Helmet>

---

# 19.3 URL Structure

Gunakan URL yang SEO friendly.

Contoh:

/produk/tms
/produk/wms
/tentang
/kontak

Hindari:

/page?id=1

---

# 19.4 Sitemap

Website harus menyediakan sitemap.xml.

Contoh:

/sitemap.xml

Isi sitemap:

/
/produk/tms
/produk/wms
/tentang
/kontak
/login
/signup

---

# 19.5 Robots.txt

Robots.txt harus tersedia.

Contoh:

User-agent: *
Allow: /

Sitemap: https://domain.com/sitemap.xml

---

# 19.6 Structured Data (Schema.org)

Gunakan structured data untuk membantu mesin pencari memahami website.

Contoh schema:

Organization
SoftwareApplication
Product

Example:

{
"@context": "https://schema.org",
"@type": "SoftwareApplication",
"name": "Enigma TMS",
"applicationCategory": "Logistics Software"
}

---

# 19.7 Image SEO

Semua gambar harus memiliki:

* alt text
* ukuran teroptimasi
* format modern (webp)

Contoh:

<img src="/tms-dashboard.webp" alt="Dashboard Enigma TMS untuk monitoring pengiriman" />

---

# 19.8 Performance SEO

Performance mempengaruhi ranking SEO.

Optimasi yang harus dilakukan:

* lazy load images
* code splitting
* minify assets
* compress images
* gunakan CDN

Target performance:

Lighthouse score ≥ 90

---

# 19.9 Social Sharing (Open Graph)

Meta tag untuk social media.

Example:

<meta property="og:title" content="Enigma TMS" />
<meta property="og:description" content="Sistem manajemen transportasi untuk perusahaan logistik." />
<meta property="og:image" content="/images/tms-preview.png" />

---

# 19.10 Canonical URL

Setiap halaman harus memiliki canonical URL untuk menghindari duplicate content.

Example:

<link rel="canonical" href="https://domain.com/produk/tms" />
