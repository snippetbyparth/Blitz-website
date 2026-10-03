import { HeroSection } from '../components/hero/HeroSection';
import { DepartmentSection } from '../components/sections/DepartmentSection';
import { TeamSection } from '@/components/team/TeamSection';
import { GallerySection } from '@/components/gallery/GallerySection';
import { HighlightsSection } from '@/components/highlights/HighlightsSection';
import { EventsRail } from '@/components/events/EventsRail';
import { Footer } from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <DepartmentSection />
      <TeamSection />
      <EventsRail />
      <HighlightsSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
