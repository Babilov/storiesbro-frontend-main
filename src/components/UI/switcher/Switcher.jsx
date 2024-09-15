import { Box, Switch, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";

const Switcher = ({ ismainpage }) => {
  const [isCustomer, setIsCustomer] = useContext(Context);
  
  const refresh = localStorage.getItem('refresh')
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const statusAccount = localStorage.getItem('statusAccount')
  const navigate = useNavigate()
  

  const handleSwitch = () =>{
    setIsCustomer(!isCustomer)
    
    if (refresh && token && id) {
      if (statusAccount == 'customer') {
        navigate('/customer');
      } if (statusAccount == 'admin') {
        navigate('/admin');
      };
    };
  };
  
  if (isCustomer) {
    localStorage.setItem("statusAccount", "customer")
  } if(!isCustomer) {
    localStorage.setItem("statusAccount", "admin")
  };
  

  return (
    <>
    {localStorage.getItem('token') &&
    <Box
      sx={{
        display: ismainpage ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: "22px", xs: "15px" },
          fontWeight: 500,
          color: isCustomer && "black",
        }}
      >
        Заказчикам
      </Typography>
      <Switch
        checked={!isCustomer}
        onClick={handleSwitch}
      />
      <Typography
        sx={{
          fontSize: { sm: "22px", xs: "15px" },
          fontWeight: 500,
          color: isCustomer && "black",
        }}
      >
        Владельцам сообществ
      </Typography>
    </Box>
    }

    {!localStorage.getItem('token') &&
    <Box
      sx={{
        display: ismainpage ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: "22px", xs: "15px" },
          fontWeight: 500,
          color: isCustomer && "white",
        }}
      >
        Заказчикам
      </Typography>
      <Switch
        checked={!isCustomer}
        onClick={handleSwitch}
      />
      <Typography
        sx={{
          fontSize: { sm: "22px", xs: "15px" },
          fontWeight: 500,
          color: isCustomer && "white",
        }}
      >
        Владельцам сообществ
      </Typography>
    </Box>
    }
    </>
  );
};

export default Switcher;
