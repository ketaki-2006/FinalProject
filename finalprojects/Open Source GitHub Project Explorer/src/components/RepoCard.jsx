import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const RepoCard = ({ repo, isBookmarked, toggleBookmark }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-blue-700 truncate">{repo.full_name}</h2>
        <p className="text-gray-600 mt-2 line-clamp-3">{repo.description}</p>
        <div className="flex flex-wrap text-sm text-gray-500 mt-2 gap-2">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
          <span>🛠 {repo.language}</span>
          <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
      <button
        onClick={toggleBookmark}
        className="self-end mt-4 text-blue-600 hover:text-blue-800"
        title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
      >
        {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      </button>
    </div>
  );
};

export default RepoCard;