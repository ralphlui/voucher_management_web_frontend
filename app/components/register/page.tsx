import React from 'react'
import Container from '../Container'
import FormWrap from '../common/FormWrap'
import RegisterForm from './RegisterForm'

const page = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm />
            </FormWrap>
        </Container>
    )
}

export default page