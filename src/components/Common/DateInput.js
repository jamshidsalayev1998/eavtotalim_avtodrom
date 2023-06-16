import React from "react";
import { Input } from "antd";
import InputMask from "react-input-mask";

const DateInput = () => {
  return (
    <InputMask mask="9999-99-99" placeholder="YYYY-MM-DD">
      {inputProps => <Input {...inputProps} />}
    </InputMask>
  );
};

export default DateInput;
