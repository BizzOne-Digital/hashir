import { notFound } from 'next/navigation';
import IndustryPageLayout from '@/components/industries/IndustryPageLayout';
import { getIndustryBySlug } from '@/lib/data/industries';
import { getSiteSettings } from '@/lib/utils/site-settings';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'pharmacy' },
    { slug: 'law-firms' },
    { slug: 'food' },
    { slug: 'parcel-delivery' },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: 'Industry Not Found' };

  return {
    title: `${industry.name} Delivery | MLKS Delivery Solutions`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const settings = await getSiteSettings();

  return <IndustryPageLayout industry={industry} settings={settings} />;
}
