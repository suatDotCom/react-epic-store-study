import React, { useContext } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IGame } from "../../models/epic-games";
import { IModalProps } from "../../models/IModalProps";
import "./GameModal.css";
import { useTranslation } from "react-i18next";
import { Context } from "../../store";
import { ADD_PURCHASED_GAMES } from "../../store/types/game.type";
import { IStore } from "../../models/store";
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "95%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  color: "#fff",
  p: 4,
};

export const GameModal = ({ isShowing, toggle, data }: IModalProps<IGame>) => {
  //@ts-ignore
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  let purchasedGames = (state?.epicGame?.games || []).filter((game: IGame) =>
    state?.epicGame?.purchasedGames?.includes(game.Id)
  );

  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>, gameId: number) => {
    e.preventDefault();
    dispatch({
      type: ADD_PURCHASED_GAMES,
      payload: gameId,
    });
  };

  return (
    <Modal
      open={isShowing}
      onClose={() => toggle()}
      className="game-modal"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {data?.Name}
        </Typography>
        <div className="cover-image mt-3 mb-3 text-center">
          <img src={data?.Cover} alt="" />
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data?.Summary}
        </Typography>
        <div className="row mt-3">
          {(data?.Screenshots || [])
            .slice(0, 6)
            .map((imageUrl: string, key: number) => (
              <div className="col-md-2 text-center" key={key}>
                <img src={imageUrl} alt="" />
              </div>
            ))}
        </div>

        <div className="row text-center mt-4">
          <h3>{data?.Price}$</h3>
        </div>
        <div className="row mt-2">
          {purchasedGames?.find((item: IGame) => item.Id === data.Id) ? (
            <Button
              variant="contained"
              endIcon={<AddShoppingCartIcon  />}
              color="success"
              className="text-white"
            >
              {t("myLibrary.buttons.purchased")}
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
              onClick={(e) => {
                handlePurchase(e, data.Id);
              }}
            >
              {t("myLibrary.buttons.purchase")}
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};
