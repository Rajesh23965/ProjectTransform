import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = ({ base }) => {
  const [headerInfo, setHeaderInfo] = useState([]);
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-header-details`);
        setHeaderInfo(response.data.header);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTopbarData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-topbar-details`);
        const topbarData = response.data.topbar[0];
        setData({
          facebook: topbarData.facebook,
          twitter: topbarData.twitter,
          youtube: topbarData.youtube,
        });
      } catch (error) {
        console.error("Error fetching topbar data:", error);
      }
    };
    fetchTopbarData();
  }, []);

  if (!headerInfo.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-4 lg:px-10 mt-4 lg:mt-0">
      {headerInfo.map((head, index) => (
        <React.Fragment key={index}>
          {/* Logo Section */}
          <Link to='/'>
            <img
              src={`${base}/assets/uploads/${head.left_logo}`}
              alt="Logo"
              className="h-10 md:h-12 lg:h-16 xl:h-20"
            />
          </Link>

          {/* Office Info */}
          <Link to='/'>
            <div className="text-center md:text-left">
              <p className="text-[#3153d6] font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {head.nirdeshnalaya}
              </p>
              <p className="text-[#2c540e] font-bold text-md md:text-lg lg:text-xl xl:text-2xl">
                {head.office_name}
              </p>
              <p className="text-[#3153d6] font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                {head.office_location}
              </p>
            </div>
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4 md:gap-6 lg:gap-8 text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            <Link to={data.twitter} target="_blank">
              <FaTwitter className="hover:text-[#1DA1F2] transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to={data.facebook} target="_blank">
              <FaFacebook className="hover:text-[#1877F2] transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to={data.youtube} target="_blank">
              <FaYoutube className="hover:text-[#FF0000] transition-transform duration-300 transform hover:scale-110" />
            </Link>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Header;
