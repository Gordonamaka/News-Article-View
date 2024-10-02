import React from 'react';
import axios from 'axios';
import { Readability } from '@mozilla/readability';

const ArticleDetail: React.FC = () => {
  const article = JSON.parse(localStorage.getItem('currentArticle') || 'null');

  console.log(article);
  if (!article) {
    return <p>Article not found. Please go back and select an article.</p>;
  }

  // Request for Full Content of Article Details
  // CAN'T USE IN REACT, NEED TO FIND ANOTHER LIBRARY OR MAKE A REQUEST TO SERVER...
  // const response2 = axios.get(article.url);
  // console.log("Response2", response2);
  
  // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
  // let dom = new JSDOM(response2.data, {
  //   url: mockData.url
  // });

  // now pass the DOM document into readability to parse
  // let content = new Readability(dom.window.document).parse();

  // Done! The article content is in the textContent property
  // console.log(content.textContent);


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
        {article.content}
      </p>
    </div>
  );
};

export default ArticleDetail;
