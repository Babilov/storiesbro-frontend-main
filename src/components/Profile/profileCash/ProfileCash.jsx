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
        justifyContent: "space-between",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "18px", mr: 1 }}>
          Баланс:
        </Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: 500, mr: 1 }}>
          {balance !== null ? balance : "—"}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>₽</Typography>
      </Box>

      <Box
        sx={{
          ml: { lg: 4, xs: 0 },
          mt: { xs: 2, lg: 0 },
          display: "flex",
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
