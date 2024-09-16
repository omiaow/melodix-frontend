import React, { useState } from 'react';

function Wallet() {

    const [qubic, setQubic] = useState();
    
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

    return (
        <h1 className="play_header" style={{ fontSize: "26px" }}>{qubic ? qubic : "0"} QUBIC</h1>
    );
}

export default Wallet;