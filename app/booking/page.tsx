import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Service from '@/lib/models/Service';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BookingForm from '@/components/BookingForm';

async function getBookingData() {
  try {
    await connectDB();
    
    const [settings, services] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      Service.find({ published: true, status: 'active' }).sort({ displayOrder: 1 }).lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      services: services ? JSON.parse(JSON.stringify(services)) : [],
    };
  } catch (error) {
    console.error('Error fetching booking data:', error);
    return { settings: null, services: [] };
  }
}

export const metadata = {
  title: 'Request a Delivery | MLKS Delivery Solutions',
  description: 'Submit your delivery request and our team will coordinate with you to schedule and complete your delivery.',
};

export default async function BookingPage() {
  const { settings, services } = await getBookingData();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 min-h-screen bg-gradient-to-br from-mlks-ice to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-mlks-orange font-semibold text-sm uppercase tracking-wider">
                Request Service
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-mlks-ink mt-4 mb-6">
                Request a Delivery
              </h1>
              <p className="text-lg text-mlks-slate">
                Fill out the form below and our team will contact you to coordinate your delivery.
              </p>
            </div>

            <BookingForm services={services} />
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
