import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') : 'al-anad';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? `/${repo}` : '',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
