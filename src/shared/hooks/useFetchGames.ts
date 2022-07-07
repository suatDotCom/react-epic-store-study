import { useState, useEffect, useContext, useCallback } from "react";
import { IGame } from "../../models/epic-games";
import { GameService } from "../../services/game.service";
import { Context } from "../../store";
import {
  GET_FAVORITE_GAMES,
  SET_UNIQUE_CATEGORIES,
  SET_GAMES,
  GET_PURCHASED_GAMES,
} from "../../store/types/game.type";
import { getGames } from "../storage/GameStorage";

const useFetchGames = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const [data, setData] = useState<any>(null);

  const getUniqueCategories = (data: IGame[]): string[] => {
    let uniqueCategories: string[] = [];
    let categories = data.map((item: IGame) => {
      uniqueCategories.push(...item.Categories);
    });

    //@ts-ignore
    return (uniqueCategories = [...new Set(uniqueCategories)]);
  };

  useEffect(() => {
    if (!data) return;

    dispatch({
      type: SET_GAMES,
      payload: data,
    });

    dispatch({
      type: GET_FAVORITE_GAMES,
    });

    dispatch({
      type: GET_PURCHASED_GAMES,
    });

    dispatch({
      type: SET_UNIQUE_CATEGORIES,
      payload: getUniqueCategories(data),
    });
  }, [data]);

  useEffect(
    useCallback(() => {
      GameService.getAll()
        .then((response: Response) => response.json())
        .then((response: IGame[]) => {
          var games: IGame[] = getGames();
          setData(games?.length > 0 ? games : response)
        })
        .catch((error) => {});
    }, []),
    []
  );

  return [data];
};

export default useFetchGames;
