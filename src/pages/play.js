import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import FarmingButton from "./components/button";


import { useNavigate } from 'react-router-dom';

function Play() {

    const [farm, setFarm] = useState();
    const [user, setUser] = useState();
 
    const [qubic, setQubic] = useState();

    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const navigate = useNavigate();

    const fetchBalance = async (id) => {
        const url = `https://rpc.qubic.org/v1/balances/${id}`;
      
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    };

    useEffect(() => {
        const get = async () => {  
            try {
                const response = await request(`/user/farm`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (response.status) {
                    setFarm(response.farm);
                    setUser(response.user);
                }

                const balance = await fetchBalance(response.user.wallet)

                setQubic(parseInt(balance.balance.balance).toFixed(2))
            } catch (e) {}
        }

        get()
    }, [auth, request]);

    return (
        <>
            <div className="window">
                <div className="image"/>
                <h1 className="play_header">{user ? user.name : "Name"}</h1>
                <h1 className="play_header" style={{ fontSize: "26px" }}>{user ? user.coins.toFixed(2) : "Coins"} {user ? user.currency : "Currency"}</h1>
            
                <h1 className="play_header" style={{ fontSize: "26px" }}>{qubic ? qubic : "0"} QUBIC</h1>

                <div className="dj">
                    <div className="bottom">
                        <div className="info">
                            <div className="name">Egyptian Spiderman</div>
                            <div className="autor">R. Bou</div>
                        </div>
                        <span className="play" onClick={() => navigate("/game")}>Play</span>
                    </div>
                </div>

                <div style={{ width: "100%", height: "100px" }}></div>
            </div>
            {farm ? <FarmingButton lastUpdateTime={farm.updateTime} setFarm={setFarm} /> : <></>}
        </>
    );
}

export default Play;
