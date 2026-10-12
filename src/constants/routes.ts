import { envVars } from '@/config/env';

const SUITE360_TENANT_ID = '11111111-1111-1111-1111-111111111111';

/** MATTERMOST_WEBHOOK_ID can hold the hook ID or the full https://team.stack360.co/hooks/<id> link. */
const MATTERMOST_WEBHOOK = String(envVars.MATTERMOST_WEBHOOK_ID ?? '').trim();

export const routes = Object.freeze({
  root: '/',
  ui: {
    index: '/',
  },
  api: {
    health: '/api/health',
    ip: '/api/ip',
    mattermostWebhook: '/api/contact/m-webhook', // POST
  },
  suite360: {
    jobs: {
      filters: `https://suite.stack360.co/api/Jobs/filters/${SUITE360_TENANT_ID}`,
      organization: `https://suite.stack360.co/api/Jobs/organization/${SUITE360_TENANT_ID}`,
      getInformation: (jobId: string) => `https://suite.stack360.co/job-application/${jobId}`,
    },
  },
  webhook: {
    mattermost: MATTERMOST_WEBHOOK.startsWith('https://')
      ? MATTERMOST_WEBHOOK
      : `https://team.stack360.co/hooks/${MATTERMOST_WEBHOOK}`,
  },
});
