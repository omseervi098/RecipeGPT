import React, { useState } from "react";
//importing styles
import styles from "./signup.module.css";
//importing link from react router
import { Link, redirect, useNavigate } from "react-router-dom";
import SignUpImg from "../../asset/images/signup.svg";
import Field from "../../components/FieldForm/FieldForm";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateSignup } from "../../utils/validation";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";
import Footer from "../../components/footer/footer";
import { GoogleLogin } from "@react-oauth/google";
//importing components
const SignUp = () => {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
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
      <div className={styles.sign__up__page}>
        <div className={`${styles.wrapper} `}>
          <div className={styles.sign__up__card}>
            <div className={styles.sign__up__card__container}>
              <div className={styles.illustration}>
                <img src={SignUpImg} alt="signup" className="img-fluid" />
              </div>
              <div className={`${styles.text__content} mt-4 `}>
                <div className={`$${styles.social__media} mb-2 px-3 px-sm-5`}>
                  <GoogleLogin
                    onSuccess={(response) => {
                      googleLogin(response);
                    }}
                    onError={(error) => {
                      toast.error("Login Failed");
                    }}
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    useOneTap
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    component={Field}
                    placeholder="Username"
                    type="text"
                    source={faUser}
                    className={styles.input__field}
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

                  <button className={`main__button mb-0 mt-2 mx-auto px-4`}>
                    Sign Up
                  </button>
                </form>
                <div className={`${styles.already__have__account} mt-0`}>
                  <p>Already have an account?</p>
                  <Link to="/login" className={styles.login__now}>
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
