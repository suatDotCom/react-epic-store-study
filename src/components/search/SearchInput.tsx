import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import "./SearchInput.css";
import { Context } from "../../store";
import { IGame } from "../../models/epic-games";
import {
  SET_FILTERED_GAMES,
  SET_SEARCH_TEXT,
} from "../../store/types/game.type";
import { useNavigate } from "react-router-dom";
export const SearchInput = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();
  const [filteredGames, setFilteredGames] = useState<IGame[]>([]);
  const navigate = useNavigate();

  const [isShowing, setIsShowing] = useState(false);

  const handleClose = () => {
    setIsShowing(false);
    navigate("/all-games");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.currentTarget.value.toLowerCase();

    let filtered = state.epicGame.games.filter((item: IGame) => {
      const arr = searchValue.split(" ");
      return arr.some(
        (el) =>
          item.Name.toLowerCase().includes(el) ||
          item.Summary.toLowerCase().includes(el)
      );
    });

    setFilteredGames(filtered);
    setIsShowing(true);

    dispatch({
      type: SET_FILTERED_GAMES,
      payload: filtered,
    });
    dispatch({
      type: SET_SEARCH_TEXT,
      payload: searchValue,
    });
  };

  return (
    <div className="search">
      <SearchIcon className="search-icon-for-input" />
      <input
        type="text"
        className="search-input"
        placeholder={t("search.texts.search")}
        onChange={(e) => handleSearch(e)}
        onBlur={() => handleClose()}
      ></input>
        <Box sx={boxStyles} className={isShowing ? "" : "d-none"}>
          <List className="search-list" >
            {filteredGames?.length > 0 ? (
              filteredGames?.map((game: IGame, key: number) => (
                <ListItem key={key}>
                  <ListItemButton>
                    <ListItemText secondary={game.Name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <ListItem disablePadding>
                <ListItemText
                  secondary={t("search.texts.noResult")}
                  className="p-2"
                />
              </ListItem>
            )}
          </List>
        </Box>
    </div>
  );
};

const boxStyles = {
  width: "250px",
  maxWidth: 300,
  bgcolor: "#202020",
  overflowY: "auto",
  position: "absolute",
  top: "73%",
  left: " -10px",
  zIndex: -1,
  borderRadius: "7px",
  
};
