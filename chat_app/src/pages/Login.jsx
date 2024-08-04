import React, { useContext } from 'react';
import { Alert, Button, Form, Col, Stack, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Login() {

  const { loginUserFunction,
    loginInfo,
    loginError,
    isLoginLoading,
    setLoginInfo } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSet(name, value);
  }

  const handleSet = (name, value) => {
    setLoginInfo((prev)=>({
      ...prev,
      [name] :value
    }))

  }

  const handleSubmit = (e)=>{
    loginUserFunction(e,loginInfo);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} >
        <Row style={{ justifyContent: 'center', height: "100vh", paddingTop: "10%" }}  >
          <Col xs={6}  >
            <Stack gap={3}>
              <h4>Login</h4>
              <Form.Control name='email' type="email" placeholder="Email" onChange={handleChange} />
              <Form.Control name='password' type="password" placeholder="Password" autoComplete='true' onChange={handleChange} />
              <Button type="submit" className='mt-4' variant="success">{isLoginLoading ? 'Getting you in...' :'Login'}</Button>{' '}
             {
              loginError &&
              <Alert variant='danger'>
                {
                  loginError?.message
                }
              </Alert> 
             }
            </Stack>
          </Col>
        </Row>

      </Form>

    </>
  )
}

export default Login;