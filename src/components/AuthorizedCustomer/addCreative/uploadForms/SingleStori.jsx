import React from "react";
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import MyDropZone from "../../../UI/myDropZone/MyDropZone";
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import MyModal from "../../../UI/modals/MyModal";
import { addSingleCreative } from "../../../../api/creatives";
import SuccessAddCreative from "../../../AuthorizedAdmin/creatives/creativesAfterEnter/table/modals/SuccessAddCreative";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import redirectPng from "../images/redirect.png"
  
const SingleStori = (e) => {
  const [linkValue, setLinkValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState(undefined); // Новое состояние
  const navigate = useNavigate();
  const [addSuccess, setAddSuccess] = React.useState(false);

  // const [openAdd, setOpenAdd] = useState(false);
  // const user_id = localStorage.getItem("id");

  const handleFileChange = (filePath) => {
    // Обработка пути к файлу из MyDropZone
    setUploadedFile(filePath);
  };

  const handleClickCreative = () => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('link', linkValue);
    formData.append('name', nameValue);

    // Поменяйте на свою функцию addSingleCreative
    // Для примера, предположим, что addSingleCreative принимает два параметра (userId, formData)
    // Ваша функция может отличаться, уточните это
    addSingleCreative(localStorage.getItem("id"), formData, setAddSuccess);
  };

  return (
    <Box>
      <Box
        component="img"
        alt="back"
        src={redirectPng}
        sx={{position: "absolute", float: "left", width: "45px", height: "38", cursor: "pointer"}}
        onClick={() => navigate("/creatives/add-creative")}
      />
      <SuccessAddCreative
        open={addSuccess}
        setOpen={setAddSuccess}>
      </SuccessAddCreative>
      <Box className="justifyCenter">
        <MyDropZone onFileChange={handleFileChange} />
        <Box sx={{ width: { md: "20%", xs: "100%" }, ml: 2 }}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel id="demo-simple-select-label">
              Выберите кнопку
            </InputLabel>
            <Select sx={{ borderRadius: "10px" }} />
          </FormControl>
          <MyInput label="Введите ссылку" 
            value={linkValue}
            setValue={setLinkValue}
          />
          <MyInput label="Введите название" 
            value={nameValue}
            setValue={setNameValue} />
        </Box>
      </Box>
      <Box sx={{ width: { md: "20%", xs: "60%" }, m: "40px auto" }}>
        <MyButton onClick={handleClickCreative} options={{ background: "#4CD640" }}>Загрузить</MyButton>
      </Box>
    </Box>
  );
};

export default SingleStori;
