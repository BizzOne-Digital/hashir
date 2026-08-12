import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import BlogPost from '@/lib/models/BlogPost';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils/helpers';

async function getBlogData() {
  try {
    await connectDB();
    
    const [settings, posts] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      BlogPost.find({ published: true }).sort({ publishedDate: -1 }).limit(12).lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      posts: posts ? JSON.parse(JSON.stringify(posts)) : [],
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { settings: null, posts: [] };
  }
}

export const metadata = {
  title: 'Blog | MLKS Delivery Solutions',
  description: 'News, updates, and insights from MLKS Delivery Solutions.',
};

export default async function BlogPage() {
  const { settings, posts } = await getBlogData();

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
                  <BookOpen className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Our Blog
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  News & Insights
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    From MLKS
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Stay updated with the latest <span className="text-mlks-orange font-semibold">news, updates, and insights</span> from our team.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <FadeIn>
                <div className="text-center py-20">
                  <BookOpen className="w-16 h-16 text-mlks-slate mx-auto mb-4" />
                  <p className="text-mlks-slate text-lg">Blog posts coming soon.</p>
                </div>
              </FadeIn>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any, index: number) => (
                  <FadeIn key={post._id} direction="up" delay={index * 0.1}>
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-mlks-orange hover:shadow-xl transition-all h-full flex flex-col">
                        {/* Cover Image */}
                        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-mlks-indigo/10 to-mlks-orange/10">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.coverImageAlt || post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-mlks-orange/30" />
                            </div>
                          )}
                          {post.category && (
                            <div className="absolute top-4 left-4 bg-mlks-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                              {post.category}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 text-sm text-mlks-slate mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {formatDate(post.publishedDate || post.createdAt)}
                            </span>
                            {post.readingTime && (
                              <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {post.readingTime} min read
                              </span>
                            )}
                          </div>

                          <h2 className="text-xl font-bold text-mlks-ink mb-3 group-hover:text-mlks-orange transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-mlks-slate leading-relaxed mb-4 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="text-mlks-orange font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Read More
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Banner Images */}
        <section className="py-16 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn direction="left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-mlks-orange to-mlks-orange-dark flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <BookOpen className="w-20 h-20 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
                      <p className="text-white/90">Follow our latest news and insights</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <h3 className="text-3xl font-bold mb-2">Subscribe</h3>
                      <p className="text-white/90">Get notified of new posts</p>
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
