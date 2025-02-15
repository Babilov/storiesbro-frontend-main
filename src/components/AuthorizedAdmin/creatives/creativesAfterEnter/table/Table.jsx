import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import DeletePublicModal from "./modals/DeletePublicModal";
import { Tooltips } from "../../../../Onboardings/Tooltips";
import logToBackend from "../../../../../utils/logs";

const Table = ({ publics, setPublics }) => {
  const handleDelete = (id) => {
    setPublicObj(publics.filter((item) => item["id"] === id)[0]);
    setDeletePublic(true);
  };

  const [count, setCount] = useState(1);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  const [deletePublic, setDeletePublic] = useState(false);
  const [publicObj, setPublicObj] = useState(null);

  useEffect(() => {
    document.body.classList.add("no-scrollbar");

    return () => {
      document.body.classList.remove("no-scrollbar");
    };
  }, [publics]);

  return (
    <Box onClick={handleIncrementCount} sx={{ mb: 2 }}>
      <DeletePublicModal
        open={deletePublic}
        setOpen={setDeletePublic}
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
        {publics.map((publicObj) => (
          <Grid
            container
            key={publicObj["group_id"]}
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
                src={publicObj["photo"]}
                sx={{ borderRadius: "50%", height: "90px", width: "90px" }}
              />
            </Grid>

            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Link
                to={publicObj["link"]}
                style={{
                  textAlign: "center",
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  target: "_blank",
                }}
              >
                {publicObj["name"]}
              </Link>
            </Grid>

            <Grid item md={2}>
              <Typography className="mdSizeText" sx={{ color: "#4CD640" }}>
                Активен
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
              <Link
                to={`/publics/setting/${publicObj["group_id"]}`}
                sx={{
                  m: 2,
                  cursor: "pointer",
                }}
                className="linkItem"
              >
                Настройки
              </Link>
              {/*<Typography>|</Typography>
              <Typography
                className="delete"
                sx={{
                  cursor: "pointer",

                  ":hover": { color: "#E37E31" },
                }}
                onClick={() => handleDelete(publicObj["group_id"])}
              >
                Отключить
              </Typography>
              */}
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {publics.map((publicObj) => (
          <Box
            className="grayBorder"
            sx={{ mb: 2 }}
            key={publicObj["group_id"]}
          >
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
                  src={publicObj["photo"]}
                  sx={{
                    m: 2,
                    borderRadius: "50%",
                    height: "70px",
                    width: "70px",
                  }}
                />
                <Link
                  to={publicObj["link"]}
                  style={{
                    textAlign: "center",
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginTop: "16px",
                    target: "_blank",
                  }}
                >
                  {publicObj["name"]}
                </Link>
              </Box>
              <Typography
                sx={{
                  position: "absolute",
                  right: 10,
                  bottom: 2,
                  fontSize: "12px",
                  color: "#4CD640",
                }}
              >
                Активен
              </Typography>
            </Box>
            <Box className="spaceAround">
              <Link
                to={`/publics/setting/${publicObj["group_id"]}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  textDecoration: "none",
                  margin: 2,
                  cursor: "pointer",
                  color: "black",
                }}
              >
                Настройки
              </Link>
              <Typography sx={{ color: "#CBCBCB", m: 2 }}>|</Typography>
              <Typography
                sx={{ fontSize: "12px", m: 2, cursor: "pointer" }}
                onClick={() => handleDelete(publicObj["group_id"])}
              >
                Отключить
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
