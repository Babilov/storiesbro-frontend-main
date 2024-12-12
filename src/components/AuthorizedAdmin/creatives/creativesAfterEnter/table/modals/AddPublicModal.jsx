import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyModal from "../../../../../UI/modals/MyModal";
import MyInput from "../../../../../UI/input/MyInput";
import { Avatar, Box, Checkbox, Link, Typography } from "@mui/material";
import MyButton from "../../../../../UI/buttons/MyButton";
import SuccessModal from "./SuccessModal";
import NoPermissionModal from "./NoPermissionModal";
import {
  add_public,
  add_public_with_name,
} from "../../../../../../api/publics";

import axios from "axios";
import { API_URL } from "../../../../../../constants/constatns";
import logToBackend from "../../../../../../utils/logs";

const AddPublicModal = ({ open, setOpen, publics }) => {
  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [permission, setPermission] = useState(true);
  const [noPermissionOpen, setNoPermissionOpen] = useState(false);
  const [selectedPublics, setSelectedPublics] = useState([]);

  const [listAvailablePublics, setListAvailablePublics] = useState([]);

  useEffect(() => {
    setListAvailablePublics(publics);
    // console.log(publics);
  }, [open, publics]);

  const user_id = localStorage.getItem("id");

  const handleClick = () => {
    if (error) {
      setInputValue("*Походу ошибка в ссылке - такого сообщества нет");
    } else {
      if (!permission) {
        setOpen(false);
        setNoPermissionOpen(true);
      } else {
        if (inputValue.includes("https://vk.com/")) {
          setSuccessOpen(true);
          setOpen(false);
          const GROUP_ID = inputValue;
          add_public(GROUP_ID, user_id, setError);
        } else {
          setSuccessOpen(true);
          setOpen(false);
          const GROUP_NAME = inputValue;
          add_public_with_name(GROUP_NAME, user_id, setError);
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setInputValue("");
  };

  const filteredPublics = listAvailablePublics.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.link.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const addOrRemovePublic = (checkbox, item) => {
    console.log(checkbox);
    if (checkbox.checked === true) {
      setSelectedPublics([...selectedPublics, item]);
    }
    console.log(selectedPublics);
  };

  return (
    <>
      <SuccessModal open={successOpen} setOpen={setSuccessOpen} />
      <NoPermissionModal
        open={noPermissionOpen}
        setOpen={setNoPermissionOpen}
      />
      <MyModal
        width="90%"
        title="Добавление сообщества"
        isFormOpen={open}
        setIsFormOpen={handleClose}
      >
        <MyInput
          error={error}
          value={inputValue}
          setValue={setInputValue}
          label="Введите ссылку или название сообщества"
        />

        <Box
          sx={{
            maxHeight: "240px", // Замените эту высоту на необходимую
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "12px",
              borderColor: "#000", // Замените цвет на желаемый
              borderRadius: "10px", // Замените на необходимое значение
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E37E31",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F5F5F5",
              borderRadius: "6px",
            },
          }}
        >
          {filteredPublics.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #CDCDCD",
                borderRadius: "10px",
                p: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "7px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="public avatar"
                  src={item.image}
                  sx={{ height: "30px", width: "30px" }}
                />
                <Typography sx={{ ml: "50px" }}>{item.name}</Typography>
              </Box>
              <Checkbox
                style={{ color: "black" }}
                onChange={() => addOrRemovePublic(this, item)}
              />
            </Box>
          ))}
        </Box>

        <Link sx={{ textAlign: "right", mb: 2 }}>требования к сообществам</Link>
        <Box sx={{ width: "50%", m: "0 auto" }}>
          <MyButton onClick={handleClick} options={{ background: "#4CD640" }}>
            Добавить
          </MyButton>
        </Box>
      </MyModal>
    </>
  );
};

export default AddPublicModal;
