import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import FarmingButton from "./components/button";

import { useNavigate } from 'react-router-dom';

function Play() {

    const [farm, setFarm] = useState();
    const [user, setUser] = useState();

    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const navigate = useNavigate();

    useEffect(() => {
        const get = async () => {  
            try {
                const responseUser = await request(`/user`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (responseUser.status) {
                    setUser(responseUser.user);
                }
                
                const responseFarm = await request(`/user/farm`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (responseFarm.status) {
                    setFarm(responseFarm.farm);
                }
            } catch (e) {}
        }

        get()
    }, [auth, request]);

    return (
        <>
            <div className="window">
                {(user) ? <div className="image" style={{ background: user.photoUrl ? `url(${user.photoUrl})` : "" }}/> :
                    <div className="loader"/>}
            
                {user ? <>
                    <h1 className="play_header">{user ? user.name : "Name"}</h1>
                    <h1 className="play_header" style={{ fontSize: "26px" }}>{user ? user.coins.toFixed(2) : "Coins"} {user ? user.currency : "Currency"}</h1>
                </> : <>
                    <div className="loading-text" style={{ marginTop: "25px" }}>
                        <div className="shimmer"/>
                    </div>
                    <div className="loading-text" style={{ marginTop: "25px", height: "20px" }}>
                        <div className="shimmer"/>
                    </div>
                </>}
                

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
            {farm ? <>
                <FarmingButton lastUpdateTime={farm.updateTime} setFarm={setFarm} />
            </> : <>
                <div className="sticked_button" style={{ backgroundColor: "#212121" }}>
                    <div className="shimmer"/>
                </div>
            </>}
        </>
    );
}

export default Play;
