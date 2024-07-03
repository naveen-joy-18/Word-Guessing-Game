MySQL Database Setup
Create a Database (already done):


CREATE DATABASE game_scores;


Create a Table:

USE game_scores;

CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    points INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Explanation of the Table Columns
id: A unique identifier for each score entry. It auto-increments with each new entry.
username: The name of the user who played the game.
points: The points scored by the user.
created_at: A timestamp indicating when the score was recorded. It defaults to the current timestamp when a new entry is created.
