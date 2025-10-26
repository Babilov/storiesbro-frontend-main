import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ProfileHeader from "../../components/Profile/profileHeader/ProfileHeader";
import DepositMenu from "../../components/Profile/profileCash/CashMenu/DepositMenu";
import { CashContext } from "../../components/Profile/profileCash/CashContext";
import { useNavigate } from "react-router-dom";
import redirectPng from "./images/redirect.png";

const CashPattern = ({ children, isDeposit, title }) => {
  const [comissionModalOpen, setComissionModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [operations, setOperations] = useState([]);

  const navigate = useNavigate();

  return (
    <CashContext.Provider
      value={[
        comissionModalOpen,
        setComissionModalOpen,
        errorModalOpen,
        setErrorModalOpen,
        codeModal,
        setCodeModal,
        operations,
        setOperations,
      ]}
    >
      <ProfileHeader />
      <Box
        sx={{
          p: { md: "0 130px", xs: "0 16px" }, // совпадает с ProfileHeader
          mt: 3,
        }}
      >
        <Box
          component="img"
          alt="back"
          src={redirectPng}
          sx={{
            width: 45,
            height: 38,
            cursor: "pointer",
            position: "relative",
            top: "5px",
          }}
          onClick={() => navigate("/cash")}
        />
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 3,
            fontSize: { md: "32px", xs: "24px" },
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <DepositMenu isDeposit={isDeposit} />
        {children}
      </Box>
    </CashContext.Provider>
  );
};

export default CashPattern;
