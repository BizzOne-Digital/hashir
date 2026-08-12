import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage {
  _id?: string;
  url: string;
  alt: string;
  caption?: string;
  displayOrder: number;
  featured: boolean;
  published: boolean;
  uploadedAt: Date;
}

export interface IGalleryCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  published: boolean;
  images: IGalleryImage[];
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    caption: String,
    displayOrder: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const GalleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    images: [GalleryImageSchema],
  },
  {
    timestamps: true,
  }
);

const GalleryCategory: Model<IGalleryCategory> =
  mongoose.models.GalleryCategory ||
  mongoose.model<IGalleryCategory>('GalleryCategory', GalleryCategorySchema);

export default GalleryCategory;
