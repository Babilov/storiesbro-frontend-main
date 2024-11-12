import React, { useState, useEffect } from "react";
import { getDates } from "./utils/getDates";
import MyButton from "../../UI/buttons/MyButton";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDatesAction } from "../../../store/creativeReducer";
import { Tooltips } from "../../Onboardings/Tooltips";

const Table = () => {
  const [buttonClicked, setButtonClicked] = useState(Array(14).fill(false));
  const [days, setDays] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDays = await getDates();
        setDays(fetchedDays);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании компонента

  const handleClick = (index) => {
    const temp = [...buttonClicked];
    temp[index] = !buttonClicked[index];
    setButtonClicked(temp);
  };

  const handleNextPage = () => {
    const temp = [];
    buttonClicked.forEach((item, i) => {
      if (item === true) {
        temp.push(days[i]);
      }
    });
    dispatch(setDatesAction(temp));
    navigate("/reservation/choose-creative");
  };

  return (
    <Box className="grid" sx={{ mb: 8 }} onClick={handleIncrementCount}>
      {count === 1 && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // полупрозрачный черный цвет
              zIndex: 9999, // чтобы быть поверх остальных элементов
            }}
          ></div>
          <Tooltips text="Здесь вы можете выбрать дату публикации свои добавленных креативов"></Tooltips>
        </>
      )}
      <Typography className="lSizeText" sx={{ mt: 3 }}>
        Выберите место
      </Typography>
      <Grid container sx={{ m: "0 auto" }} columnSpacing={1} rowSpacing={3}>
        {days.map((item, i) => (
          <Grid item md={11.9 / 7} xs={6} key={item["day"]} sx={{ mb: 2 }}>
            <Box
              className="grayBorder"
              sx={{
                background: item["count_room"] === 0 && "#CBCBCB",
                mb: 1,
              }}
            >
              <Typography className="centerText description">
                {new Date(item.date)
                  .toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                  .replace(/\//g, ".")}
              </Typography>
              <Typography className="centerText">
                {item["count_room"]}{" "}
                {" " +
                  (item["count_room"] === 0
                    ? "мест"
                    : item["count_room"] === 1
                    ? "место"
                    : "места")}
              </Typography>
            </Box>
            {item["count_room"] !== 0 && (
              <>
                <MyButton
                  options={{
                    background: "#E37E31",
                    display: buttonClicked[i] && "none",
                  }}
                  disabled={buttonClicked[i]}
                  onClick={() => handleClick(i)}
                >
                  Выбрать
                </MyButton>
                <MyButton
                  onClick={() => handleClick(i)}
                  options={{
                    background: "#4CD640",
                    display: !buttonClicked[i] && "none",
                  }}
                  disabled={!buttonClicked[i]}
                >
                  Выбрано
                </MyButton>
              </>
            )}
          </Grid>
        ))}
      </Grid>
      {buttonClicked.some((el) => el) && (
        <Box sx={{ m: "0 auto", width: { md: "18%", xs: "50%" } }}>
          <MyButton
            onClick={handleNextPage}
            options={{ background: "#4CD640" }}
          >
            Далее
          </MyButton>
        </Box>
      )}
    </Box>
  );
};

export default Table;
