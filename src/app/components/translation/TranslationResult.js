'use client';

export default function TranslationResult({
  text,
  loading,
  onFavorite,
  isFavorite = false
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative bg-base-100 rounded-lg p-4 min-h-[8rem]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleCopy}
          className="btn btn-ghost btn-sm"
          disabled={!text || loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>

        <button
          onClick={onFavorite}
          className={`btn btn-ghost btn-sm ${isFavorite ? 'text-warning' : ''}`}
          disabled={!text || loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
      </div>
    </div>
  );
} 