-- Drop & Create Article Favourite ref to User Table

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  source VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  urlToImage VARCHAR(255) NOT NULL
);
