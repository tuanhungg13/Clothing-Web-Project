import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo-white.png'
import './Header.scss'
import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Nav from '../navigation/Nav';
import avatar from "../../assets/img/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from '../../redux/userSlice';
import { Dropdown, Space } from 'antd';
import Cookies from 'js-cookie';
import CartMenu from '../cart/Cart';
import { apiLogout } from '../../service/userApiService';
import { logout } from "../../redux/userSlice";
const Header = () => {
    const { isLoading, current } = useSelector(state => state.user.current);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getCurrent())
        }
        console.log("check isLoggin:", isLoggedIn)
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
            Cookies.set("isLoggedIn", false)
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
                            <li><a className="dropdown-item" href="#">Thông tin tài khoản</a></li>
                            <li><a className="dropdown-item" href="#">Thông tin đơn hàng</a></li>
                            <li><a className="dropdown-item" href="#">Lịch sử mua hàng</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className='border-0' type='button'
                                onClick={() => { handleLogout() }}>Đăng xuất</button></li>
                        </ul>
                    </div>
                }

                <Dropdown overlay={<CartMenu trigger={['click']} />}>
                    <Space>
                        <button><FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px', marginRight: "10px" }} /><label>{current ? current.cart.length : 0}</label> Giỏ hàng</button>
                    </Space>
                </Dropdown>
            </div>


            <div className='header-mobile d-block d-lg-none'>
                <nav className="navbar">
                    <div className="container-fluid">
                        <Nav />
                        <NavLink className="navbar-brand me-0" to='/'><img src={logo} alt='' /></NavLink>

                        <button className='ms-5 border-0 rounded-circle p-2'><FaShoppingCart style={{ fontSize: '26px', paddingBottom: '10px', marginLeft: '-4px' }} /></button>
                        {!isLoggedIn &&
                            <button className='btn-login'>Login</button>
                        }
                        {isLoggedIn &&
                            <div className="account dropdown text-end">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
            </div>
        </>
    )
}

export default Header;


