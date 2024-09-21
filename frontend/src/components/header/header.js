import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logoStore.jpg'
import './Header.scss'
import { FaPhone } from "react-icons/fa6";
import Nav from '../navigation/Nav';
import avatar from "../../assets/img/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from '../../redux/userSlice';
import CartMenu from '../cart/Cart';
import { apiLogout } from '../../service/userApiService';
import { logout } from "../../redux/userSlice";
import Cookies from 'js-cookie'
import { getCartFromCookies } from '../../redux/cartSlice';
import Search from '../Search';
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
    const { isLoggedIn, current } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const cookiesCart = Cookies.get("PRODUCT_CART_NEW");
        if (cookiesCart) {
            dispatch(getCartFromCookies({ cart: JSON.parse(cookiesCart) }))
        }
        if (isLoggedIn === true) {
            dispatch(getCurrent())

        }
    }, [])

    const handleLogout = async () => {
        const response = await apiLogout()
        if (response && response.EC === 0) {
            dispatch(logout())
        }
    }
    return (
        <>
            <div className='header-desktop container d-lg-flex d-none justify-content-evenly align-items-center' >
                <img src={logo} alt='' />

                <Search />

                <div className='hotline'><FaPhone style={{ marginRight: '5px' }} />  Hotline: 0123456789</div>
                {!isLoggedIn &&
                    <div className='login d-flex'>
                        <button><NavLink to='/login' className='text-decoration-none text-dark'>Đăng Nhập |</NavLink></button>
                        <button style={{ marginLeft: '-5px' }}><NavLink to='/register' className='text-decoration-none text-dark'>Đăng kí</NavLink></button>
                    </div>
                }

                {isLoggedIn &&
                    <div className="account dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={current?.avatar || avatar} alt="mdo" className="rounded-circle border" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><NavLink className="dropdown-item bg-transparent text-dark" to={`/user/profile/${current?._id}`}>Thông tin tài khoản</NavLink></li>
                            {current?.role === "admin" ? <li>
                                <NavLink className="dropdown-item bg-transparent text-dark" to={"/admin/home"}> Quản lý cửa hàng</NavLink>

                            </li>
                                :
                                <>
                                    <li><NavLink className="dropdown-item bg-transparent text-dark" to={`/user/purchase-history`}>Lịch sử mua hàng</NavLink></li>
                                </>
                            }


                            <li><hr className="dropdown-divider" /></li>
                            <li><button className='dropdown-item border-0' type='button'
                                onClick={() => { handleLogout() }}>Đăng xuất</button></li>
                        </ul>
                    </div>
                }

                <CartMenu />
            </div>


            <div className='header-mobile d-block d-lg-none'>
                <nav className="navbar">
                    <div className="container-fluid p-1">
                        <Nav />
                        <NavLink className="navbar-brand me-0 mb-2" to='/'><img src={logo} alt='atino' /></NavLink>

                        <NavLink to={"/cart-details"}><FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px', marginRight: "10px" }} /></NavLink>
                        {!isLoggedIn &&
                            <NavLink className={"text-decoration-none text-dark p-2 bg-secondary"} to={"/login"}>Login</NavLink>
                        }
                        {isLoggedIn &&
                            <div className="account dropdown text-end me-3">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={current?.avatar || avatar} alt="mdo" className="rounded-circle" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end text-small">
                                    <li><NavLink className="dropdown-item bg-transparent text-dark" to={`/user/profile/${current?._id}`}>Thông tin tài khoản</NavLink></li>
                                    {current?.role === "admin" ? <li>
                                        <NavLink className="dropdown-item bg-transparent text-dark" to={"/admin/home"}> Quản lý cửa hàng</NavLink>

                                    </li>
                                        :
                                        <>
                                            <li><NavLink className="dropdown-item bg-transparent text-dark" to={`/user/purchase-history`}>Lịch sử mua hàng</NavLink></li>
                                        </>
                                    }


                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className='dropdown-item border-0' type='button'
                                        onClick={() => { handleLogout() }}>Đăng xuất</button></li>
                                </ul>
                            </div>
                        }

                    </div>
                </nav>
                <Search />
            </div>
        </>
    )
}

export default Header;


