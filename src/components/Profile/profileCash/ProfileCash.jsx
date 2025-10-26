import { Box, Typography } from "@mui/material";
import ProfileCashButton from "./ProfileCashButton";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../api/token";
import { API_URL } from "../../../constants/constatns";

const ProfileCash = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getMoney = async () => {
      const res = await fetchWithAuth(`${API_URL}payments/get_user_balance/`);
      setBalance(Math.floor(res.balance));
    };
    getMoney();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "18px", mr: 2 }}>
          Баланс
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: "16px",
            mr: 1,
          }}
        >
          {balance !== null ? balance : "—"}
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: "20px", mr: 1 }}>
          ₽
        </Typography>
      </Box>

      <Box
        sx={{
          m: { lg: "0 160px 0 0", xs: "0 auto" },
          display: "flex",
          width: { lg: "50%", md: "50%", xs: "100%" },
        }}
      >
        <ProfileCashButton
          to="/cash/get-money"
          text="Вывести"
          background="white"
          color="#E68B46"
          border="1px solid #E68B46"
        />
      </Box>
    </Box>
  );
};

export default ProfileCash;
