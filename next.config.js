const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const nextConfig = {
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};

module.exports = withPlugins(
  [
    [sass],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html"
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "./bundles/client.html"
          }
        }
      }
    ]
  ],
  nextConfig
);
