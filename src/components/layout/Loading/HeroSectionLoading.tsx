import BlueprintGrid from '../BlueprintGrid';
import NavbarSkeleton from '../Navbar/NavbarSkeleton';

type HeroCopy = { lead: string; phrase: string; intro: string };

/** With `copy`, the title and intro render as real text (same styles as the hero), not bars. */
export default function HeroSectionLoading({
  hideNavbar = false,
  copy,
}: {
  hideNavbar?: boolean;
  copy?: HeroCopy;
}) {
  return (
    <div
      className={`relative bg-neutral-50 ${hideNavbar ? 'min-h-[calc(100vh-4.5rem)]' : 'min-h-screen'}`}
    >
      {hideNavbar ? null : <BlueprintGrid />}

      {hideNavbar ? null : <NavbarSkeleton />}

      <div className="relative z-10 flex min-h-[calc(100vh-4.5rem)] w-full flex-col items-center justify-center overflow-hidden py-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_srgb,var(--token-primary)_12%,transparent),transparent_70%)]"
        />

        <div className="site-container relative z-10 flex flex-col items-center text-center">
          <div className="h-7 w-28 animate-pulse rounded-md bg-primary/15" />

          {copy ? (
            <>
              <h1 className="mt-md max-w-3xl text-balance text-4xl font-black leading-[1.08] tracking-tight text-neutral-900 md:text-5xl lg:text-[clamp(3rem,5vw,4rem)]">
                {copy.lead}
                <span className="mt-sm block text-primary">{copy.phrase}</span>
              </h1>
              <p className="mt-lg max-w-3xl text-pretty text-base leading-relaxed font-medium text-neutral-700">
                {copy.intro}
              </p>
            </>
          ) : (
            <>
              <div className="mt-md flex w-full max-w-4xl flex-col items-center space-y-sm">
                <div className="h-10 w-4/5 animate-pulse rounded-lg bg-neutral-300/80 md:h-16" />
                <div className="h-10 w-3/5 animate-pulse rounded-lg bg-primary/20 md:h-16" />
              </div>

              <div className="mt-lg flex w-full max-w-2xl flex-col items-center space-y-xs">
                <div className="h-4 w-full animate-pulse rounded-md bg-neutral-200/80" />
                <div className="h-4 w-4/5 animate-pulse rounded-md bg-neutral-200/80" />
              </div>
            </>
          )}

          <div className="mt-xl flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 px-md py-sm shadow-xs">
            <div className="h-7 w-48 animate-pulse rounded-md bg-neutral-200/70" />
          </div>

          <div className="mt-xl flex flex-wrap items-center justify-center gap-md">
            <div className="h-12 w-40 animate-pulse rounded-md bg-primary/80" />
            <div className="h-12 w-36 animate-pulse rounded-md border border-neutral-200 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
