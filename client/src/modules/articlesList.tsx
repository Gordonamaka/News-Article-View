import React, { useState } from 'react';
import ArticleItem from './articleItem';
import SearchInput from './articleSearch';
import '../styles/articleSection.css'



const ArticleList: React.FC = () => {
  const [articleData, setArticleData] = useState<any[]>([]);

  const fetchArticles = async (symbol: string) => {
    
    // Clear ArticleData before Fetching new Articles - May remove for Pagination
    setArticleData([]);
    
    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const articles = await response.json();
      console.log(articles);
      setArticleData(articles);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  // Change to make a POST for symbol change
  

  return (
    <div className='article-page'>
      <SearchInput onSearch={fetchArticles} />

      {/* Conditional Rendering for Animation Effect */}
      {articleData.length > 0 ? (
        <div className='article-container'>
          {articleData.map((article: any) => (
            <ArticleItem
              key={article.url} // Use a unique key
              source={article.source.name}
              date={article.publishedAt}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
            />
          ))}
        </div>
      ) : (
        <div>
          ...
        </div>
      )}
    </div>
  );
};

export default ArticleList