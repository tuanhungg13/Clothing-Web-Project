import React, { useEffect, useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../untils/helpers";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from 'js-cookie'
import { getCartFromCookies } from "../../redux/cartSlice";
const CartMenu = (props) => {
    const cartItems = useSelector(state => state?.user?.current?.cart || []);
    const cartFromCookies = useSelector(state => state?.cart?.cartFromCookies || []);
    // Kết hợp cartItems từ Redux và cartFromCookies

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigation = useNavigate()

    //Nếu người dùng đăng nhập hiển thị cart của người dùng lưu trong csdl
    //Nếu ko đăng nhập thì hiển thị cart lưu ở cookies
    const displayCart = isLoggedIn ? cartItems : Object.values(cartFromCookies);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("check cookies:", cartFromCookies);
        console.log("check displaCart:", displayCart)
    }, [])
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

    const handleRemoveCartItems = (cartItems) => {
        if (isLoggedIn) {

        }
        else {
            let cartCopy = [...displayCart];
            cartCopy = cartCopy.filter(item => item._id !== cartItems._id || item.color !== cartItems.color || item.size !== cartItems.size);
            const cartCookies = { ...cartCopy }
            Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cartCookies), { expires: 30 });
            dispatch(getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) }))
        }
    }
    return (
        <div className="dropdown">
            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px', marginRight: "10px" }} />
                <label>{displayCart ? displayCart.length : 0}</label> Giỏ hàng
            </button >
            <ul className="dropdown-menu px-3" style={{ width: "500px" }}>
                <div className="mx-3">
                    <h3>GIỎ HÀNG</h3>
                    <label>Bạn đang có {cartItems?.length} sản phẩm trong giỏ hàng</label>
                    <hr />
                </div>
                {displayCart.map((item, index) => {
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
                                        <div>{formatCurrency(item?.product?.price)} x {item?.quantity}</div>
                                    </div>
                                </div>
                                <button type="button" className='border-0' style={{ backgroundColor: "transparent" }}
                                    onClick={() => { handleRemoveCartItems(item) }}
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
                <div>
                    <div className="d-flex justify-content-between">
                        <label style={{ fontSize: "15px" }}>TỔNG TIỀN TẠM TÍNH:</label>
                        <div>{calculateTotalPrice()}</div>
                    </div>
                    <button type="button" className="w-100 my-3 " style={{ backgroundColor: "black", height: "40px", color: "white" }}>TIẾN HÀNH ĐẶT HÀNG</button>
                    <NavLink className="d-flex justify-content-center" style={{ color: "black" }}>Chi tiết giỏ hàng</NavLink>
                </div>

            </ul>
        </div>

    )
}

export default CartMenu