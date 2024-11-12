import React, {useEffect, useState} from "react";
import {Grid, Container, Box} from "@mui/material";

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

import BuffetImg from "../../images/landingImages/buffet.png";
import heroImage from "../../images/landingImages/heroImage.svg";
import bot from "../../images/adminAdvantages/bot.svg";
import cashBag from "../../images/adminAdvantages/cashBag.svg";
import helpDesk from "../../images/adminAdvantages/helpDesk.svg";
import hours from "../../images/adminAdvantages/hours.svg";
import smartphone from "../../images/adminAdvantages/smartphone.svg";
import speeding from "../../images/adminAdvantages/speeding.svg";
import stats from "../../images/adminAdvantages/stats.svg";
import steeringWheel from "../../images/adminAdvantages/steeringWheel.svg";

const images = {};
images[smartphone] =
    "Все креативы проверяются вручную на соответствие правилам Вконтакте";
images[stats] = "Прозрачная статистика и доходы";
images[steeringWheel] = "Простое управление";
images[speeding] = "Гибкая и оперативная система выплат";
images[cashBag] = "Хорошие условия по реферальной программе";
images[helpDesk] = "Отзывчивая тех. поддержка 24/7";
images[bot] = "Автоматическая публикация историй";
images[hours] = "Постоянная монетизация сообществ";

const AdminPage = ({isLoginFormOpen, setIsLoginFormOpen, ismainpage}) => {
    const questions = {
        "Могу ли я монетизировать истории при ППВк?":
            "Да, можно, мы общались с агентами тех. поддержки. Креативы в историях при ППВк разрешены. Проверено на сотнях сообществ, что  доход с пп становится выше при монетизации историй",
        "Влияет ли публикация креативов  на актив сообщества?":
            "Да, положительно. Мы добавляем контентные-видео для повышения активности и лояльности аудитории.",
        "Мои сообщества подойдут?":
            "Да, если в них более 20.000 подписчиков и они в 'хорошем' состоянии",
        "Как происходит процесс монетизации сообщества?":
            "1. Подключайте и настраиваете сообщества 2. Получаете статистику 3. Выводите деньги",
    };
    return (
        <>
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
                                "Сервис для монетизации историй в ",
                                <span className="orange">Ваших</span>,
                                " сообществах",
                            ]}
                            content="Получайте дополнительный и пассивный доход с автоматических публикаций нативных историй"
                            buttonText="Повысить доход"
                            setIsLoginFormOpen={setIsLoginFormOpen}
                            // image={heroImage}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Advantages images={images} setIsLoginFormOpen={setIsLoginFormOpen}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Quotation
                            quote="«Если ты не найдешь способ зарабатывать деньги, пока ты спишь, то ты будешь работать, пока не умрешь»"
                            person="© Уоррен Баффет"
                            image={BuffetImg}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Publics/>
                    </Grid>

                    <Grid item xs={12}>
                        <Examples/>
                    </Grid>

                    <Grid item xs={12} sx={{display: "flex", m: "0 auto"}}>
                        <Steps
                            title="Всего несколько шагов до монетизации"
                            steps={["Зарегистрируйтесь", "Подключите сообщества"]}
                            buttonText="Начать зарабатывать"
                            setIsLoginFormOpen={setIsLoginFormOpen}
                        />
                    </Grid>

                    <Grid item xs={12} md={8} sx={{m: "0 auto"}}>
                        <FAQ questions={questions}/>
                    </Grid>
                </Grid>
            </Container>

            <Box sx={{m: "0 auto"}}>
                <CallToAction background="#FBECE0"/>
            </Box>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AdminPage;
