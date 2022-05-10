const path = require("path")
const { i18n } = require("./next-i18next.config")

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    domains: [
      "assets.vercel.com",
      "api.dev.hustlefree.pro",
      "unsplash.com",
      "api.dev.main.jva.vc",
    ],
    formats: ["image/avif", "image/webp"],
  },
  i18n,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  loader: "babel-loader",
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.pdf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      }
    )
    return config
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}
