import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [counter, setCounter] = useState(1200);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <Box className="grid grayBorder" sx={{ p: 2 }}>
      <Typography className="md500 centerText">До окончания брони:</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography className="orange xlSizeText500" sx={{ mr: 1 }}>
          {Math.floor(counter / 60)}
        </Typography>
        <Typography sx={{ mb: 1, mr: 1 }} className="buttonFont">
          минут
        </Typography>
        <Typography sx={{ mr: 1 }} className="orange xlSizeText500">
          {counter % 60}
        </Typography>
        <Typography sx={{ mb: 1 }} className="buttonFont">
          секнуд
        </Typography>
      </Box>
      <Typography className="centerText">
        Если в течении этого времени Вы не пополните баланс, бронь автоматически
        отменяется
      </Typography>
    </Box>
  );
};

export default Timer;
