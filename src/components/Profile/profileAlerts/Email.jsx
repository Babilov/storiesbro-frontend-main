import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import plus from "./icons/plus.svg";
import MyButton from "../../UI/buttons/MyButton";
import profileEmail from "../../../images/profileImages/alertsIcons/profileEmail.svg";

const Email = () => {
  const handleClick = () => {
    setEmailActive(!emailActive);
  };

  const [emailActive, setEmailActive] = useState(false);
  const email = localStorage.getItem("email");
  return (
    <Grid container>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: { md: "80%", xs: "100%" },
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
          p: "24px 35px 24px 12px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box component="img" alt="vk" src={profileEmail} sx={{ mr: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", width: "200%" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
              Вконтакте
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
              На почту{" "}
              <Typography
                component="span"
                className="orange"
                sx={{ fontSize: "14px", fontWeight: 400 }}
              >
                {email}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} sx={{ display: "flex", mt: 2 }}>
          <MyButton
            onClick={handleClick}
            options={
              !emailActive
                ? { background: "#4CD640", color: "white", mr: 2 }
                : { background: "#D25D48", color: "white", mr: 2 }
            }
          >
            {!emailActive ? "Включить" : "Отключить"}
          </MyButton>
          <MyButton
            options={{
              background: "white",
              color: "#E37E31",
              border: "1px solid #E37E31",
            }}
          >
            Тестовое смс
          </MyButton>
        </Grid>
      </Grid>
      <Grid item md={3} sm={4} xs={8} sx={{ mt: 2 }}>
        <MyButton options={{ background: "#E37E31", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography> Добавить почту</Typography>
            <Box component="img" alt="plus" src={plus} />
          </Box>
        </MyButton>
      </Grid>
    </Grid>
  );
};

export default Email;
