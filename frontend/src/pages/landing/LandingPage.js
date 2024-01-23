import React, { useState } from "react";
import "./landing.css";
import IntroSection from "../../components/introsection/IntroSection";
import Statistics from "../../components/statistics/statistics";
import Footer from "../../components/footer/footer";

const LandingPage = () => {
  return (
    <div className={`app__container `}>
      <IntroSection />
      <Statistics />
      <Footer />
    </div>
  );
};
export default LandingPage;
