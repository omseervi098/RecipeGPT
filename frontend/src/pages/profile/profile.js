import React from "react";
import profileImg from "../../asset/images/profile.svg";
import { useAuth } from "../../context/authcontext";
import "./profile.css";
import {
  validateFoodPreferences,
  validateUpdate,
} from "../../utils/validation";
import { toast } from "react-toastify";
import EditableFieldForm from "../../components/EditableFieldForm/EditableFieldForm";
import Countries from "../../utils/countries.json";
import MultiSelect from "../../components/multiselect/multiselect";
import MultiCheckBox from "../../components/mutlicheckbox/multicheckbox";
const Profile = () => {
  const { user, updateUser, updateFoodPreferences } = useAuth();

  const [userState, setUserState] = React.useState({
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    nationality: user.nationality,
    dob: user.dob,
  });
  const [foodPreferences, setFoodPreferences] = React.useState({
    allergies: user.foodPreferences ? user.foodPreferences.allergies : null,
    favouriteIngredients: user.foodPreferences
      ? user.foodPreferences.favouriteIngredients
      : null,
    levelOfCooking: user.foodPreferences
      ? user.foodPreferences.levelOfCooking
      : null,
    caloriesRequired: user.foodPreferences
      ? user.foodPreferences.caloriesRequired
      : null,
    dietPreference: user.foodPreferences
      ? user.foodPreferences.dietPreference
      : [],
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(userState, user);
      await validateUpdate(userState, user);
      const userid = user._id ? user._id : user.id;
      await updateUser(userState, userid);
      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error(err.message);
      setUserState(user);
    }
  };
  const handleFoodPreferencesUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(foodPreferences, user);
      await validateFoodPreferences(foodPreferences, user);
      const userid = user._id ? user._id : user.id;
      await updateFoodPreferences({ ...foodPreferences }, userid);
      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error(err.message);
      setFoodPreferences(user.foodPreferences);
    }
  };
  const handleFoodPreferencesChange = async ({ name, value }) => {
    console.log(name, value);
    setFoodPreferences({ ...foodPreferences, [name]: value });
  };
  const handleProfileChange = async ({ name, value, type }) => {
    console.log(name, value, type);
    setUserState({ ...userState, [name]: value });
  };
  return (
    <div className="py-5 profile">
      <div className="container py-3">
        <div className="row align-items-center gap-3 justify-content-around">
          <div className="col-10 col-md-8 col-lg-4 col-xl-4">
            <div className="profile__img">
              <img src={profileImg} alt="profile" className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-6">
            <h1 className="text-center">Profile</h1>
            <div className="profiledetails d-flex flex-column align-items-center justify-content-center">
              {" "}
              <EditableFieldForm
                value={userState.name}
                handleChange={handleProfileChange}
                label={"Name"}
                name={"name"}
                type={"text"}
              />
              <EditableFieldForm
                value={userState.username}
                handleChange={handleProfileChange}
                label={"Username"}
                name={"username"}
                type={"text"}
              />
              <EditableFieldForm
                value={userState.email}
                handleChange={handleProfileChange}
                label={"Email"}
                name={"email"}
                type={"text"}
              />
              <EditableFieldForm
                value={userState.phone}
                handleChange={handleProfileChange}
                label={"Phone no"}
                name={"phone"}
                type={"text"}
              />
              <EditableFieldForm
                value={userState.dob}
                handleChange={handleProfileChange}
                label={"Date of Birth"}
                name={"dob"}
                type={"date"}
              />
              <EditableFieldForm
                value={userState.nationality}
                handleChange={handleProfileChange}
                label={"Nationality"}
                name={"nationality"}
                placeholder={"Select Nationality"}
                type={"dropdown"}
                className={"nationalitydropdown"}
                options={Countries}
              />
              <button
                className="main__button mt-3 px-3 px-sm-5"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-12 mt-3">
            <h2 className="text-center">Food Preferences</h2>
          </div>
          <div className="col-md-8 mt-3">
            {/* <EditableFieldForm
              value={foodPreferences.levelOfCooking}
              handleChange={handleFoodPreferencesChange}
              label={"Level of Cooking"}
              name={"levelOfCooking"}
              placeholder={"Select Level"}
              className={"nationalitydropdown"}
              type={"dropdown"}
              options={["Beginner", "Intermediate", "Advanced", "Professional"]}
            />
            <EditableFieldForm
              value={foodPreferences.caloriesRequired}
              handleChange={handleFoodPreferencesChange}
              label={"Calories Required Per Day"}
              name={"caloriesRequired"}
              type={"dropdown"}
              className={"nationalitydropdown"}
              placeholder={"Select Calories"}
              options={["1000-1500", "1500-2000", "2000-2500", "2500-3000"]}
            /> */}
            <div className="mt-3">
              <h4 className="fw-bold">Diet Preference </h4>
              <p className="text-muted">
                Do you follow any specific diet? Add them here by selecting from
                the dropdown.
              </p>
              <MultiCheckBox
                dietType={foodPreferences.dietPreference}
                handleChange={handleFoodPreferencesChange}
                name={"dietPreference"}
              />
            </div>

            <div className="mt-3">
              <h4 className="fw-bold">Allegies </h4>
              <p className="text-muted">
                Do you have any allergies to specific food items or ingredients?
                Add them here by typing name of the ingredient and selecting
                from the dropdown.
              </p>
              <MultiSelect
                selectedIngredients={foodPreferences.allergies}
                handleChange={handleFoodPreferencesChange}
                name={"allergies"}
              />
            </div>
            {/* <div className="mt-3">
              <h4 className="fw-bold">Favourite Ingredients </h4>
              <p className="text-muted">
                Do you have any favourite ingredients? Add them here to avoid
                adding them manually every time you generate a recipe.
              </p>
              <MultiSelect
                selectedIngredients={foodPreferences.favouriteIngredients}
                handleChange={handleFoodPreferencesChange}
                name={"favouriteIngredients"}
              />
            </div> */}
            <div className="mt-3 text-center d-flex justify-content-center">
              <button
                className="main__button px-3 px-sm-5"
                onClick={handleFoodPreferencesUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
