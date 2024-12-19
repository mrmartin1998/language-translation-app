'use client';

import { useState } from 'react';
import HistoryItem from './HistoryItem';

export default function HistoryPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - will be replaced with actual localStorage data
  const mockHistory = [
    {
      id: '1',
      sourceText: 'Hello world',
      translatedText: '안녕하세요 세계',
      sourceLang: 'en',
      targetLang: 'ko',
      timestamp: new Date().toISOString(),
      isFavorite: false
    },
    // ... more items
  ];

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Translation History</h2>
          <button className="btn btn-ghost btn-sm">
            Clear History
          </button>
        </div>

        <div className="form-control mb-4">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search translations..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {mockHistory.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onFavorite={(id) => console.log('Toggle favorite:', id)}
              onDelete={(id) => console.log('Delete item:', id)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button 
            className="btn btn-ghost btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="flex items-center px-4">
            Page {currentPage}
          </span>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 