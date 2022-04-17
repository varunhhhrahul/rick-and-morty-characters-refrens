import React from "react";
import {
  waitFor,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../app/store";
import CharactedCard from "./CharacterCard";

const character = {
  created: new Date("2017-11-04T18:48:46.250Z"),
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  gender: "Male",
  id: 1,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  name: "Rick Sanchez",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  species: "Human",
  status: "Alive",
  type: "",
  url: "https://rickandmortyapi.com/api/character/1",
};
let component: renderer.ReactTestRenderer | null = null;
describe("CharacterCard", () => {
  beforeEach(async () => {
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <CharactedCard character={character} />
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
  test("should render correctly with image", async () => {
    await waitFor(() =>
      expect(component!.root.findByType("img").props.src).toBe(character.image)
    );
  });
  test("should render title correctly", async () => {
    await waitFor(() =>
      expect(
        component!.root.findAllByType("h6")[0].children.includes(character.name)
      ).toBe(true)
    );
  });
});
