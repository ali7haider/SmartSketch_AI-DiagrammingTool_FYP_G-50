"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBox: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText.trim()) {
      // Trigger search functionality (to be implemented)
      console.log("Search:", searchText);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Search shapes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-8 pl-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:border-gray-400"
      />
      <span
        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
        onClick={searchText ? handleClearSearch : undefined} // Clear input when cross is clicked
      >
        <FontAwesomeIcon
          icon={searchText ? faTimes : faSearch}
          className={`text-gray-400 h-4 w-4 ${
            searchText ? "hover:text-red-500" : "hover:text-teal-500"
          }`}
        />
      </span>
    </div>
  );
};

export default SearchBox;
