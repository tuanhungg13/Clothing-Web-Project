import React, { useState } from "react"
import InputField from "./input/InputField";
import logo from "../assets/img/logoStore.jpg";
import { Radio } from 'antd';
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
const UserInfor = ({ payload, setPayload, errors }) => {
    return (
        <div className="d-flex flex-column container mt-3">
            <img src={logo} className="w-25" alt="logo" />
            <label className="mt-3">Thông tin giao hàng</label>
            <form>
                <div className="form-group mt-4">
                    <label>Họ và tên</label>
                    <InputField
                        nameKey={"userName"}
                        placeholder="Họ và tên"
                        value={payload.userName}
                        setValue={setPayload}
                        errors={errors}
                    />
                </div>
                <div className="row">
                    <div className="form-group mt-3 col-sm-7 col-12">
                        <label>Email</label>
                        <InputField
                            nameKey={"email"}
                            value={payload.email}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                    <div className="form-group mt-3 col-sm-5 col-12">
                        <label>Số điện thoại</label>
                        <InputField
                            nameKey={"phoneNumber"}
                            placeholder="Số điện thoại"
                            value={payload.phoneNumber}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <label>Địa chỉ</label>
                    <InputField
                        nameKey={"address"}
                        placeholder="Địa chỉ"
                        value={payload.address}
                        setValue={setPayload}
                        errors={errors}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Ghi chú</label>
                    <textarea
                        className={`w-100 ps-2`}
                        style={{ height: "100px" }}
                        placeholder="Ghi chú"
                        value={payload.note}
                        onChange={(e) => { setPayload({ ...payload, note: e.target.value }) }}
                    />
                </div>
                <div className="form-group mt-3 d-flex flex-column">
                    <label className="mb-2">Phương thức thanh toán</label>
                    <div className="border bg-light d-flex align-items-center" style={{ height: "50px" }}>
                        <Radio.Group onChange={(e) => { setPayload({ ...payload, payment: e.target.value }) }} value={payload.payment}>
                            <Radio value={"Thanh toán bằng tiền mặt"}>Thanh toán bằng tiền mặt</Radio>
                        </Radio.Group>
                    </div>

                    {errors && errors.payment && <small className="text-danger">{errors.payment}</small>}
                </div>
            </form>
            <button className="btn text-start ps-0 mt-3">
                <NavLink className={"text-decoration-none"} to={"/cart-details"}>
                    <IoIosArrowBack /> Giỏ hàng
                </NavLink>

            </button>
        </div>
    )
}

export default UserInfor