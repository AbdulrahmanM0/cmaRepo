import React from 'react'
import FormComponent from './Form'
import { Container } from 'reactstrap'

export default function Submited() {
  return (
    <div className='form-page'>
        <Container>
            <div className='col-lg-6 col-md-10 col-sm-12 m-auto'>
                <div className='form-container shadow-lg p-4 bg-body rounded text-center'>
                    <i className="bi bi-check-circle-fill" style={{fontSize:'60px'}}></i>
                    <h4>You have submitted successfully.</h4>
                </div>
            </div>
        </Container>
    </div>
  )
}
