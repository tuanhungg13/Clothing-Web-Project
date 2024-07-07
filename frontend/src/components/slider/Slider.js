import React from "react";
import "./Slider.scss"
import Slider from 'react-slick';

const SliderComponent = (props) => {
    const settings = {
        dots: props.dots,
        arrows: props.arrows,
        infinite: true,
        speed: 500,
        slidesToShow: props.show,
        slidesToScroll: 1,
        autoplay: props.auto,
        autoplaySpeed: 3000,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {props.images.map((item, index) => {
                    return (
                        <div key={`background-${index + 1}`} className="slider-background">
                            <img src={item} alt="" style={{ width: props.width, height: props.height, maxWidth: props.maxWidth }} />

                        </div>
                    )
                })}
            </Slider>
        </div>

    )
}

export default SliderComponent