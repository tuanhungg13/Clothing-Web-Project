import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa"
import { DatePicker } from 'antd';
import { toast } from "react-toastify"
const ModalProductDetails = (props) => {
    const modalRef = useRef(null);
    const [isDisable, setIsDisable] = useState("");
    const [product, setProduct] = useState({})
    useEffect(() => {

        if (props.showModalProduct) {
            setProduct(props.dataProduct)
            modalRef.current.focus()
        } if (props.action === "view") setIsDisable(true)
        else setIsDisable(false)
    }, [props])
    const onOk = (value) => {
        console.log('onOk: ', value);
    };
    const handleInputChange = (field, value) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [field]: value
        }));
    };

    const handleConfirmEdit = () => {
        toast.success("oke")
    }

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmEdit();
            props.onClose();
        }
        else if (event.key === "Escape") props.onClose()

    }
    return (
        <div className={`modal fade ${props.showModalProduct ? 'show' : ''}`} tabIndex="-1" style={{ display: props.showModalProduct ? 'block' : 'none' }}
            ref={modalRef} onClick={props.onClose} onKeyDown={(event) => { handleOnKeyDown(event) }} >
            <div className="modal-dialog">
                <div className="modal-content" onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Thông tin sản phẩm
                            <span className="ms-5">
                                {props?.dataProduct?.totalRatings} /5
                                <FaStar style={{ marginBottom: "5px", color: '#ee4d2d' }} />
                            </span>
                        </h1>
                        <button type="button" className="btn-close" onClick={props.onClose} aria-label="Close"></button>
                    </div>


                    <div className="modal-body">
                        <div className='form-group mt-3 row'>
                            {props?.dataProduct?.options?.[0]?.images?.[0] ? (
                                <img src={props?.dataProduct?.options[0]?.images[0]} alt="anh-sp" className="col-6" />
                            ) : (
                                <div className="col-6">No image available</div>
                            )}
                            <div className="col-6">
                                <div>
                                    <label>Tên sản phẩm</label>
                                    <input type='text' value={product.title} className={`form-control `} disabled={isDisable}
                                        onChange={(e) => handleInputChange('title', e.target.value)} />
                                </div>
                                <div className="mt-2">
                                    <label>Giá gốc</label>
                                    <input type='text' value={product.price} className={`form-control `} disabled={isDisable}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label>Giá KM</label>
                                    <input type='text' value={product.price * (1 - (product.discount / 100))} className={`form-control `} disabled
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='form-group mt-3'>
                            <label>Chi tiết sản phẩm</label>
                            <div className="d-flex justify-content-between">
                                {product?.options?.map((item, index) => {
                                    return (
                                        <div className="mx-3 mt-2" key={`opt-${index}`}>
                                            <label className="fw-bold mb-2">Màu sắc : {item.color}</label>
                                            {item.sizeQuantity.map((sizeItem, sizeIndex) => {
                                                return (
                                                    <div className="d-flex justify-content-between" key={`sizeqq-${index}`}>
                                                        <label style={{ width: " 20px" }} >{sizeItem.size} </label>
                                                        <span >:</span>
                                                        <input type="text" value={sizeItem.quantity} className="w-25 me-5" disabled={isDisable}
                                                            onChange={(e) => {
                                                                //duyệt mảng sizeQuantity , trong mỗi phần tử con của sizeQuantity lại duyệt mảng sizeQuantity 1 lần nữa
                                                                //nếu chỉ số = nhau thì sao chép lại mảng cũ và sửa đổi quantity của size tương ứng
                                                                // nếu chỉ số != thì giữ nguyên mảng ban đầu
                                                                const updatedSizeQuantity = item.sizeQuantity.map((sItem, sIndex) =>
                                                                    sIndex === sizeIndex ? { ...sItem, quantity: e.target.value } : sItem
                                                                );
                                                                const updatedOptions = product.options.map((opt, i) =>
                                                                    i === index ? { ...opt, sizeQuantity: updatedSizeQuantity } : opt
                                                                );
                                                                setProduct({ ...product, options: updatedOptions });
                                                            }} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='form-group mt-3 row'>
                            <div className="col-6">
                                <label>Giảm giá (%)</label>
                                <input type='text' value={product.discount} className={`form-control `} disabled={isDisable}
                                />
                            </div>
                            <div className="col-6">
                                <label>Ngày hết hạn giảm giá</label>
                                <DatePicker
                                    showTime
                                    value={product.expiry}
                                    onChange={(value, dateString) => {
                                        console.log('Selected Time: ', value);
                                        console.log('Formatted Selected Time: ', dateString);
                                    }}
                                    getPopupContainer={trigger => trigger.parentElement}
                                    popupStyle={{ zIndex: 1050 }}
                                    onOk={onOk}
                                />
                            </div>

                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onClose}>Đóng</button>
                        {isDisable ?
                            <></>
                            :
                            <button className="btn btn-primary" onClick={() => { handleConfirmEdit() }}>
                                Lưu
                            </button>

                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalProductDetails;