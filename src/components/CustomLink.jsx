import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Clean from "../assets/Clean.jpeg";
import axios from "axios";

const CustomLink = () => {
  const [pageData, setPageData] = useState(null);
  const base = "https://api.ithomedemo.com.np"; 

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          `${base}/get-front-page-details?id=132`
        );
        if (response.data.message === "success") {
          setPageData(response.data.page);
        }
      } catch (error) {
        console.log("Error fetching page data", error);
      }
    };

    fetchPage();
  }, []);

  return (
    <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">
      {/* Top Banner Section */}
      <section className="relative">
        <div className="relative overflow-hidden shadow-md">
          <motion.img
            src={Clean}
            className="w-full h-[400px] md:h-[250px] object-cover"
            alt="Top Banner"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
          <motion.h2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl  md:-ml-[35rem] font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
           Page 
          </motion.h2>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
          Page
        </h1>

        {pageData ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={`${base}/assets/uploads/${pageData.page_featured_img}`}
              alt={pageData.page_title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.style.display = "none"; 
              }}
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{pageData.page_title}</h3>
              <p className="text-gray-500">{pageData.slug}</p>
              {/* <p className="text-gray-700">{pageData.content_section}</p> */}
            </div>
          </motion.div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CustomLink;
