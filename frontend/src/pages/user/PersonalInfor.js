import React, { useEffect, useState } from "react";
import { useParams, Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toBase64 } from "../../untils/helpers";
import { IoBagCheckOutline } from "react-icons/io5";
import { apiUpdateByUser } from "../../service/userApiService";
import InputField from "../../components/input/InputField"
import { toast } from "react-toastify";
const PersonalInfor = () => {
    const { isLoggedIn, current } = useSelector(state => state?.user);
    const [previewAvatar, setPreviewAvatar] = useState("")
    const [payload, setPayload] = useState({
        userName: "",
        email: "",
        address: "",
        phoneNumber: ""
    });
    const uid = useParams();
    const [errors, setErrors] = useState({})
    useEffect(() => {
        setPayload(current)
    }, [current])
    const handleChooseImg = async (e) => {
        const file = e.target.files[0]; // Lấy file từ input
        if (file) {
            const avatarFile = await toBase64(file); // Chuyển file sang base64
            setPayload(prev => ({ ...prev, avatar: file }))
            setPreviewAvatar(avatarFile)
        }
    }
    if (!isLoggedIn || uid.uid !== current._id) return (<Navigate to={"/"} />)

    const validate = () => {
        const newError = {}
        let isValid = true;
        if (!payload.userName) {
            newError.userName = "Vui lòng nhập họ và tên";
            isValid = false;
        }
        if (!payload.address) {
            newError.address = "Vui lòng nhập địa chỉ!"
            isValid = false
        }
        if (!payload.phoneNumber) {
            newError.phoneNumber = "Vui lòng nhập số điện thoại!"
            isValid = false
        }
        if (!payload.email) {
            newError.email = "Vui lòng nhập email!"
            isValid = false
        }
        setErrors(newError)
        return isValid
    }
    const handleUpdateByUser = async () => {
        const checkValid = validate();
        const formData = new FormData()
        for (let [key, value] of Object.entries(payload)) {
            if (key === "cart") continue
            else if (key === "favoriteList") continue
            formData.append(key, value);
        }
        if (checkValid) {
            const response = await apiUpdateByUser(uid, formData)
            if (response.EC === 0) {
                toast.success("Cập nhật thông tin cá nhân thành công!")
            }
        }
    }


    return (
        <div className="d-flex flex-column justify-content-center" style={{ minHeight: '50vh', margin: "0 20vw" }}>
            <h3 className="text-center mt-5">Thông tin tài khoản</h3>
            <hr />
            <div>
                <div>
                    <input type="file" className="d-none" id="avatar" onChange={(e) => { handleChooseImg(e) }} />
                    <div className="d-flex justify-content-center">
                        <label htmlFor="avatar" className="text-center" style={{ width: "80px", height: "80px" }}>
                            <img src={previewAvatar || payload?.avatar} alt="Avatar" className="rounded-circle" style={{ maxWidth: "100%" }} />
                        </label>
                    </div>
                </div>
                <div className="row mx-0 text-center mt-3">
                    <div className="col-6">Họ và tên</div>
                    <div className="col-6">
                        <InputField nameKey="userName"
                            value={payload?.userName}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>

                </div>
                <div className="row mx-0 text-center mt-2">
                    <div className="col-6">Email</div>
                    <div className="col-6">
                        <InputField nameKey="email"
                            value={payload?.email}
                            setValue={setPayload}
                            errors={errors}

                        />
                    </div>
                </div>
                <div className="row mx-0 text-center mt-2">
                    <div className="col-6">Số điện thoại</div>
                    <div className="col-6">
                        <InputField nameKey="phoneNumber"
                            value={payload?.phoneNumber}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="row mx-0 text-center mt-2">
                    <div className="col-6">Địa chỉ</div>
                    <div className="col-6">
                        <InputField nameKey="address"
                            value={payload?.address}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className="mt-3 row mx-0">
                    <button className="btn btn-primary w-50 m-auto"
                        onClick={() => { handleUpdateByUser() }}> Lưu thay đổi</button>
                </div>

            </div>
            <hr />
            <div className="text-center">
                <div className="row mx-0">
                    <NavLink className="text-decoration-none">
                        <IoBagCheckOutline className="mb-2 me-2" style={{ fontSize: "25px" }} />
                        Sản phẩm yêu thích
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfor