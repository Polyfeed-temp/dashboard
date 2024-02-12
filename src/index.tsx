import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "@material-tailwind/react";
import '@fortawesome/fontawesome-free/css/all.min.css';
// import UserProvider from "./store/UserContext";
import "./index.css";
import { UnitContextProvider } from "./store/UnitContextProvider";

import { Provider } from "react-redux";
import { UserAuthContextProvider } from "./store/UserAuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserAuthContextProvider>
        <UnitContextProvider>
        <App />
        </UnitContextProvider>
      </UserAuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
