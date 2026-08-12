import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  publishedDate?: Date;
  featured: boolean;
  published: boolean;
  readingTime?: number;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    coverImage: String,
    coverImageAlt: String,
    category: { type: String, required: true, index: true },
    tags: [String],
    content: { type: String, required: true },
    author: { type: String, default: 'MLKS Team' },
    publishedDate: Date,
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    readingTime: Number,

    // SEO
    metaTitle: String,
    metaDescription: String,
    ogImage: String,

    createdBy: String,
    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ published: 1, publishedDate: -1 });
BlogPostSchema.index({ category: 1, published: 1 });

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
