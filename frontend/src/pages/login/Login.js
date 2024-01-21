import React from "react";
//imoprting components
//importing styles
import "./login.css";
//importing link from react router
import { Link } from "react-router-dom";
import LoginImg from "../../asset/images/login.svg";
import Field from "../../components/FieldForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
//login component
const Login = ({
  handleSubmit,
  loginWithGoogle,
  loginWithFacebook,
  loginWithGithub,
}) => {
  //rendering errors
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="header">{error}</div>;
    }
  };
  return (
    <div className="login__page">
      <div className="wrapper ">
        <div className="login__card ">
          <div className="login__card__container">
            <div className="illustration">
              <img src={LoginImg} alt="login" />
            </div>
            <div className="text__content">
              <div className="social__media w-100 ">
                <div
                  className="main__button px-3"
                  onClick={() => loginWithGoogle()}
                >
                  <FontAwesomeIcon icon={faGoogle} size={"2x"} /> &nbsp;Continue
                  with Google
                </div>
              </div>
              <p>or use your email account:</p>
              <form onSubmit={handleSubmit} className="">
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
                <Link className="forgot__password " to="">
                  Forgot your password?
                </Link>
                <button className="main__button mx-auto px-3">Login</button>
              </form>
              <div className="not__a__member mt-0">
                <p>Not a member?</p>
                <Link to="/signup" className="sign__up__now">
                  Signup now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
