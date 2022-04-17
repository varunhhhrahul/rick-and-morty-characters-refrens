import { Episode } from "../constants/models/Episode";
import { EPISODE } from "../constants/index";
import { API } from "./api";

export const getEpisode = async (url: string) => {
  try {
    const res = await API.get<Episode>(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
