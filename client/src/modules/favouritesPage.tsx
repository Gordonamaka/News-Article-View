import React, {useState, useEffect} from 'react'
import UserArticleItem from './userArticleItem';
import { FetchFavourites } from '../functions/fetchFavourites';
import '../styles/global.css'

interface ArticleType {
  id: number;
  source: string;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}


const FavouritesPage: React.FC = () => {
  const [articleData, setArticleData] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the user's favorite articles when the component mounts
  useEffect(() => {
    FetchFavourites().then((content) => {
      setArticleData(content);
      console.log(content);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  
  return (
    <div>
      {loading ? (
        <p>Loading favorites...</p>
      ) : articleData.length > 0 ? (
        <div className='article-container'>
          {articleData.map((article) => (
            <UserArticleItem
              key={article.id}
              articleId={article.id}
              source={article.source}
              publishedAt={article.publishedAt}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              article={article}
            />
          ))}
        </div>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default FavouritesPage;

