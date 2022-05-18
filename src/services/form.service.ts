import { IFormResponse } from '../types';

const formAPI: string = 'https://ansible-template-engine.herokuapp.com/form';

const getFormData = async (): Promise<IFormResponse[]> => {
    try {
        const response = await fetch(formAPI);
        const values: IFormResponse[] = await response.json();
        if (!response.ok) throw values;
        return values;
    } catch (error) {
        console.error('something went wrong! Please refresh the page', error);
        return [];
    }
};

export { getFormData };