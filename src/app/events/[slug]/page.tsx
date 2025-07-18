import EventSummaryPage from '@/components/events/event-summary-page';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  return <EventSummaryPage eventSlug={slug} />;
}