import { Typography } from "@mui/material";

const FooterText = ({ children }) => {
  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: { xs: "10px", sm: "18px" },
        textAlign: { xs: "center", md: "center" },
      }}
    >
      {children}
    </Typography>
  );
};

export default FooterText;
