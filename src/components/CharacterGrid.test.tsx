import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../app/store";
import { CharacterGrid } from "./CharacterGrid";

let component: renderer.ReactTestRenderer | null = null;

describe("CharacterGrid", () => {
  beforeEach(async () => {
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <CharacterGrid />
        </Provider>
      );
    });
  });

  afterEach(() => {
    component = null;
  });
  test("should render correctly", async () => {
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
