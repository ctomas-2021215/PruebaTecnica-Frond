import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, createContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './Pages/loginPage/LoginPage';
import  {PrincipalPage} from './Pages/PrincipalPage/PrincipalPage'
import { ReportePage } from './Pages/ReportePage/ReportPage';
import App from './App';


export const AuthContext = createContext();


export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({

        name: '',
        surname: '',
        username: '',
        age: '',
        email: '',
        role: '',

    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)


        //mantener sesion
        let user = JSON.parse(localStorage.getItem('lario'))
        if (user) {
            setDataUser(user)
        }
    }, [])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,

            children: [
                {
                    path: '/',
                    element: <PrincipalPage />

                },
                {
                    path: '/login',
                     element: <LoginPage></LoginPage>
                },
                {
                    path: '/report',
                    element: <ReportePage/>
                },

            ]


        }])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}