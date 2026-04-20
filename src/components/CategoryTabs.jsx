import React, { useRef, useEffect } from 'react';

const CategoryTabs = ({ categories, activeCategory, onSelect }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const activeButton = containerRef.current?.querySelector('[data-active="true"]');

    // ✅ Only run scroll logic on desktop (horizontal layout)
    if (activeButton && containerRef.current && window.innerWidth >= 640) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const offset =
        buttonRect.left -
        containerRect.left -
        containerRect.width / 2 +
        buttonRect.width / 2;

      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  return (
    <div className="py-4 sm:overflow-x-auto no-scrollbar">
      {/* Mobile: vertical | Desktop: original layout */}
      <div
        ref={containerRef}
        className="flex flex-col gap-3 px-2 sm:flex-row sm:flex-wrap sm:justify-center"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <button
              key={category.slug}
              data-active={isActive}
              onClick={() => onSelect(category.slug)}
              className={`w-full text-center sm:w-auto whitespace-nowrap rounded-xl border px-5 py-3 sm:py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[rgb(242,108,30)] border-[rgb(242,108,30)] shadow-sm'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-[rgb(242,108,30)] hover:text-[rgb(242,108,30)]'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;