'use client';

import { useState, useEffect } from 'react';
import { getHistory, clearHistory, deleteTranslation, toggleFavorite } from '@/app/lib/utils/localStorage';

export default function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Load history on component mount
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDelete = (id) => {
    deleteTranslation(id);
    setHistory(getHistory());
  };

  const handleToggleFavorite = (id) => {
    toggleFavorite(id);
    setHistory(getHistory());
  };

  // Filter history based on search query
  const filteredHistory = history.filter(item =>
    item.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const currentItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Translation History</h2>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={handleClearHistory}
          >
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

        <div className="space-y-4">
          {currentItems.map((item) => (
            <div key={item.id} className="bg-base-100 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.sourceText}</p>
                  <p className="text-base-content/70">{item.translatedText}</p>
                  <p className="text-sm text-base-content/50 mt-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className={`btn btn-ghost btn-sm ${item.isFavorite ? 'text-warning' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 