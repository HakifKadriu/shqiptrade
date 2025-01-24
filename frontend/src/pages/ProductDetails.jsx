import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { useParams } from "react-router";
import ProductCarousel from "../components/ProductCarousel";

const ProductDetails = () => {
  const { productId } = useParams();
  const { product, fetchSingleProduct, isLoading } = useProductStore();

  const [imageIndex, setimageIndex] = useState(0);

  useEffect(() => {
    fetchSingleProduct(productId);
  }, [productId, fetchSingleProduct]);

  useEffect(() => {
    if (product?.defaultImageIndex !== undefined) {
      setimageIndex(product.defaultImageIndex);
    }
  }, [product]);

  // const ImageFullScreen = () => {
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
  //       <button
  //         //   onClick={closeFullscreen}
  //         className="absolute top-4 right-4 bg-gray-700 text-white py-2 px-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
  //       >
  //         ✕
  //       </button>
  //       <div className="relative w-full max-w-4xl">
  //         <img
  //           // src={`http://localhost:5000/productimages/${product.image[imageIndex]}`}
  //           src="https://imgur.com/UD5kJzA"
  //           alt={`Fullscreen Product ${imageIndex + 1}`}
  //           className="w-full h-auto max-h-[80vh] object-contain"
  //         />
  //         <button
  //           onClick={goToPrevious}
  //           className="absolute top-1/2 -translate-y-1/2 left-2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
  //         >
  //           <CgArrowLeft />
  //         </button>
  //         <button
  //           onClick={goToNext}
  //           className="absolute top-1/2 -translate-y-1/2 right-2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
  //         >
  //           <CgArrowRight />
  //         </button>
  //         <div className="flex justify-center mt-2 space-x-2">
  //           {images.map((_, index) => (
  //             <button
  //               key={index}
  //               onClick={() => setCurrentIndex(index)}
  //               className={`w-3 h-3 rounded-full ${
  //                 index === currentIndex
  //                   ? "bg-gray-800 duration-300"
  //                   : "bg-gray-400 hover:bg-gray-500 duration-300"
  //               }`}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return isLoading || !product ? (
    <div>Loading...</div>
  ) : (
    <div className="my-4">
      <div className="mx-4 flex">
        <div className="flex flex-col items-center  w-1/2 gap-4 ">
          <div className="flex justify-center w-1/2 h-[60vh] border rounded-t-2xl">
            <img
              src={`https://i.imgur.com/${product.image[imageIndex]}`}
              alt="Product"
              className="object-cover object-center w-full h-full rounded-t-2xl"
            />
          </div>
          <div className="flex h-32 w-1/2 overflow-auto snap-x gap-2">
            {product.image.length > 1 && product.image.map((image, i) => (
              <img
                key={i}
                className="w-full h-full snap-start border cursor-pointer"
                src={`https://i.imgur.com/${image}`}
                onClick={() => setimageIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* <ImageFullScreen /> */}

        {/* Details Div */}
        <div>
          <h1 className="text-4xl">{product.name}</h1>
          <p>{product.description}</p>
          <h3>Price: ${product.price}</h3>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
