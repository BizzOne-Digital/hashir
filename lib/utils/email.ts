import nodemailer from 'nodemailer';

const INQUIRY_EMAIL = 'info@mlksdelivery.com';

function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPartnerInquiryEmail(data: {
  businessName: string;
  address: string;
  ownerOrManager: string;
  deliveriesPerDay: string;
  deliveryCities: string;
  timeSensitiveDeliveries: boolean;
  availabilityTimes: string[];
  email: string;
  phone: string;
  industry?: string;
  notes?: string;
}): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn('SMTP not configured — partner inquiry saved to database only');
    return false;
  }

  const availabilityLabels = data.availabilityTimes.join(', ');

  const html = `
    <h2>New Business Partner Inquiry</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
      <tr><td><strong>Business Name</strong></td><td>${data.businessName}</td></tr>
      <tr><td><strong>Address</strong></td><td>${data.address}</td></tr>
      <tr><td><strong>Owner / Manager</strong></td><td>${data.ownerOrManager}</td></tr>
      <tr><td><strong>Deliveries Per Day</strong></td><td>${data.deliveriesPerDay}</td></tr>
      <tr><td><strong>Delivery Cities</strong></td><td>${data.deliveryCities}</td></tr>
      <tr><td><strong>Time-Sensitive Deliveries</strong></td><td>${data.timeSensitiveDeliveries ? 'Yes' : 'No'}</td></tr>
      <tr><td><strong>Availability Times</strong></td><td>${availabilityLabels}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
      ${data.industry ? `<tr><td><strong>Industry</strong></td><td>${data.industry}</td></tr>` : ''}
      ${data.notes ? `<tr><td><strong>Additional Notes</strong></td><td>${data.notes}</td></tr>` : ''}
    </table>
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: INQUIRY_EMAIL,
      replyTo: data.email,
      subject: `New Partner Inquiry — ${data.businessName}`,
      html,
    });
    return true;
  } catch (error) {
    console.error('Failed to send partner inquiry email:', error);
    return false;
  }
}
