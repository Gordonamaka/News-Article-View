import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

interface itemProps {
  date: string,
  source: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  article: any,
}

export const ArticleItem: React.FC<itemProps> = ({ date, source, title, description, url, urlToImage, article }) => {

  const navigate = useNavigate();

  const handleDetailsRedirect = () => {
    navigate(`/article`, { 
      state: { article }, 
    });
  };

  return (
    <div className='article-app'>
      <div className='article-item'>
        <img className='article-img' src={urlToImage} alt=''/>
        <h1 className='title-url'>
          <a href={url} target='_blank' rel='noreferrer'>
            {title}
          </a>
        </h1>
        <h2 className='source-label'>{source}</h2>
        <h3 className='date-label'>{date}</h3>
        <p className='description-label'>
          {description}
        </p>

        <div className='details-favourite'>
            {/* Article Details Module Opener */}
          <button className='btn details-btn' onClick={handleDetailsRedirect}>
            Details
          </button>
            {/* Favourite Article */}
          <button className='btn favourite-btn'
          type='submit'>
            Favourite
          </button>
        </div>
      </div>
    </div>
  )

}


export default ArticleItem