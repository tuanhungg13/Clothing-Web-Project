import React, { useEffect, useRef, useState } from "react";
import { apiUpdateByAdmin } from "../../service/userApiService";
import SelectField from "../input/SelectField";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
    const modalRef = useRef(null);
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({
        isBlocked: "",
        role: ""
    })
    useEffect(() => {
        if (props.showModalEditUser) {
            setPayload(props.dataUser);
            modalRef.current.focus()
        }
    }, [props.showModalEditUser])

    const validate = () => {
        const newError = {};
        let isValid = true;
        if (payload.isBlocked === "") {
            newError.isBlocked = "Vui lòng xác nhận chặn người dùng hay không!";
            isValid = false;
        }
        if (!payload.role) {
            newError.role = "Vui lòng chọn chức vụ người dùng!";
            isValid = false;
        }
        setErrors(newError);
        return isValid;
    }
    const handleCloseModal = () => {
        props.onClose();
        setErrors({})
    }

    const handleConfirmEdit = async () => {
        const checkValid = validate();
        if (checkValid) {
            const response = await apiUpdateByAdmin({ uid: payload._id }, payload);
            if (response.EC === 0) {
                toast.success("Thay đổi thông tin người dùng thành công!");
                await props.fetchUsers();
            }
            else {
                toast.error("Thay đổi thông tin người dùng không thành công!");
            }
            handleCloseModal()
        }
    }

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmEdit();
            props.onClose();
        }
        else if (event.key === "Escape") props.onClose()
    }
    return (
        <div className={`modal fade ${props.showModalEditUser ? 'show' : ''}`} tabIndex="-1" style={{ display: props.showModalEditUser ? 'block' : 'none' }}
            ref={modalRef} onKeyDown={(event) => { handleOnKeyDown(event) }} onClick={handleCloseModal}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Chỉnh sửa thông tin người dùng</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>


                    <div className="modal-body">
                        <div className='form-group mt-3'>
                            <label>Email</label>
                            <input type='text' value={props.dataUser.email} className={`form-control `} disabled
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Sđt</label>
                            <input type='text' value={props.dataUser.phoneNumber} className={`form-control `} disabled
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Tên</label>
                            <input type='text' value={props.dataUser.userName} className={`form-control `} disabled
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Địa chỉ</label>
                            <input type='text' value={props.dataUser.address} className={`form-control `} disabled
                            />
                        </div>
                        <div className="mt-3 row px-0">
                            <div className="col-sm-8 col-12 me-3">
                                <label>Chức vụ</label>
                                <SelectField
                                    nameKey={"role"}
                                    value={payload.role}
                                    setValue={setPayload}
                                    options={[{ role: "user" }, { role: "admin" }]}
                                    errors={errors}
                                />
                            </div>


                            <div className="col-sm-3 col-12">
                                <label>Chặn</label>
                                <select className="form-select" aria-label="Default select example" value={payload.isBlocked}
                                    onChange={(event) => { setPayload(prev => ({ ...prev, isBlocked: event.target.value })) }}>
                                    <option value={""}>Chọn</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                                {errors.isBlocked && <small className="text-danger">{errors.isBlocked}</small>}
                            </div>

                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onClose}>Đóng</button>
                        <button className="btn btn-primary" onClick={() => { handleConfirmEdit() }}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalEditUser;