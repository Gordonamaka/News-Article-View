import React, { useState } from 'react';
import ArticleItem from './articleItem';
import SearchInput from './articleSearch';



const ArticleList: React.FC = () => {
  const [articleData, setArticleData] = useState<any[]>([]);

  const fetchArticles = async (symbol: string) => {
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
  // Filter Articles
  // const interval     = Object.keys(tsData)[1];
  // const intervalData = Object.entries(tsData[interval]);
  // Filter Date Format

  return (
    <div>
      <SearchInput onSearch={fetchArticles} />
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
  );
};

export default ArticleList