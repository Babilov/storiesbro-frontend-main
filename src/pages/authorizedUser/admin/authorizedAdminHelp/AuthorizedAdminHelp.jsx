import { Box, Container, Grid } from "@mui/material";
import React from "react";
import HelpSteps from "../../../../components/AuthorizedAdmin/helpSteps/HelpSteps";
import PublicRequirements from "../../../../components/AuthorizedAdmin/publicRequirements/PublicRequirements";
import ClosingBlock from "../../../../components/AuthorizedAdmin/closingBlock/ClosingBlock";
import ContentVideos from "../../../../components/AuthorizedAdmin/contentVideos/ContentVideos";
import OwnVideosInstruction from "../../../../components/AuthorizedAdmin/ownVideosInstruction/OwnVideosInstruction";
import HowToIncrease from "../../../../components/AuthorizedAdmin/howToIncrease/HowToIncrease";
import AuthorizedAdminMenu from "../../../../components/AuthorizedAdmin/menu/AuthorizedAdminMenu";
import AuthorizedUserHeader from "../../../../components/authorizedUser/authorizedUserHeader/AuthorizedUserHeader";
 
const AuthorizedAdminHelp = () => {
  return (
    <Grid container>
      <Container>
        <AuthorizedUserHeader ismainpage={true} />
        <Grid container>
          <Grid item lg={2} xs={0}>
            <AuthorizedAdminMenu />
          </Grid>
          <Grid item md={10}>
            <HelpSteps />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PublicRequirements />
          <ClosingBlock />
          <ContentVideos />
          <OwnVideosInstruction />
          <HowToIncrease />
        </Grid>
      </Container>
    </Grid>
  );
};

export default AuthorizedAdminHelp;
