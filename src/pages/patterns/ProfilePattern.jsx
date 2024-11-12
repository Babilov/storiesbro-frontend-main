import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProfileHeader from "../../components/Profile/profileHeader/ProfileHeader";
import ProfileMenu from "../../components/Profile/profileMenu/ProfileMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../constants/constatns";
import { get_list } from "../../api/publics";

const Profile = ({ children, title }) => {
  //const tokken = useSelector((store) => store.user);
  const tokken = localStorage["token"];
  useEffect(() => {
    axios
      .get(`${API_URL}profile/`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${tokken}` },
      })
      .then(function (response) {
        localStorage.setItem("email", response["data"]["email"]);
      })
      .catch(function (error) {
        console.error("Error fetching profile data:", error);
      });
  }, [tokken]);
  return (
    <>
      <ProfileHeader />
      <Container>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={0} lg={2.5}>
            <ProfileMenu />
          </Grid>
          <Grid item lg={9.5} xs={12}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontSize: { md: "38px", xs: "18px" },
                fontWeight: 600,
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              {title}
            </Typography>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
