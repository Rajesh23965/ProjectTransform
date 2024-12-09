import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Clean from "../assets/Transform International1.webp";

const Page = ({ base }) => {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQueryParam = (param) => new URLSearchParams(location.search).get(param);
  const pageId = getQueryParam("id");

  useEffect(() => {
    const fetchPageData = async () => {
      if (pageId) {
        try {
          const response = await axios.get(`${base}/get-front-page-details?id=${pageId}`);
          setPageData(response.data.page);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching page data:", error);
          setLoading(false);
        }
      }
    };

    fetchPageData();
  }, [pageId, base]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-full sm:w-full mx-auto px-4 md:px-8 sm:px-1 flex-col md:flex-row">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[250px] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={Clean}
            alt="Top Banner"
            className="object-cover w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <motion.h1
          className="absolute inset-x-0 bottom-12 text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {pageData?.page_title}
        </motion.h1>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16 text-justify">
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-start border-b rounded-lg ">
            {pageData?.page_title}
          </h1>
          <div className="bg-white rounded-lg text-lg leading-relaxed text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: pageData?.page_desc }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
