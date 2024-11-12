import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";

const SusccesModal = ({ susccesModalOpen, setSusccesModalOpen }) => {
  return (
    <MyModal
      title="Ура!"
      isFormOpen={susccesModalOpen}
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      setIsFormOpen={() => setSusccesModalOpen(false)}
    >
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Отлично, ссылка присутствует во всех сообществах. Наслаждайтесь
        пониженной комиссией{")"}
      </Typography>
      <Box sx={{ width: "50%", m: "20px auto" }}>
        <MyButton
          onClick={() => setSusccesModalOpen(false)}
          options={{ background: "#4CD640", color: "white" }}
        >
          Спасибо
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default SusccesModal;
