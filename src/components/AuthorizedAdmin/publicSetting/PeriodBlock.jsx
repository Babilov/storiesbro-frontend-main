import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constants/constatns";

const PeriodBlock = ({ period }) => {
  const [state, setState] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await axios.get(
          `${API_URL}community/${id}/toggle_ad_slot/?slot=${period}`
        );
        setState(res.data.enabled);
      } catch (error) {
        console.error("Ошибка загрузки состояния:", error);
        setState(false);
      }
    };
    getState();
  }, [id, period]);

  const selectAdPeriod = async (selectedState) => {
    try {
      const res = await axios.post(
        `${API_URL}community/${id}/toggle_ad_slot/`,
        {
          slot: period,
          enabled: selectedState,
        }
      );
      setState(selectedState);
      console.log(res);
    } catch (error) {
      console.error("Ошибка при изменении состояния:", error);
    }
  };

  const enabledColor = "#4CD640";
  const disabledColor = "red";
  const neutralColor = "black";
  const hoverColorEnabled = "#3CB530";
  const hoverColorDisabled = "#CC3333";

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // выравниваем по центру горизонтально
          alignItems: "center", // по центру вертикально
          gap: { xs: 1, md: 3 }, // равные интервалы между элементами
          pb: 1,
        }}
      >
        <Typography
          onClick={() => selectAdPeriod(true)}
          sx={{
            minWidth: 80, // гарантирует визуальную "весомость" и ровность
            textAlign: "center",
            fontSize: { xs: "12px", md: "16px" },
            cursor: "pointer",
            color:
              state === null
                ? neutralColor
                : state
                ? enabledColor
                : neutralColor,
            transition: "color 0.3s ease",
            "&:hover": {
              color: hoverColorEnabled,
            },
            userSelect: "none",
          }}
        >
          Включён
        </Typography>

        <Typography
          sx={{
            lineHeight: 1,
            userSelect: "none",
            fontSize: { xs: "12px", md: "16px" },
            opacity: 0.8,
          }}
        >
          |
        </Typography>

        <Typography
          onClick={() => selectAdPeriod(false)}
          sx={{
            minWidth: 80, // тот же размер, что и у "Включён"
            textAlign: "center",
            fontSize: { xs: "12px", md: "16px" },
            cursor: "pointer",
            color:
              state === null
                ? neutralColor
                : !state
                ? disabledColor
                : neutralColor,
            transition: "color 0.3s ease",
            "&:hover": {
              color: hoverColorDisabled,
            },
            userSelect: "none",
          }}
        >
          Отключить
        </Typography>
      </Box>
    </Box>
  );
};

export default PeriodBlock;
