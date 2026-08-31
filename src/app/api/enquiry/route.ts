import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      console.error("Missing GOOGLE_SCRIPT_URL environment variable.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Prepare payload (convert docs array to a clean string format for spreadsheet display)
    const phoneVal = (data.phone || "").trim();
    const formattedPhone = phoneVal.startsWith("+") ? `'${phoneVal}` : phoneVal;

    let selectedProductStr = "";
    if (data.productContext && data.productContext.product) {
      selectedProductStr = data.productContext.group
        ? `${data.productContext.product} (${data.productContext.group})`
        : data.productContext.product;
    }

    const payload = {
      sourcePage: data.sourcePage || "Website Form",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: formattedPhone,
      company: data.company,
      country: data.country,
      category: data.category,
      selectedProduct: selectedProductStr,
      selectedDocs: Array.isArray(data.selectedDocs) ? data.selectedDocs.join(", ") : "",
      message: data.message,
    };

    // Forward the POST request to the deployed Google Apps Script URL
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Apps Script proxy error response:", errorText);
      return NextResponse.json(
        { error: "Failed to connect to spreadsheet" },
        { status: 500 }
      );
    }

    const result = await response.json();
    if (result.status === "error") {
      console.error("Google Apps Script response reported an execution error:", result.message);
      return NextResponse.json(
        { error: result.message || "Failed to submit rows to Google Sheets" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Internal API proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred" },
      { status: 500 }
    );
  }
}
