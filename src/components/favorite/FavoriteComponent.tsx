import React, { useContext } from "react";
import { Context } from "../../store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import {
  ADD_FAVORITE_GAMES,
  REMOVE_FAVORITE_GAMES,
} from "../../store/types/game.type";
import { IGame } from "../../models/epic-games";

type IFavoriteProps = {
  game: IGame;
};

export const FavoriteComponent = (props: IFavoriteProps) => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  let { game } = props;
  let favoriteGames = (state?.epicGame?.games || []).filter((game: IGame) =>
    state?.epicGame?.favoriteGames?.includes(game.Id)
  );

  const toggleFavoriteGame = (e: any, gameId: number) => {
    e.preventDefault();
    let hasFavorite = state?.epicGame?.favoriteGames?.includes(gameId);

    if (!hasFavorite) {
      dispatch({
        type: ADD_FAVORITE_GAMES,
        payload: game.Id,
      });
    } else {
      dispatch({
        type: REMOVE_FAVORITE_GAMES,
        payload: game.Id,
      });
    }
  };

  return (
    <div className="likes">
      <IconButton
        size="large"
        onClick={(event) => {
          toggleFavoriteGame(event, game.Id);
        }}
      >
        {favoriteGames?.find((item: IGame) => item.Id === game.Id) ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
      {game?.Likes}
    </div>
  );
};
