import React, { useState } from 'react';
import ArticleItem from './articleItem';
import SearchInput from './articleSearch';
import LoginForm from './login';
import RegisterForm from './register';
import { FetchArticles } from '../functions/fetchArticles';
import { LoginUser } from '../functions/loginUser';
import { RegisterUser } from '../functions/registerUser';
import PaginationElement from './pagination';
import '../styles/articleSection.css'

interface ArticleType {
  source: { name: string };
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const ArticleList: React.FC = () => {
  // Refactor: Construct all states as a single object, then deconstruct when used.
  const [articleData, setArticleData] = useState<ArticleType[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSymbol, setCurrentSymbol] = useState<string>(''); 

  const handleFetchArticles = async (symbol: string) => {
    // Clear articleData before fetching new articles
    setArticleData([]);

    const articles = await FetchArticles(symbol, 1);
    setCurrentSymbol(articles[0]); // Retain the current Symbol sent to API
    setCurrentPage(articles[1]); // Set the page that is returned by POST
    setTotalResults(articles[2]); // Set the total number of articles by keyword
    setArticleData(articles[3]); // Set the fetched articles in the state
  };

  const handlePagination = async (newPage: number) => {
    
    const nextArticles = await FetchArticles(currentSymbol, newPage);
    setCurrentSymbol(nextArticles[0]); // Retain the current Symbol sent to API
    setCurrentPage(nextArticles[1]); // Set the page that is returned by POST
    setTotalResults(nextArticles[2]); // Set the total number of articles by keyword
    setArticleData(nextArticles[3]); // Set the fetched articles in the state
  };

  return (
    <div className='article-page'>
      <h1 id='page-title'> News App</h1>
      <div className='nav'>
      <SearchInput onSearch={handleFetchArticles} />
      <RegisterForm onRegister={RegisterUser}/>
      <LoginForm onLogin={LoginUser}/>
      {currentSymbol.length > 0 && <h1 id="query">Showing {totalResults} Results for: {currentSymbol}</h1>}
      </div>

      {/* Conditional Rendering for Animation Effect */}
      {articleData.length > 0 ? (
        <div >
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
          <PaginationElement totalResults={totalResults} currentPage={currentPage} onPageChange={handlePagination}/>
        </div>
      ) : (
        <div>
          <h1>Waiting for user to search for Articles...</h1>
        </div>
      )}
    </div>
  );
};

export default ArticleList