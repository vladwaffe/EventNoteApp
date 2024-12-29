import React, { useState } from 'react';
import axios from 'axios';
import { useToken } from '../TokenContext';
import './login_reg.css'

const Login = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken } = useToken();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/token', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data) {
                setToken(response.data);
                console.log("Token received:", response.data);
                closeModal();
            } else {
                console.error('Token not found in response:', response.data);
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="modal-content">
            <h2>Sing in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:  </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sing up</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
