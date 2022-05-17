import React, { FC, useEffect, useState } from 'react';

interface IInputField {
  values: {
    label: string;
    type: string;
    value: string;
    isHidden?: boolean;
    isOptional?: boolean;
  };
}

const InputField: FC<IInputField> = ({ values }) => {
  return <input type={values.type}></input>;
};

export default InputField;
