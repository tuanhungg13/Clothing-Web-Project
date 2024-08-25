import React, { useEffect, useState, useMemo } from "react";
import UserInfor from "../../components/UserInfor";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, formatCurrency } from "../../untils/helpers";
import { TiDeleteOutline } from "react-icons/ti";
import { apiCreateOrder } from "../../service/orderApiService";
import { hanldeDeleteCartItem } from "../../untils/helpers";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { getCurrent } from "../../redux/userSlice";
const OrderPage = () => {
    const cartItems = useSelector(state => state?.user?.current?.cart || []);
    const { current, isLoggedIn } = useSelector(state => state?.user);
    const cartFromCookies = useSelector(state => state?.cart?.cartFromCookies || []);
    const [displayCart, setDisplayCart] = useState([])
    const navigation = useNavigate();
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        note: "",
        payment: "",
        totalPrice: 0
    })
    const [errorQuantity, setErrorQuantity] = useState({})

    useEffect(() => {
        console.log("current")
        if (current && isLoggedIn) {
            setPayload({
                userName: current.userName,
                email: current.email,
                phoneNumber: current.phoneNumber,
                address: current.address,
                note: "",
                payment: "",
                totalPrice: 0
            })
        }

    }, [current, isLoggedIn])
    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        note: "",
        payment: ""
    })

    const memoizedDisplayCart = useMemo(() => {
        return isLoggedIn ? cartItems : Object.values(cartFromCookies);
    }, [cartItems, cartFromCookies, isLoggedIn]);
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
        const total = memoizedDisplayCart?.reduce((total, item) => total + item?.product?.price * item?.quantity, 0);
        return formatCurrency(total)
    }
    const totalPrice = useMemo(() => calculateTotalPrice(), [displayCart]);


    const handleRemoveCartItems = async (cartItem) => {
        hanldeDeleteCartItem(dispatch, isLoggedIn, cartItem, displayCart);
    }
    const handleChangeQuantityInCre = (item, index) => {
        const newError = {}
        const sizeOfColor = item.product?.options?.find(option => option.color === item.color)?.sizeQuantity;
        const quantityOfSize = sizeOfColor?.find(sizeQtt => sizeQtt.size === item.size).quantity;
        if (item.quantity > quantityOfSize) {
            setErrorQuantity(prev => ({ ...prev, [item._id]: "Không đủ số lượng!" }));
            return
        }
        else {
            setErrorQuantity(prev => ({ ...prev, [item._id]: "" }));
            setDisplayCart(prev => {
                const prevCopy = [...prev];
                prevCopy[index] = { ...prevCopy[index], quantity: item.quantity + 1 };
                return prevCopy
            })
            addToCart(dispatch, isLoggedIn, item.product, item.color, item.size, 1)
        }
    }

    const handleChangeQuantityReduce = (item, index) => {
        const newError = {}
        if (item.quantity < 1) {
            return
        }
        else {
            setDisplayCart(prev => {
                const prevCopy = [...prev];
                prevCopy[index] = { ...prevCopy[index], quantity: item.quantity - 1 };
                return prevCopy
            })
            setErrorQuantity(prev => ({ ...prev, [item._id]: "" }));
            addToCart(dispatch, isLoggedIn, item.product, item.color, item.size, -1)

        }
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
        } else if (payload.phoneNumber.length < 9 || payload.phoneNumber.length > 10) {
            newError.phoneNumber = "Số điện thoại không hợp lệ!";
            isValid = false
        }
        if (payload.address.length < 5) {
            newError.address = "Vui lòng nhập rõ địa chỉ!";
            isValid = false
        }
        if (!payload.payment) {
            newError.payment = "Vui lòng chọn phương thức thanh toán!"
            isValid = false;
        }
        setErrors(newError)
        console.log("check error", errors)
        return isValid
    }

    const handleConfirmOrder = async () => {
        const checkValid = validate();
        if (checkValid && Object.keys(errorQuantity).length === 0) {
            if (isLoggedIn && current) {
                const response = await apiCreateOrder({
                    products: displayCart,
                    note: payload.note,
                    orderBy: {
                        address: payload.address,
                        email: payload.email,
                        phoneNumber: payload.phoneNumber,
                        userName: payload.userName
                    }
                })
                if (response.EC === 0) {
                    toast.success("Bạn đã đặt hàng thành công!")
                    dispatch(getCurrent())
                }
            }
            else {
                const response = await apiCreateOrder({
                    displayCart, note: payload.note,
                    orderBy: {
                        address: payload.address,
                        email: payload.email,
                        phoneNumber: payload.phoneNumber,
                        userName: payload.userName
                    }
                })
                if (response.EC === 0) {
                    toast.success("Bạn đã đặt hàng thành công!")
                    Cookies.set("PRODUCT_CART_NEW", JSON.stringify({}), { expires: 30 });

                }
            }
        }
        else {
            toast.success("lỗi")
        }
    }
    return (
        <div style={{ margin: "0 100px" }}>
            <div className="row mx-0">
                <div className="col-7 p-5">
                    <UserInfor
                        payload={payload}
                        setPayload={setPayload}
                        errors={errors}
                    />
                </div>
                <div className="col-5 pt-5" style={{ borderLeft: "1px solid gray", height: "100vh", paddingLeft: "50px", paddingRight: "50px" }}>
                    {memoizedDisplayCart && memoizedDisplayCart.length > 0 && memoizedDisplayCart.map((item, index) => {
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
                                            <div>
                                                <button className="bg-transparent border-0" style={{ fontSize: "25px" }}
                                                    onClick={() => { handleChangeQuantityReduce(item, index) }}>-</button>
                                                <label className="w-25 bg-light text-center">{item.quantity}</label>
                                                <button className="bg-transparent border-0" style={{ fontSize: "25px" }}
                                                    onClick={() => { handleChangeQuantityInCre(item, index) }}>+</button>
                                            </div>
                                            {errorQuantity && errorQuantity[item._id] && <small className="text-danger">{errorQuantity[item._id]}</small>}
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
                        <input className="form-control w-50 d-inline" />
                        <button className="ms-3 btn btn-primary mb-2">Sử dụng</button>
                    </div>
                    <hr />
                    <div>
                        <div className="d-flex justify-content-between">
                            <label>Tạm tính</label>
                            <span className="bg-light">{totalPrice}đ</span>
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
                        <span>{totalPrice}</span>
                    </div>
                    <button className="btn btn-primary mt-4 w-100"
                        onClick={() => { handleConfirmOrder() }}>Hoàn tất đơn hàng</button>
                </div>
            </div>
        </div>
    )
}
export default OrderPage