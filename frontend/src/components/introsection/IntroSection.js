import React from "react";
import Chef from "../../asset/images/undraw_chef_cu-0-r.svg";
import { Card } from "react-bootstrap";
import Style from "./introsection.module.css";
import { useAuth } from "../../context/authcontext";
const IntroSection = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className={`${Style.introsection} py-5`}>
      <section className="container">
        <div className="row align-items-center gap-3 justify-content-center">
          <div className="col-md-5 text-center text-md-start">
            <h1>More than just Recipes ...</h1>
            <p className="mt-4">
              RecipeGPT is a recipe search engine that levarages the power of AI
              to generate personalized recipes based on your preferences.
            </p>
            <a
              className="main__button text-decoration-none mt-4"
              href={isAuthenticated ? "/dashboard" : "/login"}
            >
              Get Started
            </a>
          </div>
          <div className="col-md-6">
            <img src={Chef} alt="chef" className="img-fluid" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroSection;
