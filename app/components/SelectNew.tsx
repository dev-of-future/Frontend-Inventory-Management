import React from 'react';
import Select from "react-tailwindcss-select";
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

interface SelectProps {
  style?: string;
  data: any[];
  text: string;
  onChange: (value: SelectValue) => void;
  value: any | null;
  name: string;
}

const SelectNew = ({ style, data, text, onChange, value, name }: SelectProps) => {
  return (
    <Select
      value={value}
      primaryColor={"indigo"}
      onChange={onChange}
      options={data.map((item) => ({ value: item.id, label: item.name }))}
    />
    // <select name={name} onChange={onChange} value={value} className={`select select-secondary w-full ${style}`}>
    //   <option disabled defaultValue={text}>
    //     {text}
    //   </option>
    //   {data.map((item) => (
    //     <option value={item.id} key={item.id}>{item.name}</option>
    //   ))}
    // </select>
  );
};

export default SelectNew;
