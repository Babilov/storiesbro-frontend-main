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
      uuid: "76098a5b-0a79-4939-90f1-56a66d3cc672",
      requisites: "Visa: 4276 0000 0000 0000",
      date: "04.07.2023 15:19",
      money: 5603,
      status: "В процессе",
    },
    {
      uuid: "c41e3568-b1f9-4d36-9248-6c81596d0b3",
      requisites: "Visa: 4276 0000 0000 0000",
      date: "03.07.2023 09:54",
      money: 5105,
      status: "Успешно",
    },
    {
      uuid: "76098a5b-0a79-4939-90f1-56a66d3cc672",
      requisites: "Visa: 4276 0000 0000 0000",
      date: "02.07.2023 17:40",
      money: 4993,
      status: "Отменено",
    },
  ];
  const [, , errorModalOpen, setErrorModalOpen, codeModal, setCodeModal] =
    useContext(CashContext);

  return (
    <Box>
      <CashError open={errorModalOpen} setOpen={setErrorModalOpen} />
      <CashConfirmationModal open={codeModal} setOpen={setCodeModal} />
      <GetMoneyTable operations={operations} />
      <GetMoneyMobileTable operations={operations} />
    </Box>
  );
};

export default GetMoney;
