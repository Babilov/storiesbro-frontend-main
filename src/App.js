import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./styles/App.css";
import "./styles/font.css";
import "./styles/form.css";
import "./styles/flex.css";
import "./styles/tooltip.css";
import { Context } from "./context/Context";
import AdminPage from "./pages/landingPages/AdminPage";
import CustomerPage from "./pages/landingPages/CustomerPage";
import Profile from "./pages/patterns/ProfilePattern";
import ProfileData from "./components/Profile/profileData/ProfileData";
import ProfileCash from "./components/Profile/profileCash/ProfileCash";
import ProfilePassword from "./components/Profile/profilePassword/ProfilePassword";
import ProfileAlerts from "./components/Profile/profileAlerts/ProfileAlerts";
import ProfileHistory from "./components/Profile/profileHistory/ProfileHistory";
import Deposit from "./pages/profilePages/Deposit";
import GetMoney from "./pages/profilePages/GetMoney";
import CashPattern from "./pages/patterns/CashPattern";
import ChangePassword from "./components/Profile/profilePassword/ChangePassword";
import LowComission from "./pages/profilePages/LowComission";
import LowComissionAdmin from "./pages/profilePages/LowComissionAdmin";
import AuthorizedUserPattern from "./pages/patterns/AuthorizedUserPattern";
import AuthorizedAdminPage from "./pages/authorizedUser/admin/authorizedAdminPage/AuthorizedAdminPage";
import Creatives from "./pages/authorizedUser/admin/creatives/Creatives";
import Statistic from "./components/AuthorizedAdmin/statistic/Statistic";
import AuthorizedAdminHelp from "./pages/authorizedUser/admin/authorizedAdminHelp/AuthorizedAdminHelp";
import { Grid } from "@mui/material";
import Referal from "./pages/authorizedUser/admin/referal/Referal";
import Support from "./pages/authorizedUser/admin/support/Support";
import PublicSettings from "./components/AuthorizedAdmin/publicSetting/PublicSettings";
import { PublicsContext } from "./context/PublicsContext";
import { CreativesContext } from "./context/CreativesContext";
import AuthorizedCustomerMain from "./components/AuthorizedCustomer/authorizedCustomerMain/AuthorizedCustomerMain";
import CreativesCustomer from "./components/AuthorizedCustomer/CreativesCustomer/CreativesCustomer";
import CreativeDetail from "./components/AuthorizedCustomer/CreativesCustomer/CreativeDetail";
import StorisStatistic from "./components/AuthorizedCustomer/authorizedCustomerMain/Statistic/StorisStatistic";
import AddCreative from "./components/AuthorizedCustomer/addCreative/AddCreative";
import SingleStori from "./components/AuthorizedCustomer/addCreative/uploadForms/SingleStori";
import DoubleStori from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStori";
import DoubleStoriSecond from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStorySecond";
import Repost from "./components/AuthorizedCustomer/addCreative/uploadForms/Repost";
import StickerLink from "./components/AuthorizedCustomer/addCreative/uploadForms/StickerLink";
import DoubleStickerLink from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStickerLink";
import Reserve from "./components/AuthorizedCustomer/reserve/Reserve";
import ChooseCreative from "./components/AuthorizedCustomer/chooseCreative/ChooseCreative";
import Result from "./components/AuthorizedCustomer/result/Result";
import ReservationSuccess from "./components/AuthorizedCustomer/reserve/ReservationSuccess";
import NoMoney from "./components/AuthorizedCustomer/reserve/NoMoney";
import Publics from "./components/AuthorizedCustomer/publics/Publics";
import CustomerHelp from "./components/AuthorizedCustomer/customerHelp/CustomerHelp";
import HelpSteps from "./components/AuthorizedAdmin/helpSteps/HelpSteps";
import AuthQRCode from "./components/QR/qrCode";
import { useNavigate } from "react-router-dom";

import { API_URL } from "./constants/constatns";

