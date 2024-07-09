import React, { useEffect, useState } from 'react';
import './ProductDetail.scss';
import Slider from "react-slick";
import { useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdStar, IoMdArrowDropright } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaFacebook, FaHome } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetProductDetails } from '../../service/productApiService';
import { formatCurrency, renderStarFromNumber } from "../../untils/helpers"

const ProductDetails = (props) => {
    const [productDetails, setProductDetails] = useState();
    const [displayImage, setDisplayImage] = useState("");
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        vertical: true,
        verticalSwiping: true
    };
    let { productId } = useParams();

    const fetchAProduct = async () => {
        try {
            const productDetails = await apiGetProductDetails(productId);
            console.log("check details:", productDetails);
            setProductDetails(productDetails?.DT);
            setDisplayImage(productDetails?.DT?.images[0])
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    useEffect(() => {
        fetchAProduct()
        console.log('check productDetails', productDetails);
    }, [])


    const sliderRef = useRef();
    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const handleChangeImage = (item) => {
        setDisplayImage(item)
    }
    return (
        <div className='product-details-page'>
            <div className='nav-title'>
                <FaHome className='mb-1' /> <IoMdArrowDropright />Sản phẩm <IoMdArrowDropright /> Áo phông <IoMdArrowDropright /> Áo phông unisex
            </div>
            <div className='container '>
                <div className='row'>
                    <div className='imgs-product col-lg-8'>
                        <div className='row'>
                            <div className='list-imgs-product col-lg-2'>
                                <Slider {...settings} ref={sliderRef}>
                                    {productDetails?.images.map((item, index) => {
                                        return (
                                            <div>
                                                <img src={item} onClick={() => { handleChangeImage(item) }} />
                                            </div>
                                        )
                                    })}

                                    {/* Thêm ảnh từ các biến khác nếu cần */}
                                </Slider>
                                <button className="prevBtn" onClick={prevSlide}><IoIosArrowUp /></button>
                                <button className="nextBtn" onClick={nextSlide}><IoIosArrowDown /></button>
                            </div>
                            <div className='display-img-product col-lg-10' >
                                <img src={displayImage} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className=' ps-4 info-product col-lg-4'>
                        <h3>{productDetails?.title}</h3>
                        <div>
                            <div className='voteView me-1 pe-1 d-inline-block'>{productDetails?.totalRatings}</div>
                            <div className='vote d-inline-block'>
                                {renderStarFromNumber(productDetails?.totalRatings)}
                            </div>
                        </div>
                        <hr />
                        <div className='product-price mt-0'>
                            <div className={`price-sale d-inline me-4`}>{productDetails?.discount !== 0 ? `${formatCurrency(productDetails?.price * (1 - productDetails?.discount / 100))}đ` : ""}</div>
                            <div className={`${productDetails?.discount !== 0 ? 'price-real d-inline' : 'price'}`}>{`${formatCurrency(productDetails?.price)}đ`}</div>
                            <div className={`${productDetails?.discount !== 0 ? 'sale d-inline' : ''}`}>
                                {productDetails?.discount !== 0 ? `Giảm ${productDetails?.discount} %` : ''}
                            </div>
                        </div>

                        <div className='info-color-product mt-3'>
                            <div className='d-inline '>Màu sắc</div>
                            <div className='d-inline mx-3' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>Đen</div>
                            <div className='d-flex mt-2'>
                                {/* <label><img src={vd1} /></label>
                                <label><img src={vd1} /></label>
                                <label><img src={vd1} /></label> */}
                            </div>
                        </div>
                        <div className='size-product d-flex flex-column mt-3'>
                            <div>
                                <div className='d-inline'>Kích thước:</div>
                                <div className='d-inline mx-4 text-decoration-underline' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>Hướng dẫn chọn size</div>
                            </div>
                            <div className='list-size-items d-flex mt-2'>
                                {productDetails?.size.map((item, index) => {
                                    return (
                                        <label key={`${item}-${index}`} className='size-items'>
                                            <span>{item}</span>
                                        </label>

                                    )
                                })}
                            </div>
                        </div>
                        <div className='input-quantity mt-3'>
                            <input type='button' className='minus-quantity border' value={'-'} />
                            <input type='text' className='text-center border-top border-bottom w-25' value={1} />
                            <input type='button' value={'+'} className='plus-quantity border' />
                        </div>
                        <div className='add-cart mt-3'>
                            <button className='add-to-cart'>THÊM VÀO GIỎ HÀNG</button>
                            <button className='add-to-cart add-quick-cart'>MUA NGAY</button>
                        </div>
                        <div className='favourite mt-4 d-flex justify-content-center '>
                            <button className='border-0 bg-transparent'><CiHeart className='mb-1' /> YÊU THÍCH</button>
                        </div>
                        <div className='share-product mt-3 d-flex justify-content-center'>
                            <label>Chia sẻ <FaFacebook className='mb-1 ms-2' style={{ fontSize: '30px' }} /></label>
                        </div>
                    </div>

                </div>
            </div>
            <hr />
            <div className='description-product'>
                <h1>1. THÔNG TIN SẢN PHẨM</h1>
                <ul>
                    <li>➤ Màu sắc: đen, trắng</li>
                    <li>➤ Chất liệu: tweed</li>
                    <li>➤ Set đồ phù hợp phong cách năng động, thoải mái</li>
                    <li>➤ Mô tả chung: Chất liệu tweed, ko co giãn, đứng phom, áo suông dáng ngắn, chân váy dáng suông dài, sản phẩm 1 lớp, chất liệu dày dặn đứng phom.
                        Áo mở khuy trước, chân váy kéo khóa sau, chân váy dáng dài, xẻ sau đính khuy túi trước, áo cổ trụ phối tay bồng vải thô,
                        thích hợp mặc set hoặc tách set mix áo cùng quần suông, chân váy cùng áo thun ôm, sản phẩm mặc dạo phố, công sở</li>
                    <li>➤ Thông số size: XS, S, M, L, XL, XXL</li>
                </ul>
                <h1>2. ĐẶC ĐIỂM SẢN PHẨM</h1>
                <ul>
                    <li>➤ Set đồ được yêu thích bởi chất tweed cao cấp dày dặn, bề mặt nổi nhẹ chất dệt, chuẩn form, có cảm giác mềm mại trên da, tạo sự thoải mái cho người mặc.</li>
                    <li>➤ Set đồ bao gồm một một thiết kế áo ở hữu form dáng ngắn nhẹ nhàng giúp tỉ lệ cơ thể nàng hoàn hảo và cuốn hút hơn, kết hợp với chi tiết tay áo phối vải thô nhẹ nhàng, thoải mái. Kết
                        hợp cùng thiết kế chân váy có form dáng suông dễ dàng che khuyết điểm phần chân chưa hoàn hảo</li>
                    <li>➤ Tính ứng dụng: Set đồ phù hợp mặc đi làm, đi chơi, đi hẹn hò dạo phố</li>
                </ul>

                <h1>3. HƯỚNG DẪN BẢO QUẢN SẢN PHẨM</h1>
                <ul>
                    <li>➤ Lộn trái sản phẩm khi giặt, không giặt chung sản phẩm trắng với quần áo tối màu.</li>
                    <li>➤ Giặt với sản phẩm cùng màu.</li>
                    <li>➤ Sản phẩm đậm màu hãng khuyến cáo nên giặt nước trắng 2 -3 lần đầu.</li>
                    <li>➤ Không sử dụng hóa chất tẩy có chứa Clo, không ngâm sản phẩm.</li>
                    <li>➤ Giặt máy ở chế độ nhẹ, nhiệt độ thường.</li>
                    <li>➤ Không phơi trực tiếp dưới ánh nắng mặt trời.</li>
                    <li>➤ Sấy khô ở nhiệt độ thấp.</li>
                    <li>➤ Là ở nhiệt độ thấp, ≤ 110°C.</li>
                </ul>
            </div>
        </div>

    )
}

export default ProductDetails;
