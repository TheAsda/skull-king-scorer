import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('./src/**/*.css');
  eleventyConfig.addWatchTarget('./src/**/*.css');
  eleventyConfig.addPassthroughCopy('./src/**/*.js');
  eleventyConfig.addWatchTarget('./src/**/*.js');

  //#region nunjucks templates precompilation
  eleventyConfig.on('eleventy.before', async (config) => {
    const output = execSync(
      'npx nunjucks-precompile src/templates --include "\\.njk"'
    );
    await writeFile('./src/scripts/templates.js', output);
    eleventyConfig.logger.message(
      'Templates precompiled into src/scripts/templates.js'
    );
  });
  eleventyConfig.addWatchTarget('./src/templates/*.njk');
  eleventyConfig.watchIgnores.add('./src/scripts/templates.js');
  eleventyConfig.ignores.add('./src/templates/*.njk');
  //#endregion

  eleventyConfig.addPassthroughCopy('./src/assets');

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
