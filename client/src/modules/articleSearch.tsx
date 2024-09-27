import React, {useState} from "react";


interface SearchInputProps {
  onSearch: (symbol: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [symbol, setSymbol] = useState<string>('');

  const postSymbol = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol === '') {
      return console.log('Empty Prompt');
    }

    onSearch(symbol);
  };
  
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