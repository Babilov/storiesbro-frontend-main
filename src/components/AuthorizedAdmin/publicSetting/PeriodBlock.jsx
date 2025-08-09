import { Box, Typography } from "@mui/material";

const PeriodBlock = ({ period }) => {
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
          <Typography>Включён</Typography>
        </Box>
        <Box>
          <Typography>|</Typography>
        </Box>
        <Box>
          <Typography>Отключить</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PeriodBlock;
