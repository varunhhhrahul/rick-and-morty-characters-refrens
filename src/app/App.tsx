import React from "react";
import { Provider } from "react-redux";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "../components/Alert/AlertTemplate";
import { Alerts } from "../components/Alert/Alert";
import { CharacterGrid } from "../components/CharacterGrid";

import store from "./store";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <ThemeProvider theme={theme}>
          <Alerts />
          <CharacterGrid />
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  );
};

export default App;
