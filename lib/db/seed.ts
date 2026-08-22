import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables FIRST before any other imports
config({ path: resolve(process.cwd(), '.env.local') });

import bcrypt from 'bcryptjs';
import connectDB from './mongodb';
import AdminUser from '../models/AdminUser';
import Page from '../models/Page';
import Service from '../models/Service';
import GalleryCategory from '../models/GalleryCategory';
import FAQ from '../models/FAQ';
import Testimonial from '../models/Testimonial';
import SiteSettings from '../models/SiteSettings';

async function seedDatabase(reset: boolean = false) {
  try {
    await connectDB();
    console.log('🌱 Starting database seed...');

    if (reset) {
      console.log('⚠️  Resetting database...');
      await Promise.all([
        AdminUser.deleteMany({}),
        Page.deleteMany({}),
        Service.deleteMany({}),
        GalleryCategory.deleteMany({}),
        FAQ.deleteMany({}),
        Testimonial.deleteMany({}),
        SiteSettings.deleteMany({}),
      ]);
      console.log('✅ Database reset complete');
    }

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 10);
      await AdminUser.create({
        email: process.env.ADMIN_EMAIL || 'admin@mlksdelivery.com',
        password: hashedPassword,
        name: 'MLKS Administrator',
        role: 'super_admin',
        isActive: true,
      });
      console.log('✅ Admin user created');
    }

    // Site Settings
    const existingSettings = await SiteSettings.findOne({});
    if (!existingSettings) {
      await SiteSettings.create({
        siteName: 'MLKS Delivery Solutions',
        tagline: 'Handled With Care. Delivered With Purpose.',
        email: 'info@mlksdelivery.com',
        primaryPhone: '+1 (519) 778-3390',
        officeHours: 'Monday–Saturday: 9:00 AM–7:00 PM | Sunday: Closed',
        supportHours: 'Monday–Saturday: 9:00 AM–7:00 PM',
        bookingEnabled: true,
        trackingEnabled: false,
        trackingMessage: 'Contact our team for updates about your delivery.',
        footerDescription:
          'MLKS Delivery Solutions provides reliable, business-focused delivery services for pharmacies, healthcare providers, and businesses requiring secure, time-sensitive transportation.',
        copyright: `© ${new Date().getFullYear()} MLKS Delivery Solutions. All rights reserved.`,
        newsletterText: 'Subscribe to receive updates about our services and delivery solutions.',
      });
      console.log('✅ Site settings created');
    }

    // Remove stored business address from all settings records
    await SiteSettings.updateMany({}, { $unset: { address: 1 } });

    // Services
    const existingServices = await Service.countDocuments();
    if (existingServices === 0) {
      await Service.insertMany([
        {
          title: 'Secure Packaging',
          slug: 'secure-packaging',
          shortDescription:
            'We take the utmost care in handling your items. Our professional team helps ensure packages are securely prepared to withstand the demands of transportation.',
          status: 'active',
          displayOrder: 1,
          featured: true,
          published: true,
          heroTitle: 'Secure Packaging Solutions',
          heroDescription:
            'Professional packaging services to ensure your items are protected throughout the delivery process.',
          overview:
            'Our secure packaging service provides professional-grade preparation for items requiring careful handling during transportation. We work with pharmacies, healthcare providers, and businesses to ensure items arrive safely.',
          suitableCustomers: 'Pharmacies, Healthcare Providers, Medical Offices, Businesses with Fragile Items',
          benefits:
            'Professional handling, Reduced damage risk, Specialized materials, Expert preparation, Peace of mind',
          process:
            '1. Assessment of items\n2. Selection of appropriate materials\n3. Professional packaging preparation\n4. Quality verification\n5. Ready for transport',
          metaTitle: 'Secure Packaging Services | MLKS Delivery Solutions',
          metaDescription:
            'Professional secure packaging services for pharmacy and business deliveries across Ontario.',
        },
        {
          title: 'Enhanced Delivery Management Software',
          slug: 'delivery-management-software',
          shortDescription:
            'For pharmacies, healthcare providers, and delivery-dependent businesses, our delivery management solutions help streamline scheduling, coordination, visibility, and supply-chain efficiency.',
          status: 'active',
          displayOrder: 2,
          featured: true,
          published: true,
          heroTitle: 'Delivery Management Technology',
          heroDescription:
            'Streamline your delivery operations with our coordination and management solutions.',
          overview:
            'Our delivery management solutions help businesses coordinate, schedule, and track their delivery operations more efficiently.',
          suitableCustomers:
            'Pharmacies, Healthcare Facilities, Retail Businesses, E-commerce Companies, Distribution Centers',
          benefits:
            'Improved coordination, Better scheduling, Enhanced visibility, Streamlined operations, Reduced manual work',
          process:
            '1. Consultation and assessment\n2. Solution setup\n3. Staff training\n4. Implementation support\n5. Ongoing optimization',
          metaTitle: 'Delivery Management Software | MLKS Delivery Solutions',
          metaDescription:
            'Delivery management solutions for pharmacies and businesses in Ontario.',
        },
        {
          title: 'Temperature-Controlled Transport',
          slug: 'temperature-controlled-transport',
          shortDescription:
            'MLKS is developing temperature-controlled transportation capabilities designed to support temperature-sensitive pharmaceutical and healthcare deliveries.',
          status: 'coming_soon',
          displayOrder: 3,
          featured: false,
          published: true,
          heroTitle: 'Temperature-Controlled Transport',
          heroDescription: 'Specialized transport solutions for temperature-sensitive items (Coming Soon)',
          overview:
            'MLKS is currently developing temperature-controlled transportation capabilities to better serve pharmacies and healthcare providers with temperature-sensitive delivery requirements.',
          suitableCustomers: 'Pharmacies, Healthcare Providers, Medical Laboratories, Biotechnology Companies',
          benefits:
            'Temperature monitoring, Specialized vehicles, Compliance support, Real-time alerts, Chain of custody',
          availability: 'Coming Soon - Currently in Development',
          metaTitle: 'Temperature-Controlled Transport (Coming Soon) | MLKS Delivery',
          metaDescription: 'Temperature-controlled delivery services for pharmaceutical and healthcare items.',
        },
        {
          title: 'Same-Day or Express Delivery',
          slug: 'same-day-express-delivery',
          shortDescription:
            'Expedited delivery solutions for time-sensitive items, including same-day and urgent delivery requests where service availability permits.',
          status: 'active',
          displayOrder: 4,
          featured: true,
          published: true,
          heroTitle: 'Same-Day & Express Delivery',
          heroDescription: 'Fast, reliable delivery when time is critical.',
          overview:
            'Our express delivery service provides expedited transportation for urgent and time-sensitive deliveries across our service area.',
          suitableCustomers:
            'Pharmacies, Medical Offices, Urgent Care Facilities, Businesses with Time-Critical Needs',
          benefits:
            'Rapid response, Priority handling, Direct routing, Time-sensitive care, Business continuity',
          process:
            '1. Request submission\n2. Immediate review\n3. Rapid pickup coordination\n4. Priority transport\n5. Timely delivery',
          availability: 'Subject to service availability and scheduling',
          metaTitle: 'Same-Day Express Delivery | MLKS Delivery Solutions',
          metaDescription: 'Fast same-day and express delivery services for time-sensitive shipments in Ontario.',
        },
        {
          title: 'Scheduled Deliveries',
          slug: 'scheduled-deliveries',
          shortDescription:
            'Recurring and scheduled delivery services for pharmacies, healthcare providers, retailers, offices, and businesses requiring dependable routine shipments.',
          status: 'active',
          displayOrder: 5,
          featured: true,
          published: true,
          heroTitle: 'Scheduled Delivery Services',
          heroDescription: 'Reliable, recurring delivery solutions for your business.',
          overview:
            'Our scheduled delivery service provides consistent, recurring transportation for businesses that require regular, dependable delivery routes.',
          suitableCustomers:
            'Pharmacies, Healthcare Providers, Retail Stores, Offices, Distribution Networks',
          benefits:
            'Predictable scheduling, Route optimization, Consistent service, Reduced coordination, Business efficiency',
          process:
            '1. Route consultation\n2. Schedule development\n3. Service agreement\n4. Regular pickups\n5. Ongoing coordination',
          metaTitle: 'Scheduled Recurring Deliveries | MLKS Delivery Solutions',
          metaDescription: 'Scheduled delivery services for businesses requiring routine shipments in Ontario.',
        },
        {
          title: 'Reverse Logistics',
          slug: 'reverse-logistics',
          shortDescription:
            'Support for returns and the reverse movement of goods from customers back to retailers, pharmacies, sellers, or distribution locations.',
          status: 'active',
          displayOrder: 6,
          featured: false,
          published: true,
          heroTitle: 'Reverse Logistics Solutions',
          heroDescription: 'Efficient return and reverse delivery coordination.',
          overview:
            'Our reverse logistics service helps businesses manage returns, exchanges, and the reverse movement of products efficiently.',
          suitableCustomers: 'Retailers, E-commerce Businesses, Pharmacies, Distribution Centers, Medical Suppliers',
          benefits:
            'Simplified returns, Better inventory management, Cost efficiency, Customer satisfaction, Process optimization',
          process:
            '1. Return request initiation\n2. Pickup scheduling\n3. Item collection\n4. Return transport\n5. Delivery confirmation',
          metaTitle: 'Reverse Logistics Services | MLKS Delivery Solutions',
          metaDescription: 'Reverse logistics and return delivery services for businesses in Ontario.',
        },
      ]);
      console.log('✅ Services created');
    }

    // Pages
    const existingPages = await Page.countDocuments();
    if (existingPages === 0) {
      await Page.insertMany([
        {
          pageKey: 'home',
          title: 'Home',
          slug: '/',
          published: true,
          sections: [
            {
              internalName: 'Hero',
              eyebrow: 'PHARMACY • BUSINESS • EXPRESS DELIVERY',
              heading: 'Reliable Delivery, Handled With Care.',
              subheading:
                'Modern delivery solutions for pharmacies, healthcare providers, and businesses that depend on secure, timely, and carefully coordinated transportation.',
              ctaLabel: 'Request a Delivery',
              ctaUrl: '/booking',
              ctaLabel2: 'Explore Our Services',
              ctaUrl2: '/services',
              theme: 'dark',
              alignment: 'left',
              visible: true,
              displayOrder: 1,
            },
          ],
        },
        {
          pageKey: 'about',
          title: 'About Us',
          slug: '/about',
          published: true,
          sections: [
            {
              internalName: 'Hero',
              heading: 'About MLKS Delivery Solutions',
              subheading: 'Your trusted partner for reliable, business-focused delivery services.',
              theme: 'indigo',
              alignment: 'center',
              visible: true,
              displayOrder: 1,
            },
          ],
        },
        {
          pageKey: 'contact',
          title: 'Contact Us',
          slug: '/contact',
          published: true,
          sections: [
            {
              internalName: 'Hero',
              heading: 'Get In Touch',
              subheading: "We're here to help with your delivery needs.",
              theme: 'indigo',
              alignment: 'center',
              visible: true,
              displayOrder: 1,
            },
          ],
        },
      ]);
      console.log('✅ Pages created');
    }

    // FAQ Categories and Questions
    const existingFAQs = await FAQ.countDocuments();
    if (existingFAQs === 0) {
      await FAQ.insertMany([
        {
          category: 'General Delivery',
          question: 'What areas do you service?',
          answer:
            'MLKS Delivery Solutions primarily serves the Greater Toronto Area and surrounding regions in Ontario. Contact us to confirm service availability for your specific location.',
          displayOrder: 1,
          published: true,
        },
        {
          category: 'General Delivery',
          question: 'How do I request a delivery?',
          answer:
            'You can request a delivery through our online booking form, by phone, or by email. Our team will review your request and provide confirmation with scheduling details.',
          displayOrder: 2,
          published: true,
        },
        {
          category: 'Pharmacy Delivery',
          question: 'Do you provide pharmacy delivery services?',
          answer:
            'Yes, MLKS specializes in pharmacy and healthcare-related deliveries. We understand the importance of careful handling and time-sensitive coordination.',
          displayOrder: 1,
          published: true,
        },
        {
          category: 'Pharmacy Delivery',
          question: 'Are your drivers trained for medical deliveries?',
          answer:
            'Our team is trained in professional handling procedures for business and pharmacy deliveries, including secure packaging and careful transportation practices.',
          displayOrder: 2,
          published: true,
        },
        {
          category: 'Express Delivery',
          question: 'What is your same-day delivery timeframe?',
          answer:
            'Same-day delivery timing depends on request submission time, pickup location, delivery destination, and current service availability. Contact us for specific timing.',
          displayOrder: 1,
          published: true,
        },
        {
          category: 'Scheduled Delivery',
          question: 'Can I schedule recurring deliveries?',
          answer:
            'Yes, we offer scheduled delivery services for businesses requiring regular, recurring routes. Contact us to discuss your scheduling needs.',
          displayOrder: 1,
          published: true,
        },
        {
          category: 'Packaging',
          question: 'Do you provide packaging services?',
          answer:
            'Yes, we offer secure packaging services to help ensure items are properly prepared for transportation.',
          displayOrder: 1,
          published: true,
        },
        {
          category: 'Tracking',
          question: 'Can I track my delivery?',
          answer:
            'Contact our team for updates about your delivery. We maintain communication throughout the delivery process.',
          displayOrder: 1,
          published: true,
        },
      ]);
      console.log('✅ FAQs created');
    }

    // Gallery Categories
    const existingCategories = await GalleryCategory.countDocuments();
    if (existingCategories === 0) {
      await GalleryCategory.insertMany([
        {
          name: 'Pharmacy Delivery',
          slug: 'pharmacy-delivery',
          description: 'Professional pharmacy and healthcare delivery services',
          displayOrder: 1,
          published: true,
          images: [],
        },
        {
          name: 'Business Delivery',
          slug: 'business-delivery',
          description: 'Business and commercial delivery solutions',
          displayOrder: 2,
          published: true,
          images: [],
        },
        {
          name: 'Secure Packaging',
          slug: 'secure-packaging',
          description: 'Professional secure packaging services',
          displayOrder: 3,
          published: true,
          images: [],
        },
        {
          name: 'Delivery Team',
          slug: 'delivery-team',
          description: 'Our professional delivery team in action',
          displayOrder: 4,
          published: true,
          images: [],
        },
        {
          name: 'Vehicles',
          slug: 'vehicles',
          description: 'Our delivery fleet',
          displayOrder: 5,
          published: true,
          images: [],
        },
        {
          name: 'Behind the Scenes',
          slug: 'behind-the-scenes',
          description: 'A look at our operations',
          displayOrder: 6,
          published: true,
          images: [],
        },
      ]);
      console.log('✅ Gallery categories created');
    }

    // Testimonials (Draft - Require Verification)
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      await Testimonial.insertMany([
        {
          personName: 'Sarah Johnson',
          companyRole: 'Pharmacy Manager, CareFirst Pharmacy',
          quote:
            'MLKS has been reliable for our pharmacy delivery needs. Their team understands the importance of timely and careful handling.',
          featured: false,
          published: false,
          verifiedCustomer: false,
          displayOrder: 1,
        },
        {
          personName: 'Michael Chen',
          companyRole: 'Operations Director, MedSupply Co.',
          quote:
            'The scheduled delivery service has helped streamline our distribution operations significantly.',
          featured: false,
          published: false,
          verifiedCustomer: false,
          displayOrder: 2,
        },
        {
          personName: 'Dr. Emily Roberts',
          companyRole: 'Medical Office Coordinator',
          quote:
            'Professional service and good communication throughout the delivery process.',
          featured: false,
          published: false,
          verifiedCustomer: false,
          displayOrder: 3,
        },
      ]);
      console.log('✅ Draft testimonials created (unpublished - require verification)');
    }

    console.log('🎉 Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

// Run seed
const reset = process.argv.includes('--reset');
seedDatabase(reset);
