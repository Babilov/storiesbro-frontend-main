import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import { addSticker } from "../../../../api/creatives";
import { useNavigate } from "react-router-dom";

import redirectPng from "../images/redirect.png";

const StickerLink = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");

  const handleClickCreative = () => {
    addSticker(user_id, link, title);
  };

  return (
    <Box>
      <Box
        component="img"
        alt="back"
        src={redirectPng}
        sx={{
          position: "absolute",
          float: "left",
          width: "45px",
          height: "38",
          cursor: "pointer",
        }}
        onClick={() => navigate("/creatives/add-creative")}
      />
      <Box className="grid columnCenter">
        <Typography className="title">Ссылка-стикер</Typography>
        <Box sx={{ width: { md: "30%", xs: "100%" } }}>
          <MyInput
            value={link}
            setValue={setLink}
            label="Введите ссылку на историю"
          />
          <MyInput value={title} setValue={setTitle} label="Введите название" />
          <Box sx={{ width: "80%", m: "0 auto" }}>
            <MyButton
              onClick={handleClickCreative}
              options={{ background: "#4CD640" }}
            >
              Загрузить
            </MyButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StickerLink;
