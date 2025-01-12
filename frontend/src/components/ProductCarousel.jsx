import React, { useState } from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div>
      {/* Main Carousel */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={`http://localhost:5000/productimages/${images[currentIndex]}`}
            alt={`Product ${currentIndex + 1}`}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => openFullscreen(currentIndex)}
          />
        </div>
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
        >
          <CgArrowLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
        >
          <CgArrowRight />
        </button>
        {/* Dots Navigation */}
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-gray-800 duration-300"
                  : "bg-gray-400 hover:bg-gray-500 duration-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-gray-700 text-white py-2 px-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl">
            <img
              src={`http://localhost:5000/productimages/${images[currentIndex]}`}
              alt={`Fullscreen Product ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
            >
              <CgArrowLeft />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
            >
              <CgArrowRight />
            </button>
            <div className="flex justify-center mt-2 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex
                      ? "bg-gray-800 duration-300"
                      : "bg-gray-400 hover:bg-gray-500 duration-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
