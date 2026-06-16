/**
 * envConfig.js
 * Reads every VITE_* variable exposed by Vite and organises them into groups.
 * Add new variables here as your .env grows.
 */

// ─── Raw env object (everything Vite exposes) ────────────────────────────────
export const rawEnv = import.meta.env;

// ─── Typed, named config ─────────────────────────────────────────────────────
export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME ?? '',
    version: import.meta.env.VITE_APP_VERSION ?? '',
    env: import.meta.env.VITE_APP_ENV ?? '',
  },
  aws: {
    region: import.meta.env.VITE_AWS_REGION ?? '',
    bucket: import.meta.env.VITE_S3_BUCKET_NAME ?? '',
    accessKey: import.meta.env.VITE_AWS_ACCESS_KEY ?? '',
  },
  build: {
    useJudge0: import.meta.env.VITE_USE_JUDGE0_FOR_S3_BUILD ?? '',
    timeout: import.meta.env.VITE_BUILD_TIMEOUT ?? '',
  },
  security: {
    encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY ?? '',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    timeout: import.meta.env.VITE_API_TIMEOUT ?? '',
  },
};

// ─── Group definitions for the UI ────────────────────────────────────────────
export const ENV_GROUPS = [
  {
    id: 'app',
    label: 'Application',
    icon: '⬡',
    color: 'info',
    vars: [
      { key: 'VITE_APP_NAME', label: 'App Name', value: config.app.name },
      { key: 'VITE_APP_VERSION', label: 'Version', value: config.app.version },
      { key: 'VITE_APP_ENV', label: 'Environment', value: config.app.env },
    ],
  },
  {
    id: 'aws',
    label: 'AWS / S3',
    icon: '☁',
    color: 'warn',
    vars: [
      { key: 'VITE_AWS_REGION', label: 'Region', value: config.aws.region },
      { key: 'VITE_S3_BUCKET_NAME', label: 'Bucket', value: config.aws.bucket },
      {
        key: 'VITE_AWS_ACCESS_KEY',
        label: 'Access Key',
        value: config.aws.accessKey,
        sensitive: true,
      },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    icon: '⚙',
    color: 'accent',
    vars: [
      {
        key: 'VITE_USE_JUDGE0_FOR_S3_BUILD',
        label: 'Use Judge0',
        value: config.build.useJudge0,
      },
      {
        key: 'VITE_BUILD_TIMEOUT',
        label: 'Timeout (s)',
        value: config.build.timeout,
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: '⚿',
    color: 'danger',
    vars: [
      {
        key: 'VITE_ENCRYPTION_KEY',
        label: 'Encryption Key',
        value: config.security.encryptionKey,
        sensitive: true,
      },
    ],
  },
  {
    id: 'api',
    label: 'API',
    icon: '⇄',
    color: 'accent',
    vars: [
      {
        key: 'VITE_API_BASE_URL',
        label: 'Base URL',
        value: config.api.baseUrl,
      },
      {
        key: 'VITE_API_TIMEOUT',
        label: 'Timeout (ms)',
        value: config.api.timeout,
      },
    ],
  },
];
