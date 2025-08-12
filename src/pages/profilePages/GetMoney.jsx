import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import GetMoneyTable from "../../components/Profile/profileCash/getMoney/GetMoneyTable";
import CashError from "../../components/Profile/profileCash/CashModals/CashError";
import { CashContext } from "../../components/Profile/profileCash/CashContext";
import CashConfirmationModal from "../../components/Profile/profileCash/CashModals/CashConfirmationModal";
import GetMoneyMobileTable from "../../components/Profile/profileCash/getMoney/GetMoneyMobileTable";
import { fetchWithAuth } from "../../api/token";
import { MY_URL } from "../../constants/constatns";

const GetMoney = () => {
  const DEPOSIT_URL = `${MY_URL}api/payments/conclusions/`;

  const [operations, setOperations] = useState(null);

  useEffect(() => {
    const getDeposit = async () => {
      try {
        const res = await fetchWithAuth(DEPOSIT_URL);
        setOperations(res.results);
        console.log(res);
        console.log(res.results);
      } catch {
        console.log("error");
      }
    };
    getDeposit();
    const interval = setInterval(getDeposit, 5000); // обновляем каждые 5 секунд

    return () => clearInterval(interval); // чистим при размонтировании
  }, []);

  const [, , errorModalOpen, setErrorModalOpen, codeModal, setCodeModal] =
    useContext(CashContext);

  return (
    <Box>
      <CashError open={errorModalOpen} setOpen={setErrorModalOpen} />
      {/*<CashConfirmationModal open={codeModal} setOpen={setCodeModal} /> */}
      <GetMoneyTable operations={operations} />
      <GetMoneyMobileTable operations={operations} />
    </Box>
  );
};

export default GetMoney;
