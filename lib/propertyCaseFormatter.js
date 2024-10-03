const renameProperties = (articles) => {
  return articles.map(article => {
    // Publishedat to PublishedAt
    if (article.hasOwnProperty('publishedat')) {
      article.publishedAt = article.publishedat; 
      delete article.publishedat;
    }

    // urltoimage to urlToImage
    if (article.hasOwnProperty('urltoimage')) {
      article.urlToImage = article.urltoimage;
      delete article.urltoimage;
    }
    return article;
  });
};


module.exports = renameProperties;