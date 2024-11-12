import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";

import { API_URL } from "../../../../constants/constatns";
import axios from "axios";

const userId = localStorage.getItem("id");

const RemoveModal = ({
  open,
  setOpen,
  deleteCreative,
  creatives,
  setCreatives,
  arhive,
  setArhive,
}) => {
  const handleDelete = async () => {
    try {
      // Выполнение DELETE-запроса с использованием Axios
      await axios.delete(
        `${API_URL}api_creatives/detail_user_creative/${userId}/${deleteCreative.creative_type}/${deleteCreative.id}`
      );

      // Если запрос успешен, удаляем креатив из состояния
      setCreatives(creatives.filter((item) => item !== deleteCreative));
    } catch (error) {
      console.error("Ошибка удаления", error);
    }

    // Закрытие модального окна
    setOpen(false);
  };

  const handleMoveToArhive = async () => {
    try {
      // Выполнение PATCH-запроса с использованием Axios
      await axios.patch(
        `${API_URL}api_creatives/detail_user_creative/${userId}/${deleteCreative.creative_type}/${deleteCreative.id}`,
        { archive: true }
      );

      // Если запрос успешен, перемещаем креатив в архив
      setCreatives(creatives.filter((item) => item !== deleteCreative));
      setArhive([...arhive, deleteCreative]);
    } catch (error) {
      console.error("Ошибка перемещения в архив", error);
    }

    // Закрытие модального окна
    setOpen(false);
  };

  return (
    <MyModal
      width="100%"
      isFormOpen={open}
      setIsFormOpen={() => setOpen(false)}
    >
      <Typography>Куда убрать креатив {deleteCreative["name"]}?</Typography>
      <Box className="spaceBetween">
        <MyButton onClick={handleDelete} options={{ background: "#D25D48" }}>
          Удалить
        </MyButton>
        <MyButton
          onClick={handleMoveToArhive}
          options={{ background: "#4CD640" }}
        >
          В архив
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default RemoveModal;
