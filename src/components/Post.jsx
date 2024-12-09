import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Post = ({ base, categoryId }) => {
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const getQueryParam = (param) => new URLSearchParams(location.search).get(param);
  const postId = getQueryParam("id");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        try {
          const { data } = await axios.get(`${base}/get-front-post-details?id=${postId}`);
          setPostData(data.post);
        } catch (error) {
          console.error("Error fetching post data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPostData();
  }, [postId, base]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex-col md:flex-row justify-between mr-8 lg:ml-8 lg:mt-0">
      {/* Top Image Section */}
      <section className="relative">
        <div className="relative overflow-hidden shadow-md">
          <motion.img
            src={`${base}/assets/uploads/${postData?.featured_image || "default-image.jpg"}`}
            className="w-full h-[400px] md:h-[250px] object-cover"
            alt="Top Banner"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
          <motion.h2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {postData?.post_title}
          </motion.h2>
        </div>
      </section>

      {/* Post Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
          {postData?.post_title}
        </h1>
        <motion.div
          className="space-y-8 w-full flex items-center justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-6 bg-white">
            <p className="text-gray-500 text-sm mb-2">
              {currentTime.toLocaleDateString()}
            </p>
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: postData?.content_section }}
            ></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Post;
