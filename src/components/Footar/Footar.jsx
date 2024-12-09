import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = ({ base }) => {
  const [footerData, setFooterData] = useState([]);
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-footer-details`);
        setFooterData(response.data.footerlist);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, [base]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [base]);

  return (
    <footer className="bg-[#3153d6] flex-col md:flex-row justify-between mr-8 lg:ml-8 lg:mt-8 p-4">
      {footerData.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:flex md:flex-row lg:flex-row">
            {/* Left Section: Contact Us & Follow Us */}
            <div className="space-y-8">
              {/* Contact Us */}
              {footerData
                .filter((foot) => foot.footer_id === "9")
                .map((foot, index) => (
                  <div key={index}>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                      {foot.footer_title}
                    </h2>
                    <div
                      className="text-sm md:text-base text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: foot.footer_description,
                      }}
                    />
                  </div>
                ))}

              {/* Follow Us Section */}
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                  Follow Us
                </h2>
                <div className="flex space-x-4">
                  <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="transition duration-300 transform hover:scale-110"
                  >
                    <FaTwitter className="text-2xl md:text-3xl hover:text-[#1DA1F2]" />
                  </a>
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="transition duration-300 transform hover:scale-110"
                  >
                    <FaFacebook className="text-2xl md:text-3xl hover:text-[#1877F2]" />
                  </a>
                  <a
                    href={data.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="transition duration-300 transform hover:scale-110"
                  >
                    <FaYoutube className="text-2xl md:text-3xl hover:text-[#FF0000]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Section: Important Links */}
            <div className="space-y-8">
              {footerData
                .filter((foot) => foot.footer_id === "10")
                .map((foot, index) => (
                  <div key={index}>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                      {foot.footer_title}
                    </h2>
                    <div
                      className="text-sm md:text-base text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: foot.footer_description,
                      }}
                    />
                  </div>
                ))}
            </div>

            {/* Right Section: Calendar & Map */}
            <div className="space-y-8">
              {footerData
                .filter((foot) => foot.footer_id === "11")
                .map((foot, index) => (
                  <div key={index}>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                      {foot.footer_title}
                    </h2>
                    <div
                      className="text-sm md:text-base text-gray-300 leading-relaxed border border-gray-600 p-4 bg-white rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: foot.footer_description,
                      }}
                    />
                  </div>
                ))}

              {footerData
                .filter((foot) => foot.footer_id === "0")
                .map((foot, index) => (
                  <div key={index}>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold underline underline-offset-8 decoration-[#087830]">
                      {foot.footer_title}
                    </h2>
                    <div
                      className="text-sm md:text-base text-gray-300 leading-relaxed border border-gray-600 p-4 bg-white rounded-md mt-4"
                      dangerouslySetInnerHTML={{
                        __html: foot.footer_description,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-500 pt-4">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base text-gray-400">
            © 2024 परिवर्तन नेपाल | Created by{" "}
            <a
              href="https://www.ithome.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#a19e6f] transition duration-300"
            >
              IT HOME NEPAL PVT.LTD.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
