import EventAboutPage from '@/components/events/event-about-page';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventAboutPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <EventAboutPage eventSlug={slug} />;
}