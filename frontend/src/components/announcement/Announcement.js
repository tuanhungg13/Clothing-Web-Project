import React from "react";
import './Announcement.scss';
import doiTra from '../../assets/img/chinh-sach-doi-tra.jpeg';
import { IoMdArrowDropright } from "react-icons/io";
import { FaHome } from "react-icons/fa";

const Announcement = (props) => {
    const elements = ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5', 'Element 6'];

    const displayedElements = props.limit ? elements.slice(0, props.limit) : elements;

    return (
        <div className="announcement-page">
            <div className="container">
                {!props.limit &&
                    <div className='nav-title' style={{ marginTop: '10px', fontSize: '14px' }}>
                        <FaHome className='mb-1' /> Trang chủ <IoMdArrowDropright />Thông báo
                    </div>
                }
                <div className="container-announcement mt-4 d-flex justify-content-evenly flex-wrap">
                    {displayedElements.map((element, index) => (
                        <div key={index} className="content-announcement mb-5">
                            <div className="border-img mb-2 border border-secondary"><img src={doiTra} /></div>
                            <a href='/chinh-sach-doi-tra-hang'>Chính sách đổi trả</a>
                            <div className="description-announcement fst-italic mt-2" style={{ color: '#7a7979' }}>QUY ĐỊNH ĐỔI HÀNG</div>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    )
}

export default Announcement;