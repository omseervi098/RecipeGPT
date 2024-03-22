import React, { useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
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
import { Dialog } from "primereact/dialog";
function NavBar(props) {
  const { width } = props;
  const { isAuthenticated, user, logout } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [customInstallPrompt, setCustomInstallPrompt] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [isInstallPrompt, setIsInstallPrompt] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(
    localStorage.getItem("isInstalled") || false
  );
  useEffect(() => {
    //Install App
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      console.log("Install Prompt", e);
      setCustomInstallPrompt(e);

      if (isInstallPrompt) {
        setIsInstallPrompt(true);
      }
    });
    //check if app is installed
    window.addEventListener("appinstalled", (evt) => {
      console.log("RecipeGPT has been installed");
      setIsInstalled(true);
      localStorage.setItem("isInstalled", true);
      setShow(false);
    });
  }, []);
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
                {isInstalled === false && (
                  <button
                    className={`m-2 ${styles.navlink} bg-white text-dark btn`}
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    Install App
                  </button>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
      <Dialog
        visible={show}
        onHide={() => {
          setShow(false);
        }}
        breakpoints={{ "960px": "60vw", "641px": "80vw" }}
      >
        <div className="d-flex flex-column align-items-center">
          <img
            src="/logo192.png"
            alt="logo"
            className="img-fluid"
            width={150}
          />
          <h4>RecipeGPT App</h4>
          <p>Install RecipeGPT App on your device for better experience</p>
          <button
            className="btn btn-outline-info"
            onClick={() => {
              customInstallPrompt.prompt();
              customInstallPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the A2HS prompt");
                } else {
                  console.log("User dismissed the A2HS prompt");
                }
                setCustomInstallPrompt(null);
              });
            }}
          >
            Install
          </button>
        </div>
      </Dialog>

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
            {isInstalled === false && (
              <button
                className={` btn-outline-secondary text-dark btn`}
                onClick={() => {
                  setShow(true);
                }}
              >
                Install App
              </button>
            )}
          </div>
        </div>
      </Sidebar>
    </Navbar>
  );
}
export default NavBar;
