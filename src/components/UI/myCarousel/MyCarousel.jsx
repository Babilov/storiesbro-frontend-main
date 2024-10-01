import { Box } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./style.css";
import "swiper/css/navigation";

// Пути к изображениям и видео
import storisImage1 from "./images/storis.svg";
import storisImage2 from "./images/mediatmpIMG_6316.jpg";
import video1 from "./images/IMG_6315.mp4";
import video2 from "./images/IMG_6313.mp4";
import video3 from "./images/FullSizeRender.mp4";
import video4 from "./images/1.mp4";

const MyCarousel = () => {
  // Стиль для слайдов (и для видео, и для изображений)
  const slideStyle = {
    width: "258px", // Фиксированная ширина
    height: "461px", // Фиксированная высота
    borderRadius: "10px", // Радиус скругления
    objectFit: "cover", // Обеспечивает корректное отображение содержимого
    marginBottom: "50px",
  };

  // Стиль для обертки слайдов, чтобы центрировать содержимое
  const slideWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Занимает всю высоту слайда
  };

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      breakpoints={{
        // Настройки для экрана шириной до 640px (мобильные устройства)
        0: {
          slidesPerView: 1, // Показывать один слайд
          spaceBetween: 10, // Меньше расстояние между слайдами
        },
        // Настройки для экрана шириной более 640px
        640: {
          slidesPerView: 3, // Показывать три слайда
          spaceBetween: 50, // Стандартное расстояние между слайдами
        },
      }}
    >
      {/* Первый слайд - Видео 1 */}
      <SwiperSlide>
        <Box sx={slideWrapperStyle}>
          <video style={slideStyle} controls>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </SwiperSlide>

      {/* Второй слайд - Видео 2 */}
      <SwiperSlide>
        <Box sx={slideWrapperStyle}>
          <video style={slideStyle} controls>
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </SwiperSlide>

      {/* Третий слайд - Видео 3 */}
      <SwiperSlide>
        <Box sx={slideWrapperStyle}>
          <video style={slideStyle} controls>
            <source src={video3} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </SwiperSlide>

      {/* Четвертый слайд - видео 4 */}
      <SwiperSlide>
        <Box sx={slideWrapperStyle}>
          <video style={slideStyle} controls>
            <source src={video4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </SwiperSlide>

      {/* Пятый слайд - Изображение 2 */}
      <SwiperSlide>
        <Box sx={slideWrapperStyle}>
          <Box
            component="img"
            src={storisImage2}
            sx={slideStyle} // Применяем стили для изображений
          />
        </Box>
      </SwiperSlide>
    </Swiper>
  );
};

export default MyCarousel;
