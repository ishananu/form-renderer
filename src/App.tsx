import React, { FormEvent, useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './App.css';
import { camelCase } from './common/helpers';
import InputField from './components/inputField/InputField';
import OptionField from './components/optionField/OptionField';
import RadioField from './components/radioField/RadioField';
import { IFormResponse } from './types';
const App = () => {
  const [inputFieldData, setInputFieldsData] = useState<IFormResponse[]>([]);
  const [formData, setFormData] = useState<Object>({});

  const getFormData = async () => {
    try {
      const response = await fetch(
        'https://ansible-template-engine.herokuapp.com/form'
      );
      const values: IFormResponse[] = await response.json();
      if (!response.ok) throw values;
      console.log('response ', values);
      setInputFieldsData(values);

      const obj: any = {};
      values.map((val) => {
        if (val.label) {
          obj[camelCase(val.label)] = val.default || '';
        }
      });
      console.log('obj ', obj);
      setFormData(obj)
    } catch (error) {
      console.error('something went wrong! Please refresh the page', error);
    }
  };

  const handleInputChange = (e: any) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const generateJSON = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted');
    console.log('formData ', formData);
    console.log("sss ", e);
    const elements = (e.target as any).elements;

    const obj = []
    inputFieldData.map((values, i) => {
      if(!values.isHidden) {
        const formName = values?.label && camelCase(values?.label) as string;
        formName && console.log("elements?[formName] ", elements[formName]?.validity?.valid);
      }


      // const ob: any = { };

      // ob['label']= values.label;
      // // ob['value'] = formData?[formName];
      // ob['isValid']= (elements?[formName] as any).validity.valid

      // return null;
    })

  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className='app'>
      <Container>
        <Row className='mt-3'>
          <Col style={{border: '1px solid black', padding: 20, borderRadius: 10}}>
            <Form onSubmit={generateJSON} noValidate>
              <div>
                {inputFieldData &&
                  inputFieldData.map((values, i) => {
                    if (
                      values &&
                      (values.type === 'email' ||
                        values.type === 'telephone' ||
                        values.type === 'hidden')
                    ) {
                      return (
                        <InputField
                          data={values}
                          key={`${values.type}-${i}`}
                          onChange={handleInputChange}
                          value={values?.label && formData && (formData as any)[camelCase(values?.label)]}
                        />
                      );
                    }

                    if (values && values.type === 'radio') {
                      return (
                        <RadioField
                          data={values}
                          key={`${values.type}-${i}`}
                          onChange={handleInputChange}
                        />
                      );
                    }

                    if (values && values.type === 'select') {
                      return (
                        <OptionField
                          data={values}
                          key={`${values.type}-${i}`}
                          onChange={handleInputChange}
                        />
                      );
                    }
                  })}
              </div>
              <div className="d-grid gap-2">
              <Button variant='secondary' type='submit' size="lg">
                Submit form data
              </Button>
              </div>
            </Form>
          </Col>
          <Col style={{border: '1px solid black', padding: 20, borderRadius: 10, marginLeft: 10}}>
            <code>
              <pre>
                {JSON.stringify(
                  formData,
                  null,
                  2
                )}
              </pre>
            </code>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
