import React from 'react';
import '../styles/global.css';
import { UnfavouriteArticle } from '../functions/unFavArticle';

interface itemProps {
  articleId: number,
  publishedAt: string,
  source: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  article: any,
}

export const UserArticleItem: React.FC<itemProps> = ({ articleId, publishedAt, source, title, description, url, urlToImage, article }) => {
  // Will use local storage over useNavigate to open details within memory in a new tab, else the search restarts.
  const handleDetailsRedirect = () => {
    // Save memory
    localStorage.setItem('currentArticle', JSON.stringify(article));
    // Open in a new tab
    window.open('/article', '_blank');
  };

 
  const handleUnFavourite = async () => {
    try {
      const response = await UnfavouriteArticle(articleId);
      if (response.ok) {
        console.log(`Article with id ${articleId} was successfully unfavourited.`);
        alert('Article successfully deleted from favourite list!')
        window.location.reload(); // Reload the page to update the list
      } else {
        console.error('Failed to unfavourite the article.');
      }
    } catch (err) {
      console.error('Error unfavouriting article:', err);
    }
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
        <h3 className='date-label'>{publishedAt}</h3>
        <p className='description-label'>
          {description}
        </p>

        <div className='details-favourite'>
            {/* Article Details Module Opener */}
          <button className='btn details-btn' onClick={handleDetailsRedirect}>
            Details
          </button>
            {/* Un-Favourite Article */}
          <button className='btn favourite-btn'
          type='button' onClick={handleUnFavourite}>
            Un-Favourite
          </button>
        </div>
      </div>
    </div>
  )

}


export default UserArticleItem