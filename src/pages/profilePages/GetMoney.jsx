import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import GetMoneyTable from "../../components/Profile/profileCash/getMoney/GetMoneyTable";
import CashError from "../../components/Profile/profileCash/CashModals/CashError";
import { CashContext } from "../../components/Profile/profileCash/CashContext";
import GetMoneyMobileTable from "../../components/Profile/profileCash/getMoney/GetMoneyMobileTable";
import { fetchWithAuth } from "../../api/token";
import { MY_URL } from "../../constants/constatns";

const GetMoney = () => {
  const DEPOSIT_URL = `${MY_URL}api/payments/conclusions/`;

  const [
    ,
    ,
    // некоторые значения не используются
    errorModalOpen,
    setErrorModalOpen,
    codeModal,
    setCodeModal,
    operations,
    setOperations,
  ] = useContext(CashContext);

  const [loading, setLoading] = useState(true); // флаг загрузки

  useEffect(() => {
    const getDeposit = async () => {
      try {
        const res = await fetchWithAuth(DEPOSIT_URL);
        setOperations((prev) => [...res.results, ...prev]);
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    getDeposit();
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "200px" }}>
      <CashError open={errorModalOpen} setOpen={setErrorModalOpen} />
      {/*<CashConfirmationModal open={codeModal} setOpen={setCodeModal} /> */}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress
            size={60}
            thickness={4.5}
            sx={{ color: "orange" }}
          />
        </Box>
      ) : (
        <>
          <GetMoneyTable operations={operations} />
          <GetMoneyMobileTable operations={operations} />
        </>
      )}
    </Box>
  );
};

export default GetMoney;
