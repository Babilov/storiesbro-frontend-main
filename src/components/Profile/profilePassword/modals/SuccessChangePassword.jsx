import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";
import { useNavigate } from "react-router-dom";

const SuccessChangePassword = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    setOpen(false);
    navigate("/password");
  };

  return (
    <MyModal
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      title="Подтверждение"
      isFormOpen={open}
      setIsFormOpen={setOpen}
    >
      <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
        Вы успешно поменяли пароль!!!
      </Typography>
      <Box sx={{ width: "50%", m: "20px auto" }}>
        <MyButton
          onClick={handleClick}
          options={{ background: "#4CD640", color: "white" }}
        >
          Ок
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default SuccessChangePassword;
