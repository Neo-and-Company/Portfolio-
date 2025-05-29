// Email Service Configuration
// This file handles all email delivery for your portfolio

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface SubscriptionData {
  email: string;
  timestamp: string;
}

// =============================================================================
// OPTION 1: RESEND (Recommended - Professional & Reliable)
// =============================================================================
// Install: npm install resend
// Sign up at: https://resend.com (Free tier: 3,000 emails/month)

export async function sendContactEmailWithResend(data: ContactFormData) {
  try {
    // Uncomment and configure when you set up Resend
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@yourdomain.com>', // Use your domain
      to: ['gabrielmancillas1034@icloud.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: emailData?.id };
    */

    // Temporary fallback - remove when Resend is configured
    console.log('📧 CONTACT FORM - Would send via Resend:', data);
    return { success: true, messageId: 'dev-mode' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// OPTION 2: EMAILJS (Easy Setup - No Backend Required)
// =============================================================================
// Sign up at: https://www.emailjs.com (Free tier: 200 emails/month)
// This runs in the browser and sends emails directly

export async function sendContactEmailWithEmailJS(data: ContactFormData) {
  try {
    // Uncomment and configure when you set up EmailJS
    /*
    const emailjs = require('@emailjs/browser');

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'gabrielmancillas1034@icloud.com',
    };

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    return { success: true, messageId: result.text };
    */

    // Temporary fallback - remove when EmailJS is configured
    console.log('📧 CONTACT FORM - Would send via EmailJS:', data);
    return { success: true, messageId: 'dev-mode' };
  } catch (error) {
    console.error('EmailJS sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// OPTION 3: NODEMAILER (Full Control - Requires SMTP)
// =============================================================================
// Use with Gmail, Outlook, or any SMTP provider

export async function sendContactEmailWithNodemailer(data: ContactFormData) {
  try {
    // Check if we have email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.log('📧 CONTACT FORM - Email not configured, logging instead:', data);
      return { success: true, messageId: 'dev-mode-no-config' };
    }

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gabrielmancillas1034@icloud.com',
      subject: `Portfolio Contact: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong>
              <a href="mailto:${data.email}" style="color: #4f46e5;">${data.email}</a>
            </p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #4f46e5;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #4338ca; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              • Reply directly to this email to respond to ${data.name}<br>
              • Add ${data.email} to your professional network<br>
              • Mark as important if this looks like a business opportunity
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// EMAIL SUBSCRIPTION MANAGEMENT
// =============================================================================

// Send subscription confirmation email
export async function sendSubscriptionConfirmationEmail(email: string, phone?: string) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.log('📧 SUBSCRIPTION CONFIRMATION - Email not configured, logging instead:', email);
      return { success: true, messageId: 'dev-mode-no-config' };
    }

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to My Professional Network! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1f2937; margin-bottom: 20px; text-align: center;">
              Welcome to My Professional Network! 🎯
            </h1>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thank you for joining my professional network! I'm excited to connect with forward-thinking professionals like yourself.
            </p>

            ${phone ? `
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #0ea5e9;">
              <p style="color: #0369a1; margin: 0; font-size: 14px;">
                <strong>📞 Phone Contact:</strong> I have your phone number (${phone}) and may reach out directly for time-sensitive opportunities.
              </p>
            </div>
            ` : ''}

            <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #4338ca; margin-top: 0;">What to expect:</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li>Priority access to collaboration opportunities</li>
                <li>Cutting-edge insights in data science and technology</li>
                <li>Exclusive updates on innovative projects</li>
                <li>Strategic partnership opportunities</li>
              </ul>
            </div>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              I'll be in touch soon with valuable insights and opportunities. In the meantime, feel free to explore my portfolio and reach out if you have any questions.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:gabrielmancillas1034@icloud.com" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 10px;">
                📧 Email Me
              </a>
              <a href="tel:+16197141285" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                📞 Call Me
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>Gabriel Mancillas</strong><br>
                Data Science Graduate Student & Website Developer<br>
                📧 gabrielmancillas1034@icloud.com | 📞 (619) 714-1285
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Subscription confirmation email failed:', error);
    return { success: false, error: 'Failed to send confirmation email' };
  }
}

// Send notification email to you about new subscriber
export async function sendSubscriptionNotificationEmail(email: string, phone?: string) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.log('📧 SUBSCRIPTION NOTIFICATION - Email not configured, logging instead:', { email, phone });
      return { success: true, messageId: 'dev-mode-no-config' };
    }

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gabrielmancillas1034@icloud.com',
      subject: '🎯 New Professional Network Subscriber!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1f2937; margin-bottom: 20px; text-align: center;">
              🎉 New Professional Network Subscriber!
            </h1>

            <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="color: #0369a1; margin-top: 0;">Contact Information:</h3>
              <p style="color: #0f172a; margin: 8px 0; font-size: 16px;">
                <strong>📧 Email:</strong>
                <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
              </p>
              ${phone ? `
              <p style="color: #0f172a; margin: 8px 0; font-size: 16px;">
                <strong>📞 Phone:</strong>
                <a href="tel:${phone}" style="color: #0ea5e9; text-decoration: none;">${phone}</a>
              </p>
              ` : ''}
            </div>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #065f46; margin-top: 0;">Quick Actions:</h3>
              <ul style="color: #064e3b; margin: 0; padding-left: 20px;">
                <li>Reply to this email to reach out directly</li>
                ${phone ? '<li><strong>Call them directly</strong> for immediate opportunities</li>' : ''}
                <li>Add to your professional CRM or contact list</li>
                <li>Consider for current or upcoming projects</li>
                <li>Share relevant job opportunities or partnerships</li>
              </ul>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; text-align: center;">
                <strong>💡 Pro Tip:</strong> ${phone ? 'Phone contacts often convert better - consider calling for high-value opportunities!' : 'This subscriber provided email only - follow up via email first.'}
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 10px;">
                📧 Email Now
              </a>
              ${phone ? `
              <a href="tel:${phone}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                📞 Call Now
              </a>
              ` : ''}
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This notification was sent from your portfolio's professional network subscription system.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Subscription notification email failed:', error);
    return { success: false, error: 'Failed to send notification email' };
  }
}

export async function addEmailSubscription(email: string, phone?: string) {
  try {
    // Import your chosen storage method
    const { saveEmailSubscription } = await import('./local-storage');

    const result = await saveEmailSubscription(email, phone);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Send confirmation email to the subscriber
    const confirmationResult = await sendSubscriptionConfirmationEmail(email, phone);
    if (!confirmationResult.success) {
      console.warn('Confirmation email failed, but subscription was saved:', confirmationResult.error);
    }

    // Send notification email to you about the new subscriber
    const notificationResult = await sendSubscriptionNotificationEmail(email, phone);
    if (!notificationResult.success) {
      console.warn('Notification email failed, but subscription was saved:', notificationResult.error);
    }

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Subscription storage failed:', error);
    return { success: false, error: 'Failed to store subscription' };
  }
}

// =============================================================================
// EMAIL VALIDATION
// =============================================================================

export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function verifyEmailExists(email: string): Promise<boolean> {
  // Basic format check
  if (!validateEmailFormat(email)) {
    return false;
  }

  // You can integrate with email verification services like:
  // - Hunter.io
  // - ZeroBounce
  // - EmailListVerify

  // For now, we'll do basic validation
  const disposableEmailDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return !disposableEmailDomains.includes(domain);
}

// =============================================================================
// MAIN EMAIL SERVICE FUNCTION
// =============================================================================

export async function sendContactEmail(data: ContactFormData) {
  try {
    // First, save the contact to storage
    const { saveContactSubmission } = await import('./local-storage');
    // Alternative options:
    // const { saveContactSubmission } = await import('./database-storage');
    // const { saveContactToGoogleSheetsWebhook: saveContactSubmission } = await import('./google-sheets-storage');

    const storageResult = await saveContactSubmission(data);

    if (!storageResult.success) {
      console.warn('Contact storage failed:', storageResult.error);
      // Continue with email sending even if storage fails
    }

    // Then, send the email notification
    // Choose your preferred email service here:
    // return await sendContactEmailWithResend(data);
    // return await sendContactEmailWithEmailJS(data);
    const emailResult = await sendContactEmailWithNodemailer(data);

    // Return combined result
    return {
      success: emailResult.success,
      messageId: emailResult.messageId,
      storageId: storageResult.success ? storageResult.id : null,
      error: emailResult.error,
    };
  } catch (error) {
    console.error('Contact email processing failed:', error);
    return { success: false, error: 'Failed to process contact form' };
  }
}
