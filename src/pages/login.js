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

    const [token, setToken] = useState('');

    const [button, setButton] = useState('Submit');
    const [wallet, setWallet] = useState('');

    const submit = async () => {
        try {
            const url = `https://rpc.qubic.org/v1/balances/${wallet}`;
            
            const checkToken = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!checkToken.ok) {
                throw new Error(`Error: ${checkToken.status}`);
            }

            const response = await request(`/user/wallet`, "POST", { wallet: wallet }, {
                authorization: `Bearer ${token}`
            });
            
            if (response.status) {
                auth.login(token);
                navigate("/");
            }
        } catch (error) {
            setButton("Wrong wallet, try again");
        }
    };

    useEffect(() => {
        const login = async () => {  
            try {
                const response = await request(`/user/login`, "POST", { invitedBy, userId, name, username, isBot, language });
                
                if (response.status) {
                    setToken(response.token);
                }

                if (!response.user) {
                    auth.login(response.token);
                    navigate("/");
                }
            } catch (e) {}
        }

        login()
    }, [auth, invitedBy, userId, name, username, isBot, language, navigate, request])

    return (
        <>
            <div className="window" style={{ height: "100vh" }}/>
            <input 
                type="text"
                className="sticked_text_input"
                value={wallet} 
                onChange={(e) => setWallet(e.target.value)} 
                placeholder="Enter your Qubic wallet"
            />
            <div
                className="sticked_button"
                style={{ marginTop: "20px" }}
                onClick={submit}
                >{button}</div>
        </>
    );
}

export default Login;