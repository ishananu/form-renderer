import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from 'react-bootstrap';
import './App.css';
import { camelCase, generateFormJson } from './common/helpers';
import InputField from './components/inputField/InputField';
import OptionField from './components/optionField/OptionField';
import RadioField from './components/radioField/RadioField';
import { getFormData } from './services/form.service';
import { IFormResponse, IJson } from './types';
const App = () => {
  const [inputFieldData, setInputFieldsData] = useState<IFormResponse[]>([]);
  const [formData, setFormData] = useState<Object>({});
  const [submittedData, setSubmittedData] = useState<IJson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // request form data from API
  const requestFormData = async () => {
    try {
      setLoading(true);
      const values: IFormResponse[] = await getFormData();
      setLoading(false);
      setInputFieldsData(values);
      const obj: any = {};
      values.forEach((val) => {
        if (val.label) {
          obj[camelCase(val.label)] = val.default || '';
        }
      });
      setFormData(obj);
    } catch (error) {}
  };

  // store values when inputs are changing / updating
  const handleInputChange = (e: any) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const generateJSON = (e: FormEvent) => {
    e.preventDefault();
    const objJSONArray: IJson[] = generateFormJson(inputFieldData, formData);
    setSubmittedData(objJSONArray);
  };

  const ErrorResponse = () => {
    return (
      <>
        <Alert show={true} variant='danger'>
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>
            There is an error with API response. Please check network connection
            and click the button below to request data again!
          </p>
          <hr />
          <div className='d-flex justify-content-end'>
            <Button onClick={requestFormData} variant='outline-danger'>
              Request form data again!
            </Button>
          </div>
        </Alert>
      </>
    );
  };

  const generateFormInputs = () => {
    return (
      <Fragment>
        {inputFieldData.map((values, i) => {
          return (
            <>
              {values &&
                (values.type === 'email' ||
                  values.type === 'telephone' ||
                  values.type === 'hidden') && (
                  <InputField
                    data={values}
                    key={`${values.type}-${i}`}
                    onChange={handleInputChange}
                    value={
                      values?.label &&
                      formData &&
                      (formData as any)[camelCase(values?.label)]
                    }
                  />
                )}

              {values && values.type === 'radio' && (
                <RadioField
                  data={values}
                  key={`${values.type}-${i}`}
                  onChange={handleInputChange}
                />
              )}

              {values && values.type === 'select' && (
                <OptionField
                  data={values}
                  key={`${values.type}-${i}`}
                  onChange={handleInputChange}
                />
              )}
            </>
          );
        })}
      </Fragment>
    );
  };

  useEffect(() => {
    requestFormData();
  }, []);

  return (
    <Container>
      <Row className='mt-3 mb-3'>
        <Col className='column-wrapper'>
          <Form onSubmit={generateJSON} noValidate>
            <div>{generateFormInputs()}</div>
            {loading ? (
              <div className='center-container'>
                <div className='vertical-center'>
                  <Spinner animation='grow' />
                </div>
              </div>
            ) : inputFieldData && inputFieldData.length > 0 ? (
              <div className='d-grid gap-2'>
                <Button variant='secondary' type='submit' size='lg'>
                  Submit form data
                </Button>
              </div>
            ) : (
              <ErrorResponse />
            )}
          </Form>
        </Col>
        <Col className='column-wrapper'>
          <p>Form values :</p>
          <code>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </code>

          <hr />
          <p>Submitted values :</p>
          <code>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </code>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
