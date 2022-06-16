<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$c = true;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $admin_email = 'info@hausvik.ru';
    
    $site_title = 'Хаусвик';
    $site_email = 'info@hausvik.ru';
    $form_subject = 'Оставили заявку';

    $smt_host = 'smtp.yandex.ru';
    $smt_login = '';
    $smt_password = '';


    $input_name = [
        'username' => 'Имя',
        'tel'      => 'Телефон',
        'email'    => 'Почта',
        'comment'  => 'Комментарий',
    ];

    $message = '';

    foreach ($_POST as $key => $value) {
        $value = trim($value);
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$input_name[$key]</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
        }
    }

    if ($message === '') {
        echo 'fields';
        die();
    }

    $body = "<table style='width: 100%;'>$message</table>";

    $mail = new PHPMailer();

    try {
        $mail->CharSet = "UTF-8";

        $mail->setFrom($site_email, $site_title);

        $mail->addAddress($admin_email);


        $mail->isHTML(true);
        $mail->Subject = $form_subject;
        $mail->Body = $body;

        if ($mail->send()) {
            $result = "ok";
        } else {
            $result = $mail->ErrorInfo;
        }

    } catch (Exception $e) {
        $result = $mail->ErrorInfo;
    }


    // echo $result;
    die();

}

