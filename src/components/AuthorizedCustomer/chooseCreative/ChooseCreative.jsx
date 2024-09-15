import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { CreativesContext } from "../../../context/CreativesContext";
import MyButton from "../../UI/buttons/MyButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreativeAction } from "../../../store/creativeReducer";

const ChooseCreative = () => {
  const handleChange = (e) => {
    setChoosenCreative(e.target.value);
  };

  const handleClick = () => {
    navigate("/reservation/result");
    dispatch(setCreativeAction(creatives[choosenCreative]));
  };

  const [choosenCreative, setChoosenCreative] = useState(null);

  const [creatives] = useContext(CreativesContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <Box sx={{ width: { md: "30%", xs: "80%" }, m: "0 auto" }} className="grid">
      <Typography className="title">Выберите креатив</Typography>
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Выберите креатив
        </InputLabel>
        <Select label="Выберите креатив" onChange={handleChange} fullWidth>
          {creatives.map((creative, i) => (
            <MenuItem value={i} key={i}>
              <Box className="alignCenter">
                <Box
                  component="img"
                  alt="img"
                  src={creative["file"]}
                  sx={{ width: "10%", mr: 2 }}
                />
                <Typography className="mdSizeText">
                  {creative["name"]}
                </Typography>
                <Typography className="mdSizeText">
                  ({creative["date"]})
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {choosenCreative !== null && (
        <Box sx={{ width: "50%", m: "50px auto" }}>
          <MyButton onClick={handleClick} options={{ background: "#4CD640" }}>
            Далее
          </MyButton>
        </Box>
      )}
    </Box>
  );
};

export default ChooseCreative;
