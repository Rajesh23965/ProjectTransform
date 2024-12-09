import React from "react";
import { Link } from "react-router-dom";

const SubMenue = ({ isOpen, links, handleTabClick }) => {
  const generateLink = (link) => {
    return link.url_menu === "#"
      ? "/"
      : `/${
          link.content_type == 1
            ? `page?id=${link.content_id}`
            : link.content_type == 2
            ? `post?id=${link.content_id}`
            : link.content_type == 3
            ? `category?id=${link.content_id}`
            : link.content_type == 4
            ? `/${link.url_menu}`
            : ""
        }`;
  };

  return (
    isOpen && links.length > 0 && (
      <ul className="absolute left-0 w-48 lg:w-60 bg-[#18558f] text-white space-y-2 p-2 mt-1 rounded shadow-lg z-50">
        {links.map((link) => (
          <li
            key={link.label_menu}
            className="px-4 py-2 hover:bg-[#82bb1e] transition-all duration-300"
            onClick={() => handleTabClick(link.label_menu)}
          >
            <Link to={generateLink(link)} className="hover:text-gray-300">
              {link.label_menu}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

export default SubMenue;
