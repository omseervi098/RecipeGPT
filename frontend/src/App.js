import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
config.autoAddCss = false;

function App() {
  return (
    <div className="App ">
      <ToastContainer />

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
