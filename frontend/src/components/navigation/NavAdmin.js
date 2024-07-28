import React from "react";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logoStore.jpg";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdMenu } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";

const NavAdmin = () => {
    const dataNav = [
        {
            id: "1",
            path: "/admin/thong-ke",
            name: "Thống kê",
            icon: <AiOutlineDashboard />
        },
        {
            id: "2",
            path: "/admin/quan-li-san-pham",
            name: "Quản lí sản phẩm",
            icon: <MdOutlineProductionQuantityLimits />
        },
        {
            id: "3",
            path: "/admin/quan-li-don-hang",
            name: "Quản lí đơn hàng",
            icon: <CiViewList />
        },
        {
            id: "4",
            path: "/admin/quan-li-nguoi-dung",
            name: "Quản lí người dùng",
            icon: <FaUsers />
        },
        {
            id: "5",
            path: "/admin/thong-bao",
            name: "Thông báo",
            icon: <FaRegBell />
        },
    ]
    return (
        <>
            <div className="container-nav d-none d-sm-block bg-transparent">
                <div className="topnav d-sm-flex flex-column text-none " >
                    {dataNav.map(item => {
                        return (
                            <NavLink to={item.path} className="w-100 text-start border-top" key={`adminNav-${item.id}`}>
                                <span className="me-2">{item.icon}</span> {item.name}
                            </NavLink>
                        )
                    })}

                </div>
            </div>
            <div className="btn-toggler d-lg-none d-block ">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <MdMenu />
                </button>
                <div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={logo} alt='' /></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body pt-0">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {dataNav.map(item => {
                                return (
                                    <li className="nav-item">
                                        <NavLink to={item.path} className="w-100 text-start border-top" key={`adminNav-${item.id}`}>
                                            <span className="me-2">{item.icon}</span> {item.name}
                                        </NavLink>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavAdmin