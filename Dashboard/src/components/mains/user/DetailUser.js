import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainDetailUser from './MainDetailUser';

const DetailUser = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3030/api/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log("Error: ", err));
    }, []);

    return (
        <MainDetailUser
            user={user}
        />
    );
}

export default DetailUser;
