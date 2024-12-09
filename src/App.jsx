import Header from "./components/Header/Header";
import TopBar from "./components/TopBar/TopBar";
import Navbar from "./components/NavBar/Navbar";
import Member from "./components/Mainbody/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ContactUs from "./components/ContactPage/Contact";
import Post from "./components/Post";
import Page from "./components/Page";
import Category from "./components/Category";
import Footer from "./components/Footar/Footar";
import { useState } from "react";
import Sidebar from "./components/SideBar";
import SliderAndSlider from "./components/SliderANDSide/SliderAndSlider";
import Partner from "./components/Partner/Partner";

const lightModeColors = {
  primaryBg: "bg-[#087840]",
  primaryText: "text-[#087840]",
  secondaryText: "text-gray-500",
};

const darkModeColors = {
  primaryBg: "bg-red-600",
  primaryText: "text-white",
  secondaryText: "text-green-500",
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colorScheme = isDarkMode ? darkModeColors : lightModeColors;
  const base = "https://api.transform.org.np";

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div>
        <TopBar base={base}/>
        <Header base={base}/>
        <Navbar base={base}/>

        <Routes>
          <Route
            path="/"
            element={
              <>
              
              <SliderAndSlider base={base}/>
              <Partner base={base}/>
              </>
            }
          />
          <Route path="/member" element={<Member base={base} />} />
          {/* <Route path="/contact" element={<ContactUs base={base} />} /> */}
          <Route path="/sidebar" element={<Sidebar base={base} />} />
          <Route path="/post" element={<Post base={base} />} />
          <Route path="/page" element={<Page base={base} />} />
          <Route path="/category" element={<Category base={base} />} />
        </Routes>

        <Footer base={base} />
      </div>
    </BrowserRouter>
  );
}

export default App;
