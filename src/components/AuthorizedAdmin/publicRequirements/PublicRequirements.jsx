import {Grid, Link, Typography} from "@mui/material";
import React from "react";

const PublicRequirements = () => {
    return (
        <Grid
            container
            columnGap={10}
            sx={{justifyContent: "center", mb: 5, mt: 5}}
        >
            <Grid item xs={12}>
                <Typography
                    sx={{
                        fontSize: {md: "32px", xs: "22px"},
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 2,
                    }}
                >
                    Требования к сообществам
                </Typography>
            </Grid>
            <Grid
                item
                md={3}
                xs={12}
                sx={{border: "1px solid #CBCBCB", borderRadius: "10px", p: 2, mb: 1}}
            >
                <Typography
                    sx={{
                        fontSize: {md: "18px", xs: "16px"},
                        fontWeight: {md: 600, xs: 500},
                        textAlign: "center",
                    }}
                >
                    Должно быть “активным” Без мусорного контента, накрутки т.п.
                </Typography>
            </Grid>

            <Grid
                item
                md={3}
                xs={12}
                sx={{
                    border: "1px solid #CBCBCB",
                    borderRadius: "10px",
                    p: 2,
                    mb: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {md: "18px", xs: "16px"},
                        fontWeight: {md: 600, xs: 500},
                        textAlign: "center",
                    }}
                >
                    Соответствуют правилам{" "}
                    <Link href="https://vk.com/terms" target="_blank">
                        Вконтакте
                    </Link>{" "}
                    и законодательству РФ
                </Typography>
            </Grid>

            <Grid
                item
                md={3}
                xs={12}
                sx={{
                    border: "1px solid #CBCBCB",
                    borderRadius: "10px",
                    p: 2,
                    display: "table",
                    overflow: "hidden",
                }}
            >
                <Typography
                    sx={{
                        fontSize: {md: "18px", xs: "16px"},
                        fontWeight: {md: 600, xs: 500},
                        textAlign: "center",
                        display: "table-cell",
                        verticalAlign: "middle",
                    }}
                >
                    Минимум 20.000 подписчиков
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PublicRequirements;
