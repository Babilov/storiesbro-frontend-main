import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import MyModal from "../../../../../UI/modals/MyModal";
import MyButton from "../../../../../UI/buttons/MyButton";
import DeleteSuccesModal from "./DeleteSuccess";
import axios from "axios";
import { API_URL } from "../../../../../../constants/constatns";

const userId = localStorage.getItem("id");

const DeletePublicModal = ({
  open,
  setOpen,
  publicObj,
  publics,
  setPublics,
}) => {
  const handleDelete = async () => {
    try {
      // Выполнение DELETE-запроса с использованием Axios
      await axios.delete(
        `${API_URL}api_communities/settings_communities/${userId}/${publicObj.id}`
      );

      // Если запрос успешен, удаляем креатив из состояния
      setPublics(publics.filter((item) => item !== publicObj));
    } catch (error) {
      console.error("Ошибка удаления", error);
    }

    // Закрытие модального окна
    setOpen(false);
    setDeleteSuccess(true);
  };

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  return (
    <>
      <DeleteSuccesModal
        open={deleteSuccess}
        setOpen={setDeleteSuccess}
        publicTitle={publicObj ? publicObj["name"] : ""}
      />
      <MyModal
        width="90%"
        isFormOpen={open}
        setIsFormOpen={() => setOpen(false)}
      >
        <Typography className="mdSizeText" sx={{ mb: 2 }}>
          Вы точно хотите удалить сообщество{" "}
          <Link>{publicObj ? publicObj["name"] : ""}</Link>?
        </Typography>
        <Box className="alignCenter">
          <Box sx={{ mr: "5px", width: "50%" }}>
            <MyButton
              onClick={handleDelete}
              options={{ background: "#D25D48" }}
            >
              Да
            </MyButton>
          </Box>
          <Box sx={{ ml: "5px", width: "50%" }}>
            <MyButton
              onClick={() => setOpen(false)}
              options={{ background: "#4CD640" }}
            >
              Нет
            </MyButton>
          </Box>
        </Box>
      </MyModal>
    </>
  );
};

export default DeletePublicModal;
