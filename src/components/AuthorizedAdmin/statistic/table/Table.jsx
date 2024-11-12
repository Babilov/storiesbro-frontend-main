import {Grid, Typography} from "@mui/material";
import React from "react";

const Table = ({statistic, open}) => {
    return (
        <Grid
            container
            sx={{
                border: "1px solid #CDCDCD",
                borderRadius: "10px",
                p: "16px 16px 0 16px",
                display: open ? "flex" : "none",
            }}
        >
            <Grid item xs={3} sx={{pb: 1}}>
                <Typography
                    sx={{textAlign: "left", fontSize: {md: "18px", xs: "13px"}, fontWeight: 600}}
                >
                    Сообщество
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{pb: 1}}>
                <Typography
                    sx={{textAlign: "center", fontSize: {md: "18px", xs: "13px"}, fontWeight: 600}}
                >
                    Дата
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{pb: 1}}>
                <Typography
                    sx={{textAlign: "center", fontSize: {md: "18px", xs: "13px"}, fontWeight: 600}}
                >
                    Просмотры
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{pb: 1}}>
                <Typography
                    sx={{textAlign: "right", fontSize: {md: "18px", xs: "13px"}, ml: 1, fontWeight: 600}}
                >
                    Заработано
                </Typography>
            </Grid>
            {statistic.map((statisticItem, index) => (
                <Grid container key={index}>
                    <Grid
                        item
                        xs={3}
                        sx={{borderTop: "1px solid #CDCDCD", pt: 1, pb: 1}}
                    >
                        <Typography
                            sx={{textAlign: "left", fontSize: {md: "18px", xs: "12px"}, fontWeight: 400}}
                        >
                            {statisticItem["publicTitle"]}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{borderTop: "1px solid #CDCDCD", pt: 1, pb: 1}}
                    >
                        <Typography
                            sx={{textAlign: "center", fontSize: {md: "18px", xs: "12px"}, fontWeight: 400}}
                        >
                            {statisticItem["date"]}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{borderTop: "1px solid #CDCDCD", pt: 1, pb: 1}}
                    >
                        <Typography
                            sx={{textAlign: "center", fontSize: {md: "18px", xs: "12px"}, fontWeight: 400}}
                        >
                            {statisticItem["views"]}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{borderTop: "1px solid #CDCDCD", pt: 1, pb: 1}}
                    >
                        <Typography
                            sx={{textAlign: "right", fontSize: {md: "18px", xs: "12px"}, ml: 1, fontWeight: 400}}
                        >
                            {statisticItem["money"]}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default Table;
