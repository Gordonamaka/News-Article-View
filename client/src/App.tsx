import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [serverdata, setServerData] = useState<any>()
  
  useEffect(() => {
    fetch("/news").then(
      response => response.json()
    ).then(
      data => {
        setServerData(data)
      } 
    )
  }, [])

  return (
    <div>
      
    {(typeof serverdata === 'undefined') ? (
      <p>Loading...</p>
    ) : (
      serverdata.map((article: any, i: any) => (
        <p key={i}>{article}</p>
      ))
    )}
    
    </div>
  );
};

export default App;
