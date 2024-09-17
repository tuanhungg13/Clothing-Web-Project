import React, { useEffect, useState } from "react";
import "./Slider.scss";
import Slider from "react-slick";
import { apiGetProducts } from "../../service/productApiService";
import { formatCurrency } from "../../untils/helpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SliderComponent = (props) => {
    const [displayItems, setDisplayItems] = useState(5)
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        verticalSwiping: true,
    };
    const settingsMobile = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
    };
    const navigation = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiGetProducts({ limit: 10, title: "Áo", page: 1, sort: "-sold" })
            if (response && response.EC === 0) {
                setProducts(response.DT);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
        }
    }

    const handleAddToCart = (slug) => {
        console.log("pid:", slug)
        navigation(`/products/${slug}`)
    }
    return (
        <div className="list-img">
            <div className="d-md-block d-none">
                <Slider {...settings}>
                    {products && products.length > 0 && products.map((item, index) => {
                        return (
                            <div key={`img-${index}`} className="outfit-content">
                                <div className="d-flex flex-column justify-content-center" style={{ fontFamily: "Roboto-Regular" }}>
                                    <img src={item.options[0].images[0]} onClick={() => { handleAddToCart(item.slug) }} />
                                    <label className="text-center mt-3" style={{ height: "50px" }}>{item.title}</label>
                                    <label className="text-center fw-bold" >{formatCurrency(item.price)}</label>
                                    <button className="mt-2" onClick={() => { handleAddToCart(item.slug) }}>Thêm vào giỏ hàng</button>
                                </div>

                            </div>
                        )
                    })}
                </Slider>

            </div>

            <div className="d-md-none d-block">
                <Slider {...settingsMobile}>
                    {products && products.length > 0 && products.map((item, index) => {
                        return (
                            <div key={`img-${index}`}>
                                <div className="d-flex flex-column justify-content-center" style={{ fontFamily: "Roboto-Regular" }}>
                                    <img src={item.options[0].images[0]} onClick={() => { handleAddToCart(item.slug) }} />
                                    <label className="text-center mt-3">{item.title}</label>
                                    <label className="text-center fw-bold" >{formatCurrency(item.price)}</label>
                                    <button className="m-auto mt-2 w-75" style={{ border: "1px solid #ccc", color: "#d61c1f", borderRadius: "5px" }} onClick={() => { handleAddToCart(item.slug) }}>Thêm vào giỏ hàng</button>
                                </div>

                            </div>
                        )
                    })}
                </Slider>
            </div>


        </div>
    )
}

export default SliderComponent;