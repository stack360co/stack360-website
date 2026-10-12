import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import BookCallButton from '@/components/shared/BookCallButton';
import { MotionCard, MotionStagger, MotionStaggerItem } from '@/components/shared/motion';
import { CONTACT_CHANNELS, CONTACT_OFFICES } from '@/constants/component/contact-data';

export default function ContactChannel() {
  return (
    <div className="space-y-xl lg:col-span-5">
      <MotionStagger className="space-y-md">
        <MotionStaggerItem>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Direct channels</h2>
        </MotionStaggerItem>
        <MotionStaggerItem>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
            Reach our partnerships desk directly. We route every inquiry to the right lead engineer
            — not a generic inbox.
          </p>
        </MotionStaggerItem>
      </MotionStagger>

      <MotionStagger className="space-y-md">
        {/* Renders nothing until NEXT_PUBLIC_CALENDLY_URL is set */}
        <BookCallButton />
        {CONTACT_CHANNELS.map((channel) => (
          <MotionStaggerItem key={channel.label}>
            <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:border-primary/30 hover:bg-primary/5">
              <a
                href={'href' in channel ? channel.href : undefined}
                target={'target' in channel ? channel.target : undefined}
                rel={'rel' in channel ? channel.rel : undefined}
                className="group flex items-start gap-md p-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-primary transition-colors group-hover:border-primary/30">
                  {channel.type === 'phone' ? <Phone size={18} /> : <Mail size={18} />}
                </span>
                <span>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    {channel.label}
                  </span>
                  <span className="mt-xs block text-base font-semibold text-neutral-900 group-hover:text-primary">
                    {channel.value}
                  </span>
                  <span className="mt-xs block text-xs text-neutral-600">{channel.hint}</span>
                </span>
              </a>
            </MotionCard>
          </MotionStaggerItem>
        ))}
      </MotionStagger>

      <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {CONTACT_OFFICES.map((office) => (
          <MotionStaggerItem key={office.country} className="h-full">
            <MotionCard className="flex h-full flex-col justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-md">
              <div>
                <div className="flex items-center gap-sm">
                  <Image
                    src={office.flagSrc}
                    alt={`${office.country} flag`}
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded-xs border border-neutral-200 object-cover"
                  />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                    {office.role}
                  </span>
                </div>
                <p className="mt-sm text-sm font-semibold text-neutral-900">{office.country}</p>
              </div>
              <p className="mt-xs text-xs leading-relaxed text-neutral-600">{office.address}</p>
            </MotionCard>
          </MotionStaggerItem>
        ))}
      </MotionStagger>
    </div>
  );
}
