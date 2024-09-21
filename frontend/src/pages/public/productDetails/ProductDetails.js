import React, { useEffect, useState } from 'react';
import './ProductDetail.scss';
import Slider from "react-slick";
import { useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { apiGetProductDetails } from '../../../service/productApiService';
import { formatCurrency, renderStarFromNumber } from '../../../untils/helpers';
import Ratings from "../../../components/ratings/Ratings"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../untils/helpers';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { apiAddToCart } from '../../../service/userApiService';
import { getCurrent } from '../../../redux/userSlice';
import Cookies from "js-cookie";
import { getCartFromCookies } from '../../../redux/cartSlice';
import { Spin } from 'antd';
import { ImSad2 } from "react-icons/im";
const ProductDetails = (props) => {
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState({});
    const [displayImage, setDisplayImage] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [imagesSlider, setImagesSlider] = useState([]);
    const [ratings, setRatings] = useState([])
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const sliderRef = useRef();
    const sliderRefMobile = useRef()
    const [loading, setLoading] = useState(false)
    const [productNotFound, setProductNotFound] = useState(false);
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        vertical: true,
        verticalSwiping: true,
    };
    const settingsMobile = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        vertical: false,
        verticalSwiping: true,
    };
    const navigation = useNavigate()
    const { productId } = useParams();
    const fetchAProduct = async () => {
        setLoading(true)
        try {
            const responseProduct = await apiGetProductDetails(productId);
            if (responseProduct && responseProduct.EC === 0) {
                setProductDetails(responseProduct?.DT);
                setRatings(responseProduct.DT.ratings)
                setDisplayImage(responseProduct?.DT?.options[0]?.images[0])
                const allImages = responseProduct?.DT?.options.flatMap(option => option.images)
                setImagesSlider(allImages)
                setProductNotFound(false)
            }
            else {
                setProductNotFound(true)
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            setProductNotFound(true)
        }
        setLoading(false);

    }

    useEffect(() => {
        fetchAProduct()

    }, [productId])



    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlideMobile = () => {
        sliderRefMobile.current.slickPrev();
    };

    const nextSlideMobile = () => {
        sliderRefMobile.current.slickNext();
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
            toast.error("Vui lòng chọn đầy đủ thông tin sản phẩm!")
            isValid = false
        }
        return isValid
    }
    const handleAddToCart = async () => {
        const check = validDate()
        if (check) addToCart(dispatch, isLoggedIn, productDetails, color, size, quantity)
    }
    const ContentDisplay = ({ content }) => {
        const cleanContent = DOMPurify.sanitize(content); // Làm sạch nội dung HTML

        return (
            <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        );
    }

    const handleBuyNow = async () => {
        const checkValid = validDate();
        if (checkValid) {
            if (isLoggedIn) {
                const addToCart = await apiAddToCart({
                    pid: productDetails._id,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: productDetails.price
                })
                if (addToCart && addToCart.EC === 0) {
                    await dispatch(getCurrent())
                    navigation("/order")
                }
            }
            // Người dùng chưa đăng nhập
            else {
                // Lấy dữ liệu giỏ hàng hiện tại từ cookies
                let cart = Cookies.get("PRODUCT_CART_NEW");
                if (cart) {
                    // Nếu cookie đã có dữ liệu, giải mã nó
                    cart = JSON.parse(cart);
                } else {
                    // Nếu không có dữ liệu, khởi tạo giỏ hàng rỗng
                    cart = {};
                }
                const productKey = `${productDetails._id}-${color}-${size}`;

                // Thêm sản phẩm vào giỏ hàng
                if (cart[productKey]) {
                    cart[productKey] = {
                        product: {
                            title: productDetails.title,
                            images: productDetails?.options?.find(option => option.color === color)?.images[0] || productDetails.images,
                            slug: productDetails.slug,
                            _id: productDetails._id
                        },
                        _id: productKey,
                        quantity: +quantity + cart[productKey].quantity,
                        color: color,
                        size: size,
                        price: productDetails.price
                    }
                }
                else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    cart[productKey] = {
                        product: {
                            title: productDetails.title,
                            images: productDetails?.options?.find(option => option.color === color)?.images[0] || productDetails.images,
                            slug: productDetails.slug,
                            _id: productDetails._id
                        },
                        _id: `${productDetails._id}-${color}-${size}`,
                        quantity,
                        price: productDetails.price,
                        color,
                        size,
                    };
                }
                // Cập nhật lại cookies sau khi thêm vào giỏ hàng
                Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cart), { expires: 30 });
                // Cập nhật Redux state (nếu cần)
                dispatch(getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) }));
                navigation("/order")
            }
        }
    }
    return (
        <div className='product-details-page'>
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>
            ) : productNotFound ? (
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: "50vh", fontSize: "20px" }}>
                    <ImSad2 style={{ fontSize: "35px" }} className='me-3' /> Không tìm thấy sản phẩm bạn yêu cầu !
                    <NavLink to={"/products"} className={"text-decoration-none mt-3"} style={{ fontSize: "18px" }}>Xem các sản phẩm khác ở đây!</NavLink></div>
            ) :
                (
                    <div className='container'>
                        <div className='mt-3'>
                            <NavLink className={"text-decoration-none text-dark"} to={"/"}><IoHomeOutline className='mb-1' /> Trang chủ / </NavLink>
                            <NavLink className={"text-decoration-none text-dark"} to={`/products/`}>Sản phẩm / </NavLink>
                            <NavLink className={"text-decoration-none text-dark"} to={`/products/${productDetails.slug}`}>{productDetails.title}</NavLink>
                        </div >
                        <div className='row mt-5'>
                            <div className='imgs-product col-lg-8 col-12'>
                                <div className='row'>
                                    <div className={"d-sm-block d-none list-imgs-product col-2"}>
                                        <Slider {...settings} ref={sliderRef}>
                                            {imagesSlider && imagesSlider.length > 0 && imagesSlider.map((item, index) => {
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
                                    <div className={"d-sm-none d-block list-imgs-product-sm col-12"}>
                                        <Slider {...settingsMobile} ref={sliderRefMobile}>
                                            {imagesSlider && imagesSlider.length > 0 && imagesSlider.map((item, index) => {
                                                return (
                                                    <div key={`img-${index}`}>
                                                        <img src={item} onClick={() => { handleChangeImage(item) }} />
                                                    </div>
                                                )
                                            })}
                                        </Slider>

                                        {/* Thêm ảnh từ các biến khác nếu cần */}

                                        <button className="prevBtnMobile" onClick={prevSlideMobile}><IoIosArrowUp /></button>
                                        <button className="nextBtnMobile" onClick={nextSlideMobile}><IoIosArrowDown /></button>
                                    </div>
                                    <div className='display-img-product col-sm-10 d-sm-block d-none' >
                                        <img src={displayImage} alt='' style={{ width: "100%" }} />
                                    </div>
                                </div>
                            </div>
                            <div className=' ps-4 info-product mt-lg-0 mt-3 col-lg-4 col-12'>
                                <h3>{productDetails?.title}</h3>
                                <div>
                                    {productDetails && productDetails.totalRatings !== 0 ?
                                        <div>
                                            <div className='voteView me-1 pe-1 d-inline-block' style={{ color: '#ee4d2d' }}>{productDetails?.totalRatings}</div>
                                            <div className='vote d-inline-block'>
                                                {renderStarFromNumber(productDetails?.totalRatings)}
                                            </div>
                                        </div>
                                        :
                                        <div className='text-secondary'>Chưa có đánh giá</div>
                                    }
                                </div>
                                <hr />

                                <div className={'product-price'}>{`${formatCurrency(productDetails?.price)}đ`}</div>

                                <div className='info-color-product mt-3'>
                                    <div className='d-inline '>Màu sắc</div>
                                    <div className='d-inline mx-3' style={{ fontSize: '14px', textTransform: 'capitalize', color: 'rgb(116, 114, 114)' }}>{color}</div>
                                    <div className='d-flex mt-2'>
                                        {productDetails && productDetails.options && productDetails.options.length > 0 && productDetails.options.map((item, index) => {
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
                                        {productDetails && productDetails.allSizes && productDetails.allSizes.length > 0 && productDetails.allSizes.map((item, index) => {
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
                                    <input type='number' className='text-center border-top border-bottom w-25' value={quantity}
                                        onChange={(event) => { handleChangeQuantity(event) }} />
                                    <input type='button' value={'+'} className='plus-quantity border' onClick={() => {
                                        handleIncrementQuantity()

                                    }} />
                                    {error && <div>{error}</div>}
                                </div>
                                <div className='mt-3 d-flex'>
                                    <button className='w-50 me-3 bg-dark text-white' type='button' style={{ minHeight: "55px" }} onClick={() => { handleAddToCart() }}>
                                        THÊM VÀO GIỎ HÀNG</button>
                                    <button className='w-50 bg-dark text-white' style={{ minHeight: "55px" }} onClick={handleBuyNow}>MUA NGAY</button>
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
                            <ContentDisplay content={productDetails.description} />
                        </div>
                        <hr />

                        <Ratings ratings={ratings} totalRatings={productDetails?.totalRatings} />
                    </div >
                )}
        </div >

    )
}

export default ProductDetails;
