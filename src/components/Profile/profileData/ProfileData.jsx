import { Box, Button } from "@mui/material";
import React from "react";
import ProfileName from "./ProfileName";
import ProfileEmail from "./ProfileEmail";
import ProfileButton from "./ProfileButton";

import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const ProfileData = () => {
  const tokken = localStorage["token"];
  const userId = localStorage["id"];

  const handleUpdate = async () => {
    try {
      // Отправка запроса на сервер для обновления информации
      await axios.patch(
        `${API_URL}api_users/change_profile/${userId}`,
        { name: localStorage.getItem("new_name") },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${tokken}` },
        }
      );
    } catch (error) {
      console.error("Ошибка при обновлении профиля", error);
    }
  };

  return (
    <Box
      sx={{
        width: { md: "40%", sm: "60%", xs: "90%" },
        m: { xs: "0 auto", lg: 0 },
      }}
    >
      <ProfileName />
      <ProfileEmail />
      <ProfileButton />
      {/* <Typography>{localStorage.getItem('UID')}</Typography> */}
      <Button
        onClick={handleUpdate}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="contained"
        color="success"
      >
        Сохранить
      </Button>
    </Box>
  );
};

export default ProfileData;
