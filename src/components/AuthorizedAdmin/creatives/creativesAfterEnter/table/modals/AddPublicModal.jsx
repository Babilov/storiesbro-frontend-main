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
import logToBackend from "../../../../../../utils/logs";
import { useNavigate } from "react-router-dom";

const AddPublicModal = ({ open, setOpen, publics, addedPublics }) => {
  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [permission, setPermission] = useState(true);
  const [noPermissionOpen, setNoPermissionOpen] = useState(false);
  const [selectedPublics, setSelectedPublics] = useState([]);

  const [listAvailablePublics, setListAvailablePublics] = useState([]);

  useEffect(() => {
    setListAvailablePublics(
      publics.filter(
        (publicItem) =>
          !selectedPublics.some(
            (selected) => selected.group_id === publicItem.id,
          ),
      ),
    );
    console.log(`ADDED: ${JSON.stringify(addedPublics)}`);
    console.log(`ALL: ${JSON.stringify(publics)}`);
    console.log(`YBRALI: ${JSON.stringify(listAvailablePublics)}`);
  }, [open, publics, selectedPublics]);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (error) {
      setInputValue("*Походу ошибка в ссылке - такого сообщества нет");
    } else {
      if (!permission) {
        setOpen(false);
        setNoPermissionOpen(true);
      } else {
        setSuccessOpen(true);
        setOpen(false);
        try {
          const userId = localStorage.getItem("id");
          const token = localStorage.getItem("access_token");
          await axios.post(
            `https://storisbro.com/api/add_user_group/`,
            {
              selectedPublics,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Токен в заголовке
              },
            },
          );
          console.log("Данные успешно отправлены");
          window.location.reload();
        } catch (error) {
          console.error("Ошибка при отправке данных:", error);
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

  const handleCheckboxChange = (item) => {
    setSelectedPublics((prevSelected) => {
      if (prevSelected.some((publicItem) => publicItem.id === item.id)) {
        return prevSelected.filter((publicItem) => publicItem.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
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
                checked={selectedPublics.some(
                  (publicItem) => publicItem.id === item.id,
                )}
                onChange={() => handleCheckboxChange(item)}
              />
            </Box>
          ))}
        </Box>

        <Link
          sx={{ textAlign: "right", mb: 2, cursor: "pointer" }}
          onClick={() => navigate("/admin-help")}
        >
          требования к сообществам
        </Link>
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
