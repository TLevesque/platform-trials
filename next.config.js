const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const images = require("next-images");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const {
  WebpackBundleSizeAnalyzerPlugin
} = require("webpack-bundle-size-analyzer");
const { ANALYZE } = process.env;
const withTM = require("next-plugin-transpile-modules");

const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === "development"
    ? {}
    : require("next-server/constants");

// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_PRODUCTION_SERVER) {
//     // Config used to run in production.
//     return {};
//   }

//   const withCSS = require("@zeit/next-css");

//   return withCSS();
// };

const nextConfig = {
  webpack: (phase, { config }) => {
    if (phase === PHASE_PRODUCTION_SERVER) {
      config.plugins = config.plugins || [];
      config.plugins = [
        ...config.plugins,
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];
      if (ANALYZE) {
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin("stats.txt"));
      }
      config.externals = Array.isArray(config.externals)
        ? config.externals.map(fn =>
            typeof fn === "function"
              ? (context, request, callback) => {
                  if (request === "lodash-es") {
                    return callback(null, "commonjs lodash");
                  }
                  return fn(context, request, callback);
                }
              : fn
          )
        : config.externals;
      return config;
    }
  }
};

module.exports = withPlugins(
  [
    [sass],
    [images],
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
    ],
    [
      withTM,
      {
        transpileModules: ["lodash-es"]
      }
    ]
  ],
  nextConfig
);
