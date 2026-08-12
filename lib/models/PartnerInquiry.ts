import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartnerInquiry extends Document {
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
  meetingRequested: boolean;
  notes?: string;
  read: boolean;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const PartnerInquirySchema = new Schema<IPartnerInquiry>(
  {
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    ownerOrManager: { type: String, required: true },
    deliveriesPerDay: { type: String, required: true },
    deliveryCities: { type: String, required: true },
    timeSensitiveDeliveries: { type: Boolean, required: true },
    availabilityTimes: { type: [String], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    industry: String,
    meetingRequested: { type: Boolean, default: true },
    notes: String,
    read: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true }
);

PartnerInquirySchema.index({ createdAt: -1 });

const PartnerInquiry: Model<IPartnerInquiry> =
  mongoose.models.PartnerInquiry ||
  mongoose.model<IPartnerInquiry>('PartnerInquiry', PartnerInquirySchema);

export default PartnerInquiry;
