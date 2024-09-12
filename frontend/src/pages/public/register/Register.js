import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { apiRegister } from '../../../service/userApiService';
import InputField from '../../../components/input/InputField';
import { Spin } from 'antd';
import { toast } from "react-toastify"
const Register = () => {
    const [loading, setLoading] = useState(false)
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
        confirmPassword: "",
        emailError: "",
        phoneNumberError: ""
    })
    const [errorServer, setErrorServer] = useState({
        email: "",
        phoneNumber: ""
    })
    const navigation = useNavigate()
    const validDate = () => {
        let isValid = true;
        const newErrors = {};
        if (!payload.email) {
            newErrors.email = "Vui lòng nhập email!";
            isValid = false;
        }
        else {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(payload.email)) {
                newErrors.email = "Email không hợp lệ";
                isValid = false;
            }
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
        setLoading(true)
        try {
            const checkValidate = validDate();
            if (checkValidate) {
                const response = await apiRegister(payload)
                console.log("check:", response)
                if (response && response.EC === 0) {
                    setLoading(false)
                    toast.success(response.EM)
                    setPayload({
                        email: "",
                        phoneNumber: "",
                        userName: "",
                        password: "",
                        confirmPassword: ""
                    })
                    navigation("/login")

                }
                else {
                    toast.error(response.EM)
                    setLoading(false)
                    setErrorServer(response.errors)
                }
            }
            else {
                setLoading(false)
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
            console.log(error)
            setLoading(false)
        }

    }
    return (
        <div className='register-page container'>
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div className='form-register '>
                    <h2 className='text-center mt-4'>Đăng ký</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister();
                    }}>
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
                            {errorServer && errorServer.email && <small className='text-danger'>{errorServer.email}</small>}

                            <InputField
                                nameKey={"phoneNumber"}
                                placeholder={"Số điện thoại"}
                                value={payload.phoneNumber}
                                setValue={setPayload}
                                errors={errors}
                            />
                            {errorServer && errorServer.phoneNumber && <small className='text-danger'>{errorServer.phoneNumber}</small>}


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
                            <button className='btn btn-primary mt-2' type='submit'
                            >Register</button>

                            <div className='text-center'>
                                <hr className='mx-5' />
                                <span>Bạn đã có tài khoản? <NavLink to='/login' className='text-decoration-none' >Đăng nhập</NavLink></span>
                            </div>
                        </div>
                    </form>
                </div>)}
        </div>
    )
}

export default Register;