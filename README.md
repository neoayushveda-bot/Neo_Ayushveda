# Neo Life Sciences — Corporate B2B Pharmaceutical Website

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Icons](https://img.shields.io/badge/Icons-FontAwesome_6-003A95?style=flat-square&logo=fontawesome)

Official enterprise B2B portal for **NEO LIFE SCIENCES PVT LTD**, a premier Hyderabad, India-based pharmaceutical merchant exporter serving over 50 international healthcare markets across Asia, Africa, CIS, Latin America, and the Middle East.

---

## 🌟 Overview & Features

- **Dr. Reddy's & Sun Pharma Inspired Design**: Modern, trustworthy, enterprise B2B pharmaceutical aesthetics with glassmorphism touches, subtle ambient lighting, clean grid textures, and high contrast typography.
- **Comprehensive Product Directory**: 9 specialized therapeutic and commercial segments:
  1. Active Pharmaceutical Ingredients (APIs)
  2. Finished Pharmaceutical Formulations (Rx Generics)
  3. Specialty & Complex Therapeutics
  4. Injectables & Hospital Products
  5. Vaccines & Biologics
  6. Nutraceuticals & Dietary Supplements
  7. Medical Devices & Diagnostics
  8. Dermatology, Personal Care & Cosmeceuticals
  9. Classical Ayurvedic Medicines
- **Direct B2B Sourcing Desk**: Interactive procurement form supporting multi-document requests (CTD Dossiers, COA, GMP, COO, DMF) with pre-filled product parameters.
- **Google Sheets Integration**: Proxy API endpoint (`/api/enquiry`) forwarding inquiries directly to a Google Sheet via a Google Apps Script Web App webhook.
- **Interactive Global Reach Map**: Hardware-accelerated global map visualization featuring Hyderabad HQ exporting to major international market corridors using MapLibre GL and Framer Motion.
- **FontAwesome 6 Icon Standard**: 100% solid, professional B2B icon set (`react-icons/fa6`) eliminating generic AI line-icon aesthetics.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server-side rendering, static route generation, API routes |
| **Language** | TypeScript 5 | Strict type-safety across components and data modules |
| **UI Library** | React 19 | Component-driven user interface architecture |
| **Styling** | Vanilla CSS + Tailwind CSS 3 | Modern design tokens, custom glassmorphism utilities, grid textures |
| **Animations** | Framer Motion | Fluid scroll reveals, micro-interactions, badge animations |
| **Iconography** | FontAwesome 6 (`react-icons/fa6`) | Clean, solid, pharmaceutical B2B icon system |
| **Mapping & GIS** | MapLibre GL & Dotted Map | Interactive global trade routes and corridor maps |

---

## 📁 Repository Structure

```
neolife/
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # Responsive header, mega-menu, mobile drawer
│   │   ├── Footer.tsx                 # Corporate footer, accreditation badges, quick links
│   │   └── productCategoryData.ts     # Master product segment catalog & subcategory dataset
│   ├── sections/
│   │   └── GlobalReach.tsx            # Global market coverage & map section
│   └── ui/
│       ├── mapcn-map-arc.tsx          # MapLibre GL route arc renderer
│       └── world-map.tsx              # Canvas / SVG interactive corridor map
├── public/
│   └── images/                        # High-res assets (Logos, iPHEX poster, leadership, products)
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx               # Enterprise profile, leadership, operating model
│   │   ├── api/
│   │   │   ├── enquiry/
│   │   │   │   └── route.ts           # Google Apps Script proxy webhook for RFQ submissions
│   │   │   └── products/
│   │   │       └── route.ts           # Public API returning catalog data
│   │   ├── enquiry/
│   │   │   └── page.tsx               # B2B sourcing enquiry form page
│   │   ├── privacy-policy/
│   │   │   └── page.tsx               # Data protection, regulatory & medical disclaimer
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Dynamic category detail page with segment filtering
│   │   ├── globals.css                # Design system tokens, glassmorphism, animations
│   │   ├── layout.tsx                 # Root layout with fonts, metadata, SEO
│   │   └── page.tsx                   # Main homepage (Hero, Bento Pillars, Workflow, Form, iPHEX modal)
└── package.json
```

---

## ⚡ Environment Variables & Setup

Create a `.env.local` file in the root directory:

```env
# Google Apps Script Web App URL for Google Sheets Integration
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Setting up the Google Sheets Webhook:

1. Create a **Google Sheet** to store form responses (e.g. `First Name`, `Last Name`, `Email`, `Phone`, `Company`, `Country`, `Category`, `Selected Docs`, `Message`, `Timestamp`).
2. Open **Extensions > Apps Script** in your Google Sheet.
3. Paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.company,
      data.country,
      data.category,
      data.selectedDocs,
      data.message
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy > New deployment**.
5. Select **Type**: *Web app*.
6. Set **Execute as**: *Me*.
7. Set **Who has access**: *Anyone*.
8. Copy the Web app URL and paste it into `.env.local` as `GOOGLE_SCRIPT_URL`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```

---

## 🏢 Corporate Contact Information

**NEO LIFE SCIENCES PVT LTD**  
201-2nd Floor, Above ICICI Bank,  
Plot 13/A/B Lane 12, MLA Colony, Banjara Hills,  
Hyderabad – 500034, Telangana, India  

- **Email**: `contact@neolspharma.com`
- **Corporate Phones**: `040-35247813` / `+91 87124 43610`
- **Website**: [neolspharma.com](https://www.neolspharma.com/)
