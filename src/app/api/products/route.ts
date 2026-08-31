import { NextResponse } from "next/server";
import { PRODUCT_CATEGORY_DETAILS } from "../../../../components/layout/productCategoryData";

export async function GET() {
  try {
    return NextResponse.json({ products: PRODUCT_CATEGORY_DETAILS });
  } catch (error: any) {
    console.error("Public products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
