import React from "react";
import {Box, Typography} from "@mui/material";

import vca from "./images/vca.png";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";
import firstVideo from "./images/IMG_8429.mp4";
import secondVideo from "./images/IMG_8428.mp4";
import thirdVideo from "./images/IMG_8427.mp4";

const Vca = () => {
    return (
        <Box sx={{mt: 5}}>
            <Typography className="description">
                <Typography component="span" className="orange bold">
                    Стандартные СЦА
                </Typography>{" "}
                - это универсальные развлекательные истории для мужской и женской
                аудитории старше 25 лет.
            </Typography>
            <Typography className="title" sx={{mt: 4}}>
                Примеры стандартных СЦА
            </Typography>
            <AuthorizedAdminCarusel firstVideo={firstVideo} secondVideo={secondVideo} thirdVideo={thirdVideo}/>
        </Box>
    );
};

export default Vca;
