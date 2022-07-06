import { Theme, useTheme } from "@mui/material/styles";
import {
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FavoriteComponent } from "../../components/favorite";
import { GameModal } from "../../components/game-modal";
import { IGame } from "../../models/epic-games";
import { GameService } from "../../services/game.service";
import useFetchGames from "../../shared/hooks/useFetchGames";
import useModal from "../../shared/hooks/useModal";
import { Context } from "../../store";
import {
  SET_UNIQUE_CATEGORIES,
  SET_FILTERED_GAMES,
  SET_GAMES,
} from "../../store/types/game.type";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(
  name: string,
  selectedCategory: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedCategory.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AllGames = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();
  const [currentGame, setCurrentGame] = useState({});
  const [gameData] = useFetchGames();
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
  const { filter } = state?.epicGame;

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  useEffect(() => {
    filterWithCategory();
  }, [selectedCategory]);

  const handleGameClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, game: IGame) => {
      e.preventDefault();
      setCurrentGame(game);
      toggle();
    },
    [isShowing]
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filterWithCategory = () => {
    let filteredGames = state?.epicGame?.filter?.filteredGames || [];
    let filtered = (
      (filteredGames.length > 0 ? filteredGames : gameData) || []
    ).filter((item: IGame) =>
      selectedCategory.some((category: string) =>
        item.Categories.includes(category)
      )
    );

    dispatch({
      type: SET_FILTERED_GAMES,
      payload: filtered,
    });
  };

  return (
    <div className="container">
      <h5>{t("home.texts.categories")}</h5>
      <div className="row">
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCategory}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {(state?.epicGame?.categories || []).map((name: string) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedCategory, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>

      <h5 className="mt-5">{t("home.texts.all")}</h5>
      <div className="row">
        {(filter?.searchText != "" && filter?.searchText != null) && filter?.filteredGames?.length < 1 ? (
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              {t("search.texts.noResult")}
            </div>
          </div>
        ) : (
          (filter?.filteredGames > 0
            ? state?.epicGame?.filter?.filteredGames
            : gameData
          )?.map((game: IGame, key: number) => (
            <div className={`col-md-3 mt-5`} key={key}>
              <div className="card">
                <a
                  href="#"
                  onClick={(e) => {
                    handleGameClick(e, game);
                  }}
                >
                  <img src={game?.Cover} alt="" />
                </a>
              </div>
              <div className="card-title">{game?.Name}</div>
              <div className="price-container d-flex flex-row justify-content-between">
                <div className="price">{game?.Price}$ </div>
                <FavoriteComponent game={game} />
              </div>
            </div>
          ))
        )}
      </div>
      {/* @ts-ignore */}
      <GameModal isShowing={isShowing} toggle={toggle} data={currentGame} />
    </div>
  );
};
