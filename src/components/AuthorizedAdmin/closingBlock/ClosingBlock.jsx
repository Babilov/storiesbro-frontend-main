import {Box, Grid, Typography} from "@mui/material";
import React, {useState} from "react";

import instruction from "./images/instruction.svg";
import cross from "./images/cross.svg";
import iphone from "./images/iphone.png";
import android from "./images/android.png";

const ClosingBlock = () => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <Grid
                className="orangeBorder"
                sx={{
                    p: "40px 40px 14px 40px",
                    position: "relative",
                    display: {md: open ? "flex" : "none", xs: "none"},
                    m: "0 auto",
                }}
                columnSpacing={5}
            >
                <Box
                    component="img"
                    alt="cross"
                    src={cross}
                    sx={{position: "absolute", top: 10, right: 10, cursor: "pointer"}}
                    onClick={() => setOpen(false)}
                />
                <Grid item xs={7} sx={{mt: 5, mb: 3}}>
                    <Typography sx={{fontSize: "32px", fontWeight: 600, mb: 3}}>
                        Добавьте Storisbro на рабочий стол, чтобы управлять доходом
                        максимально быстро и комфортно
                    </Typography>
                    <Typography sx={{fontSize: "24px", fontWeight: 400, mb: "12px"}}>
                        1. Выделите ссылку сайта
                    </Typography>
                    <Typography sx={{fontSize: "24px", fontWeight: 400}}>
                        2. Перенесите её на рабочий стол
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Box
                        component="img"
                        alt="instruction"
                        src={instruction}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                className="orangeBorder"
                sx={{
                    p: "40px 10px",
                    position: "relative",
                    display: {xs: open ? "flex" : "none", md: "none"},
                    m: "0 auto",
                }}
            >
                <Box
                    component="img"
                    alt="cross"
                    src={cross}
                    sx={{position: "absolute", top: 10, right: 10, cursor: "pointer"}}
                    onClick={() => setOpen(false)}
                />
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            textAlign: "center",
                            mb: "15px",
                        }}
                    >
                        Добавьте Storisbro на главный экран, чтобы управлять доходом
                        максимально просто и быстро
                    </Typography>
                </Grid>
                <Grid container sx={{alignItems: "center", mb: "20px", pr: "50px"}}>
                    <Grid item xs={8} sx={{alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontWeight: 600}}>
                            Для IOS
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            1. Зайдите в Storisbro через Safari
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            2. Откройте меню в нижней части экрана
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            3. Выберите пункт “На экран домой”
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="img"
                            alt="iphone"
                            src={iphone}
                            sx={{
                                width: "auto",
                                height: "250px",
                                imageRendering: "crisp-edges",
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container sx={{alignItems: "center", pr: "50px"}}>
                    <Grid item xs={8} sx={{alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontWeight: 600}}>
                            Для Android
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            1. Зайдите в Storisbro через Chrome
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            2. Откройте меню в верхней части экрана
                        </Typography>
                        <Typography sx={{fontSize: "14px"}}>
                            3. Выберите пункт “Добавить на гл. экран”
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="img"
                            alt="android"
                            src={android}
                            sx={{
                                width: "auto",
                                height: "250px",
                                imageRendering: "crisp-edges",
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ClosingBlock;
