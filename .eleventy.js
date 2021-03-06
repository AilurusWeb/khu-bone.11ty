const now = String(Date.now());

// TOML - data format
const toml = require("toml");

// utils
const { isCurrentPage, linkActived } = require("./src/_11ty/utils/page");

// Prismic
const { pluginPrismic } = require("eleventy-plugin-prismic");
const { prismicOptions } = require("./src/_11ty/utils/prismic");

// Tags
const { in_uids } = require("./src/_11ty/tags/in_uids");

module.exports = function (eleventyConfig) {
    // Layouts
    eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');

    // TOML
    eleventyConfig.addDataExtension("toml", contents => toml.parse(contents));

    // Utils
    eleventyConfig.addFilter("isCurrentPage", isCurrentPage);
    eleventyConfig.addFilter("linkActived", linkActived);

    // Prismic Api
    eleventyConfig.addPlugin(pluginPrismic, prismicOptions);

    // Filters
    eleventyConfig.addLiquidFilter("in_uids", (arr, uids) => in_uids(arr, uids));

    // Files Copy
    eleventyConfig.addPassthroughCopy('src/img');

    eleventyConfig.setQuietMode(true);
    return {
        templateFormats: ["html", "liquid"],
        dir: { input: "src", output: "_site" },
        jsDataFileSuffix: ".data"
    }
};