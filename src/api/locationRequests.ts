import { LOCATION } from "../constants/index";
import { API } from "./api";

export const getLocation = async (url: string) => {
  try {
    const res = await API.get<Location | null>(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
