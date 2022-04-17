import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { Character } from "../constants/models/Character";
import { setErrorMsg } from "./alertSlice";
import * as REQUESTS from "../api/characterRequests";

export interface characterState {
  loading: boolean;
  characters: Character[] | null;
  filteredCharacters: Character[] | null;
  character: Character | null;
  page: number;
  nextPage: number | null;
  totalPages: number;
}

export const initialState: characterState = {
  loading: false,
  characters: null,
  filteredCharacters: null,
  character: null,
  page: 1,
  nextPage: null,
  totalPages: 1,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setNextPage(state, action: PayloadAction<number | null>) {
      state.nextPage = action.payload;
    },
    setCharacters(state, action: PayloadAction<Character[] | null>) {
      state.characters = action.payload;
      state.filteredCharacters = action.payload;
    },
    setCharacter(state, action: PayloadAction<Character | null>) {
      state.character = action.payload;
    },
    filterCharacters(state, action: PayloadAction<string>) {
      state.filteredCharacters = state.characters!.filter((character) =>
        character.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  setLoading,
  setCharacter,
  setCharacters,
  filterCharacters,
  setPage,
  setTotalPages,
  setNextPage,
} = characterSlice.actions;

export default characterSlice.reducer;

export const getCharactersForPage =
  (page: number = 1): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const data = await REQUESTS.getCharactersForPage(page);
      dispatch(setTotalPages(data.info.pages));
      if (data.info.next) {
        const nextPage = data.info.next.split("=")[1];
        dispatch(setNextPage(parseInt(nextPage, 10)));
      } else {
        dispatch(setNextPage(null));
      }
      dispatch(setCharacters(data.results));
      dispatch(setLoading(false));
    } catch (error: any) {
      console.log(error);
      dispatch(setLoading(false));
      if (error) {
        dispatch(setErrorMsg(error));
      }
    }
  };
