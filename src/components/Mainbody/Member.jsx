import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MemberImg from "../../assets/Logo.png";

const Member = ({ base }) => {
  const location = useLocation();
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const memberId = getQueryParam("id");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const { data } = await axios.get(`${base}/get-front-employee-details`);
        setMemberData(data.stafflist || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff-list data:", error);
        setLoading(false); 
      }
    };

    fetchMemberData();
  }, [base]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">
      {/* Top Banner Section */}
      <section className="relative">
        <div className="relative overflow-hidden shadow-md">
          <motion.img
            src={MemberImg}
            className="w-full h-[400px] md:h-[250px] object-cover"
            alt="Top Banner"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
          <motion.h2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl md:-ml-[35rem] font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Member of an Organization
          </motion.h2>
        </div>
      </section>

      {/* Member List */}
      <div className="bg-gray-50 py-12">
        {memberData.length > 0 ? (
          <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold mb-12 text-[#2c3e50] underline underline-offset-12 decoration-red py-2">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {memberData.map((member) => (
                <div key={member.staff_id} className="bg-white shadow-lg rounded-lg p-6">
                  <img
                    src={`${base}/assets/uploads/${member.staff_image}`}
                    alt={member.staff_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">{member.staff_name}</h3>
                    <p className="text-gray-500 mb-4">{member.staff_specialities}</p>
                    <div className="flex space-x-4">
                      <a href="https://www.linkedin.com/" className="text-[#4e7a02] hover:text-[#087830]">LinkedIn</a>
                      <a href="https://www.facebook.com/" className="text-[#617c32] hover:text-[#2a7444]">Facebook</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default Member;
