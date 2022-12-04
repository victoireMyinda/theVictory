import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = () => {

    const [data, setData] = useState()
    const getData = async () => {
        const response = await axios.get(`http://localhost:9000/api/user`);

        setData(response.data);
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>

        </div>
    );
};

export default AddUser;