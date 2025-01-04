export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('./src/**/*.css');
  eleventyConfig.addWatchTarget('./src/**/*.css');
  eleventyConfig.addPassthroughCopy('./src/**/*.js');
  eleventyConfig.addWatchTarget('./src/**/*.js');
  eleventyConfig.addPassthroughCopy('./src/templates/*.njk');
  eleventyConfig.addWatchTarget('./src/templates/*.njk');
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
