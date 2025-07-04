import React, { useEffect, useState } from "react";
import MyModal from "../../../../../UI/modals/MyModal";
import MyInput from "../../../../../UI/input/MyInput";
import { Avatar, Box, Checkbox, Link, Typography } from "@mui/material";
import MyButton from "../../../../../UI/buttons/MyButton";
import NoPermissionModal from "./NoPermissionModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../../../constants/constatns";

const AddPublicModal = ({ open, setOpen, publics, addedPublics }) => {
  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const permission = true;
  const [noPermissionOpen, setNoPermissionOpen] = useState(false);
  const [selectedPublics, setSelectedPublics] = useState([]);

  const [listAvailablePublics, setListAvailablePublics] = useState([]);

  useEffect(() => {
    if (!publics || !addedPublics) return;
    const filteredPublics = publics.filter(
      (publicItem) =>
        !addedPublics.some((selected) => selected.group_id === publicItem.id)
    );

    setListAvailablePublics(filteredPublics);
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
          const token = localStorage.getItem("access_token");
          const res = await axios.post(
            `${API_URL}add_user_group/`,
            {
              selectedPublics,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Токен в заголовке
              },
            }
          );
          waitForAuth1(res.data.auth_url);
          // window.location.reload();
        } catch (error) {
          console.error("Ошибка при отправке данных:", error);
        }
      }
    }
  };

  const waitForAuth1 = (authUrl) => {
    window.location.href = authUrl;
  };

  const waitForAuth = (authUrl) => {
    return new Promise((resolve, reject) => {
      const popup = window.open(authUrl, "_blank");

      const timer = setInterval(() => {
        try {
          // Пытаемся прочитать URL попапа (работает только если попап на том же домене)
          if (popup.location.href.includes("error=")) {
            const url = new URL(popup.location.href);
            const error = url.searchParams.get("error");
            const errorDesc = url.searchParams.get("error_description");
            clearInterval(timer);
            popup.close();
            reject(new Error(errorDesc || error));
          }
        } catch (e) {
          // Блокируется политика CORS - это нормально
        }

        if (popup.closed) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setInputValue("");
  };

  const selectAll = () => {
    const allSelected = filteredPublics.every((item) =>
      selectedPublics.some((publicItem) => publicItem.id === item.id)
    );
    if (allSelected) {
      setSelectedPublics((prevSelected) =>
        prevSelected.filter(
          (item) => !filteredPublics.some((filtered) => filtered.id === item.id)
        )
      );
    } else {
      const newSelections = filteredPublics.filter(
        (item) => !selectedPublics.some((selected) => selected.id === item.id)
      );
      setSelectedPublics((prevSelected) => [...prevSelected, ...newSelections]);
    }
  };

  const filteredPublics = listAvailablePublics.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.link.toLowerCase().includes(inputValue.toLowerCase())
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
      {/*{!authError && (
        <SuccessModal open={successOpen} setOpen={setSuccessOpen} />
      )} */}

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
        <Box sx={{ width: "50%", mb: 1 }}>
          <MyButton
            options={{ background: "rgba(246, 165, 92, 1);" }}
            onClick={selectAll}
          >
            {filteredPublics.every((item) =>
              selectedPublics.some((publicItem) => publicItem.id === item.id)
            )
              ? "Снять выделение"
              : "Выбрать всё"}
          </MyButton>
        </Box>
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
          {filteredPublics.map((item) => (
            <Box
              key={item.id}
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
                  (publicItem) => publicItem.id === item.id
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
