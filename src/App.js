import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth, refreshToken } from "./api/token";
import PublicSettings from "./components/AuthorizedAdmin/publicSetting/PublicSettings";
import Statistic from "./components/AuthorizedAdmin/statistic/Statistic";
import CreativeDetail from "./components/AuthorizedCustomer/CreativesCustomer/CreativeDetail";
import CreativesCustomer from "./components/AuthorizedCustomer/CreativesCustomer/CreativesCustomer";
import AddCreative from "./components/AuthorizedCustomer/addCreative/AddCreative";
import DoubleStickerLink from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStickerLink";
import DoubleStori from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStori";
import DoubleStoriSecond from "./components/AuthorizedCustomer/addCreative/uploadForms/DoubleStorySecond";
import Repost from "./components/AuthorizedCustomer/addCreative/uploadForms/Repost";
import SingleStori from "./components/AuthorizedCustomer/addCreative/uploadForms/SingleStori";
import StickerLink from "./components/AuthorizedCustomer/addCreative/uploadForms/StickerLink";
import StorisStatistic from "./components/AuthorizedCustomer/authorizedCustomerMain/Statistic/StorisStatistic";
import ChooseCreative from "./components/AuthorizedCustomer/chooseCreative/ChooseCreative";
import Publics from "./components/AuthorizedCustomer/publics/Publics";
import NoMoney from "./components/AuthorizedCustomer/reserve/NoMoney";
import ReservationSuccess from "./components/AuthorizedCustomer/reserve/ReservationSuccess";
import Reserve from "./components/AuthorizedCustomer/reserve/Reserve";
import Result from "./components/AuthorizedCustomer/result/Result";
import ProfileAlerts from "./components/Profile/profileAlerts/ProfileAlerts";
import ProfileCash from "./components/Profile/profileCash/ProfileCash";
import ProfileData from "./components/Profile/profileData/ProfileData";
import ProfileHistory from "./components/Profile/profileHistory/ProfileHistory";
import ChangePassword from "./components/Profile/profilePassword/ChangePassword";
import ProfilePassword from "./components/Profile/profilePassword/ProfilePassword";
import AuthQRCode from "./components/QR/qrCode";
import { Context } from "./context/Context";
import { CreativesContext } from "./context/CreativesContext";
import { PublicsContext } from "./context/PublicsContext";
import AuthorizedAdminHelp from "./pages/authorizedUser/admin/authorizedAdminHelp/AuthorizedAdminHelp";
import AuthorizedAdminPage from "./pages/authorizedUser/admin/authorizedAdminPage/AuthorizedAdminPage";
import Creatives from "./pages/authorizedUser/admin/creatives/Creatives";
import Referal from "./pages/authorizedUser/admin/referal/Referal";
import Support from "./pages/authorizedUser/admin/support/Support";
import AdminPage from "./pages/landingPages/AdminPage";
import CustomerPage from "./pages/landingPages/CustomerPage";
import AuthorizedUserPattern from "./pages/patterns/AuthorizedUserPattern";
import CashPattern from "./pages/patterns/CashPattern";
import Profile from "./pages/patterns/ProfilePattern";
import Deposit from "./pages/profilePages/Deposit";
import GetMoney from "./pages/profilePages/GetMoney";
import LowComission from "./pages/profilePages/LowComission";
import LowComissionAdmin from "./pages/profilePages/LowComissionAdmin";
import "./styles/App.css";
import "./styles/flex.css";
import "./styles/font.css";
import "./styles/form.css";
import "./styles/tooltip.css";
import logToBackend from "./utils/logs";

function App() {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const [allPublics, setAllPublics] = useState([]);
  const [publics, setPublics] = useState([]);
  const [selectedPublics, setSelectedPublics] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [arhive, setArhive] = useState([]);

  const navigate = useNavigate();

  /*
          useEffect(() => {
            const refresh = async () => {
              await refreshToken();
            };
            refresh();
          }, []);
           */

  const fetchAllPublics = async () => {
    try {
      const response = await fetchWithAuth(
        `https://storisbro.com/api/vk/groups/`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setPublics(response.groups);
    } catch (error) {
      console.error("Ошибка при загрузке сообществ", error);
    }
  };

  const fetchSelectedPublics = async () => {
    try {
      const response = await fetchWithAuth(
        `https://storisbro.com/api/selected_groups/`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      logToBackend(`GET SELECTED:::: ${JSON.stringify(response)}`);
      setSelectedPublics(response.groups);
    } catch (error) {
      console.error("Ошибка при загрузке сообществ", error);
    }
  };

  useEffect(() => {
    const refresh = async () => {
      await refreshToken();
      await fetchAllPublics();
      await fetchSelectedPublics();
    };
    refresh();
  }, []);

  if (localStorage.getItem("access_token")) {
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 3600000);
  }

  function startTokenRefresh() {
    setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("Ошибка обновления токена:", error);
      }
    }, 10 * 1000);
  }

  startTokenRefresh();

  return (
    <Context.Provider value={[isCustomer, setIsCustomer]}>
      {localStorage.getItem("access_token") && (
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
              <PublicsContext.Provider
                value={[
                  publics,
                  setPublics,
                  selectedPublics,
                  setSelectedPublics,
                ]}
              >
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
              <PublicsContext.Provider value={[selectedPublics]}>
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
      {!localStorage.getItem("access_token") && (
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
