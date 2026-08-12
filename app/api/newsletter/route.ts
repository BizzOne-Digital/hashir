import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ email: body.email.toLowerCase() });

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed',
        });
      } else {
        // Resubscribe
        existing.subscribed = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = undefined;
        await existing.save();
        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed!',
        });
      }
    }

    // Create new subscriber
    await NewsletterSubscriber.create({
      email: body.email.toLowerCase(),
      subscribed: true,
      subscribedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    });
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
