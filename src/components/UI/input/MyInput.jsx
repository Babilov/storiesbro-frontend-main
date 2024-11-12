import { TextField } from "@mui/material";
import React from "react";

const MyInput = ({
  label,
  isPassword,
  value,
  setValue,
  disabled,
  onClick,
  onBlur,
  error,
}) => {
  return (
    <TextField
      type={isPassword && "password"}
      fullWidth
      disabled={disabled}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClick={onClick}
      onBlur={onBlur}
      variant="outlined"
      label={label}
      sx={{ mb: 1 }}
      InputProps={{
        style: {
          borderRadius: "10px",
          color: error ? "#D25D48" : "black",
        },
      }}
    />
  );
};

export default MyInput;
