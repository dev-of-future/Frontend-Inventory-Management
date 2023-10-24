import React, { useEffect, useState } from 'react';

interface SelectProps {
  style?: string;
  data: any[];
  text: string;
  onChange: (event: any) => void;
  value: any;
  name: string;
}

const Select = ({ style, data, text, onChange, value, name }: SelectProps) => {
  // const [currValue, setCurrValue] = useState(value)
  // useEffect(() => { setCurrValue(value) }, [value])
  // const handleChange = (event: any) => {
  //   setCurrValue(event.target.value)
  //   onChange(event)
  // }

  return (
    <>
      <select name={name} onChange={onChange} value={value} className={`select select-secondary w-full max-w-xs ${style}`}>
        <option disabled>
          {text}
        </option>
        {data.map((item) => (
          <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
