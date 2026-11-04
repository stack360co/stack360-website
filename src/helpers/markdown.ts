type KeyValuePair = { label: string; value?: string | null };

function buildMarkdownMessage({
  title,
  fields,
  bodyHeader,
  bodyContent,
}: {
  title: string;
  fields: KeyValuePair[];
  bodyHeader?: string;
  bodyContent?: string | null;
}): string {
  const lines: (string | null)[] = [title, ''];

  fields.forEach(({ label, value }) => {
    if (value) {
      lines.push(`**${label}:** ${value}`);
    }
  });

  if (bodyContent) {
    lines.push('');
    if (bodyHeader) {
      lines.push(`**${bodyHeader}:**`);
    }
    lines.push(bodyContent);
  }

  return lines.filter(Boolean).join('\n');
}

const formFormatters: Record<string, (data: Record<string, any>) => string> = {
  contact: ({ name, email, company, message }) =>
    buildMarkdownMessage({
      title: '## 📩 New Contact Form Submission',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Company', value: company },
      ],
      bodyHeader: 'Message',
      bodyContent: message,
    }),

  hire: ({ name, email, company, skillLabels, needLabel, notes }) =>
    buildMarkdownMessage({
      title: '## 💼 New Hire Talent Request',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Company', value: company },
        { label: 'Skills', value: skillLabels },
        { label: 'Need', value: needLabel },
      ],
      bodyHeader: 'Notes',
      bodyContent: notes,
    }),
};

export function generateFormText(
  formType: string,
  reqBody: Record<string, any>,
  leadContext: KeyValuePair[] = []
): string {
  const formatter = formFormatters[formType];
  if (!formatter) {
    throw new Error(`Invalid Form Type detected: ${formType}`);
  }
  const contextLines = leadContext
    .filter(({ value }) => value)
    .map(({ label, value }) => `**${label}:** ${value}`);
  const text = contextLines.length
    ? [formatter(reqBody), '', '#### Lead context', ...contextLines].join('\n')
    : formatter(reqBody);
  // Visitor text must not be able to ping the whole channel.
  return text.replace(/@(channel|all|here)\b/gi, '@​$1');
}
