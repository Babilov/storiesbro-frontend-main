import React, { useContext, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import arrow from "./images/arrow.svg";
import { PublicsContext } from "../../../context/PublicsContext";
import MyInput from "../../UI/input/MyInput";
import Link from "@mui/material/Link";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Publics = () => {
  const [publics] = useContext(PublicsContext);
  const [search, setSearch] = useState("");

  return (
    <Grid container className="grid">
      <Grid item xs={12}>
        <Typography className="title">Список сообществ</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Grid item xs={6}>
          <Grid item md={5}>
            <MyInput value={search} setValue={setSearch} label="Поиск..." />
          </Grid>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid
            item
            md={8}
            className="alignCenter"
            sx={{ justifyContent: "flex-end", mt: -2.5 }}
          >
            <Box
              sx={{
                display: { md: "flex", xs: "block" },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#878787", mr: 3 }}>
                Сортировать по
              </Typography>
              <Box className="grayBorder alignCenter" sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Подписчики</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="subs"
                >
                  <MenuItem>По возрастанию</MenuItem>
                  <MenuItem>По убыванию</MenuItem>
                </Select> */}
                  <Select
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">По возрастанию</MenuItem>
                    <MenuItem>По убыванию</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {publics.map((publicItem, index) => (
        <Grid
          item
          xs={12}
          key={index}
          className="spaceBetween grayBorder"
          sx={{ p: 2, mb: 2 }}
        >
          <Box className="alignCenter">
            <Box
              component="img"
              alt="publicImg"
              src={publicItem["image"]}
              sx={{ mr: 2, width: "20%" }}
            />
            <Box>
              <Typography className="mdBoldSizeText">
                {publicItem["name"]}
              </Typography>
              <Typography className="mdSizeText">
                {publicItem["count_members"]} подписчиков
              </Typography>
            </Box>
          </Box>
          <Link href={publicItem["url"]}>
            <Box
              component="img"
              alt="arrow"
              src={arrow}
              sx={{ cursor: "pointer", ml: 1 }}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Publics;
