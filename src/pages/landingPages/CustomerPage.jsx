import { Box, Container, Grid } from "@mui/material";

import LoginForm from "../../components/UI/modals/LoginForm";
import Header from "../../components/landing/header/Header";
import Hero from "../../components/landing/hero/Hero";
import Advantages from "../../components/landing/advantages/Advantages";
import Publics from "../../components/landing/publics/Publics";
import Examples from "../../components/landing/examples/Examples";
import Steps from "../../components/landing/steps/Steps";
import FAQ from "../../components/landing/faq/FAQ";
import CallToAction from "../../components/landing/callToAction/CallToAction";
import Footer from "../../components/landing/footer/Footer";
import Quotation from "../../components/landing/quotation/Quotation";

import hero2 from "../../images/landingImages/hero2.svg";
import Ford from "../../images/landingImages/Ford.svg";
import robot from "../../images/customerAdvantages/robot.svg";
import stats from "../../images/customerAdvantages/stats.svg";
import wheel from "../../images/customerAdvantages/wheel.svg";
import help from "../../images/customerAdvantages/help.svg";
import cashBag from "../../images/customerAdvantages/cashBag.svg";
import helpDesk from "../../images/customerAdvantages/helpDesk.svg";
import phone from "../../images/customerAdvantages/phone.svg";
import check from "../../images/customerAdvantages/check.svg";

const CustomerPage = ({ isLoginFormOpen, setIsLoginFormOpen, ismainpage }) => {
  const images = {};
  images[robot] = "Автоматическая публикация историй";
  images[stats] = "Прозрачная и подробная статистика";
  images[wheel] = "Простое управление";
  images[help] = "Помощь с рекламными креативами";
  images[cashBag] = "Хорошие условия по реферальной программе";
  images[helpDesk] = "Отзывчивая тех. поддержка 24/7";
  images[phone] =
    "Оплата по cpm. Сколько набрало просмотров - столько и оплата";
  images[check] = "Сотрудничаем только с активными сообществами";

  const questions = {
    "Мой проект можно продвигать у Вас?":
      "Да, можно. Необходимо соблюдать определенные правила и рекомендации, чтобы не нарушить политику платформы и обеспечить успешное продвижение вашего проекта.",
    "Как происходит процесс публикации рекламной истории?":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Как можно проверить эффективность креатива?":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Где рекламируется проект?":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <Box sx={{ background: "#161616", color: "white" }}>
      <Container>
        <Grid container rowSpacing={2}>
          <LoginForm
            isLoginFormOpen={isLoginFormOpen}
            setIsLoginFormOpen={setIsLoginFormOpen}
          />
          <Grid item xs={12}>
            <Header
              setIsLoginFormOpen={setIsLoginFormOpen}
              ismainpage={ismainpage}
            />
          </Grid>
          <Grid item xs={12}>
            <Hero
              title={[
                "Сервис для нативной рекламы",
                <span className="orange"> Ваших </span>,
                "проектов в историях Вконтакте",
              ]}
              content="Продвигайте тг-каналы, ботов, приложения, сообщества
и другие проекты в 7 раз эффективнее"
              buttonText="Начать продвижение"
              image={hero2}
              setIsLoginFormOpen={setIsLoginFormOpen}
            />
          </Grid>

          <Grid item xs={12}>
            <Advantages images={images} setIsLoginFormOpen={setIsLoginFormOpen} />
          </Grid>

          <Grid item xs={12}>
            <Quotation
              quote="« Я не знаю какой результат принесёт мне реклама, но даже если я заработаю доллар — я вложу его в рекламу»"
              person="© Генри Форд"
              image={Ford}
            />
          </Grid>

          <Grid item xs={12}>
            <Publics />
          </Grid>

          <Grid item xs={12}>
            <Examples />
          </Grid>

          <Grid item xs={12}>
            <Steps
              title="Всего несколько шагов до трафика"
              steps={[
                "Зарегистрируйтесь",
                "Загрузите рекламный креатив",
                "Пополните баланс",
              ]}
              buttonText="Стать заказчиком"
              setIsLoginFormOpen={setIsLoginFormOpen}
            />
          </Grid>

          <Grid item xs={12} md={8} sx={{ m: "0 auto" }}>
            <FAQ questions={questions} background="#161616" color="white" />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{}}>
        <CallToAction background="#E37E31" />
      </Box>

      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerPage;
