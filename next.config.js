const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets.vercel.com',
      'api.dev.hustlefree.pro',
      'unsplash.com',
      'api.dev.main.jva.vc',
      '62.84.118.185:8000',
    ],
  },
  i18n,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}
