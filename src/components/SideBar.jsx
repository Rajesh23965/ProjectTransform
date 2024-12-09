import React from "react";

const SideBar = () => {
  return (
    <div className="mx-auto px-4 md:px-8 mt-3 flex-col  md:flex-row mb-6">
      <div className="bg-gray-200 p-2 rounded-lg text-justify">
        <h1 className="bg-[#2c540e] text-center py-2 text-white font-bold text-lg">
          Nepal’s Progress Towards the SDGs
        </h1>
        <p className=" text-black p-2">
          The overarching goal of the SDGs of ‘leaving no one behind’ fits well
          with the inclusive political order that Nepal has been building with
          the new Constitution (2015), which aspires to create a prosperous,
          egalitarian and pluralistic society, and serves as the overarching
          guide to all development policies, plans, and programs. Nepal's social
          and political progress has been highly progressive: Building on the
          gains so far, the challenge for Nepal is to swiftly embrace a much
          more ambitious aspiration of fulfilling the SDGs. However, the country
          is resource constrained, and it needs to forge a diverse partnership
          for SDGs among government, business and civil society to end poverty
          and create a life of dignity and opportunity for all in Nepal.
        </p>
      </div>
      <div className="bg-gray-200 p-2 rounded-lg mt-6">
        <h1 className="bg-[#2c540e] text-center py-2 text-white font-bold text-lg">
          National Sustainable Development Goals
        </h1>
        <div className=" text-black text-justify">
          <p className="">
            <strong className="text-lg mb-2">
              Nepal’s National Sustainable Development Goals Framework
            </strong>
          </p>
          <span className="">
            While the SDGs are not legally binding, governments are expected to
            take ownership and establish national frameworks for the achievement
            of the 17 Goals. Nepal has prepared its SDG country Status Report in
            2015, detailing and taking stock of its development context and
            establishing the baseline for the SDGs. This made Nepal the first
            country in the world to publish its SDG Country Report and
            symbolizes Nepal’s commitment and readiness to execute the SDGs. The
            National Planning Commission is the designated focal agency of the
            Government of Nepal for SDG localization. The NPC has been working
            to align its periodic plans with the SDG and its targets including
            its national monitoring and evaluation framework. The
            internalization of SDGs started since the 14th periodic plan
            (2016/17-2018/19). The current 15th Plan (2019/20-2023/24) is also
            fully aligned with the SDGs. Moreover, other sectoral plans,
            policies and targets are also aligned with the SDGs. Specific SDG
            codes are assigned for all national programs in the national budget.
          </span>
        </div>
      </div>
       {/* Section 3: Latest Facebook */}
       <div className=" bg-gray-200  rounded-lg mt-6">
        <h1 className="bg-[#2c540e] text-center py-2 text-white font-bold text-lg">Latest Facebook</h1>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fithome.com.np&tabs=timeline&width=340&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="250"
          height="410"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default SideBar;
