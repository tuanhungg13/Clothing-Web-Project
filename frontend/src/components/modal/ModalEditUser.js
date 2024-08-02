import React, { useEffect, useRef, useState } from "react";
import { apiUpdateByAdmin } from "../../service/userApiService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
    const modalRef = useRef(null);
    const [role, setRole] = useState("");
    const [isBlocked, setIsBlocked] = useState("");
    useEffect(() => {
        if (props.showModalEditUser) {
            setRole(props.dataUser.role);
            setIsBlocked(props.dataUser.isBlocked);
            modalRef.current.focus()
        }
    }, [props.showModalEditUser])

    const handleConfirmEdit = async () => {
        const response = await apiUpdateByAdmin({ uid: props.dataUser._id }, { role, isBlocked });
        if (response.EC === 0) {
            toast.success("Thay đổi thông tin người dùng thành công!");
            await props.fetchUsers();
        }
        else {
            toast.error("Thay đổi thông tin người dùng không thành công!");
        }
        props.onClose();
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
            ref={modalRef} onKeyDown={(event) => { handleOnKeyDown(event) }} onClick={props.onClose}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Chỉnh sửa thông tin người dùng</h1>
                        <button type="button" className="btn-close" onClick={props.onClose} aria-label="Close"></button>
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
                            <div className="col-8 me-3">
                                <label>Chức vụ</label>
                                <select class="form-select" aria-label="Default select example" value={role}
                                    onChange={(event) => { setRole(event.target.value) }}>
                                    <option value={"user"}>Nguời dùng</option>
                                    <option value={"admin"}>Quản trị viên</option>
                                </select>
                            </div>


                            <div className="col-3">
                                <label>Chặn</label>
                                <select class="form-select" aria-label="Default select example" value={isBlocked}
                                    onChange={(event) => { setIsBlocked(event.target.value) }}>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
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