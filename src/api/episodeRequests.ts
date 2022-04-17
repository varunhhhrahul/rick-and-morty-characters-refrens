import { Episode } from "./../constants/models/Episode";
import { EPISODE } from "./../constants/index";
import { API } from "./api";

export const getEpisode = async (id: number) => {
  try {
    const res = await API.get<Episode>(`/${EPISODE}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
