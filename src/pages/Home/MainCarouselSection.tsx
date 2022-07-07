import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainCarouselSection.css";
import { IGame } from "../../models/epic-games";
import { Context } from '../../store';

export const MainCarouselSection = () => {
  //@ts-ignore
  const [state] = useContext(Context);

  let games = state?.epicGame?.games?.slice(9, state?.epicGame?.games?.length);

  return (
    <div className="main-carousel-container">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="main-carousel-swiper"
      >
        {(games || []).map((game: IGame, key: number) => (
          <SwiperSlide key={key}>
            <img src={game.Cover} alt=""/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
