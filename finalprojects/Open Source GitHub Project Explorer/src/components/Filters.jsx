import React from 'react';

const Filters = ({ onSearch, onLanguageChange, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
      <input
        type="text"
        placeholder="🔍 Search Repositories..."
        className="p-2 border border-gray-300 rounded-lg w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="typescript">TypeScript</option>
      </select>
      <select
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="stars">Most Stars</option>
        <option value="updated">Recently Updated</option>
        <option value="forks">Most Forks</option>
      </select>
    </div>
  );
};

export default Filters;