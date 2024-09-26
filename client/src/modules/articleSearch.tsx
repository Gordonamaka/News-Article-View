import React, {useState} from "react";


interface SearchProps {
  value: string;
  ariaLabel: string;
  // onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({ value }) => {
  
  const [symbol, setSymbol] = useState<any>('')


  async function postSymbol(e:any) {
    // Remove this to Refresh the page
    e.preventDefault()
    if (symbol === '') { return console.log('Empty Prompt')}
    
    
    const response = await fetch('/news', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        symbol: symbol
      })
    });
    if (!response.ok) {
      throw new Error (`Response status: ${response.status}`)
    };
  }
  
  return (
    <div>
      <form onSubmit={postSymbol}>
        <input
          id="SearchInput" 
          type="text"
          name="Search"
          aria-label="Search"
          placeholder="Search article Keyword here"
          value={symbol}
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