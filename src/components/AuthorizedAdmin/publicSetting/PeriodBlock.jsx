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
          justifyContent: "center",
          alignItems: "stretch", // чтобы блоки были одинаковой высоты
          pb: 1,
        }}
      >
        {/* Левый блок */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          onClick={() => selectAdPeriod(true)}
        >
          <Typography
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

        {/* Разделитель */}
        <Box
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              opacity: 0.7,
            }}
          >
            |
          </Typography>
        </Box>

        {/* Правый блок */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          onClick={() => selectAdPeriod(false)}
        >
          <Typography
            sx={{
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
    </Box>
  );
};

export default PeriodBlock;
