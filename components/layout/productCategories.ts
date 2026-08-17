export interface ProductCategory {
  name: string;
  shortDesc: string;
  href: string;
  badge?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    name: "Finished Pharmaceutical & Healthcare Products",
    shortDesc:
      "WHO-GMP certified generics, specialty therapeutics, injectables, vaccines, nutraceuticals & cosmeceuticals.",
    href: "/products/finished-pharmaceutical-healthcare-products",
    badge: "Rx / Healthcare",
  },
  {
    name: "Active Pharmaceutical Ingredients (APIs)",
    shortDesc:
      "High-purity therapeutic APIs & specialty advanced molecules with comprehensive DMF filings.",
    href: "/products/active-pharmaceutical-ingredients",
    badge: "Bulk Actives",
  },
  {
    name: "Medical Devices & Diagnostics",
    shortDesc:
      "CE & ISO 13485 certified hospital consumables, surgical products, diagnostics & medical equipment.",
    href: "/products/medical-devices-diagnostics",
    badge: "CE / ISO",
  },
];
