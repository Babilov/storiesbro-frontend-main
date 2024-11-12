import React from "react";
import {Box, Typography} from "@mui/material";
import stepsImg from "./images/stepsImg.png";

const Steps = () => {
    const FONT_SIZE_XL = "38px";
    const FONT_SIZE_MD = "18px";
    const FONT_WEIGHT_XL = 600;
    return (
        <Box sx={{position: "relative"}} className="grid">
            <Typography
                variant="h3"
                sx={{
                    fontSize: {md: FONT_SIZE_XL, xs: FONT_SIZE_MD},
                    fontWeight: FONT_WEIGHT_XL,
                    width: {md: "50%", xs: "100%"},
                    position: {md: "absolute", xs: "relative"},
                    mb: 2,
                    top: 0,
                    left: 0,
                }}
            >
                Как{" "}
                <Typography
                    component="span"
                    className="orange"
                    sx={{
                        fontSize: {md: FONT_SIZE_XL, xs: FONT_SIZE_MD},
                        fontWeight: FONT_WEIGHT_XL,
                    }}
                >
                    заказать
                </Typography>{" "}
                рекламу на платформе
            </Typography>
            <Box
                component="img"
                src={stepsImg}
                sx={{width: "100%", display: {xs: "none", md: "block"}}}
            />
            <Box
                sx={{
                    flexDirection: "column",
                    display: {md: "none", xs: "flex"},
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">1</Typography>
                    <Typography sx={{fontSize: "14px", fontWeight: 400}}>
                        Пополняем баланс
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">2</Typography>
                    <Typography sx={{fontSize: "14px", fontWeight: 400}}>
                        Загружаем креатив
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">3</Typography>
                    <Typography sx={{fontSize: "14px", fontWeight: 400}}>
                        Бронируем места
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography className="gradient">4</Typography>
                    <Typography sx={{fontSize: "14px", fontWeight: 400}}>
                        Получаем статистику
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Steps;
