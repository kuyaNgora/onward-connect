# Enigma Connect Unified Website - Project Roadmap

**Project ID:** enigma-connect-unified-website
**Status:** Planning
**Complexity:** Medium
**Estimated Duration:** 3-4 weeks
**Last Updated:** 2025-01-06

---

## Project Overview

Enigma Connect Unified Website is a unified portal combining three landing pages (Enigma Connect, Enigma TMS, Enigma WMS) into one main website for Indonesian logistics companies.

### Tech Stack
- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **State:** Redux Toolkit
- **Routing:** React Router
- **SEO:** react-helmet-async

### Pages
- Home (/)
- Products (/produk/tms, /produk/wms)
- About (/about)
- Contact (/contact)
- Login (/login)
- Signup (/signup)

---

## Kanban Board

### To Do (28 tasks)
| ID | Task | Priority | Dependencies |
|----|------|----------|--------------|
| **EPIC 0** | **Project Setup** | | |
| epic-0 | EPIC 0: Project Setup | High | - |
| task-0-1 | Initialize Vite + React + TypeScript | High | - |
| task-0-2 | Install Dependencies | High | task-0-1 |
| task-0-3 | Configure Project Structure | High | task-0-2 |
| **EPIC 1** | **Core Infrastructure** | | |
| epic-1 | EPIC 1: Core Infrastructure | High | epic-0 |
| task-1-1 | Setup React Router | High | task-0-3 |
| task-1-2 | Setup Redux Store | High | task-0-3 |
| task-1-3 | Create MainLayout | High | task-1-1, task-1-2 |
| task-1-4 | Create AuthLayout | Medium | task-1-3 |
| **EPIC 2** | **Shared Components** | | |
| epic-2 | EPIC 2: Shared Components | High | epic-1 |
| task-2-1 | Create Navbar Component | High | task-1-3 |
| task-2-2 | Create Footer Component | High | task-1-3 |
| task-2-3 | Create HeroSection Component | Medium | - |
| task-2-4 | Create ProductCard Component | Medium | - |
| task-2-5 | Create CTASection Component | Medium | - |
| **EPIC 3** | **Public Pages** | | |
| epic-3 | EPIC 3: Public Pages | High | epic-1, epic-2 |
| task-3-1 | Create Home Page | High | task-2-1, task-2-2, task-2-3 |
| task-3-2 | Create TMS Product Page | High | task-2-4, task-3-1 |
| task-3-3 | Create WMS Product Page | High | task-2-4, task-3-1 |
| task-3-4 | Create About Page | Medium | task-3-1 |
| task-3-5 | Create Contact Page | Medium | task-3-1 |
| **EPIC 4** | **Auth Pages** | | |
| epic-4 | EPIC 4: Auth Pages | High | epic-1 |
| task-4-1 | Create Login Page | High | task-1-4 |
| task-4-2 | Create Signup Page | High | task-1-4 |
| task-4-3 | Create Signup Service | High | task-4-2 |
| **EPIC 5** | **SEO & Performance** | | |
| epic-5 | EPIC 5: SEO & Performance | High | epic-3, epic-4 |
| task-5-1 | Setup SEO with react-helmet-async | High | task-3-5, task-4-3 |
| task-5-2 | Create Sitemap and Robots.txt | High | task-5-1 |
| task-5-3 | Performance Optimization | Medium | task-5-1 |

### In Progress
_No tasks in progress_

### Review
_No tasks under review_

### Done
_No tasks completed yet_

---

## Epic Details

### EPIC 0: Project Setup
**Goal:** Initialize React + Vite + TypeScript project with all dependencies

**Tasks:**
- [ ] task-0-1: Initialize Vite + React + TypeScript
- [ ] task-0-2: Install Dependencies (Tailwind, Redux, Router, SEO)
- [ ] task-0-3: Configure Project Structure

**Dependencies:** None (Root Epic)

---

### EPIC 1: Core Infrastructure
**Goal:** Set up routing system, Redux store, and base layouts

**Tasks:**
- [ ] task-1-1: Setup React Router with all routes
- [ ] task-1-2: Setup Redux Store (authSlice, uiSlice)
- [ ] task-1-3: Create MainLayout with Navbar/Footer
- [ ] task-1-4: Create AuthLayout for auth pages

**Dependencies:** EPIC 0 complete

---

### EPIC 2: Shared Components
**Goal:** Build reusable UI components

**Tasks:**
- [ ] task-2-1: Create Navbar Component (responsive)
- [ ] task-2-2: Create Footer Component
- [ ] task-2-3: Create HeroSection Component
- [ ] task-2-4: Create ProductCard Component
- [ ] task-2-5: Create CTASection Component

**Dependencies:** EPIC 1 complete

---

### EPIC 3: Public Pages
**Goal:** Build all public-facing pages

**Tasks:**
- [ ] task-3-1: Create Home Page (Hero, About, Products, Benefits, Industries, CTA)
- [ ] task-3-2: Create TMS Product Page (monitoring, fleet, route, tracking)
- [ ] task-3-3: Create WMS Product Page (stock, receiving, picking, reporting)
- [ ] task-3-4: Create About Page
- [ ] task-3-5: Create Contact Page with form

**Dependencies:** EPIC 1, EPIC 2 complete

---

### EPIC 4: Auth Pages
**Goal:** Build Login and Signup pages with system selection

**Tasks:**
- [ ] task-4-1: Create Login Page (TMS/WMS selection)
- [ ] task-4-2: Create Signup Page (form with product selection)
- [ ] task-4-3: Create Signup Service (POST /signup)

**Dependencies:** EPIC 1 complete

---

### EPIC 5: SEO & Performance
**Goal:** Implement SEO optimization and performance enhancements

**Tasks:**
- [ ] task-5-1: Setup SEO with react-helmet-async (meta tags for all pages)
- [ ] task-5-2: Create Sitemap and Robots.txt
- [ ] task-5-3: Performance Optimization (lazy loading, code splitting, Lighthouse ≥90)

**Dependencies:** EPIC 3, EPIC 4 complete

---

## Execution Commands

### Execute Entire Roadmap
```bash
/execute-parallel --until-finish
```

### Execute Individual Epic
```bash
/execute-task epic-0
/execute-task epic-1
/execute-task epic-2
/execute-task epic-3
/execute-task epic-4
/execute-task epic-5
```

### Execute Individual Task
```bash
/execute-task task-0-1
/execute-task task-1-1
# ... etc
```

---

## Progress Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 28 |
| Completed | 0 |
| In Progress | 0 |
| To Do | 28 |
| Completion | 0% |

---

## Parallel Execution Groups

**Group 1:** task-1-2, task-2-1, task-2-2, task-2-3, task-2-4, task-2-5
**Group 2:** task-3-2, task-3-3, task-3-4, task-3-5, epic-4

---

*Roadmap generated with SDD 4.0*
