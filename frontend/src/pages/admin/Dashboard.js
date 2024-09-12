import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdMenu } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoBagAddOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
const Dashboard = () => {
    const dataNav = [
        {
            id: "1",
            path: "/admin/home",
            name: "Trang chủ",
            icon: <AiOutlineDashboard />
        },
        {
            id: "2",
            path: "/admin/create-product",
            name: "Tạo sản phẩm",
            icon: <IoBagAddOutline />
        },
        {
            id: "3",
            path: "/admin/product-list",
            name: "Quản lí sản phẩm",
            icon: <MdOutlineProductionQuantityLimits />
        },
        {
            id: "4",
            path: "/admin/order-list",
            name: "Quản lí đơn hàng",
            icon: <CiViewList />
        },
        {
            id: "5",
            path: "/admin/user-list",
            name: "Quản lí người dùng",
            icon: <FaUsers />
        },
        {
            id: "6",
            path: "/admin/notification",
            name: "Tạo bài viết",
            icon: <TfiWrite />
        },
        {
            id: "7",
            path: "/admin/blog-list",
            name: "Quản lí bài viết",
            icon: <FaRegBell />

        }
    ]
    return (
        <div className="container">
            <div className="row mx-0">
                {dataNav && dataNav.length > 0 && dataNav.map((item, index) => {
                    return (
                        <NavLink key={`nav-dashb-${index}`} to={item.path} className="text-decoration-none text-dark  col-sm-3 col-12 text-center d-flex mx-sm-4 flex-column justify-content-center mb-3"
                            style={{ height: "180px", fontSize: "20px", borderRadius: "30px", backgroundColor: "rgb(109 175 242)" }}>
                            <span>
                                {item.icon} {item.name}
                            </span>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard