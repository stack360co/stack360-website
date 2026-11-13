import BlueprintGrid from '@/components/layout/BlueprintGrid';

/**
 * Shell for the ads landing pages: the site's background, but no site navigation, chat or
 * floating buttons, so nothing pulls a visitor away from booking. Each page renders its own header
 * and footer, because both carry the page's WhatsApp message.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-neutral-50 selection:bg-primary/20 selection:text-primary">
      <BlueprintGrid />
      {children}
    </div>
  );
}
