import React, { useState, useEffect } from 'react';
import { SearchInput } from './modules/articleSearch';
import ArticleList from './modules/articlesList';
import './styles/global.css';

function App() {
  
  return (
    <div>
      <ArticleList/>
    </div>
  );
};

export default App;
