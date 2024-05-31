import React from "react";
import './Announcement.css';
import doiTra from '../../assets/img/chinh-sach-doi-tra.jpeg';

const Announcement = () => {
    return (
        <div className="announcement-page">
            <div className="container">
                <div className="container-announcement d-flex justify-content-evenly flex-wrap">
                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>
                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>

                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>

                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>

                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>

                    <div className="content-announcement">
                        <div className="border-img"><img src={doiTra} /></div>
                        <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                        <div className="description-announcement">QUY ĐỊNH ĐỔI HÀNG</div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Announcement;