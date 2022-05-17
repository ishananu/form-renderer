import React, { FC, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { camelCase } from '../../common/helpers';
import { IRadioField } from '../../types';

const RadioField: FC<IRadioField> = ({ data, onChange }) => {
  const formName = data?.label &&  camelCase(data?.label);
  return (
    <Fragment>
      <Form.Group className='mb-3' controlId={formName}>
        <Form.Label>{data.label} :</Form.Label>
        {Array.isArray(data.value) &&
          data.value.map((val, i) => {
            return (
              <Form.Check
                label={val}
                type='radio'
                value={val}
                name={formName}
                key={`inline-${data.type}-${i}`}
                onChange={onChange} className='text-muted'
              />
            );
          })}
      </Form.Group>
    </Fragment>
  );
};

export default RadioField;
