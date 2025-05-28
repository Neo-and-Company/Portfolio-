import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addEmailSubscription, verifyEmailExists } from '@/lib/email-service';

// Validation schema for email subscription
const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[+]?[\d\s\-()]{10,20}$/, 'Invalid phone number format'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = subscriptionSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          details: validatedData.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { email, phone } = validatedData.data;

    // Verify email exists (optional - you can remove this if it's too strict)
    const isValidEmail = await verifyEmailExists(email);

    if (!isValidEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid email address'
        },
        { status: 400 }
      );
    }

    // Add email and phone to subscription list
    const subscriptionResult = await addEmailSubscription(email, phone);

    if (!subscriptionResult.success) {
      console.error('Subscription storage failed:', subscriptionResult.error);

      // Check if it's a duplicate email error
      if (subscriptionResult.error?.includes('already subscribed') ||
          subscriptionResult.error?.includes('duplicate') ||
          subscriptionResult.error?.includes('UNIQUE constraint')) {
        return NextResponse.json(
          {
            success: true,
            message: 'You\'re already subscribed! Thank you for your continued interest.',
            alreadySubscribed: true
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Subscription failed. Please try again.'
        },
        { status: 500 }
      );
    }

    console.log('✅ Email subscription added successfully:', email);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! You\'ll hear from me soon about opportunities.',
        subscriptionId: subscriptionResult.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again.'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
