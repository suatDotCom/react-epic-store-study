import React, { useCallback, useContext, useEffect } from "react";
import { DiscountGamesSection } from "./DiscountGamesSection";
import { MainCarouselSection } from "./MainCarouselSection";
import { GameService } from "../../services/game.service";
import { Context } from "../../store";
import { SET_GAMES } from "../../store/types/game.type";
import "./Home.css";
import useFetchGames from '../../shared/hooks/useFetchGames';

export const Home = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const [gameData] = useFetchGames(); 

  return (
    <div className="container">
      <MainCarouselSection />
      <DiscountGamesSection />
    </div>
  );
};
