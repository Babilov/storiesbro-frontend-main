import {Box} from "@mui/material";

import logo from "../../../images/icons/commonIcons/logo.png";
import blackLogo from "../../../images/icons/commonIcons/blackLogo.svg";

const FooterImage = ({isCustomer}) => {
    return (
        <Box
            component="img"
            alt="logo"
            src={isCustomer ? blackLogo : logo}
            sx={{
                width: {xs: "35px", md: "50px"}, m: "5px 10px",
                cursor: "pointer",
            }}
        />
    );
};

export default FooterImage;
