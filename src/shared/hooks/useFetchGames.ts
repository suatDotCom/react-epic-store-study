import { useState, useEffect, useContext, useCallback } from "react";
import { IGame } from "../../models/epic-games";
import { GameService } from "../../services/game.service";
import { Context } from "../../store";
import { GET_FAVORITE_GAMES, SET_UNIQUE_CATEGORIES, SET_GAMES } from "../../store/types/game.type";

const useFetchGames = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const [data, setData] = useState<any>(null);

  const getCategories = (data: IGame[]): string[] => {
    let uniqueCategories: string[] = [];
    let categories = data.map((item: IGame) => {
      uniqueCategories.push(...item.Categories);
    });

    //@ts-ignore
    return uniqueCategories = [...new Set(uniqueCategories)];
  }

  useEffect(
    useCallback(() => {
      GameService.getAll()
        .then((response: Response) => response.json())
        .then((data: IGame[]) => {
          setData(data);
          
          dispatch({
            type: SET_GAMES,
            payload: data,
          });

          dispatch({
            type: GET_FAVORITE_GAMES,
          });

          dispatch({
            type: SET_UNIQUE_CATEGORIES,
            payload: getCategories(data)
          });
        })
        .catch((error) => {});
    }, [data])
  );

  return [data];
};

export default useFetchGames;
