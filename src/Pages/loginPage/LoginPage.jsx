import React from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../..';
import axios from 'axios'
import { useContext , useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox

    
  }
  from 'mdb-react-ui-kit';

export const LoginPage = () => {

  const {loggedIn , setLoggedIn , setDataUser} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
      username: '',
      password: ''
    })


    const handleChange = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }




      const logIn = async(e)=>{
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3000/user/login',form)
            console.log(data.user)
            if(data.message){
                Swal.fire({
                    icon: 'success',
                    title: 'Logged In!',
                    text: 'Welcome'
                })
                localStorage.setItem('token',data.token)
                setDataUser(data.userLogged)
                setLoggedIn(true)
                localStorage.setItem('lario',JSON.stringify(data.userLogged))
                navigate('/report')
                

            }
        }catch (err) {
           console.log(err)
           Swal.fire({
            title: 'Error',
            text: 'There might be some Credentials that are Invalid',
            icon: 'error',
            timer: 3500
           }) 
        }
    }
    

      
  return (
    <>
    <br></br>
    <span> </span>
    <br></br>
    <br></br>
    <br></br>
    <MDBContainer fluid className="my-5">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Log in</h2>
              <p className="mb-3 text-center">Please enter your Credentials 
              to log in</p>
              
              <MDBInput onChange={handleChange} wrapperClass='mb-4'name='username' className='form-control' label='username' type="text" size="lg" required/>
              <MDBInput onChange={handleChange} wrapperClass='mb-4'name='password' className='form-control' label='password'  type='password' size="lg" required/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn onClick={(e)=> logIn(e)}  className="mb-4 px-5" color='danger' size='lg'>Login</MDBBtn>

              <hr className="my-4" />

              Welcome to 
             <MDBContainer fluid >
             </MDBContainer>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>


    </MDBContainer>


    </>
    
  )
}