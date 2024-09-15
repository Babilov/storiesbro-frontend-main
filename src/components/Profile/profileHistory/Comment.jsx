import { Box, Typography } from "@mui/material";
import MyModal from "../../UI/modals/MyModal";
import MyButton from "../../UI/buttons/MyButton";

const Comment = ({ id, buttonId, comment, isFormOpen, setIsFormOpen }) => {
  return (
    <MyModal
      title="Комментарий"
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      isFormOpen={isFormOpen && id === buttonId}
      setIsFormOpen={setIsFormOpen}
    >
      <Typography sx={{ textAlign: "center" }}>{comment}</Typography>
      <Box sx={{ width: "50%", m: "10px auto" }}>
        <MyButton
          onClick={() => setIsFormOpen(false)}
          options={{ color: "white", background: "#4CD640" }}
        >
          Спасибо
        </MyButton>
      </Box>
    </MyModal>
  );
};
export default Comment;
