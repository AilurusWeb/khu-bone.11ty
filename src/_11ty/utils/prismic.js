const { definePrismicPluginOptions } = require("eleventy-plugin-prismic");

const prismicOptions = definePrismicPluginOptions({
    endpoint: "https://khu-bone.prismic.io/api/v2",
});

exports.prismicOptions = prismicOptions;

