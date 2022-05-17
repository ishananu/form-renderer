import { ChangeEvent } from 'react';

interface IFormResponse {
  label?: string;
  type: string;
  value: string[] | string;
  isHidden?: boolean;
  isOptional?: boolean;
  default?: string
}


interface IInputField {
    data: IFormResponse;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string
  }

  interface IRadioField {
    data: IFormResponse
    onChange: (e: any) => void;
  }

  interface IOptionField {
    data: IFormResponse
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  }

  export type {IInputField, IRadioField, IOptionField, IFormResponse}