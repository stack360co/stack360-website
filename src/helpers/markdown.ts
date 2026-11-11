export type KeyValuePair = { label: string; value?: string | null };

/** One enquiry's contents, shared by the Mattermost post and the sales@ email. */
export type FormSummary = {
  /** Markdown heading for the Mattermost post. */
  title: string;
  /** Short name for the email subject, e.g. "Contact form". */
  label: string;
  fields: KeyValuePair[];
  bodyHeader?: string;
  bodyContent?: string | null;
};

function buildMarkdownMessage({ title, fields, bodyHeader, bodyContent }: FormSummary): string {
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

const formSummaries: Record<string, (data: Record<string, any>) => FormSummary> = {
  contact: ({ name, email, company, message }) => ({
    title: '## 📩 New Contact Form Submission',
    label: 'Contact form',
    fields: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Company', value: company },
    ],
    bodyHeader: 'Message',
    bodyContent: message,
  }),

  hire: ({ name, email, company, skillLabels, needLabel, notes }) => ({
    title: '## 💼 New Hire Talent Request',
    label: 'Hire request',
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

export function summarizeForm(formType: string, reqBody: Record<string, any>): FormSummary {
  const summarize = formSummaries[formType];
  if (!summarize) {
    throw new Error(`Invalid Form Type detected: ${formType}`);
  }
  return summarize(reqBody);
}

export function generateFormText(summary: FormSummary, leadContext: KeyValuePair[] = []): string {
  const contextLines = leadContext
    .filter(({ value }) => value)
    .map(({ label, value }) => `**${label}:** ${value}`);
  const message = buildMarkdownMessage(summary);
  const text = contextLines.length
    ? [message, '', '#### Lead context', ...contextLines].join('\n')
    : message;
  // Visitor text must not be able to ping the whole channel.
  return text.replace(/@(channel|all|here)\b/gi, '@​$1');
}
