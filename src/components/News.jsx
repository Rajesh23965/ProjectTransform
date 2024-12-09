import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Clean from "../assets/Clean.jpeg";
import axios from "axios";

const NewsNotice = () => {
  const [postData, setPostData] = useState(null);
  const base = "https://api.ithomedemo.com.np/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${base}/get-front-post-details?id=53`);
        if (response.data.message === "success") {
          setPostData(response.data.post);
        }
      } catch (error) {
        console.log('Error fetching post data', error);
      }
    };

    fetchPost();
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
            News And Notice
          </motion.h2>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
          News & Notices
        </h1>

        {postData ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={`https://api.ithomedemo.com.np/assets/uploads/${postData.featured_image}`}
              alt={postData.post_title}
              className="w-full h-48 object-cover"
              
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{postData.post_title}</h3>
              <p className="text-gray-500">
                {new Date(postData.added_on).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{postData.content_section}</p>
            </div>
          </motion.div>
        ) : (
          <p>Loading...</p> 
        )}
      </div>
    </div>
  );
};

export default NewsNotice;




















// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Clean from "../assets/Clean.jpeg";

// const fetchCategory = async () => {
//   try {
//     const response = await axios.get(`${base}/get-front-category-details?id=5`);
//     if (response.data.message === "success") {
//       setCategoryData(response.data.category);
//     }
//   } catch (error) {
//     console.log("Error fetching category data", error);
//   }
// };

// Example conditional logic based on certain values or triggers
// if (customeLink === "page") {
//   fetchPage();
// } else if (customeLink === "post") {
//   fetchPost();
// } else if (customeLink === "category") {
//   fetchCategory();
// }

// const NewsNotice = () => {
//   const { type, id } = useParams(); // Fetch type (page, post, category) and id from URL
//   const [pageData, setPageData] = useState(null);
//   const [postData, setPostData] = useState(null);
//   const [categoryData, setCategoryData] = useState(null);
//   const base = "https://api.ithomedemo.com.np/";

//   useEffect(() => {
//     const fetchPage = async () => {
//       try {
//         const response = await axios.get(`${base}/get-front-page-details?id=${id}`);
//         if (response.data.message === "success") {
//           setPageData(response.data.page);
//         }
//       } catch (error) {
//         console.log("Error fetching page data", error);
//       }
//     };

//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`${base}/get-front-post-details?id=${id}`);
//         if (response.data.message === "success") {
//           setPostData(response.data.post);
//         }
//       } catch (error) {
//         console.log("Error fetching post data", error);
//       }
//     };

//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get(`${base}/get-front-category-details?id=${id}`);
//         if (response.data.message === "success") {
//           setCategoryData(response.data.category);
//         }
//       } catch (error) {
//         console.log("Error fetching category data", error);
//       }
//     };

//     // Fetch the data based on the type
//     if (type === "page") {
//       fetchPage();
//     } else if (type === "post") {
//       fetchPost();
//     } else if (type === "category") {
//       fetchCategory();
//     }
//   }, [type, id]);

//   return (
//     <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">
//       {/* Top Banner Section */}
//       <section className="relative">
//         <div className="relative overflow-hidden shadow-md">
//           <motion.img
//             src={Clean}
//             className="w-full h-[400px] md:h-[250px] object-cover"
//             alt="Top Banner"
//             initial={{ scale: 1.2 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
//           <motion.h2
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             News & Notice
//           </motion.h2>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
//           News & Notices
//         </h1>

//         {/* Conditionally Render Page Data */}
//         {pageData ? (
//           <div>
//             <h2 className="text-2xl font-semibold">Page Data</h2>
//             <p>{pageData.page_content}</p>
//           </div>
//         ) : null}

//         {/* Conditionally Render Post Data */}
//         {postData ? (
//           <motion.div
//             className="space-y-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <h2 className="text-2xl font-semibold">Post Data</h2>
//             <img
//               src={`${base}${postData.featured_image}`}
//               alt={postData.post_title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{postData.post_title}</h3>
//               <p className="text-gray-500">
//                 {new Date(postData.added_on).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700">{postData.content_section}</p>
//             </div>
//           </motion.div>
//         ) : null}

//         {/* Conditionally Render Category Data */}
//         {categoryData ? (
//           <div>
//             <h2 className="text-2xl font-semibold">Category Data</h2>
//             <p>Category Name: {categoryData.cat_name}</p>
//             <p>Category Slug: {categoryData.cat_slug}</p>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default NewsNotice;
