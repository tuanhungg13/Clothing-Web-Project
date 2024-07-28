import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { apiRegister } from '../../../service/userApiService';
const Register = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        phoneNumber: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const navigation = useNavigate()
    const validDate = () => {
        let isValid = true;
        const newErrors = {};
        if (!email) {
            newErrors.email = "Bạn chưa nhập email!";
            isValid = false;
        }
        if (!phoneNumber) {
            newErrors.phoneNumber = "Bạn chưa nhập số điện thoại!";
            isValid = false;
        }
        if (!name) {
            newErrors.name = "Bạn chưa nhập họ và tên!";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Bạn chưa nhập mật khẩu!";
            isValid = false;
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Bạn chưa xác nhận lại mật khẩu!";
            isValid = false;
        }
        else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp!";
            isValid = false
        }
        setErrors(newErrors);
        return isValid
    }
    const setEmpty = () => {
        setEmail("");
        setPhoneNumber("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    }
    const handleRegister = async () => {
        const checkValidate = validDate();
        if (checkValidate) {
            const response = await apiRegister(email, phoneNumber, name, password)
            console.log("check register", response)
            if (response.EC === 1) {
                navigation("/login")
            }
            else {
                setErrors(response.errors)
            }

        }
        return
    }
    return (
        <div className='register-page container'>
            <div className='form-register '>
                <h2 className='text-center mt-4'>Đăng ký</h2>
                <div className='content-right col-lg-5 col-12 d-flex flex-column gap-2 p-3 m-auto'
                    style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                        border: "1px solid gray"
                    }}>
                    <div className='form-group'>
                        <input className={`form-control ${errors.email ? " is-invalid" : ""}`} type='text' placeholder='Email'
                            value={email} onChange={(event) => setEmail(event.target.value)}
                        />
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>

                    <div className='form-group'>
                        <input className={`form-control ${errors.phoneNumber ? " is-invalid" : ""}`} type='text' placeholder='Số điện thoại'
                            value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                        {errors.phoneNumber && <div className='invalid-feedback'>{errors.phoneNumber}</div>}
                    </div>

                    <div className='form-group'>
                        <input className={`form-control ${errors.name ? " is-invalid" : ""}`} type='text' placeholder='Họ tên'
                            value={name} onChange={(event) => setName(event.target.value)} />
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>

                    <div className='form-group'>
                        <input className={`form-control ${errors.password ? " is-invalid" : ""}`} type='password' placeholder='Mật khẩu'
                            value={password} onChange={(event) => setPassword(event.target.value)} />
                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                    </div>

                    <div className='form-group'>
                        <input className={`form-control ${errors.confirmPassword ? " is-invalid" : ""}`} type='password' placeholder='Xác nhận mật khẩu'
                            value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                        // onKeyDown={(event) => { handleEnterPress(event) }}
                        />
                        {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
                    </div>
                    <button className='btn btn-primary mt-2'
                        onClick={() => handleRegister()}
                    >Register</button>

                    <div className='text-center'>
                        <hr className='mx-5' />
                        <span>Bạn đã có tài khoản? <NavLink to='/login' className='text-decoration-none' >Đăng nhập</NavLink></span>                        </div>

                </div>
            </div>
        </div>
    )
}

export default Register;