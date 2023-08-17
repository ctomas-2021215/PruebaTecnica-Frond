import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StudentTable.css'; // Importa tu archivo de estilos CSS personalizados
import {
  MDBBtn,
} from 'mdb-react-ui-kit';


export const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Student/get');
      setStudents(response.data);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Estudiantes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Carnet</th>
            <th>Nombre Completo</th>
            <th>Género</th>
            <th>Fecha de Nacimiento</th>
            <th>Carrera</th>
            <th>Género de Poesía</th>
            <th>Fecha de Inscripción</th>
            <th>Fecha del Concurso</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.carnet}</td>
              <td>{student.name}</td>
              <td>{student.genero}</td>
              <td>{student.fechaNa}</td>
              <td>{student.carrera}</td>
              <td>{student.generoPoe}</td>
              <td>{student.fechaIns}</td>
              <td>{student.fechaConcurso}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">
       <MDBBtn color='DARK' size='lg'>Return</MDBBtn>
      </Link>
    </div>
  );
};
