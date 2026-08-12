import mongoose, { Schema, Document, Model } from 'mongoose';

export type RequestStatus =
  | 'new'
  | 'reviewing'
  | 'contacted'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'declined'
  | 'archived';

export interface IDeliveryRequest extends Document {
  requestNumber: string;

  // Customer Information
  customerName: string;
  businessName?: string;
  email: string;
  phone: string;
  customerType?: string;
  preferredContact?: 'email' | 'phone' | 'either';

  // Delivery Information
  service?: string;
  packageDescription: string;
  numberOfItems: number;
  approximateSize?: string;
  approximateWeight?: string;
  fragile: boolean;
  medicalRelated: boolean;
  temperatureSensitive: boolean;
  specialInstructions?: string;

  // Pickup Details
  pickupContactName: string;
  pickupPhone: string;
  pickupAddress: string;
  pickupCity: string;
  pickupProvince: string;
  pickupPostalCode: string;
  pickupDate?: Date;
  pickupTimeWindow?: string;

  // Delivery Details
  deliveryContactName: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryProvince: string;
  deliveryPostalCode: string;
  deliveryDate?: Date;
  deliveryTimeWindow?: string;

  // Additional
  recurringDelivery: boolean;
  frequency?: string;
  notes?: string;
  documents?: string[];

  // Status & Admin
  status: RequestStatus;
  internalNotes?: string;
  followUpDate?: Date;
  assignedTo?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryRequestSchema = new Schema<IDeliveryRequest>(
  {
    requestNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Customer
    customerName: { type: String, required: true },
    businessName: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    customerType: String,
    preferredContact: {
      type: String,
      enum: ['email', 'phone', 'either'],
      default: 'either',
    },

    // Delivery Info
    service: String,
    packageDescription: { type: String, required: true },
    numberOfItems: { type: Number, required: true, default: 1 },
    approximateSize: String,
    approximateWeight: String,
    fragile: { type: Boolean, default: false },
    medicalRelated: { type: Boolean, default: false },
    temperatureSensitive: { type: Boolean, default: false },
    specialInstructions: String,

    // Pickup
    pickupContactName: { type: String, required: true },
    pickupPhone: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    pickupCity: { type: String, required: true },
    pickupProvince: { type: String, required: true },
    pickupPostalCode: { type: String, required: true },
    pickupDate: Date,
    pickupTimeWindow: String,

    // Delivery
    deliveryContactName: { type: String, required: true },
    deliveryPhone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryCity: { type: String, required: true },
    deliveryProvince: { type: String, required: true },
    deliveryPostalCode: { type: String, required: true },
    deliveryDate: Date,
    deliveryTimeWindow: String,

    // Additional
    recurringDelivery: { type: Boolean, default: false },
    frequency: String,
    notes: String,
    documents: [String],

    // Admin
    status: {
      type: String,
      enum: [
        'new',
        'reviewing',
        'contacted',
        'scheduled',
        'in_progress',
        'completed',
        'declined',
        'archived',
      ],
      default: 'new',
      index: true,
    },
    internalNotes: String,
    followUpDate: Date,
    assignedTo: String,
  },
  {
    timestamps: true,
  }
);

DeliveryRequestSchema.index({ status: 1, createdAt: -1 });
DeliveryRequestSchema.index({ email: 1 });

const DeliveryRequest: Model<IDeliveryRequest> =
  mongoose.models.DeliveryRequest ||
  mongoose.model<IDeliveryRequest>('DeliveryRequest', DeliveryRequestSchema);

export default DeliveryRequest;
