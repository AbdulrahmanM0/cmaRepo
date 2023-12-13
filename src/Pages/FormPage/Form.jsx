import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Button, Input, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function FormComponent() {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://admin.cpvarabia.com/ZATCA/show_ZATCA_all.php');
        const data = response.data;
        setFormData(
          Object.keys(data)
            .filter((key) => key !== 'error')
            .map((key) => data[key])
            .sort((a, b) => a.QuestionOrder - b.QuestionOrder)
        );
      } catch (error) {
        console.log('ERROR:', error);
      }
    }
    fetchData();
  }, []);

  function validateYupSchema() {
    let schema = {};
    formData.forEach((question) => {
      const { Input, Required, Type, min, max } = question;
      switch (Type) {
        case 'dropdown':
          schema[Input] = Required ? Yup.string().required('*Required') : Yup.string();
          break;
        case 'text':
          schema[Input] = Required ? Yup.string().required('*Required') : Yup.string();
          break;
        case 'number':
          schema[Input] = Required
            ? Yup.number().typeError('Must be a number').min(min, `Min ${min}`).max(max, `Max ${max}`).required('*Required')
            : Yup.number().typeError('Must be a number').min(min, `Min ${min}`).max(max, `Max ${max}`);
          break;
        default:
          break;
      }
    });
    return schema;
  }

  const initialValues = {};
  formData.forEach((question) => {
    initialValues[question.Input] = '';
  });

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    isValid,
    setTouched
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(validateYupSchema()),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);

      axios.post('https://admin.cpvarabia.com/ZATCA/AddZATCA.php',values)
      .then(response => 
        navigate('/complete')
        )
      .catch(error => console.log(error))
    }
  });

  useLayoutEffect(() => {
    const initialTouchedState = {};
    Object.keys(initialValues).forEach((key) => {
      initialTouchedState[key] = true;
    });
    setTouched(initialTouchedState);
  }, [isValid]);

  return (
    <div>
      {formData.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {formData.map((question) => {
            const questionName = question.Input;
            return (
              <div className='form-group mb-4' key={question.QuestionOrder}>
                <label htmlFor={questionName} className='d-flex justify-content-between mb-2'>
                  <span>{question.QuestionOrder + "- "}{question.Required ?<>{question.QTitleEN + ' - ' + question.QTitleAR }<span className="text-danger"> *</span> </>: question.QTitleEN + ' - ' + question.QTitleAR}</span>
                  {touched[questionName] && errors[questionName] && (
                    <span className='form-text text-danger font-size-11'>{errors[questionName]}</span>
                  )}
                </label>
                { question.Type === "dropdown" ? 
                <Input 
                  type='select'
                  className='custom-number-input Q-input font-size-12'
                  onChange={(event) => {handleChange(event)}}
                  value={values[questionName]}
                  name={questionName}
                >
                  <option value={''}>
                    {question.placeholder ? question.placeholder : 'Select State - إختر محافظة' }
                  </option>
                  {question.item.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                :
                <Input
                  className='custom-number-input Q-input font-size-12'
                  type={question.Type}
                  placeholder={question.Type === "number" ? `Number must be between ${question.min} ~ ${question.max}` : question.placeholder}
                  name={questionName}
                  onChange={handleChange}
                  value={values[questionName] || ''}
                />
                }
              </div>
            );
          })}
          {!isValid &&
          <div className='text-danger font-size-12'>
            {"You must complete the required questions ."}
          </div>
          }
          <div className='text-end m-4 me-5'>
            <Button type='submit' disabled={!isValid}>
              Submit
            </Button>
          </div>
        </form>
      ): <div className='text-center'><Spinner /></div>}
    </div>
  );
}
