<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $date = trim($_POST["date"]);
    $department = trim($_POST["department"]);
    $consultant = trim($_POST["consultant"]);
    $message = trim($_POST["message"]);

    $to = "info@vow-tech.com";
    $cc = "support@vow-tech.com";

    $subject = "New Appointment Request from $name";

    $body = "You have received a new appointment request:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Date & Time: $date\n";
    $body .= "Department: $department\n";
    $body .= "Consultant: $consultant\n";
    $body .= "Message: $message\n";

    $headers = "From: $email\r\n";
    $headers .= "CC: $cc\r\n";

    if(mail($to,$subject,$body,$headers)){
        echo "OK";
    } else {
        http_response_code(500);
        echo "There was an error sending your appointment request.";
    }
} else {
    http_response_code(403);
    echo "Forbidden: You cannot access this page directly.";
}
?>
