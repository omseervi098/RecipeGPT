import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/authcontext";
import { RecipeProvider } from "./context/recipecontext";
import { PrimeReactProvider } from "primereact/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "primereact/resources/themes/lara-light-cyan/theme.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="196314351017-uuvqotc854ht9q4n8ck4frhua9028sta.apps.googleusercontent.com">
      <AuthProvider>
        <RecipeProvider>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </RecipeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
