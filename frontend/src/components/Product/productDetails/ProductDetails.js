import React from 'react';
import './ProductDetails.css';
import vd1 from '../../../assets/img/product01.webp'
import vd2 from '../../../assets/img/product02.webp'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const ProductDetails = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        vertical: true,
        verticalSwiping: true
    };
    const sliderRef = useRef();

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };
    return (
        <div className='product-details-page'>
            <div className='container'>
                <div className='row'>
                    <div className='imgs-product col-lg-7'>
                        <div className='row'>
                            <div className='list-imgs-product col-lg-3'>
                                <Slider {...settings} ref={sliderRef}>

                                    <div>
                                        <img src={vd1} alt="" />
                                    </div>
                                    <div>
                                        <img src={vd2} alt="" />
                                    </div>
                                    <div>
                                        <img src={vd1} alt="" />
                                    </div>
                                    <div>
                                        <img src={vd2} alt="" />
                                    </div>
                                    <div>
                                        <img src={vd1} alt="" />
                                    </div>
                                    <div>
                                        <img src={vd2} alt="" />
                                    </div>
                                    {/* Thêm ảnh từ các biến khác nếu cần */}
                                </Slider>
                                <button className="prevBtn" onClick={prevSlide}><IoIosArrowUp /></button>
                                <button className="nextBtn" onClick={nextSlide}><IoIosArrowDown /></button>
                            </div>
                            <div className='display-img-product col-lg-9' >
                                <img src={vd1} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='info-product col-lg-5'>
                        <h3>Áo phông unisex</h3>
                        <div className='product-price'>
                            <div className='price-sale d-inline' style={{ fontSize: '25px', marginRight: '30px' }}>200,000đ</div>
                            <div className='price-real d-inline'>350,000</div>
                        </div>

                        <div className='info-color-product'>
                            <div className='d-inline '>Màu sắc</div>
                            <div className='d-inline mx-3' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>Đen</div>
                            <div className='d-flex'>
                                <button>Đen</button>
                                <button>Xanh</button>
                                <button>Trắng</button>
                            </div>
                        </div>
                        <div className='size-product d-flex flex-column'>
                            <div>
                                <div className='d-inline'>Kích thước:</div>
                                <div className='d-inline mx-4' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>Hướng dẫn chọn size</div>
                            </div>
                            <div className='list-size-items d-flex mt-2'>
                                <div className='size-items'>XS</div>
                                <div className='size-items'>X</div>
                                <div className='size-items'>M</div>
                                <div className='size-items'>L</div>
                                <div className='size-items'>XL</div>
                                <div className='size-items'>XXL</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
