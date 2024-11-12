import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";

const CashError = ({ open, setOpen }) => {
  return (
    <MyModal
      title="Упс..."
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      isFormOpen={open}
      setIsFormOpen={() => setOpen(false)}
    >
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          Платеж не прошел. Попробуйте еще раз{")"}
        </Typography>
        <Box sx={{ width: "40%", m: "10px auto" }}>
          <MyButton
            onClick={() => setOpen(false)}
            options={{ background: "#4CD640", color: "white" }}
          >
            Ок
          </MyButton>
        </Box>
      </Box>
    </MyModal>
  );
};

export default CashError;
