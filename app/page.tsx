import Link from 'next/link';
import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Service from '@/lib/models/Service';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CreativeHero from '@/components/home/CreativeHero';
import ServiceCards from '@/components/home/ServiceCards';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import DeliveryValues from '@/components/home/DeliveryValues';
import DeliveryProcess from '@/components/home/DeliveryProcess';
import TechnologySection from '@/components/home/TechnologySection';
import BusinessFocus from '@/components/home/BusinessFocus';
import PlanAhead from '@/components/home/PlanAhead';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

async function getPageData() {
  try {
    await connectDB();
    
    const [settings, services] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      Service.find({ published: true, status: { $ne: 'draft' } })
        .sort({ displayOrder: 1 })
        .limit(6)
        .lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      services: services ? JSON.parse(JSON.stringify(services)) : [],
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      settings: null,
      services: [],
    };
  }
}

export default async function HomePage() {
  const { settings, services } = await getPageData();

  return (
    <>
      <Header settings={settings} />
      <main className="overflow-hidden">
        <CreativeHero />
        <ServiceCards />
        <FeaturesGrid />
        <DeliveryValues />
        <DeliveryProcess />
        <TechnologySection />
        <BusinessFocus />
        <PlanAhead />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer settings={settings} />
    </>
  );
}
