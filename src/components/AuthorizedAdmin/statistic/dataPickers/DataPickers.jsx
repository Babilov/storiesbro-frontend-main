import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const DataPickers = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleStartChange = (newValue) => {
    if (newValue && dayjs(newValue).isValid()) {
      const date = dayjs(newValue).format("YYYY-MM-DD");
      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      setStartDate(timestamp);
    } else {
      setStartDate(null);
    }
  };

  const handleEndChange = (newValue) => {
    if (newValue && dayjs(newValue).isValid()) {
      const date = dayjs(newValue).format("YYYY-MM-DD");
      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      setEndDate(timestamp);
    } else {
      setEndDate(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Сроки</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "70%",
          }}
        >
          <DatePicker
            format="DD-MM-YYYY" // отображение
            label="Дата"
            value={startDate ? dayjs(startDate, "YYYY-MM-DD") : null}
            onChange={handleStartChange}
          />
          <Typography sx={{ m: "5px" }}>до</Typography>
          <DatePicker
            format="DD-MM-YYYY" // отображение
            label="Дата"
            value={endDate ? dayjs(endDate, "YYYY-MM-DD") : null}
            onChange={handleEndChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DataPickers;
