import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../untils/helpers";
import Cookies from 'js-cookie'
import { getCartFromCookies } from "../../redux/cartSlice";
import { apiRemoveFromCart } from "../../service/userApiService";
import { getCurrent } from "../../redux/userSlice";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPublishedWithChanges } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { addToCart } from "../../untils/helpers";
const CartDetailsPage = () => {
    const cartItems = useSelector(state => state?.user?.current?.cart);
    const cartFromCookies = useSelector(state => state?.cart?.cartFromCookies);
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigation = useNavigate();
    const [displayCart, setDisplayCart] = useState([])
    useEffect(() => {
        //Nếu người dùng đăng nhập hiển thị cart của người dùng lưu trong csdl
        //Nếu ko đăng nhập thì hiển thị cart lưu ở cookies

        if (isLoggedIn) {
            setDisplayCart(cartItems)
        }
        else {
            setDisplayCart(Object.values(cartFromCookies))
        }

    }, [cartItems, cartFromCookies, isLoggedIn])
    const [errors, setErrors] = useState({})

    const getImgOfProduct = (item) => {
        let img;
        if (isLoggedIn) {
            img = item?.product?.options.find(option => option.color === item.color).images[0];
        }
        else {
            img = item?.product?.images
        }
        return img
    }
    const calculateTotalPrice = () => {
        const total = displayCart.reduce((total, item) => total + item?.product?.price * item?.quantity, 0);
        return formatCurrency(total)
    }

    const handleRemoveCartItems = async (e, cartItem) => {
        e.stopPropagation();
        console.log("xóa")
        if (isLoggedIn) {
            const removeItem = await apiRemoveFromCart({ pid: cartItem.product._id, color: cartItem.color, size: cartItem.size })
            if (removeItem.EC === 0) {
                dispatch(getCurrent());
            }
            return
        }
        else {
            //copy lại mảng cart
            let cartCopy = [...displayCart];
            //lọc ra những item khác vs item bị xóa
            cartCopy = cartCopy.filter(item => !(item._id === cartItem._id && item.color === cartItem.color && item.size === cartItem.size));
            //chuyển từ mảng về object
            const cartCookies = { ...cartCopy }
            //set lại cookies sau khi xóa
            Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cartCookies), { expires: 30 });
            //dispatch để cập nhật lạ redux
            dispatch(getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) }))
        }
    }

    const handleChangeQuantityInCre = (item, index) => {
        const newError = {}
        const sizeOfColor = item.product?.options?.find(option => option.color === item.color)?.sizeQuantity;
        const quantityOfSize = sizeOfColor?.find(sizeQtt => sizeQtt.size === item.size).quantity;
        if (item.quantity > quantityOfSize) {
            newError[item._id] = "Không đủ số lượng!";
            setErrors(newError)
            return
        }
        else {
            let quantity = item.quantity
            setDisplayCart(prev => {
                const prevCopy = [...prev];
                // Tạo một bản sao của đối tượng item tại vị trí index
                const updatedItem = { ...prevCopy[index], quantity: quantity + 1 };

                // Gán lại giá trị cho updatedItems tại vị trí index
                prevCopy[index] = updatedItem;
                return prevCopy
            })
            console.log("check product cart", item.product)
            addToCart(dispatch, isLoggedIn, item.product, item.color, item.size, 1)
        }
        setErrors(newError);
    }

    const handleChangeQuantityReduce = (item, index) => {
        const newError = {}
        if (item.quantity < 1) {
            return
        }
        else {
            setDisplayCart(prev => {
                const prevCopy = [...prev];
                // Tạo một bản sao của đối tượng item tại vị trí index
                const updatedItem = { ...prevCopy[index], quantity: prevCopy[index].quantity - 1 };
                // Gán lại giá trị cho updatedItems tại vị trí index
                prevCopy[index] = updatedItem;

                return prevCopy
            })
            newError[item._id] = ""
            setErrors(newError)
        }
    }
    return (
        <div>
            <label>Giỏ hàng</label>
            <div style={{ margin: "30px 150px" }}>
                <div className="mx-3">
                    <h3 className="d-inline me-3">CHI TIẾT GIỎ HÀNG</h3>
                    <label className="mb-1"> (Bạn đang có
                        <span className="fw-bold mx-1">
                            {displayCart?.length}
                        </span>
                        sản phẩm trong giỏ hàng)
                    </label>
                    <hr />
                </div>
                <div className="row mx-0">
                    <div className="col-7">
                        {displayCart && displayCart.length > 0 && displayCart.map((item, index) => {
                            return (
                                <div key={`cartItem -${index}`}>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <img type='button' src={getImgOfProduct(item)} alt={item?.product?.title} style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                                onClick={() => {
                                                    navigation(`/${item?.product?.slug}`);
                                                }} />
                                            <div className="ms-2">
                                                <label type='button' onClick={() => {
                                                    navigation(`/${item.product.slug}`);
                                                }}>{item?.product?.title} - {item?.size} - {item?.color}</label>
                                                <div>{formatCurrency(item?.product?.price)} </div>
                                                <div>
                                                    <button className="bg-transparent border-0" style={{ fontSize: "25px" }}
                                                        onClick={() => { handleChangeQuantityReduce(item, index) }}>-</button>
                                                    <label className="w-25 bg-light text-center">{item.quantity}</label>
                                                    <button className="bg-transparent border-0" style={{ fontSize: "25px" }}
                                                        onClick={() => { handleChangeQuantityInCre(item, index) }}>+</button>
                                                </div>
                                                {errors && errors[item._id] && <small className="text-danger">{errors[item._id]}</small>}
                                            </div>
                                        </div>
                                        <button type="button" className='border-0' style={{ backgroundColor: "transparent" }}
                                            onClick={(e) => { handleRemoveCartItems(e, item) }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "lightgray"; }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                        >
                                            <TiDeleteOutline style={{ fontSize: "25px" }} />
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-5">
                        <div className="border bg-light p-3">
                            <label className="fw-bold">TÓM TẮT ĐƠN HÀNG</label>
                            <span className="d-block mt-2">Chưa bao gồm phí ship và mã giảm giá(nếu có)</span>
                            <label className="mt-2">Tổng tiền:
                                <span className="fw-bold">
                                    {calculateTotalPrice()}
                                </span>
                            </label>
                            <hr />
                            <small className="ms-1">Có thể nhập mẫ giảm giá ở phần thanh toán</small>
                            <div className="mt-3">
                                <button className="btn bg-dark w-100 text-white">
                                    <NavLink to={"/thanh-toan"} className={"text-decoration-none text-white"}> TIẾN HÀNH ĐẶT HÀNG</NavLink>
                                </button>
                                <button className="btn border bg-light w-100 text-dark mt-2">
                                    <NavLink to={"/san-pham"} className={"text-decoration-none text-dark"}>MUA THÊM SẢN PHẨM</NavLink>
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 d-flex flex-column gap-3 fst-italic fw-lighter">
                            <label><TbTruckDelivery /> GIAO HÀNG NỘI THÀNH TRONG 24 GIỜ</label>
                            <label><MdPublishedWithChanges /> ĐỔI HÀNG TRONG 30 NGÀY</label>
                            <label><RiContactsBookLine /> TỔNG ĐÀI BÁN HÀNG : 1234567890</label>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default CartDetailsPage