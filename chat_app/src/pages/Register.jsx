import React, { useContext } from 'react';
import { Alert, Button, Form, Col, Stack, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Register() {
    const { setRegisterinfo, registerInfo, registerError, registerUser, isRegisterLoading } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterinfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        registerUser(e, registerInfo);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row style={{ justifyContent: 'center', height: "100vh", paddingTop: "10%" }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h4>Register</h4>
                            <Form.Control name='name' type="text" placeholder="Name" onChange={handleChange} />
                            <Form.Control name='email' type="email" placeholder="Email" onChange={handleChange} />
                            <Form.Control name='password' type="password" placeholder="Password" onChange={handleChange} />
                            <Button type="submit" className='mt-4' variant="success">{isRegisterLoading ? 'Creating account' : "Register"}</Button>{' '}
                            {registerError?.error && (
                                <Alert variant='danger'>
                                    <p>{registerError?.message}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Register;
