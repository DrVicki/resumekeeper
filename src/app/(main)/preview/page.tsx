import Portfolio from '@/components/preview/portfolio';
import { getResumeData } from '@/lib/data';

export default async function PreviewPage() {
  const resumeData = await getResumeData();

  return (
    <div className="bg-card rounded-xl shadow-sm">
      <Portfolio resumeData={resumeData} />
    </div>
  );
}
