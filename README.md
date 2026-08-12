# MLKS Delivery Solutions - Full-Stack Website & CMS

A modern, production-ready full-stack web application built with Next.js 16, TypeScript, MongoDB, and GSAP animations. Features a complete custom admin portal for content management.

## 🚀 Features

### Public Website
- **Cinematic animated intro** with skip functionality
- **Responsive design** across all devices
- **Full GSAP animations** with ScrollTrigger
- **Dynamic content** from MongoDB
- **6 core services** with individual detail pages
- **Multi-step booking form** with validation
- **Contact forms** with spam protection
- **Gallery** with categories and lightbox
- **Blog** with categories and search
- **Testimonials** showcase
- **FAQ** section with accordion
- **SEO optimized** with meta tags and structured data

### Admin Portal (`/admin`)
- **Dashboard** with real analytics
- **Page builder** with section-by-section editing
- **Services management** with status control
- **Delivery requests** tracking and management
- **Gallery** management with categories
- **Testimonials** moderation
- **FAQ** organization
- **Blog** post editor
- **Contact messages** inbox
- **Newsletter** subscribers
- **Site settings** (contact info, social links, etc.)
- **Image upload** system

### Technical Features
- Next.js 16 with App Router
- TypeScript (strict mode)
- Tailwind CSS v4
- MongoDB with Mongoose
- NextAuth.js authentication
- GSAP & ScrollTrigger animations
- React Hook Form with Zod validation
- Responsive images with Next.js Image
- Local upload system
- Server Components by default
- API routes for mutations

## 📋 Prerequisites

- Node.js 18.17 or later
- MongoDB 5.0 or later
- MongoDB Compass (recommended)
- npm or yarn

## 🛠️ Installation

### 1. Clone or Download

```bash
# If using git
git clone <repository-url>
cd hashir

# Or extract the ZIP file and navigate to the project directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. Your connection string is: `mongodb://localhost:27017/mlks-delivery`

**Option B: MongoDB Atlas (Cloud)**

1. Create free account: https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster
3. Get your connection string (replace `<password>` with your password)
4. Whitelist your IP address

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
copy .env.example .env.local   # Windows
# OR
cp .env.example .env.local     # macOS/Linux
```

Edit `.env.local` with your configuration:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mlks-delivery
MONGODB_DB=mlks-delivery

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-random-secret-change-this

# Admin Configuration
ADMIN_EMAIL=admin@mlksdelivery.com
ADMIN_PASSWORD=YourSecurePassword123!

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=MLKS Delivery <noreply@mlksdelivery.com>
```

**Generate secure NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5. Seed the Database

```bash
npm run seed
```

This creates:
- Admin user
- Site settings
- 6 services
- FAQ categories and questions
- Gallery categories
- Sample pages
- Draft testimonials

**To reset and reseed:**
```bash
npm run seed:reset
```

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

Visit: http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## 🔐 Admin Access

### Default Admin Credentials

- **URL**: http://localhost:3000/admin/login
- **Email**: admin@mlksdelivery.com
- **Password**: Set in `.env.local` (ADMIN_PASSWORD)

**⚠️ IMPORTANT:** Change the admin password immediately in production!

## 📁 Project Structure

```
├── app/
│   ├── (public)/          # Public routes (Home, About, Services, etc.)
│   ├── (admin)/           # Admin portal routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── shared/            # Header, Footer
│   ├── home/              # Homepage sections
│   ├── admin/             # Admin components
│   └── animations/        # GSAP animation components
├── lib/
│   ├── models/            # Mongoose models
│   ├── db/                # Database connection
│   ├── utils/             # Helper functions
│   └── hooks/             # Custom React hooks
├── public/
│   ├── uploads/           # User-uploaded images
│   └── images/            # Static images
└── [config files]
```

## 🎨 Brand Colors

```css
--mlks-indigo: #30359B        /* Primary brand color */
--mlks-deep-indigo: #171B55   /* Dark backgrounds */
--mlks-orange: #FF7A1A        /* CTAs and accents */
--mlks-orange-dark: #E65F00   /* Hover states */
--mlks-cyan: #39BFEF          /* Tech/temperature accents */
--mlks-success: #0E9F6E       /* Success states */
```

## 📝 Content Management

### Updating Contact Information

