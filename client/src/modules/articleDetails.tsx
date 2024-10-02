import React, {useState, useEffect} from 'react';
import { FetchContent } from '../functions/fetchContent';


const ArticleDetail: React.FC = () => {
  const article = JSON.parse(localStorage.getItem('currentArticle') || 'null');
  const [articleContent, setArticleContent] = useState<string | null>(null);

  // Fetch Full article content as per API docs
  useEffect(() => {
    if (article.url) {
      FetchContent(article).then((content) => {
        setArticleContent(content);
      });
    }
  }, [article]);

  if (!article) {
    return <p>Article not found. Please go back and select an article.</p>;
  }

  return (
    <div>
      <h1>
        {article.title}
      </h1>
      <img 
      src={article.urlToImage} 
      alt={article.title} 
      />
      <p>
        {article.source.name}
      </p>
      <p>
        {article.publishedAt}
        </p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read full article
      </a>
      <p>
        {article.description}
      </p>
      <p>
        {articleContent}
      </p>
    </div>
  );
};

export default ArticleDetail;
