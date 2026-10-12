import { Star } from 'lucide-react';
import Image from 'next/image';
import { LANDING_TESTIMONIALS } from '@/constants/component/landing-data';

/**
 * One real client testimonial, shown next to a form so the visitor sees proof
 * at the moment they decide whether to send it. Picks by client name from
 * LANDING_TESTIMONIALS; renders nothing if the name is not found.
 */
export default function FormTestimonial({ name }: { name: string }) {
  const testimonial = LANDING_TESTIMONIALS.find((item) => item.name === name);
  if (!testimonial) {
    return null;
  }

  const byline = [testimonial.role, testimonial.company].filter(Boolean).join(', ');

  return (
    <figure className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600">
        What clients say
      </p>
      <div
        className="mt-sm flex items-center gap-xs"
        role="img"
        aria-label={`Rated ${testimonial.rating} out of 5`}
      >
        {Array.from({ length: testimonial.rating }, (_, index) => `star-${index}`).map((key) => (
          <Star key={key} size={14} className="fill-primary text-primary" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-sm text-pretty text-sm leading-relaxed text-neutral-700">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-md flex items-center gap-sm">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 object-cover"
          />
        ) : null}
        <span>
          <span className="block text-sm font-bold text-neutral-900">{testimonial.name}</span>
          {byline ? <span className="block text-xs text-neutral-600">{byline}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}
