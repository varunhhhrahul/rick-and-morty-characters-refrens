import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { getCharactersForPage } from "../slices/characterSlice";

interface CharacterGridProps {}

export const CharacterGrid: React.FC<CharacterGridProps> = ({}) => {
  const { characters, page, nextPage } = useSelector((state: RootState) => {
    return {
      characters: state.character.characters,
      page: state.character.page,
      nextPage: state.character.nextPage,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getCharactersForPage(page));
    dispatch(getCharactersForPage(page));
  }, [dispatch, page]);

  return <div></div>;
};
