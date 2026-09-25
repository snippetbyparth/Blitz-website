import { HeroSection } from '../components/hero/HeroSection';
import { DepartmentSection } from '../components/sections/DepartmentSection';
import { AboutSection } from '../components/sections/AboutSection';
import { PeopleSection } from '@/components/sections/PeopleSection';
import { TeamSection } from '@/components/team/TeamSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { EventsRail } from '@/components/events/EventsRail';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <DepartmentSection />
      <AboutSection />
      <PeopleSection />
      <TeamSection />
      <WhatWeDoSection />
      <EventsRail />
    </main>
  );
}
