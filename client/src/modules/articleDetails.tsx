import React from 'react';
import { useLocation } from 'react-router-dom';

const ArticleDetail: React.FC = () => {
  const location = useLocation();

  // Access the article data from location.state
  const article = location.state?.article;

  if (!article) {
    return <p>Article not found. Please go back and select an article.</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.description}</p>
      <p>{article.source.name}</p>
      <p>{article.publishedAt}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
    </div>
  );
};

export default ArticleDetail;
