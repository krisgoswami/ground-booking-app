import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const GoogleMap = ({ latitude, longitude, name }) => {
    const defaultCenter = {
        lat: latitude,
        lng: longitude
    };

    const [apiKey, setApiKey] = useState([]);

    const getApiKey = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/api-key`);
            if (data?.success) {
                setApiKey(data?.key);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getApiKey();
    }, []);

    return (
        <div style={{ height: '250px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultCenter}
                defaultZoom={15}
            >
                <div
                    lat={latitude}
                    lng={longitude}
                    text={name}
                />
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMap;
