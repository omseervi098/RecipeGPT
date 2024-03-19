import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
// Action Types
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

// Initial State
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Reducer Function
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
const AuthContext = createContext();
// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decode and verify token if necessary
      // For simplicity, we assume the token is valid here
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: SET_USER, payload: user });
    }
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/login";
      const response = await axios.post(url, { email, password });
      const { token, user } = response.data;
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  //signup function
  const signup = async (username, email, password) => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/register";
      const response = await axios.post(url, { username, email, password });
      const { token, user } = response.data;
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("previousRecipes");
    googleLogout();
    dispatch({ type: LOGOUT });
  };
  //google login
  const googleLogin = async (props) => {
    try {
      const url =
        process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/google/auth";
      const response = await axios.post(url, props);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      console.log(err);
    }
  };
  // isAuthenticated Function
  const isAuthenticated = () => {
    return state.isLoggedIn;
  };
  //update profile
  const updateUser = async (newUserData, userid) => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/users/update";
      const response = await axios.put(
        url,
        {
          newUserData,
          userid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  // update food preferences
  const updateFoodPreferences = async (newFoodPreferences, userid) => {
    try {
      const url =
        process.env.REACT_APP_BACKEND_URL + "/api/v1/users/updatefoodpref";
      const response = await axios.put(
        url,
        {
          newFoodPreferences,
          userid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
        isAuthenticated,
        updateUser,
        updateFoodPreferences,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
