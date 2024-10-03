import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './modules/articlesList'; // Ensure this path is correct
import ArticleDetail from './modules/articleDetails';
import FavouritesPage from './modules/favouritesPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article" element={<ArticleDetail />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
