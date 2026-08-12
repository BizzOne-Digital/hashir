import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PartnerInquiry from '@/lib/models/PartnerInquiry';
import { sendPartnerInquiryEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = [
      'businessName',
      'address',
      'ownerOrManager',
      'deliveriesPerDay',
      'deliveryCities',
      'email',
      'phone',
    ] as const;

    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (
      body.timeSensitiveDeliveries === undefined ||
      body.timeSensitiveDeliveries === null
    ) {
      return NextResponse.json(
        { error: 'Please indicate whether you have time-sensitive deliveries' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.availabilityTimes) || body.availabilityTimes.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one availability time' },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiry = await PartnerInquiry.create({
      businessName: body.businessName.trim(),
      address: body.address.trim(),
      ownerOrManager: body.ownerOrManager.trim(),
      deliveriesPerDay: body.deliveriesPerDay.trim(),
      deliveryCities: body.deliveryCities.trim(),
      timeSensitiveDeliveries: Boolean(body.timeSensitiveDeliveries),
      availabilityTimes: body.availabilityTimes,
      email: body.email.trim(),
      phone: body.phone.trim(),
      industry: body.industry?.trim(),
      meetingRequested: body.meetingRequested !== false,
      notes: body.notes?.trim(),
    });

    await sendPartnerInquiryEmail({
      businessName: inquiry.businessName,
      address: inquiry.address,
      ownerOrManager: inquiry.ownerOrManager,
      deliveriesPerDay: inquiry.deliveriesPerDay,
      deliveryCities: inquiry.deliveryCities,
      timeSensitiveDeliveries: inquiry.timeSensitiveDeliveries,
      availabilityTimes: inquiry.availabilityTimes,
      email: inquiry.email,
      phone: inquiry.phone,
      industry: inquiry.industry,
      notes: inquiry.notes,
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted. We will reach out shortly.',
    });
  } catch (error) {
    console.error('Partner inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
