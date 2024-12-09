import React, { useEffect, useState } from "react";
import Image2 from "../../assets/Logo.png";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const About = ({ base, categoryId }) => {
  const [showMore, setShowMore] = useState(false);
  const [intro, setIntro] = useState([]);
  const location = useLocation();
  const [postDataByCat, setPostDataByCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const postId = getQueryParam("id");

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const { data } = await axios.get(`${base}/get-front-header-details`);
        setHeaderInfo(data.header || []);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, [base]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch posts by category ID
  useEffect(() => {
    const fetchPostDataCat = async () => {
      try {
        const { data } = await axios.get(
          `${base}/get-front-postlist-by-category-id-details?catId=27`
        );
        setPostDataByCat(data.postlist || []);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDataCat();
  }, [base]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axios.get(
          `${base}/get-front-introduction-details`
        );
        const introData = response.data.intro;
        setIntro(introData);
      } catch (error) {
        console.error("Error fetching introduction data:", error);
      }
    };

    fetchIntro();
  }, [base]);

  const toggleViewMore = () => {
    setShowMore(!showMore);
  };

  const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="max-w-full sm:w-full mx-auto px-4 md:px-8 lg:px- flex-col md:flex-row">
      {/* Introduction Section */}
      <div className="lg:flex items-center gap-8 mb-16 animate-fadeInUp">
        {/* <div className="lg:w-1/2 animate__animated animate__fadeInLeft">
          <img
            src={Image2}
            alt="Nepal"
            className="w-full h-80 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-500"
          />
        </div> */}
        <div className="text-justify mt-6 lg:mt-0 animate__animated animate__fadeInRight">
          {intro.length > 0 && (
            <p className="text-black text-3xl font-semi mb-4">
              {intro[0].title}
            </p>
          )}
          {intro.length > 0 && (
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: intro[0].description }}
            />
          )}
          {/* <button onClick={toggleViewMore} className="mt-6">
            {intro.length > 0 && (
              <Link
                to={`page?id=${intro[0].selectedPage}`}
                className="relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-[#087830] border-2 border-[#087830] rounded-full hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-[#4e7a02] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">
                  {showMore ? "View Less" : "View More"}
                </span>
              </Link>
            )}
          </button> */}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-[#2c540e] rounded-xl text-center shadow-lg py-2 px-5 lg:px-16 text-white mb-16">
        <div className="lg:flex justify-between gap-8">
          <div className="lg:w-1/2 mb-6 lg:mb-0 text-left">
            <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
            <p className="leading-relaxed text-justify">
              Transform International's mission focuses on reducing poverty by
              enhancing the capacity of the Nepalese population to improve their
              quality of life. The mission suggests a strong emphasis on
              empowerment—helping people gain the skills, knowledge, and
              resources needed to uplift themselves. This approach aligns with
              sustainable development, where building local capacity enables
              long-term positive change. By targeting the most vulnerable
              sections of society (the poor, disadvantaged, and marginalized),
              the mission underscores a commitment to social justice and
              inclusive development.
            </p>
          </div>
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
            <p className="leading-relaxed text-justify">
              The vision of Transform International aims for equality and
              access—envisioning a Nepal where all individuals have equal
              opportunities and the resources to break free from poverty. The
              emphasis on dignity and quality of life reflects the
              organization's commitment to both economic well-being and human
              rights. The goal is for people not only to escape poverty but to
              do so with respect, fairness, and autonomy. This vision aligns
              with larger global goals of equity, empowerment, and environmental
              sustainability, creating a future where prosperity is shared by
              all.
            </p>
          </div>
        </div>
      </div>
      <hr className="mb-2" />
      {/* Members Section */}
      <h2 className="mb-2 text-center underline underline-offset-8 text-4xl font-serif-bold ">
        Latest Post
      </h2>
      {postDataByCat.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postDataByCat.map((p) => (
            <div
              key={p.post_id}
              className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <img
                src={`${base}/assets/uploads/${p.featured_image}`}
                className="w-full h-64 object-cover rounded-lg p-2"
                alt={p.post_title}
              />
              <div className="p-6 text-center">
                <h5 className="text-2xl font-bold mb-3">{p.post_title}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(p.content_section),
                  }}
                ></div>
                <Link
                  to={`/post?id=${p.post_id}`} // Use to for React Router navigation
                  className="inline-block py-2 px-6 mt-4 bg-[#087830] text-white rounded-full hover:bg-green-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
