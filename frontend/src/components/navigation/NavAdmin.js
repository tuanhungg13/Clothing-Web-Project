import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdMenu } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoBagAddOutline } from "react-icons/io5";
import logo from "../../assets/img/logoStore.jpg";
import { TfiWrite } from "react-icons/tfi";
const NavAdmin = () => {
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
        <>
            <div className="container-nav d-none d-sm-block bg-transparent">
                <div className="d-flex justify-content-center mb-3">
                    <img src={logo} alt="lg" className="w-50" />

                </div>
                <div className="topnav d-sm-flex flex-column text-none " >
                    {dataNav && dataNav.length > 0 && dataNav.map(item => {
                        return (
                            <NavLink to={item.path} className="w-100 text-start border-top" key={`navADM-${item.id}`}
                                style={{ borderRight: 0 }} >
                                <span className="me-2">{item.icon}</span> {item.name}
                            </NavLink>
                        )
                    })}

                </div>
            </div>
            <div className="btn-toggler d-sm-none d-block ">
                <div className="container-fluid m-auto">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="true" aria-label="Toggle navigation">
                        <MdMenu />
                    </button>
                    <img src={logo} alt="lg" className="mb-1 ms-2" style={{ width: "50px" }} />
                    <div className="container-nav navbar-collapse collapse" id="navbarsExample01">
                        <div className="topnav d-flex flex-column text-none " >
                            {dataNav && dataNav.length > 0 && dataNav.map(item => {
                                return (
                                    <NavLink to={item.path} className="w-100 text-start border-top text-decoration-none text-dark" key={`navADM-${item.id}`}>
                                        <span className="me-2">{item.icon}</span> {item.name}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavAdmin