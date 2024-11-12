import React from "react";
import { Box, Typography } from "@mui/material";

import steps from "./images/steps.png";
import { useNavigate } from "react-router-dom";

const CustomerHelp = () => {
  const navigate = useNavigate();

  return (
    <Box className="grid">
      <Box sx={{ position: "relative", mb: 3 }}>
        <Box component="img" alt="steps" src={steps} />
        <Typography
          className="xlSizeText"
          sx={{ position: "absolute", top: 5, width: "60%" }}
        >
          Как{" "}
          <Typography component="span" className="orange xlSizeText">
            {" "}
            заказать{" "}
          </Typography>
          рекламу на платформе
        </Typography>
      </Box>

      <Box>
        <Typography className="xlSizeText">
          <Typography component="span" className="xlSizeText orange">
            Требования
          </Typography>{" "}
          к креативам
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1, mt: 3 }}>
          1. Доба Соответствуют правилам Вконтакте{" ("}
          <Typography
            component="span"
            className="orange md500SizeText"
            onClick={() => navigate("https://vk.com/terms")}
            sx={{ cursor: "pointer" }}
          >
            https://vk.com/terms
          </Typography>
          {") "}и законодательству РФ.
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1 }}>
          2. Вес файла не должен превышать 10 МБ.
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1 }}>
          3. Минимальный размер файла - 720×1280 пикселей.
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1 }}>
          4. Максимальная длительность видео в истории - 5 секунд.
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1 }}>
          5. Видеокодек H.264 (настройка сжатия видео).
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 1 }}>
          6. Аудиокодек AAC (настройка сжатия звука в видеофайле).
        </Typography>
        <Typography className="md500SizeText" sx={{ mb: 3 }}>
          6. Формат: фото/видео.
        </Typography>

        <Typography className="xlSizeText">
          Как{" "}
          <Typography component="span" className="xlSizeText orange">
            повысить{" "}
          </Typography>
          конверсию рекламного креатива
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1, mt: 3 }}>
          1.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Добавляйте “популярную” музыку.
          </Typography>
          Проверено, что конверсия креативов с “популярными” песнями в разы
          выше, чем с просто мелодиями/без песен.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          2.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Соблюдайте пропорции.
          </Typography>
          Большинство пользователей просматривают истории с мобильных устройств,
          поэтому 9:16 - наиболее подходящее соотношение сторон.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          3.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Ориентируйтесь на качественный монтаж и исходники.
          </Typography>
          При одинаковом содержании, у плавных и внешне привлекательных
          креативов выше конверсия, чем у сделанных “на коленке”.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          4.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Не забывайте про рекламные основы.
          </Typography>
          AIDA, ODC, PPPP и остальные формулы - “друзья” высокой конверсии.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          5.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Захватывайте внимание в первые секунды.
          </Typography>
          Если не зацепить внимание пользователя, то он просто “пропустит”
          историю и конверсия упадёт.
        </Typography>

        <Typography className="mdSizeText" sx={{ mb: 1 }}>
          6.{" "}
          <Typography component="span" className="mdBoldSizeText">
            Призывайте к действию.
          </Typography>
          Добавление “стрелок”, указателей и призывов к переходу по кнопке -
          повышает конверсию.
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomerHelp;
