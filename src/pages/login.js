import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');

    const auth = useContext(AuthContext);

    auth.logout();
    auth.login(token);
    navigate("/");

    return (
        <></>
    );
}

export default Login;