import React, { useState, useEffect, SetStateAction } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Avatar,
  Stack,
  Rating,
  CardMedia,
  Chip,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Skeleton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../slices/alertSlice";
import styles from "../assets/jss/components/characterCardStyles";
import { Character } from "../constants/models/Character";
import { Location } from "../constants/models/Location";
import { Episode } from "../constants/models/Episode";
import { getLocation } from "../api/locationRequests";
import { getEpisode } from "../api/episodeRequests";

interface ICharacterCardProps {
  character: Character;
}
interface ISkeletonCharacterCardProps {
  id: number;
}

const CharacterCard: React.FC<ICharacterCardProps> = ({ character }) => {
  const dispatch = useDispatch();
  const [originLocation, setOriginLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [chapters, setChapters] = useState<Episode[]>([]);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [moreChapters, setMoreChapters] = useState<Episode[]>([]);
  const [moreChapterLoading, setMoreChapterLoading] = useState(false);

  const getLocations = async () => {
    try {
      setLocationLoading(true);
      if (character.origin.url.length > 0) {
        const originLocationData = await getLocation(character.origin.url);

        setOriginLocation(
          originLocationData as SetStateAction<Location | null>
        );
      } else {
        setOriginLocation({
          created: new Date(Date.now()),
          dimension: "unknown",
          id: -1,
          name: "unknown",
          type: "unknown",
          url: "unknown",
          residents: [],
        } as unknown as SetStateAction<Location | null>);
      }
      if (character.location.url.length > 0) {
        const currentLocationData = await getLocation(character.location.url);

        setCurrentLocation(
          currentLocationData as unknown as SetStateAction<Location | null>
        );
      } else {
        setCurrentLocation({
          created: new Date(Date.now()),
          dimension: "unknown",
          id: -1,
          name: "unknown",
          type: "unknown",
          url: "unknown",
          residents: [],
        } as unknown as SetStateAction<Location | null>);
      }

      setLocationLoading(false);
    } catch (error: any) {
      console.log(error);
      setLocationLoading(false);
      dispatch(setErrorMsg(`Page Error:  ${error.response.data.error}`));
    }
  };
  const getEpisodeData = async (
    episodeLinks: string[],
    fromModal: boolean = false
  ) => {
    const setLoading = fromModal ? setMoreChapterLoading : setChapterLoading;
    const setEpisodes = fromModal ? setMoreChapters : setChapters;
    const episodes = fromModal ? moreChapters : chapters;
    try {
      setLoading(true);
      const episodeData: Episode[] = [];
      for (let i = 0; i < episodeLinks.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const data = await getEpisode(episodeLinks[i]);

        episodeData.push(data);
      }
      setEpisodes([...episodes, ...episodeData]);

      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      dispatch(setErrorMsg(error));
    }
  };

  useEffect(() => {
    getLocations();
    getEpisodeData(character.episode.slice(0, 3));
  }, []);

  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Card sx={styles.card}>
      <Box>
        <Box
          sx={{
            height: "200px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={character.image}
            alt={character.name}
            sx={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent sx={styles.cardContent}>
          <Box sx={styles.characterName}>
            <Typography
              variant="h6"
              fontWeight="bold"
              flexWrap="wrap"
              width="60%"
            >
              {character.name}
            </Typography>
            <Box>
              <Typography variant="h6" sx={styles.characterStatus}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    marginRight: 5,
                    backgroundColor:
                      character.status === "Dead"
                        ? "red"
                        : character.status === "Alive"
                        ? "green"
                        : "yellow",
                  }}
                />{" "}
                {character.status}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.characterName}>
            <Typography variant="subtitle1">
              {character.species} - {character.gender}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Origin</Typography>

            {originLocation === null ? (
              <Skeleton animation="wave" sx={{ width: "100%" }} />
            ) : (
              <Typography variant="subtitle1">
                <strong>Name:</strong> <em>{originLocation.name}</em>
                <br />
                <strong>Dimension:</strong> <em>{originLocation.dimension}</em>
                <br /> <strong>Residents:</strong>{" "}
                <em>
                  {originLocation.residents && originLocation.residents.length}{" "}
                </em>
                residents
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="h6">Current Location</Typography>

            {currentLocation === null ? (
              <Skeleton animation="wave" sx={{ width: "100%" }} />
            ) : (
              <Typography variant="subtitle1">
                <strong>Name:</strong> <em>{currentLocation.name}</em>
                <br />
                <strong>Dimension:</strong> <em>{currentLocation.dimension}</em>
                <br /> <strong>Residents:</strong>{" "}
                <em>
                  {currentLocation.residents &&
                    currentLocation.residents.length}{" "}
                </em>
                residents
              </Typography>
            )}
          </Box>
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Typography variant="h6">Episodes</Typography>
              {!chapterLoading && character.episode.length > 3 && (
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    getEpisodeData(character.episode, true);
                  }}
                >
                  Show More
                </Button>
              )}
            </div>
            <br />
            {chapterLoading ? (
              <Skeleton animation="wave" sx={{ width: "100%" }} />
            ) : (
              <Typography variant="subtitle1">
                {chapters.map((episode: Episode, index: number) => {
                  return (
                    <li
                      key={episode.id}
                      style={{
                        listStylePosition: "outside",
                      }}
                    >
                      {episode.episode} - {episode.name}
                    </li>
                  );
                })}
              </Typography>
            )}
          </Box>
        </CardContent>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="character-episode"
        >
          <Box sx={styles.modalStyle}>
            <Box sx={{}}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Episodes <strong>{character.name}</strong> appeared in
              </Typography>
            </Box>
            <Box sx={{ height: "300px", overflowY: "scroll" }}>
              {moreChapterLoading ? (
                <Box sx={{ marginTop: 2 }}>
                  {[1, 2, 3, 4, 5].map((id: number) => (
                    <Skeleton
                      key={id}
                      animation="wave"
                      sx={{ width: "100%" }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  {moreChapters.map((episode: Episode, index: number) => {
                    return (
                      <li
                        key={episode.id}
                        style={{
                          listStylePosition: "outside",
                        }}
                      >
                        {episode.episode} - {episode.name}
                      </li>
                    );
                  })}
                </Typography>
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    </Card>
  );
};

export const SkeletonCharacterCard: React.FC<ISkeletonCharacterCardProps> = ({
  id,
}) => {
  return (
    <Card sx={styles.card}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={300}
        height={800}
      />
    </Card>
  );
};

export default CharacterCard;
