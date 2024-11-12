import React from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box, Typography} from "@mui/material";

const DataPickers = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography>Сроки</Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "70%",
                    }}
                >
                    <DatePicker format="DD/MM/YYYY" label="Дата"/>
                    <Typography sx={{m: "5px"}}>{" "}до{" "}</Typography>
                    <DatePicker format="DD/MM/YYYY" label="Дата"/>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default DataPickers;
