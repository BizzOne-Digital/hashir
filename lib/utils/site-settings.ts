import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';

export async function getSiteSettings() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return settings ? JSON.parse(JSON.stringify(settings)) : null;
  } catch {
    return null;
  }
}
