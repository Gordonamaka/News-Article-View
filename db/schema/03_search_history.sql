-- Drop & Create Users Table

DROP TABLE IF EXISTS search_history CASCADE;
CREATE TABLE search_history (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  symbol VARCHAR(255) NOT NULL,
  search_date timestamp default current_timestamp
);
