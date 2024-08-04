import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { DatePicker } from 'antd';
import { toast } from "react-toastify";
import InputField from "../input/InputField";
const ModalProductDetails = (props) => {
    const modalRef = useRef(null);
    const [isDisable, setIsDisable] = useState(false);
    const [product, setProduct] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.showModalProduct) {
            setProduct(props.dataProduct);
            modalRef.current.focus();
        }
        if (props.action === "view") setIsDisable(true);
        else setIsDisable(false);
    }, [props]);

    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const handleInputChange = (field, value) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [field]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: ''
        }));
    };

    const handleQuantityChange = (index, sizeIndex, value) => {
        //duyệt mảng sizeQuantity của phần tử options đang được chỉnh sửa
        //nếu chỉ số của phần tử đang đc sửa = chỉ số ptu đang duyệt ở dưới thì sao chép lại mảng cũ và sửa đổi quantity của nó
        // nếu chỉ số != thì giữ nguyên mảng ban đầu
        const updatedSizeQuantity = product.options[index].sizeQuantity.map((sItem, sIndex) =>
            sIndex === sizeIndex ? { ...sItem, quantity: value } : sItem
        );

        //duyệt options, nếu options nào thay đổi thì ghi đè (tương tự sizeQuantity)
        const updatedOptions = product.options.map((opt, i) =>
            i === index ? { ...opt, sizeQuantity: updatedSizeQuantity } : opt
        );
        setProduct({ ...product, options: updatedOptions });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!product.title) {
            newErrors.title = "Vui lòng nhập tên sản phẩm";
            valid = false;
        }
        if (!product.price) {
            newErrors.price = "Vui lòng nhập giá gốc";
            valid = false;
        }
        if ((!product.discount || product.discount < 0) && product.expiry) {
            newErrors.discount = "Vui lòng nhập giảm giá";
            valid = false;
        }
        else if (product.discount && product.discount > 0 && !product.expiry) {
            newErrors.expiry = "Vui lòng chọn ngày hết hạn giảm giá";
            valid = false;
        }
        product.options?.forEach((option, index) => {
            option.sizeQuantity?.forEach((sizeQuantity, sizeIndex) => {
                if (!sizeQuantity.quantity) {
                    valid = false;
                }
            });
        });
        setErrors(newErrors);
        return valid;
    };

    const handleConfirmEdit = () => {
        if (validateForm()) {
            toast.success("Thông tin sản phẩm đã được lưu");
            // Thực hiện các hành động lưu dữ liệu khác ở đây
        }
    };

    const handleCloseModal = () => {
        props.onClose();
        setErrors({})
    }

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmEdit();
            props.onClose();
        } else if (event.key === "Escape") {
            props.onClose();
        }
    };

    return (
        <div className={`modal fade ${props.showModalProduct ? 'show' : ''}`} tabIndex="-1" style={{ display: props.showModalProduct ? 'block' : 'none' }}
            ref={modalRef} onClick={handleCloseModal} onKeyDown={handleOnKeyDown}>
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
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
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
                                    <InputField
                                        nameKey={"title"}
                                        value={product.title || ""}
                                        setValue={setProduct}
                                        errors={errors}
                                        disabled={isDisable}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label>Giá gốc</label>
                                    <InputField
                                        nameKey={"price"}
                                        value={product.price || ""}
                                        setValue={setProduct}
                                        errors={errors}
                                        disabled={isDisable}
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
                                {product?.options?.map((item, index) => (
                                    <div className="mx-3 mt-2 d-flex flex-column justify-content-between" key={`opt-${index}`}>
                                        <label className="fw-bold mb-2">Màu sắc : {item.color}</label>
                                        {item.sizeQuantity.map((sizeItem, sizeIndex) => (
                                            <div className="d-flex justify-content-between" key={`sizeqq-${index}-${sizeIndex}`}>
                                                <label style={{ width: "20px" }}>{sizeItem.size}</label>
                                                <span>:</span>
                                                <input type="Number" value={sizeItem.quantity} className={`w-50 me-5 ${!sizeItem.quantity || sizeItem.quantity < 0 ? "form-control is-invalid" : ""}`} disabled={isDisable}
                                                    onChange={(e) => handleQuantityChange(index, sizeIndex, e.target.value)} />
                                            </div>
                                        ))}
                                        <div className="d-flex flex-wrap mt-2">
                                            {item.images.map((image, imgIndex) => {
                                                return (
                                                    <img src={image} alt="anhSP" className="w-25 me-1" key={`{img-${index}-${imgIndex}}`} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='form-group mt-3 row'>
                            <div className="col-6">
                                <label>Giảm giá (%)</label>
                                <InputField
                                    nameKey={"discount"}
                                    value={product.discount || ""}
                                    setValue={setProduct}
                                    errors={errors}
                                    disabled={isDisable}
                                />
                            </div>

                            <div className="col-6">
                                <label>Ngày hết hạn giảm giá</label>
                                <DatePicker
                                    showTime
                                    value={product.expiry || ""}
                                    onChange={(value, dateString) => {
                                        console.log('Selected Time: ', value);
                                        console.log('Formatted Selected Time: ', dateString);
                                        handleInputChange('expiry', value);
                                    }}
                                    getPopupContainer={trigger => trigger.parentElement}
                                    popupStyle={{ zIndex: 1050 }}
                                    onOk={onOk}
                                />
                                {errors.expiry && <div className="text-danger">{errors.expiry}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                        {!isDisable &&
                            <button className="btn btn-primary" onClick={handleConfirmEdit}>
                                Lưu
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProductDetails;
