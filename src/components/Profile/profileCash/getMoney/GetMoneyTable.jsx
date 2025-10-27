import { Divider, Grid, Typography } from "@mui/material";
import { CashContext } from "../CashContext";
import { useContext } from "react";

const GetMoneyTable = ({ operations }) => {
  /*const [
    ,
    ,
    errorModalOpen,
    setErrorModalOpen,
    codeModal,
    setCodeModal,
    operations,
    setOperations,
  ] = useContext(CashContext);*/
  return operations.length ? (
    <Grid
      container
      sx={{
        textAlign: "center",
        border: "1px solid #CDCDCD",
        borderRadius: "20px",
        pl: 3,
        pr: 3,
        pt: 1,
        display: { md: "flex", xs: "none" },
      }}
    >
      <Grid item xs={4}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>UUID</Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Реквизиты
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Дата</Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={1}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Сумма
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Статус
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      {operations.map((operation, index) => (
        <Grid container key={index} sx={{ pt: 5 }}>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: "18px" }}>{operation["id"]}</Typography>
            <Divider sx={{ mt: 5 }} />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "18px" }}>
              {operation["details"]}
            </Typography>
            <Divider sx={{ mt: 5 }} />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontSize: "18px" }}>
              {operation["created_at"]}
            </Typography>
            <Divider sx={{ mt: 5 }} />
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ fontSize: "18px" }}>
              {Math.floor(operation["amount"])}₽
            </Typography>
            <Divider sx={{ mt: 5 }} />
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                fontSize: "18px",
                color:
                  operation["status"] === "paid"
                    ? "#4CD640"
                    : operation["status"] === "pending"
                    ? "#161616"
                    : "#D25D48",
              }}
            >
              {operation["status"] === "paid"
                ? "Выплачено"
                : operation["status"] === "pending"
                ? "В процессе"
                : "Отменено"}
            </Typography>
            <Divider sx={{ mt: 5 }} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>Нет данных</Typography>
  );
};

export default GetMoneyTable;
