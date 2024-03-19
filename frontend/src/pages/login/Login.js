import React from "react";
import styles from "./login.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import LoginImg from "../../asset/images/login.svg";
import Field from "../../components/FieldForm/FieldForm";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { validateLogin } from "../../utils/validation";
import { useAuth } from "../../context/authcontext";
import Footer from "../../components/footer/footer";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="header">{error}</div>;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await validateLogin({ email, password });
      await login(email, password);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className={styles.login__page}>
        <div className={`${styles.wrapper} `}>
          <div className={styles.login__card}>
            <div className={styles.login__card__container}>
              <div className={styles.illustration}>
                <img src={LoginImg} alt="login" />
              </div>
              <div className={styles.text__content}>
                <div className={`${styles.social__media} w-100 `}>
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
                <p>or use your email account:</p>
                <form onSubmit={handleLogin} className="">
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
                  <Link
                    className={`${styles.forgot__password} `}
                    to="/forget-password"
                  >
                    Forgot your password?
                  </Link>
                  <button className="main__button mx-auto px-3">Login</button>
                </form>
                <div className={`${styles.not__a__member} mt-0`}>
                  <p>Not a member?</p>
                  <Link to="/signup" className={styles.sign__up__now}>
                    Signup now
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
export default Login;
