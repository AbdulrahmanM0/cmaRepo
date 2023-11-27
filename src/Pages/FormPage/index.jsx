import React from 'react'
import FormComponent from './Form'
import { Container } from 'reactstrap'

export default function Index() {
  return (
    <div className='form-page'>
        <Container>
            <div className='col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='form-container shadow-lg p-4 bg-body rounded'>
                    <FormComponent />
                </div>
            </div>
        </Container>
    </div>
  )
}
