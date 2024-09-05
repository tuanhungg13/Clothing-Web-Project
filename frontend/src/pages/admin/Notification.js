import React, { useState } from "react";
import MarkdownEditor from "../../components/input/MarkdownEditor";
import InputField from "../../components/input/InputField";
import { apiCreateBlog } from "../../service/blogApiService";
import { toBase64 } from "../../untils/helpers";
import { toast } from "react-toastify";
const Notification = () => {
    const [previewImg, setPreviewImg] = useState(null)
    const [payload, setPayload] = useState({
        title: "",
        description: "",
        image: null
    })
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: ""
    })
    const handleImg = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = await toBase64(file); // Chuyển file sang base64
            setPayload(prev => ({ ...prev, image: file }))
            setPreviewImg(img)
        }
    }

    const validate = () => {
        const newError = {}
        let isValid = true
        if (!payload.title) {
            newError.title = "Vui lòng nhập tên tiêu đề!";
            isValid = false
        }
        if (!payload.description) {
            newError.description = "Vui lòng nhập nội dung tiêu đề!";
            isValid = false
        }
        if (!payload.image) {
            newError.image = "Vui lòng thêm ảnh!";
            isValid = false
        }
        setErrors(newError)
        return isValid
    }

    const handleCreateBlog = async () => {
        const checkValid = validate();
        if (checkValid) {
            const formData = new FormData()
            for (let [key, value] of Object.entries(payload)) {
                formData.append(key, value);
            }
            const response = await apiCreateBlog(formData)
            if (response && response.EC === 0) {
                toast.success("Tạo blog thành công!")
                setPayload({
                    title: "",
                    description: "",
                    image: null
                })
                setPreviewImg(null)
            }
            else toast.error(response.EM)
        }
    }

    return (
        <div className="container">
            <h3>Bài viết</h3>
            <div>
                <label htmlFor="blogImg"> Ảnh bìa</label>
                <input type="file" className="d-block mb-3 mt-2" id="blogImg"
                    onChange={(e) => { handleImg(e) }} />
                <div>
                    <img src={previewImg || ""} alt="Anh-bia" className="w-25" />
                </div>
            </div>

            <div className="mb-3">
                <label>Tiêu đề</label>
                <InputField
                    nameKey={"title"}
                    value={payload.title}
                    setValue={setPayload}
                    errors={errors}
                />
            </div>
            <MarkdownEditor
                label={"Nội dung"}
                nameKey={"description"}
                value={payload.description}
                setValue={setPayload}
                errors={errors}
            />

            <button className="btn btn-success w-100 mt-3"
                onClick={handleCreateBlog}>Tạo </button>

        </div>
    )
}

export default Notification