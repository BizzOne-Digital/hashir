import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/animations/FadeIn';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

async function getContactData() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return { settings: settings ? JSON.parse(JSON.stringify(settings)) : null };
  } catch (error) {
    return { settings: null };
  }
}

export const metadata = {
  title: 'Contact Us | MLKS Delivery Solutions',
  description: 'Get in touch with MLKS Delivery Solutions. Contact us for delivery inquiries, quotes, or general information.',
};

export default async function ContactPage() {
  const { settings } = await getContactData();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        {/* Hero Section - Centered */}
        <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-mlks-deep-indigo via-mlks-indigo to-mlks-deep-indigo overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mlks-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mlks-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${(i * 4.17) % 100}%`,
                    top: `${(i * 6.25) % 100}%`,
                    animation: `float ${5 + (i % 5) * 2}s ease-in-out infinite`,
                    animationDelay: `${(i % 5) * 1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Mail className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Contact Us
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Let's Start a
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    Conversation
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Have questions about our delivery services? <span className="text-mlks-orange font-semibold">We're here to help.</span>
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Info & Form - Enhanced */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, #30359B 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} 
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <FadeIn direction="left">
                  <div className="bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo rounded-3xl p-8 text-white sticky top-24 shadow-2xl border-2 border-white/10">
                    <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                    
                    <div className="space-y-6">
                      {settings?.primaryPhone && (
                        <div 
                          className="flex items-start gap-4 group hover:bg-white/10 p-4 rounded-xl transition-all"
                          style={{ animation: 'float 6s ease-in-out infinite' }}
                        >
                          <div className="w-12 h-12 bg-mlks-orange rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                            <Phone size={24} />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm mb-1">Phone</p>
                            <a
                              href={`tel:${settings.primaryPhone.replace(/\D/g, '')}`}
                              className="text-lg font-medium hover:text-mlks-orange transition-colors"
                            >
                              {settings.primaryPhone}
                            </a>
                          </div>
                        </div>
                      )}

                      {settings?.email && (
                        <div 
                          className="flex items-start gap-4 group hover:bg-white/10 p-4 rounded-xl transition-all"
                          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
                        >
                          <div className="w-12 h-12 bg-mlks-orange rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                            <Mail size={24} />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm mb-1">Email</p>
                            <a
                              href={`mailto:${settings.email}`}
                              className="text-lg font-medium hover:text-mlks-orange transition-colors break-all"
                            >
                              {settings.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {settings?.address && (
                        <div 
                          className="flex items-start gap-4 group hover:bg-white/10 p-4 rounded-xl transition-all"
                          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}
                        >
                          <div className="w-12 h-12 bg-mlks-orange rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm mb-1">Address</p>
                            <p className="text-lg font-medium leading-relaxed">
                              {settings.address}
                            </p>
                          </div>
                        </div>
                      )}

                      {settings?.officeHours && (
                        <div 
                          className="flex items-start gap-4 group hover:bg-white/10 p-4 rounded-xl transition-all"
                          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '3s' }}
                        >
                          <div className="w-12 h-12 bg-mlks-orange rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                            <Clock size={24} />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm mb-1">Office Hours</p>
                            <p className="text-lg font-medium leading-relaxed">
                              {settings.officeHours}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <FadeIn direction="right">
                  <div className="bg-gradient-to-br from-mlks-ice to-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-mlks-orange/10">
                    <div className="mb-8">
                      <div className="inline-block mb-4 px-6 py-2 bg-mlks-orange/10 rounded-full">
                        <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">Send Message</span>
                      </div>
                      <h2 className="text-4xl font-bold text-mlks-ink mb-4">
                        Drop Us a Line
                      </h2>
                      <p className="text-xl text-mlks-slate">
                        Fill out the form below and we'll get back to you as soon as possible.
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section - Enhanced Creative Cards */}
        <section className="py-20 bg-gradient-to-b from-white to-mlks-ice relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 border-4 border-mlks-orange rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-mlks-indigo/20 rounded-3xl rotate-45" style={{ animation: 'float 8s ease-in-out infinite' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="inline-block mb-4 px-6 py-2 bg-mlks-orange/10 rounded-full">
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">Quick Connect</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink">
                  Choose Your
                  <span className="block text-mlks-orange">Preferred Method</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FadeIn direction="up" delay={0.1}>
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500">
                  <div className="aspect-square bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-mlks-orange rounded-full blur-2xl animate-pulse" />
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-mlks-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                        <Phone className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Call Us</h3>
                      <p className="text-white/80 mb-4">Immediate assistance during business hours</p>
                      <div className="text-sm text-white/60">Response: Instant</div>
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-mlks-orange/30 to-transparent rounded-tl-[100px]" />
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500">
                  <div className="aspect-square bg-gradient-to-br from-mlks-orange to-mlks-orange-dark flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                        <Mail className="w-10 h-10 text-mlks-orange" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Email Us</h3>
                      <p className="text-white/90 mb-4">Detailed inquiries and quotes</p>
                      <div className="text-sm text-white/70">Response: 24 hours</div>
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/20 to-transparent rounded-tl-[100px]" />
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500">
                  <div className="aspect-square bg-gradient-to-br from-mlks-cyan to-blue-600 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                        <MapPin className="w-10 h-10 text-mlks-cyan" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
                      <p className="text-white/90 mb-4">Serving Ontario, Canada</p>
                      <div className="text-sm text-white/70">Location: Ontario</div>
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/20 to-transparent rounded-tl-[100px]" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
