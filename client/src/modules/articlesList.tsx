import React, { useState, useEffect } from 'react';
import ArticleItem from './articleItem';



const ArticleList = () => {
  const [articleData, setArticleData] = useState<any>([])
  
  useEffect(() => {

    const fetchArticles = async () => {
      
      try {
        const response = await fetch("/news");
        if (!response.ok) {
          throw new Error (`Response status: ${response.status}`)
        }
  
        const articles = await response.json();
        console.log(articles);
        setArticleData(articles)
      } catch (error) {
        // let errorMessage = "Fetch Request Failed."
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    // Change to make a POST for symbol change
    fetchArticles();
  }, [])

  return (
    <div>
      {articleData.map((article: any) => {
        return (
          <ArticleItem
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
          />
        )
      })}
    </div>
  );
}

export default ArticleList