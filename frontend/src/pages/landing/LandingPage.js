import React, { useState } from "react";
import "./landing.css";
import IntroSection from "../../components/introsection/IntroSection";
import Statistics from "../../components/statistics/statistics";

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const clickedOnMenu = () => {
    setIsNavOpen(isNavOpen);
  };

  return (
    <div className={`app__container ${isNavOpen ? "overlay" : ""}`}>
      <IntroSection />
      <Statistics />
    </div>
  );
};
export default LandingPage;
