import {Box, Container, Grid} from "@mui/material";
import React, {useEffect} from "react";
import HelpSteps from "../../../../components/AuthorizedAdmin/helpSteps/HelpSteps";
import PublicRequirements from "../../../../components/AuthorizedAdmin/publicRequirements/PublicRequirements";
import ClosingBlock from "../../../../components/AuthorizedAdmin/closingBlock/ClosingBlock";
import ContentVideos from "../../../../components/AuthorizedAdmin/contentVideos/ContentVideos";
import OwnVideosInstruction from "../../../../components/AuthorizedAdmin/ownVideosInstruction/OwnVideosInstruction";
import HowToIncrease from "../../../../components/AuthorizedAdmin/howToIncrease/HowToIncrease";
import AuthorizedAdminMenu from "../../../../components/AuthorizedAdmin/menu/AuthorizedAdminMenu";
import AuthorizedUserHeader from "../../../../components/authorizedUser/authorizedUserHeader/AuthorizedUserHeader";

const AuthorizedAdminHelp = () => {
    useEffect(() => {
        document.body.classList.add("no-scrollbar");

        return () => {
            document.body.classList.remove("no-scrollbar");
        };
    }, []);
    return (
        <Container sx={{msOverflowStyle: "none", scrollbarWidth: "none", overflow: "hidden",}}>
            <AuthorizedUserHeader ismainpage={true}/>
            <Grid container>
                <Grid item lg={2} xs={0}>
                    <AuthorizedAdminMenu/>
                </Grid>
                <Grid item md={10}>

                    <HelpSteps/>

                </Grid>
            </Grid>
            <Box sx={{width: "100%"}}>
                <PublicRequirements/>
                <ClosingBlock/>
                <ContentVideos/>
                <OwnVideosInstruction/>
                <HowToIncrease/>
            </Box>

        </Container>
    );
};

export default AuthorizedAdminHelp;
