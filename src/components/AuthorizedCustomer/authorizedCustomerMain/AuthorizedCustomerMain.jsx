import React from "react";
import { Box, Typography } from "@mui/material";

import steps from "./images/steps.png";

const AuthorizedCustomerMain = () => {
  return (
    <Box sx={{ position: "relative" }} className="grid">
      <Typography
        sx={{ position: { md: "absolute", xs: "relative" }, width: "60%" }}
        className="xlSizeText"
      >
        Как
        <Typography component="span" className="orange xlSizeText">
          {" "}
          заказать{" "}
        </Typography>
        рекламу на платформе
      </Typography>
      <Box
        component="img"
        alt="stpes"
        src={steps}
        sx={{ display: { md: "block", xs: "none" } }}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">1</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Пополняем баланс
          </Typography>
        </Box>

        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">2</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Загружаем креатив
          </Typography>
        </Box>

        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">3</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Бронируем места
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography className="xlSizeText" sx={{ mb: 3 }}>
          Как
          <Typography component="span" className="orange xlSizeText">
            {" "}
            повысить{" "}
          </Typography>
          конверсию рекламного креатива
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          1.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Добавляйте “популярную” музыку.{" "}
          </Typography>{" "}
          Проверено, что конверсия креативов с “популярными” песнями в разы
          выше, чем с просто мелодиями/без песен.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          2.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Соблюдайте пропорции.{" "}
          </Typography>{" "}
          Большинство пользователей просматривают истории с мобильных устройств,
          поэтому 9:16 - наиболее подходящее соотношение сторон.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          3.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Ориентируйтесь на качественный монтаж и исходники.{" "}
          </Typography>{" "}
          При одинаковом содержании, у плавных и внешне привлекательных
          креативов выше конверсия, чем у сделанных “на коленке”.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          4.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Не забывайте про рекламные основы.{" "}
          </Typography>{" "}
          AIDA, ODC, PPPP и остальные формулы - “друзья” высокой конверсии.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          5.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Захватывайте внимание в первые секунды.{" "}
          </Typography>{" "}
          Если не зацепить внимание пользователя, то он просто “пропустит”
          историю и конверсия упадёт.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 3 }}>
          6.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Призывайте к действию.{" "}
          </Typography>{" "}
          Добавление “стрелок”, указателей и призывов к переходу по кнопке -
          повышает конверсию.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthorizedCustomerMain;
