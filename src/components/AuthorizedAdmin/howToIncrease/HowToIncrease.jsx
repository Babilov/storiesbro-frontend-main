import { Grid, Typography } from "@mui/material";
import React from "react";

const HowToIncrease = () => {
  return (
    <Grid item xs={12} className="grid" sx={{ mb: 20 }}>
      <Typography className="title">Как повысить доход</Typography>
      <Typography className="bold description">
        1. Не публикуйте другие истории
      </Typography>
      <Typography className="description">
        1. Публикация других историй (контентых или рекламных), снижает
        активность на публикуемых нами историях {"->"} Ваш доход падает. Мы
        понимаем значимость Ваших контентных историй, поэтому Вы можете
        настроить постинг, чтобы мы постили вместо стандартных - Ваши контентые
        истории.
      </Typography>

      <Typography className="bold description">
        2. Настраивайте контент-видео
      </Typography>
      <Typography className="description">
        Контент-видео повышают просмотры в историях, вовлекают пользователей в
        Ваше сообщество и повышают Ваш доход. Да и вообще, никто не любит, когда
        в историях одна реклама.
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

      <Typography className="bold description">
        5. Не используйте основной аккаунт для публикации рекламы
      </Typography>
      <Typography className="description">
        Эта рекомендация для Вашей безопасности. Мы проверяем все креативы
        вручную по строгим требованиям, но бывают и плохие дни у агентов тех.
        поддержки, лучше подключить фейковый аккаунт (желательно заполненный -
        для реалистичности) и в случае чего - виноват новый редактор, да и
        забрать права редактора всегда можно.
      </Typography>
    </Grid>
  );
};

export default HowToIncrease;
