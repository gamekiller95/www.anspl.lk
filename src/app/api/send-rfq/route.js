import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // 1. Extract the FormData from the incoming request
    const formData = await request.formData();
    
    const corporateName = formData.get('corporateName');
    const buyerName = formData.get('buyerName');
    const email = formData.get('email');
    const category = formData.get('category');
    const quantity = formData.get('quantity');
    const targetPrice = formData.get('targetPrice');
    const specifications = formData.get('specifications');
    
    // 2. Extract files
    const files = formData.getAll('files');
    const attachments = [];

    for (const file of files) {
      if (file && file.size > 0) {
        // Convert the file binary into a Node.js Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // 3. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Construct Email Layout
    const mailOptions = {
      from: `"${buyerName} via RFQ Portal" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_RECEIVER_EMAIL,
      replyTo: email, // Allows you to hit 'Reply' directly to the buyer
      subject: `[New RFQ Submission] ${corporateName} - ${category.toUpperCase()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
          <h2 style="border-bottom: 2px solid #292524; padding-bottom: 10px; color: #1c1917;">
            B2B Production RFQ Incoming
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%;">Company Name:</td>
              <td style="padding: 8px 0;">${corporateName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact Person:</td>
              <td style="padding: 8px 0;">${buyerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Buyer Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Form Category:</td>
              <td style="padding: 8px 0; text-transform: capitalize;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Total Quantity (Pcs):</td>
              <td style="padding: 8px 0;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Target FOB Price:</td>
              <td style="padding: 8px 0;">${targetPrice}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; background: #f5f5f4; padding: 15px; border-left: 4px solid #d97706;">
            <h4 style="margin: 0 0 10px 0; color: #1c1917;">Fabric & Tech Specifications:</h4>
            <p style="margin: 0; white-space: pre-wrap;">${specifications || 'No specific breakdown provided textually.'}</p>
          </div>
          
          <p style="font-size: 11px; color: #78716c; margin-top: 40px; border-top: 1px solid #e7e5e4; padding-top: 10px;">
            This email was auto-dispatched securely via your web platform's RFQ application pipeline.
          </p>
        </div>
      `,
      attachments: attachments, // Array mapping directly to Nodemailer format
    };

    // 5. Fire Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API RFQ Error:', error);
    return NextResponse.json(
      { error: 'Internal processing error while dispatching email.' }, 
      { status: 500 }
    );
  }
}