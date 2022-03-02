const now = String(Date.now());
const CleanCSS = require("clean-css");
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const Image = require("@11ty/eleventy-img");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const root = './core/';

async function imageShortcode(src, alt, cls) {
  cls = cls || '';

  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [600],
    formats: ["jpeg"]
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img class="${cls}" src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

module.exports = function (eleventyConfig) {

  // Plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Layout
  eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');

  // Markdown Data
  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true, excerpt_alias: 'excerpt' });
  eleventyConfig.setFrontMatterParsingOptions({ cover: true });

  // Create Collections
  eleventyConfig.addCollection("plays", function(collectionApi) {
      return collectionApi.getFilteredByGlob(root + "plays/*.md");
  });

  // ShortCode Liquid
  eleventyConfig.addPairedShortcode("play_intro", function(game) {
    let html = `
      <div class="c-play-intro">
        <div>
            <article>
                <header>
                    <a href="{{game.page}}" title="">{{game.title}}</a> est jeu créé par <a href="{{game.profile}}" title="">{{game.creator}}</a>, disponible sur <a href="{{game.page}}" title="Lien vers la page itch.io de 10-min To Be a Dream Thief">itch.io</a>
                </header>
                <hr class="border-gray-300">
                <div class="main">
                    <b>10-min To Be a Dream Thief</b>, est un jeu de rôle qui se joue en <b>10 minutes</b> montre en main. On y incarne un <b>voleur•se onirique</b> avec de redoutables <b>pouvoirs psychiques</b>. Fan de Inception et aimant beaucoup l'univers des jeux Persona, je me devais de tester ce jeu. Et j'ai bien fait car je me suis régalée à vivre cette histoire, si courte sur le papier et dans le temps mais pourtant si riche dans ma tête.
                </div>
            </article>
        </div>
      </div>
    `
  });

  // Custom helpers
  eleventyConfig.addFilter("uniq_slug", function(array) {
    return array.filter((v,i,a)=>a.findIndex(t=>(t.slug===v.slug))===i)
  });

  // Links
  eleventyConfig.addPlugin(safeLinks);

  eleventyConfig.addFilter("currentPage", function(itemUrl, pageUrl) {
    return (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0);
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

  // Images
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ "./img": "../www/img" });

  // Styles
  eleventyConfig.addWatchTarget("./core/styles/default.css");

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