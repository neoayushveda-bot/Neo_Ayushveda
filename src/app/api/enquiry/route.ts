import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbzlDtCpPM-6dt_ilhOQzmYSR3rREWC3KItmRFw9lJJAa2VW7YAD-B1VkTXiO6cMgIwghw/exec";

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
    // Note: Google Apps Script requires redirect: "follow" and text/plain content-type to handle 302 redirects smoothly in Node.js fetch
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Google Apps Script proxy error (Status " + response.status + "):", responseText);
      return NextResponse.json(
        { error: `Google Sheets error (${response.status}): ${responseText.slice(0, 100)}` },
        { status: 500 }
      );
    }

    let result: any = {};
    try {
      result = JSON.parse(responseText);
    } catch {
      // Google Apps Script sometimes returns success HTML or plain text on redirect
      result = { status: "success" };
    }

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
