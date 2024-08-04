import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function NavBar() {

    const { user, logoutUser } = useContext(AuthContext);

    return (
        <Navbar bg="dark" className='mb-4' data-bs-theme="dark">
            <Container>
                <Link to={'/'} className='link-light text-decoration-none'><h2>Navbar</h2></Link>
                {user?.name ? <span className='text-warning'>Logged in as {user?.name} </span> : ''}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {
                            user ? <Link className='link-light text-decoration-none' onClick={logoutUser}>Logout</Link> :
                                <>
                                    <Link className='link-light text-decoration-none' to={'/login'}>Login</Link>
                                    <Link className='link-light text-decoration-none' to={'/register'}>Register</Link>
                                </>
                        }
                    </Stack>
                </Nav>
            </Container>

        </Navbar>
    )
}

export default NavBar
