import { useContext } from "react";
import { Box } from "@mui/material";

import logo from "../../../images/icons/commonIcons/logo.svg";
import blackLogo from "../../../images/icons/commonIcons/blackLogo.svg";

const FooterImage = ({ isCustomer }) => {
  return (
    <Box
      component="img"
      alt="logo"
      src={isCustomer ? blackLogo : logo}
      sx={{
        mr: 1,
        height: { xs: "40px", md: "70px" },
        width: { xs: "60px", md: "90px" },
        cursor: "pointer",
      }}
    />
  );
};

export default FooterImage;
