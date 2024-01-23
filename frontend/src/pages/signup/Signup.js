import React, { useState } from "react";
//importing styles
import "./signup.css";
//importing link from react router
import { Link, redirect, useNavigate } from "react-router-dom";
import SignUpImg from "../../asset/images/signup.svg";
import Field from "../../components/FieldForm/FieldForm";
import {
  faGoogle,
  faKeybase,
  faKeycdn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateSignup } from "../../utils/validation";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";
import Footer from "../../components/footer/footer";
//importing components
const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  //rendering errors
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="header">{error}</div>;
    }
  };
  const loginWithGoogle = () => {
    console.log("google");
  };
  const handleSubmit = async (formValues) => {
    formValues.preventDefault();
    const username = formValues.target.username.value;
    const email = formValues.target.email.value;
    const password = formValues.target.password.value;
    try {
      await validateSignup({ username, email, password });
      await signup(username, email, password);
      toast.success("User Created Successfully");
      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
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
                    <FontAwesomeIcon icon={faGoogle} size={"2x"} />{" "}
                    &nbsp;Continue with Google
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
      <Footer />
    </>
  );
};
export default SignUp;
