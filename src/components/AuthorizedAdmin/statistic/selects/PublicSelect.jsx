import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, Typography } from "@mui/material";

const MySelect = ({ publics }) => {
  const [publicObj, setPublicObj] = useState("");

  const handleChange = (event) => {
    setPublicObj(event.target.value);
  };
  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontSize: "32px", fontWeight: 600 }}
      >
        Статистика
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Сообщество</Typography>
        <Box sx={{ width: "70%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Выберите сообщество
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publicObj}
              label="Выберите сообщество"
              onChange={handleChange}
            >
              {publics.map((publicObj, index) => (
                <MenuItem key={index} value={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      alt="avatar"
                      src={publicObj["image"]}
                      sx={{ mr: 1, width: "7.5%" }}
                    />
                    <Typography>{publicObj["name"]}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default MySelect;
