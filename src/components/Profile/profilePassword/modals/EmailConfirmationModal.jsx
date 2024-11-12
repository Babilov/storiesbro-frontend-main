import React, { useState } from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import ErrorMessage from "../../../UI/errors/ErrorMessage";
import SuccessChangePassword from "./SuccessChangePassword";

import axios from "axios";
import { API_URL } from "../../../../constants/constatns";

const EmailConfiramtionFormModal = ({ open, setOpen, password }) => {
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${API_URL}password_code_confirm/${localStorage.getItem(
          "email"
        )}/${password}/${code}/`
      );
      setOpen(false);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setCode("");
  };

  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);

  return (
    <>
      <SuccessChangePassword open={openSuccess} setOpen={setOpenSuccess} />
      <MyModal
        width={{ xs: "90%", md: "50%", lg: "30%" }}
        title="Подтверждение"
        isFormOpen={open}
        setIsFormOpen={handleClose}
      >
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          Для изменения пароля, введите код, отправленный на почту{" "}
          {localStorage.getItem("email")}
        </Typography>
        <Box sx={{ width: "50%", m: "20px auto" }}>
          <MyInput label="Введите код" value={code} setValue={setCode} />
          <ErrorMessage error={error} errorMessage="* Неверный код" />
          <MyButton
            onClick={handleClick}
            options={{ background: "#4CD640", color: "white" }}
          >
            Готово
          </MyButton>
        </Box>
      </MyModal>
    </>
  );
};

export default EmailConfiramtionFormModal;
