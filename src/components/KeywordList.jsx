import React from 'react';

const KeywordList = ({ heading, items }) => {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="text-sm font-bold text-slate-900">{heading}</h4>
      <div className="mt-3 w-8 h-1 rounded-full bg-blue-500" />
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-slate-600 transition duration-200 ease-in-out hover:text-orange-500 hover:translate-x-1 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordList;
