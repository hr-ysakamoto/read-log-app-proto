module.exports = {
  /**
   * Strict モードにしていると開発では2回呼ばれる
   * @see: https://zenn.dev/takeharu/scraps/d14cf9d4239ec4
   */
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: ["@repo/models"],
  env: {
    API_URL: "http://localhost:8000",
  },
};
