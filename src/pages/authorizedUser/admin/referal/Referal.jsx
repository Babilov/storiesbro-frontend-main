import { Grid } from "@mui/material";
import React from "react";
import ReferalText from "../../../../components/AuthorizedAdmin/referalText/ReferalText";
import ReferalForm from "../../../../components/AuthorizedAdmin/referalForm/ReferalForm";

const Referal = () => {
  return (
    <Grid item md={10} xs={12} className="grid">
      <ReferalText />
      <ReferalForm />
    </Grid>
  );
};

export default Referal;
