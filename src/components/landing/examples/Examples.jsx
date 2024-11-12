import React from "react";

import {Box, Typography} from "@mui/material";
import MyCarousel from "../../UI/myCarousel/MyCarousel";
import AuthorizedAdminCarusel from "../../UI/myCarousel/AuthorizedAdminCarusel";

const Examples = () => {
    return (
        <Box sx={{mt: 5}}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    fontSize: "32px",
                    textAlign: "center",
                    mb: "30px",
                }}
            >
                Примеры креативов
            </Typography>
            <MyCarousel/>
            {/* <AuthorizedAdminCarusel firstVideo={firstVideo} secondVideo={secondVideo} thirdVideo={thirdVideo}/> */}
        </Box>
    );
};

export default Examples;
