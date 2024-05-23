import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo-white.png'
import './header.css'
import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Nav from '../navigation/nav';
const Header = () => {
    return (
        <div>
            <div className='container'>

                <div className='header-desktop d-lg-flex d-none justify-content-evenly align-items-center' >
                    <img src={logo} alt='' />
                    <div className='searchTop d-flex justify-content-between'>
                        <input type='text' placeholder='Bạn cần tìm gì?' />
                        <button><IoSearch className='icons' /></button>
                    </div>

                    <div className='hotline'><FaPhone style={{ marginRight: '5px' }} />  Hotline: 0123456789</div>
                    <div className='login d-flex'>
                        <button>Đăng Nhập |</button>
                        <button style={{ marginLeft: '-5px' }}>Đăng kí</button>
                    </div>

                    <button><FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px' }} /> Giỏ hàng</button>

                </div>
            </div>

            <div className='header-mobile d-block d-lg-none'>
                <nav className="navbar">
                    <div className="container-fluid">
                        <Nav />
                        <NavLink className="navbar-brand me-0" to='/'><img src={logo} alt='' /></NavLink>
                        <div>
                            <button><FaShoppingCart style={{ fontSize: '25px', paddingBottom: '5px' }} /></button>
                            <button className='btn-login'>Login</button>
                        </div>


                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header;


