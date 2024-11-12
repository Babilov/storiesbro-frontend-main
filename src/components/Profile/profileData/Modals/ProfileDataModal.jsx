import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";
import MyInput from "../../../UI/input/MyInput";
import ErrorMessage from "../../../UI/errors/ErrorMessage";
import RightCodeModal from "./RightCodeModal";
import { API_URL } from "../../../../constants/constatns";

const ProfileDataModal = ({ modalOpen, setModalOpen, setEmail, newEmail }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  // const id = useSelector((store) => store.user)["id"];

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${API_URL}change_email/${localStorage.getItem(
          "email"
        )}/${newEmail}/${code}/`
      );
      localStorage.setItem("email", newEmail);
      setModalOpen(false);
    } catch (error) {
      console.error("Ошибка", error);
      setError(true);
    }
  };

  const handleClose = () => {
    setCode("");
    setError(false);
    setModalOpen(false);
  };

  const [rightCodeModalOpen, setRightCodeModalOpen] = useState(false);

  const confirmCode = "1111";

  return (
    <>
      <RightCodeModal
        newEmail={newEmail}
        modalOpen={rightCodeModalOpen}
        setModalOpen={() => setRightCodeModalOpen(false)}
      />

      <MyModal
        title="Подтверждение"
        titleFont="18px"
        width={{ xs: "90%", md: "50%", lg: "30%" }}
        isFormOpen={modalOpen}
        setIsFormOpen={handleClose}
      >
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: "18px",
              fontWidth: 400,
            }}
          >
            Для изменения почты введите код, отправленный на почту{" "}
            {localStorage.getItem("email")}
          </Typography>
          <Box sx={{ width: "50%", m: "0 auto" }}>
            <MyInput label="Введите код" value={code} setValue={setCode} />
            <ErrorMessage error={error} errorMessage="* Неверный код" />
            <MyButton
              options={{ background: "#4CD640", color: "white" }}
              onClick={handleClick}
            >
              Готово
            </MyButton>
          </Box>
        </Box>
      </MyModal>
    </>
  );
};

export default ProfileDataModal;
