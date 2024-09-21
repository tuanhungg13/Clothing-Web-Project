import React, { useRef, useState, useEffect, memo } from "react";
import { formatCurrency, renderStarFromNumber } from "../../untils/helpers";

const ModalViewRatingOrder = ({ showModalRating, dataViewRating, onClose }) => {
    const modalRef = useRef(null);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        if (showModalRating) {
            setOrder(dataViewRating);
            modalRef.current.focus();
        }
    }, [showModalRating]);
    const handleOnKeyDown = (event) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };
    const getImgOfProduct = (item) => {
        const img = item?.productInfo?.options.find(option => option.color === item.orderDetails.color).images[0];
        return img
    }


    const handleCloseModal = () => {
        onClose();
        setOrder({}); // Xóa trạng thái order khi đóng modal
    };


    return (
        <div className={`modal fade ${showModalRating ? 'show' : ''}`} tabIndex="-1" style={{ display: showModalRating ? 'block' : 'none' }}
            ref={modalRef} onClick={handleCloseModal} onKeyDown={handleOnKeyDown}>
            <div className="modal-dialog" style={{ margin: "0 auto", maxWidth: "60vw" }} >
                <div className="modal-content " onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Đánh giá sản phẩm
                        </h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <label>Thông tin sản phẩm: </label>
                        {order && order.length > 0 && order.map((item, index) => {
                            return (
                                <div key={`prodRating-${index}`}>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <img type='button' src={getImgOfProduct(item)} alt={item.productInfo.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                            <div className="ms-2">
                                                <label >{item.productInfo.title} - {item.orderDetails.size} - {item.orderDetails.color}</label>
                                                <div>{formatCurrency(item.orderDetails.price)} x {item.orderDetails.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-3 d-flex mt-2">
                                        <div>
                                            {renderStarFromNumber(item.ratings.star)}
                                        </div>
                                        {item.ratings.star === 1 && <div className="ms-5 text-warning" >Rất tệ</div>}
                                        {item.ratings.star === 2 && <div className="ms-5 text-warning" >Tệ</div>}
                                        {item.ratings.star === 3 && <div className="ms-5 text-warning" >Bình thường</div>}
                                        {item.ratings.star === 4 && <div className="ms-5 text-warning" >Tốt</div>}
                                        {item.ratings.star === 5 && <div className="ms-5 text-warning" >Tuyệt vời</div>}
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}

                        <div>Nhận xét:</div>
                        <textarea value={order[0]?.ratings?.comment} className="w-100" style={{ height: "150px" }} disabled />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default memo(ModalViewRatingOrder)
