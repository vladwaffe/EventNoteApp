import React, { useState } from 'react';
import axios from 'axios';
import { useToken } from '../TokenContext';
import './login_reg.css'

const Register = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { setToken } = useToken();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/register/user', {
                name,
                password,
                email,
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
            <h2>Sing up</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <div>
                    <label  htmlFor="email">Email:</label>
                    <input
                        className="emailIn"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sing up</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Register;
