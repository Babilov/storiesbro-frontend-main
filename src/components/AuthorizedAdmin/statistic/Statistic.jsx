import React, { useContext, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import PublicSelect from "./selects/PublicSelect";
import PeriodSelect from "./selects/PeriodSelect";
import DataPickers from "./dataPickers/DataPickers";
import MyButton from "../../UI/buttons/MyButton";
import { PublicsContext } from "../../../context/PublicsContext";
import Table from "./table/Table";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";
import logToBackend from "../../../utils/logs";

const Statistic = () => {
  const [open, setOpen] = useState(false);
  const [selectedPublics] = useContext(PublicsContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [publicObj, setPublicObj] = useState("");
  const [statistic, setStatistic] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);
  const [period, setPeriod] = useState("");
  console.log(period);

  const handleClick = async () => {
    setOpen(true);
    try {
      const token = localStorage.getItem("access_token");
      const group = selectedPublics[publicObj];
      setGroupInfo(group);
      const res = await axios.get(
        `${API_URL}group_stats/?group_id=${group["group_id"]}&date_from=${startDate}&date_to=${endDate}&interval=${period}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Токен в заголовке
          },
        }
      );
      logToBackend(
        `ЧТО ПОСЛАЛ: ${API_URL}group_stats/?group_id=${group["group_id"]}&date_from=${startDate}&date_to=${endDate}&interval=${period}`
      );
      logToBackend(`ТО ЧТО ПОЛУЧИЛИ: ${JSON.stringify(res.data.results)}`);
      // console.log(res.data.results);
      // console.log(res.data);
      setStatistic(res.data);
    } catch (e) {
      logToBackend(`ERROR статистика: ${e}`);
    }
  };

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
        <PeriodSelect period={period} setPeriod={setPeriod} />

        <Box sx={{ width: "40%", m: "20px auto" }}>
          <MyButton
            onClick={handleClick}
            options={{ background: "#E37E31", color: "white" }}
          >
            <Typography>Показать</Typography>
          </MyButton>
        </Box>
      </Grid>
      <Grid item md={12} xs={12} sx={{ m: "50px auto" }}>
        <Table statistic={statistic} open={open} groupInfo={groupInfo} />
      </Grid>
    </>
  );
};

export default Statistic;
