type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

/** Server-safe JSON-LD script tag for Schema.org structured data. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
