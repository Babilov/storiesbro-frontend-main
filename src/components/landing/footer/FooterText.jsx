import { Typography } from "@mui/material";

const FooterText = ({ children }) => {
  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: { xs: "12px", sm: "18px" },
        textAlign: { xs: "start", md: "center" },
      }}
    >
      {children}
    </Typography>
  );
};

export default FooterText;
