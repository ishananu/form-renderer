import React, { FC, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { camelCase } from '../../common/helpers';
import { IOptionField } from '../../types';

const OptionField: FC<IOptionField> = ({ data, onChange }) => {
  const formName = data?.label && camelCase(data?.label);
  return (
    <Fragment>
      <Form.Group className='mb-3' controlId={formName}>
        <Form.Label>{data.label} :</Form.Label>
        <Form.Select
          aria-label='Default select example'
          defaultValue={data.default}
          onChange={onChange}
          name={formName}
        >
          {Array.isArray(data.value) &&
            data.value.map((val, i) => {
              return (
                <option value={val} key={val}>
                  {val}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
    </Fragment>
  );
};

export default OptionField;
