const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
    // Pass through
    eleventyConfig.addPassthroughCopy('assets');

    // Collections
    eleventyConfig.addCollection('items', collection => {
        return collection.getFilteredByGlob('items/*.md');
    });

    // Minify
    eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
        if (outputPath.indexOf('.html') > -1) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            });
            return minified;
        }
        return content;
    });

    // Return config settings
    return {
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    };
};
