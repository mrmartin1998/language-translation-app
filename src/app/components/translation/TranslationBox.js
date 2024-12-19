'use client';

import { useState, useRef, useEffect } from 'react';

export default function TranslationBox({ 
  value, 
  onChange, 
  placeholder,
  direction = 'source' // 'source' or 'target'
}) {
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);

  // Auto-resize logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e) => {
    const text = e.target.value;
    setCharCount(text.length);
    onChange(text);
  };

  const handleClear = () => {
    onChange('');
    setCharCount(0);
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="textarea textarea-bordered w-full min-h-[8rem] resize-none"
        disabled={direction === 'target'}
      />
      
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="text-gray-500">
          {charCount} characters
        </span>
        {direction === 'source' && (
          <button 
            onClick={handleClear}
            className="btn btn-ghost btn-xs"
            disabled={!value}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
} 