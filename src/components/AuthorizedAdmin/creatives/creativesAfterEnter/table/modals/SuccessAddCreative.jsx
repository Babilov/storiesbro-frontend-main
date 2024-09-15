import React from "react";
import MyModal from "../../../../../UI/modals/MyModal";
import { Box, Link, Typography } from "@mui/material";
import MyButton from "../../../../../UI/buttons/MyButton";

const SuccessAddCreative = ({ open, setOpen }) => {
  return (
    <MyModal width="90%" isFormOpen={open} setIsFormOpen={() => setOpen(false)}>
      <Typography className="mdSizeText" sx={{ textAlign: "center", mb: 2 }}>
        Креатив добавлен, ура!!!
      </Typography>
      <Box sx={{ width: "40%", m: "0 auto" }}>
        <MyButton
          options={{ background: "#4CD640" }}
          onClick={() => setOpen(false)}
        >
          Ок
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default SuccessAddCreative;
