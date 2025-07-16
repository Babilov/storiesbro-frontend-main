import GradientButton from "../buttons/GradientButton";
import MyModal from "./MyModal";
import { Box, Typography } from "@mui/material";

const SuccessPasswordChange = ({ open, setOpen }) => {
  <MyModal
    title="Успешное изменение пароля!"
    isFormOpen={open}
    setIsFormOpen={() => setOpen(false)}
  >
    <Typography
      sx={{ textAlign: "center", fontSize: "18px", fontWeight: 400, mb: 1 }}
    >
      Видим, что входите с нового устройства, отправили код на Вашу почту
    </Typography>
    <Box sx={{ width: "287px", m: "0 auto" }}>
      <GradientButton handleClick={() => setOpen(false)}>Готово</GradientButton>
    </Box>
  </MyModal>;
};

export default SuccessPasswordChange;
