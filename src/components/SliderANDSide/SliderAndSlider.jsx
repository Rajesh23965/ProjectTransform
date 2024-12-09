import React from "react";
import Carousel from "../Mainbody/Crousal";
import Sidebar from "../SideBar";
import About from "../Mainbody/About";

const SliderAndSlider = ({ base }) => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto max-w-screen-xl">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 order-1">
        <Carousel base={base} />
        <About base={base} />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/4 order-2 mb-6 lg:mb-0">
        <Sidebar />
      </div>
    </div>
  );
};

export default SliderAndSlider;
