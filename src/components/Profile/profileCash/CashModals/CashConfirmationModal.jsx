import React, { useState } from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";

const CashConfirmationModal = ({ open, setOpen }) => {
  const [code, setCode] = useState("");
  return (
    <MyModal
      title="Подтверждение"
      isFormOpen={open}
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      setIsFormOpen={() => setOpen(false)}
    >
      <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
        Для вывода на новые реквизиты - введите код, отправленный на почту
        gusgusnik@gmail.com
      </Typography>
      <Box sx={{ width: "40%", m: "20px auto" }}>
        <MyInput label="Введите код" value={code} setValue={setCode} />
        <MyButton
          onClick={() => setOpen(false)}
          options={{ background: "#4CD640", color: "white" }}
        >
          Готово
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default CashConfirmationModal;
