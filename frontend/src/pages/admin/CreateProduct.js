import React, { useState } from "react";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/SelectField";
import MarkdownEditor from "../../components/input/MarkdownEditor";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Select } from 'antd';
import { toBase64 } from "../../untils/helpers";
import { useSelector } from "react-redux";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { apiCreateProduct } from "../../service/productApiService";
import { toast } from "react-toastify";
const CreateProduct = () => {
    const categories = useSelector(state => state.productCategories.categories)
    const [payload, setPayload] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        options: [],
        discount: "",
        expiry: ""
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

    const handleAddOption = () => {
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
            option.images.forEach(file => {
                if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "jpg") {
                    isValid = false;
                    optionError.images = "Sai định dạng ảnh (chỉ hỗ trợ .jepg || .png || .jpg)"
                }
            })

            option.sizeQuantity.forEach(sizeQtt => {
                if (!sizeQtt.size) {
                    isValid = false;
                }
                if (!sizeQtt.quantity) {
                    isValid = false;
                }
            });

            newError.options[index] = optionError;
        });
        console.log("check error:", newError)
        setErrors({ ...newError })
        return isValid
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
        const files = Array.from(event.target.files);
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index].images = files;
            return newOptions;
        });
        const base64Files = await Promise.all(files.map(async file => {
            const base64 = await toBase64(file);
            return { name: file.name, path: base64 };
        }));
        setPreviewImg(prev => {
            const newPreviewImg = [...prev];
            newPreviewImg[index].images = base64Files;
            return newPreviewImg;
        })
    };

    const handleDelteImg = (img, index) => {
        let previewImgCopy = [...previewImg];
        let optionCopy = [...options];
        previewImgCopy[index].images = previewImgCopy[index].images.filter(item => item.name !== img.name);
        optionCopy[index].images = optionCopy[index].images.filter(item => item.name !== img.name)
        setOptions(optionCopy)
        setPreviewImg(previewImgCopy);
    }
    const sizes = [
        {
            label: "S",
            value: "S"
        },
        {
            label: "M",
            value: "M"
        },
        {
            label: "L",
            value: "L"
        },
        {
            label: "XL",
            value: "XL"
        },
        {
            label: "XXL",
            value: "XXL"
        },
    ];
    const handleCreateProduct = async () => {
        setPayload(prevPayload => ({
            ...prevPayload,
            options
        }));
        if (validate()) {
            console.log("check payload:", payload)
            const formData = new FormData;
            // Thêm các trường không phải tệp vào FormData
            // for (let [key, value] of Object.entries(payload)) {
            //     if (key === 'options') {
            //         // Xử lý options như chuỗi JSON
            //         formData.append(key, JSON.stringify(value));
            //     } else {
            //         formData.append(key, value);
            //     }
            // }
            // options.forEach((option, optionIndex) => {
            //     option.images.forEach((file, fileIndex) => {
            //         formData.append(`option[${optionIndex}][images]`, file);
            //     });
            // });
            // const createProduct = await apiCreateProduct(formData);
            // if (createProduct.EC === 0) {
            //     toast.success("Tạo sản phẩm thành công!")
            // }
            // else {
            //     toast.error("Tạo sản phẩm không thành công!")
            // }
        }
    }
    return (
        <div>
            <h2>Tạo sản phẩm</h2>
            <hr />
            <div>
                <div className="row me-0 mb-3">
                    <div className="col-6">
                        <label>Tên sản phẩm</label>
                        <InputField
                            nameKey={"title"}
                            value={payload.title}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                    <div className="col-3">
                        <label>Giá bán</label>
                        <InputField
                            nameKey={"price"}
                            value={payload.price}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                    <div className="col-3 pe-5">
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
                <div className="row me-0 mb-3">
                    <div className="col-6">
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
                    <div className="col-3">
                        <label>Giảm giá</label>
                        <InputField
                            nameKey={"discount"}
                            value={payload.discount}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>
                    <div className="col-3">
                        <label>Ngày hết hạn giảm giá</label>
                        <DatePicker
                            showTime
                            value={payload.expiry || ""}
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                                setPayload({ ...payload, expiry: value });
                            }}
                            getPopupContainer={trigger => trigger.parentElement}
                            popupStyle={{ zIndex: 1050 }}

                        />
                        {errors.expiry && <div className="text-danger">{errors.expiry}</div>}
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
                        {options.map((option, optionIndex) => (
                            <div className="border boder-dark px-3 py-2 mt-3 ms-3 col-sm-5 col-12" key={`opt - ${optionIndex}`} style={{ position: "relative" }}>
                                <div className="row">
                                    <label className="me-2 col-3">Màu sắc</label>
                                    <input value={option.color} className="col-6" type="text" onChange={(e) => handleColorChange(optionIndex, e)} />
                                    {errors.options[optionIndex] && errors.options[optionIndex].color && <small className="text-danger">{errors.options[optionIndex].color}</small>}
                                </div>
                                <div className="mt-2">
                                    <label>Kích thước & số lượng: </label>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn size"
                                        onChange={(value) => {
                                            const newSizeQuantity = value.map(size => ({
                                                size: size,
                                                quantity: ""
                                            }));
                                            setOptions(prevOptions => {
                                                //copy options cũ, ghi đè gtri sizeQuantity, trả về options mới đã ghi đè
                                                const newOptions = [...prevOptions];
                                                newOptions[optionIndex].sizeQuantity = newSizeQuantity;
                                                return newOptions;
                                            });
                                        }}
                                        options={sizes}
                                    />
                                    {errors.options[optionIndex] && errors.options[optionIndex].sizeQuantity && <small className="text-danger">{errors.options[optionIndex].sizeQuantity}</small>}

                                    {option.sizeQuantity?.map((sizeQtt, sizeIndex) => {
                                        return (
                                            <div className="row mt-1" key={`sizeQtt - ${optionIndex} - ${sizeIndex}`}>
                                                <label className="col-3 mt-1">{sizeQtt.size}</label>
                                                {sizeQtt.size &&
                                                    <div className=" col-8 d-flex">
                                                        <span className="col-1 mt-1">:</span>
                                                        <input type="number" className={`form - control ${!sizeQtt.quantity || sizeQtt.quantity < 0 ? "is-invalid" : ""}`} value={sizeQtt.quantity} placeholder="Số lượng"
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
                                        {previewImg[optionIndex]?.images?.map((img, index) => {
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
                        <button className="ms-3 w-25 border-0 mt-2" onClick={() => { handleAddOption() }}>
                            <IoIosAddCircleOutline style={{ fontSize: "50px" }} />
                        </button>
                    </div>


                    <button onClick={() => { handleCreateProduct() }}>Tạo</button>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct