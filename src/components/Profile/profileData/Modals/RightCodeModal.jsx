import React from "react";
import { Box, Typography } from "@mui/material";

import MyModal from "../../../UI/modals/MyModal";
import smile from "../../../../images/profileImages/dataIcons/smile.svg";
import MyButton from "../../../UI/buttons/MyButton";

const RightCodeModal = ({ newEmail, modalOpen, setModalOpen }) => {
  return (
    <MyModal
      title={<img src={smile} alt="img" />}
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      isFormOpen={modalOpen}
      setIsFormOpen={setModalOpen}
    >
      <Box>
        <Typography sx={{ textAlign: "center" }}>
          Отлично, изменения сохранены. Логин аккаунта Storisbro изменён на
          почту “{newEmail}”
        </Typography>
        <Box sx={{ width: "40%", m: "15px auto" }}>
          <MyButton
            options={{ background: "#4CD640", color: "white" }}
            onClick={() => setModalOpen(false)}
          >
            Спасибо
          </MyButton>
        </Box>
      </Box>
    </MyModal>
  );
};

export default RightCodeModal;
