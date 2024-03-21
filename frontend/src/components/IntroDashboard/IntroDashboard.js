import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import { useRecipe } from "../../context/recipecontext";
import { Sidebar } from "primereact/sidebar";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "primereact/rating";
import styles from "./IntroDashboard.module.css";
import { toast } from "react-toastify";
function IntroDashboard(props) {
  const param = useParams();

  const { previousRecipes, getAllRecipes } = useRecipe();
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="row mb-2 mb-sm-4">
      <div className="col-12">
        <div className="float-start">
          <h2 className="fw-bold">
            Welcome, <span className="fw-bold">{user.name}</span>{" "}
          </h2>
          <p className="text-muted">
            Welcome to your dashboard. Here you can generate recipes based on
            your preferences.
          </p>
        </div>

        <div className="float-end">
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            header={<h2>Previous Recipes</h2>}
          >
            <p className="text-muted m-0">
              Here you can see the recipes you have generated previously.
            </p>

            <div className="d-flex flex-column justify-content-center ">
              {historyLoading && (
                <div className="text-center" style={{ marginTop: "10%" }}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {previousRecipes.length === 0 && !historyLoading && (
                <>
                  <Divider />
                  <div className="py-0">No previous recipes found</div>
                </>
              )}
              {previousRecipes.length > 0 &&
                previousRecipes.map((recipe, index) => {
                  return (
                    <div key={index}>
                      <Divider />
                      <div
                        key={index}
                        className={`text-muted  p-2  ${styles.recipecard} ${
                          param.id === recipe.id ? styles.active : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("/previous-recipe/" + recipe.id);
                          setVisible(false);
                        }}
                      >
                        <h5 className="text-muted">{recipe.title}</h5>

                        <div className=" d-flex justify-content-between">
                          <Rating
                            value={recipe.rating}
                            readOnly
                            cancel={false}
                            onIcon={
                              <img
                                src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png"
                                alt="custom"
                                width="20px"
                                height="20px"
                              />
                            }
                            offIcon={
                              <img
                                src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png"
                                alt="custom"
                                width="18px"
                                height="18px"
                              />
                            }
                          />{" "}
                          <span className="text-muted text-end">
                            {new Date(recipe.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Sidebar>
          <Button
            onClick={async () => {
              setVisible(true);
              setHistoryLoading(true);
              try {
                await getAllRecipes(user);
              } catch (err) {
                toast.error(err.message);
              }
              setHistoryLoading(false);
            }}
            className="main__button px-3"
          >
            <FontAwesomeIcon icon={faClockRotateLeft} /> &nbsp;History
          </Button>
        </div>
      </div>
    </div>
  );
}
export default IntroDashboard;
