import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import plus from "./images/plus.svg";
import RemoveModal from "./modals/RemoveModal";
import MyButton from "../../UI/buttons/MyButton";
import { CreativesContext } from "../../../context/CreativesContext";
import MainTable from "./MainTable";
import ArhiveTable from "./ArhiveTable";
import MobileTable from "./MobileTable";
import ArhiveMobileTable from "./ArhiveMobileTable";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";
import { useSelector } from "react-redux";
import { Tooltips } from "../../Onboardings/Tooltips";

const CreativesCustomer = () => {
  const handleTabChange = (e, tabIndex) => {
    setTab(tabIndex);
  };

  const [creatives, setCreatives, arhive, setArhive] =
    useContext(CreativesContext);

  const [count, setCount] = useState(1);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  const [tab, setTab] = useState(0);
  const [openRemove, setOpenRemove] = useState(false);
  const [deleteCreative, setDeleteCreative] = useState("");

  const navigate = useNavigate();

  return (
    <Box onClick={handleIncrementCount}>
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
          <Tooltips text="Здесь вы можете посмотреть и добавить ваши креативы, добавить в архив, удалить и просмотреть статистику."></Tooltips>
        </>
      )}
      <RemoveModal
        open={openRemove}
        setOpen={setOpenRemove}
        deleteCreative={deleteCreative}
        creatives={creatives}
        setCreatives={setCreatives}
        arhive={arhive}
        setArhive={setArhive}
      />
      <Box className="spaceBetween">
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Креативы" />
          <Tab label="Архив" />
        </Tabs>
        <Box sx={{ width: "25%", display: { xs: "none", md: "block" } }}>
          <MyButton options={{ background: "#4CD640" }}>
            <Box
              className="spaceBetween"
              sx={{ width: "90%" }}
              onClick={() => navigate("/creatives/add-creative")}
            >
              <Typography>Добавить креатив</Typography>
              <Box component="img" alt="plus" src={plus} />
            </Box>
          </MyButton>
        </Box>
      </Box>
      <Grid
        container
        className="grayBorder grid"
        sx={{ p: 2, display: { xs: "none", md: "flex" } }}
      >
        <Grid item md={1} />

        <Grid item md={2} className="mdBoldSizeText" sx={{ mb: 2 }}>
          Дата
        </Grid>

        <Grid item md={2} className="mdBoldSizeText">
          Название
        </Grid>

        <Grid item md={2} className="mdBoldSizeText">
          Статус
        </Grid>
        {tab === 0 ? (
          <MainTable
            creatives={creatives}
            setOpenRemove={setOpenRemove}
            setDeleteCreative={setDeleteCreative}
          />
        ) : (
          <ArhiveTable arhive={arhive} />
        )}
      </Grid>

      {tab === 0 ? (
        <MobileTable
          creatives={creatives}
          setOpenRemove={setOpenRemove}
          setDeleteCreative={setDeleteCreative}
        />
      ) : (
        <ArhiveMobileTable arhive={arhive} />
      )}
      <Box
        sx={{ width: "85%", m: "0 auto", display: { xs: "block", md: "none" } }}
      >
        <MyButton options={{ background: "#4CD640" }}>
          <Box
            className="spaceBetween"
            sx={{ width: "90%" }}
            onClick={() => navigate("/creatives/add-creative")}
          >
            <Typography>Добавить креатив</Typography>
            <Box component="img" alt="plus" src={plus} />
          </Box>
        </MyButton>
      </Box>
    </Box>
  );
};

export default CreativesCustomer;
