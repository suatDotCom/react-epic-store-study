import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { FavoriteComponent } from "../../components/favorite";
import { IGame } from "../../models/epic-games";
import "./MyLibrary.css";
import { GameModal } from "../../components/game-modal";
import useModal from "../../shared/hooks/useModal";
import { useTranslation } from "react-i18next";
import useFetchGames from "../../shared/hooks/useFetchGames";
import Button from "@mui/material/Button";

export const MyLibrary = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();
  const { isShowing, toggle } = useModal();
  const [currentGame, setCurrentGame] = useState({});
  const [gameData] = useFetchGames();

  const handleGameClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, game: IGame) => {
      e.preventDefault();
      setCurrentGame(game);
      toggle();
    },
    [isShowing]
  );

  let favoriteGames = state?.epicGame?.games?.filter((game: IGame) =>
    state?.epicGame?.favoriteGames?.includes(game.Id)
  );

  let purchasedGames = state?.epicGame?.games?.filter((game: IGame) =>
    state?.epicGame?.purchasedGames?.includes(game.Id)
  );

  return (
    <div className="container">
      <div className="row">
        <h5>{t("navigation.buttons.favoriteGames")}</h5>

        {favoriteGames?.map((game: IGame, key: number) => (
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
        ))}
      </div>

      <div className="row mt-5">
        <h5>{t("myLibrary.texts.purchasedGames")}</h5>
        {purchasedGames?.map((game: IGame, key: number) => (
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
              <Button variant="contained" color="success">
                {t('myLibrary.buttons.purchased')}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* @ts-ignore */}
      <GameModal isShowing={isShowing} toggle={toggle} data={currentGame} />
    </div>
  );
};
