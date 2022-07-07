import React, { useContext } from "react";
import { DiscountGamesSection } from "./DiscountGamesSection";
import { MainCarouselSection } from "./MainCarouselSection";
import { Context } from "../../store";
import "./Home.css";
import useFetchGames from "../../shared/hooks/useFetchGames";

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
