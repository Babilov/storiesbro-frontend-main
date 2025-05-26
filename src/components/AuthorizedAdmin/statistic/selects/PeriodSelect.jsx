import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const PeriodSelect = ({ period, setPeriod }) => {
  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography>Разбить по</Typography>
      <Box sx={{ width: "70%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выберите период</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={period}
            label="Выберите сообщество"
            onChange={handleChange}
          >
            <MenuItem value="day">
              <Typography>День</Typography>
            </MenuItem>

            <MenuItem value="month">
              <Typography>Месяц</Typography>
            </MenuItem>

            <MenuItem value="year">
              <Typography>Год</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PeriodSelect;
