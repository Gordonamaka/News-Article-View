import React, {useState} from "react";


interface SearchProps {
  value: string;
  ariaLabel: string;
  // onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({ value }) => {
  
  const [symbol, setSymbol] = useState<any>('')

  const postBtn = document.getElementById('postBtn');
  postBtn?.addEventListener('click', postInfo)

  async function postInfo(e:any) {
    // Remove this to Refresh the page
    e.preventDefault()
    // Replace with try catch
    // Does not add to symbol...
    if (symbol === '') { return console.log('Empty Prompt')}
    
    
    const response = await fetch('/news', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        symbol: symbol
      })
    })
    if (!response.ok) {
      throw new Error (`Response status: ${response.status}`)
    }
  }

  const handleSubmit = (e:any) => {
    // Remove this to refresh the page
    e.preventDefault();
    console.log(`Submitted to server, ${symbol}`)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="SearchInput" 
          type="text"
          name="Search"
          aria-label="Search"
          placeholder="Search article Keyword here"
          value={value}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button id="postBtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput