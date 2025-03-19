import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AuthorizedUserHeader from "../../components/authorizedUser/authorizedUserHeader/AuthorizedUserHeader";
import AuthorizedAdminMenu from "../../components/AuthorizedAdmin/menu/AuthorizedAdminMenu";
import AuthorizedCustomerMenu from "../../components/AuthorizedCustomer/menu/AuthorizedCustomerMenu";
import axios from "axios";
import { refreshToken } from "../../api/token";

const AuthorizedUserPattern = ({
  children,
  ismainpage,
  isCustomer = false,
  menu = true,
}) => {
  useEffect(() => {
    const fetchIsAuthed = async () => {
      await refreshToken();
      const token = localStorage.getItem("access_token");
      const isAuthed = await axios.get(
        `https://storisbro.com/api/auth-status/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Токен в заголовке
          },
        }
      );
      localStorage.setItem("is_vk_authed", isAuthed["data"]["authenticated"]);

      // console.log(isAuthed.data.authenticated);
      // setAuthed(isAuthed.data.authenticated);
    };
    fetchIsAuthed();
  }, []);

  return (
    <Container>
      <AuthorizedUserHeader ismainpage={ismainpage} isCustomer={isCustomer} />
      <Grid container>
        {menu && (
          <Grid item lg={2} xs={0}>
            {isCustomer ? <AuthorizedCustomerMenu /> : <AuthorizedAdminMenu />}
          </Grid>
        )}

        <Grid item lg={menu ? 10 : 12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorizedUserPattern;
