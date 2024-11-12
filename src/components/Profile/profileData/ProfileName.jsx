import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import pencil from "../../../images/profileImages/dataIcons/pencil.svg";
import MyInput from "../../UI/input/MyInput";


import { API_URL } from "../../../constants/constatns";

const ProfileName = () => {
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  // const [editedName, setEditedName] = useState("");
  // const [isDirty, setIsDirty] = useState(false); // Новое состояние для отслеживания изменений в инпуте
  const tokken = localStorage["token"];
  const userId = localStorage["id"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}profile/`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${tokken}` }
        });
        setName(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке сообществ', error);
      }
    };
    fetchProfile();
  }, [tokken]);

  localStorage.setItem("new_name", name)

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>Имя</Typography>
      <Box
        sx={{ width: "65%", display: "flex", alignItems: "center" }}
        onBlur={() => {
          setIsEdit(false);
        }}
      >
        <MyInput
          value={name.name}
          setValue={setName}
          disabled={!isEdit}
        />
        <Box
          component="img"
          alt="pencil"
          src={pencil}
          sx={{ ml: 2, cursor: "pointer" }}
          onClick={() => setIsEdit(true)}
        />
      </Box>
    </Box>
  );
};

export default ProfileName;
