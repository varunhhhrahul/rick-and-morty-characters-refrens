import { Character } from "./../constants/models/Character";
import { Info } from "./../constants/models/Info";
import { CHARACTER } from "./../constants/index";
import { API } from "./api";

export const getCharactersForPage = async (page: number = 1) => {
  try {
    const res = await API.get<{ info: Info; results: Character[] }>(
      `/${CHARACTER}?page=${page}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
