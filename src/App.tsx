import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/inputField/InputField';
interface IFormReponse {
  label: string;
  type: string;
  value: any;
  isHidden?: boolean;
  isOptional?: boolean;
}

const App = () => {
  const [formData, setFormData] = useState<IFormReponse[]>([]);

  const getFormData = async () => {
    try {
      const response = await fetch(
        'https://ansible-template-engine.herokuapp.com/form'
      ).then((res) => res.json());
      console.log('response ', response);
      setFormData(response);
    } catch (error) {
      console.error('something went wrong! ', error);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);
  return (
    <div className="app">
      <div className="login-root">
        <div className="box-root flex-flex flex-direction--column">
          <div className="loginbackground box-background--white padding-top--64">
            <div className="formbg">
              <form action="">
                <InputField values={{ type: 'email', value: '', label: '' }} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
