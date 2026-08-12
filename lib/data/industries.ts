import {
  Pill,
  Scale,
  UtensilsCrossed,
  Package,
  LucideIcon,
} from 'lucide-react';

export interface IndustryFeature {
  title: string;
  description?: string;
}

export interface IndustryConfig {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'coming_soon';
  heroAccent: string;
  patientFeatures?: IndustryFeature[];
  businessFeatures?: IndustryFeature[];
  howItWorks?: { step: number; title: string; description: string }[];
  services?: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const industries: IndustryConfig[] = [
  {
    slug: 'pharmacy',
    name: 'Pharmacies',
    tagline: 'Secure prescription delivery for your patients',
    description:
      'MLKS helps pharmacies deliver prescriptions safely, discreetly, and on time — with same-day options, real-time tracking, and digital proof of delivery.',
    icon: Pill,
    status: 'active',
    heroAccent: 'Delivered With Care. Handled With Purpose.',
    patientFeatures: [
      { title: 'Order a prescription delivery' },
      { title: 'Schedule a delivery time' },
      { title: 'Same day delivery' },
      { title: 'Track your delivery in real time' },
      { title: 'SMS/email delivery notifications' },
      { title: 'Secure and discreet delivery' },
      { title: 'Proof of delivery' },
      { title: 'Recurring medication delivery' },
      { title: 'Temperature controlled medication delivery' },
      { title: 'Easy online booking' },
      { title: 'Contactless delivery options' },
      { title: 'Delivery status updates' },
    ],
    businessFeatures: [
      { title: 'Pharmacy delivery portal' },
      { title: 'Create and manage delivery orders' },
      { title: 'Real time driver tracking' },
      { title: 'Automated patient notifications' },
      { title: 'Digital proof of delivery' },
      { title: 'Scheduled pickup windows' },
      { title: 'Same day and priority delivery' },
      { title: 'Multi-stop route optimization' },
      { title: 'Delivery history and reporting' },
      { title: 'Failed delivery management' },
      { title: 'API/integration options' },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Pharmacy prepares the order',
        description: 'Your pharmacy prepares the patient\'s prescription and enters order details in our system.',
      },
      {
        step: 2,
        title: 'We pick it up',
        description: 'Our driver arrives during your scheduled pickup window for secure collection.',
      },
      {
        step: 3,
        title: 'Secure delivery',
        description: 'We deliver to the patient with discreet, professional handling and real-time updates.',
      },
      {
        step: 4,
        title: 'Confirmation received',
        description: 'Patient and pharmacy receive confirmation with digital proof of delivery.',
      },
    ],
    services: [
      'Prescription delivery',
      'Same day delivery',
      'Recurring deliveries',
      'Temperature controlled delivery',
      'Parcel delivery',
    ],
    ctaLabel: 'Become a Pharmacy Partner',
    ctaHref: '/become-a-partner?industry=pharmacy',
  },
  {
    slug: 'law-firms',
    name: 'Law Firms',
    tagline: 'Time-sensitive legal document delivery',
    description:
      'When court deadlines and client documents cannot wait, MLKS provides reliable, tracked delivery for law firms across the Kitchener-Waterloo region and beyond.',
    icon: Scale,
    status: 'active',
    heroAccent: 'Deadlines Met. Documents Delivered.',
    businessFeatures: [
      { title: 'Time-sensitive document delivery' },
      { title: 'Same-day and priority service' },
      { title: 'Proof of delivery with timestamps' },
      { title: 'Secure chain-of-custody handling' },
      { title: 'Scheduled pickup and delivery windows' },
      { title: 'Real-time delivery tracking' },
      { title: 'Confidential and discreet service' },
      { title: 'Multi-stop court and office runs' },
      { title: 'Delivery history and reporting' },
      { title: 'Dedicated account support' },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Request a pickup',
        description: 'Contact us with your document details, destination, and deadline requirements.',
      },
      {
        step: 2,
        title: 'We collect securely',
        description: 'Our driver picks up from your office with verified handoff.',
      },
      {
        step: 3,
        title: 'Tracked delivery',
        description: 'Documents are delivered on time with real-time status updates.',
      },
      {
        step: 4,
        title: 'Proof of delivery',
        description: 'Receive confirmation and digital proof once delivery is complete.',
      },
    ],
    services: [
      'Legal document delivery',
      'Court filing delivery',
      'Same-day express',
      'Scheduled recurring runs',
      'Multi-stop routes',
    ],
    ctaLabel: 'Request a Meeting for Rates',
    ctaHref: '/become-a-partner?industry=law-firms',
  },
  {
    slug: 'food',
    name: 'Food & Restaurants',
    tagline: 'Reliable food delivery for businesses',
    description:
      'From catering orders to restaurant supply runs, MLKS is expanding delivery services for food businesses across the region.',
    icon: UtensilsCrossed,
    status: 'coming_soon',
    heroAccent: 'Coming Soon',
    businessFeatures: [
      { title: 'Restaurant and catering delivery' },
      { title: 'Same-day delivery windows' },
      { title: 'Temperature-aware transport' },
      { title: 'Multi-stop route optimization' },
      { title: 'Real-time tracking' },
      { title: 'Proof of delivery' },
    ],
    ctaLabel: 'Join the Waitlist',
    ctaHref: '/become-a-partner?industry=food',
  },
  {
    slug: 'parcel-delivery',
    name: 'B2C Parcel Delivery',
    tagline: 'Direct-to-consumer parcel delivery',
    description:
      'For businesses selling directly to consumers, MLKS will offer reliable local parcel delivery with tracking and notifications.',
    icon: Package,
    status: 'coming_soon',
    heroAccent: 'Coming Soon',
    businessFeatures: [
      { title: 'Local same-day parcel delivery' },
      { title: 'Scheduled delivery windows' },
      { title: 'Real-time tracking for customers' },
      { title: 'SMS/email notifications' },
      { title: 'Proof of delivery' },
      { title: 'Returns and reverse logistics' },
    ],
    ctaLabel: 'Join the Waitlist',
    ctaHref: '/become-a-partner?industry=parcel-delivery',
  },
];

export const serviceAreas = [
  'Kitchener',
  'Waterloo',
  'Cambridge',
  'Guelph',
  'Brantford',
  'Elmira',
  'New Hamburg',
  'St. Jacobs',
  'Woolwich',
  'And surrounding areas',
];

export const availabilityOptions = [
  { value: 'early_morning', label: 'Early Morning (6am – 9am)' },
  { value: 'morning', label: 'Morning (9am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 8pm)' },
  { value: 'weekends', label: 'Weekends' },
];

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return industries.find((i) => i.slug === slug);
}