function App() {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const [allPublics, setAllPublics] = useState([]);
  const [publics, setPublics] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [arhive, setArhive] = useState([]);
  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  /*useEffect(() => {
                    // Функция для получения сообществ с бэкенда
                    const fetchPublics = async () => {
                      try {
                        const response = await axios.get(
                          `${API_URL}api_communities/communities`,
                        );
                        setAllPublics(response.data);
                      } catch (error) {
                        console.error("Ошибка при загрузке сообществ", error);
                      }
                    };
                
                    // Вызов функции для загрузки сообществ при монтировании компонента
                    fetchPublics();
                  }, [userId]); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании
                */

  useEffect(() => {
    // Функция для получения сообществ с бэкенда
    const fetchPublics = async () => {
      try {
        const response = await axios.get(
          `https://storisbro.com/communities/api/vk/groups`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );
        setPublics(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке сообществ", error);
      }
    };

    // Вызов функции для загрузки сообществ при монтировании компонента
    fetchPublics();
  }, [userId]); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании

  /*
                useEffect(() => {
                  // Функция для получения креативов с бэкенда
                  const fetchCreativesAll = async () => {
                    try {
                      const response = await axios.get(
                        `${API_URL}api_creatives/own_all_creatives/${userId}`,
                      );
                      setCreatives(response.data.filter((item) => item.archive === false));
                      setArhive(response.data.filter((item) => item.archive === true));
                    } catch (error) {
                      console.error("Ошибка при загрузке креативов", error);
                    }
                  };
              
                  // Вызов функции для загрузки сообществ при монтировании компонента
                  fetchCreativesAll();
                }, [userId]); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании
              */
  // автоматическая очистка кэша

  if (localStorage.getItem("token")) {
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 3600000);
  }

  return (
    <Context.Provider value={[isCustomer, setIsCustomer]}>
      {localStorage.getItem("token") && (
        <Routes>
          <Route
            path="/"
            element={
              <Profile title="Настройка профиля">
                <ProfileData />
              </Profile>
            }
          />

          <Route
            path="/profile"
            element={
              <Profile title="Настройка профиля">
                <ProfileData />
              </Profile>
            }
          />

          <Route
            path="/cash"
            element={
              <Profile title="Настройка профиля">
                <ProfileCash />
              </Profile>
            }
          />

          <Route
            path="/cash/deposit"
            element={
              <CashPattern isDeposit={true} title="Пополние">
                <Deposit />
              </CashPattern>
            }
          />

          <Route
            path="/cash/get-money"
            element={
              <CashPattern title="Вывод">
                <GetMoney />
              </CashPattern>
            }
          />

          <Route path="/cash/low-comission" element={<LowComission />} />
          <Route
            path="/cash/low-comission-admin"
            element={<LowComissionAdmin />}
          />

          <Route
            path="/password"
            element={
              <Profile title="Пароль">
                <ProfilePassword />
              </Profile>
            }
          />

          <Route
            path="/password/change-password"
            element={
              <Profile title="Новый пароль">
                <ChangePassword />
              </Profile>
            }
          />

          <Route
            path="/alerts"
            element={
              <Profile title="Настройка уведомлений">
                <ProfileAlerts />
              </Profile>
            }
          />

          <Route
            path="/history"
            element={
              <Profile title="История уведомлений">
                <ProfileHistory />
              </Profile>
            }
          />

          <Route path="/admin" element={<AuthorizedAdminHelp />} />

          <Route
            path="/publics"
            element={
              <PublicsContext.Provider value={[publics, setPublics]}>
                <AuthorizedUserPattern>
                  <Grid item xs={12} lg={10}>
                    <Creatives />
                  </Grid>
                </AuthorizedUserPattern>
              </PublicsContext.Provider>
            }
          />

          <Route
            path="/statistic"
            element={
              <PublicsContext.Provider value={[publics, setPublics]}>
                <AuthorizedUserPattern>
                  <Grid item xs={12} lg={10}>
                    <Statistic />
                  </Grid>
                </AuthorizedUserPattern>
              </PublicsContext.Provider>
            }
          />

          <Route path="/admin-help" element={<AuthorizedAdminHelp />} />

          <Route
            path="/referal"
            element={
              <AuthorizedUserPattern>
                <Referal />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/support"
            element={
              <AuthorizedUserPattern>
                <Support />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/publics/setting/:id"
            element={
              <PublicsContext.Provider value={[publics, setPublics]}>
                <PublicSettings />
              </PublicsContext.Provider>
            }
          />

          <Route
            path="/customer"
            element={
              <AuthorizedUserPattern ismainpage={true} isCustomer={true}>
                <AuthorizedAdminPage />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives"
            element={
              <AuthorizedUserPattern isCustomer={true}>
                <CreativesContext.Provider
                  value={[creatives, setCreatives, arhive, setArhive]}
                >
                  <CreativesCustomer />
                </CreativesContext.Provider>
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/:creative_type/:id"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <CreativesContext.Provider value={[creatives, setCreatives]}>
                  <CreativeDetail />
                </CreativesContext.Provider>
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/statistic/:id"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <CreativesContext.Provider
                  value={[creatives, setCreatives, arhive, setArhive]}
                >
                  <StorisStatistic />
                </CreativesContext.Provider>
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <AddCreative />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/single"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <SingleStori />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/double/1"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <DoubleStori />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/double/2"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <DoubleStoriSecond />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/repost"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <Repost />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/sticker-link"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <StickerLink />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/creatives/add-creative/double-sticker-link"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <DoubleStickerLink />
              </AuthorizedUserPattern>
            }
          />

          <Route path="/reservations" element={<Reserve />} />

          <Route
            path="/reservation/choose-creative"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <CreativesContext.Provider value={[creatives, setCreatives]}>
                  <ChooseCreative />
                </CreativesContext.Provider>
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/reservation/result"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <Result />
              </AuthorizedUserPattern>
            }
          />
          <Route
            path="/reservation/success"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={true}>
                <ReservationSuccess />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/reservation/last-step"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={false}>
                <NoMoney />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/customer-publics"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={true}>
                <PublicsContext.Provider value={[allPublics, setAllPublics]}>
                  <Publics />
                </PublicsContext.Provider>
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/customer-referal"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={true}>
                <Referal />
              </AuthorizedUserPattern>
            }
          />

          <Route
            path="/customer-help"
            element={
              <AuthorizedUserPattern
                ismainpage={true}
                isCustomer={true}
                menu={true}
              >
                <AuthorizedAdminPage />
              </AuthorizedUserPattern>
            }
          />
          <Route
            path="/customer-support"
            element={
              <AuthorizedUserPattern isCustomer={true} menu={true}>
                <Support />
              </AuthorizedUserPattern>
            }
          />
          <Route path="/qr" element={<AuthQRCode />} />
        </Routes>
      )}
      {!localStorage.getItem("token") && (
        <Routes>
          <Route
            path="/"
            element={
              isCustomer ? (
                <CustomerPage
                  setIsLoginFormOpen={setIsLoginFormOpen}
                  isLoginFormOpen={isLoginFormOpen}
                  ismainpage={true}
                />
              ) : (
                <AdminPage
                  setIsLoginFormOpen={setIsLoginFormOpen}
                  isLoginFormOpen={isLoginFormOpen}
                  ismainpage={true}
                />
              )
            }
          />
        </Routes>
      )}
    </Context.Provider>
  );
}

export default App;
