import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import logo from "../assets/img/logo.png"
const Footer = () => {
    return (
        <div style={{ marginTop: "180px" }}>
            <hr />
            <div className="container footer">
                <div className="row ">
                    <div className="col-sm-4 col-12 ">
                        <label className="mb-2">GỌI MUA HÀNG (8:30- 22:00)</label>
                        <h3> <FaPhoneAlt style={{ fontSize: "30px", color: "red" }} /> 0123456789</h3>
                        <small className="fst-italic">Tất cả các ngày trong tuần</small>
                    </div>
                    <div className="col-sm-4 col-12 ">
                        <label className="mb-2">GÓP Ý KHIẾU NẠI (8:30- 17:00)</label>
                        <h3> <FaPhoneAlt style={{ fontSize: "30px", color: "red" }} /> 0123456789</h3>
                        <small className="fst-italic">Tất cả các ngày trong tuần (trừ ngày lễ)</small>
                    </div>
                    <div className="col-sm-4 col-12 ">
                        <label className="mb-2">THEO DÕI CHÚNG TÔI </label>
                        <h3><FaFacebookSquare style={{ fontSize: "40px" }} />
                            <FaInstagramSquare style={{ fontSize: "40px" }} />
                            <SiShopee className="mb-2" style={{ fontSize: "40px" }} />
                        </h3>

                    </div>
                </div>

            </div>
            <div className="mt-3 bg-light pt-2 pb-5 ps-sm-5 ps-3">
                <div className="mt-2"><img src={logo} alt="atino" style={{ width: "150px" }} /></div>
                <div>
                    <label className="fw-bold mt-2">Địa chỉ</label>
                    <span>: Số 110 Phố Nhổn, Phường Tây Tựu, Quận Bắc Từ Liêm, Tp. Hà Nội</span>
                    <div className="mt-1">
                        <label className="fw-bold">Mã số doanh nghiệp</label>
                        <span>: ABCXYZ</span>
                    </div>
                    <div className="mt-1" >
                        <label className="fw-bold">Email</label>
                        <span>: abc@gmail.com</span></div>
                </div>
            </div>
        </div>
    )
}

export default Footer