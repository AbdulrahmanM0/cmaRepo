import React, { useEffect, useState } from 'react'
import FormComponent from './Form'
import { Container, Spinner } from 'reactstrap'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Index() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("Tr");
  const [loading,setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [errorMSG,setErrorMSG] = useState(false);
  const [projectDetails,setProjectDetails] = useState({
    ReferenceNo:'',
    ProjectID:''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('https://admin.cpvarabia.com/ZATCA/show_ZATCA_all.php',{Token:token})
        const data = response.data;
        if(data.error == false){
        setProjectDetails({ReferenceNo:data.ReferenceNo,ProjectID:data.ProjectID})
        delete data.ProjectID
        delete data.ReferenceNo
        setFormData(
          Object.keys(data)
            .filter((key) => key !== 'error')
            .map((key) => data[key])
            .sort((a, b) => a.QuestionOrder - b.QuestionOrder)
            );
            setLoading(false)
            setErrorMSG(false)
          }else{
            setLoading(false)
            setErrorMSG(true)
        }

      } catch (error) {
        console.log('ERROR:', error);
        setErrorMSG(true)
        setLoading(false)
      }
    }
    fetchData();
  }, [token]);


  return (
    <div className='form-page'>
      {loading ?
      <Container>
            <div className='col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='form-container shadow-lg p-4 bg-body rounded-bottom'>
                    <div className='text-center'><Spinner /></div>
                </div>
            </div>
        </Container>
      : <>
      {
        !errorMSG ?
      
        <Container>
            <div className='col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='bg-secondary text-white  p-4 form-title rounded-top'>
                  ZATCA Mandatory Address Requirement - متطلبات العنوان الإجبارية
                </div>
                <div className='form-container shadow-lg p-4 bg-body rounded-bottom'>
                <div className='fw-bold mb-3 pb-3 border-bottom'>ReferenceNo : {projectDetails.ReferenceNo}</div>
                    <FormComponent setErrorMSG={setErrorMSG} token={token} formData={formData} ProjectID={projectDetails.ProjectID}/>
                </div>
            </div>
        </Container>
        :
        <Container>
      <div className='col-lg-11 col-md-10 col-sm-12 m-auto mb-4'>
          <div className='bg-secondary text-white  p-4 form-title rounded-top fw-bold'>
              Error 404
          </div>
          <div className='form-container shadow-lg p-4 bg-body rounded-bottom d-flex align-items-center text-center justify-content-center' style={{height:'200px'}}>
              <h4>This page is Not Found</h4>
          </div>
      </div>
      </Container>
      }</>}
    </div>
  )
}
