import React, { useEffect, useState } from "react";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/SelectField";
import MarkdownEditor from "../../components/input/MarkdownEditor";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toBase64 } from "../../untils/helpers";
import { useSelector } from "react-redux";
import { DatePicker } from 'antd';
import { apiCreateProduct } from "../../service/productApiService";
import { toast } from "react-toastify";
import { Spin } from "antd";
const CreateProduct = () => {
    const categories = useSelector(state => state.productCategories.categories);
    const [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        brand: "",
        options: [],
    });
    const [errors, setErrors] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        options: [{}],
        discount: "",
        expiry: ""
    })
    const [options, setOptions] = useState([
        {
            color: "",
            sizeQuantity: [],
            images: []

        }
    ])

    const [previewImg, setPreviewImg] = useState([{
        images: []
    }])
    const sizes = ["S", "M", "L", "XL", "XXL"];

    const handleAddOption = () => {
        if (options.length >= 4) return toast.warning("Chỉ hỗ trợ tạo tối đa 4 options")
        setOptions([...options,
        {
            color: "",
            sizeQuantity: [],
            images: []
        }])
        setPreviewImg([...previewImg, { images: [] }])
    }

    const handleDeleteOption = (optionIndex) => {
        let optionCopy = [...options];
        let previewImgCopy = [...previewImg];
        optionCopy = optionCopy.filter((option, index) => index !== optionIndex);
        previewImgCopy = previewImgCopy.filter((imgArr, index) => index !== optionIndex)
        setOptions(optionCopy);
        setPreviewImg(previewImgCopy)
    }

    const validate = () => {
        const newError = {
            options: []
        }
        let isValid = true
        if (!payload.title) {
            newError.title = "Vui lòng nhập tên sản phẩm!";
            isValid = false;
        }
        if (!payload.price) {
            newError.price = "Vui lòng nhập giá sản phẩm!";
            isValid = false;
        }
        if (!payload.brand) {
            newError.brand = "Vui lòng chọn thương hiệu sản phẩm!";
            isValid = false;
        }
        if (!payload.description) {
            newError.description = "Vui lòng nhập mô tả sản phẩm!";
            isValid = false;
        }
        if (!payload.category) {
            newError.category = "Vui chọn danh mục sản phẩm!";
            isValid = false;
        }

        options.forEach((option, index) => {
            const optionError = {};

            if (!option.color) {
                optionError.color = "Màu sắc không được để trống!";
                isValid = false;
            }
            if (option.sizeQuantity.length <= 0) {
                optionError.sizeQuantity = "Vui lòng chọn kích thước và điền số lượng!"
                isValid = false;
            }
            if (option.images.length <= 0) {
                optionError.images = "Vui lòng chọn ảnh sản phẩm!"
                isValid = false;
            }

            else {
                option.images.forEach(file => {
                    if (!file && file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "jpg") {
                        isValid = false;
                        optionError.images = "Sai định dạng ảnh (chỉ hỗ trợ .jepg || .png || .jpg)"
                    }
                })
            }
            if (option.sizeQuantity.length > 0) {
                option.sizeQuantity.forEach(sizeQtt => {
                    if (!sizeQtt.size) {
                        isValid = false;
                    }
                    if (!sizeQtt.quantity) {
                        isValid = false;
                    }
                });
            }
            newError.options[index] = optionError;
        });
        setErrors({ ...newError })
        return isValid
    }

    const handleAddSize = (optionIndex, size) => {
        setOptions(prevOptions => {
            // Sao chép options cũ để tránh đột biến trực tiếp vào state
            const newOptions = prevOptions.map((option, index) => {
                if (index === optionIndex) {
                    // Sao chép sizeQuantity của option hiện tại
                    const currentSizeQuantity = [...option.sizeQuantity];

                    // Tìm kích thước trong sizeQuantity
                    const sizeIndex = currentSizeQuantity.findIndex(sq => sq.size === size);

                    if (sizeIndex === -1) {
                        // Nếu kích thước chưa tồn tại, thêm mới vào
                        return {
                            ...option,
                            sizeQuantity: [...currentSizeQuantity, { size: size, quantity: "" }]
                        };
                    } else {
                        // Nếu kích thước đã tồn tại, xóa nó
                        return {
                            ...option,
                            sizeQuantity: currentSizeQuantity.filter((_, idx) => idx !== sizeIndex)
                        };
                    }
                }
                return option;
            });

            // Trả về các options đã được cập nhật
            return newOptions;
        });
    };
    const handleCheckSizeSelect = (optionIndex, size) => {
        const isSizeSelected = options[optionIndex].sizeQuantity.some(sq => sq.size === size);
        return isSizeSelected
    }

    const handleSizeQuantityChange = (optionIndex, sizeIndex, event) => {
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[optionIndex].sizeQuantity[sizeIndex]["quantity"] = +event.target.value;
            return newOptions;
        });
    };

    const handleColorChange = (index, event) => {
        const { value } = event.target;
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index].color = value;
            return newOptions;
        });
    };
    const handleImageChange = async (index, event) => {
        if (event.target.files.length === 0) {
            return;
        }
        const files = Array.from(event.target.files);
        const base64Files = await Promise.all(files.map(async file => {
            const base64 = await toBase64(file);
            return { name: file.name, path: base64 };
        }));
        setPreviewImg(prev => {
            const newPreviewImg = [...prev];
            newPreviewImg[index].images = base64Files;
            return newPreviewImg;
        })
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index].images = files;
            return newOptions;
        });
    };

    const handleDelteImg = (img, index) => {
        let previewImgCopy = [...previewImg];
        let optionCopy = [...options];
        previewImgCopy[index].images = previewImgCopy[index].images.filter(item => item.name !== img.name);
        optionCopy[index].images = optionCopy[index].images.filter(item => item.name !== img.name)
        setOptions(optionCopy)
        setPreviewImg(previewImgCopy);
    }
    const handleCreateProduct = async () => {
        window.scrollTo(0, 0);
        const updatedPayload = {
            ...payload,
            options
        };

        try {
            if (validate()) {
                setLoading(true)
                const formData = new FormData;
                // Thêm các trường không phải tệp vào FormData
                for (let [key, value] of Object.entries(updatedPayload)) {
                    if (key === 'options') {
                        // Xử lý options như chuỗi JSON
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                }
                options.forEach((option, optionIndex) => {
                    option.images.forEach(file => {
                        formData.append(`option[${optionIndex}][images]`, file);
                    });
                });
                const createProduct = await apiCreateProduct(formData);
                if (createProduct && createProduct.EC === 0) {
                    toast.success("Tạo sản phẩm thành công!")
                    setPayload({
                        title: "",
                        price: 0,
                        description: "",
                        category: "",
                        brand: "",
                        options: [],
                        discount: 0,
                        expiry: ""
                    })
                    setOptions([{
                        color: "",
                        sizeQuantity: [],
                        images: []

                    }])
                    setPreviewImg([{
                        images: []
                    }])
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    toast.error("Tạo sản phẩm không thành công.Vui lòng thử lại!")
                }
            }
            else {
                toast.error("Tạo sản phẩm không thành công.Vui lòng thử lại!")
            }
        } catch (error) {
            console.log("lỗi sp:", error)
            setLoading(false)
            toast.error("Tạo sản phẩm không thành công.Vui lòng thử lại!")
        }
    }
    return (
        <div style={{ marginTop: "8px" }}>
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>) : (
                <div>
                    <h2>Tạo sản phẩm</h2>
                    <hr />
                    <div>
                        <div className="row me-0 mb-3">
                            <div className="col-sm-6 col-12">
                                <label>Tên sản phẩm</label>
                                <InputField
                                    nameKey={"title"}
                                    value={payload.title}
                                    setValue={setPayload}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-sm-6 col-12 mt-sm-0 mt-3 pe-sm-5">
                                <label>Giá bán</label>
                                <InputField
                                    nameKey={"price"}
                                    value={payload.price}
                                    setValue={setPayload}
                                    errors={errors}
                                />
                            </div>

                        </div>
                        <div className="row me-0 mb-3">
                            <div className="col-sm-6 col-12">
                                <label>Danh mục</label>
                                <select className="form-select" aria-label="Default select example" value={payload.category}
                                    onChange={(event) => { setPayload(prev => ({ ...prev, category: event.target.value })) }}>
                                    <option value={""}>Chọn danh mục</option>
                                    {categories.map((option, index) => {
                                        return (
                                            <option value={option._id} key={`categoryOpt - ${index}`}>{option.categoryName}</option>
                                        )
                                    })}
                                </select>
                                {errors.category && <small className="text-danger ms-1">{errors.category}</small>}
                            </div>
                            <div className="col-sm-6 col-12 pe-sm-5 mt-sm-0 mt-3">
                                <label>Thương hiệu</label>
                                <SelectField
                                    nameKey={"brand"}
                                    value={payload.brand}
                                    setValue={setPayload}
                                    options={[{ brand: "Atino" }]}
                                    errors={errors}
                                />

                            </div>
                        </div>
                        <MarkdownEditor
                            label={"Mô tả sản phẩm"}
                            nameKey={"description"}
                            value={payload.description}
                            setValue={setPayload}
                            errors={errors}
                        />
                        <div className="mt-3">
                            <label>Chi tiết sản phẩm</label>
                            <div className="d-flex flex-wrap">
                                {options && options.length > 0 && options.map((option, optionIndex) => (
                                    <div className="border boder-dark px-3 py-2 mt-3 col-sm-5 col-12" key={`opt - ${optionIndex}`} style={{ position: "relative" }}>
                                        <div className="row">
                                            <label className="me-2 col-3">Màu sắc</label>
                                            <input value={option.color} className="col-6" type="text" onChange={(e) => handleColorChange(optionIndex, e)} />
                                            {errors.options[optionIndex] && errors.options[optionIndex].color && <small className="text-danger">{errors.options[optionIndex].color}</small>}
                                        </div>
                                        <div className="mt-2">
                                            <label>Kích thước & số lượng: </label>
                                            <div className="mb-3">
                                                {sizes && sizes.length > 0 && sizes?.map((size, sizeIndex) => {
                                                    return (
                                                        <button value={size} key={`sizeProd-${sizeIndex}`}
                                                            className={`me-3 btn border ${handleCheckSizeSelect(optionIndex, size) ? "btn-secondary" : "btn-light"} `}
                                                            onClick={() => { handleAddSize(optionIndex, size) }} >
                                                            {size}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                            {errors.options[optionIndex] && errors.options[optionIndex].sizeQuantity && <small className="text-danger">{errors.options[optionIndex].sizeQuantity}</small>}

                                            {option && option.sizeQuantity && option.sizeQuantity.length > 0 && option.sizeQuantity?.map((sizeQtt, sizeIndex) => {
                                                return (
                                                    <div className="row mt-1" key={`sizeQtt - ${optionIndex} - ${sizeIndex}`}>
                                                        <label className="col-3 mt-1 ps-4 btn btn-light border">{sizeQtt.size}</label>
                                                        {sizeQtt.size &&
                                                            <div className=" col-8 d-flex">
                                                                <span className="col-1 mt-2">:</span>
                                                                <input type="number" className={`form-control ${!sizeQtt.quantity || sizeQtt.quantity < 0 ? "is-invalid" : ""}`} value={sizeQtt.quantity} placeholder="Số lượng"
                                                                    onChange={(e) => { handleSizeQuantityChange(optionIndex, sizeIndex, e) }}
                                                                />
                                                            </div>}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button className="border-0 bg-transparent" style={{ position: "absolute", top: "0", right: "0" }}
                                            onClick={() => { handleDeleteOption(optionIndex) }}>
                                            <TiDelete style={{ fontSize: "25px" }} />
                                        </button>
                                        <div className="mt-3">
                                            <label className="col-12">Ảnh sản phẩm</label>
                                            <input id="images" className="col-12 mb-3 mt-1" type="file" multiple onChange={(e) => { handleImageChange(optionIndex, e) }} />
                                            {errors.options[optionIndex] && errors.options[optionIndex].images && <small className="text-danger">{errors.options[optionIndex].images}</small>}
                                            <div className="d-flex flex-wrap">
                                                {previewImg && previewImg[optionIndex] && previewImg[optionIndex].images && previewImg[optionIndex]?.images?.map((img, index) => {
                                                    return (
                                                        <div key={`prevImg-${index}`} style={{ position: "relative", width: "25%" }} >
                                                            <img src={img.path} alt="" className="me-1" style={{ width: "100%" }} />
                                                            <button className="border-0 bg-transparent" style={{ position: "absolute", top: "-5px", right: "0" }}
                                                                onClick={() => { handleDelteImg(img, optionIndex) }}>
                                                                <TiDelete />
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className=" col-sm-1 col-12 btn" onClick={() => { handleAddOption() }}>
                                    <IoIosAddCircleOutline style={{ fontSize: "50px" }} />
                                </button>
                            </div>

                            <hr className="mt-3" />
                            <button className="btn btn-success mt-2 w-100" onClick={handleCreateProduct}>Tạo</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateProduct