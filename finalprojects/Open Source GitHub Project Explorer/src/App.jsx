import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './components/Filters';
import RepoCard from './components/RepoCard';
import ChartPanel from './components/ChartPanel';
import BookmarkPanel from './components/BookmarkPanel';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('bookmarks')) || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('stars');

  const fetchRepos = async () => {
    const response = await axios.get(`https://api.github.com/search/repositories`, {
      params: {
        q: `stars:>1000${language ? ' language:' + language : ''} ${searchQuery}`,
        sort,
        order: 'desc',
        per_page: 30,
      },
    });
    setRepos(response.data.items);
    setFilteredRepos(response.data.items);
  };

  useEffect(() => {
    fetchRepos();
  }, [language, sort, searchQuery]);

  const toggleBookmark = (repo) => {
    const updated = { ...bookmarks };
    if (updated[repo.id]) delete updated[repo.id];
    else updated[repo.id] = { ...repo, notes: '' };
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const updateNote = (id, note) => {
    const updated = { ...bookmarks };
    updated[id].notes = note;
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-6">🚀 GitHub Project Explorer</h1>
      <Filters
        onSearch={setSearchQuery}
        onLanguageChange={setLanguage}
        onSortChange={setSort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredRepos.map(repo => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isBookmarked={!!bookmarks[repo.id]}
            toggleBookmark={() => toggleBookmark(repo)}
          />
        ))}
      </div>
      <ChartPanel repos={filteredRepos} />
      <BookmarkPanel bookmarks={bookmarks} updateNote={updateNote} />
    </div>
  );
};

export default App;