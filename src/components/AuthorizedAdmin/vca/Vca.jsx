import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import vca from "./images/vca.png";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";
import firstVideo from "./images/IMG_8429.mp4";
import secondVideo from "./images/IMG_8428.mp4";
import thirdVideo from "./images/IMG_8427.mp4";
import { useLocation } from "react-router-dom";

const Vca = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <Box sx={{ mt: 5 }} id="vca">
      <Typography className="description">
        <Typography component="span" className="orange bold">
          Стандартные СЦА
        </Typography>{" "}
        - это универсальные развлекательные истории для мужской и женской
        аудитории старше 25 лет.
      </Typography>
      <Typography className="title" sx={{ mt: 4 }}>
        Примеры стандартных СЦА
      </Typography>
      <AuthorizedAdminCarusel
        firstVideo={firstVideo}
        secondVideo={secondVideo}
        thirdVideo={thirdVideo}
      />
    </Box>
  );
};

export default Vca;
