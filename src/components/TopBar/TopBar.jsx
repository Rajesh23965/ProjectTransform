import { useState, useEffect } from "react";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { VscCalendar } from "react-icons/vsc";
import { MdOutlineEmail } from "react-icons/md";
import NepaliDate from "nepali-date-converter";
import axios from "axios";

// Translations for English and Nepali
const translations = {
  en: {
    lowBandwidth: "Low Bandwidth",
    normalBandwidth: "Normal Bandwidth",
    contactNumber: "+977-01-4262543, 4262802",
    email: "info@mohp.gov.np",
    date: "English Date",
    toggleLanguage: "नेपाली",
  },
  np: {
    contactNumber: "+९७७-०१-४२६२५४३, ४२६२८०२",
    email: "info@mohp.gov.np",
    toggleLanguage: "English",
  },
};

const nepaliDayNames = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहीबार",
  "शुक्रबार",
  "शनिबार",
];

const nepaliMonthNames = [
  "बैशाख",
  "जेष्ठ",
  "आषाढ",
  "श्रावण",
  "भाद्र",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पुष",
  "माघ",
  "फाल्गुण",
  "चैत्र",
];

const colorThemes = {
  light: {
    background: "#fff",
    text: "#2c540e ",
    iconColor: "#2c540e",
    borderColor: "gray",
  },
  dark: {
    background: "#050505",
    text: "#4e7a02 ",
    iconColor: "#4e7a02 ",
    borderColor: "gray",
  },
  blackWhite: {
    background: "#000",
    text: "#087830 ",
    iconColor: "#087830",
    borderColor: "#087830",
  },
};

const TopBar = ({ isNepali, toggleLanguage, base }) => {
  const [fontSize, setFontSize] = useState(15);
  const [mode, setMode] = useState("light");
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [data, setData] = useState("");
  
  const toggleMode = (newMode) => setMode(newMode);
  const handleClick = (increment) => setFontSize((prevSize) => prevSize + increment);
  const toggleBandwidth = () => setIsLowBandwidth((prev) => !prev);
  
  const today = new Date();
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(isNepali ? "ne-NP" : "en-US", dateOptions);
  const nepaliDate = formatNepaliDate(today);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-topbar-details`);
        const topbarData = response.data.topbar[0];
        setData({
          phone: convertPhoneNumber(topbarData.mobile_number, isNepali),
          email: topbarData.email,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isNepali]);

  useEffect(() => {
    document.body.style.fontSize = `${isLowBandwidth ? 12 : fontSize}px`;
    document.body.style.backgroundColor = colorThemes[mode].background;
    document.body.style.color = colorThemes[mode].text;
  }, [fontSize, mode, isLowBandwidth]);

  const lang = isNepali ? translations.np : translations.en;
  const colors = colorThemes[mode];

  return (
    <div className={`border-b-2 flex flex-col md:flex-row justify-between items-center text-center p-2 lg:ml-8 lg:mr-8`} 
         style={{ borderColor: colors.borderColor }}>
      <div className={`flex flex-wrap items-center divide-x-2`} 
           style={{ color: colors.iconColor, borderColor: colors.borderColor }}>
        <div className="items-center hidden md:flex mb-1 lg:ml-2">
          <VscCalendar className="text-lg" />
          <p className="mb-0 ml-2 px-2">{isNepali ? nepaliDate : formattedDate}</p>
        </div>
        <div className="items-center mb-2 mt-1 hidden md:flex px-3">
          <FaPhoneAlt className="text-lg" />
          <p className="mb-0 ml-2">{data.phone}</p>
        </div>
        <div className="items-center hidden md:flex px-2">
          <MdOutlineEmail className="text-lg" />
          <p className="mb-0 ml-2 cursor-pointer">{data.email}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full sm:w-auto">
        <div className="flex items-center mb-2 mt-1 text-nowrap divide-x-2">
          <p className="mb-0 sm:mr-6 lg:mr-4 cursor-pointer px-3" onClick={toggleBandwidth}>
            {isLowBandwidth ? "Low Bandwidth" : "Normal Bandwidth"}
          </p>
          <div className="px-3">
            {mode === "dark" ? (
              <FaEye className="text-xl cursor-pointer" onClick={() => toggleMode("light")} />
            ) : (
              <GoEyeClosed className="text-xl cursor-pointer" onClick={() => toggleMode("dark")} />
            )}
          </div>
          <button className="btn mr-2 px-3" onClick={() => handleClick(-1)}>A-</button>
          <button className="btn px-3" onClick={() => handleClick(1)}>A+</button>
          <p className="mb-0 cursor-pointer px-3" onClick={toggleLanguage}>
            {lang.toggleLanguage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

const formatNepaliDate = (date) => {
  const nepaliDate = new NepaliDate(date);
  const day = nepaliDayNames[nepaliDate.getDay()];
  const month = nepaliMonthNames[nepaliDate.getMonth()];
  const nepaliDay = nepaliDate
    .getDate()
    .toString()
    .split("")
    .map((d) => String.fromCharCode(d.charCodeAt(0) + 0x0966 - 48))
    .join("");
  const nepaliYear = nepaliDate
    .getYear()
    .toString()
    .split("")
    .map((d) => String.fromCharCode(d.charCodeAt(0) + 0x0966 - 48))
    .join("");
  return `${day}, ${nepaliDay} ${month} ${nepaliYear}`;
};

const convertPhoneNumber = (phoneNumber, toNepali) => {
  if (toNepali) {
    // Convert English to Nepali
    return phoneNumber.replace(/\+/g, "+९७७-").replace(/-/g, "-");
  } else {
    // Convert Nepali to English
    return phoneNumber.replace(/\+९७७-/g, "+").replace(/-/g, "-");
  }
};
