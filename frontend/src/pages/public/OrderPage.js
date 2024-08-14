import React, { useEffect, useState } from "react";
import UserInfor from "../../components/UserInfor";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../untils/helpers";
import { TiDeleteOutline } from "react-icons/ti";

const OrderPage = () => {
    const cartItems = useSelector(state => state?.user?.current?.cart || []);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const cartFromCookies = useSelector(state => state?.cart?.cartFromCookies || []);
    const displayCart = isLoggedIn ? cartItems : Object.values(cartFromCookies);
    const navigation = useNavigate();
    const [payload, setPayload] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        note: "",
        payment: "",
        totalPrice: 0
    })
    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        note: "",
        payment: ""
    })
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

    const validate = () => {
        const newError = {}
        let isValid = true
        if (!payload.userName) {
            newError.userName = "Vui lòng nhập họ và tên!";
            isValid = false
        }
        if (!payload.email) {
            newError.email = "Vui lòng nhập email!";
            isValid = false
        }
        if (!payload.phoneNumber) {
            newError.phoneNumber = "Vui lòng nhập số điện thoại!";
            isValid = false
        }
        else if (payload.phoneNumber < 9 || payload.phoneNumber > 10) {
            newError.phoneNumber = "Số điện thoại không hợp lệ!";
            isValid = false
        }
        if (!payload.address) {
            newError.address = "Vui lòng nhập địa chỉ!";
            isValid = false
        }
        if (!payload.payment) {
            newError.payment = "Vui lòng chọn phương thức thanh toán!"
            isValid = false;
        }
        setErrors(newError)
        return isValid
    }
    return (
        <div style={{ margin: "0 100px" }}>
            <div className="row mx-0">
                <div className="col-7 p-5">
                    <UserInfor payload={payload}
                        setPayload={setPayload}
                        errors={errors}
                    />
                </div>
                <div className="col-5 pt-5" style={{ borderLeft: "1px solid gray", height: "100vh", paddingLeft: "50px", paddingRight: "50px" }}>
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
                                            <div>{formatCurrency(item?.product?.price)}</div>
                                            <button className="bg-transparent border-0" style={{ fontSize: "25px" }}
                                            >-</button>
                                            <label className="w-25 bg-light text-center">{item.quantity}</label>
                                            <button className="bg-transparent border-0" style={{ fontSize: "25px" }}>+</button>
                                        </div>
                                    </div>
                                    <button type="button" className='border-0' style={{ backgroundColor: "transparent" }}

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
                        <input className="form-control w-50 d-inline" />
                        <button className="ms-3 btn btn-primary mb-2">Sử dụng</button>
                    </div>
                    <hr />
                    <div>
                        <div className="d-flex justify-content-between">
                            <label>Tạm tính</label>
                            <span className="bg-light">{calculateTotalPrice()}đ</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Phí vận chuyển</label>
                            <span className="bg-light">đ</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Giảm giá</label>
                            <span>111đ</span>
                        </div>


                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <label>Tổng tiền: </label>
                        <span>{calculateTotalPrice()}</span>
                    </div>
                    <button className="btn btn-primary mt-4 w-100">Hoàn tất đơn hàng</button>
                </div>
            </div>
        </div>
    )
}
export default OrderPage