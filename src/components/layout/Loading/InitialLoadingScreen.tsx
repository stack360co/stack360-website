import Image from 'next/image';
import BlueprintGrid from '../BlueprintGrid';
import NavbarSkeleton from '../Navbar/NavbarSkeleton';

export default function InitialLoadingScreen() {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 selection:bg-primary/20 selection:text-primary">
      <BlueprintGrid />

      <NavbarSkeleton />

      <div className="relative z-10 flex flex-1 items-center justify-center p-md">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--token-neutral-50)_0%,var(--token-neutral-50)_40%,color-mix(in_srgb,var(--token-neutral-100)_55%,var(--token-neutral-50))_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,color-mix(in_srgb,var(--token-primary)_12%,transparent),transparent_70%)]"
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-lg text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/10 transition-all duration-1000" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-md shadow-md">
              <div className="relative h-full w-full">
                <Image
                  src="/favicon.svg"
                  alt="Stack360 Icon"
                  fill
                  sizes="32px"
                  className="animate-pulse object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-sm">
            <Image
              src="/stack360-text.svg"
              alt="Stack360"
              width={129}
              height={24}
              className="h-6 w-auto object-contain opacity-90"
              priority
            />

            <div className="h-1 w-32 overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full w-full origin-left-right animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
