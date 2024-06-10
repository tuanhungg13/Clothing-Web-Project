import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo-white.png';
const Nav = () => {
    return (
        <>
            <div className="container-nav d-lg-flex d-none justify-content-center">
                <div className="topnav">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/san-pham">Sản phẩm</NavLink>
                    <NavLink to="/sale">Sale</NavLink>
                    <NavLink to="/huong-dan-mua-hang">Hướng dẫn</NavLink>
                    <NavLink to="/thong-bao">Thông báo</NavLink>
                </div>
            </div>
            <div className="btn-toggler d-lg-none d-block">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={logo} alt='' /></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body pt-0">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink to="/">Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/san-pham">Sản phẩm</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/sale">Sale</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/huong-dan-mua-hang">Hướng dẫn</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/thong-bap">Thông báo</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav