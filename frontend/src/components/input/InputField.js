import React from "react";

const InputField = (props) => {
    return (
        <div>
            <input
                type={props.type || "text"}
                className={`form-control ${props.errors && props.errors[props.nameKey] ? "is-invalid" : ""}`}
                placeholder={props.placeholder || props.nameKey.slice(0, 1).toUpperCase() + props.nameKey.slice(1)}
                value={props.value}
                disabled={props.disabled || false}
                onChange={(e) => { props.setValue(prev => ({ ...prev, [props.nameKey]: e.target.value })) }}
            />
            {props.errors && props.errors[props.nameKey] && <small className="text-danger ms-2">{props.errors[props.nameKey]}</small>}
        </div>
    )
}

export default InputField