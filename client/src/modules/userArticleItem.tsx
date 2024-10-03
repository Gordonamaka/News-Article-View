import React, {useState} from 'react';
import { AddArticles } from '../functions/favArticle';
import '../styles/global.css';

interface itemProps {
  publishedAt: string,
  source: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  article: any,
}

export const UserArticleItem: React.FC<itemProps> = ({ publishedAt, source, title, description, url, urlToImage, article }) => {

  const [favourite, setFavourite] = useState<any>([]);

  // Will use local storage over useNavigate to open details within memory in a new tab, else the search restarts.
  const handleDetailsRedirect = () => {
    // Save memory
    localStorage.setItem('currentArticle', JSON.stringify(article));
    // Open in a new tab
    window.open('/article', '_blank');
  };

 
  const handleFavourite = async () => {
    const addToFav = await AddArticles(article.publishedAt, article.source, article.author, article.title, article.description, article.url, article.urlToImage);
    // May cause errors, requires refactor.
    setFavourite(addToFav)
  }

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
        <h3 className='date-label'>{publishedAt}</h3>
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
          type='button' onClick={handleFavourite}>
            Un-Favourite
          </button>
        </div>
      </div>
    </div>
  )

}


export default UserArticleItem