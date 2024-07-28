import React, { useEffect, useState } from 'react';
import './ProductDetail.scss';
import Slider from "react-slick";
import { useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdStar, IoMdArrowDropright } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaFacebook, FaHome } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetProductDetails } from '../../../service/productApiService';

import { formatCurrency, renderStarFromNumber } from '../../../untils/helpers';
import Ratings from "../../../components/ratings/Ratings"

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { apiAddToCart } from '../../../service/userApiService';
import { getCurrent } from '../../../redux/userSlice';
import Cookies from "js-cookie";
import { getCartFromCookies } from '../../../redux/cartSlice';
const ProductDetails = (props) => {
    const dispatch = useDispatch()
    const [displayItems, setDisplayItems] = useState(5)
    const [vertical, setVertical] = useState(true)
    const [productDetails, setProductDetails] = useState();
    const [displayImage, setDisplayImage] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [imagesSlider, setImagesSlider] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [ratings, setRatings] = useState([])
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const sliderRef = useRef();
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: displayItems,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        vertical: vertical,
        verticalSwiping: true,
    };
    let { productId } = useParams();
    const fetchAProduct = async () => {
        try {
            const responseProduct = await apiGetProductDetails(productId);
            setProductDetails(responseProduct?.DT);
            setRatings(responseProduct.DT.ratings)
            setDisplayImage(responseProduct?.DT?.options[0]?.images[0])
            const allImages = responseProduct?.DT?.options.flatMap(option => option.images)
            const sizes = responseProduct?.size;
            setAllSizes(sizes)
            setImagesSlider(allImages)
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }
    const handleResize = () => {
        if (window.innerWidth > 576) {
            setDisplayItems(5);
            setVertical(true);
        } else {
            setDisplayItems(1);
            setVertical(false)
        }
    };

    useEffect(() => {
        fetchAProduct()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])



    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const handleChangeImage = (image) => {
        setDisplayImage(image)
    }

    const handleChooseSize = (size) => {
        setSize(size);

    }
    const handleCheckSize = (sizeSelect) => {
        if (!color) return true
        if (color) {
            const option = productDetails?.options?.find(option => option.color === color);
            return option?.sizeQuantity?.some(item => item.size === sizeSelect && item.quantity > 0);
        }
    }
    const handleCheckColor = (colorSelect) => {
        const colors = [];
        if (!size) {
            //duyệt các option
            productDetails.options.forEach(option => {
                //tìm trong sizeQuantity của option có size = size đang chọn không 
                const totalQuantity = option.sizeQuantity.reduce((total, item) => total + item.quantity, 0)
                if (totalQuantity > 0) {
                    colors.push(option.color);
                }
            });
        }
        else {
            //duyệt các option
            productDetails.options.forEach(option => {
                //tìm trong sizeQuantity của option có size = size đang chọn không 
                if (option.sizeQuantity.some(sizeQtt => sizeQtt.size === size && sizeQtt.quantity > 0)) {
                    //nếu có push màu của option đang duyệt vào mảng color tạo ở trên
                    colors.push(option.color);
                }
            });
        }

        //kiểm tra xem các màu đang render ở trang product details có nằm trong màu ở mảng color không
        return colors.includes(colorSelect);
    }

    //chọn màu sắc
    const handleChooseColor = (selectColor) => {
        setColor(selectColor)
        const imagesOfColor = productDetails?.options?.find(option => option.color === selectColor)?.images;
        setDisplayImage(imagesOfColor[0])
        setImagesSlider(imagesOfColor)
    }
    const handleIncrementQuantity = () => {
        if (quantity > productDetails?.quantity) return
        setQuantity(+quantity + 1)
    }

    const handleDecremantQuantity = () => {

        if (quantity <= 1) return
        setQuantity(+quantity - 1)
    }
    const handleChangeQuantity = (event) => {
        if (productDetails?.quantity === 0) return
        setQuantity(event.target.value)
    }

    const validDate = () => {
        let isValid = true;
        setError("");
        if (size && color) {
            const sizeOfColor = productDetails?.options?.find(option => option.color === color)?.sizeQuantity;
            const quantityOfSize = sizeOfColor.find(item => item.size === size).quantity;
            if (quantity > quantityOfSize) {
                setError(`Sản phẩm màu ${color}, size: ${size} chỉ còn ${quantityOfSize} chiếc. Vui lòng chọn số lượng phù hợp!`)
                isValid = false
            }
        }
        else if (!color || !size || !quantity) {
            isValid = false
        }
        return isValid
    }
    const handleAddToCart = async () => {
        const check = validDate()
        if (check)
            if (isLoggedIn) {
                const addToCart = await apiAddToCart({ pid: productDetails._id, color, size, quantity })
                dispatch(getCurrent())
                if (addToCart) {
                    alert("THÊM THÀNH CÔNG!")
                }
            }
            // Người dùng chưa đăng nhập
            else {
                // Lấy dữ liệu giỏ hàng hiện tại từ cookies
                let cart = Cookies.get("PRODUCT_CART_NEW");
                if (cart) {
                    console.log("thêm: ", cart)
                    // Nếu cookie đã có dữ liệu, giải mã nó
                    cart = JSON.parse(cart);
                    console.log("thêm khi parse: ", cart)
                } else {
                    // Nếu không có dữ liệu, khởi tạo giỏ hàng rỗng
                    cart = {};
                }
                const productKey = `${productDetails._id}-${color}-${size}`;
                console.log("check key:", productKey)
                // Thêm sản phẩm vào giỏ hàng
                if (cart[productKey]) {
                    console.log("check cart cũ:", cart[productKey])
                    cart[productKey] = {
                        product: {
                            images: productDetails?.options?.find(option => option.color === color)?.images[0],
                            title: productDetails.title,
                            slug: productDetails.slug,
                            price: productDetails.price
                        },
                        id: productDetails._id,
                        quantity: +quantity + cart[productKey].quantity,
                        color: color,
                        size: size
                    }
                }
                else {
                    cart[productKey] = {
                        product: {
                            images: productDetails?.options?.find(option => option.color === color)?.images[0],
                            title: productDetails.title,
                            slug: productDetails.slug,
                            price: productDetails.price
                        },
                        id: productDetails._id,
                        quantity: quantity,
                        color: color,
                        size: size
                    }

                };

                // Lưu lại giỏ hàng vào cookies (cập nhật hoặc tạo mới nếu không có)
                Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cart), { expires: 30 });
                dispatch((getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) })))
                alert("THÊM VÀO GIỎ HÀNG!");
            }
    }
    return (
        <div className='product-details-page'>
            <div className='container '>
                <div className='row mt-5'>
                    <div className='imgs-product col-lg-8'>
                        <div className='row'>
                            <div className={`${displayItems === 5 ? " list-imgs-product col-2" : "col-12 list-imgs-product-sm"} `}>
                                <Slider {...settings} ref={sliderRef}>
                                    {imagesSlider.map((item, index) => {
                                        return (
                                            <div key={`img-${index}`}>
                                                <img src={item} onClick={() => { handleChangeImage(item) }} />
                                            </div>
                                        )
                                    })}
                                </Slider>

                                {/* Thêm ảnh từ các biến khác nếu cần */}

                                <button className="prevBtn" onClick={prevSlide}><IoIosArrowUp /></button>
                                <button className="nextBtn" onClick={nextSlide}><IoIosArrowDown /></button>
                            </div>
                            <div className='display-img-product col-sm-10 d-sm-block d-none' >
                                <img src={displayImage} alt='' style={{ width: "100%" }} />
                            </div>
                        </div>
                    </div>
                    <div className=' ps-4 info-product col-lg-4'>
                        <h3>{productDetails?.title}</h3>
                        <div>
                            <div className='voteView me-1 pe-1 d-inline-block' style={{ color: '#ee4d2d' }}>{productDetails?.totalRatings}</div>
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
                            <div className='d-inline mx-3' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>{color}</div>
                            <div className='d-flex mt-2'>
                                {productDetails?.options?.map((item, index) => {
                                    return (
                                        <label onClick={() => { handleChooseColor(item.color) }} key={`color-${index}`}
                                            className={`${color === item.color && handleCheckColor(item.color) ? "active" : ""} ${handleCheckColor(item.color) ? " " : "inactive pe-none"}`}>
                                            <img src={item.images[0]} alt={item.color} />
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='size-product d-flex flex-column mt-3'>
                            <div>
                                <div className='d-inline'>Kích thước:</div>
                                <div className='d-inline mx-4 text-decoration-underline' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>Hướng dẫn chọn size</div>
                            </div>
                            <div className='list-size-items d-flex mt-2'>
                                {allSizes.map((item, index) => {

                                    return (
                                        <label key={`${item}-${index}`}
                                            className={`${size === item && handleCheckSize(item) ? "active" : " "} ${handleCheckSize(item) ? " " : "inactive pe-none"} size-items`}
                                            onClick={() => { handleChooseSize(item) }}>
                                            <span>{item}</span>
                                        </label>

                                    )
                                })}
                            </div>
                        </div>
                        <div className='input-quantity mt-3'>
                            <input type='button' className='minus-quantity border' value={'-'} onClick={() => {
                                handleDecremantQuantity()
                            }} />
                            <input type='text' className='text-center border-top border-bottom w-25' value={quantity}
                                onChange={(event) => { handleChangeQuantity(event) }} />
                            <input type='button' value={'+'} className='plus-quantity border' onClick={() => {
                                handleIncrementQuantity()

                            }} />
                            {error && <div>{error}</div>}
                        </div>
                        <div className='add-cart mt-3'>
                            <button className='add-to-cart' type='button' onClick={() => { handleAddToCart() }}>
                                THÊM VÀO GIỎ HÀNG</button>
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
                <hr />
                <div className='description-product mb-5'>
                    <h1>1. THÔNG TIN SẢN PHẨM</h1>
                    {productDetails?.description?.map((item, index) => {
                        return (
                            <li key={`description-${index}`}>➤ {item}</li>
                        )
                    })}
                    <h1 className='mt-4'>2. HƯỚNG DẪN BẢO QUẢN</h1>
                    <div>

                        <li>➤ Giặt máy ở chế độ nhẹ, nhiệt độ thường. Giặt với sản phẩm cùng màu </li>
                        <li>➤ Không ngâm lâu trong xà phòng</li>
                        <li>➤ Không sử dụng hóa chất tẩy</li>
                        <li>➤ Phơi mặt trái của áo và phơi trong bóng râm  </li>
                        <li>➤ Hạn chế sấy áo. Là áo ở nhiệt độ thường.  </li>
                    </div>

                </div>
                <hr />

                <Ratings ratings={ratings} totalRatings={productDetails?.totalRatings} />
            </div>

        </div >

    )
}

export default ProductDetails;
