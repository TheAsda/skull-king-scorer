import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import Image from '@11ty/eleventy-img';

await Image('./favicon-inkscape.svg', {
  widths: [32, 128, 192, 256, 512],
  outputDir: 'src/assets/generated',
  formats: ['png'],
  useCache: false,
  filenameFormat: (id, src, width, format) => `icon-${width}.${format}`,
});
await Image('./favicon-inkscape.svg', {
  widths: [32, 128, 192, 256, 512],
  outputDir: 'src/assets/generated',
  formats: ['png'],
  formatHooks: {
    png(sharp) {
      const roundedCorners = Buffer.from(
        `<svg width="${this.width}" height="${this.width}">
        <circle cx="${this.width / 2}" cy="${this.width / 2}" r="${
          this.width / 2
        }" fill="white" />
      </svg>`
      );
      return sharp.composite([
        { input: roundedCorners, top: 0, left: 0, blend: 'dest-in' },
      ]);
    },
  },
  useCache: false,
  filenameFormat: (id, src, width, format) => `icon-rounded-${width}.${format}`,
});

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

  eleventyConfig.addPassthroughCopy('./src/assets/**/*.png');
  eleventyConfig.addWatchTarget('./src/assets');

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
