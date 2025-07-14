import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, sendContactEmailAlternative, ContactFormData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  console.log('🚀 Contact form API called');
  
  try {
    const body: ContactFormData = await request.json();
    console.log('📝 Form data received:', { 
      fullName: body.fullName, 
      email: body.email, 
      messageLength: body.message?.length 
    });
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.message) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error('❌ Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Basic sanitization
    const sanitizedData: ContactFormData = {
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
    };

    console.log('🧹 Data sanitized, attempting to send email...');

    // Try the primary method first
    try {
      const result = await sendContactEmail(sanitizedData);
      console.log('✅ Primary email method result:', result);
      
      if (result.success) {
        console.log('🎉 Email sent successfully to codewithad24@gmail.com!');
        return NextResponse.json(
          { 
            message: 'Message sent successfully! I will get back to you soon.',
            details: {
              notificationId: result.notificationId,
              status: result.status,
            }
          },
          { status: 200 }
        );
      } else {
        console.error('❌ Primary method failed:', result.error);
        // Try alternative method
        throw new Error(result.error || 'Primary method failed');
      }
      
    } catch (primaryError) {
      console.warn('⚠️  Primary method failed, trying alternative...');
      console.error('Primary error:', primaryError);
      
      // Try alternative method
      try {
        const result = await sendContactEmailAlternative(sanitizedData);
        console.log('✅ Alternative email method result:', result);
        
        if (result.success) {
          console.log('🎉 Email sent successfully via alternative method!');
          return NextResponse.json(
            { 
              message: 'Message sent successfully! I will get back to you soon.',
              details: {
                notificationId: result.notificationId,
                status: result.status,
              }
            },
            { status: 200 }
          );
        } else {
          throw new Error(result.error || 'Alternative method failed');
        }
        
      } catch (alternativeError) {
        console.error('💥 Both methods failed!');
        console.error('Alternative error:', alternativeError);
        
        return NextResponse.json(
          { 
            error: 'Failed to send message. Please try again later.',
            details: alternativeError instanceof Error ? alternativeError.message : 'Unknown error'
          },
          { status: 500 }
        );
      }
    }
    
  } catch (error) {
    console.error('💥 CRITICAL API route error:', error);
    
    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}