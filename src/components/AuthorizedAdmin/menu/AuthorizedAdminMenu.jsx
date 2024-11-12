import React from "react";
import { Box } from "@mui/material";

import up from "./images/up.svg";
import list from "./images/list.svg";
import lock from "./images/lock.svg";
import moneys from "./images/moneys.svg";
import question from "./images/question.svg";
import tagUser from "./images/tagUser.svg";
import MyMenu from "../../UI/menu/MyMenu";

const AuthorizedAdminMenu = () => {
  const links = [
    {
      icon: <Box component="img" alt="list" src={list} />,
      linkText: "Мои сообщества",
      linkHref: "/publics",
    },

    {
      icon: <Box component="img" alt="statistic" src={up} />,
      linkText: "Статистика",
      linkHref: "/statistic",
    },

    // {
    //   icon: <Box component="img" alt="refeal" src={moneys} />,
    //   linkText: "Реф. система",
    //   linkHref: "/referal",
    // },

    {
      icon: <Box component="img" alt="help" src={question} />,
      linkText: "Помощь",
      linkHref: "/admin-help",
    },

    {
      icon: <Box component="img" alt="support" src={tagUser} />,
      linkText: "Тех. поддержка",
      linkHref: "/support",
    },
  ];
  return <MyMenu links={links} />;
};

export default AuthorizedAdminMenu;
