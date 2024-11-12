import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import MyInput from "../../UI/input/MyInput";
import pencil from "../../../images/profileImages/dataIcons/pencil.svg";
import ProfileDataModal from "./Modals/ProfileDataModal";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const ProfileEmail = () => {
  const present_email = localStorage.getItem("email");
  const [email, setEmail] = useState(present_email);
  // const [newEmail, setNewEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBlur = () => {
    try {
      // Отправка запроса на сервер для обновления информации
      axios.post(`${API_URL}change_email/${localStorage.getItem("email")}/`);
    } catch (error) {
      console.error("Ошибка при отправке кода", error);
    }
    setIsEdit(false);
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ProfileDataModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setEmail={setEmail}
        newEmail={email}
      />

      <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>Почта</Typography>
      <Box
        sx={{ width: "65%", display: "flex", alignItems: "center" }}
        onBlur={handleBlur}
      >
        <MyInput
          value={email}
          setValue={setEmail}
          disabled={!isEdit}
          focused={true}
        />
        <Box
          component="img"
          alt="pencil"
          src={pencil}
          sx={{ ml: 2, cursor: "pointer" }}
          onClick={() => setIsEdit(!isEdit)}
        />
      </Box>
    </Box>
  );
};

export default ProfileEmail;
