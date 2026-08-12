import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

// Helper to read raw request body
const getRawBody = async (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

interface ExtendedRequest extends IncomingMessage {
  body?: any;
}

interface ExtendedResponse extends ServerResponse {
  status?: (statusCode: number) => ExtendedResponse;
  json?: (data: any) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    } else if (!payload) {
      const raw = await getRawBody(req);
      payload = JSON.parse(raw);
    }

    const { name, email, phone, message, formType, serviceName } = payload;

    if (!name || !email || !message) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Name, email, and message are required' }));
      return;
    }

    // SMTP configuration - only requires user and pass in .env
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.error('SMTP credentials (SMTP_USER / SMTP_PASS) are not configured in environment variables');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Mail server configuration missing' }));
      return;
    }

    // Auto-detect SMTP host and port
    let host = 'smtp.gmail.com';
    if (user.endsWith('@outlook.com') || user.endsWith('@hotmail.com')) {
      host = 'smtp.office365.com';
    } else if (user.endsWith('@yahoo.com')) {
      host = 'smtp.mail.yahoo.com';
    }
    const port = 587;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // TLS
      auth: {
        user,
        pass,
      },
    });

    const formTitles: Record<string, string> = {
      contact: 'Contact Us Form',
      quote: 'Get a Free Quote (Services Sidebar)',
      enquiry: 'Business Enquiry Form (Homepage)',
    };
    const title = formTitles[formType] || 'Form Submission';

    // 1. Admin Email Content
    const adminMailOptions = {
      from: `"Alica Web Portal" <${user}>`,
      to: user,
      subject: `[New Submission] ${title} - ${name}`,
      text: `
New submission received from Alica Technologies website:

Form Type: ${title}
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${serviceName ? `Service: ${serviceName}\n` : ''}
Message:
-------------------------
${message}
-------------------------

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h2 style="color: #0d3b2e; border-bottom: 2px solid #ffc82e; padding-bottom: 10px;">New Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px;">Form Type:</td>
              <td style="padding: 8px;">${title}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>` : ''}
            ${serviceName ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">Service Interest:</td>
              <td style="padding: 8px;">${serviceName}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #006828; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #0d3b2e;">Message:</h4>
            <p style="margin: 0; line-height: 1.5; color: #333333;">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <p style="font-size: 11px; color: #888888; margin-top: 25px; border-top: 1px solid #eeeeee; padding-top: 10px;">
            Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} | Alica Technologies Web Portal
          </p>
        </div>
      `,
    };

    // 2. User Thank You Email Content
    const userMailOptions = {
      from: `"Alica Technologies" <${user}>`,
      to: email,
      subject: `Thank you for contacting Alica Technologies!`,
      text: `
Dear ${name},

Thank you for reaching out to Alica Technologies LLP. We have received your inquiry from our ${title}.

Our engineering and support team is currently reviewing your details and will get back to you with the appropriate technical support and response within 24 hours.

If you have urgent queries, feel free to call us directly at +91 97271 78787 or email us at info@alicatechnologies.com.

Best Regards,
Team Alica Technologies LLP
Ahmedabad, India
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://alicatechnologies.com/Alica-green.svg" alt="Alica Technologies" style="max-height: 50px;" />
          </div>
          <h2 style="color: #0d3b2e; font-size: 20px; font-weight: bold; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Thank You for Reaching Out</h2>
          
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Dear ${name},
          </p>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            We have successfully received your submission through our <strong>${title}</strong>.
          </p>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Our technical support and engineering team is reviewing your message and will contact you within <strong>24 business hours</strong>.
          </p>
          
          <div style="margin: 25px 0; padding: 20px; background-color: #f0fdf4; border-radius: 6px; border: 1px solid #d1fae5;">
            <h4 style="margin: 0 0 8px 0; color: #0d3b2e; font-size: 14px;">Urgent Requirement?</h4>
            <p style="margin: 0; font-size: 13.5px; color: #065f46; line-height: 1.4;">
              If your request is urgent, please call us directly at <a href="tel:+919727178787" style="font-weight: bold; color: #006828; text-decoration: none;">+91 97271 78787</a> or email <a href="mailto:info@alicatechnologies.com" style="font-weight: bold; color: #006828; text-decoration: none;">info@alicatechnologies.com</a>.
            </p>
          </div>
          
          <p style="color: #666666; font-size: 13px; line-height: 1.5; margin-top: 30px;">
            Best Regards,<br />
            <strong>Alica Technologies LLP</strong><br />
            <span style="font-size: 12px; color: #999999;">Changodar, Ahmedabad, Gujarat, India</span>
          </p>
        </div>
      `,
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Emails sent successfully' }));

  } catch (error) {
    console.error('Error sending email:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to process form submission: ' + (error as Error).message }));
  }
}
