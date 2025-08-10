import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";

import DepositSelect from "./DepositSelect";
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import { CashContext } from "../CashContext";
import Comission from "./Comisson";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, MY_URL } from "../../../../constants/constatns";
import { fetchWithAuth } from "../../../../api/token";

const DepositMenu = ({ isDeposit }) => {
  const handleClick = async () => {
    /*if (error) {
      setErrorModalOpen(true);
    } else {
      if (newRequisites) {
        setCodeModal(true);
      }
    }*/
    try {
      /*await fetchWithAuth(`${MY_URL}payments/api/withdrawal/`, {
        method: "POST",
        body: { amount: cash, card_number: requisites },
      });*/
      await axios.post(`${MY_URL}payments/api/withdrawal/`, {
        amount: cash,
        card_number: requisites,
      });
    } catch {
      setErrorModalOpen(true);
    }
  };

  const [cash, setCash] = useState(0);
  const [requisites, setRequisites] = useState("");
  const [, setComissionModalOpen, , setErrorModalOpen, , setCodeModal] =
    useContext(CashContext);
  const error = false;
  const newRequisites = true;

  return (
    <Grid
      container
      columnSpacing={3}
      sx={{
        width: { md: "75%", xs: "100%" },
        m: "20px auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid
        item
        md={isDeposit ? 4 : 3}
        xs={12}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <MyInput
          label="Введите сумму"
          value={cash}
          setValue={setCash}
          onClick={() => cash === 0 && setCash("")}
        />
        <Typography>₽</Typography>
      </Grid>
      {isDeposit ? (
        <DepositSelect />
      ) : (
        <Grid item md={isDeposit ? 4 : 3} xs={12}>
          <MyInput
            label="Введите реквизиты"
            value={requisites}
            setValue={setRequisites}
          />
        </Grid>
      )}
      <Comission
        setComissionOpen={setComissionModalOpen}
        isDeposit={isDeposit}
      />
      {!isDeposit && (
        <Grid item md={isDeposit ? 4 : 2.5} xs={6}>
          <Link to="/cash/low-comission">
            <MyButton options={{ background: "#4CD640", color: "white" }}>
              Хочу уменьшить
            </MyButton>
          </Link>
        </Grid>
      )}
      <Grid item xs={4} sx={{ m: { xs: "20px auto", minWidth: "130px" } }}>
        <MyButton
          onClick={handleClick}
          options={{ background: "#E37E31", color: "white" }}
        >
          {isDeposit ? "Пополнить" : "Вывести"}
        </MyButton>
      </Grid>
    </Grid>
  );
};

export default DepositMenu;
