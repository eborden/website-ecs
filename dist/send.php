<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $msg = filter_var($_POST['question'], FILTER_SANITIZE_EMAIL);
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

  if (!$msg) {
    die('Bad msg');
  }
  if (!$email) {
    die('Bad email');
  }
  if ($_POST['name']) {
    die('Honeypot filled');
  }

  $headers = "From: website@evan-borden.com\nReply-To: $email";
  mail("evan@evan-borden.com", "Website Form", wordwrap($msg, 70), $headers);

  header('Location: https://www.evan-borden.com');
}

?>
