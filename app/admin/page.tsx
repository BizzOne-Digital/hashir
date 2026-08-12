import connectDB from '@/lib/db/mongodb';
import Service from '@/lib/models/Service';
import DeliveryRequest from '@/lib/models/DeliveryRequest';
import ContactMessage from '@/lib/models/ContactMessage';
import BlogPost from '@/lib/models/BlogPost';
import Testimonial from '@/lib/models/Testimonial';
import FAQ from '@/lib/models/FAQ';
import GalleryCategory from '@/lib/models/GalleryCategory';
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber';
import Link from 'next/link';
import { 
  Package, 
  Truck, 
  Mail, 
  MessageSquare, 
  TrendingUp,
  Users,
  Image,
  HelpCircle,
  BookOpen,
  Settings as SettingsIcon
} from 'lucide-react';

async function getDashboardStats() {
  try {
    await connectDB();

    const [
      totalServices,
      activeServices,
      comingSoonServices,
      totalRequests,
      newRequests,
      totalMessages,
      unreadMessages,
      totalTestimonials,
      publishedTestimonials,
      totalFAQs,
      totalBlogPosts,
      publishedPosts,
      totalSubscribers,
      galleryCount,
    ] = await Promise.all([
      Service.countDocuments({}),
      Service.countDocuments({ status: 'active', published: true }),
      Service.countDocuments({ status: 'coming_soon' }),
      DeliveryRequest.countDocuments({}),
      DeliveryRequest.countDocuments({ status: 'new' }),
      ContactMessage.countDocuments({}),
      ContactMessage.countDocuments({ read: false }),
      Testimonial.countDocuments({}),
      Testimonial.countDocuments({ published: true }),
      FAQ.countDocuments({ published: true }),
      BlogPost.countDocuments({}),
      BlogPost.countDocuments({ published: true }),
      NewsletterSubscriber.countDocuments({ subscribed: true }),
      GalleryCategory.countDocuments({}),
    ]);

    const recentRequests = await DeliveryRequest.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('requestNumber customerName status createdAt')
      .lean();

    return {
      totalServices,
      activeServices,
      comingSoonServices,
      totalRequests,
      newRequests,
      totalMessages,
      unreadMessages,
      totalTestimonials,
      publishedTestimonials,
      totalFAQs,
      totalBlogPosts,
      publishedPosts,
      totalSubscribers,
      galleryCount,
      recentRequests: JSON.parse(JSON.stringify(recentRequests)),
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return {
      totalServices: 0,
      activeServices: 0,
      comingSoonServices: 0,
      totalRequests: 0,
      newRequests: 0,
      totalMessages: 0,
      unreadMessages: 0,
      totalTestimonials: 0,
      publishedTestimonials: 0,
      totalFAQs: 0,
      totalBlogPosts: 0,
      publishedPosts: 0,
      totalSubscribers: 0,
      galleryCount: 0,
      recentRequests: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: 'Total Services',
      value: stats.totalServices,
      subtext: `${stats.activeServices} active, ${stats.comingSoonServices} coming soon`,
      icon: Truck,
      color: 'bg-blue-500',
      link: '/admin/services',
    },
    {
      label: 'Delivery Requests',
      value: stats.totalRequests,
      subtext: `${stats.newRequests} new requests`,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/bookings',
    },
    {
      label: 'Contact Messages',
      value: stats.totalMessages,
      subtext: `${stats.unreadMessages} unread`,
      icon: Mail,
      color: 'bg-purple-500',
      link: '/admin/messages',
    },
    {
      label: 'Newsletter Subscribers',
      value: stats.totalSubscribers,
      subtext: 'Active subscribers',
      icon: Users,
      color: 'bg-orange-500',
      link: '/admin/subscribers',
    },
    {
      label: 'Testimonials',
      value: stats.totalTestimonials,
      subtext: `${stats.publishedTestimonials} published`,
      icon: MessageSquare,
      color: 'bg-pink-500',
      link: '/admin/testimonials',
    },
    {
      label: 'FAQs',
      value: stats.totalFAQs,
      subtext: 'Published FAQs',
      icon: HelpCircle,
      color: 'bg-indigo-500',
      link: '/admin/faqs',
    },
    {
      label: 'Blog Posts',
      value: stats.totalBlogPosts,
      subtext: `${stats.publishedPosts} published`,
      icon: BookOpen,
      color: 'bg-yellow-500',
      link: '/admin/blog',
    },
    {
      label: 'Gallery Categories',
      value: stats.galleryCount,
      subtext: 'Image collections',
      icon: Image,
      color: 'bg-cyan-500',
      link: '/admin/gallery',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to MLKS Delivery Solutions Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.link}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subtext}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Delivery Requests</h2>
          <Link href="/admin/bookings" className="text-mlks-orange hover:text-mlks-orange-dark text-sm font-medium">
            View All →
          </Link>
        </div>

        {stats.recentRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No delivery requests yet</p>
        ) : (
          <div className="space-y-4">
            {stats.recentRequests.map((request: any) => (
              <Link
                key={request._id}
                href={`/admin/bookings/${request._id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-mlks-orange/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-mlks-orange" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{request.requestNumber}</div>
                    <div className="text-sm text-gray-500">{request.customerName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : request.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {request.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/services/new" className="bg-mlks-orange hover:bg-mlks-orange-dark text-white rounded-xl p-6 transition-colors">
          <Truck className="w-8 h-8 mb-4" />
          <div className="font-bold text-lg mb-2">Add New Service</div>
          <div className="text-white/90 text-sm">Create a new delivery service</div>
        </Link>

        <Link href="/admin/blog/new" className="bg-mlks-indigo hover:bg-mlks-deep-indigo text-white rounded-xl p-6 transition-colors">
          <BookOpen className="w-8 h-8 mb-4" />
          <div className="font-bold text-lg mb-2">Write Blog Post</div>
          <div className="text-white/90 text-sm">Publish a new article</div>
        </Link>

        <Link href="/admin/settings" className="bg-gray-700 hover:bg-gray-800 text-white rounded-xl p-6 transition-colors">
          <SettingsIcon className="w-8 h-8 mb-4" />
          <div className="font-bold text-lg mb-2">Site Settings</div>
          <div className="text-white/90 text-sm">Update contact info & settings</div>
        </Link>
      </div>
    </div>
  );
}
