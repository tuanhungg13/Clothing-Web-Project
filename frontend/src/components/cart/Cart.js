import React, { useEffect, useRef, useState } from "react";
import { Menu } from 'antd';
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../untils/helpers";
import { useNavigate } from "react-router-dom";
const CartMenu = (props) => {
    const cartItems = useSelector(state => state?.user?.current?.cart || []);
    // useEffect(() => {
    //     console.log(" check cartItems:", cartItems)
    // })
    const navigation = useNavigate()
    const getImgOfProduct = (item) => {
        if (item) {
            const img = item.product.options.find(option => option.color === item.color).images[0];
            return img
        }
        return ""
    }
    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
        return formatCurrency(total)
    }
    const items = [
        {
            key: 'cart-item-notification',
            label: (
                <div>
                    <h3>GIỎ HÀNG</h3>
                    <label>Bạn đang có {cartItems?.length} sản phẩm trong giỏ hàng</label>
                    <hr />
                </div>
            ),
            // disabled: true, // Để ngăn chặn người dùng chọn mục này nếu cần
        },
        ...cartItems.map((item) => ({
            key: `cart-${item._id}`,
            label: (
                <div className='d-flex justify-content-between' style={{ width: '500px' }}
                    onClick={() => {
                        navigation(`/${item.product.slug}`)
                    }}>
                    <div className='d-flex align-items-center'>
                        <img src={getImgOfProduct(item)} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                        <div className="ms-2">
                            <label>{item.product.title} - {item.size} - {item.color}</label>
                            <div>{formatCurrency(item.product.price)} x {item.quantity}</div>
                        </div>
                    </div>
                    <button type="button" className='border-0' style={{ backgroundColor: "transparent" }}
                        onClick={() => { alert('oke') }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "lightgray"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                        <TiDeleteOutline style={{ fontSize: "25px" }} />
                    </button>
                </div>
            ),
        })),
        {
            key: 'menu-hr',
            type: 'divider',
        },
        {
            key: 'checkout',
            label: (
                <div className="d-flex justify-content-between">
                    <label style={{ fontSize: "18px" }}>TỔNG TIỀN TẠM TÍNH:</label>
                    <div>{calculateTotalPrice()}</div>
                </div>
            ),
            link: '/checkout', // Sử dụng link thay vì NavLink nếu cần
        },
    ];
    return (
        <Menu
            items={items}
        />
    )
}

export default CartMenu