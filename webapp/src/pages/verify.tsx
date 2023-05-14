import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

const VERIFIER_BASE_URL = "http://localhost:8080";

export default function Verify() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(VERIFIER_BASE_URL + '/api/sign-in', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.error('Error:', response.statusText);
                return;
            }
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            Verify
            <QRCode value={JSON.stringify(data)} size={350}/>
        </div>
    );
}

