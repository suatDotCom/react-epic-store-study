import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { FavoriteComponent } from "../../components/favorite";
import { IGame } from "../../models/epic-games";
import "./MyLibrary.css";
import { GameModal } from "../../components/game-modal";
import useModal from "../../shared/hooks/useModal";
import { useTranslation } from "react-i18next";
import useFetchGames from "../../shared/hooks/useFetchGames";

export const MyLibrary = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const {t} = useTranslation();
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
    state.epicGame.favoriteGames.includes(game.Id)
  );

  return (
    <div className="container">
      <h5>{t('navigation.buttons.favoriteGames')}</h5>

      <div className="row">
        {favoriteGames?.map((game: IGame, key: number) => (
          <div className={`col-md-3 mt-5`} key={key}>
            <div className="card">
              <a href="#" onClick={(e) => {handleGameClick(e, game)}}>
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
      {/* @ts-ignore */}
      <GameModal isShowing={isShowing} toggle={toggle} data={currentGame} />
    </div>
  );
};
