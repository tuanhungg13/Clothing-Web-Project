import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logoStore.jpg';
const Nav = () => {
    return (
        <>
            <div className="container-nav d-lg-flex d-none justify-content-center">
                <div className="topnav">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/products">Sản phẩm</NavLink>
                    <NavLink to="/shirt">Áo</NavLink>
                    <NavLink to="/pants">Quần</NavLink>
                    <NavLink to="/notification">Thông báo</NavLink>
                </div>
            </div>
            <div className="btn-toggler d-lg-none d-block ">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={logo} alt='' /></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body pt-0 container-nav">
                        <div className="topnav">
                            <NavLink to="/" className={"border-end-0"}>Trang chủ</NavLink>
                            <NavLink to="/products" className={"border-end-0"}>Sản phẩm</NavLink>
                            <NavLink to="/shirt" className={"border-end-0"}>Áo</NavLink>
                            <NavLink to="/pants" className={"border-end-0"}>Quần</NavLink>
                            <NavLink to="/notification" className={"border-end-0"}>Thông báo</NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav