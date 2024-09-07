import React, { useState, useEffect } from "react";
import MarkdownEditor from "../../components/input/MarkdownEditor";
import InputField from "../../components/input/InputField";
import { apiCreateBlog } from "../../service/blogApiService";
import { toBase64 } from "../../untils/helpers";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { apiUpdateBlog, apiGetBlogDetails } from "../../service/blogApiService";
import { useNavigate } from "react-router-dom";
const UpdateBlog = () => {
    const [previewImg, setPreviewImg] = useState(null);
    const [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState({
        title: "",
        description: "",
        image: null
    })
    const navigation = useNavigate()
    const params = useParams()
    useEffect(() => {
        fetchBlogDetails()
    }, [])
    const fetchBlogDetails = async () => {
        setLoading(true)
        try {
            const response = await apiGetBlogDetails(params.bid)
            if (response && response.EC === 0) {
                setPayload(response.DT)
                toast.success(response.DT)
                setPreviewImg(response.DT.image)
                setLoading(false)
            }
            else {
                toast.error(response.EM)
                setLoading(false)
                navigation("/admin/blog-list")
            }
        } catch (error) {
            setLoading(false)
            toast.error("Có lỗi xảy ra vui lòng thử lại!")
        }
    }
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

    const handleUpdateBlog = async () => {
        try {
            const checkValid = validate();
            if (checkValid) {
                setLoading(true)
                const formData = new FormData()
                for (let [key, value] of Object.entries(payload)) {
                    formData.append(key, value);
                }
                const response = await apiUpdateBlog(payload._id, formData)
                if (response && response.EC === 0) {
                    toast.success("Tạo blog thành công!")
                    setLoading(false)
                }
                else {
                    toast.error(response.EM)
                    setLoading(false)
                }
            }
        } catch (error) {
            setLoading(false)
            toast.error("Có lỗi xảy ra.Vui lòng thử lại!")
        }
    }
    return (
        <div>
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>) : (
                <div>
                    <h3>Bài viết</h3>
                    <div>
                        <label htmlFor="blogImg"> Ảnh bìa</label>
                        <input type="file" className="d-block mb-3 mt-2" id="blogImg"
                            onChange={(e) => { handleImg(e) }} />
                        <div>
                            {previewImg && <img src={previewImg} alt="Anh-bia" className="w-25" />}
                        </div>
                    </div>

                    <div className="mb-3 mt-3">
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
                        onClick={handleUpdateBlog}>Lưu </button>
                </div>)}
        </div>
    )
}

export default UpdateBlog;
