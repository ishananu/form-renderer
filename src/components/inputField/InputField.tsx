import React, { FC, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { camelCase } from '../../common/helpers';
import { IInputField } from '../../types';

const InputField: FC<IInputField> = ({ data, onChange, value }) => {
  const formName = data?.label && camelCase(data?.label);
  return (
    <Fragment>
      <Form.Group className='mb-3' controlId={formName}>
        {data.type !== 'hidden' && <Form.Label>{data.label} :</Form.Label>}

        {data.type !== 'telephone' ? (
          <Form.Control
            type={data.type}
            // value={value || ''}
            required={data.isOptional}
            onChange={onChange}
            name={formName}
          />
        ) : (
          <Form.Control
            type={'tel'}
            required={data.isOptional}
            name={formName}
            // value={value || ''}
            // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            onChange={onChange}
          />
        )}
        {(data.type === 'email' || data.type === 'telephone') && (
          <Form.Text className='text-muted'>
            {data.type === 'email' &&
              "We'll never share your email with anyone else."}
            {data.type === 'telephone' &&
              'Format should be like (123) 456-7890 or (123)456-7890 or 123-456-7890 or 1234567890.'}
          </Form.Text>
        )}
      </Form.Group>
    </Fragment>
  );
};

export default InputField;
