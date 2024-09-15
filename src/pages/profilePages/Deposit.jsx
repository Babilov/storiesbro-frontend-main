import React, { useContext } from "react";
import { CashContext } from "../../components/Profile/profileCash/CashContext";
import ComissionModal from "../../components/Profile/profileCash/CashModals/ComissonModal";
import CashError from "../../components/Profile/profileCash/CashModals/CashError";
import DepositTable from "../../components/Profile/profileCash/deposit/DepositTable";
import MobileTable from "../../components/Profile/profileCash/deposit/MobileTable";
import CashConfirmationModal from "../../components/Profile/profileCash/CashModals/CashConfirmationModal";

const Deposit = () => {
  const operations = [
    {
      uuid: "76098a5b-0a79-4939-90f1-56a66d3cc672",
      date: "04.07.2023 15:19",
      money: 5603,
      status: "В процессе",
    },
    {
      uuid: "c41e3568-b1f9-4d36-9248-6c81596d0b3",
      date: "03.07.2023 09:54",
      money: 5105,
      status: "Успешно",
    },
    {
      uuid: "76098a5b-0a79-4939-90f1-56a66d3cc672",
      date: "02.07.2023 17:40",
      money: 4993,
      status: "Отменено",
    },
  ];

  const [
    comissionOpen,
    setComissionOpen,
    errorModalOpen,
    setErrorModalOpen,
    codeModal,
    setCodeModal,
  ] = useContext(CashContext);
  const error = true;
  return (
    <>
      <ComissionModal open={comissionOpen} setOpen={setComissionOpen} />
      {/* <CashConfirmationModal open={codeModal} setOpen={setCodeModal} /> */}
      <CashError open={errorModalOpen && error} setOpen={setErrorModalOpen} />
      <DepositTable operations={operations} />
      <MobileTable operations={operations} />
    </>
  );
};

export default Deposit;
