import React from 'react';

const BotAvatar = () => {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#005F73] to-[#376B7E] flex items-center justify-center shadow-lg">
      <svg 
        className="w-5 h-5 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
        />
      </svg>
    </div>
  );
};

export { BotAvatar };
export default BotAvatar;
