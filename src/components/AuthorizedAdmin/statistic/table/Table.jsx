import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import InfoTooltip from "../../../UI/tooltip/InfoTooltip";

const Table = ({ statistic, open, groupInfo }) => {
  const tooltipTextRank = (
    <span>
      Рейтинг основывается на таких показателях: количество реакций на историях
      (лайки, ответы), общий коэффициент переходов по ссылкам с сообщества. Чем
      активнее сообщество, тем больше заработок.{" "}
      <a
        href="/admin-help#section1"
        style={{ textDecoration: "none", color: "#2A5885" }}
      >
        Рекомендации
      </a>
    </span>
  );

  const tooltipTextPrice = (
    <span>
      Хотите увеличить свой заработок? Мы подготовили для Вас{" "}
      <a
        href="/admin-help#section1"
        style={{ textDecoration: "none", color: "#2A5885" }}
      >
        рекомендации
      </a>{" "}
      по повышению дохода с монетизации историй.
    </span>
  );
  return (
    groupInfo && (
      <Grid
        container
        sx={{
          border: "1px solid #CDCDCD",
          borderRadius: "10px",
          p: "16px 16px 0 16px",
          display: open ? "flex" : "none",
        }}
      >
        <Grid item xs={3} sx={{ pb: 1 }}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { md: "18px", xs: "13px" },
              fontWeight: 600,
            }}
          >
            Сообщество
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ pb: 1 }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { md: "18px", xs: "13px" },
              fontWeight: 600,
            }}
          >
            Дата
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { md: "18px", xs: "13px" },
                fontWeight: 600,
                mr: 1,
              }}
            >
              Рейтинг
            </Typography>
            <InfoTooltip
              tooltipText={tooltipTextRank}
              placement="top"
              size={19}
            />
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                textAlign: "right",
                fontSize: { md: "18px", xs: "13px" },
                ml: 1,
                mr: 1,
                fontWeight: 600,
              }}
            >
              Заработано
            </Typography>
            <InfoTooltip
              tooltipText={tooltipTextPrice}
              placement="top"
              size={19}
            />
          </Box>
        </Grid>
        {console.log(statistic)}
        {statistic &&
          Object.entries(statistic).map(([date, info]) => {
            return (
              <Grid container key={date}>
                <Grid
                  item
                  xs={3}
                  sx={{ borderTop: "1px solid #CDCDCD", pt: 1, pb: 1 }}
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontSize: { md: "18px", xs: "12px" },
                      fontWeight: 400,
                    }}
                  >
                    {groupInfo["name"]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ borderTop: "1px solid #CDCDCD", pt: 1, pb: 1 }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: { md: "18px", xs: "12px" },
                      fontWeight: 400,
                    }}
                  >
                    {date}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ borderTop: "1px solid #CDCDCD", pt: 1, pb: 1 }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: { md: "18px", xs: "12px" },
                      fontWeight: 400,
                    }}
                  >
                    {info.rank}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ borderTop: "1px solid #CDCDCD", pt: 1, pb: 1 }}
                >
                  <Typography
                    sx={{
                      textAlign: "right",
                      fontSize: { md: "18px", xs: "12px" },
                      ml: 1,
                      fontWeight: 400,
                    }}
                  >
                    {Math.floor((parseInt(info.views) / 1000) * 25)}₽
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    )
  );
};

export default Table;
