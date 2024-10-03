import React, { useState } from 'react';
import ArticleItem from './articleItem';
import SearchInput from './articleSearch';
import LoginForm from './login';
import RegisterForm from './register';
import { SearchArticles } from '../functions/searchArticles';
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

interface UserType {
  first_name: string;
  last_name: string;
}

const ArticleList: React.FC = () => {
  // Refactor: Construct all states as a single object, then deconstruct.
  const [articleData, setArticleData] = useState<ArticleType[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSymbol, setCurrentSymbol] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null); 
  const [loginStatus, setLoginStatus] = useState<boolean>(false); 

  const handleSearch = async (symbol: string) => {
    // Clear articleData before fetching new articles
    setArticleData([]);
    const articles = await SearchArticles(symbol, 1);
    setCurrentSymbol(articles[0]); // Retain the current Symbol sent to API
    setCurrentPage(articles[1]); // Set the page that is returned by POST
    setTotalResults(articles[2]); // Set the total number of articles by keyword
    setArticleData(articles[3]); // Set the fetched articles in the state
  };

  const handlePagination = async (newPage: number) => {
    const nextArticles = await SearchArticles(currentSymbol, newPage);
    setCurrentSymbol(nextArticles[0]);
    setCurrentPage(nextArticles[1]);
    setTotalResults(nextArticles[2]);
    setArticleData(nextArticles[3]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (email: string, password: string) => {
    const userData = await LoginUser(email, password);
    setUser(userData);
    setLoginStatus(true);
  };

  return (
    <div className='article-page'>
      <h1 id='page-title'> News App</h1>
      <div className='nav'>
        <SearchInput onSearch={handleSearch} loggedIn={loginStatus}/>
        
        {!user ? (
          <div>
            <RegisterForm onRegister={RegisterUser}/>
            <LoginForm onLogin={handleLogin}/>
          </div>
        ) : (
          <div className='user'>
            <p><b>Welcome, {user.first_name} {user.last_name}!</b></p>
            <a id='favourite-page-btn' href='/favourites' target='_blank' rel='noreferrer' className='btn'>
              Favourites
            </a>
          </div>
        )}
        
        {currentSymbol.length > 0 && <h1 id="query">Showing {totalResults} Results for: {currentSymbol}</h1>}
      </div>

      {/* Conditional Rendering for Animation Effect & Loading Phase */}
      {articleData.length > 0 ? (
        <div >
          <div className='article-container'>
            {articleData.map((article) => (
              <ArticleItem
                key={article.url}
                source={article.source.name}
                date={article.publishedAt}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                article={article} // For Article Detail Viewing
              />
            ))}
          </div>
          <PaginationElement totalResults={totalResults} currentPage={currentPage} onPageChange={handlePagination}/>
        </div>
      ) : (
        <div>
          {!user ? 
            <h1>Must be registered & logged in before searching for articles.</h1> 
            : 
            <h1>Waiting for user to search for Articles...</h1>
          }
        </div>
      )}
    </div>
  );
};

export default ArticleList