import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Tooltips } from "../../Onboardings/Tooltips";
import redirectPng from "./images/redirect.png";

const AddCreative = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  return (
    <Box className="grid" onClick={handleIncrementCount}>
      <Box
        component="img"
        alt="back"
        src={redirectPng}
        sx={{
          position: "absolute",
          float: "left",
          width: "45px",
          height: "38",
          cursor: "pointer",
        }}
        onClick={() => navigate("/creatives")}
      />
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
          <Tooltips text="Здесь вы можете создать креатив, и выбрать его тип."></Tooltips>
        </>
      )}
      <Typography className="title">Вид креатива</Typography>
      <Box className="columnCenter">
        <Typography
          className="grayBorder sm500"
          sx={{
            pt: 1,
            pb: 1,
            // zIndex:10002,
            width: { md: "20%", xs: "100%" },
            textAlign: "center",
            mb: 2,
            cursor: " pointer",
            transition: ".3s",
            ":hover": { filter: "brightness(50%)" },
          }}
          onClick={() => navigate("/creatives/add-creative/single")}
        >
          Одиночный
        </Typography>
        <Typography
          className="grayBorder sm500"
          sx={{
            pt: 1,
            pb: 1,
            zIndex: count === 2 && 10003,
            width: { md: "20%", xs: "100%" },
            textAlign: "center",
            mb: 2,
            color: count === 2 && "#fff",
            cursor: " pointer",
            transition: ".3s",
            ":hover": { filter: "brightness(50%)" },
          }}
          onClick={() => navigate("/creatives/add-creative/double/1")}
        >
          Двойной
        </Typography>
        <Typography
          className="grayBorder sm500"
          sx={{
            pt: 1,
            pb: 1,
            // zIndex:10002,
            width: { md: "20%", xs: "100%" },
            textAlign: "center",
            mb: 2,
            cursor: " pointer",
            transition: ".3s",
            ":hover": { filter: "brightness(50%)" },
          }}
          onClick={() => navigate("/creatives/add-creative/repost")}
        >
          Репост
        </Typography>
        <Typography
          className="grayBorder sm500"
          sx={{
            pt: 1,
            pb: 1,
            // zIndex:10002,
            width: { md: "20%", xs: "100%" },
            textAlign: "center",
            mb: 2,
            cursor: " pointer",
            transition: ".3s",
            ":hover": { filter: "brightness(50%)" },
          }}
          onClick={() => navigate("/creatives/add-creative/sticker-link")}
        >
          Ссылка-стикер
        </Typography>
        <Typography
          className="grayBorder sm500"
          sx={{
            pt: 1,
            pb: 1,
            // zIndex:10002,
            width: { md: "20%", xs: "100%" },
            textAlign: "center",
            mb: 2,
            cursor: " pointer",
            transition: ".3s",
            ":hover": { filter: "brightness(50%)" },
          }}
          onClick={() =>
            navigate("/creatives/add-creative/double-sticker-link")
          }
        >
          Двойная ссылка-стикер
        </Typography>
        {count === 2 && (
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
            <Tooltips text="Вот это все виды креативов"></Tooltips>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AddCreative;
