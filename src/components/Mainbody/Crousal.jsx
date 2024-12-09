import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LuLoader } from "react-icons/lu";

const Carousel = ({ base }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-slider-details`);
        const data = response.data;

        if (data.message === "success" && Array.isArray(data.slider)) {
          const imageUrls = data.slider
            .filter((slider) => slider.slider_image && slider.delete_status === "0")
            .map((slider) => ({
              imageUrl: `${base}/assets/uploads/${slider.slider_image}`,
              title: slider.slider_title, // Extract title
            }));

          setImages(imageUrls);
        } else {
          setError(new Error("Unexpected API response format"));
        }
      } catch (err) {
        setError(err);
        toast.error("Error fetching slider data");
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, [base]);

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false, // Disable default arrows, we'll use custom ones
    dots: false,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LuLoader className="animate-spin text-3xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const Arrow = ({ direction, onClick }) => (
    <div
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 ${
        direction === "left" ? "left-2" : "right-2"
      } text-white bg-black/50 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    >
      {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </div>
  );

  return (
    <div className="max-w-3/5 sm:w-2/2 mx-auto px-4 md:px-8 mt-3 flex-col md:flex-row">
      {images.length > 0 ? (
        <div className="relative group">
          {/* Slider */}
          <Slider ref={sliderRef} {...settings}>
            {images.map((item, index) => (
              <div key={index} className="relative flex justify-center items-center">
                <img
                  className=" w-full h-[300px] sm:h-[220px] md:h-[440px] lg:h-[480px] object-cover"
                  src={item.imageUrl}
                  alt={`Slide ${index + 1}`}
                />
                {item.title && (
                  <h2 className="absolute bottom-5 text-white text-lg font-bold bg-black/50 p-2 rounded-md">
                    {item.title}
                  </h2>
                )}
              </div>
            ))}
          </Slider>

          {/* Custom Arrows */}
          <Arrow direction="left" onClick={() => sliderRef.current.slickPrev()} />
          <Arrow direction="right" onClick={() => sliderRef.current.slickNext()} />
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Carousel;
