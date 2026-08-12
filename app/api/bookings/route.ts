import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import DeliveryRequest from '@/lib/models/DeliveryRequest';
import { generateRequestNumber } from '@/lib/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.customerName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create delivery request
    const deliveryRequest = await DeliveryRequest.create({
      requestNumber: generateRequestNumber(),
      ...body,
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      requestNumber: deliveryRequest.requestNumber,
      message: 'Delivery request submitted successfully',
    });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to submit delivery request' },
      { status: 500 }
    );
  }
}
