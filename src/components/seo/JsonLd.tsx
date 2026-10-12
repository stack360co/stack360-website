type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

/** Several entities go out as one `@graph`, so they share a context and can point at each other by `@id`. */
function toGraph(data: JsonLdProps['data']) {
  if (!Array.isArray(data)) {
    return data;
  }
  return {
    '@context': 'https://schema.org',
    '@graph': data.map(({ '@context': _context, ...node }) => node),
  };
}

/** Server-safe JSON-LD script tag for Schema.org structured data. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(toGraph(data)).replace(/</g, '\\u003c') }}
    />
  );
}
