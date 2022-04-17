import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const API = axios.create({
  baseURL: BASE_URL,
});
