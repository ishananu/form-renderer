import { IFormResponse, IJson } from '../types';

const camelCase = (str: string) => {
    return str
        .replace(/\s(.)/g, function (a) {
            return a.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (b) {
            return b.toLowerCase();
        });
};

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validatePhoneNumber = (phoneNo: string) => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phoneNo);
};

const generateFormJson = (inputFieldData: IFormResponse[], formData: Object): IJson[] => {
    const objArray: IJson[] = [];
    inputFieldData.forEach((value, i) => {
        if (!value.isHidden) {
            const formName = value?.label && (camelCase(value?.label) as string);
            if (formName) {
                let isValid: boolean = true;
                const formValue = (formData as any)[formName];

                if (!value.isOptional) {
                    isValid = !!formValue;
                }

                if (value.type === 'email') {
                    isValid = validateEmail(formValue);
                }

                if (value.type === 'telephone') {
                    isValid = validatePhoneNumber(formValue);
                }

                const obj: IJson = {
                    label: value.label,
                    value: formValue,
                    isValid,
                };
                objArray.push(obj);
            }
        }
    });
    return objArray;
};

export { camelCase, validateEmail, generateFormJson, validatePhoneNumber };