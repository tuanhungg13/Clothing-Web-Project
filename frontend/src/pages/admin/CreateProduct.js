import React, { useState } from "react";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/SelectField";
import MarkdownEditor from "../../components/input/MarkdownEditor";

const CreateProduct = () => {
    const [payload, setPayload] = useState({
        title: "",
        price: "",
        description: "",
        brand: "",
        options: "",
        discount: "",
        expiry: ""
    });
    const [errors, setErrors] = useState({
        title: "",
        price: "",
        description: "",
        brand: "",
        options: "",
        discount: "",
        expiry: ""
    })
    console.log("check payload", payload)
    return (
        <div>
            <h2>Tạo sản phẩm</h2>
            <hr />
            <div>
                <div className="row">
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
                        <label>Giá bán</label>
                        <SelectField
                            nameKey={"brand"}
                            value={payload.brand}
                            setValue={setPayload}
                            options={["Atino"]}
                            errors={errors}
                        />
                    </div>
                </div>
                <MarkdownEditor
                    nameKey={"description"}
                    value={payload.description}
                    setValue={setPayload}
                    errors={errors}
                />

            </div>
        </div>
    )
}

export default CreateProduct