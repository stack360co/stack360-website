import type { Ref } from 'react';
import { HONEYPOT_FIELD } from '@/lib/form-guard';

/**
 * A field people never see or reach with the keyboard. Spam bots fill it in, and the webhook
 * route quietly drops those submissions. Kept off-screen rather than display:none, which some
 * bots skip.
 */
export default function FormHoneypot({ inputRef }: { inputRef: Ref<HTMLInputElement> }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label htmlFor={HONEYPOT_FIELD}>Website</label>
      <input
        ref={inputRef}
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
