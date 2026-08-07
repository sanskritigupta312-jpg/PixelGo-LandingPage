# PixelGo HMS - Enterprise Multi-Vendor Hospitality Platform

[![Version](https://img.shields.io/badge/Version-4.3.0--Enterprise-blue.svg)](https://pixelgo.live)
[![Framework](https://img.shields.io/badge/Laravel-11.x-FF2D20.svg?logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4.svg?logo=php&logoColor=white)](https://php.net)
[![Mobile](https://img.shields.io/badge/Flutter-3.x-02569B.svg?logo=flutter&logoColor=white)](https://flutter.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**PixelGo HMS** is a cloud-native, multi-tenant enterprise operating system built specifically for modern Indian hospitality. Designed from the ground up to replace fragmented legacy software, PixelGo unites **Hotels, Restaurants, Bars, Banquet Lawns, and Resorts** under a single synchronized database, Master Folio billing engine, and real-time Flutter mobile ecosystem.

---

## 📋 Table of Contents

1. [Why PixelGo vs. Legacy Systems](#why-pixelgo-vs-legacy-systems)
2. [Core Platform Capabilities](#core-platform-capabilities)
3. [Deep-Dive Module Breakdown](#deep-dive-module-breakdown)
   - [🏨 Hotel & Property Management (HMS)](#-hotel--property-management-hms)
   - [🍽️ Restaurant POS & Kitchen Operations](#️-restaurant-pos--kitchen-operations)
   - [🍸 Bar & Liquor Inventory Management](#-bar--liquor-inventory-management)
   - [🏰 Banquet, Lawn & Event BEO Engine](#-banquet-lawn--event-beo-engine)
   - [🌴 Independent Resort & Day-Use Module](#-independent-resort--day-use-module)
   - [👥 Enterprise HRM & Shift Scoping](#-enterprise-hrm--shift-scoping)
   - [🌐 White-Label Website Builder & Custom Domains](#-white-label-website-builder--custom-domains)
   - [📱 Flutter Mobile Operations (`hotel-app`)](#-flutter-mobile-operations-hotel-app)
   - [🇮🇳 India-Specific Compliance & GST Suite](#-india-specific-compliance--gst-suite)
4. [System Architecture & Data Flow](#system-architecture--data-flow)
5. [Database Schema Overview](#database-schema-overview)
6. [API & Mobile Sync Architecture](#api--mobile-sync-architecture)
7. [Installation & Local Development Guide](#installation--local-development-guide)
8. [Release History & Changelog](#release-history--changelog)
9. [Security & Multi-Tenancy Isolation](#security--multi-tenancy-isolation)
10. [Support & License](#support--license)

---

## 🎯 Why PixelGo vs. Legacy Systems

Legacy property management systems (e.g., eZee, Hotelogix, Little Hotelier) were architected 15+ years ago exclusively for daily room bookings, forcing operators to bolt on separate software for restaurants, bar tabs, and Indian GST reporting. 

| Feature | Legacy Tools (eZee / Hotelogix) | Little Hotelier | PixelGo HMS v4.3.0 (India's #1) |
| :--- | :---: | :---: | :---: |
| **Unified Daily / Hourly / Monthly Booking** | 🟡 Partial | ❌ No | ✅ **Native in One Engine** |
| **Native Restaurant POS + KOT Sync** | ❌ No | ❌ No | ✅ **Real-time Room Folio Sync** |
| **Bar Operations & ml-level Inventory** | ❌ No | ❌ No | ✅ **Full Liquor Tracking + POS** |
| **Banquet & Event BEO Contracts** | 🟡 Add-on required | ❌ No | ✅ **Integrated BEO + Quotations** |
| **Resort Module & Zone POS** | ❌ No | ❌ No | ✅ **Activity & Day-Use Passes** |
| **Multi-Vendor SaaS Workspaces** | ❌ No | ❌ No | ✅ **Isolated Tenant Architecture** |
| **POS ↔ Room Folio Invoice Sync** | ❌ No | ❌ No | ✅ **Automatic Real-Time Posting** |
| **Full Operations on Smartphone App** | ❌ No | 🟡 Dashboard Only | ✅ **100% API Parity Flutter App** |
| **White-Label Guest Website Builder** | ❌ No | ❌ No | ✅ **Custom Domains + Cloudflare** |
| **India-Specific (GST, UPI, Aadhaar KYC)** | 🟡 Add-on required | ❌ No | ✅ **Native GST Slabs + GSTR Reports** |
| **OTA Channel Manager (Booking.com/MMT)** | 🟡 Add-on required | 🟡 Limited | ✅ **Channex.io API-First Integration** |
| **WhatsApp Business Notifications** | ❌ No | ❌ No | ✅ **AiSensy + Booking Lifecycle Events** |
| **PWA Mobile App for Ground Staff** | ❌ No | ❌ No | ✅ **Multi-Language Big-Button Interface** |
| **API Key Security (Zero Client Exposure)** | ❌ No | ❌ No | ✅ **Server-Side Secure Delivery** |

---

## ✨ Core Platform Capabilities

- **Unified Multi-Tenant Engine**: Single SaaS installation powers thousands of independent hotel operators (`owners` table) with zero data bleed.
- **Dynamic Business Mode Toggle**: Vendors choose their operating footprint during setup (`Hotel`, `Restaurant`, `Bar`, `Banquet`, `Resort`). Navigation menus, dashboard KPIs, and quick-actions adapt instantly.
- **Master Folio Ledger**: Eliminates double-entry billing. A guest dining at the restaurant or ordering drinks at the pool bar can charge transactions directly against their active room reservation.
- **Real-Time Thermal Printing**: Direct ESC/POS printing for 80mm kitchen orders (KOT), bar receipts, and guest checkout folios via Bluetooth, LAN, or USB.
- **Automated Dynamic Pricing**: Production-ready pricing algorithms (`SeasonalPricingController`, `DemandPricingController`, `DiscountController`, `CorporateRateController`) automatically adjust room tariffs based on occupancy surges and calendar dates.

---

## 🔍 Deep-Dive Module Breakdown

### 🏨 Hotel & Property Management (HMS)
- **Multi-Booking Engine**:
  - **Daily Room Nights**: Standard check-in/check-out lifecycle with multi-room folio allocation.
  - **Hourly / Day-Use Bookings**: Configurable check-in time buffers, automatic hourly countdown, and late check-out overtime rate calculation.
  - **Monthly Corporate Leasing**: Extended stay management with periodic billing cycles and corporate invoicing.
- **Room & Housekeeping Management**:
  - Live room grid displaying `Available`, `Occupied`, `Reserved`, `Dirty`, and `Under Maintenance` statuses.
  - Automated housekeeping task assignments and quick turnaround triggers.
- **Aadhaar / KYC Verification Workflow**:
  - Direct ID document upload and verification status tracking integrated into check-in forms to satisfy Indian police reporting regulations.

### 🍽️ Restaurant POS & Kitchen Operations
- **Touch-Optimized POS**:
  - Visual table layouts (`restaurant_areas`, `restaurant_tables`) with color-coded status (`Vacant`, `Seated`, `Billed`).
  - Support for Dine-In, Takeaway, and Room Service delivery modes.
  - Half/Full/Custom portion variant pricing (`restaurant_item_variants`).
- **Kitchen Order Tickets (KOT)**:
  - Instant dispatch to kitchen printers upon order confirmation.
  - Modification tracking and order cancellation logs with supervisor override.
- **Inventory & Recipe Management**:
  - Ingredient-level stock deduction upon every dish sale (`restaurant_stocks`).
  - Comprehensive waste tracking (`restaurant_wastes`), damage tracking (`restaurant_damages`), and vendor purchase orders.

### 🍸 Bar & Liquor Inventory Management
- **High-Speed Bar POS**:
  - Tailored interface for rapid drink ordering across categories (`Spirits`, `Beer`, `Wine`, `Cocktails`, `Snacks`, `Cigarettes`).
- **Milliliter (ml) Precision Tracking**:
  - Track bottle openings and exact ml pours (30ml/60ml/90ml pegs).
  - Automated low-stock alerts and liquor variance reports to prevent pilferage.
- **Happy Hour & Tab Management**:
  - Open and manage bar tabs with direct integration into the guest's hotel room ledger (`booking_bar_charges`).

### 🏰 Banquet, Lawn & Event BEO Engine
- **Venue & Package Builder**:
  - Manage multiple event spaces (`Lawns`, `Banquet Halls`, `Conference Rooms`) with strict date and time-slot collision checks.
- **Banquet Event Orders (BEO)**:
  - Generate professional, printable A4 BEO contracts detailing stage decor, seating layouts, audio-visual requirements, and catering menus.
- **Milestone Billing & Quotations**:
  - Track booking advances, security deposits, and final event settlements (`event_bookings`).

### 🌴 Independent Resort & Day-Use Module
- **Resort Activity Passes**:
  - Manage non-room guests visiting for swimming pool access, spa treatments, or adventure sports.
- **Zone-Based Outlets**:
  - Independent POS registers for poolside bars, beachside shacks, and souvenir shops.

### 👥 Enterprise HRM & Shift Scoping
- **Role-Based Access Control (RBAC)**:
  - Create custom staff profiles with granular permission wildcards (`Multi-Outlet Shift Scoping & Permission Wildcards`).
- **Shift & Attendance Management**:
  - Employee shift tracking, attendance logs, and payroll calculation helpers.
- **Audit Trails**:
  - Complete security log tracking every price override, order cancellation, and folio modification.

### 🌐 White-Label Website Builder & Custom Domains
- **Dedicated Guest Websites**:
  - Every vendor automatically receives a public booking portal (`vendor.pixelgo.live`).
- **Custom Domain & Cloudflare Automation**:
  - Vendors can connect custom domains (e.g., `www.luxuryhotelindia.com`) via automated CNAME/A verification and Cloudflare SSL provisioning.
- **Visual Schema Builder**:
  - Customizable hero banners, photo galleries, amenities grids, and live direct-booking checkout flows.

### 📱 Flutter Mobile Operations (`hotel-app`)
- **100% Backend API Parity**:
  - Over 66+ REST API endpoints (`core/app/Http/Controllers/Api/Owner/`) ensure the mobile app can perform every task available on the web dashboard.
- **Real Actions from Your Pocket**:
  - Check-in/check-out guests directly from mobile.
  - Take restaurant/bar orders at the table and print KOT via Bluetooth thermal printers.
  - Live revenue analytics (`₹ Lakh/Crore` formatting), room occupancy dials, and delayed check-out alerts.

### 🇮🇳 India-Specific Compliance & GST Suite
- **Native GST Slabs**:
  - Configurable CGST, SGST, and IGST tax tiers (e.g., 5% for food, 12%/18% based on room tariff thresholds).
- **Automated Tax Return Reports**:
  - Export instant `GSTR-1`, `GSTR-3B`, `GSTR-4/9`, and `CMP-08` compliance summaries.
- **Payment Routing & UPI**:
  - Integrated Razorpay universal routing for UPI, Net Banking, and Card payments with instant webhook confirmation.

---

## 🏗️ System Architecture & Data Flow

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               PIXELGO HMS ECOSYSTEM                              │
├───────────────────────────────┬──────────────────────────────────┬───────────────┤
│       WEB VENDOR PORTAL       │         GUEST WEBSITES           │  FLUTTER APP  │
│  (Blade / Bootstrap 5 / AJAX) │    (Dynamic Page Builder / SEO)  │ (Dart / REST) │
└───────────────┬───────────────┴─────────────────┬────────────────┴───────┬───────┘
                │                                 │                        │
                ▼                                 ▼                        ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             LARAVEL 11.X CORE ROUTING                            │
│ ┌─────────────────────────┐  ┌─────────────────────────┐  ┌────────────────────┐ │
│ │  owner.php (Web Vendor) │  │ web.php (Public / Guest)│  │ api_owner.php (App)│ │
│ └─────────────┬───────────┘  └────────────┬────────────┘  └──────────┬─────────┘ │
└───────────────┼───────────────────────────┼──────────────────────────┼───────────┘
                │                           │                          │
                ▼                           ▼                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              TENANT ISOLATION LAYER                              │
│       VendorContext Middleware  ──>  getOwnerParentId() & Sanctum Auth Guard     │
└───────────────────────────────────────────┬──────────────────────────────────────┘
                                            │
                                            ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             MASTER FOLIO BILLING ENGINE                          │
│                                                                                  │
│   ┌───────────────────┐       ┌──────────────────────┐       ┌───────────────┐   │
│   │   Room Rent &     │       │   Restaurant POS &   │       │   Bar Tabs &  │   │
│   │   Extensions      │       │   Kitchen Orders     │       │   Liquor Pours│   │
│   └─────────┬─────────┘       └──────────┬───────────┘       └───────┬───────┘   │
│             │                            │                           │           │
│             ▼                            ▼                           ▼           │
│   ┌─────────────────┐         ┌──────────────────────┐       ┌───────────────┐   │
│   │ `bookings`      │ <────── │`booking_restaurant_  │ <──── │ `booking_bar_ │   │
│   │ (Master Folio)  │         │ charges`             │       │ charges`      │   │
│   └─────────┬───────┘         └──────────────────────┘       └───────────────┘   │
│             │                                                                    │
│             ▼                                                                    │
│   ┌──────────────────────────────────────────────────────────────────────────┐   │
│   │                      Consolidated Guest Invoice                          │   │
│   │              (Unified GST Calculation + Thermal ESC/POS Print)           │   │
│   └──────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema Overview

The database (`MySQL 8.0` / `MariaDB`) is organized around strict foreign-key integrity and multi-tenant scoping (`owner_id`):

### Core Tenant & Authentication Tables
- **`owners`**: Hotel/Vendor root accounts, active business modes JSON (`["hotel","restaurant","bar"]`), subscriptions, and domain verification statuses.
- **`admins`**: Super admin accounts for global SaaS management, vendor onboarding, and changelog publishing.

### Hotel & Room Booking Tables
- **`rooms` / `room_types`**: Physical room numbers, pricing tiers, and maintenance states.
- **`bookings`**: The central **Master Folio** record storing check-in/out timestamps, guest info, payment status (`Paid`, `Unpaid`), and total ledger balances.
- **`booked_rooms`**: Individual night/day room allocations tied to a master booking.
- **`guests`**: Guest identity history, Aadhaar number logs, and loyalty reward points.

### Restaurant & Bar POS Tables
- **`restaurant_categories` / `bar_categories`**: Menu organization (`Appetizers`, `Main Course`, `Single Malts`).
- **`restaurant_items` / `bar_items`**: Stock inventory with pricing, SKU, and unit measurements (`kg`, `pcs`, `ml`, `bottles`).
- **`restaurant_orders` / `bar_orders`**: POS transactions storing table numbers, subtotal, GST amounts, and payment mode (`Cash`, `Card`, `Room Charge`).
- **`booking_restaurant_charges` / `booking_bar_charges`**: Pivot tables linking unpaid POS transactions directly to `bookings.id`.

### Banquet & Event Tables
- **`event_venues`**: Hall/Lawn setups with max capacity and base tariff.
- **`event_bookings`**: BEO contracts with client details, event date ranges, quotation amounts, and deposit schedule.

### System & Changelog Tables
- **`changelogs`**: Stored release notes (`version`, `title`, `summary`, `content`, JSON feature arrays) displayed via interactive modal to vendors upon upgrade.
- **`changelog_views`**: Tracks which vendor admins/staff have acknowledged specific release announcements.

---

## 🔌 API & Mobile Sync Architecture

**Base URL:** `/api/owner/`  
**Authentication:** `Bearer {sanctum_token}`

All mobile requests strictly return a standardized JSON envelope to guarantee reliable parsing inside Flutter's `freezed` and `json_serializable` data models:

### Standard Success Envelope
```json
{
  "remark": "success",
  "status": "success",
  "message": ["Data fetched successfully"],
  "data": {
    "active_bookings": 47,
    "available_rooms": 20,
    "month_revenue": "₹3.2L",
    "delayed_checkouts": 4
  }
}
```

### Key API Endpoints
| HTTP Method | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/api/owner/login` | Vendor authentication returning Sanctum token & user profile |
| `GET` | `/api/owner/dashboard` | Live operational metrics, occupancy percentages, and recent activities |
| `GET` | `/api/owner/hotel/rooms` | Real-time status grid of all rooms across the property |
| `POST` | `/api/owner/hotel/booking/create` | Instant walk-in check-in or advance room reservation |
| `GET` | `/api/owner/restaurant/pos` | Retrieve live menu categories, items, variant pricing, and table grid |
| `POST` | `/api/owner/restaurant/order` | Place POS order or charge directly to checked-in guest folio |
| `GET` | `/api/owner/bar/items` | Fetch liquor stock with live bottle & ml count |
| `GET` | `/api/owner/hrm/staff` | List active employees, roles, and attendance check-ins |

---

## 🚀 Installation & Local Development Guide

### Prerequisites
- **PHP**: `^8.3`
- **Composer**: `v2.x`
- **Database**: `MySQL 8.0+` or `MariaDB 10.6+`
- **Node.js**: `v18.x+` (for compiling web assets if needed)
- **Flutter SDK**: `v3.19+` (for mobile app compilation)

### 1. Backend Laravel Setup (`/core`)
```bash
# Clone the repository
git clone https://github.com/sunmughan/pixelgo_hms.git
cd pixelgo_hms/core

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database inside .env:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=pixelgo_hms
# DB_USERNAME=root
# DB_PASSWORD=yourpassword

# Run migrations and seed master data (including Changelogs and default permissions)
php artisan migrate --seed

# Create storage symlink for uploaded logos, KYC documents, and menu images
php artisan storage:link

# Clear all system caches to ensure fresh configuration
php artisan view:clear && php artisan cache:clear && php artisan config:clear

# Start local development server
php artisan serve
# Access Super Admin at: http://127.0.0.1:8000/admin
# Access Vendor Portal at: http://127.0.0.1:8000/owner
```

### 2. Flutter Mobile Application Setup (`/hotel-app`)
```bash
cd ../hotel-app

# Fetch Dart/Flutter dependencies
flutter pub get

# Update API Base URL inside lib/core/utils/constants.dart
# e.g., const String apiBaseUrl = "http://10.0.2.2:8000/api/owner/"; (for Android Emulator)

# Run the app on connected device / emulator
flutter run
```

---

## 📜 Release History & Changelog

### **v4.3.0 (July 13, 2026) — Enterprise Operations Suite: GST, WhatsApp, PWA, Channel Manager & Security Hardening** *(Current Release)*

#### 🇮🇳 Step 1: India GST Engine
- **Added**: Auto-calculated GST tax slabs (5%, 12%, 18%, 28%) with real-time split into CGST/SGST (intra-state) and IGST (inter-state) across all booking, restaurant, bar, and banquet invoices.
- **Added**: GSTIN validation and storage per outlet with automatic tax jurisdiction detection based on guest state vs. property state.
- **Added**: Dedicated GST report exports (`GSTR-1`, `GSTR-3B` summary) with date-range filtering from the owner accounting dashboard.
- **Added**: Database migration `add_gst_fields_to_general_settings` for global GST configuration and `add_gst_fields_to_hotels_table` for per-outlet GSTIN and tax slab overrides.

#### 💬 Step 2: WhatsApp Business API Integration
- **Added**: Multi-provider WhatsApp notification system (`AiSensy`, `Twilio`, `Meta Cloud API`) with superadmin provider selection in notification settings.
- **Added**: Automated WhatsApp message triggers for booking confirmations, check-in welcome, check-out receipts, payment received, and booking cancellations — across all 5 business models.
- **Added**: Template message management with dynamic variable injection (`{{guest_name}}`, `{{booking_id}}`, `{{amount}}`, `{{check_in_date}}`, etc.).
- **Added**: Delivery status tracking (`sent`, `delivered`, `read`, `failed`) with retry logic for failed messages.
- **Added**: Per-outlet WhatsApp toggle — owners can independently enable/disable WhatsApp notifications per business unit.

#### 📱 Step 3: Progressive Web App (PWA) for Ground Staff
- **Added**: Simplified mobile-first PWA interface for housekeepers, waiters, and ground staff on entry-level Android devices.
- **Added**: Housekeeper dashboard with big-button room status toggling (`Mark Clean`, `Mark Dirty`, `Under Maintenance`) — no complex navigation required.
- **Added**: Waiter dashboard with table grid, quick order placement, KOT dispatch, and bill generation in 3 taps.
- **Added**: Multi-language support with 8 Indian languages: Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Tamil (தமிழ்), Telugu (తెలుగు), Malayalam (മലയാളം), Marathi (मराठी), Bengali (বাংলা), and Gujarati (ગુજરાતી).
- **Added**: Offline-capable service worker with manifest.json for Add-to-Home-Screen installation on staff phones.
- **Added**: Role-based access — staff see only their assigned duties (housekeeping OR waiter), not the full owner dashboard.

#### 🔗 Step 4: Channex.io Channel Manager Integration
- **Added**: Developer-first Channex.io API integration for real-time OTA distribution to Booking.com, MakeMyTrip, Agoda, Expedia, Goibibo, and Airbnb.
- **Added**: Superadmin-level global Channex API key configuration with masked password input and enable/disable toggle in system settings.
- **Added**: Owner-level property mapping — each outlet stores its `channex_property_id` with per-room-type `channex_room_type_id` and `channex_rate_plan_id` mapping.
- **Added**: Inbound webhook handler (`POST /api/webhooks/channex`) for real-time booking ingestion with idempotency checks (`external_booking_id`).
- **Added**: `ChannelManagerSyncService` with `pushAvailability()`, `pushRates()`, and `pullReservations()` methods for bidirectional OTA sync.
- **Added**: Database migrations for `channex_config` in `general_settings`, `channex_property_id` and `channex_sync_enabled` in `hotels`, and `channex_room_type_id` / `channex_rate_plan_id` in `room_types`.

#### 🔒 Step 5: Security Hardening — API Key Protection
- **Added**: `SecureConfigController` with `auth` middleware to serve Google Maps and Firebase API keys via authenticated AJAX endpoints (`/secure-config/gmaps`, `/secure-config/firebase`) instead of exposing them in HTML source code.
- **Removed**: `<meta name="google-maps-api-key">` tag from all 4 layout master files (admin, owner, frontend, marketing) — API key no longer visible in View Source.
- **Removed**: Hardcoded Firebase API key from `configs.js` and inline `@json(gs('firebase_config'))` from `push_script.blade.php` — Firebase config now fetched via secure server-side endpoint.
- **Removed**: All `console.log`, `console.warn`, and `console.error` statements from public JavaScript files (`google-maps.js`, `firebase-messaging-sw.js`) to prevent internal system information leaking in browser console.
- **Added**: `loading=async` attribute to Google Maps script tag per Google's best-practice loading guidelines.
- **Added**: HTTP referrer validation and `no-cache` headers on secure config endpoints to prevent key caching and cross-origin theft.

#### 🎨 UI/UX Improvements
- **Fixed**: Mobile App Launcher icon alignment — all icons now sit in a straight horizontal grid line regardless of label text length (1-line vs 2-line labels).
- **Fixed**: Eliminated black pill background containers from mobile app launcher labels by separating desktop (`.dock-label`) and mobile (`.dock-mobile-label`) elements entirely.
- **Improved**: Search bar padding and placeholder text on mobile app launcher views.
- **Upgraded**: Core system version to `v4.3.0` across `helpers.php`, `config/app.php`, and `composer.json`.

---

### **v4.2.0 (July 11, 2026) — Landing Page & UI/UX Perfection Suite**
- **Added**: Continuous right-to-left brand logos marquee carousel with hardware-accelerated GPU animations (`translate3d`) and interactive hover pause on the primary landing page.
- **Added**: Responsive Comparison Table (`"Why Operators Switch"`) footer CTA placement. Added a dedicated desktop & tablet table footer row (`<tfoot>`) placing `Get Started Free` precisely underneath the **PixelGo HMS** column, while preserving zero-regression mobile button positioning.
- **Added**: Core system upgrade to `v4.2.0` across `helpers.php`, `config/app.php`, and `composer.json`.
- **Improved**: Global section header typography alignment (`align-items: flex-start`) and description vertical line offsets across landing templates.
- **Improved**: Centered blog detail page hero headings (`<h1>`), breadcrumbs, metadata, tags (`.blog-tags`), and social sharing bars for balanced editorial readability.
- **Improved**: `@stack('style')` injection hierarchy in `landing_master.blade.php` to guarantee keyframe execution before DOM rendering.
- **Fixed**: Static brand logos grid rendering across legacy browser viewports.

---

### **v4.1.0 (July 8, 2026) — Multi-Business Website Platform & Mobile App Evolution**
- **Added**: Multi-Business Website Builder across all 5 operating modes (`Hotel`, `Restaurant`, `Bar`, `Banquet`, `Resort`).
- **Added**: Location-first guest discovery mobile app with booking lookup, in-stay dashboard, and public APIs.
- **Added**: Admin Login-as-Guest and comprehensive vendor KPI contrast metrics.
- **Fixed**: Live server 500 configuration cache errors and Android `file_picker` Gradle build deprecations.

---

### **v4.0.0 (June 29, 2026) — Enterprise Release: Interactive Search & UI/UX Evolution**
- **Added**: Real-time AJAX search overlay across the vendor dashboard allowing instant lookup of bookings, rooms, POS orders, and guest records.
- **Added**: Modern mobile header with left-aligned burger triggers and quick-action shortcuts.
- **Added**: Unified Sidenav Navigation with floating Quick Compass action orb and bottom modal flyout menu.
- **Fixed**: Vendor App Launcher workspace mode card click handler CSRF token mismatches.

---

### **v3.7.0 (June 27, 2026) — Enterprise Scalability Engine**
- **Added**: Comprehensive GST compliance module with `GSTR-1`, `GSTR-3B`, `GSTR-4/9`, and `CMP-08` reporting.
- **Added**: Universal Razorpay dynamic QR routing and multi-outlet shift scoping.

---

### **v3.0.0 — v3.6.0 (January — April 2026)**
- Launched Banquet & Event BEO builder, dedicated Bar POS with ml precision tracking, independent Resort module, and achieved 100% Flutter mobile app API parity across 66+ controllers.

---

## 🔒 Security & Multi-Tenancy Isolation

1. **Strict Tenant Scoping**:
   Every model query inside `app/Http/Controllers/Owner/` and `app/Http/Controllers/Api/Owner/` enforces tenant isolation:
   ```php
   $rooms = Room::where('owner_id', getOwnerParentId())->get();
   ```
2. **Sanctum API Protection**:
   Mobile API routes are shielded by `auth:sanctum` guards and rate-limited to prevent brute-force login attempts.
3. **Cross-Site Request Forgery (CSRF)**:
   All web forms and AJAX requests strictly validate `@csrf` / `X-CSRF-TOKEN` headers.
4. **Input Sanitization**:
   HTML Purifier (`ezyang/htmlpurifier`) scrubs all rich-text inputs across website builder pages and BEO terms to block XSS attacks.
5. **API Key Zero-Exposure Architecture** *(v4.3.0)*:
   Google Maps API keys and Firebase configurations are never embedded in HTML source, meta tags, or inline scripts. All sensitive keys are served exclusively via authenticated server-side endpoints (`/secure-config/*`) with HTTP referrer validation, session authentication guards, and strict `no-cache` response headers. Public JavaScript files contain zero `console.log` statements to prevent internal system information leakage.
6. **Channex Webhook Security**:
   Inbound OTA booking webhooks validate payload structure and enforce idempotency via `external_booking_id` deduplication before inserting reservation records.

---

## 📞 Support & License

- **Documentation & Live Demo**: [https://pixelgo.live](https://pixelgo.live)
- **Inquiries & Technical Support**: support@pixelgo.live
- **License**: This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <b>PixelGo HMS v4.3.0</b> — <i>Crafted with precision for Indian Hospitality by the PixelGo Engineering Team</i>
</div>
