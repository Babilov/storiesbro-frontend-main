import React, { useEffect } from "react";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";

import jca from "./images/jca.png";
import { Box, Typography } from "@mui/material";
import firstVideo from "./images/IMG_8426.mp4";
import secondVideo from "./images/IMG_8425.mp4";
import thirdVideo from "./images/IMG_8423.mp4";
import { useLocation } from "react-router-dom";

const Jca = () => {
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
    <Box sx={{ mt: 5 }} id="jca">
      <Typography className="description">
        {" "}
        <Typography component="span" className="orange bold">
          Стандартные ЖЦА{" "}
        </Typography>
        - это универсальные развлекательные истории для женской аудитории
      </Typography>
      <Typography className="title" sx={{ mt: 4 }}>
        Примеры стандартных ЖЦА
      </Typography>
      <AuthorizedAdminCarusel
        firstVideo={firstVideo}
        secondVideo={secondVideo}
        thirdVideo={thirdVideo}
      />
    </Box>
  );
};

export default Jca;
