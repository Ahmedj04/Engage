import React from "react";
import LineLoader from "../loaders/lineloader";

const DropDown = ({
  label,
  visible,
  defaultValue,
  onChangeAction,
  color,
  req,
  options = [],

}) => {
  return (
    <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
        <label
          className={`text-sm font-medium ${color?.text} block mb-2`}
          htmlFor="grid-password"
        >
          {label} 
          {req === true ? <span style={{ color: "#ff0000" }}>*</span> : <></>}
        </label>
        <div className={visible === 0 ? "block w-auto" : "hidden"}>
          <LineLoader />
        </div>
        <div className={visible === 1 ? "block" : "hidden"}>
          <select
            data-testid="test_property_category"
            className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
            onChange={(e) =>
             onChangeAction(e)
            }
            required
          >
            <option defaultValue={defaultValue} disabled selected>
              {defaultValue}
            </option>
            {options.map((i, Index) => {
              return (
                <option key={Index} value={i?.value}>
                  {i?.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
