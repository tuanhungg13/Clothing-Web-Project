import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
const Breadcrumbs = () => {
    const location = useLocation();
    return (
        <div className="mt-sm-3">
            <NavLink to={"/"} className={"text-decoration-none text-dark"} ><IoHomeOutline className="mb-1" /> Home / </NavLink>
            {location.pathname === "/products" && <NavLink to={"/products"} className={"text-decoration-none text-dark"} >Sản phẩm</NavLink>}
            {location.pathname === "/shirt" && <NavLink to={"/shirt"} className={"text-decoration-none text-dark"}>Áo</NavLink>}
            {location.pathname === "/pants" && <NavLink to={"/pants"} className={"text-decoration-none text-dark"}>Quần</NavLink>}
            {location.pathname === "/notification" && <NavLink to={"/notification"} className={"text-decoration-none text-dark"}>Thông báo</NavLink>}
            {location.pathname === "/order" && <NavLink to={"/order"} className={"text-decoration-none text-dark"}>Đặt hàng</NavLink>}
            {location.pathname === "/cart-details" && <NavLink to={"/cart-details"} className={"text-decoration-none text-dark"}>Giỏ hàng</NavLink>}
        </div>
    )
}

export default Breadcrumbs