import React, { useContext, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import PublicSelect from "./selects/PublicSelect";
import PeriodSelect from "./selects/PeriodSelect";
import DataPickers from "./dataPickers/DataPickers";
import MyButton from "../../UI/buttons/MyButton";
import { PublicsContext } from "../../../context/PublicsContext";
import Table from "./table/Table";
import { get_statistic } from "../../../api/publics";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";
import logToBackend from "../../../utils/logs";

const Statistic = () => {
  const [open, setOpen] = useState(false);
  const [selectedPublics] = useContext(PublicsContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [publicObj, setPublicObj] = useState("");
  const statistic = [
    {
      publicTitle: "Гонки",
      date: "04.07.2023",
      views: "259.000",
      money: 5180,
    },
    {
      publicTitle: "Гонки",
      date: "03.07.2023",
      views: "271.000",
      money: 5420,
    },
    {
      publicTitle: "Гонки",
      date: "02.07.2023",
      views: "223.000",
      money: 4460,
    },
  ];

  const handleClick = async () => {
    setOpen(true);
    console.log(
      `SELECTED: ${JSON.stringify(selectedPublics[publicObj])}, START: ${startDate}, END: ${endDate}`
    );
    const group = selectedPublics[publicObj];
    const res = await axios.post(
      `${API_URL}group_stats/?group_id=${group["id"]}&date_from=${startDate}&date_to=${endDate}&interval=day`
    );
    logToBackend(
      `ЧТО ПОСЛАЛ: ${API_URL}group_stats/?group_id=${group["group_id"]}&date_from=${startDate}&date_to=${endDate}&interval=day`
    );
    logToBackend(`ТО ЧТО ПОЛУЧИЛИ: ${res.data}`);
    console.log(res.data);
    // get_statistic(223631865, 268278813);
  };

  // useEffect(() => {get_statistic()}, [])

  return (
    <>
      <Grid item md={6} sm={10} xs={12} sx={{ m: "0 auto" }}>
        <PublicSelect
          publics={selectedPublics}
          publicObj={publicObj}
          setPublicObj={setPublicObj}
        />
        <DataPickers
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <PeriodSelect />

        <Box sx={{ width: "40%", m: "20px auto" }}>
          <MyButton
            onClick={handleClick}
            options={{ background: "#E37E31", color: "white" }}
          >
            <Typography>Показать</Typography>
          </MyButton>
        </Box>
      </Grid>
      <Grid item md={8} xs={12} sx={{ m: "50px auto" }}>
        <Table statistic={statistic} open={open} />
      </Grid>
    </>
  );
};

export default Statistic;
