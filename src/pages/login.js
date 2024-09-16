import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const invitedBy = queryParams.get('invitedBy');
    const userId = queryParams.get('userId');
    const name = queryParams.get('name');
    const username = queryParams.get('username');
    const isBot = queryParams.get('isBot');
    const language = queryParams.get('language');

    const auth = useContext(AuthContext);
    const { request } = useHttp();


    useEffect(() => {
        const login = async () => {  
            try {
                const response = await request(`/user/login`, "POST", { invitedBy, userId, name, username, isBot, language });
                
                if (response.status) {
                    auth.login(response.token);
                    navigate("/");
                }
            } catch (e) {}
        }

        login()
    }, [auth, invitedBy, userId, name, username, isBot, language, navigate, request])

    return (
        <></>
    );
}

export default Login;