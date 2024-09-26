-- Drop & Create Users Table

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  source_name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  urlToImage VARCHAR(255) NOT NULL,
  published_at DATE NOT NULL,
  content TEXT NOT NULL
);
