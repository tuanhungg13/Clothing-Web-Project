import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { apiLogin } from '../../../service/userApiService';
import { login } from '../../../redux/userSlice';
import { useDispatch } from "react-redux";
import InputField from '../../../components/input/InputField';

const Login = () => {
    const [password, setPassword] = useState("");
    const [payload, setPayload] = useState({
        loginValue: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        loginValue: "",
        password: "",
        errorServer: ""

    })
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const validDate = () => {
        const newErrors = {};
        let isValid = true;
        if (!payload.loginValue) {
            newErrors.loginValue = "Vui lòng nhập email/sđt!";
            isValid = false
        }
        if (!payload.password) {
            newErrors.password = "Vui lòng nhập password!";
            isValid = false
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleLogin = async () => {
        const checkValidate = validDate();
        if (checkValidate) {
            const response = await apiLogin(payload)
            if (response.EC === 0) {
                dispatch(login({ userData: response.DT, accessToken: response.accessToken }))
                navigation('/')
            }
            else {
                setErrors({ errorServer: response.EM })
            }
        }
    }

    return (
        <div className='login-page container'>
            <div className='form-login'>
                <h2 className='text-center my-4'>Đăng nhập</h2>
                <div className='content-right col-lg-5 col-12 d-flex flex-column gap-2 p-3 m-auto'
                    style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                        border: "1px solid gray"
                    }}>
                    <InputField
                        nameKey={"loginValue"}
                        placeholder={"Email/Số điện thoại"}
                        value={payload.loginValue}
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
                    <div className='text-center'>
                        <button className='mt-3 btn btn-primary w-75' type='button'
                            onClick={() => { handleLogin() }}>
                            Đăng nhập
                        </button>
                        <hr className='mx-5' />
                        <label>Quên mật khẩu</label>
                        <span className='d-block mt-3'>Bạn chưa có tài khoản?
                            <NavLink to='/register' className='text-decoration-none'>
                                Đăng ký</NavLink>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;