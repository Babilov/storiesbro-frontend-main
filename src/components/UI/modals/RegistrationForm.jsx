import React, { useState } from "react";
import MyModal from "./MyModal";
import MyInput from "../input/MyInput";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import GradientButton from "../buttons/GradientButton";
import EmailConfirmationForm from "./EmailConfiramtionForm";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setTokken } from "../../../store/userReducer";
import ErrorMessage from "../errors/ErrorMessage";

const REGISTER_LINK = `${API_URL}register/`;

const RegistrationForm = ({
  isRegistrationForm,
  setIsRegistrationForm,
  handleLoginForm,
  handleConfirmForm
}) => {
  const handleConfirmEmail = () => {
    setIsEmailConfirm(false);
    setIsChecked(false);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationForm(false);
    setIsChecked(false);
  };

  const changeChecked = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSymbolsPassword = (passwordCheck) => {
    const pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return pattern.test(passwordCheck);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const checkIsEmail = async (email) => {
    try {
      const response = await axios.get(`${API_URL}check_email/${email}/`);
      if (response.data.email) {
        setError(true);
        setErrorMessage("Пользователь с такой почтой уже зарегестрирован!");
        return true;
      } else {
        setError(false);
        console.error("Пользователя нет");
        return false;
      }
    } catch (error) {
      console.log("Че то произошло");
      return false;
    }
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("*Некорректный формат email");
      setError(true);
      setIsEmailConfirm(false);
      setIsRegistrationForm(true);
      changeChecked();
      return;
    }
  
    const emailExists = await checkIsEmail(email);
    if (emailExists) {
      setIsEmailConfirm(false);
      setIsRegistrationForm(true);
      return;
    }
  
    if (password.length < 6) {
      setErrorMessage("*В пароле должно быть минимум 6 символов");
      setError(true);
      setIsEmailConfirm(false);
      setIsRegistrationForm(true);
      changeChecked();
      if (!localStorage.getItem("lastError")) {
        localStorage.setItem("lastError", true);
      } else if (localStorage.getItem("lastError")) {
        localStorage.removeItem("lastError");
      }
      return;
    }
  
    if (!checkSymbolsPassword(password)) {
      setErrorMessage("*В пароле должны быть только латинские и специальные символы");
      setError(true);
      setIsEmailConfirm(false);
      setIsRegistrationForm(true);
      changeChecked();
      if (!localStorage.getItem("lastError")) {
        localStorage.setItem("lastError", true);
      } else if (localStorage.getItem("lastError")) {
        localStorage.removeItem("lastError");
      }
      return;
    }
  
    setIsRegistrationForm(false);
    try {
      const response = await axios.post(REGISTER_LINK, { email: email, password: password });
      setUserId(response.data.id);
      console.log(response.data.id);  // Получение id пользователя и сохранение его в состоянии
      console.log(userId);
      setIsEmailConfirm(true);
      localStorage.removeItem("lastError");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isConfirmFormOpen, setIsConfirmPageOpen] = useState(false);

  return (
    <>
      <EmailConfirmationForm
        isEmailConfirm={isEmailConfirm}
        setIsEmailConfirm={setIsEmailConfirm}
        userId={userId}  // Передайте userId в компонент EmailConfirmationForm
        handleConfirmForm={(userId) => {
          setIsConfirmPageOpen(true);
          setUserId(userId);
        }}
        emailLogin={email}
        passwordLogin={password}
      />
      <MyModal
        title="Регистрация"
        isFormOpen={isRegistrationForm}
        setIsFormOpen={handleCloseRegistration}
      >
        <MyInput label="Введите почту" value={email} setValue={setEmail} />
        <MyInput
          label="Придумайте пароль"
          isPassword={true}
          value={password}
          setValue={setPassword}
        />
        <ErrorMessage
          error={error}
          errorMessage={errorMessage}
        />
        {localStorage.getItem("lastError") && 
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography>
                Согласны с <Link>правилами пользования</Link> и{"  "}
                <Link>политикой конфиденциальности</Link>
              </Typography>
            }
            onChange={changeChecked}
          />
        }
        {!localStorage.getItem("lastError") &&
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography>
                Согласны с <Link href="./registrationFiles/UserAgreement.docx" download="UserAgreement.docx">правилами пользования</Link> и{" "}
                <Link href="./registrationFiles/PrivacyPolicy.docx" download="PrivacyPolicy.docx">политикой конфиденциальности</Link>
              </Typography>
            }
            onChange={changeChecked}
          />
        }
        <Box
          onClick={() => handleConfirmEmail()}
          sx={{ width: "300px", m: "20px auto" }}
        >
          <GradientButton
            handleClick={handleRegister}
            height="52px"
            disabled={!isChecked}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              Зарегистрироваться
            </Typography>
          </GradientButton>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          Есть аккаунт? {" "}
          <Link onClick={() => handleLoginForm()} sx={{ cursor: "pointer" }}>
            Войти
          </Link>
        </Typography>
      </MyModal>
    </>
  );
};

export default RegistrationForm;
