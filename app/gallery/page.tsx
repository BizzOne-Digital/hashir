import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import GalleryCategory from '@/lib/models/GalleryCategory';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Image as ImageIcon } from 'lucide-react';

async function getGalleryData() {
  try {
    await connectDB();
    
    const [settings, categories] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      GalleryCategory.find({ published: true }).sort({ displayOrder: 1 }).lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      categories: categories ? JSON.parse(JSON.stringify(categories)) : [],
    };
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return { settings: null, categories: [] };
  }
}

export const metadata = {
  title: 'Gallery | MLKS Delivery Solutions',
  description: 'View our delivery fleet, team, and operations at MLKS Delivery Solutions.',
};

export default async function GalleryPage() {
  const { settings, categories } = await getGalleryData();

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
                  <ImageIcon className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Gallery
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Our Work
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    In Action
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  A look at our <span className="text-mlks-orange font-semibold">delivery operations, team, and vehicles</span>.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Gallery Categories */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            {categories.length === 0 ? (
              <FadeIn>
                <div className="text-center py-20">
                  <ImageIcon className="w-16 h-16 text-mlks-slate mx-auto mb-4" />
                  <p className="text-mlks-slate text-lg">Gallery images coming soon.</p>
                </div>
              </FadeIn>
            ) : (
              <div className="space-y-20">
                {categories.map((category: any, catIndex: number) => (
                  <FadeIn key={category._id} delay={catIndex * 0.1}>
                    <div>
                      <div className="mb-8">
                        <h2 className="text-4xl font-bold text-mlks-ink mb-3">{category.name}</h2>
                        {category.description && (
                          <p className="text-lg text-mlks-slate">{category.description}</p>
                        )}
                      </div>

                      {category.images && category.images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.images
                            .filter((img: any) => img.published)
                            .map((image: any, imgIndex: number) => (
                              <div
                                key={image._id || imgIndex}
                                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                              >
                                <img
                                  src={image.url}
                                  alt={image.alt}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {image.caption && (
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <p className="text-white text-sm">{image.caption}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="aspect-[4/3] rounded-xl bg-gradient-to-br from-mlks-ice to-gray-200 flex items-center justify-center"
                            >
                              <ImageIcon className="w-12 h-12 text-mlks-slate/30" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Placeholder Images Section */}
        <section className="py-16 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { color: 'from-mlks-indigo to-mlks-deep-indigo', icon: '🚚' },
                  { color: 'from-mlks-orange to-mlks-orange-dark', icon: '📦' },
                  { color: 'from-mlks-cyan to-mlks-indigo', icon: '⚡' },
                  { color: 'from-mlks-success to-mlks-cyan', icon: '✓' },
                ].map((item, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-lg">
                    <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <span className="text-6xl">{item.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
