const moment = require('moment');
moment.locale('en');

let extractExcerpt = (article) => {
  if (!article.hasOwnProperty('templateContent')) {
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  const seperatorsList = [
    {start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->'},
    {start: '<p>', end: '</p>'}
  ];

  seperatorsList.some(seperators => {
    const startPosition = content.indexOf(seperators.start);
    const endPosition = content.indexOf(seperators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition+seperators.start.length, endPosition).trim();
      return true;
    }
  });

  return excerpt;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  })

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('DD/MM/YYYY HH:mm');
  })

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      output: "docs"
    }
  }
};