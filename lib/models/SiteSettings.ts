import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  // General
  siteName: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  seoDefaultTitle?: string;
  seoDefaultDescription?: string;
  socialImage?: string;

  // Contact
  email: string;
  primaryPhone: string;
  secondaryPhone?: string;
  dispatchPhone?: string;
  address?: string;
  officeHours?: string;
  supportHours?: string;
  mapUrl?: string;

  // Social
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  otherLinks?: Array<{ label: string; url: string }>;

  // Booking
  bookingEnabled: boolean;
  bookingMessage?: string;
  notificationEmail?: string;

  // Tracking
  trackingEnabled: boolean;
  trackingUrl?: string;
  trackingMessage?: string;
  trackingButtonLabel?: string;

  // Footer
  footerDescription?: string;
  footerCta?: string;
  copyright?: string;
  newsletterText?: string;

  updatedAt: Date;
  updatedBy?: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    // General
    siteName: { type: String, required: true, default: 'MLKS Delivery Solutions' },
    tagline: String,
    logo: String,
    favicon: String,
    seoDefaultTitle: String,
    seoDefaultDescription: String,
    socialImage: String,

    // Contact
    email: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    secondaryPhone: String,
    dispatchPhone: String,
    address: String,
    officeHours: String,
    supportHours: String,
    mapUrl: String,

    // Social
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    twitter: String,
    otherLinks: [
      {
        label: String,
        url: String,
      },
    ],

    // Booking
    bookingEnabled: { type: Boolean, default: true },
    bookingMessage: String,
    notificationEmail: String,

    // Tracking
    trackingEnabled: { type: Boolean, default: false },
    trackingUrl: String,
    trackingMessage: String,
    trackingButtonLabel: String,

    // Footer
    footerDescription: String,
    footerCta: String,
    copyright: String,
    newsletterText: String,

    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
