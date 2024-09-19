import React, { useEffect } from "react";

const SelectField = (props) => {
    return (
        <div>
            <select className="form-select" aria-label="Default select example" value={props.value || ""}
                onChange={(event) => { props.setValue(prev => ({ ...prev, [props.nameKey]: event.target.value })) }}>
                <option value={""}>Chọn</option>
                {props.options && props.options.length > 0 && props.options.map((option, index) => {
                    return (
                        <option value={option[props.nameKey]} key={`optionSlect-${index}`}>{option[props.nameKey]}</option>
                    )
                })}
            </select>
            {props.errors && props.errors[props.nameKey] && <small className="text-danger ms-1">{props.errors[props.nameKey]}</small>}
        </div>
    )
}

export default SelectField