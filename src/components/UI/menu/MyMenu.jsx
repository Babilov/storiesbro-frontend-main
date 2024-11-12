import { Box, Chip, Icon } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const MyMenu = ({ links }) => {
  return (
    <Box
      sx={{
        display: { lg: "flex", xs: "none" },
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #CDCDCD",
        borderRadius: "20px",
        width: "80%",
        pl: 1,
        pr: 1,
        pt: "15px",
      }}
    >
      {links.map((link) => (
        <NavLink
          className="navLink"
          to={link["linkHref"]}
          key={link["linkText"]}
        >
          {link["icon"]}
          {link["linkText"]}
        </NavLink>
      ))}
    </Box>
  );
};

export default MyMenu;
