import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../../UI/buttons/MyButton";

const ProfileCashButton = ({ to, text, background, color, border }) => {
  return (
    <Box sx={{ width: "50%", mr: 1 }}>
      <Link to={to} style={{ textDecoration: "none" }}>
        <MyButton
          options={{ background: background, color: color, border: border }}
        >
          {text}
        </MyButton>
      </Link>
    </Box>
  );
};

export default ProfileCashButton;
