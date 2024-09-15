import { Box, Typography } from "@mui/material";
import React from "react";

import whiteVk from "../../../images/profileImages/dataIcons/whiteVk.svg";
import avatar from "../../../images/profileImages/dataIcons/avatar.svg";
import cross from "../../../images/profileImages/dataIcons/cross.svg";
import MyButton from "../../UI/buttons/MyButton";

const ProfileButton = () => {
  const name = "Юрий";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ width: "30%", fontSize: "18px", fontWeight: 400 }}>
        Аккаунт в Вконтакте
      </Typography>
      <Box sx={{ width: "65%", display: "flex", alignItems: "center" }}>
        <MyButton options={{ background: "#2A5885", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              pl: 1,
              pr: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box component="img" alt="vk" src={whiteVk} sx={{ mr: 2 }} />
              <Typography>{name}</Typography>
            </Box>
            <Box component="img" alt="avatar" src={avatar} />
          </Box>
        </MyButton>
        <Box
          component="img"
          alt="cross"
          src={cross}
          sx={{ ml: 2, cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default ProfileButton;
