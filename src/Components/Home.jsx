import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Home = () => {
    const [name, setName] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/v1/admin/hi');
                console.log(data.data);
                setName(data);
            } catch (e) {
                setNavigate(true);
            }
        })();
    }, []);

    const logout = async () => {
       const data = await axios.post('/v1/auth/logout', {}, { withCredentials: true })
        console.log(data.data);
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="form-signin mt-5 text-center">
            <h3>Hi {name}</h3>

            <a href="#" className="btn btn-lg btn-primary" onClick={(e) => {
                e.preventDefault();
                logout();
            }}>
                Logout
            </a>
        </div>
    );
}
