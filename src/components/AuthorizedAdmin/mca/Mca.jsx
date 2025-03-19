import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import firstVideo from "./images/IMG_8419.mp4";
import secondVideo from "./images/IMG_8420.mp4";
import thirdVideo from "./images/IMG_8417.mp4";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";
import { useLocation } from "react-router-dom";

const Mca = () => {
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
    <Box sx={{ mt: "50px" }} id="mca">
      <Typography className="description" sx={{ fontSize: "16px" }}>
        <Typography
          component="span"
          className="orange bold"
          sx={{ fontSize: "16px" }}
        >
          Стандартные МЦА
        </Typography>{" "}
        - это универсальные развлекательные истории для мужской аудитории.
      </Typography>
      <Typography className="title" sx={{ mt: 4, fontSize: "22px" }}>
        Примеры стандартных МЦА
      </Typography>
      <AuthorizedAdminCarusel
        firstVideo={firstVideo}
        secondVideo={secondVideo}
        thirdVideo={thirdVideo}
      />
    </Box>
  );
};

export default Mca;
