import { Box, Typography } from "@mui/material";
import React from "react";

import vk from "../images/vk.svg";
import MyButton from "../../../../UI/buttons/MyButton";

const AddPublicButton = ({ setOpen }) => {
  return (
    <Box
      sx={{
        width: { md: "35%", sm: "50", xs: "75" },
      }}
    >
      <MyButton
        onClick={() => setOpen(true)}
        options={{
          background: "white",
          color: "black",
          border: "2px solid #0077FF",
          borderRadius: "90px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography>Добавить сообщество</Typography>
          <Box component="img" alt="vk" src={vk} />
        </Box>
      </MyButton>
    </Box>
  );
};

export default AddPublicButton;
