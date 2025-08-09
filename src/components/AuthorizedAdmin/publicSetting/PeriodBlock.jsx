import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, COMMUNITY_URL } from "../../../constants/constatns";

const PeriodBlock = ({ period }) => {
  const [state, setState] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const getState = async () => {
      const res = await axios.get(
        `${COMMUNITY_URL}${id}/toggle_ad_slot/?slot=${period}/`
      );
      const state = res.data;
      setState(state);
      console.log(state.data);
    };
    getState();
  }, []);
  console.log("aboba");
  const selectAdPeriod = async (selectedState) => {
    const res = await axios.post(`${API_URL}community/${id}/toggle_ad_slot/`, {
      slot: period,
      enabled: selectedState,
    });
    console.log(res);
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: { sm: "18px", xs: "12px" },
          fontWeight: 600,
          textAlign: "center",
          mb: 2,
          borderBottom: "1px solid #CDCDCD",
        }}
      >
        {period === "morning"
          ? "№1 Утренний"
          : period === "day"
          ? "№2 Дневной"
          : "№3 Вечерний"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Typography
            onClick={() => selectAdPeriod(true)}
            sx={{ cursor: "pointer", color: state ? "#4CD640" : "black" }}
          >
            Включён
          </Typography>
        </Box>
        <Box>
          <Typography>|</Typography>
        </Box>
        <Box>
          <Typography
            onClick={() => selectAdPeriod(false)}
            sx={{ cursor: "pointer", color: !state ? "red" : "black" }}
          >
            Отключить
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PeriodBlock;
