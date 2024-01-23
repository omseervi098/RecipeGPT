import "./dashboard.css";
import React from "react";
import MultiSelect from "../../components/multiselect/multiselect";
import { Slider } from "primereact/slider";
import DropdownwithSearch from "../../components/dropdown/dropdown";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/authcontext";
import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";
import CookingSVG from "../../asset/images/cooking.svg";
import Progressbar from "../../components/progressBar/progressBar";
const Dashboard = (props) => {
  const { user } = useAuth();
  const [instanceDetails, setInstanceDetails] = React.useState({
    ingredients: [],
    time: 5,
    type: null,
    cuisinePreference: null,
  });
  const handleChange = ({ name, value }) => {
    console.log(name, value);
    setInstanceDetails({ ...instanceDetails, [name]: value });
  };
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="dashboard py-5">
      <div className="container pb-5 pt-3">
        <div className="row mb-2 mb-sm-4">
          <div className="col-12">
            <div className="float-start">
              <h2 className="fw-bold">
                Welcome, <span className="fw-bold">{user.name}</span>{" "}
              </h2>
              <p className="text-muted">
                Welcome to your dashboard. Here you can generate recipes based
                on your preferences.
              </p>
            </div>

            <div className="float-end">
              <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Previous Recipes</h2>
                <p className="text-muted">
                  Here you can see the recipes you have generated previously.
                </p>
                <div className="d-flex flex-column justify-content-center">
                  <Divider />
                  <p className="text-muted" style={{ cursor: "pointer" }}>
                    Chole Bhature Recipe
                  </p>
                  <Divider />
                  <p className="text-muted" style={{ cursor: "pointer" }}>
                    Pav Bhaji Recipe
                  </p>
                  <Divider />
                  <p className="text-muted" style={{ cursor: "pointer" }}>
                    Dal Makhani Recipe
                  </p>
                </div>
              </Sidebar>
              <Button
                onClick={() => {
                  setVisible(true);
                }}
                className="main__button px-3"
              >
                <FontAwesomeIcon icon={faClockRotateLeft} /> &nbsp;History
              </Button>
            </div>
          </div>
        </div>
        {!loading && (
          <div className="row justify-content-center py-3">
            <div className="col-12 col-md-8">
              <div className="py-3">
                <h4 className="fw-bold">Ingredients </h4>
                <p className="text-muted">
                  Select ingredients you have in your kitchen. Select them by
                  typing name of the ingredient and selecting from the dropdown.
                </p>
                <MultiSelect
                  selectedIngredients={instanceDetails.ingredients}
                  handleChange={handleChange}
                  name={"ingredients"}
                />
              </div>
              <div className="py-3 ">
                <h4 className="fw-bold mb-3">How much time do you have? </h4>
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <h4 className="fw-bold">
                    ⏲️{" "}
                    {instanceDetails.time > 115
                      ? instanceDetails.time + "+"
                      : instanceDetails.time}{" "}
                    mins
                  </h4>
                  <Slider
                    value={instanceDetails.time}
                    onChange={(e) => {
                      if (e.value) {
                        handleChange({ name: "time", value: e.value });
                      }
                    }}
                    className="w-50 w-sm-25"
                    step={10}
                    max={120}
                    min={5}
                  />
                </div>
              </div>
              <div className="py-3">
                <h4 className="fw-bold">What type of dish do you want? </h4>
                <p className="text-muted">
                  Select the type of dish you want to cook from the dropdown.
                </p>
                <DropdownwithSearch
                  value={instanceDetails.type}
                  options={["Breakfast", "Lunch", "Dinner", "Snacks"]}
                  className="w-100"
                  placeholder="Select Type"
                  name="type"
                  type={"dropdown"}
                  handleChange={handleChange}
                />
              </div>
              <div className="py-3">
                <h4 className="fw-bold">What cuisine do you want? </h4>
                <p className="text-muted">
                  Select the cuisine you want to cook from the dropdown.
                </p>
                <DropdownwithSearch
                  value={instanceDetails.cuisinePreference}
                  options={["Indian", "Italian", "Mexican", "Chinese"]}
                  className="w-100"
                  placeholder="Select Cuisine"
                  name="cuisinePreference"
                  type={"dropdown"}
                  handleChange={handleChange}
                />
              </div>
              <div className="mt-3 text-center d-flex justify-content-center">
                <button
                  className="main__button px-3 px-sm-5"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 5000);
                  }}
                >
                  Generate Recipe
                </button>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="row justify-content-center py-4">
            <div className="col-12 col-md-8">
              <div className="py-3 d-flex justify-content-center align-items-center">
                <img
                  src={CookingSVG}
                  alt="cooking"
                  className="img-fluid col-6"
                />
              </div>
              <div className="py-3 d-flex justify-content-center align-items-center">
                <h4 className="fw-bold">Generating Recipe .. </h4>
              </div>
              <Progressbar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
