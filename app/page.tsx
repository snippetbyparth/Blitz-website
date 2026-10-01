import { HeroSection } from '../components/hero/HeroSection';
import { DepartmentSection } from '../components/sections/DepartmentSection';
import { TeamSection } from '@/components/team/TeamSection';
import { GallerySection } from '@/components/gallery/GallerySection';
import { EventsRail } from '@/components/events/EventsRail';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <DepartmentSection />
      <TeamSection />
      <GallerySection />
      <EventsRail />
    </main>
  );
}
