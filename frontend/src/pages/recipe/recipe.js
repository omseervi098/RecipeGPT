import React, { useEffect } from "react";
import { useRecipe } from "../../context/recipecontext";
import { Sidebar } from "primereact/sidebar";
import { useAuth } from "../../context/authcontext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import IntroDashboard from "../../components/IntroDashboard/IntroDashboard";

export default function Recipe() {
  const { recipe, instancedetails, rating, previousRecipes, rateRecipe } =
    useRecipe();
  const params = useParams();
  console.log(recipe);
  const { user } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(recipe, instancedetails, rating, previousRecipes, params.id);
  // }, []);
  const [ratingValue, setRatingValue] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="recipe py-5">
      <div className="container pb-5 pt-3">
        <IntroDashboard />
        <div className="row justify-content-center py-4 h-100">
          <div className="col-12 col-md-8 " style={{ maxHeight: "100%" }}>
            <Card className="py-3 px-3 h-100">
              {recipe === "No recipe found" ? (
                <h4 className="fw-bold">No recipe found</h4>
              ) : (
                <>
                  <h4 className="fw-bold">Your Recipe </h4>
                  <p className="text-muted ">
                    Here is the recipe generated based on your preferences.
                  </p>
                  <div className="py-3">
                    <h4> {recipe.recommended.title}</h4>
                    <p className="text-muted">
                      <span className="fw-bold">Ingredients: </span>
                      <div className="d-flex flex-column p-2">
                        {recipe.recommended.ingredients.map(
                          (ingredient, index) => {
                            return (
                              <li key={index} className="px-2">
                                {ingredient.replace('"', "")}
                              </li>
                            );
                          }
                        )}
                      </div>
                    </p>
                    <p className="text-muted">
                      <span className="fw-bold">Directions: </span>
                      <div className="d-flex flex-column p-2">
                        {recipe.recommended.directions.map(
                          (direction, index) => {
                            return (
                              <li key={index} className="px-2">
                                {direction.replace('"', "")}
                              </li>
                            );
                          }
                        )}
                      </div>
                    </p>
                  </div>
                </>
              )}
            </Card>
          </div>
          <div
            className="col-12 d-none col-md-4 d-md-flex"
            style={{ maxHeight: "100%" }}
          >
            <Card className="py-3 px-3 h-100">
              <h4 className="fw-bold">Requested Details</h4>
              <p className="text-muted m-0">
                Here are the details of the request you made for the recipe.
              </p>
              <div className="py-3">
                <div className="text-muted m-0">
                  <span className="fw-bold">Ingredients: </span>
                  <div className="d-flex flex-column p-2 pb-0">
                    {instancedetails.ingredients.map((ingredient, index) => {
                      return (
                        <p key={index} className="px-2">
                          {ingredient.icon} {ingredient.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="text-muted m-0">
                  <span className="fw-bold">Allergies: </span>
                  <div className="d-flex flex-column p-2 pb-0">
                    {user.foodPreferences &&
                      user.foodPreferences.allergies &&
                      user.foodPreferences.allergies.map((allergy, index) => {
                        return (
                          <p key={index} className="px-2">
                            {allergy.icon} {allergy.name}
                          </p>
                        );
                      })}
                  </div>
                </div>
                {/* <div className="text-muted m-0">
                  <span className="fw-bold">Favorite Ingredients: </span>
                  <div className="d-flex flex-column p-2 pb-0">
                    {user.foodPreferences &&
                      user.foodPreferences.favouriteIngredients &&
                      user.foodPreferences.favouriteIngredients.map(
                        (ingredient, index) => {
                          return (
                            <p key={index} className="px-2">
                              {ingredient.icon} {ingredient.name}
                            </p>
                          );
                        }
                      )}
                  </div>
                </div> */}
                {instancedetails.cuisine && (
                  <div className="text-muted">
                    <span className="fw-bold">Cuisine: </span>
                    {instancedetails.cuisine}
                  </div>
                )}
                {instancedetails.dishType && (
                  <div className="text-muted">
                    <span className="fw-bold">Dish Type: </span>
                    {instancedetails.dishType}
                  </div>
                )}
                <div className="text-muted">
                  <span className="fw-bold">Diet: </span>
                  {user.foodPreferences.dietPreference}
                </div>
                {ratingValue && (
                  <div className="text-muted ">
                    <span className="fw-bold">Rating: </span>
                    <div className="d-flex justify-content-center">
                      <Rating
                        value={ratingValue}
                        cancel={false}
                        onIcon={
                          <img
                            src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png"
                            alt="custom"
                            width="30px"
                            height="30px"
                          />
                        }
                        offIcon={
                          <img
                            src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png"
                            alt="custom"
                            width="30px"
                            height="30px"
                          />
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-12">
            <div className="d-flex justify-content-center">
              <Button
                className="main__button px-3 mt-3"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <FontAwesomeIcon icon={faClockRotateLeft} /> &nbsp;Generate
                Another Recipe
              </Button>
              <Button
                className="main__button px-3 mt-3 ms-3"
                onClick={() => setModalShow(true)}
              >
                <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;
                {ratingValue ? "Update Rating" : "Rate Recipe"}
              </Button>
            </div>
            <div className="d-flex flex-column justify-content-center mt-3 align-items-center">
              <div className="text-muted mb-2"> Other Recipes </div>
              <div className="container justify-content-center gap-2 ">
                <div className="row justify-content-center gap-4">
                  {recipe.allRecipes &&
                    recipe.allRecipes.map((reci, index) => {
                      if (reci.title !== recipe.recommended.title)
                        return (
                          <Card key={index} className="col-12 col-lg-5 p-3">
                            <Card.Title>{reci.title}</Card.Title>
                            <Card.Text>
                              <span className="fw-bold">Ingredients: </span>
                              <div className="d-flex flex-column p-2">
                                {reci.ingredients.map((ingredient, index) => {
                                  return (
                                    <li key={index} className="px-2">
                                      {ingredient.replace('"', "")}
                                    </li>
                                  );
                                })}
                              </div>
                            </Card.Text>
                          </Card>
                        );
                    })}
                </div>
              </div>
            </div>
          </div>
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Rate {recipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-muted text-center mb-2">
                Rate the recipe based on your experience.
              </p>
              <div className="d-flex justify-content-center">
                <Rating
                  value={ratingValue}
                  onChange={(e) => {
                    setRatingValue(e.value);
                    rateRecipe(params.id, e.value);
                  }}
                  onIcon={
                    <img
                      src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png"
                      alt="custom"
                      width="30px"
                      height="30px"
                    />
                  }
                  offIcon={
                    <img
                      src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png"
                      alt="custom"
                      width="30px"
                      height="30px"
                    />
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="main__button px-3"
                onClick={() => setModalShow(false)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
