import mongoose, { Schema, Document, Model } from 'mongoose';

export type ServiceStatus = 'active' | 'coming_soon' | 'temporarily_unavailable' | 'draft';

export interface IServiceSection {
  _id?: string;
  sectionType: 'text' | 'list' | 'process' | 'image' | 'faq';
  heading?: string;
  content?: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
  displayOrder: number;
}

export interface IService extends Document {
  // Listing Information (for Services Page)
  title: string;
  slug: string;
  shortDescription: string;
  mainImage?: string;
  mainImageAlt?: string;
  icon?: string;
  status: ServiceStatus;
  displayOrder: number;
  featured: boolean;
  published: boolean;

  // Detail Page Information
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  heroImageAlt?: string;
  
  overview?: string;
  suitableCustomers?: string;
  useCases?: string;
  benefits?: string;
  process?: string;
  availability?: string;
  coverage?: string;

  sections: IServiceSection[];
  gallery?: string[];
  faqs?: Array<{ question: string; answer: string }>;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;

  // Admin
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSectionSchema = new Schema<IServiceSection>(
  {
    sectionType: {
      type: String,
      enum: ['text', 'list', 'process', 'image', 'faq'],
      required: true,
    },
    heading: String,
    content: String,
    items: [String],
    image: String,
    imageAlt: String,
    displayOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const ServiceSchema = new Schema<IService>(
  {
    // Listing
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    mainImage: String,
    mainImageAlt: String,
    icon: String,
    status: {
      type: String,
      enum: ['active', 'coming_soon', 'temporarily_unavailable', 'draft'],
      default: 'active',
    },
    displayOrder: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },

    // Detail Page
    heroEyebrow: String,
    heroTitle: String,
    heroDescription: String,
    heroImage: String,
    heroImageAlt: String,
    
    overview: String,
    suitableCustomers: String,
    useCases: String,
    benefits: String,
    process: String,
    availability: String,
    coverage: String,

    sections: [ServiceSectionSchema],
    gallery: [String],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    // SEO
    metaTitle: String,
    metaDescription: String,
    ogImage: String,

    // Admin
    createdBy: String,
    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

ServiceSchema.index({ status: 1, published: 1, displayOrder: 1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
