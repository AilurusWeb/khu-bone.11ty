const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./styles/");

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  
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

  return {
    dir: {
      input: "core",
      output: "../www"
    },
    jsDataFileSuffix: ".data"
  }
};