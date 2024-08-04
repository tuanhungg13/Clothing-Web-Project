import React, { useEffect } from "react";

const SelectField = (props) => {
    return (
        <div>
            <select className="form-select" aria-label="Default select example" value={props.value}
                onChange={(event) => { props.setValue(prev => ({ ...prev, [props.nameKey]: event.target.value })) }}>
                {props.options.map((option, index) => {
                    return (
                        <option value={option}>{typeof option !== "string" ? JSON.stringify(option) : option}</option>
                    )
                })}

            </select>
        </div>
    )
}

export default SelectField