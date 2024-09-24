import React, { useState } from 'react';
import axios from 'axios';

const TweetForm = ({ addTweet, username }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTweet = { content, author: username }; // Inclut l'auteur

        try {
            await axios.post('http://localhost:5001/tweets', newTweet);
            addTweet(newTweet); // Ajoute le nouveau tweet à la liste locale
            setContent('');
        } catch (error) {
            console.error('Error adding tweet:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Quoi de neuf ?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Tweeter</button>
        </form>
    );
};

export default TweetForm;
