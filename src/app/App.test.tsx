import { act } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

describe("App", () => {
  it("renders without crashing", async () => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div);
    await act(async () => root.render(<App />));
    root.unmount();
  });
});
