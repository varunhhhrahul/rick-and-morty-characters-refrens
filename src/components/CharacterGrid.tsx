import {
  InputAdornment,
  TextField,
  Box,
  Stack,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { RootState } from "../app/rootReducer";
import {
  getCharactersForPage,
  filterCharacters,
  setPage,
} from "../slices/characterSlice";
import CharacterCard, { SkeletonCharacterCard } from "./CharacterCard";
import styles from "../assets/jss/pages/mainStyles";

interface ICharacterGridProps {}

export const CharacterGrid: React.FC<ICharacterGridProps> = (props) => {
  const dispatch = useDispatch();

  const { characters, page, nextPage, filteredCharacters, totalPages, error } =
    useSelector((state: RootState) => {
      return {
        filteredCharacters: state.character.filteredCharacters,
        characters: state.character.characters,
        page: state.character.page,
        nextPage: state.character.nextPage,
        totalPages: state.character.totalPages,
        error: state.character.error,
      };
    }, shallowEqual);

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(page);

  useEffect(() => {
    dispatch(getCharactersForPage(page) as unknown as AnyAction);
  }, [page]);

  useEffect(() => {
    if (filteredCharacters) dispatch(filterCharacters(search));
  }, [search]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    dispatch(setPage(value));
    setSearch("");
  };
  if (error) {
    return (
      <Box sx={styles.mainGrid}>
        <Typography variant="h6" fontWeight="bold" flexWrap="wrap">
          Oops! Some Error occurred
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={styles.mainGrid}>
      <Typography
        variant="h5"
        fontWeight="bold"
        flexWrap="wrap"
        align="center"
        gutterBottom
        sx={{ marginBottom: "1rem" }}
      >
        Rick and Morty Characters
      </Typography>
      <TextField
        id="outlined-password-input"
        label="Search"
        placeholder="Search for a character"
        value={search}
        sx={{ width: "100%" }}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Stack spacing={2} sx={styles.gridContainer}>
        <div>
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
        {characters === null || filteredCharacters === null ? (
          <Grid sx={{ ...styles.characterGrid, marginTop: -1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id: number) => (
              <SkeletonCharacterCard key={id} id={id} />
            ))}
          </Grid>
        ) : (
          <Grid sx={styles.characterGrid}>
            {filteredCharacters && filteredCharacters.length === 0 && (
              <div>No Character found! Try changing the name</div>
            )}
            {filteredCharacters &&
              filteredCharacters.map((character) => {
                return (
                  <CharacterCard key={character.id} character={character} />
                );
              })}
          </Grid>
        )}
      </Stack>
    </Box>
  );
};
