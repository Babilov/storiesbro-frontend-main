import {Box, Typography} from "@mui/material";
import React from "react";

import helpSteps from "./images/steps.png";

const HelpSteps = () => {
    return (
        <Box sx={{position: "relative"}} className="grid">
            <Typography
                sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                    position: {xs: "relative", md: "absolute"},
                    width: {md: "50%", xs: "100%"},
                    mb: 2,
                }}
            >
                Как{" "}
                <Typography
                    sx={{fontSize: "32px", fontWeight: 600, mt: 3}}
                    component="span"
                    className="orange"
                >
                    монетизировать
                </Typography>{" "}
                сообщество?
            </Typography>
            <Box
                component="img"
                alt="steps"
                src={helpSteps}
                sx={{width: "100%", display: {xs: "none", md: "block"}}}
            />
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box
                    sx={{
                        display: {md: "none", xs: "flex"},
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">1</Typography>
                    <Typography sx={{fontSize: "16px", fontWeight: 400}}>
                        Подключаем аккаунт Вконтакте
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: {md: "none", xs: "flex"},
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">2</Typography>
                    <Typography sx={{fontSize: "16px", fontWeight: 400}}>
                        Добавляем и настраиваем сообщества
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: {md: "none", xs: "flex"},
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">3</Typography>
                    <Typography sx={{fontSize: "16px", fontWeight: 400}}>
                        Получаем статистику
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: {md: "none", xs: "flex"},
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">4</Typography>
                    <Typography sx={{fontSize: "16px", fontWeight: 400}}>
                        Бронируем путёвку в Дубай)
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HelpSteps;
