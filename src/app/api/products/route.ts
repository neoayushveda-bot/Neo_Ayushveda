import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        category: { select: { name: true, slug: true } },
        images: { orderBy: { position: "asc" } },
      },
    });

    // Format to match the customer website's product structure
    const formatted = products.map((p, idx) => ({
      num: String(idx + 1).padStart(2, "0"),
      category: p.category?.name || "General",
      title: p.name,
      desc: p.description || p.shortDescription,
      tags: p.tags ? p.tags.split(",").map((t) => t.trim()) : [],
      bgImage: p.images && p.images[0] ? p.images[0].url : "/images/prod_generics_rx.png",
      price: p.price,
      featured: p.featured,
      slug: p.slug,
    }));

    return NextResponse.json({ products: formatted });
  } catch (error: any) {
    console.error("Public products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
