import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  personName: string;
  companyRole?: string;
  quote: string;
  image?: string;
  imageAlt?: string;
  featured: boolean;
  displayOrder: number;
  published: boolean;
  verifiedCustomer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    personName: { type: String, required: true },
    companyRole: String,
    quote: { type: String, required: true },
    image: String,
    imageAlt: String,
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    verifiedCustomer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ published: 1, displayOrder: 1 });

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
