const CleanCSS = require("clean-css");
const safeLinks = require('@sardine/eleventy-plugin-external-links');

const root = './core/';

module.exports = function (eleventyConfig) {

  // Layout
  eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');

  // Create Collections
  eleventyConfig.addCollection("plays", function(collectionApi) {
      return collectionApi.getFilteredByGlob(root + "plays/*.md");
  });

  // Links
  eleventyConfig.addPlugin(safeLinks);

  eleventyConfig.addFilter("linkActive", function(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response += ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  });

  // Styles
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./styles/");

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Run
  return {
    dir: {
      input: "core",
      output: "../www"
    },
    jsDataFileSuffix: ".data"
  }
};