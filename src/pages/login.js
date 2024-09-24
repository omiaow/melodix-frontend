import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const invitedBy = queryParams.get('invitedBy');
    const tgUserId = queryParams.get('tgUserId');
    const name = queryParams.get('name');
    const username = queryParams.get('username');
    const isBot = queryParams.get('isBot');
    const language = queryParams.get('language');
    const photoUrl = queryParams.get('photoUrl');

    const auth = useContext(AuthContext);
    const { request } = useHttp();


    useEffect(() => {
        const login = async () => {
            try {
                const response = await request(`/user/login`, "POST", { invitedBy, tgUserId, name, username, isBot, language, photoUrl });
                
                if (response.status) {
                    auth.login(response.token);
                    navigate("/");
                }
            } catch (e) {}
        }

        login()
    }, [auth, invitedBy, tgUserId, name, username, isBot, language, photoUrl, navigate, request])

    return (
        <></>
    );
}

export default Login;