import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CaseStudySection = ({
  title,
  highlightText,
  cards,
  onCardClick,
  className = '',
}) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleSlide = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'next' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (card) => {
    if (onCardClick) {
      onCardClick(card);
    } else if (card.id) {
      navigate(`/case-study/${card.id}`);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 overflow-hidden ${className}`}>
      <div className="relative">
        {/* Title with Curved Background Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left max-w-[500px]">
            {title}{" "}
            <span className="text-[#FF6B2C]">{highlightText}</span>
          </h2>
          <div className="flex gap-3 relative">
            <div className="absolute inset-0 bg-[#FFF8E7] -skew-x-12 rounded-full w-[100px] sm:w-[120px] h-full -z-10"></div>
            <button
              className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-[#FFC107] text-white shadow-md hover:bg-[#FFB300] active:bg-[#FFA000] transition-colors"
              onClick={() => handleSlide("prev")}
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <button
              className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-[#FFC107] text-white shadow-md hover:bg-[#FFB300] active:bg-[#FFA000] transition-colors"
              onClick={() => handleSlide("next")}
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Cards Container with Scrollable Overflow */}
        <div
          ref={carouselRef}
          className="flex gap-3 sm:gap-5 lg:gap-8 overflow-x-hidden scroll-smooth"
        >
          <div className="flex gap-3 sm:gap-5 lg:gap-8 pb-3 sm:pb-5 lg:pb-8 px-1 sm:px-3 lg:px-4">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className="min-w-[260px] sm:min-w-[400px] lg:min-w-[600px] bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100/20"
                onClick={() => handleCardClick(card)}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-50 rounded-l-xl"></div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 relative">
                      {card.title[0]} <span className="text-[#FF6B2C]">{card.highlightText}</span> {card.title[1]}
                    </h3>
                    <div
                      className="flex items-center text-[#FF6B2C] group mt-auto relative"
                    >
                      <span className="text-sm sm:text-base transition-all group-hover:mr-2">Read</span>
                      <span className="transition-transform group-hover:translate-x-2">
                        &#8594;
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 h-40 sm:h-auto overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title[0]}
                      className="w-full h-full object-cover rounded-b-lg sm:rounded-none sm:rounded-r-xl lg:rounded-r-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CaseStudySection.propTypes = {
  title: PropTypes.string.isRequired,
  highlightText: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.arrayOf(PropTypes.string).isRequired,
      highlightText: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      downloadPdf: PropTypes.string,
    })
  ).isRequired,
  onCardClick: PropTypes.func,
  className: PropTypes.string,
};

export default CaseStudySection;
