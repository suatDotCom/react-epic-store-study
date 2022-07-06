import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IGame } from "../../models/epic-games";
import { IModalProps } from "../../models/IModalProps";
import "./GameModal.css";
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
          {(data?.Screenshots || []).slice(0, 6).map((imageUrl: string, key: number) => (
            <div className="col-md-2 text-center" key={key}>
              <img src={imageUrl} alt="" />
            </div>
          ))}
        </div>

        <div className="row text-center mt-4">
          <h3>{data?.Price}$</h3>
        </div>
        <div className="row mt-2">
          <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
            Purchase
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
