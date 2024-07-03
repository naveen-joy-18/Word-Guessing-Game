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

$sql = "SELECT username, points FROM scores ORDER BY points DESC LIMIT 5";
$result = $conn->query($sql);

$scores = array();
while($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

echo json_encode($scores);

$conn->close();
?>
