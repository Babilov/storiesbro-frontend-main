import { Box, Typography } from "@mui/material";
import React from "react";

const ProfileButton = () => {
  // Функция для генерации случайного codeVerifier

  // Функция для генерации codeChallenge из codeVerifier
  // Основной
  /*
    useEffect(() => {
        // Получаем state и code_challenge с бэка
        fetch("https://storisbro.com/prefetch_vk_auth_data/")
            .then((res) => res.json())
            .then(({ state, code_challenge }) => {
                console.log(`State: ${state}, code_challenge: ${code_challenge}`);
                VKID.Config.init({
                    app: "51786441",
                    redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                    state: state,
                    codeChallenge: code_challenge,
                    codeChallengeMethod: "S256",
                    scope: "email",
                });

                const oneTap = new VKID.OneTap();
                const container = document.getElementById("VkIdSdkOneTap");

                if (container) {
                    oneTap
                        .render({ container })
                        .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
                        .on(VKID.WidgetEvents.ERROR, console.error);
                }
            })
            .catch(console.error);
    }, []);

*/
  /*
    useEffect(() => {
        // Генерация codeVerifier
        const codeVerifier = generateCodeVerifier();

        // Сохраняем state
        const state = generateCodeVerifier();

        console.log("State & codeVerifier: ", state, codeVerifier);

        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            // Инициализация VKID SDK
            VKID.Config.init({
                app: "51786441",
                redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                state: state, // Передаём state
                codeVerifier: codeVerifier, // Передаём codeVerifier
                scope: "email",
            });

            const oneTap = new VKID.OneTap();
            const container = document.getElementById("VkIdSdkOneTap");

            if (container) {
                oneTap
                    .render({ container })
                    .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
                    .on(VKID.WidgetEvents.ERROR, console.error);
            }
        });
    }, []);
    */

  /*useEffect(() => {
        // Генерация codeVerifier и codeChallenge
        const state = generateCodeVerifier();
        const codeVerifier = generateCodeVerifier();
        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            // Инициализация VKID SDK
            VKID.Config.init({
                app: "51786441", // Укажите ваш VK app ID
                redirectUrl: "https://storisbro.com/accounts/vk/login/callback/", // Укажите ваш redirect URL
                state: state, // Дополнительный параметр состояния
                codeVerifier: codeVerifier, // Используем сгенерированный codeVerifier
                scope: "email", // Запрашиваемые разрешения
            });

            const oneTap = new VKID.OneTap();
            const container = document.getElementById("VkIdSdkOneTap");

            if (container) {
                oneTap
                    .render({container})
                    .on(VKID.WidgetEvents.SUCCESS, handleVkAuth) // Обработка успеха
                    .on(VKID.WidgetEvents.ERROR, console.error); // Обработка ошибок
            }
        });
    }, []);*/

  /*
    const handleVkAuth = (data) => {
        const {code, device_id} = data;
        console.log("Code & device id: ", code, device_id);
        // Обмен кода на токены
        VKID.Auth.exchangeCode(code, device_id)
            .then((response) => {
                const {access_token, refresh_token, user_id, vk_id} = response;

                // Сохранение токенов и других данных в localStorage
                localStorage.setItem("token", access_token);
                localStorage.setItem("refresh", refresh_token);
                localStorage.setItem("id", user_id);
                localStorage.setItem("vk_id", vk_id);

                // Установка токена в Redux
                dispatch(setTokken(access_token));

                // Проверка и перенаправление пользователя
                navigate("/admin");
            })
            .catch((error) => {
                console.error("Ошибка при обмене кода на токены:", error);
                setError(true);
            });
    };

     */

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ width: "30%", fontSize: "18px", fontWeight: 400 }}>
        Аккаунт в Вконтакте
      </Typography>
      <Box sx={{ width: "65%", display: "flex", alignItems: "center" }}>
        {/*<MyButton options={{ background: "#2A5885", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              pl: 1,
              pr: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box component="img" alt="vk" src={whiteVk} sx={{ mr: 2 }} />
              <Typography>{name}</Typography>
            </Box>
            <Box component="img" alt="avatar" src={avatar} />
          </Box>
        </MyButton>*/}
        {/*
                <Box id="VkIdSdkOneTap" sx={{mt: 2}}></Box>

                <Box
                    component="img"
                    alt="cross"
                    src={cross}
                    sx={{ml: 2, cursor: "pointer"}}
                />
                */}
      </Box>
    </Box>
  );
};

export default ProfileButton;