1. Log in to admin portal
2. Go to **Settings**
3. Update:
   - Phone numbers
   - Email
   - Address
   - Office hours
   - Social links
4. Save changes (updates everywhere automatically)

### Adding a New Service

1. **Admin → Services → New Service**
2. Fill in:
   - **Listing Info** (appears on Services page)
   - **Detail Page Info** (appears on service detail page)
3. Set status: Active, Coming Soon, Temporarily Unavailable, or Draft
4. Save and publish

The route `/services/your-slug` is automatically created!

### Managing Delivery Requests

1. **Admin → Delivery Requests**
2. View all requests
3. Update status, add internal notes
4. Download attached documents
5. Export to CSV

### Uploading Images

Supported formats: JPG, JPEG, PNG, WebP, AVIF

1. Navigate to the relevant section (Services, Gallery, Blog, etc.)
2. Click upload or replace image
3. Select file (max 10MB)
4. Add alt text for accessibility
5. Save

**Storage**: Images are stored in `/public/uploads/[section]/`

## 🔒 Security Features

- Bcrypt password hashing
- HTTP-only secure cookies
- CSRF protection
- Rate limiting on forms
- Input validation (client + server)
- XSS prevention
- File upload validation
- Honeypot spam protection
- Admin route protection

## ♿ Accessibility

- WCAG 2.2 AA compliance target
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus visible states
- Screen reader friendly
- Reduced motion support
- Sufficient color contrast
- Alt text for all images

## 📱 Responsive Breakpoints

- Mobile: 360px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large: 1440px+

## 🎬 Animation System

### GSAP Animations
- Scroll-triggered reveals
- Route line drawing
- Stagger text animations
- Parallax effects
- Magnetic CTAs
- Page transitions

### Performance
- GPU-accelerated transforms
- RequestAnimationFrame
- Optimized scroll listeners
- Cleanup on unmount
- Reduced motion support

## 📧 Email Configuration (Optional)

To enable email notifications for bookings and contact forms:

### Using Gmail

1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Update `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=MLKS Delivery <noreply@mlksdelivery.com>
```

### Using Other Providers

Update SMTP settings according to your email provider's documentation.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

**MongoDB Atlas Required** for production (local MongoDB won't work)

### Environment Variables for Production

Add all variables from `.env.local` to your hosting platform, especially:

- `MONGODB_URI` (Atlas connection string)
- `NEXTAUTH_SECRET` (generate new one for production)
- `NEXTAUTH_URL` (your production URL)
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`

### Post-Deployment

1. Run seed script once (or seed via admin)
2. Upload production images
3. Update site settings
4. Verify all forms work
5. Test email notifications (if configured)

## 🐛 Troubleshooting

### MongoDB Connection Fails

```bash
# Check MongoDB is running
mongosh

# Check connection string in .env.local
# Ensure no spaces or special characters are unencoded
```

### Tailwind Styles Not Working

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Images Not Displaying

- Check file permissions on `/public/uploads/`
- Ensure images are in correct subdirectories
- Verify image paths in database start with `/uploads/`

### Build Errors

```bash
# Clear all caches and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📊 Database Models

- **AdminUser**: Admin authentication
- **Page**: Dynamic page content
- **Service**: Service listings and details
- **DeliveryRequest**: Booking submissions
- **GalleryCategory**: Gallery organization
- **Testimonial**: Customer reviews
- **FAQ**: Frequently asked questions
- **BlogPost**: Blog articles
- **ContactMessage**: Contact form submissions
- **NewsletterSubscriber**: Email subscribers
- **SiteSettings**: Global site configuration

## 🔄 Updating Content

See `CONTENT_VERIFICATION.md` for items requiring verification before going live.

## 📖 Additional Documentation

- `CONTENT_VERIFICATION.md` - Content requiring client verification
- `ATTRIBUTIONS.md` - Image and resource attributions (create as needed)

## 🆘 Support

For issues or questions:

1. Check this README
2. Review `CONTENT_VERIFICATION.md`
3. Check MongoDB connection
4. Verify environment variables
5. Check browser console for errors

## 📄 License

Proprietary - © 2024 MLKS Delivery Solutions

---

**Built with ❤️ using Next.js 16, TypeScript, MongoDB, and GSAP**
