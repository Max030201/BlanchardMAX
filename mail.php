<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;

$title = "Заголовок письма";
foreach ( $_post as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "from_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="backgrounf-color: #f8f8f8;">' ) . "
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    ";
  };
};

$body = "<table style='width: 100%;'>$body</table>";

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth = true;
  $mail->Host = 'smpt.gmail.com';
  $mail->Username = 'zemledukhvolkmax@gmail.com';
  $mail->Password = 'qloypwyfnbcjhcsu';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->setForm('zemledukhvolkmax@gmail.com', 'Заявка с вашего сайта');
  $mail->addaddress('zemlevolk@mail.ru');
  $mail->addaddress('zemledukhvolkmax@gmail.com');

  if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      $filename = $file['name'][$ct];
      if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
        $rfile[] = "файл $filename прикреплён";
      } else {
        $rfile[] = "не удалось прикрепить файл $filename"
      }
    }
  }

  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status ="Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
