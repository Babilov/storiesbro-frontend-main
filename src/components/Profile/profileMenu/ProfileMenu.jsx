import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../styles/profileStyle.css";
import MyMenu from "../../UI/menu/MyMenu";

const ProfileMenu = () => {
  const links = [
    {
      icon: <PersonIcon sx={{ mr: 1 }} />,
      linkText: "Данные пользователя",
      linkHref: "/profile",
    },
    {
      icon: <PaymentsIcon sx={{ mr: 1 }} />,
      linkText: "Вывод",
      linkHref: "/cash",
    },
    {
      icon: <LockIcon sx={{ mr: 1 }} />,
      linkText: "Изменение пароля",
      linkHref: "/password",
    },
    {
      icon: <SettingsIcon sx={{ mr: 1 }} />,
      linkText: "Настройка уведомлений",
      linkHref: "/alerts",
    },
    {
      icon: <NotificationsIcon sx={{ mr: 1 }} />,
      linkText: "История уведомлений",
      linkHref: "/history",
    },
  ];
  return <MyMenu links={links} />;
};

export default ProfileMenu;
