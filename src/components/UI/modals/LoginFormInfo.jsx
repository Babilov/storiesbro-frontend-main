import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import { setTokken } from "../../../store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localStorageSet, loginFunc } from "../../../api/login";

const LoginFormInfo = ({
  handleChangeConfirm,
  handleRegistrationForm,
  setIsLoginFormOpen,
  setIsConfirmPageOpen,
  handleConfirmForm,
}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login() {
    const email_lower = email.toLowerCase();
    try {
      const response = await loginFunc(email_lower, password);
      // logToBackend(JSON.stringify(response.data));
      if (response.status === 200) {
        const data = await response.data;

        handleConfirmForm(response.data.id);
        setIsConfirmPageOpen(true);
        setIsLoginFormOpen(false);
        /*logToBackend(JSON.stringify(data));
                                        localStorage.setItem("access_token", data.access);
                                        localStorage.setItem("refresh_token", data.refresh);
                                        axios.defaults.headers.common["Authorization"] =
                                          "Bearer " + response.data["access"];
                        
                                        localStorage.setItem("token", response.data["access"]);
                                        localStorage.setItem("refresh", response.data["refresh"]);
                                        localStorage.setItem("id", response.data["id"]);
                                        localStorage.setItem(
                                          "count_of_visit",
                                          response.data["count_of_visit"] + 1,
                                        );
                                        localStorage.setItem("UID", response.data["UID"]);
                                        localStorage.setItem("is_active", response.data["is_active"]);
                                        localStorage.setItem("statusAccount", "admin");*/
        localStorageSet(data);
        dispatch(setTokken(response.data["access"]));

        const checkStatus = localStorage.getItem("statusAccount");

        if (checkStatus === "admin") {
          navigate("/admin");
        } else if (checkStatus === "customer") {
          navigate("/customer");
        }
        return data;
      } else {
        setError(true);
        console.log("error!!!");
      }
    } catch (e) {
      setError(true);
    }
  }

  /*
                  const handleConfirmFormInternal = () => {
                    const email_lower = email.toLowerCase();
                    axios
                      .post(
                        `${API_URL}login/`,
                        {
                          email: email_lower,
                          password: password,
                        },
                        {
                          withCredentials: true,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("access_token"),
                          },
                        },
                      )
                      .then(function (response) {
                        logToBackend(`RESPONSE1: ${JSON.stringify(response)}`);
                        fetch("https://storisbro.com/api/endpoint/", {
                          method: "GET",
                          headers: {
                            Authorization: `Bearer ${response["accessToken"]}`,
                          },
                        }).then((r) =>
                          fetch("https://storisbro.com/api/token/refresh/", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ refresh: response["refreshToken"] }),
                          })
                            .then((response) => response.json())
                            .then((data) => {
                              logToBackend(`DATA Refresh: ${JSON.stringify(data)}`);
                              logToBackend(
                                `RESPONSE2: ${JSON.stringify(["refreshToken"])}, ${response["accessToken"]}`,
                              );
                            }),
                        );
                        setUserId(response.data.id);
                        handleConfirmForm(response.data.id);
                        setIsConfirmPageOpen(true);
                        setIsLoginFormOpen(false);
                        axios.defaults.headers.common["Authorization"] =
                          "Bearer " + response.data["access"];
      
                        localStorage.setItem("token", response.data["access"]);
                        localStorage.setItem("refresh", response.data["refresh"]);
                        localStorage.setItem("id", response.data["id"]);
                        localStorage.setItem(
                          "count_of_visit",
                          response.data["count_of_visit"] + 1,
                        );
                        localStorage.setItem("UID", response.data["UID"]);
                        localStorage.setItem("vk_id", response.data["vk_id"]);
                        localStorage.setItem("is_active", response.data["is_active"]);
                        localStorage.setItem("statusAccount", "admin");
                        dispatch(setTokken(response.data["access"]));
      
                        const checkStatus = localStorage.getItem("statusAccount");
      
                        if (checkStatus === "admin") {
                          navigate("/admin");
                        } else if (checkStatus === "customer") {
                          navigate("/customer");
                        }
                      })
                      .catch(function (error) {
                        setError(true); // Устанавливаем флаг ошибки в true при ошибке запроса
                      });
                  };
                */
  return (
    <>
      <MyInput label="Введите почту" value={email} setValue={setEmail} />
      <MyInput
        label="Введите пароль"
        isPassword={true}
        value={password}
        setValue={setPassword}
      />
      <ErrorMessage
        error={error}
        errorMessage="*опа, ошибка в логине, либо в пароле"
      />
      <Link
        sx={{
          textAlign: "right",
          color: "#E37E31",
          textDecoration: "underline #E37E31",
          mb: 3,
          fontSize: "16px",
          fontWeight: 400,
          cursor: "pointer",
        }}
        onClick={() => handleChangeConfirm()}
      >
        Восстановить пароль
      </Link>
      <GradientButton handleClick={login}>Войти</GradientButton>
      <Box sx={{ mt: 1, mb: 1 }}></Box>

      {/*<Box id="VkIdSdkOneTap" sx={{ mt: 2 }}></Box>*/}
      {/*https://storisbro.com/accounts/vk/login/?process=login*/}

      {/*

      <Button
        sx={{
          backgroundColor: "#07f",
          height: "40px",
          borderRadius: "10px",
          ":hover": { background: "#0071f2" },
        }}
      >
        <Link
          href="https://storisbro.com/accounts/vk/login/?process=login"
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >

          <Box component="img" src={vk} sx={{ mr: 1, height: "23px" }} />
          Войти с VK ID
        </Link>
      </Button>

      */}

      {/* Контейнер для рендера VKID */}
      <Typography
        sx={{
          mt: 2,
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 400,
        }}
      >
        Нет аккаунта?{" "}
        <Link
          onClick={() => handleRegistrationForm()}
          sx={{
            color: "#E37E31",
            textDecoration: "underline #E37E31",
            cursor: "pointer",
          }}
        >
          Зарегистрироваться
        </Link>
      </Typography>
    </>
  );
};

export default LoginFormInfo;
