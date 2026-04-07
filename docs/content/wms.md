# WMS Landing Page Content

## Hero Section

### Badge
```
Real-time inventory
```

### Headline
```
Streamline Warehouse Operations
with Precision and Speed.
```

### Subtext
```
Achieve 99% inventory accuracy and gain real-time visibility into your company performance.
The modern Warehouse Management System designed for scaling enterprises.
```

### Email Input Placeholder
```
youremailhere@mail.com
```

### CTA Button
```
Try Now
```

### Trust Indicators
- ✓ No credit card required
- ✓ 14-day free trial
- ✓ Cancel anytime

### Visual Elements
- Dashboard screenshot with mask overlay
- Floating cards (Inventory, Stock Occupancy, Task Completions)
- Background blobs animation
- Scroll parallax effects

### Color Palette
- Background: `bg-emerald-950`
- Text: `text-white`, `text-emerald-100/70`
- Accent: `text-emerald-400`
- Button: `bg-emerald-600 hover:bg-emerald-500`

---

## Features Section (Benefits)

### Section Badge
```
Benefits
```

### Headline
```
Engineered for Efficiency,
Built for Growth.
```

### Feature Cards

| # | Title | Description | Icon | Color |
|---|-------|-------------|------|-------|
| 1 | Inventory Precision | Achieve real-time tracking down to specific bin levels to stop stock loss. | Package | `bg-emerald-100 text-emerald-600` |
| 2 | Error-Free Picking | Barcode validation guarantees 100% order accuracy and eliminates returns. | ScanBarcode | `bg-lime-100 text-lime-600` |
| 3 | Deadline Mastery | Automated SLA alerts ensure every single shipment stays strictly on schedule. | Clock | `bg-amber-100 text-amber-600` |
| 4 | Optimized Storage | Maximize your storage capacity with intelligent, auto-optimized slotting. | LayoutGrid | `bg-teal-100 text-teal-600` |
| 5 | Total Visibility | Monitor every single inventory movement across your facility instantly. | Eye | `bg-orange-100 text-orange-600` |
| 6 | Rapid Scaling | Scale effortlessly by adding users and locations with zero system downtime. | TrendingUp | `bg-green-100 text-green-600` |

---

## Feature Showcase

### Feature 1: Custom Layout Designer

**Badge:** `Features`

**Headline:** `Custom Layout Designer`

**Description:** `Design an exact digital twin of your warehouse with our drag-and-drop tool to visualize capacity and optimize flow effortlessly.`

**Bullet Points:**
- Drag-and-drop mapping interface
- Multi-area and bin configuration
- Realistic capacity visualization

**CTA Button:** `Try Now`

---

### Feature 2: Real-time Analytics Suite

**Badge:** `Features`

**Headline:** `Real-time Analytics Suite`

**Description:** `Gain actionable insights instantly to spot bottlenecks, monitor team velocity, and make smarter decisions without the guesswork.`

**Bullet Points:**
- Warehouse health monitoring
- Bottleneck detection alerts
- Throughput velocity tracking

**Visual:** Animated chart with stock allocation data

---

### Feature 3: Worker Companion App (PWA)

**Badge:** `Features`

**Headline:** `Worker Companion App (PWA)`

**Description:** `Boost workforce productivity with a mobile-first app that works on any device, guiding picking and packing tasks even when offline.`

**Bullet Points:**
- Works on any smartphone/tablet
- Real-time task synchronization
- User-friendly touch interface

**Visual:** Mobile app mockup in phone frame

---

## FAQ Section

### Section Badge
```
FAQ
```

### Headline
```
Frequently Asked Questions
```

### FAQ Items

**Q1: What is WMS Pro?**
```
WMS Pro is a comprehensive Warehouse Management System designed to streamline operations, improve inventory accuracy, and boost workforce productivity through real-time tracking and intelligent automation.
```

**Q2: Is my data secure and backed up?**
```
Yes, we use enterprise-grade encryption and perform daily automated backups to ensure your business continuity. Your data is stored in secure, redundant data centers.
```

**Q3: Is the platform mobile-accessible?**
```
Absolutely. Our Worker Companion App is a Progressive Web App (PWA) that works on any smartphone or tablet, allowing your workforce to manage tasks from anywhere in the warehouse.
```

**Q4: Can I upgrade seamlessly as I scale?**
```
Yes, our platform is built for growth. You can easily upgrade your plan, add more users, and expand to multiple warehouse locations without any system downtime.
```

**Q5: Do I need special hardware?**
```
No specialized proprietary hardware is required. Our system works with standard barcode scanners, smartphones, and tablets, reducing your initial investment costs.
```

---

## CTA Section

### Headline
```
Transform Your
Warehouse Efficiency Today.
```

### Subtext
```
Join hundreds of logistics leaders who have eliminated chaos and driven growth with our WMS.
```

### CTA Button
```
Create Free WMS Account
```

### Visual
- Dashboard screenshot image
- Background: `bg-emerald-950`
- Decorative radial gradient overlay

---

## Footer

### Tagline
```
Transforming warehouse efficiency with precision and speed.
```

### Navigation Links
- Benefits → `#features`
- Features → `#showcase`
- FAQ → `#faq`
- Contact → `#contact`

### Copyright
```
© {year} ONWARD Inc. All rights reserved.
```

### Style
- Background: `bg-emerald-950`
- Text: `text-slate-200`, `text-slate-400`, `text-slate-500`

---

## Color Palette Reference

| Element | Background | Text | Accent |
|---------|-----------|------|--------|
| Hero (dark) | `bg-emerald-950` | `text-white` | `text-emerald-400` |
| Features (light) | `bg-white` | `text-slate-900` | `text-emerald-700` |
| FAQ (light gray) | `bg-slate-50` | `text-slate-900` | — |
| CTA (dark) | `bg-emerald-950` | `text-white` | `text-emerald-400` |
| Footer (dark) | `bg-emerald-950` | `text-slate-200` | `text-emerald-400` |
| Primary Button | `bg-emerald-600` | `text-white` | Hover: `bg-emerald-500` |
| Ghost Button | `bg-transparent` | `text-emerald-100` | Hover: `text-white` |

---

## Icon Reference (Lucide React)

| Feature | Icon |
|---------|------|
| Inventory Precision | `Package` |
| Error-Free Picking | `ScanBarcode` |
| Deadline Mastery | `Clock` |
| Optimized Storage | `LayoutGrid` |
| Total Visibility | `Eye` |
| Rapid Scaling | `TrendingUp` |
| Check/Verified | `Check` |
| Box/Badge | `Box` |

---

## Section Spacing

- **Section padding:** `py-24` (96px top/bottom)
- **Container padding:** `px-4 md:px-6`
- **Gap between features:** `gap-8 md:gap-12`
- **Showcase feature gap:** `space-y-32` (128px)

---

## Animation Notes

- **Framer Motion** for scroll animations
- **Scroll-triggered** animations with `whileInView`
- **Stagger delays** for list items (index * 0.1)
- **Parallax effects** on hero section
- **Floating cards** with independent Y-axis movement

---

## Content Customization for Other Projects

### Replace These Terms:
- "Warehouse" → Your domain (e.g., "Restaurant", "Retail", "Healthcare")
- "WMS Pro" → Your product name
- "Inventory" → Your primary entity
- "Picking/Packing" → Your core operations
- "ONWARD Inc." → Your company name

### Keep These Patterns:
- Problem → Solution → Benefit structure
- Trust indicators (free trial, no credit card)
- Feature showcase with visual demonstrations
- FAQ addressing common objections
- Strong CTA with clear value proposition

---

*Generated from WMS Client Landing Page - April 2026*
