import {Container, Grid} from "@mui/material";
import React, {useState} from "react";

import AuthorizedUserHeader from "../../components/authorizedUser/authorizedUserHeader/AuthorizedUserHeader";
import AuthorizedAdminMenu from "../../components/AuthorizedAdmin/menu/AuthorizedAdminMenu";
import {PublicsContext} from "../../context/PublicsContext";
import AuthorizedCustomerMenu from "../../components/AuthorizedCustomer/menu/AuthorizedCustomerMenu";

const AuthorizedUserPattern = ({
                                   children,
                                   ismainpage,
                                   isCustomer = false,
                                   menu = true,
                               }) => {
    return (
        <Container>
            <AuthorizedUserHeader ismainpage={ismainpage} isCustomer={isCustomer}/>
            <Grid container>
                {menu && (
                    <Grid item lg={2} xs={0}>
                        {isCustomer ? <AuthorizedCustomerMenu/> : <AuthorizedAdminMenu/>}
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
