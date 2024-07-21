import React, { useEffect, useState } from "react";
import { Dropdown, Space } from 'antd';

import { FaStar } from "react-icons/fa";
import { renderStarFromNumber } from "../../untils/helpers";
const Ratings = (props) => {
    const [ratings, setRatings] = useState([]);
    const [totalRatings, setTotalRatings] = useState("")
    useEffect(() => {
        if (props.ratings) {
            setRatings([...props.ratings]);
            setTotalRatings(props.totalRatings)
        }
    }, [props.ratings])
    return (
        <div>
            <h2>Đánh giá sản phẩm</h2>
            <div className="d-flex row border border-secondery justify-content-center">
                <h3 className="mx-5 col-3">{totalRatings ? totalRatings : ""}/5</h3>
                <div className="d-flex justify-content-between align-items-center col-6">
                    <div className="border border-dark text-center" style={{ width: "80px" }}>Tất cả</div>
                    <div className="border border-dark text-center" style={{ width: "80px" }}>5<FaStar className="mb-1" /></div>
                    <div className="border border-dark text-center" style={{ width: "80px" }}>4<FaStar className="mb-1" /></div>
                    <div className="border border-dark text-center" style={{ width: "80px" }}>3<FaStar className="mb-1" /></div>
                    <div className="border border-dark text-center" style={{ width: "80px" }}> 2<FaStar className="mb-1" /></div>
                    <div className="border border-dark text-center" style={{ width: "80px" }}>1<FaStar className="mb-1" /></div>
                </div>
            </div>


            <div>
                {ratings?.map(item => {
                    return (
                        <div className=" mt-3" key={`rating-${item._id}`}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex row">
                                    <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                                        style={{ width: "80px", height: "60px" }} />
                                    <div className="col-10">
                                        <div>
                                            <label>{item.postedBy.userName}</label>
                                            <div>{renderStarFromNumber(item.star)}</div>
                                            <label>{item.createdAt} | </label>
                                            <span> Phân loại hàng: đen, L</span>
                                        </div>
                                        <div className="mt-3">
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="dropdown text-end ">
                                    <button type="button" className="d-block link-body-emphasis text-decoration-none  border-0 "
                                        data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "transparent" }}>
                                        ...
                                    </button>
                                    <ul className="dropdown-menu text-small" >
                                        <li type="button" className="dropdown-item">Báo cáo</li>
                                    </ul>
                                </div>
                            </div>
                            <hr />

                        </div>
                    )
                })}


            </div>
        </div>

    )
}

export default Ratings