import { Grid, Typography } from "@mui/material";
import React from "react";

const HowToIncrease = () => {
  return (
    <Grid item xs={12} className="grid" sx={{ mb: 5 }}>
      <Typography className="title">
        Как повысить{" "}
        <Typography component="span" className="orange title">
          доход
        </Typography>
      </Typography>
      <Typography className="bold description">
        1. Не публикуйте другие истории
      </Typography>
      <Typography className="description">
        Публикация других историй (контентых или рекламных), снижает активность
        на публикуемых нами историях {"->"} Ваш доход падает. Мы понимаем
        значимость Ваших контентных историй, поэтому Вы можете настроить
        постинг, чтобы мы постили вместо стандартных - Ваши контентые истории.
      </Typography>

      <Typography className="bold description">
        2. Настраивайте контент-видео для каждого сообщества
      </Typography>
      <Typography className="description">
        Контент-видео повышают просмотры в историях, вовлекают пользователей в
        Ваше сообщество и повышают Ваш доход.
      </Typography>
      <Typography className="bold description">
        3. Не останавливайте монетизацию без необходимости
      </Typography>
      <Typography className="description">
        Постоянство помогает пользователю адаптироваться под наш “Умный” постинг
        историй, в котором мы учитываем дату, время, день недели и другие
        факторы, для достижения максимальной активности в историях.
      </Typography>
      <Typography className="bold description">
        4. Развивайте сообщество
      </Typography>
      <Typography className="description">
        Все понимают, чем выше вовлеченность и количество аудитории, тем выше
        активность в историях {"->"} Ваш доход.
      </Typography>
    </Grid>
  );
};

export default HowToIncrease;
