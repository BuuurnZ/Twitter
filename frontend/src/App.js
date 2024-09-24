import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TweetList from './TweetList';
import TweetForm from './TweetForm';
import Register from './Register';
import Login from './Login';
import './App.css';
import axios from 'axios';

const App = () => {
    const [tweets, setTweets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchTweets = async () => {
        try {
            const response = await axios.get('http://localhost:5001/tweets');
            setTweets(response.data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    useEffect(() => {
        fetchTweets(); 
    }, []);

    const addTweet = (newTweet) => {
        setTweets((prevTweets) => [...prevTweets, newTweet]); 
    };

    return (
        <Router>
            <div className="container">
                <h1>Twitter Clone</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
                {currentUser === null && <p>Vous êtes déconnecté. Veuillez vous connecter.</p>}
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setCurrentUser} />} />
                    <Route path="/" element={
                        <>
                            {currentUser && <TweetForm addTweet={addTweet} username={currentUser.username} />}
                            <TweetList tweets={tweets} username={currentUser ? currentUser.username : null} />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
