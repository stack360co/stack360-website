import CaseStudiesSection from '@/components/pages/landing/CaseStudies';
import ClientsMarquee from '@/components/pages/landing/ClientsMarquee';
import HeroSectionLoader from '@/components/pages/landing/HeroSectionLoader';
import HorizontalWedgeTrack from '@/components/pages/landing/HorizontalWedge';
import ProcessSection from '@/components/pages/landing/ProcessSection';
import ServicesSection from '@/components/pages/landing/ServicesSection';
import TestimonialsSection from '@/components/pages/landing/TestimonialsSection';
import TrustBadges from '@/components/pages/landing/TrustBadges';
import WhyChooseSection from '@/components/pages/landing/WhyChooseSection';
import PageClosingCta from '@/components/shared/PageClosingCta';
import { LANDING_CTA } from '@/constants/component/landing-data';
import { MOCK_WEDGES } from '@/constants/component/wedge-data';

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] w-full flex-col">
      <HeroSectionLoader />
      <ClientsMarquee />

      <ServicesSection />
      <WhyChooseSection />

      <HorizontalWedgeTrack
        sectionTitle="Most software firms write code."
        sectionHighlight="We engineer outcomes."
        sectionSubtitle="We combine product strategy, engineering expertise, AI capabilities, and business insight to build technology that delivers measurable results."
        cards={MOCK_WEDGES}
      />

      <ProcessSection />

      <CaseStudiesSection />

      <TrustBadges />

      <TestimonialsSection />

      <PageClosingCta
        title={LANDING_CTA.title}
        description={LANDING_CTA.description}
        primary={LANDING_CTA.primary}
        secondary={LANDING_CTA.secondary}
      />
    </div>
  );
}
