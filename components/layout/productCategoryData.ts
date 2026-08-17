export interface SubItem {
  name: string;
}

export interface SubCategory {
  groupTitle: string;
  items: (SubItem | { name: string; children: SubItem[] })[];
}

export interface ProductCategoryDetail {
  name: string;
  slug: string;
  badge?: string;
  shortDesc: string;
  heroDesc: string;
  subcategories: SubCategory[];
}

export const PRODUCT_CATEGORY_DETAILS: ProductCategoryDetail[] = [
  // ─── 1. Finished Pharmaceutical & Healthcare Products ───
  {
    name: "Finished Pharmaceutical & Healthcare Products",
    slug: "finished-pharmaceutical-healthcare-products",
    badge: "Rx / Healthcare",
    shortDesc:
      "WHO-GMP certified generics, specialty therapeutics, injectables, vaccines, nutraceuticals & cosmeceuticals.",
    heroDesc:
      "Comprehensive range of WHO-GMP certified finished dosage forms — generics, specialty therapeutics, injectables, vaccines, nutraceuticals, and dermatology products — spanning all major therapeutic areas for global healthcare needs.",
    subcategories: [
      {
        groupTitle: "Generics",
        items: [
          { name: "Anti-Infectives" },
          { name: "Cardiovascular" },
          { name: "Diabetes" },
          { name: "Gastrointestinal" },
          { name: "Respiratory" },
          { name: "CNS / Neurology" },
          { name: "Pain Management" },
          { name: "Women's Health" },
          { name: "Pediatrics" },
          { name: "Urology" },
          { name: "Dermatology" },
        ],
      },
      {
        groupTitle: "Specialty & Complex Therapeutics",
        items: [
          { name: "Oncology" },
          { name: "Hematology" },
          { name: "Immunology" },
          { name: "Endocrinology" },
          { name: "Nephrology" },
          { name: "Transplant Medicines" },
          { name: "Cardio-Metabolic" },
          { name: "Pulmonology" },
          { name: "Rare Disease Therapies" },
        ],
      },
      {
        groupTitle: "Injectables & Hospital Products",
        items: [
          { name: "Critical Care Injectables" },
          { name: "General Injectables" },
          { name: "IV Fluids & Solutions" },
          { name: "Parenteral Nutrition" },
        ],
      },
      {
        groupTitle: "Vaccines & Biologicals",
        items: [
          { name: "Pediatric Vaccines" },
          { name: "Adult Vaccines" },
          { name: "Combination Vaccines" },
          { name: "Monoclonal Antibodies" },
          { name: "Biosimilars" },
        ],
      },
      {
        groupTitle: "Nutraceuticals & Dietary Supplements",
        items: [
          { name: "Vitamins & Minerals" },
          { name: "Probiotics" },
          { name: "Protein Supplements" },
          { name: "Sports Nutrition" },
          { name: "Immunity Boosters" },
        ],
      },
      {
        groupTitle: "Dermatology & Cosmeceuticals",
        items: [
          { name: "Acne Care" },
          { name: "Anti-Fungal" },
          { name: "Sunscreens & SPF" },
          { name: "Anti-Ageing" },
          { name: "Hair Care" },
        ],
      },
    ],
  },

  // ─── 2. Active Pharmaceutical Ingredients (APIs) ───
  {
    name: "Active Pharmaceutical Ingredients (APIs)",
    slug: "active-pharmaceutical-ingredients",
    badge: "Bulk Actives",
    shortDesc:
      "High-purity therapeutic APIs & specialty advanced molecules with comprehensive DMF filings.",
    heroDesc:
      "High-purity Active Pharmaceutical Ingredients (APIs) with comprehensive DMF filings and regulatory documentation — covering therapeutic, advanced, and specialty chemical categories for global formulation partners.",
    subcategories: [
      {
        groupTitle: "Therapeutic APIs",
        items: [
          { name: "Oncology" },
          { name: "Cardiovascular" },
          { name: "Anti-Diabetic" },
          { name: "CNS" },
          { name: "Gastrointestinal" },
          { name: "Anti-Infective" },
          { name: "Respiratory" },
          { name: "Hematinic" },
          { name: "Hormonal" },
          { name: "Dermatology" },
        ],
      },
      {
        groupTitle: "Specialty / Advanced APIs",
        items: [
          { name: "HPAPIs" },
          { name: "Peptides" },
          { name: "Steroid APIs" },
          { name: "Fermentation APIs" },
          { name: "Complex Molecules" },
        ],
      },
    ],
  },

  // ─── 3. Medical Devices & Diagnostics ───
  {
    name: "Medical Devices & Diagnostics",
    slug: "medical-devices-diagnostics",
    badge: "CE / ISO",
    shortDesc:
      "CE & ISO 13485 certified hospital consumables, surgical products, diagnostics & medical equipment.",
    heroDesc:
      "CE-marked and ISO 13485 certified medical devices, hospital consumables, surgical products, diagnostic kits, and medical equipment — meeting international quality and safety standards for institutional healthcare.",
    subcategories: [
      {
        groupTitle: "Hospital Consumables",
        items: [
          { name: "IV Sets & Cannulas" },
          { name: "Syringes & Needles" },
          { name: "Catheters" },
          { name: "Blood Transfusion Sets" },
          { name: "Feeding Tubes" },
        ],
      },
      {
        groupTitle: "Surgical Products",
        items: [
          { name: "Surgical Gloves" },
          { name: "Surgical Sutures" },
          { name: "Dressings & Gauze" },
          { name: "Surgical Masks" },
          { name: "Disposable Gowns" },
        ],
      },
      {
        groupTitle: "Diagnostic Products",
        items: [
          { name: "Rapid Diagnostic Tests" },
          { name: "Blood Glucose Monitoring" },
          { name: "Infectious Disease Tests" },
          { name: "Laboratory Consumables" },
        ],
      },
      {
        groupTitle: "Medical Equipment",
        items: [
          { name: "Patient Monitoring" },
          { name: "Oxygen-related Devices" },
          { name: "Nebulizers" },
          { name: "Diagnostic Instruments" },
        ],
      },
    ],
  },
];

/** Look up category by slug */
export function getCategoryBySlug(
  slug: string
): ProductCategoryDetail | undefined {
  return PRODUCT_CATEGORY_DETAILS.find((c) => c.slug === slug);
}
