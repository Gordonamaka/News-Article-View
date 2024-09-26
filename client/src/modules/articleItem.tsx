import React from 'react'
import '../styles/global.css'

interface itemProps {
  date: string,
  source: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string
}

export const ArticleItem: React.FC<itemProps> = ({ date, source, title, description, url, urlToImage }) => {


  return (
    <div className='article-app'>
      <div className='article-item'>
        <img className='article-img' src={urlToImage} alt=''/>
        <h1>
          <a href={url}>
            {title}
          </a>
        </h1>
        <h2>{source}</h2>
        <h3>{date}</h3>
        <p>
          {description}
        </p>
      </div>
    </div>
  )

}


export default ArticleItem