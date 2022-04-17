import { LOCATION } from "./../constants/index";
import { API } from "./api";

export const getLocation = async (id: number) => {
  try {
    const res = await API.get<Location>(`/${LOCATION}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
