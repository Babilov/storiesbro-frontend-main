import React, { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const DepositSelect = () => {
  const [bank, setBank] = useState("");

  const handleChange = (event) => {
    setBank(event.target.value);
  };
  return (
    <Grid item md={4} xs={12}>
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Выберите способ
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={bank}
          onChange={handleChange}
          label="Выберите способ"
        >
          <MenuItem value={"Sberbank"}>Сбербанк</MenuItem>
          <MenuItem value={"Tinkoff"}>Тинькофф</MenuItem>
          <MenuItem value={"Alfabank"}>Афльфабанк</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DepositSelect;
