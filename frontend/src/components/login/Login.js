import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './Login.scss'
const Login = () => {
    const [loginValue, setLoginValue] = useState();
    const [password, setPassword] = useState();
    return (
        <div className='login-page container'>
            <div className='form-login m-auto'>
                <h2 className='text-center mt-4'>Đăng nhập</h2>
                <form className='d-flex flex-column justify-content-center align-items-center gap-4'>
                    <input type='text' value={loginValue} placeholder='Nhập email hoặc só điện thoại'
                        onChange={(event) => { setLoginValue(event.target.value) }}
                    />
                    <input type='password' value={password}
                        placeholder='Nhập password' onChange={(event) => { setPassword(event.target.value) }}
                    />

                    <button className=''>Đăng nhập</button>
                    <label>Quên mật khẩu</label>
                    <label>Bạn chưa có tài khoản? <NavLink>Đăng ký</NavLink></label>
                </form>
            </div>
        </div>
    )
}

export default Login;