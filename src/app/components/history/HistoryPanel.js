'use client';

import { useState } from 'react';

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

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Original</th>
                <th>Translation</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id}>
                  <td className="max-w-xs truncate">{item.sourceText}</td>
                  <td className="max-w-xs truncate">{item.translatedText}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-xs text-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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