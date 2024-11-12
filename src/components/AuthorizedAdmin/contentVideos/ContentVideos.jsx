import {Grid, Typography} from "@mui/material";
import React from "react";
// import Mca from "../mca/Mca";

import Jca from "../jca/Jca";
import Vca from "../vca/Vca";
import Mca from "../mca/Mca";

const ContentVideos = () => {
    return (
        <Grid
            item
            xs={12}
            sx={{
                m: "50px auto",
                overflow: "hidden",
            }}
            className="grid"
        >
            <Typography variant="h4" className="title">
                Что такое контент-видео и его виды
            </Typography>
            <Typography className="description">
                <Typography className="bold description" component="span">Контент-видео </Typography> - это история,
                которая публикуется вместе с креативом.
            </Typography>
            <Typography className="description">
                Контентные истории нужны для повышения активности в истории. Они имеют
                накопительный эффект - аудитория привыкает на постоянной основе
                просматривать истории в сообществе и благодаря этому идёт рост
                просмотров.
            </Typography>
            {/*
        <Typography className="description">
        Представьте себя на месте подписчика - Вам будет интересно смотреть
        только одну рекламу?
      </Typography>
      */}

            <Typography className="description">
                У нас есть 3 вида контент-видео:{" "}
                <Typography component="span" className="orange description">
                    стандартные МЦА, стандартные ЖЦА и стандартные СЦА.
                </Typography>
            </Typography>
            <Mca/>

            <Jca/>

            <Vca/>
        </Grid>
    );
};

export default ContentVideos;
