import React from 'react'
import FormComponent from './Form'
import { Container } from 'reactstrap'

export default function Index() {
  return (
    <div className='form-page'>
        <Container>
            <div className='col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='bg-secondary text-white  p-4 form-title rounded-top'>
                  ZATCA Mandatory Address Requirement - متطلبات العنوان الإجبارية
                </div>
                <div className='form-container shadow-lg p-4 bg-body rounded-bottom'>
                    <FormComponent />
                </div>
            </div>
        </Container>
    </div>
  )
}
