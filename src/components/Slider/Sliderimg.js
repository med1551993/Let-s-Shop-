import React from "react";
import "./Slider.scss";
import { slider_img_1 } from "../../utils/images";
import { slider_img_2 } from "../../utils/images";
import { slider_img_3 } from "../../utils/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Sliderimg = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 8000,
    cssEase: "linear",
  };
  return (
    <div className="hero-slider">
      <Slider {...settings}>
        <div className="hero-slider-item">
          <img src={slider_img_1} alet="" />
        </div>
        <div className="hero-slider-item">
          <img src={slider_img_2} alet="" />
        </div>
        <div className="hero-slider-item">
          <img src={slider_img_3} alet="" />
        </div>
      </Slider>
    </div>
  );
};

export default Sliderimg;
