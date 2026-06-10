import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();

    const corporateName = formData.get("corporateName")?.toString().trim();
    const buyerName = formData.get("buyerName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const quantity = formData.get("quantity")?.toString().trim();
    const targetPrice = formData.get("targetPrice")?.toString().trim();
    const specifications = formData.get("specifications")?.toString().trim();

    // Basic validation
    if (
      !corporateName ||
      !buyerName ||
      !email ||
      !category ||
      !quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    // Process uploaded files
    const files = formData.getAll("files");
    const attachments = [];

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    for (const file of files) {
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: `${file.name} exceeds 10MB limit.`,
            },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    }

    // SMTP transporter
    const port = Number(process.env.SMTP_PORT || 465);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Optional verification
    await transporter.verify();

    // Email template
    const mailOptions = {
      from: `"${escapeHtml(
        buyerName
      )} via RFQ Portal" <${process.env.SMTP_USER}>`,

      to: process.env.COMPANY_RECEIVER_EMAIL,

      replyTo: email,

      subject: `[New RFQ Submission] ${escapeHtml(
        corporateName
      )} - ${category.toUpperCase()}`,

      html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#333;line-height:1.6;">

        <h2 style="border-bottom:2px solid #292524;padding-bottom:10px;">
          New B2B RFQ Submission
        </h2>

        <table style="width:100%;border-collapse:collapse;">

          <tr>
            <td style="padding:8px;font-weight:bold;width:35%;">
              Company Name
            </td>
            <td style="padding:8px;">
              ${escapeHtml(corporateName)}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold;">
              Contact Person
            </td>
            <td style="padding:8px;">
              ${escapeHtml(buyerName)}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold;">
              Email
            </td>
            <td style="padding:8px;">
              <a href="mailto:${escapeHtml(email)}">
                ${escapeHtml(email)}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold;">
              Category
            </td>
            <td style="padding:8px;">
              ${escapeHtml(category)}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold;">
              Quantity
            </td>
            <td style="padding:8px;">
              ${escapeHtml(quantity)}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold;">
              Target FOB Price
            </td>
            <td style="padding:8px;">
              ${escapeHtml(targetPrice || "-")}
            </td>
          </tr>

        </table>

        <div
          style="
            margin-top:25px;
            background:#f5f5f5;
            padding:15px;
            border-left:4px solid #d97706;
          "
        >
          <h3>Fabric / Technical Specifications</h3>

          <p style="white-space:pre-wrap;margin:0;">
            ${
              specifications
                ? escapeHtml(specifications)
                : "No specifications provided."
            }
          </p>
        </div>

        <div style="margin-top:25px;">
          <strong>Attached Files:</strong>
          <p>${attachments.length} file(s) attached.</p>
        </div>

        <hr style="margin-top:30px;" />

        <p style="font-size:12px;color:#777;">
          This email was automatically generated by the RFQ Portal.
        </p>

      </div>
      `,

      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "RFQ submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RFQ API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send RFQ email.",
      },
      { status: 500 }
    );
  }
}