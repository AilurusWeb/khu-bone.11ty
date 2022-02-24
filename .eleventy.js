module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "core",
      output: "../www"
    },
    jsDataFileSuffix: ".data"
  }
};