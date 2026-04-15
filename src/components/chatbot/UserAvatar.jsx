import React from 'react';

const UserAvatar = () => {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E65A1F] to-[#ff7b3d] flex items-center justify-center shadow-lg">
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    </div>
  );
};

export { UserAvatar };
export default UserAvatar;
