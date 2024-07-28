import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { apiLogin } from '../../../service/userApiService';
import { login } from '../../../redux/userSlice';
import { useDispatch } from "react-redux";

const Login = () => {
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        loginValue: "",
        password: "",
        errorServer: ""

    })
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const validDate = () => {
        let isValid = true;
        const newErrors = {};
        if (!loginValue) {
            newErrors.loginValue = "Bạn cần nhập email hoặc số điện thoại!";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Bạn chưa nhập mật khẩu!";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid
    }
    const handleLogin = async () => {
        const checkValidate = validDate();
        if (checkValidate) {
            const response = await apiLogin({ loginValue, password })
            if (response.EC === 0) {
                dispatch(login({ userData: response.DT, accessToken: response.accessToken }))
                navigation('/')
            }
            else {
                setErrors({ errorServer: response.EM })
            }
        }
        return
    }

    return (
        <div className='login-page container'>
            <div className='form-login '>
                <h2 className='text-center my-4'>Đăng nhập</h2>
                <div className='content-right col-lg-5 col-12 d-flex flex-column gap-2 p-3 m-auto'
                    style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                        border: "1px solid gray"
                    }}>
                    <div className='form-group mt-3'>
                        <input type='text' value={loginValue} placeholder='Nhập email hoặc số điện thoại'
                            className={`form-control ${errors.loginValue || errors.errorServer ? " is-invalid" : ""}`}
                            onChange={(event) => { setLoginValue(event.target.value) }}
                        />
                        {errors.loginValue && <div className='invalid-feedback'>{errors.loginValue}</div>}
                    </div>

                    <div className='form-group mt-3'>
                        <input type='password' value={password} placeholder='Nhập password'
                            className={`form-control ${errors.password || errors.errorServer ? " is-invalid" : ""}`}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        {errors.errorServer && <div className='invalid-feedback'>{errors.errorServer}</div>}
                    </div>

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