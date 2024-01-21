import React from "react";
//importing styles
import "./signup.css";
//importing link from react router
import { Link } from "react-router-dom";
import SignUpImg from "../../asset/images/signup.svg";
import Field from "../../components/FieldForm";
import {
  faGoogle,
  faKeybase,
  faKeycdn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing components
const SignUp = ({ handleSubmit }) => {
  //rendering errors
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="header">{error}</div>;
    }
  };
  const loginWithGoogle = () => {
    console.log("google");
  };
  return (
    <div className="sign__up__page">
      <div className="wrapper ">
        <div className="sign__up__card ">
          <div className="sign__up__card__container">
            <div className="illustration">
              <img src={SignUpImg} alt="signup" className="img-fluid" />
            </div>
            <div className="text__content mt-4 ">
              <div className="social__media mb-2">
                <div
                  className="main__button px-3"
                  onClick={() => loginWithGoogle()}
                >
                  <FontAwesomeIcon icon={faGoogle} size={"2x"} /> &nbsp;Continue
                  with Google
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  component={Field}
                  placeholder="Username"
                  type="text"
                  source={faUser}
                />
                <Field
                  name="email"
                  component={Field}
                  placeholder="Email"
                  type="email"
                  source={faEnvelope}
                />
                <Field
                  name="password"
                  component={Field}
                  placeholder="Password"
                  type="password"
                  source={faKey}
                />

                <button className="main__button mb-0 mt-2 mx-auto px-4">
                  Sign Up
                </button>
              </form>
              <div className="already__have__account mt-0">
                <p>Already have an account?</p>
                <Link to="/login" className="login__now">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
