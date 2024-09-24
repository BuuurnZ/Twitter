import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await axios.post('http://localhost:5001/login', {
                    username,
                    password
                });
                if (response.data.success) {
                    setIsLoggedIn({ username });
                    navigate('/'); // Rediriger vers la page d'accueil
                } else {
                    alert('Connexion échouée. Vérifiez vos identifiants.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                alert('Erreur lors de la connexion.');
            }
        } else {
            alert('Veuillez entrer un nom d\'utilisateur et un mot de passe.');
        }
    };
    
    return (
        <form onSubmit={handleLogin}>
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
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default Login;
