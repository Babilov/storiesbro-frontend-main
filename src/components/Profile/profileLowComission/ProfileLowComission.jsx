import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import copy from "./images/copy.svg";
import check from "./images/check.svg";
import ProfileLinks from "./ProfileLinks";
import ProfileLinksAdmin from "./ProfileLinksAdmin";
import ProfileSteps from "./ProfileSteps";
import { getReferal } from "../../../utils/getReferal";

const ProfileLowComission = () => {
  const [icon, setIcon] = useState(copy);
  const [link, setLink] = useState("");

  const handleChangeIcon = () => {
    setIcon(check);
    setTimeout(() => {
      setIcon(copy);
    }, 2000);
  };

  useEffect(() => {
    const getRef = async () => {
      const res = await getReferal();
      setLink(res.referral_link);
    };
    getRef();
  });

  return (
    <Grid container>
      {localStorage.getItem("statusAccount") === "admin" && (
        <ProfileLinksAdmin />
      )}
      {localStorage.getItem("statusAccount") === "customer" && <ProfileLinks />}
      <Grid item md={5} xs={12} sx={{ m: "0 auto" }}>
        <Typography
          variant="h4"
          sx={{ fontSize: "24px", fontWeight: 600, textAlign: "center", mt: 5 }}
        >
          Ваша реферальная ссылка
        </Typography>
        <Box
          sx={{
            border: "1px solid #CBCBCB",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "10px",
            mt: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#2A5885", fontSize: "18px", fontWeight: 400 }}
          >
            {link}
          </Typography>
          <CopyToClipboard text={link}>
            <Box
              component="img"
              alt="copy"
              onClick={handleChangeIcon}
              src={icon}
              sx={{ cursor: "pointer" }}
            />
          </CopyToClipboard>
        </Box>
      </Grid>

      <ProfileSteps />
    </Grid>
  );
};

export default ProfileLowComission;
