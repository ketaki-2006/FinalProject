import React from 'react';

const BookmarkPanel = ({ bookmarks, updateNote }) => {
  const bookmarkedList = Object.values(bookmarks);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">📌 Bookmarked Repositories</h2>
      {bookmarkedList.length === 0 ? (
        <p className="text-gray-600">No bookmarks yet.</p>
      ) : (
        <div className="space-y-4">
          {bookmarkedList.map(repo => (
            <div key={repo.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-blue-700">{repo.full_name}</h3>
              <textarea
                className="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="📝 Add notes..."
                value={repo.notes}
                onChange={(e) => updateNote(repo.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPanel;