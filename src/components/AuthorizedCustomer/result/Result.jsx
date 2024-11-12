import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MyButton from "../../UI/buttons/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const Result = () => {
  const data = useSelector((store) => store.creative);

  const navigate = useNavigate();

  const dates = data["dates"];
  const creative = data["creative"];
  const noMoney = true;

  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
    /* Другие стили, если необходимо */
  };

  const apiUrl = `${API_URL}api_creatives/all_creatives/${creative["creative_type"]}/${creative["id"]}/`;
  const dataToUpdate = {
    reservation: dates.map((date) => date.id),
  };

  const handleNextButtonClick = async () => {
    try {
      // Выполните ваш PATCH-запрос перед навигацией
      await axios.patch(apiUrl, dataToUpdate);
      // После успешного PATCH-запроса, выполните навигацию
      !noMoney
        ? navigate("/reservation/success")
        : navigate("/reservation/last-step");
    } catch (error) {
      console.error("Ошибка PATCH-запроса:", error);
    }
  };

  return (
    <Box className="grid">
      <Typography className="title">Выбранные места</Typography>
      <Grid container sx={{ justifyContent: "center" }} columnSpacing={3}>
        {dates.map((date) => (
          <Grid item md={2} xs={6}>
            <Box className="grayBorder">
              <Typography className="description centerText">
                {new Date(date["date"])
                  .toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                  .replace(/\//g, ".")}
              </Typography>
              <Typography
                className="mdSizeText centerText"
                sx={{ color: "#878787" }}
              >
                {date["count_room"]}{" "}
                {date["count_room"] === 1
                  ? "место"
                  : date["count_room"] >= 2 && date["count_room"] <= 4
                  ? "места"
                  : "мест"}
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#4CD640",
                borderRadius: "10px",
                color: "white",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1.5,
              }}
            >
              Выбрано
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ mt: 5 }} className="title">
        Выбранный креатив
      </Typography>
      <Box
        className="grayBorder alignCenter"
        sx={{ width: { md: "30%", xs: "100%" }, m: "0 auto" }}
      >
        <Box component="img" alt="img" src={creative["file"]} sx={{ mr: 2 }} />
        <Typography>
          {creative["name"]} ({creative["date"]})
        </Typography>
      </Box>
      <Box sx={{ width: { md: "20%", xs: "40%" }, m: "0 auto", mt: 2 }}>
        <MyButton
          onClick={handleNextButtonClick}
          options={{ background: "#4CD640" }}
        >
          Далее
        </MyButton>
        <Typography className="orange" sx={{ textAlign: "center", mt: 1 }}>
          <Link to="/reservations" style={linkStyles}>
            Отмена
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Result;
