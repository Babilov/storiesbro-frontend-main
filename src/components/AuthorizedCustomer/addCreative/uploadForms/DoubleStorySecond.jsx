import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MyDropZone from "../../../UI/myDropZone/MyDropZone";
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";

import redirectPng from "../images/redirect.png"
import { Link } from "react-router-dom";

import { addDoubleCreative } from "../../../../api/creatives";

const DoubleStoriSecond = ({ onValuesChange }) => {
  const navigate = useNavigate();

  const [secondLinkValue, setLinkValue] = React.useState("");
  const [secondNameValue, setNameValue] = React.useState("");
  const [secondUploadedFile, setUploadedFile] = React.useState(null); // Новое состояние
  const user_id = localStorage.getItem("id");

  const handleFileChange = (filePath) => {
    // Обработка пути к файлу из MyDropZone
    setUploadedFile(filePath);
  };

  const handleClickCreative = () => {
    onValuesChange({
        secondUploadedFile,
        secondLinkValue,
        secondNameValue,
      });
  };
 

  return (
    <Box>
      <Box
        component="img"
        alt="back"
        src={redirectPng}
        sx={{position: "absolute", float: "left", width: "45px", height: "38", cursor: "pointer"}}
        onClick={() => navigate("/creatives/add-creative")}
      />
      <Box
        className="justifyCenter"
        sx={{ flexDirection: { md: "row", xs: "column" } }}
      >
        <Typography sx={{ fontSize: "23px", fontWeight: 500, mt: -2, mr: 2 }}>
          №2
        </Typography>

        <MyDropZone />
        <Box
          sx={{
            width: { md: "20%", xs: "100%" },
            m: { xs: "10px auto", md: "0 8px 0" },
          }}
        >
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel id="demo-simple-select-label">
              Выберите кнопку
            </InputLabel>
            <Select sx={{ borderRadius: "10px" }} />
          </FormControl>
          <MyInput label="Введите ссылку" />
          <MyInput label="Введите название" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "40px" }}>
        <Box sx={{ width: { md: "20%", xs: "75%" }, mr: 2 }}>
          <MyButton options={{ background: "#4CD640" }}>Загрузить</MyButton>
        </Box>
        <Box sx={{ width: { xs: "25%", md: "5%" } }}>
          <MyButton
            options={{ background: "#F9AF41F9" }}
            onClick={() => navigate("/creatives/add-creative/double/1")}
          >
            №1
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
};

export default DoubleStoriSecond;
