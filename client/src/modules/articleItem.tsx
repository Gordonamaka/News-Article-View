import React from 'react'
import '../styles/global.css'

interface itemProps {
  title: string,
  description: string,
  url: string,
  urlToImage: string
}

export const ArticleItem: React.FC<itemProps> = ({ title, description, url, urlToImage }) => {


  return (
    <div className='article-app'>
      <div className='article-item'>
        <img className='article-img' src={urlToImage} alt=''/>
        <h3>
          <a href={url}>
            {title}
          </a>
        </h3>
        <p>
          {description}
        </p>
      </div>
    </div>
  )

}


export default ArticleItem