<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_scores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$user = $conn->real_escape_string($data['username']);
$points = (int)$data['points'];

$sql = "INSERT INTO scores (username, points) VALUES ('$user', $points)";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
