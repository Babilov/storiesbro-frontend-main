import React from "react";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";

import jca from "./images/jca.png";
import {Box, Typography} from "@mui/material";
import firstVideo from "./images/IMG_8426.mp4";
import secondVideo from "./images/IMG_8425.mp4";
import thirdVideo from "./images/IMG_8423.mp4";

const Jca = () => {
    return (
        <Box sx={{mt: 5}}>
            <Typography className="description">
                {" "}
                <Typography component="span" className="orange bold">
                    Стандартные ЖЦА{" "}
                </Typography>
                - это универсальные развлекательные истории для женской аудитории
            </Typography>
            <Typography className="title" sx={{mt: 4}}>
                Примеры стандартных ЖЦА
            </Typography>
            <AuthorizedAdminCarusel firstVideo={firstVideo} secondVideo={secondVideo} thirdVideo={thirdVideo}/>
        </Box>
    );
};

export default Jca;
