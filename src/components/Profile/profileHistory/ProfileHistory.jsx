import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";

import MyButton from "../../UI/buttons/MyButton";
import Comment from "./Comment";

// Функция для форматирования даты
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
};

const ProfileHistory = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [buttonId, setButton] = useState(-1);
  const [listNotification, setListNotification] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const uid = localStorage.getItem("UID");
        const response = await axios.get(
          `${API_URL}notification/send-notification/message/${uid}/`
        );
        const notifications = response.data;
        setListNotification(notifications);
      } catch (error) {
        console.error("Ошибка при загрузке уведомлений", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (id) => {
    setIsFormOpen(true);
    setButton(id);
  };

  return (
    <Box sx={{ width: "80%", m: { xs: "0 auto", lg: 0 } }}>
      {listNotification.map((notification) => (
        <Box key={notification.id}>
          <Comment
            id={notification.id}
            buttonId={buttonId}
            comment={notification.message}
            isFormOpen={isFormOpen}
            setIsFormOpen={() => setIsFormOpen(false)}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              border: "1px solid #CBCBCB",
              borderRadius: "10px",
              mb: 2,
              p: 1,
            }}
          >
            <Box sx={{ position: "relative", width: "100%" }}>
              <Typography
                sx={{ fontSize: { md: "18px", xs: "14px" }, fontWeight: 500 }}
              >
                {notification.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "14px", xs: "12px" },
                  fontWeight: 400,
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                {formatDate(notification.created)}
              </Typography>
              <Typography
                sx={{ fontSize: { md: "14px", xs: "12px" }, fontWeight: 400 }}
              >
                {notification.message}
              </Typography>
              <Box sx={{ mt: 2, width: { md: "25%", sm: "50%", xs: "80%" } }}>
                <MyButton
                  onClick={() => handleClick(notification.id)}
                  options={{ background: "#E37E31", color: "white" }}
                >
                  Комментарий
                </MyButton>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProfileHistory;
