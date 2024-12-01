import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const THEME = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
});

root.render(
  <ThemeProvider theme={THEME}>
    {/*<React.StrictMode> */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
