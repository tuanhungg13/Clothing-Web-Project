import React, { useEffect, useState } from "react";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/SelectField";
import MarkdownEditor from "../../components/input/MarkdownEditor";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toBase64 } from "../../untils/helpers";
import { useSelector } from "react-redux";
import { apiUpdateProduct } from "../../service/productApiService";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const UpdateProduct = ({ dataProduct, setEdit, setDataProduct, fetchProducts }) => {
    const categories = useSelector(state => state.productCategories.categories)
    const [payload, setPayload] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        options: [],
        discount: 0,
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
    const [previewImg, setPreviewImg] = useState([{
        images: []
    }])
    const [options, setOptions] = useState([
        {
            color: "",
            sizeQuantity: [],
            images: []

        }
    ])
    const sizes = ["S", "M", "L", "XL", "XXL"];


    useEffect(() => {
        setPayload(dataProduct);
        setOptions(dataProduct.options)
        setPreviewImg(dataProduct.options)
    }, [dataProduct])

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
        if (payload.discount < 0) {
            newError.discount = "Vui lòng nhập giảm giá"
            isValid = false
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
                if (typeof file === "object" && file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "jpg") {
                    isValid = false;
                    optionError.images = "Sai định dạng ảnh (chỉ hỗ trợ .jepg || .png || .jpg)"
                }
            })
            option.sizeQuantity.forEach(sizeQtt => {
                if (!sizeQtt.size) {
                    isValid = false;
                }
                if (+sizeQtt.quantity < 0) {
                    isValid = false;
                }
            });

            newError.options[index] = optionError;
        });
        setErrors(newError)
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
        const files = Array.from(event.target.files);
        setOptions(prevOptions => {
            const newOptions = JSON.parse(JSON.stringify(prevOptions)) //deep copy options
            newOptions[index].images = [...newOptions[index].images, ...files];  //ghi đè phần tử option được thay đổi
            return newOptions;
        });
        const base64Files = await Promise.all(files.map(async file => {
            const base64 = await toBase64(file);
            return { name: file.name, path: base64 };
        }));
        setPreviewImg(prev => {
            const newPreviewImg = [...prev];
            newPreviewImg[index].images = [...newPreviewImg[index].images, ...base64Files];
            return newPreviewImg;
        });
    };

    const handleDelteImg = (img, index) => {
        let previewImgCopy = [...previewImg];
        let optionCopy = [...options];

        // Xử lý xóa ảnh trong mảng previewImg và options
        if (typeof img === "string") {
            // Khi img là chuỗi
            //vào phần tự có ảnh được xóa và lọc ra những ảnh không trùng với ảnh bị xóa
            previewImgCopy[index].images = previewImgCopy[index].images.filter(item => item !== img);
            optionCopy[index].images = optionCopy[index].images.filter(item => item !== img);
        } else {
            // Khi img là object
            previewImgCopy[index].images = previewImgCopy[index].images.filter(item => item.name !== img.name);
            optionCopy[index].images = optionCopy[index].images.filter(item => item.name !== img.name);
        }
        // Cập nhật lại state
        setOptions(optionCopy);
        setPreviewImg(previewImgCopy);
    };
    const handleUpdateProduct = async () => {
        window.scrollTo(0, 0);
        // Cập nhật payload với options
        const updatedPayload = {
            ...payload,
            options: options
        };
        const checkValid = validate()
        if (checkValid) {
            const formData = new FormData();
            // Thêm các trường không phải tệp vào FormData
            for (let [key, value] of Object.entries(updatedPayload)) {
                if (key === 'category') {
                    if (typeof value === 'object' && value !== null) {
                        formData.append(key, value._id);
                    } else {
                        formData.append(key, value);
                    }
                }
                else if (key === 'options') {
                    // Xử lý options như chuỗi JSON
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }
            options.forEach((option, optionIndex) => {
                option.images.forEach((file, fileIndex) => {
                    if (typeof file === "object") formData.append(`option[${optionIndex}][images]`, file);
                });
            });
            const updateProduct = await apiUpdateProduct(formData);
            if (updateProduct && updateProduct.EC === 0) {
                toast.success("Cập nhật sản phẩm thành công!")
                fetchProducts()
            }
            else {
                toast.error("Cập nhật sản phẩm không thành công!")
            }
        }
        else {
            toast.error("Thiếu thông tin sản phẩm!")
        }
    }
    const handleBackPage = () => {
        setEdit(false);
        setDataProduct({})
    }

    return (
        <div>
            <div className="d-flex">
                <button className="btn btn-secondary ms-2 me-3"
                    onClick={() => { handleBackPage() }}>
                    <FaArrowLeft />
                </button>
                <h2>Cập nhật sản phẩm</h2>
            </div>

            <hr />
            <div>
                <div className="row mx-0 px-0 mb-3">
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
                            type={"number"}
                            value={payload.price}
                            setValue={setPayload}
                            errors={errors}
                        />
                    </div>

                </div>
                <div className="row mx-0 px-0 mb-2">
                    <div className="col-sm-6 col-12">
                        <label>Danh mục</label>
                        <select className="form-select" aria-label="Default select example" value={payload.category._id}
                            onChange={(event) => { setPayload(prev => ({ ...prev, category: event.target.value })) }}>
                            <option value={""}>Chọn danh mục</option>
                            {categories && categories.length > 0 && categories.map((option, index) => {
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
                    <div className="d-flex flex-wrap justify-content-center justify-content-sm-start">
                        {options.map((option, optionIndex) => (
                            <div className="border boder-dark py-3 mt-3 me-sm-3 col-sm-5 col-12 px-3" key={`opt - ${optionIndex}`} style={{ position: "relative" }}>
                                <div className="row">
                                    <label className="me-2 col-3">Màu sắc</label>
                                    <input value={option.color} className="col-6" type="text" onChange={(e) => handleColorChange(optionIndex, e)} />
                                    {errors.options[optionIndex] && errors.options[optionIndex].color && <small className="text-danger">{errors.options[optionIndex].color}</small>}
                                </div>
                                <div className="mt-2">
                                    <label>Kích thước & số lượng: </label>
                                    <div className="mb-3">
                                        {sizes?.map((size, sizeIndex) => {
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

                                    {option.sizeQuantity?.map((sizeQtt, sizeIndex) => {
                                        return (
                                            <div className="row mt-1" key={`sizeQtt - ${optionIndex} - ${sizeIndex}`}>
                                                <label className="col-3 mt-1 btn btn-light border">{sizeQtt.size}</label>
                                                {sizeQtt.size &&
                                                    <div className=" col-8 d-flex">
                                                        <span className="col-1 mt-1">:</span>
                                                        <input type="number" className={`form-control ${!sizeQtt.quantity || +sizeQtt.quantity < 0 ? "is-invalid" : ""}`} value={sizeQtt.quantity} placeholder="Số lượng"
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
                                                    <img src={img.path || img} alt="" className="me-1" style={{ width: "100%" }} />
                                                    <button className="border-0 bg-transparent" style={{ position: "absolute", top: "-5px", right: "0", color: "gray" }}
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
                        <button className="mt-sm-3 col-sm-5 col-12" onClick={() => { handleAddOption() }}>
                            <IoIosAddCircleOutline style={{ fontSize: "50px" }} />
                        </button>
                    </div>
                    <hr className="mt-3" />

                    <button className="btn btn-warning w-100" onClick={() => { handleUpdateProduct() }}>Sửa</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct