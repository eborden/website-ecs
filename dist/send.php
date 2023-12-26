<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $msg = filter_var($_POST['question'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

  if (!$msg) {
    http_response_code(400);
    die('Bad msg');
  }
  if (!$email) {
    http_response_code(400);
    die('Bad email');
  }
  if ($_POST['name']) {
    http_response_code(400);
    die('Honeypot filled');
  }

  $headers = "From: website@evan-borden.com\nReply-To: $email";
  mail("evan@evan-borden.com", "Website Form", wordwrap($msg, 70), $headers);

  echo("Sent!");
}
?>
