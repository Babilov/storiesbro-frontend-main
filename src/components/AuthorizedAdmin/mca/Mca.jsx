import React from "react";
import { Box, Typography } from "@mui/material";

import mca from "./images/mca.png";
import firstVideo from "./images/IMG_8419.mp4";
import secondVideo from "./images/IMG_8420.mp4";
import thirdVideo from "./images/IMG_8417.mp4"
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";

const Mca = () => {
  return (
    <Box>
      <Typography className="description">
        <Typography component="span" className="orange bold">
          Стандартные МЦА
        </Typography>{" "}
        - это универсальные развлекательные истории для мужской аудитории.
      </Typography>
      <Typography className="title" sx={{ mt: 4 }}>
        Примеры стандартных МЦА
      </Typography>
      <AuthorizedAdminCarusel firstVideo={firstVideo} secondVideo={secondVideo} thirdVideo={thirdVideo} />
    </Box>
  );
};

export default Mca;
