import React, {useState, useEffect} from 'react';
import { FetchContent } from '../functions/fetchContent';
import '../styles/articleDetails.css'


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
    <div id='details-page'>
      <a href='/' className='return-link'>
        {'< Return'}
      </a>
      <article className='container'>
        <p id='details-source'>
          <a id='source-url' href={article.url}>
          Source: {article.source.name}
          </a>
        </p>
        
        <h1 id="details-title">
          {article.title}
        </h1>

        <h2 id='details-desc'>
          {article.description}
        </h2>

        <p className='date-author'>
          By: {article.author} | Date: {article.publishedAt}
        </p>

        <img id="details-img" 
        src={article.urlToImage} 
        alt={''} 
        />

        <a id='details-url' 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer">
          Read Original Full Article Here
        </a>
        
        <p id='details-content'>
          {articleContent}
        </p>
      </article>
    </div>
  );
};

export default ArticleDetail;
