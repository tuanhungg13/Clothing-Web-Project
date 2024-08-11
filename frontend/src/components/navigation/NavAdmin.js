import React from "react";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdMenu } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoBagAddOutline } from "react-icons/io5";
import logo from "../../assets/img/logoStore.jpg"
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
            path: "/admin/tao-san-pham",
            name: "Tạo sản phẩm",
            icon: <IoBagAddOutline />
        },
        {
            id: "3",
            path: "/admin/quan-li-san-pham",
            name: "Quản lí sản phẩm",
            icon: <MdOutlineProductionQuantityLimits />
        },
        {
            id: "4",
            path: "/admin/quan-li-don-hang",
            name: "Quản lí đơn hàng",
            icon: <CiViewList />
        },
        {
            id: "5",
            path: "/admin/quan-li-nguoi-dung",
            name: "Quản lí người dùng",
            icon: <FaUsers />
        },
        {
            id: "6",
            path: "/admin/thong-bao",
            name: "Thông báo",
            icon: <FaRegBell />
        },
    ]
    return (
        <>
            <div className="container-nav d-none d-sm-block bg-transparent">
                <div className="d-flex justify-content-center mb-3">
                    <img src={logo} alt="lg" className="w-50" />

                </div>
                <div className="topnav d-sm-flex flex-column text-none " >
                    {dataNav.map(item => {
                        return (
                            <NavLink to={item.path} className="w-100 text-start border-top" key={`navADM-${item.id}`}>
                                <span className="me-2">{item.icon}</span> {item.name}
                            </NavLink>
                        )
                    })}

                </div>
            </div>
            <div className="btn-toggler d-sm-none d-block ">
                <div class="container-fluid m-auto">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="true" aria-label="Toggle navigation">
                        <MdMenu />
                    </button>
                    <img src={logo} alt="lg" className="mb-1 ms-2" style={{ width: "50px" }} />
                    <div class="container-nav navbar-collapse collapse show" id="navbarsExample01">
                        <div className="topnav d-flex flex-column text-none " >
                            {dataNav.map(item => {
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