import React from "react";
//importing components
import PersonalizationIcon from "../../asset/images/personalization.png";
import IconFullyCustomizable from "../../asset/images/rating.png";
import IconBrandRecognition from "../../asset/images/generate.png";
import style from "./statistics.module.css";
const Statistics = () => {
  return (
    <section className={`${style.statistics} pt-2 pb-5`}>
      <div className={`${style.statistics__container}`}>
        <div className={`${style.text__content__advanced}`}>
          <h2>Features</h2>
          <p className="w-100">
            RecipeGPT is a powerful tool to help you with your cravings. Create
            your own recipe. Share it with the world. Give feedback. Get
            personalized recommendations. All in one place.
          </p>
        </div>
        <div className={`${style.statistics__dashboard} mt-5`}>
          <div className={`${style.blue__line}`}></div>
          <div className={`${style.statistics__item} ${style.recognition}`}>
            <div className={`${style.icon__container}`}>
              <div className={`${style.icon}`}>
                <img src={IconBrandRecognition} alt="icon-brand-recognition" />
              </div>
            </div>
            <div className={`${style.text__content__item}`}>
              <h3>Generate Recipes</h3>
              <p>
                Generate Recipes based on your cravings. Select your ingredients
                and other preferences. Get a recipe in seconds.
              </p>
            </div>
          </div>
          <div className={`${style.statistics__item} ${style.records}`}>
            <div className={`${style.icon__container}`}>
              <div className={`${style.icon}`}>
                <img src={PersonalizationIcon} alt="icon-detailed-records" />
              </div>
            </div>
            <div className={`${style.text__content__item}`}>
              <h3>Personalized Recommendations</h3>
              <p>
                Recommending recipes based on your history. Also takes account
                of your allergies and dietary restrictions to make it
                personalized.
              </p>
            </div>
          </div>
          <div className={`${style.statistics__item} ${style.customizable}`}>
            <div className={`${style.icon__container}`}>
              <div className={`${style.icon}`}>
                <img
                  src={IconFullyCustomizable}
                  alt="icon-fullly-customizable"
                />
              </div>
            </div>
            <div className={`${style.text__content__item}`}>
              <h3>Rate Recipes</h3>
              <p>
                Rate recipes based on your experience. RecipeGPT will learn your
                preferences and recommend recipes based on your history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
