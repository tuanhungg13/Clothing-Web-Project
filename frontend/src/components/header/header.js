import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logoStore.jpg'
import './Header.scss'
import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Nav from '../navigation/Nav';
import avatar from "../../assets/img/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from '../../redux/userSlice';
import CartMenu from '../cart/Cart';
import { apiLogout } from '../../service/userApiService';
import { logout } from "../../redux/userSlice";
import Cookies from 'js-cookie'
import { getCartFromCookies } from '../../redux/cartSlice';

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
    }, [dispatch, isLoggedIn])

    // const handleGetProfile = () =>{
    //     if (isLoggedIn) {
    //         dispatch(getCurrent())
    //     }
    // }


    const handleLogout = async () => {
        const response = await apiLogout()
        if (response.EC === 0) {
            dispatch(logout())
        }
    }
    return (
        <>
            <div className='header-desktop container d-lg-flex d-none justify-content-evenly align-items-center' >
                <img src={logo} alt='' />
                <div className='searchTop d-flex justify-content-between'>
                    <input type='text' placeholder='Bạn cần tìm gì?' />
                    <button><IoSearch className='icons' /></button>
                </div>

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
                            <img src={avatar} alt="mdo" className="rounded-circle border" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><NavLink className="dropdown-item bg-transparent text-dark" to={"/profile"}>Thông tin tài khoản</NavLink></li>
                            {current?.role === "admin" ? <li>
                                <NavLink className="dropdown-item bg-transparent text-dark" to={"/admin/thong-ke"}> Quản lý cửa hàng</NavLink>

                            </li>
                                :
                                <>
                                    <li><NavLink className="dropdown-item bg-transparent text-dark " to={""} >Thông tin đơn hàng</NavLink></li>
                                    <li><NavLink className="dropdown-item bg-transparent text-dark" >Lịch sử mua hàng</NavLink></li>
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
                        <NavLink className="navbar-brand me-0" to='/'><img src={logo} alt='' /></NavLink>

                        <CartMenu />
                        {!isLoggedIn &&
                            <button className='btn-login border-0 me-3'>Login</button>
                        }
                        {isLoggedIn &&
                            <div className="account dropdown text-end me-3">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end text-small">
                                    <li><a className="dropdown-item" href="#">Thông tin tài khoản</a></li>
                                    <li><a className="dropdown-item" href="#">Thông tin đơn hàng</a></li>
                                    <li><a className="dropdown-item" href="#">Lịch sử mua hàng</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                                </ul>
                            </div>
                        }

                    </div>
                </nav>
                <input className='col-11 d-flex justify-content-center rounded-2 border-1 ' placeholder='Tìm kiếm...' />
            </div>
        </>
    )
}

export default Header;


