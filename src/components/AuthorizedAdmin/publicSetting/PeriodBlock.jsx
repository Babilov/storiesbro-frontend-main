import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constants/constatns";

const PeriodBlock = ({ period }) => {
  const [state, setState] = useState(null); // Изначально null — загрузка
  const { id } = useParams();

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await axios.get(
          `${API_URL}community/${id}/toggle_ad_slot/?slot=${period}`
        );
        const enabled = res.data.enabled;
        setState(enabled);
      } catch (error) {
        console.error("Ошибка загрузки состояния:", error);
        setState(false); // Можно по умолчанию выключить, если ошибка
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
      setState(selectedState); // Обновляем локальный state сразу после успешного поста
      console.log(res);
    } catch (error) {
      console.error("Ошибка при изменении состояния:", error);
    }
  };

  // Цвета для текста кнопок
  const enabledColor = "#4CD640";
  const disabledColor = "red";
  const neutralColor = "black";
  const hoverColorEnabled = "#3CB530"; // чуть темнее зеленого
  const hoverColorDisabled = "#CC3333"; // чуть темнее красного
  const hoverColorNeutral = "#555555";

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
        <Box sx={{ p: "0 0 10px" }}>
          <Typography
            onClick={() => selectAdPeriod(true)}
            sx={{
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
        </Box>
        <Box>
          <Typography>|</Typography>
        </Box>
        <Box>
          <Typography
            onClick={() => selectAdPeriod(false)}
            sx={{
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
    </Box>
  );
};

export default PeriodBlock;
