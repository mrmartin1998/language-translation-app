'use client';

export default function HistoryItem({
  item,
  onFavorite,
  onDelete
}) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-neutral">
                {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
              </span>
              <span className="text-xs text-base-content/60">
                {formatDate(item.timestamp)}
              </span>
            </div>
            
            <div className="grid gap-2">
              <p className="text-sm whitespace-pre-wrap">{item.sourceText}</p>
              <div className="divider my-0"></div>
              <p className="text-sm whitespace-pre-wrap">{item.translatedText}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onFavorite(item.id)}
              className={`btn btn-ghost btn-xs ${item.isFavorite ? 'text-warning' : ''}`}
              title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={item.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </button>

            <button
              onClick={() => onDelete(item.id)}
              className="btn btn-ghost btn-xs text-error"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 