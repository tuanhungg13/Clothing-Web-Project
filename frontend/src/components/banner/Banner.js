import React from "react";
import "./Banner.scss"
import Slider from 'react-slick';

const Banner = (props) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className="slider-container" >
            <Slider {...settings} >
                {props && props.images && props.images.map((item, index) => {
                    return (
                        <div key={`background-${index + 1}`} className="slider-background" style={{ margin: "10000px" }}>
                            <img src={item} alt="" />
                        </div>
                    )
                })}
            </Slider>
        </div>

    )
}

export default Banner