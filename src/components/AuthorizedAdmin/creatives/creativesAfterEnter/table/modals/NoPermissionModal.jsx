import React from "react";
import MyModal from "../../../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";

import sad from "./images/sad.svg";
import MyButton from "../../../../../UI/buttons/MyButton";

const NoPermissionModal = ({ open, setOpen }) => {
  return (
    <MyModal
      title={<Box component="img" alt="sad" src={sad} />}
      isFormOpen={open}
      setIsFormOpen={() => setOpen(false)}
      width={{ xs: "90%", md: "40%" }}
    >
      <Typography className="mdSizeText" sx={{ textAlign: "center", mb: 2 }}>
        У привязанного аккаунта Вконтакте отсутствуют права на публикацию
        историй.
      </Typography>
      <Box sx={{ width: "50%", m: "0 auto" }}>
        <MyButton
          onClick={() => setOpen(false)}
          options={{ background: "#4CD640" }}
        >
          Сейчас выдам
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default NoPermissionModal;
