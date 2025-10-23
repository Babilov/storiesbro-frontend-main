import React, { useEffect, useRef, useState } from "react";
import MyModal from "../../../../../UI/modals/MyModal";
import MyInput from "../../../../../UI/input/MyInput";
import { Avatar, Box, Checkbox, Link, Typography } from "@mui/material";
import MyButton from "../../../../../UI/buttons/MyButton";
import NoPermissionModal from "./NoPermissionModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL, MY_URL } from "../../../../../../constants/constatns";
import { fetchWithAuth } from "../../../../../../api/token";
import * as VKID from "@vkid/sdk";
import logToBackend from "../../../../../../utils/logs";

const AddPublicModal = ({
  open,
  setOpen,
  publics,
  addedPublics,
  setAuthedVk,
  disconnectWebSocket,
  ws,
}) => {
  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const permission = true;
  const [noPermissionOpen, setNoPermissionOpen] = useState(false);
  const [selectedPublics, setSelectedPublics] = useState([]);
  const [listAvailablePublics, setListAvailablePublics] = useState([]);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [addedPublicsCount, setAddedPublicsCount] = useState(0);

  const MAX_PUBLICS = 30;
  const navigate = useNavigate();

  useEffect(() => {
    const getGroupsCount = async () => {
      const res = await fetchWithAuth(`${API_URL}vk/user-groups/`);
      console.log("РЕЗЗЗЗ", res);
      setAddedPublicsCount(MAX_PUBLICS - res.count);
      logToBackend(`ДОБАВЛЕНО: ${MAX_PUBLICS - res.count}`);
      logToBackend(`ОТВЕТ ОТ ФУНКЦИИ: ${res.count}`);
    };
    getGroupsCount();
  }, []);

  useEffect(() => {
    if (!publics || !addedPublics) return;
    const filteredPublics = publics.filter(
      (publicItem) =>
        !addedPublics.some((selected) => selected.group_id === publicItem.id)
    );
    setListAvailablePublics(filteredPublics);
  }, [open, publics, addedPublics]);

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
            { selectedPublics },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          waitForAuth1(res.data.auth_url);
        } catch (error) {
          console.error("Ошибка при отправке данных:", error);
        }
      }
    }
  };

  const waitForAuth1 = (authUrl) => {
    window.location.href = authUrl;
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setInputValue("");
  };

  // ---- selectAll с учетом добавленных ----
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

      setSelectedPublics((prevSelected) => {
        const currentTotal = addedPublicsCount + prevSelected.length;
        const availableSlots = MAX_PUBLICS - currentTotal;
        logToBackend(`АВТОМАТИЧЕСКИ: ДОСТУПНЫЕ СЛОТЫ ${availableSlots}`);
        // Если лимит уже достигнут — просто показать модалку
        if (availableSlots <= 0) {
          setLimitModalOpen(true);
          return prevSelected;
        }

        // Если добавление полностью заполнит лимит — тоже показать модалку
        if (newSelections.length > availableSlots) {
          setLimitModalOpen(true);
        }

        return [...prevSelected, ...newSelections.slice(0, availableSlots)];
      });
    }
  };

  const filteredPublics = listAvailablePublics.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.link.toLowerCase().includes(inputValue.toLowerCase())
  );

  // ---- handleCheckboxChange с учетом addedPublics ----
  const handleCheckboxChange = (item, disabled) => {
    if (disabled) {
      // если клик по заблокированному чекбоксу
      setLimitModalOpen(true);
      return;
    }

    setSelectedPublics((prevSelected) => {
      if (prevSelected.some((publicItem) => publicItem.id === item.id)) {
        return prevSelected.filter((publicItem) => publicItem.id !== item.id);
      } else {
        const totalCount = addedPublicsCount + prevSelected.length;
        logToBackend(`ВРУЧНУЮ: СКОЛЬКО ДОБАВИЛИ ${totalCount}`);
        if (totalCount >= MAX_PUBLICS) {
          setLimitModalOpen(true);
          return prevSelected;
        }
        return [...prevSelected, item];
      }
    });
  };

  // ---- блокировка чекбоксов ----
  const isLimitReached =
    addedPublicsCount + selectedPublics.length >= MAX_PUBLICS;

  return (
    <>
      {/* Модальное окно про лимит */}
      <MyModal
        width="40%"
        isFormOpen={limitModalOpen}
        setIsFormOpen={() => setLimitModalOpen(false)}
        title="Ограничение ВКонтакте"
        titleFont="26px"
      >
        <Typography sx={{ fontSize: "18px", textAlign: "center", mb: 2 }}>
          К сожалению, ВК имеет ограничения на привязанные сообщества к одному
          аккаунту (не больше 30). Вам необходимо привязать ещё один аккаунт и
          добавить оставшиеся сообщества через него.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MyButton
            onClick={() => {
              disconnectWebSocket(ws);
            }}
            options={{ background: "#0077FF" }}
          >
            Добавить аккаунт ВК
          </MyButton>
        </Box>
      </MyModal>

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
            maxHeight: "240px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "12px",
              borderColor: "#000",
              borderRadius: "10px",
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
          {filteredPublics.map((item) => {
            const disabled =
              isLimitReached &&
              !selectedPublics.some((publicItem) => publicItem.id === item.id);

            return (
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
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (disabled) setLimitModalOpen(true);
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
                  disabled={disabled}
                  onChange={() => handleCheckboxChange(item, disabled)}
                />
              </Box>
            );
          })}
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
