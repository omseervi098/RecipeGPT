import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
function NavBar(props) {
  const { width } = props;
  const { isAuthenticated, user, logout } = useAuth();
  const [visible, setVisible] = React.useState(false);
  return (
    <Navbar
      bg="transparent box-shadow w-100"
      className={styles.navbar}
      expand="lg"
    >
      <Container>
        <Link className={`${styles.navbarbrand} `} to="/">
          <img src="/logo192.png" alt="logo" className="img-fluid" width={50} />{" "}
          RecipeGPT
        </Link>
        {width < 992 ? (
          <Button onClick={() => setVisible(true)} variant="light">
            <FontAwesomeIcon icon={faBars} />
          </Button>
        ) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="p-2">
                <Link
                  className={`m-2 ${styles.navlink}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
                <Link className={`m-2 ${styles.navlink}`} to="/about">
                  About
                </Link>

                {isAuthenticated() ? (
                  <>
                    <Link className={`m-2 ${styles.navlink}`} to="/dashboard">
                      Dashboard
                    </Link>
                    <Link className={`m-2 ${styles.navlink}`} to="/profile">
                      Profile
                    </Link>
                    <Link
                      className={`m-2 ${styles.navlink}`}
                      to="/"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className={`m-2 ${styles.navlink}`} to="/signup">
                      Sign Up
                    </Link>
                    <Link className={`m-2 ${styles.navlink}`} to="/login">
                      Login
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div
          className="d-flex flex-column justify-content-between "
          style={{ height: "80vh" }}
        >
          <div className="d-flex flex-column align-items-center ">
            <Link
              className={`m-2 ${styles.navlink}`}
              aria-current="page"
              to="/"
              onClick={() => setVisible(false)}
            >
              Home
            </Link>
            <Link
              className={`m-2 ${styles.navlink}`}
              to="/about"
              onClick={() => setVisible(false)}
            >
              About
            </Link>
            {isAuthenticated() ? (
              <>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/dashboard"
                  onClick={() => setVisible(false)}
                >
                  Dashboard
                </Link>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/profile"
                  onClick={() => setVisible(false)}
                >
                  Profile | <FontAwesomeIcon icon={faUser} /> {user.username}
                </Link>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/"
                  onClick={() => {
                    setVisible(false);
                    logout();
                  }}
                >
                  Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/signup"
                  onClick={() => setVisible(false)}
                >
                  Sign Up
                </Link>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/login"
                  onClick={() => setVisible(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="d-flex flex-column align-items-center ">
            <img
              src="/logo192.png"
              alt="logo"
              className="img-fluid"
              width={100}
              height={100}
            />
            <h2>RecipeGPT</h2>
          </div>
        </div>
      </Sidebar>
    </Navbar>
  );
}
export default NavBar;
