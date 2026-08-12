import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageSection {
  _id?: string;
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaLabel2?: string;
  ctaUrl2?: string;
  image?: string;
  imageAlt?: string;
  backgroundImage?: string;
  mobileImage?: string;
  theme?: 'light' | 'dark' | 'indigo' | 'orange';
  alignment?: 'left' | 'center' | 'right';
  visible: boolean;
  displayOrder: number;
}

export interface IPage extends Document {
  pageKey: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  sections: IPageSection[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    internalName: { type: String, required: true },
    eyebrow: String,
    heading: String,
    subheading: String,
    body: String,
    ctaLabel: String,
    ctaUrl: String,
    ctaLabel2: String,
    ctaUrl2: String,
    image: String,
    imageAlt: String,
    backgroundImage: String,
    mobileImage: String,
    theme: {
      type: String,
      enum: ['light', 'dark', 'indigo', 'orange'],
      default: 'light',
    },
    alignment: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left',
    },
    visible: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const PageSchema = new Schema<IPage>(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    sections: [PageSectionSchema],
    published: {
      type: Boolean,
      default: true,
    },
    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;
