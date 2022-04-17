import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../app/store";
import { CharacterGrid } from "./CharacterGrid";

describe("CharacterGrid", () => {
  test("should render correctly", async () => {
    const component = renderer.create(
      <Provider store={store}>
        <CharacterGrid />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
