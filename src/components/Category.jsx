import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Clean from "../assets/Logo.png";
const Category = ({ base }) => {
  const location = useLocation();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const categoryId = getQueryParam("id");

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `${base}/get-front-category-details?id=${categoryId}`
          );
          setCategoryData(response.data.category);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category data:", error);
          setLoading(false);
        }
      }
    };

    fetchCategoryData();
  }, [categoryId, base]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">
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
            {categoryData?.cat_name}
          </motion.h2>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
          {categoryData?.cat_name}
        </h1>

        {categoryData ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{categoryData.cat_name}</h3>
              <p className="text-gray-500">{categoryData.cat_slug}</p>
            
            </div>
          </motion.div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Category;
