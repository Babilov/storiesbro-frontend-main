import { Button } from "@mui/material";
import { React, useEffect, useState } from "react";

const GradientButton = ({
  children,
  width,
  xsWidth,
  handleClick,
  disabled,
}) => {
  const [animate, setAnimate] = useState(true);

  const startAnimation = () => {
    if (!disabled) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 800);
    } // Длительность анимации в миллисекундах (в данном случае 0.8 секунды)
  };

  useEffect(() => {
    startAnimation(); // Запускаем анимацию при монтировании компонента

    // Затем устанавливаем интервал повторения каждые 10 секунд
    const intervalId = setInterval(() => {
      startAnimation();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []); // Пустой массив зависимостей, чтобы эффект выполнялся только при монтировании компонента

  const buttonStyles = {
    width: { sm: width, xs: xsWidth },
    height: { sx: "50px", md: "72px" },
    padding: "15px 20px",
    borderRadius: "90px",
    color: "white",
    fontSize: { xs: "18px", md: "26px" },
    fontWeight: 600,
    background: disabled && "#CBCBCB",
    transition: ".3s",
    animation: animate ? "shake 0.8s ease-in-out" : "none",
    boxShadow: animate ? "0px 0px 15px rgba(255, 165, 0, 0.8)" : "none",
    "&:hover": {
      filter: "brightness(130%)",
      //boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
      transform: "translateX(-2px)",
      backgroundColor: "rgba(255, 165, 0, 0.8)",
      boxShadow: "0px 0px 15px rgba(255, 165, 0, 0.8)",
    },
    "@keyframes shake": {
      "0%, 100%": { transform: "translateX(0)" },
      "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-3px)" },
      "20%, 40%, 60%, 80%": { transform: "translateX(3px)" },
    },
  };

  return (
    <Button
      disabled={disabled}
      fullWidth
      onClick={handleClick}
      className="orangeGradient"
      sx={{
        ...buttonStyles,
      }}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
