import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await axios.post('http://localhost:5001/register', {
                    username,
                    password,
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.message || 'Error during registration');
            }
        } else {
            setMessage('Veuillez entrer un nom d\'utilisateur et un mot de passe.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">S'inscrire</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
