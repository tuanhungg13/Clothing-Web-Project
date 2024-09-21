import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../untils/helpers";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from 'js-cookie'
import { getCartFromCookies } from "../../redux/cartSlice";
import { apiRemoveFromCart } from "../../service/userApiService";
import { getCurrent } from "../../redux/userSlice";

const CartMenu = () => {
    const cartItems = useSelector(state => state?.user?.current?.cart || []);
    const cartFromCookies = useSelector(state => state?.cart?.cartFromCookies || []);
    // Kết hợp cartItems từ Redux và cartFromCookies
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigation = useNavigate()

    //Nếu người dùng đăng nhập hiển thị cart của người dùng lưu trong csdl
    //Nếu ko đăng nhập thì hiển thị cart lưu ở cookies
    const displayCart = isLoggedIn ? cartItems : Object.values(cartFromCookies);
    const dispatch = useDispatch();
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
        const total = displayCart.reduce((total, item) => total + item.price * item.quantity, 0);
        return total
    }

    const handleRemoveCartItems = async (e, cartItem) => {
        e.stopPropagation();
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
    return (
        <div className="dropdown" >
            <button className=" border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px', marginRight: "10px" }} />
                <label className="d-inline">{displayCart ? displayCart.length : 0}</label>
            </button >
            <ul className="dropdown-menu dropdown-menu-end px-3" style={{ width: "40vw", overflowY: "scroll", minHeight: "70vh" }} >
                <div className="mx-3">
                    <h3>GIỎ HÀNG</h3>
                    <label>Bạn đang có {displayCart?.length} sản phẩm trong giỏ hàng</label>
                    <hr />
                </div>
                {displayCart && displayCart.length > 0 && displayCart.map((item, index) => {
                    return (
                        <div key={`cartItem -${index}`}>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img type='button' src={getImgOfProduct(item)} alt={item?.product?.title} style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                        onClick={() => {
                                            navigation(`/products/${item.product.slug}`);
                                        }} />
                                    <div className="ms-2">
                                        <label type='button' onClick={() => {
                                            navigation(`/${item.product.slug}`);
                                        }}>{item.product.title} - {item.size} - {item?.color}</label>
                                        <div>{formatCurrency(item.price)} x {item.quantity}</div>
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
                <div>
                    <div className="d-flex justify-content-between">
                        <label style={{ fontSize: "15px" }}>TỔNG TIỀN TẠM TÍNH:</label>
                        <div>{formatCurrency(calculateTotalPrice())}</div>
                    </div>
                    <button type="button" className="w-100 my-3 " style={{ backgroundColor: "black", height: "40px", color: "white" }}>
                        <NavLink className={"text-white text-decoration-none"} to={"/order"}>TIẾN HÀNH ĐẶT HÀNG</NavLink></button>
                    <NavLink className="d-flex justify-content-center" style={{ color: "black" }} to={"/cart-details"}>Chi tiết giỏ hàng</NavLink>
                </div>

            </ul>
        </div>

    )
}

export default CartMenu