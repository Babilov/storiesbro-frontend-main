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
      sx={{ mr: 1, width: "50%" }}
    />
  );
};

export default FooterImage;
