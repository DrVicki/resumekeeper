import { getResumeData } from '@/lib/data';
import ProfileTabs from '@/components/profile/profile-tabs';

export default async function ProfilePage() {
  const resumeData = await getResumeData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Management</h1>
        <p className="text-muted-foreground">
          Update your personal details, professional experience, and more.
        </p>
      </div>
      <ProfileTabs resumeData={resumeData} />
    </div>
  );
}
