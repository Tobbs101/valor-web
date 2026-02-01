import React from "react";
import Select, { StylesConfig, GroupBase } from "react-select";
import "./style.css";

export interface DropdownOptionType {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  width?: string;
  value: DropdownOptionType | DropdownOptionType[] | null;
  onChange: (
    selected: DropdownOptionType | DropdownOptionType[] | null
  ) => void;
  options: DropdownOptionType[];
  isMulti: boolean;
  defaultValue?: DropdownOptionType | DropdownOptionType[];
  placeholder?: string;
}

const customStyles: StylesConfig<
  DropdownOptionType,
  true,
  GroupBase<DropdownOptionType>
> = {
  option: (provided, state) => ({
    ...provided,
    padding: 10,
    backgroundColor: state.isFocused ? "#e2e3e5" : "white",
    color: "black",
    fontSize: "14px",
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #40196D" : "1px solid #e2e3e5",
    outline: "none",
    boxShadow: state.isFocused ? "0 0 0 transparent" : provided.boxShadow,
  }),
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  width,
  value,
  onChange,
  options,
  isMulti,
  defaultValue,
  placeholder = "",
}) => {
  return (
    <div className={width ? width : "w-[200px]"}>
      <Select
        isSearchable={true}
        maxMenuHeight={220}
        options={options}
        className="custom-dropdown focus:ring-0 focus:outline-none"
        classNamePrefix="dropdown"
        styles={customStyles}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        onChange={(selected) =>
          onChange(selected as DropdownOptionType | DropdownOptionType[] | null)
        }
        isMulti={true}
        isClearable={false}
        closeMenuOnSelect={!isMulti}
      />
    </div>
  );
};

export default CustomDropdown;
