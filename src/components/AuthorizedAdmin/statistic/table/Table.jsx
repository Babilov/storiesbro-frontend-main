import { Grid, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import logToBackend from "../../../../utils/logs";

const Table = ({ statistic, open, groupInfo, startDate, endDate }) => {
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
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { md: "18px", xs: "13px" },
              fontWeight: 600,
            }}
          >
            Просмотры
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ pb: 1 }}>
          <Typography
            sx={{
              textAlign: "right",
              fontSize: { md: "18px", xs: "13px" },
              ml: 1,
              fontWeight: 600,
            }}
          >
            Заработано
          </Typography>
        </Grid>
        {statistic.map((statisticItem, index) => {
          {
            statistic.map((statisticItem, index) => {
              logToBackend(
                `startDate: ${startDate}, period_from: ${statisticItem["period_from"]} endDate: ${endDate}, period_to: ${statisticItem["period_to"]}
    ВЫРАЖЕНИЕ 1 ${startDate <= statisticItem["period_from"]} ВЫРАЖЕНИЕ 2 ${endDate >= statisticItem["period_to"]} ВЫРАЖЕНИЕ 3 ${
      startDate <= statisticItem["period_from"] &&
      endDate >= statisticItem["period_to"]
    }`
              );

              if (
                startDate <= statisticItem["period_from"] &&
                endDate >= statisticItem["period_to"]
              ) {
                return (
                  <Grid container key={index}>
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
                        {dayjs
                          .unix(statisticItem["period_from"])
                          .format("DD.MM.YYYY")}
                        -
                        {dayjs
                          .unix(statisticItem["period_to"])
                          .format("DD.MM.YYYY")}
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
                        {statisticItem["visitors"]["views"]}
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
                        {0}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }
              return null; // или можно просто ничего не возвращать
            });
          }
        })}
      </Grid>
    )
  );
};

export default Table;
