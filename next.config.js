const path = require("path")
const { i18n } = require("./next-i18next.config")

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    domains: ["assets.vercel.com", "api.dev.hustlefree.pro", "unsplash.com"],
    formats: ["image/avif", "image/webp"],
  },
  i18n,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  loader: "babel-loader",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
}
