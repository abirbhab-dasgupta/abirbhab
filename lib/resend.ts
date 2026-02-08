import { Resend } from 'resend';

// Check for environment variable
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is not set in environment variables');
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(RESEND_API_KEY);

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

interface SuccessResponse {
  success: true;
  notificationId: string;
  status: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<SuccessResponse | ErrorResponse> {
  console.log('🚀 Starting email send process...');
  console.log('📧 Form data:', {
    fullName: data.fullName,
    email: data.email,
    messageLength: data.message.length
  });

  try {
    // Send notification email to YOU ONLY
    console.log('📨 Sending notification email to codewithad24@gmail.com...');

    const emailPayload = {
      from: 'onboarding@resend.dev',
      to: 'codewithad24@gmail.com',
      subject: `New Contact Form Submission from ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333333; border-bottom: 3px solid #ff6b35; padding-bottom: 10px; margin-bottom: 20px;">
              🔔 New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 25px; background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
              <h3 style="color: #555555; margin-bottom: 15px; font-size: 18px; font-weight: bold;">
                📋 Contact Details:
              </h3>
              <p style="margin: 8px 0; color: #666666; font-size: 16px;">
                <strong>👤 Name:</strong> ${data.fullName}
              </p>
              <p style="margin: 8px 0; color: #666666; font-size: 16px;">
                <strong>📧 Email:</strong> ${data.email}
              </p>
              <p style="margin: 8px 0; color: #666666; font-size: 14px;">
                <strong>📅 Received:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #555555; margin-bottom: 15px; font-size: 18px; font-weight: bold;">
                💬 Message:
              </h3>
              <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35; color: #444444; line-height: 1.6; font-size: 15px; min-height: 60px; white-space: pre-wrap;">
${data.message}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #fff5f0; border-radius: 5px; font-size: 14px; color: #666666; border: 1px solid #ffe0d6;">
              <p style="margin: 0; text-align: center;">
                ⚡ This email was sent from your portfolio contact form<br />
                You can reply directly to this email to respond to ${data.fullName}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: data.email,
    };

    const notificationResult = await resend.emails.send(emailPayload);

    console.log('✅ Notification email response:', notificationResult);

    // Check if email was sent successfully
    // Check if email was sent successfully
    const result: any = notificationResult;
    if (result.error) {
      console.error('❌ Notification email error:', result.error);
      return {
        success: false,
        error: typeof result.error === 'string'
          ? result.error
          : result.error.message || 'Failed to send notification email',
      } as ErrorResponse;
    }

    return {
      success: true,
      notificationId: notificationResult.data?.id || 'unknown',
      status: 'sent',
    } as SuccessResponse;

  } catch (error) {
    console.error('💥 CRITICAL ERROR sending email:', error);

    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    } as ErrorResponse;
  }
}

// Simplified alternative function
export async function sendContactEmailAlternative(data: ContactFormData): Promise<SuccessResponse | ErrorResponse> {
  console.log('🔄 Trying alternative approach...');

  try {
    console.log('📧 Sending notification email (alternative method)...');

    const emailPayload = {
      from: 'onboarding@resend.dev',
      to: 'codewithad24@gmail.com',
      subject: `New Contact: ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #ff6b35; padding-bottom: 10px; margin-bottom: 20px;">
              🔔 New Contact Form Submission
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 10px;">Contact Information:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>👤 Name:</strong> ${data.fullName}</p>
              <p style="margin: 5px 0; color: #666;"><strong>📧 Email:</strong> ${data.email}</p>
              <p style="margin: 5px 0; color: #666;"><strong>📅 Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 10px;">💬 Message:</h3>
              <div style="background: white; padding: 20px; border-left: 4px solid #ff6b35; margin-top: 10px; border-radius: 5px; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">
${data.message}
              </div>
            </div>
            
            <div style="background: #fff5f0; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                ⚡ Sent from your portfolio contact form<br/>
                Reply directly to this email to respond to the sender
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: data.email,
    };

    const notificationResult = await resend.emails.send(emailPayload);

    console.log('📧 Notification result:', notificationResult);

    const result: any = notificationResult;
    if (result.error) {
      const errorMessage = typeof result.error === 'string'
        ? result.error
        : result.error.message || 'Failed to send email';
      throw new Error(errorMessage);
    }

    return {
      success: true,
      notificationId: notificationResult.data?.id || 'unknown',
      status: 'sent',
    } as SuccessResponse;

  } catch (error) {
    console.error('💥 Alternative method failed:', error);
    throw error;
  }
}

export { resend };