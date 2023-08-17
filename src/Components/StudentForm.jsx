    import React, { useState } from 'react';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { Link } from 'react-router-dom';


      import {
          MDBBtn,
          MDBContainer,
          MDBCard,
          MDBCardBody,
          MDBCardImage,
          MDBRow,
          MDBCol,
          MDBInput,
          MDBRadio,
      } from 'mdb-react-ui-kit';
      

    export const  StudentForm = () => {
    const [carnet, setCarnet] = useState('');
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNa, setFechaNa] = useState('');
    const [carrera, setCarrera] = useState('');
    const [generoPoe, setGeneroPoe] = useState('');
    const [declarationDate, setDeclarationDate] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

            const today = new Date();
            const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            // Convierte la fecha de nacimiento ingresada en un objeto Date
            const birthDate = new Date(fechaNa);

            if (birthDate > minBirthDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fecha de nacimiento inválida',
                    text: 'Debes tener al menos 18 años para registrarte como estudiante.',
                });
                return;
            }


        try {
        const response = await axios.post('http://localhost:3000/Student/addStudent', {
            carnet,
            name,
            direccion,
            genero,
            telefono,
            fechaNa,
            carrera,
            generoPoe,
        });
        Swal.fire({
            icon: 'success',
            title: 'Estudiante creado exitosamente',
            text: `La fecha de declamación es: ${response.data.student.fechaConcurso}`,
        });

        setDeclarationDate(response.data.student.fechaConcurso);

        // Limpiar los campos después de enviar el formulario
        setCarnet('');
        setName('');
        setDireccion('');
        setGenero('');
        setTelefono('');
        setFechaNa('');
        setCarrera('');
        setGeneroPoe('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear estudiante',
                text: 'Ha ocurrido un error al intentar crear el estudiante. Por favor, intenta nuevamente.',
            });
        }
    };

    return (
        <MDBContainer fluid className='bg-dark'>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol>
              <MDBCard className='my-4'>
                <MDBRow className='g-0'>
                  <MDBCol md='6' className="d-none d-md-block">
                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start" fluid/>
                  </MDBCol>
                  <MDBCol md='6'>
                    <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                      <h3 className="mb-5 text-uppercase fw-bold">Student registration form</h3>
                      <form onSubmit={handleSubmit}>
                        <MDBRow>
                          <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='Carnet' size='lg' id='carnet' type='text' value={carnet} onChange={(e) => setCarnet(e.target.value)} />
                          </MDBCol>
                          <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='Carrera' size='lg' id='carrera' type='text' value={carrera} onChange={(e) => setCarrera(e.target.value)} />
                          </MDBCol>
                          <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                          </MDBCol>
                          <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='genrePoetry' size='lg' id='generoPoe' type='text' value={generoPoe} onChange={(e) => setGeneroPoe(e.target.value)} />
                          </MDBCol>
                        </MDBRow>
                        <MDBInput wrapperClass='mb-4' label='Dirección' size='lg' id='direccion' type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                        <div className='d-md-flex justify-content-start align-items-center mb-4'>
                          <h6 className="fw-bold mb-0 me-4">Gender:</h6>
                          <MDBRadio name='genero' id='female' value='female' label='Female' inline onChange={(e) => setGenero(e.target.value)} />
                          <MDBRadio name='genero' id='male' value='male' label='Male' inline onChange={(e) => setGenero(e.target.value)} />
                        </div>
                        <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='telefono' type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='birth date' size='lg' id='fechaNa' type='date' value={fechaNa} onChange={(e) => setFechaNa(e.target.value)} />
                        <div className="d-flex justify-content-end pt-3">

                        <Link to="/login">
                        <MDBBtn color='DARK' size='lg'>LOGIN ADMIN PANEL</MDBBtn>
                        </Link>

                          <MDBBtn className='ms-2' color='warning' size='lg' type="submit">Submit form</MDBBtn>
                        </div>
                      </form>
                      {declarationDate && (
                        <div>
                          <p>Declaration Date: {declarationDate}</p>
                        </div>
                      )}
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }
