import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { apiRegister } from '../../../service/userApiService';
import InputField from '../../../components/input/InputField';
const Register = () => {
    const [payload, setPayload] = useState({
        email: "",
        phoneNumber: "",
        userName: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        email: "",
        phoneNumber: "",
        userNname: "",
        password: "",
        confirmPassword: ""
    })
    const navigation = useNavigate()
    const validDate = () => {
        let isValid = true;
        const newErrors = {};
        if (!payload.email) {
            newErrors.email = "Vui lòng nhập email!";
            isValid = false;
        }
        if (!payload.phoneNumber) {
            newErrors.phoneNumber = "Vui lòng nhập số điện thoại!";
            isValid = false;
        }
        if (!payload.userName) {
            newErrors.userName = "Vui lòng nhập họ và tên!";
            isValid = false;
        }
        if (!payload.password) {
            newErrors.password = "Vui lòng nhập mật khẩu!";
            isValid = false;
        }
        if (!payload.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập xác nhận lại mật khẩu!";
            isValid = false;
        }
        else if (payload.password !== payload.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp!";
            isValid = false
        }
        setErrors(newErrors);
        return isValid
    }
    const handleRegister = async () => {
        const checkValidate = validDate();
        if (checkValidate) {
            const response = await apiRegister(payload)
            if (response.EC === 0) {
                setPayload({})
                navigation("/login")
            }
            else {
                setErrors(response.errors)
            }
        }
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
                    <InputField
                        nameKey={"email"}
                        value={payload.email}
                        setValue={setPayload}
                        errors={errors}
                    />

                    <InputField
                        nameKey={"phoneNumber"}
                        placeholder={"Số điện thoại"}
                        value={payload.phoneNumber}
                        setValue={setPayload}
                        errors={errors}
                    />

                    <InputField
                        nameKey={"userName"}
                        placeholder={"Họ và tên"}
                        value={payload.userName}
                        setValue={setPayload}
                        errors={errors}
                    />

                    <InputField
                        nameKey={"password"}
                        placeholder={"Mật khẩu"}
                        value={payload.password}
                        setValue={setPayload}
                        errors={errors}
                    />

                    <InputField
                        nameKey={"confirmPassword"}
                        placeholder={"Nhập lại mật khẩu"}
                        value={payload.confirmPassword}
                        setValue={setPayload}
                        errors={errors}
                    />
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