import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import { LuLoader } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partner = ({ base }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              title: slider.slider_title,
            }));

          setImages(imageUrls);
        } else {
          setError(new Error("Unexpected API response format"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, [base]);

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <FaArrowLeft />,
    nextArrow: <FaArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <LuLoader className="animate-spin text-3xl mx-auto my-16" />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-16">Error: {error.message}</div>;
  }

  return (
    <div className="max-w-full sm:w-full mx-auto px-4 md:px-8 lg:px- flex-col md:flex-row">
      <h2 className="text-center text-2xl md:text-4xl font-bold underline mb-8">Image Galleries</h2>
      <div className="flex justify-center mb-8">
        <Slider {...settings} className="w-full">
          {images.map((item, index) => (
            <div key={index} className="relative p-2">
              <img
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover rounded-lg"
                src={item.imageUrl}
                alt={`Slide ${index + 1}`}
              />
              {item.title && (
                <h2 className="absolute bottom-4 left-4 text-white text-sm md:text-lg lg:text-xl bg-black/50 p-2 rounded-md">
                  {item.title}
                </h2>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Partner;
