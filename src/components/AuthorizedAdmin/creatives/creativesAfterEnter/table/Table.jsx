import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import DeletePublicModal from "./modals/DeletePublicModal";
import { get_list } from "../../../../../api/publics";
import { Tooltips } from "../../../../Onboardings/Tooltips";
import logToBackend from "../../../../../utils/logs";

const Table = ({ publics, setPublics }) => {
  const handleDelete = (id) => {
    setPublicObj(publics.filter((item) => item["id"] === id)[0]);
    setDeletPublic(true);
  };

  const [count, setCount] = useState(1);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  const [deletePublic, setDeletPublic] = useState(false);
  const [publicObj, setPublicObj] = useState(null);

  return (
    <Box onClick={handleIncrementCount}>
      <DeletePublicModal
        open={deletePublic}
        setOpen={setDeletPublic}
        setPublics={setPublics}
        publics={publics}
        publicObj={publicObj}
      />
      <Box
        sx={{
          border: "1px solid #CDCDCD",
          borderRadius: "10px",
          p: "0 25px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            p: 2,
          }}
          className="adminTitles"
        >
          {count === 1 && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)", // полупрозрачный черный цвет
                  zIndex: 9999, // чтобы быть поверх остальных элементов
                }}
              ></div>
              <Tooltips text="Здесь вы можете посмотреть и добавить ваши сообщества по названию (id группы) или по ссылке."></Tooltips>
            </>
          )}
          <Grid item xs={3}>
            <Typography variant="h4">Сообщество</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">Название</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h4">Статус</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Divider />
        {logToBackend(publics)}
        {publics.map((publicObj) => (
          <Grid
            container
            key={[publicObj["id"]]}
            className="adminPublics"
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #CDCDCD",
              pt: 1,
              pb: 1,
            }}
          >
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                alt="group avatar"
                src={publicObj["image"]}
                sx={{ borderRadius: "50%", height: "90px", width: "90px" }}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography>{publicObj["name"]}</Typography>
            </Grid>

            <Grid item md={2}>
              <Typography
                className="mdSizeText"
                /*                                                                                                                                                                 */
              >
                Ждет проверку
                {/*
                {publicObj["status_of_check"] === 1
                  ? "Ждет проверку"
                  : publicObj["status_of_check"] === 2
                    ? "Одобрено"
                    : publicObj["status_of_check"] === 3
                      ? "Отклонено"
                      : publicObj["status_of_check"]}
                      */}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Link
                to={`/publics/setting/${publicObj["id"]}`}
                sx={{
                  m: 2,
                  cursor: "pointer",
                }}
                className="linkItem"
              >
                Настройки
              </Link>
              <Typography>|</Typography> */}
              <Typography
                className="delete"
                sx={{
                  cursor: "pointer",

                  ":hover": { color: "#E37E31" },
                }}
                onClick={() => handleDelete(publicObj["id"])}
              >
                Удалить
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {publics.map((publicObj) => (
          <Box className="grayBorder" sx={{ mb: 2 }} key={publicObj["id"]}>
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #CBCBCB",
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Avatar
                  alt="avatar"
                  src={publicObj["image"]}
                  sx={{
                    m: 2,
                    borderRadius: "50%",
                    height: "70px",
                    width: "70px",
                  }}
                />
                <Typography sx={{ fontSize: "12px", fontWeight: 600, mt: 2 }}>
                  {publicObj["name"]}
                </Typography>
              </Box>
              <Typography
                sx={{
                  position: "absolute",
                  right: 10,
                  bottom: 2,
                  fontSize: "12px",
                  /*
                                                                                            color:
                                                                                              publicObj["status"] === "Активен"
                                                                                                ? "green"
                                                                                                : publicObj["status"] === "Отклонён"
                                                                                                  ? "red"
                                                                                                  : "black",
                                                                          
                                                                                          */
                }}
              >
                Ждет проверку
              </Typography>
            </Box>
            <Box className="spaceAround">
              <Link
                to={`/publics/setting/${publicObj["id"]}`}
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  textDecoration: "none",
                  m: 2,
                  cursor: "pointer",
                }}
              >
                Настройки
              </Link>
              <Typography sx={{ color: "#CBCBCB", m: 2 }}>|</Typography>
              <Typography
                sx={{ fontSize: "12px", m: 2, cursor: "pointer" }}
                onClick={() => handleDelete(publicObj["id"])}
              >
                Удалить
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
