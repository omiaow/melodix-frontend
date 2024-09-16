import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";

const FarmingButton = ({ lastUpdateTime, setFarm }) => {
  const [timeLeft, setTimeLeft] = useState(8 * 60 * 60 * 1000); // 8 hours in milliseconds
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    const lastUpdate = new Date(lastUpdateTime);
    const updateTimer = () => {
      const now = new Date();

      const elapsedTime = now - lastUpdate;
      const timeRemaining = Math.max(8 * 60 * 60 * 1000 - elapsedTime, 0); // 8 hours in milliseconds
      
      setTimeLeft(timeRemaining);
      setIsButtonActive(timeRemaining === 0);
    };

    updateTimer(); // Initial call to set the state based on the initial render

    const intervalId = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [lastUpdateTime]);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const progressPercentage = ((8 * 60 * 60 * 1000 - timeLeft) / (8 * 60 * 60 * 1000)) * 100;

  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const update = async () => {
    const response = await request(`/user/farm`, "PUT", null, {
      authorization: `Bearer ${auth.token}`
    });
    
    if (response.status) {
      setFarm(response.farm);
    }
  }


  return (
    <div 
      className="sticked_button"
      style={{ overflow: 'hidden' }}
      disabled={!isButtonActive}
      onClick={() => update()}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${100 - progressPercentage}%`,
          height: '100%',
          backgroundColor: '#888686',
          zIndex: 0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>
        {isButtonActive ? 'Start Farming' : `Left to Farm: ${hours}h ${minutes}m ${seconds}s`}
      </span>
    </div>
  );
};

export default FarmingButton;
