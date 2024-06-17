import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './Register.scss';
const Register = () => {
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    return (
        <div className='register-page container'>
            <div className='form-register m-auto'>
                <h2 className='text-center mt-4'>Đăng ký</h2>
                <form className='d-flex flex-column justify-content-center align-items-center gap-4'>
                    <input type='text' value={email} placeholder='Nhập email'
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                    <input type='text' value={phoneNumber} placeholder='Nhập số điện thoại'
                        onChange={(event) => { setPhoneNumber(event.target.value) }} />
                    <input type='text' value={name} placeholder='Nhập họ tên'
                        onChange={(event) => { setName(event.target.value) }} />
                    <input type='password' value={password}
                        placeholder='Nhập password' onChange={(event) => { setPassword(event.target.value) }}
                    />

                    <button className=''>Đăng ký</button>
                    <label>Bạn đã có tài khoản? <NavLink to='/login' className='text-decoration-none' >Đăng nhập</NavLink></label>
                </form>
            </div>
        </div>
    )
}

export default Register;