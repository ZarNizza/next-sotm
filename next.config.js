/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}
const i18n = {
  locales: ['en', 'ru'],
  defaultLocale: 'en'
}

module.exports = { nextConfig, i18n }
