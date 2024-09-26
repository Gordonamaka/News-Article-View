import React from "react";


interface SearchProps {
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}



export const SearchInput: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <input
      id="SearchInput" 
      type="text"
      name="Search"
      aria-label="Search"
      placeholder="Search a name here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      />
  );
};