import { Box } from "@mui/material";
import React, { useContext } from "react";

import GetMoneyTable from "../../components/Profile/profileCash/getMoney/GetMoneyTable";
import CashError from "../../components/Profile/profileCash/CashModals/CashError";
import { CashContext } from "../../components/Profile/profileCash/CashContext";
import CashConfirmationModal from "../../components/Profile/profileCash/CashModals/CashConfirmationModal";
import GetMoneyMobileTable from "../../components/Profile/profileCash/getMoney/GetMoneyMobileTable";

const GetMoney = () => {
  const operations = [
    {
      uuid: "0",
      requisites: "Visa: 0000",
      date: "04.07.2023 15:19",
      money: 1,
      status: "В процессе",
    },
  ];
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
