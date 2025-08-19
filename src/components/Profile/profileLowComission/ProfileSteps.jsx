import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import comissionScrooge from "./images/comissionScrooge.svg";
import GradientButton from "../../UI/buttons/GradientButton";
import ErrorModal from "./modals/ErrorModal";
import SusccesModal from "./modals/SusccesModal";

import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const ProfileSteps = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [susccesModalOpen, setSusccesModalOpen] = useState(false);
  const id = localStorage.getItem("id");

  const handleClickLowCommission = async () => {
    try {
      await axios.post(`${API_URL}commision/low_commission/${id}/`);
    } catch {
      console.log("Ошибка lowComission");
    }
  };
  return (
    <>
      <ErrorModal
        errorModalOpen={errorModalOpen}
        setErrorModalOpen={setErrorModalOpen}
      />
      <SusccesModal
        susccesModalOpen={susccesModalOpen}
        setSusccesModalOpen={setSusccesModalOpen}
      />

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 4,
          mt: 10,
          mb: 5,
        }}
        className="orangeBorder"
      >
        <Box>
          <Typography
            sx={{
              fontSize: { md: "32px", xs: "26px" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Как снизить комиссию
          </Typography>
          <Typography
            sx={{ fontSize: { md: "24px", xs: "16px" }, fontWeight: 400 }}
          >
            1. Добавьте реферальную ссылку в раздел “Ссылки” во все сообщества.
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "24px", xs: "16px" },
              fontWeight: 400,
              mb: 4,
            }}
          >
            2. Нажмите “Ссылка добавлена”.
          </Typography>
          <Box sx={{ width: "50%" }}>
            <GradientButton handleClick={handleClickLowCommission}>
              Ссылка добавлена
            </GradientButton>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{ display: { xs: "none", md: "block" } }}
            component="img"
            alt="scrooge"
            src={comissionScrooge}
          />
        </Box>
      </Grid>
    </>
  );
};

export default ProfileSteps;
