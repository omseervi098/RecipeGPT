import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./flags.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import { useAuth } from "./context/authcontext";
import ForgetPassword from "./pages/forgetPass/forgetPass";
import Recipe from "./pages/recipe/recipe";
import PreviousRecipe from "./pages/previousRecipe/previousRecipe";

config.autoAddCss = false;

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App ">
      <ToastContainer position="bottom-left" />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" /> : <SignUp />
            }
          ></Route>
          <Route
            path="/forget-password"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" />
              ) : (
                <ForgetPassword />
              )
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            path="/profile"
            element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/recipe/:id"
            element={isAuthenticated() ? <Recipe /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/previous-recipe/:id"
            element={
              isAuthenticated() ? <PreviousRecipe /> : <Navigate to="/login" />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
