/**
 * ==============================================================================
 * Neo Ayushveda - Google Apps Script Form Submission Endpoint
 * ==============================================================================
 * Connects all website forms (General Sourcing Enquiry, Product Category Enquiries)
 * to a Google Sheet automatically.
 *
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new or your existing sheet).
 * 2. Click Extensions > Apps Script in the menu bar.
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set 'Execute as': 'Me' (your email).
 * 7. Set 'Who has access': 'Anyone' (IMPORTANT: Must be set to 'Anyone' so the website can send data).
 * 8. Click 'Deploy' and copy the 'Web App URL'.
 * 9. Add the URL to your .env.local file in Next.js:
 *    GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Acquire a lock for up to 10 seconds to handle concurrent form submissions safely
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse("error", "Server busy, could not acquire lock. Please try again.");
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Header names matching website form fields
    var headers = [
      "Timestamp",
      "First Name",
      "Last Name",
      "Email Address",
      "Phone Number",
      "Company / Organization",
      "Country",
      "Product Category",
      "Product / Segment",
      "Product Group",
      "Required Documentation",
      "Message",
      "Source"
    ];

    // Auto-create Header Row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Style Header Row (Dark Emerald background with white bold text)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0A1A12");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Parse incoming JSON body or parameters
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Format fields cleanly
    var timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    var firstName = data.firstName || "";
    var lastName = data.lastName || "";
    var email = data.email || "";
    
    // Prevent Google Sheets from stripping leading '+' or treating phone as formula/number
    var rawPhone = (data.phone || "").toString().trim();
    var phone = rawPhone ? (rawPhone.indexOf("'") === 0 ? rawPhone : "'" + rawPhone) : "";
    
    var company = data.company || "";
    var country = data.country || "";
    var category = data.category || "";
    var productEnquiry = data.productEnquiry || "";
    var productGroup = data.productGroup || "";
    var selectedDocs = Array.isArray(data.selectedDocs) ? data.selectedDocs.join(", ") : (data.selectedDocs || "");
    var message = data.message || "";
    var source = productEnquiry ? "Product Page (" + productEnquiry + ")" : "General Form";

    // Row Data Array matching headers exactly
    var newRow = [
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      company,
      country,
      category,
      productEnquiry,
      productGroup,
      selectedDocs,
      message,
      source
    ];

    sheet.appendRow(newRow);

    return createJsonResponse("success", "Form submission recorded successfully.");

  } catch (error) {
    return createJsonResponse("error", error.toString());
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse("active", "Neo Ayushveda Google Sheets Integration Endpoint is active!");
}

function createJsonResponse(status, message) {
  var output = JSON.stringify({
    status: status,
    message: message
  });
  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}
