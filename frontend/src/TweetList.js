import React from 'react';

const TweetList = ({ tweets, username }) => {

    const userTweets = tweets.filter(tweet => tweet.author === username);

    return (
        <div>
            {userTweets.length > 0 ? (
                userTweets.map((tweet, index) => (
                    <div key={index}>
                        <p>{tweet.content} - {tweet.author}</p>
                    </div>
                ))
            ) : (
                <p>Aucun tweet à afficher.</p> // Message si aucun tweet
            )}
        </div>
    );
};

export default TweetList;
