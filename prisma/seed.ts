import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // --- Categories ---
  const categoryData = [
    { name: "Pharmaceutical Generics", slug: "pharmaceutical-generics", description: "WHO-GMP certified generic medicines across all major therapeutic categories." },
    { name: "Specialty Therapeutics", slug: "specialty-therapeutics", description: "Oncology, diabetes, HIV/AIDS, TB, critical care, cardiovascular, and injectables." },
    { name: "Nutraceuticals", slug: "nutraceuticals", description: "Premium daily health supplements, vitamins, multi-minerals, and organic formulations." },
    { name: "Injectable Vaccines", slug: "injectable-vaccines", description: "Critical care injectables, vials, pre-filled syringes, and vaccines." },
    { name: "APIs", slug: "apis", description: "Active Pharmaceutical Ingredients and regulatory intermediates." },
    { name: "Medical Devices", slug: "medical-devices", description: "CE, ISO 13485 surgical instruments, diagnostic equipment, and disposables." },
    { name: "Ayurvedic Medicines", slug: "ayurvedic-medicines", description: "Classical Ayurvedic formulations from licensed AYUSH GMP manufacturers." },
    { name: "Herbal Nutraceuticals", slug: "herbal-nutraceuticals", description: "Standardized organic botanical extracts and phytochemical actives." },
    { name: "Cosmeceuticals", slug: "cosmeceuticals", description: "Dermatologist-recommended skincare, haircare, and wellness cosmetics." },
    { name: "Bulk Drugs", slug: "bulk-drugs", description: "Raw materials, bulk drug formulations, and high-purity chemical substances." },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoryData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = created.id;
  }
  console.log(`✅ ${categoryData.length} categories created`);

  // --- Products (migrated from existing hardcoded data) ---
  const productsData = [
    {
      name: "Pharmaceutical Generics (Rx)",
      slug: "pharmaceutical-generics-rx",
      sku: "NEO-GEN-001",
      description: "Sourcing prescription generic medicines across all major therapeutic categories (HIV/AIDS therapeutics, oncology, cardiovascular, CNS) from WHO-GMP certified facilities.",
      shortDescription: "WHO-GMP certified prescription generics",
      price: 4999,
      stock: 500,
      status: "ACTIVE",
      featured: true,
      categorySlug: "pharmaceutical-generics",
      tags: "Tablets,Capsules,HIV/AIDS Care,Dossiers",
      bgImage: "/images/prod_generics_rx.png",
    },
    {
      name: "Specialty Therapeutics",
      slug: "specialty-therapeutics",
      sku: "NEO-SPT-002",
      description: "Exporting therapeutic solutions including oncology treatments, diabetes care, HIV/AIDS, tuberculosis (TB), critical care medicines, cardiovascular care, injectables, vaccines, and daily nutraceuticals.",
      shortDescription: "Oncology, diabetes, HIV/AIDS, and critical care",
      price: 8999,
      stock: 350,
      status: "ACTIVE",
      featured: true,
      categorySlug: "specialty-therapeutics",
      tags: "Oncology,Diabetes Care,HIV/AIDS,Tuberculosis (TB),Critical Care,Cardiovascular,Injectables,Vaccines,Nutraceuticals",
      bgImage: "/images/prod_generics_otc.png",
    },
    {
      name: "Nutraceuticals",
      slug: "nutraceuticals",
      sku: "NEO-NUT-003",
      description: "Premium daily health supplements, vitamins, multi-minerals, and organic nutrient formulations for international health markets.",
      shortDescription: "Daily health supplements and vitamins",
      price: 1999,
      stock: 800,
      status: "ACTIVE",
      featured: false,
      categorySlug: "nutraceuticals",
      tags: "Vitamins,Minerals,Daily Care",
      bgImage: "/images/prod_nutraceuticals.png",
    },
    {
      name: "Injectable Vaccines",
      slug: "injectable-vaccines",
      sku: "NEO-INJ-004",
      description: "We found all pharmaceuticals for Anti Diseases, Critical care injectables, vials, pre-filled syringes, and high-safety vaccines processed under strict aseptic cleanroom environments.",
      shortDescription: "Critical care injectables and vaccines",
      price: 12999,
      stock: 200,
      status: "ACTIVE",
      featured: true,
      categorySlug: "injectable-vaccines",
      tags: "Injectables,Vaccines,Critical Care",
      bgImage: "/images/prod_injectables.png",
    },
    {
      name: "APIs",
      slug: "apis-active-ingredients",
      sku: "NEO-API-005",
      description: "Active Pharmaceutical Ingredients, bulk drug actives, and regulatory intermediates sourced from US FDA-inspected manufacturing plants.",
      shortDescription: "Active Pharmaceutical Ingredients",
      price: 24999,
      stock: 150,
      status: "ACTIVE",
      featured: false,
      categorySlug: "apis",
      tags: "Active Ingredients,DMF Files,RSM",
      bgImage: "/images/prod_apis.png",
    },
    {
      name: "Medical Devices",
      slug: "medical-devices",
      sku: "NEO-DEV-006",
      description: "CE, ISO 13485, and FDA-ready surgical instruments, diagnostic equipment, healthcare disposables, and clinical hardware.",
      shortDescription: "CE and ISO certified medical devices",
      price: 15999,
      stock: 100,
      status: "ACTIVE",
      featured: false,
      categorySlug: "medical-devices",
      tags: "Diagnostics,Surgical,Disposables",
      bgImage: "/images/prod_devices.png",
    },
    {
      name: "Ayurvedic Medicines",
      slug: "ayurvedic-medicines",
      sku: "NEO-AYU-007",
      description: "Classical Ayurvedic formulations, natural wellness vatis, churnas, and tailas sourced from licensed AYUSH GMP manufacturers.",
      shortDescription: "AYUSH certified classical formulations",
      price: 2499,
      stock: 600,
      status: "ACTIVE",
      featured: true,
      categorySlug: "ayurvedic-medicines",
      tags: "Vatis,Churnas,Asavas,Tailas",
      bgImage: "/images/prod_ayurvedic.png",
    },
    {
      name: "Herbal Nutraceuticals",
      slug: "herbal-nutraceuticals",
      sku: "NEO-HRB-008",
      description: "Standardized organic botanical extracts, phytochemical actives, and custom herbal capsule ingredients with complete batch COAs.",
      shortDescription: "Organic botanical extracts",
      price: 3499,
      stock: 450,
      status: "ACTIVE",
      featured: false,
      categorySlug: "herbal-nutraceuticals",
      tags: "Ashwagandha,Turmeric,Moringa",
      bgImage: "/images/prod_herbal.png",
    },
    {
      name: "Cosmeceuticals",
      slug: "cosmeceuticals",
      sku: "NEO-COS-009",
      description: "Dermatologist-recommended skincare, clinical haircare, and personal wellness cosmetics available with Halal or Vegan certifications.",
      shortDescription: "Halal/Vegan certified cosmetics",
      price: 1799,
      stock: 700,
      status: "ACTIVE",
      featured: false,
      categorySlug: "cosmeceuticals",
      tags: "Skincare,Haircare,Medicated",
      bgImage: "/images/prod_cosmeceuticals.png",
    },
    {
      name: "Bulk Drugs",
      slug: "bulk-drugs",
      sku: "NEO-BLK-010",
      description: "Exporting raw materials, bulk drug formulations, and high-purity chemical substances to global pharmaceutical manufacturers.",
      shortDescription: "Bulk drug formulations and raw materials",
      price: 19999,
      stock: 250,
      status: "ACTIVE",
      featured: false,
      categorySlug: "bulk-drugs",
      tags: "Bulk Actives,Intermediates,Raw Materials",
      bgImage: "/images/prod_bulk_drugs.png",
    },
  ];

  for (const p of productsData) {
    const { categorySlug, bgImage, ...productFields } = p;
    const categoryId = categories[categorySlug] || null;
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...productFields,
        categoryId,
        views: Math.floor(Math.random() * 5000) + 500,
        unitsSold: Math.floor(Math.random() * 200) + 10,
        revenue: Math.floor(Math.random() * 500000) + 50000,
      },
    });

    // Create product image from existing public image
    const existingImage = await prisma.productImage.findFirst({
      where: { productId: product.id },
    });
    if (!existingImage) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: bgImage,
          alt: p.name,
          position: 0,
        },
      });
    }
  }
  console.log(`✅ ${productsData.length} products created with images`);

  // --- Sample Customers ---
  const customerData = [
    { name: "Ahmed Al-Rashid", email: "ahmed@gulfpharma.ae", phone: "+971501234567", company: "Gulf Pharma Trading LLC", country: "United Arab Emirates (UAE)", totalSpent: 284500, orderCount: 12 },
    { name: "Sarah Johnson", email: "sarah@medilogistics.co.uk", phone: "+447700900123", company: "MediLogistics UK", country: "United Kingdom (UK)", totalSpent: 156000, orderCount: 8 },
    { name: "Dr. Kwame Asante", email: "kwame@accrahealthsupply.gh", phone: "+233244123456", company: "Accra Health Supply", country: "Ghana", totalSpent: 98500, orderCount: 5 },
    { name: "Maria Santos", email: "maria@brasilfarma.com.br", phone: "+5511987654321", company: "Brasil Farma Distribuicao", country: "Brazil", totalSpent: 345000, orderCount: 15 },
    { name: "Nguyen Van Minh", email: "minh@vnpharma.vn", phone: "+84912345678", company: "VN Pharma Import Co.", country: "Vietnam", totalSpent: 127500, orderCount: 6 },
    { name: "Fatima Zahra", email: "fatima@marocmedical.ma", phone: "+212661234567", company: "Maroc Medical Distribution", country: "Morocco", totalSpent: 67000, orderCount: 3 },
    { name: "Rajesh Kumar", email: "rajesh@indohealth.co.id", phone: "+6281234567890", company: "Indo Health Solutions", country: "Indonesia", totalSpent: 210000, orderCount: 9 },
    { name: "Elena Volkov", email: "elena@euromeds.kz", phone: "+77012345678", company: "EuroMeds Kazakhstan", country: "Kazakhstan", totalSpent: 189000, orderCount: 7 },
  ];

  for (const c of customerData) {
    await prisma.customer.upsert({
      where: { email: c.email },
      update: {},
      create: c,
    });
  }
  console.log(`✅ ${customerData.length} customers created`);

  // --- Sample Orders ---
  const orderStatuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];
  const paymentStatuses = ["PENDING", "PAID", "PAID", "PAID", "PAID"];

  for (let i = 0; i < 25; i++) {
    const customer = customerData[Math.floor(Math.random() * customerData.length)];
    const statusIdx = Math.floor(Math.random() * orderStatuses.length);
    const subtotal = Math.floor(Math.random() * 100000) + 5000;
    const tax = Math.floor(subtotal * 0.18);
    const discount = Math.floor(Math.random() * 5000);
    const total = subtotal + tax - discount;
    const daysAgo = Math.floor(Math.random() * 90);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    const items = JSON.stringify([
      {
        productName: productsData[Math.floor(Math.random() * productsData.length)].name,
        quantity: Math.floor(Math.random() * 50) + 1,
        unitPrice: Math.floor(Math.random() * 10000) + 1000,
      },
      {
        productName: productsData[Math.floor(Math.random() * productsData.length)].name,
        quantity: Math.floor(Math.random() * 20) + 1,
        unitPrice: Math.floor(Math.random() * 5000) + 500,
      },
    ]);

    await prisma.order.create({
      data: {
        orderNumber: `NEO-${String(2024000 + i).padStart(7, "0")}`,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        items,
        subtotal,
        tax,
        discount,
        total,
        paymentStatus: paymentStatuses[statusIdx],
        orderStatus: orderStatuses[statusIdx],
        shippingAddress: `${customer.company}, ${customer.country}`,
        billingAddress: `${customer.company}, ${customer.country}`,
        createdAt,
        updatedAt: createdAt,
      },
    });
  }
  console.log("✅ 25 sample orders created");

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
