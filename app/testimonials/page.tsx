import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Testimonial from '@/lib/models/Testimonial';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Quote, Star } from 'lucide-react';

async function getTestimonialsData() {
  try {
    await connectDB();
    
    const [settings, testimonials] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      Testimonial.find({ published: true }).sort({ displayOrder: 1 }).lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      testimonials: testimonials ? JSON.parse(JSON.stringify(testimonials)) : [],
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { settings: null, testimonials: [] };
  }
}

export const metadata = {
  title: 'Client Testimonials | MLKS Delivery Solutions',
  description: 'Read what our clients say about MLKS Delivery Solutions and our professional delivery services.',
};

export default async function TestimonialsPage() {
  const { settings, testimonials } = await getTestimonialsData();

  const featuredTestimonials = testimonials.filter((t: any) => t.featured);
  const regularTestimonials = testimonials.filter((t: any) => !t.featured);

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20">
        {/* Hero - Centered */}
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
                  <Quote className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Testimonials
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  What Our Clients
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    Are Saying
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Hear from <span className="text-mlks-orange font-semibold">businesses that trust</span> MLKS Delivery Solutions.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        {featuredTestimonials.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-mlks-orange/10 to-mlks-indigo/10 rounded-3xl p-12 relative">
                    <Quote className="w-16 h-16 text-mlks-orange/30 absolute top-8 left-8" />
                    <div className="relative z-10">
                      <p className="text-2xl md:text-3xl text-mlks-ink font-medium leading-relaxed mb-8 italic">
                        "{featuredTestimonials[0].quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        {featuredTestimonials[0].image && (
                          <img
                            src={featuredTestimonials[0].image}
                            alt={featuredTestimonials[0].imageAlt || featuredTestimonials[0].personName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-bold text-mlks-ink text-lg">{featuredTestimonials[0].personName}</p>
                          {featuredTestimonials[0].companyRole && (
                            <p className="text-mlks-slate">{featuredTestimonials[0].companyRole}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* All Testimonials Grid */}
        {regularTestimonials.length > 0 && (
          <section className="section-padding bg-mlks-ice">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularTestimonials.map((testimonial: any, index: number) => (
                  <FadeIn key={testimonial._id} direction="up" delay={index * 0.1}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-mlks-orange text-mlks-orange" />
                        ))}
                      </div>
                      
                      <p className="text-mlks-ink leading-relaxed mb-6 flex-1 italic">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="border-t pt-4">
                        <p className="font-bold text-mlks-ink">{testimonial.personName}</p>
                        {testimonial.companyRole && (
                          <p className="text-sm text-mlks-slate">{testimonial.companyRole}</p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {testimonials.length === 0 && (
          <section className="section-padding bg-white">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center py-20">
                  <Quote className="w-16 h-16 text-mlks-slate mx-auto mb-4" />
                  <p className="text-mlks-slate text-lg">Testimonials coming soon.</p>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Trust Images */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FadeIn direction="left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <div className="text-6xl font-bold mb-2 text-mlks-orange">100%</div>
                      <p className="text-xl">Customer Focused</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-mlks-orange to-mlks-orange-dark flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <div className="text-6xl font-bold mb-2">24/7</div>
                      <p className="text-xl">Coordination</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Experience Professional Service
                </h2>
                <p className="text-xl mb-10 text-white/90">
                  Join the businesses that trust MLKS Delivery Solutions.
                </p>
                <Link href="/booking">
                  <Button variant="primary" size="lg">
                    Request a Delivery
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
