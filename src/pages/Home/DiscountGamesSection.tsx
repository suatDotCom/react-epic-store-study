import React, { useCallback, useContext, useState } from "react";
import "./DiscountGamesSection.css";
import { Context } from "../../store";
import { IGame } from "../../models/epic-games";
import { FavoriteComponent } from "../../components/favorite";
import { useTranslation } from "react-i18next";
import useModal from "../../shared/hooks/useModal";
import { GameModal } from "../../components/game-modal";
import { useNavigate } from "react-router-dom";
export const DiscountGamesSection = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();
  let discountedGames = state?.epicGame?.games?.slice(0, 8);

  const { isShowing, toggle } = useModal();
  const [currentGame, setCurrentGame] = useState({});

  const handleGameClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, game: IGame) => {
      e.preventDefault();
      setCurrentGame(game);
      toggle();
    },
    [isShowing]
  );

  return (
    <div className="discount-games-container">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h5>{t("home.texts.discountedGames")}</h5>
        </div>
        <div className="d-flex mr-2">
          <a
            href="#all-games"
            onClick={() => {
              navigate("/all-games");
            }}
            className="text-white text-decoration-none"
          >
            <h5>
              {t("home.texts.all")} {">"}
            </h5>
          </a>
        </div>
      </div>
      <div className="row">
        {discountedGames.map((game: IGame, key: number) => (
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
      {/* @ts-ignore */}
      <GameModal isShowing={isShowing} toggle={toggle} data={currentGame} />
    </div>
  );
};
