import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import comissionLogo from "./images/comissionLogo.svg";
import comissionCheck from "./images/comissionCheck.svg";
import comissionCross from "./images/comissionCross.svg";
import GradientButton from "../../UI/buttons/GradientButton";

import vk from "./images/comissionCross.svg";

const ProfileLinksAdmin = () => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #CBCBCB",
            borderRadius: "10px",
            p: 2,
            mr: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Ссылки{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "14px", md: "18px" },
                color: "#878787",
              }}
            >
              1
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" alt="logo" src={comissionLogo} />
            <Box>
              <Typography
                sx={{ fontSize: { md: "18px", xs: "14px" }, fontWeight: 500 }}
              >
                Storisbro - реклама в историях
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "14px", xs: "12px" },
                  fontWeight: 500,
                  color: "#878787",
                }}
              >
                adspoiler.com
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        ></Box>
        <Typography
          sx={{
            display: { xs: "block", md: "none" },
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 400,
            mb: 2,
          }}
        >
          Или
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #CBCBCB",
            borderRadius: "10px",
            p: 2,
            ml: { xs: 0, md: 2 },
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}>
            Ссылки 0
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GradientButton>Добавить</GradientButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        ></Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #CBCBCB",
            borderRadius: "10px",
            p: 2,
            mr: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Вы подписаны
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "14px", md: "18px" },
                color: "#878787",
              }}
            ></Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" alt="logo" src={vk} />
            <Box>
              <Typography
                sx={{ fontSize: { md: "18px", xs: "14px" }, fontWeight: 500 }}
              >
                Storisbro - реклама и монетизация историй
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "14px", xs: "12px" },
                  fontWeight: 500,
                  color: "#878787",
                }}
              ></Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Box component="img" alt="check" src={comissionCheck} />
          <Typography
            sx={{
              fontSize: { md: "24px", xs: "16px" },
              fontWeight: 600,
              width: { md: "60%", xs: "100%" },
              ml: { md: 1, xs: 0 },
            }}
          >
            Комиссия 5% + доход с рефералки
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #CBCBCB",
            borderRadius: "10px",
            p: 2,
            ml: { xs: 0, md: 2 },
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}>
            Вы не подписаны
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GradientButton>Подписаться</GradientButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Box component="img" alt="cross" src={comissionCross} />
          <Typography
            sx={{
              fontSize: { md: "24px", xs: "16px" },
              width: { md: "60%", xs: "100%" },
              fontWeight: 600,
            }}
          >
            Комиссия 20%
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default ProfileLinksAdmin;
