import React, { useEffect, useState } from "react";
import "./Slider.scss";
import Slider from "react-slick";
import style01 from "../../assets/img/product01.webp";
import style02 from "../../assets/img/product02.webp";
import style03 from "../../assets/img/product03.webp";
import style04 from "../../assets/img/product04.webp";
import style05 from "../../assets/img/product05.webp";
import style06 from "../../assets/img/product06.webp";
import style07 from "../../assets/img/product07.webp";
import style08 from "../../assets/img/product08.webp";
import style09 from "../../assets/img/product09.webp";
import style10 from "../../assets/img/product10.webp";
const SliderComponent = (props) => {
    const listStyle = [style01, style02, style03, style04, style05, style06, style07, style08, style09, style10]
    const [displayItems, setDisplayItems] = useState(5)
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: displayItems,
        slidesToScroll: 1,
        verticalSwiping: true,
    };
    const handleResize = () => {
        if (window.innerWidth > 576) {
            setDisplayItems(5);
        } else {
            setDisplayItems(1);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="list-img" style={{ height: props.height }}>
            <Slider {...settings}>
                {listStyle.map((item, index) => {
                    return (
                        <div key={`img-${index}`} className="outfit-content">
                            <img src={item} style={{ width: props.width }} />
                        </div>
                    )
                })}
            </Slider>

        </div>
    )
}

export default SliderComponent;