<?php
require 'mail/Exception.php';
require 'mail/PHPMailer.php';
require 'mail/SMTP.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
include_once "db.class.php";
include_once "languager.class.php";
include_once "settings.class.php";

class Utility{
	private $db;

	function __construct(){
		$this->db = new Db();
	}
	function sendMail($mailData,$template=''){
		$Languager = new Languager();
		$mail = new PHPMailer(true);
		try {
			$mail->SMTPDebug = false;
		}catch (Exception $e) {
			echo "Message could not be sent. : {$mail->ErrorInfo}";
		}
		if(isset($mailData['lang'])){
			$lang = $mailData['lang'];
		}else{
			$lang = 'en';
		}
		global $mailPath;
		$mail->setLanguage(	$lang, $mailPath.'/language/');
		$name = '';
		$email = '';
		$phone = '';
		$msg = '';
		$subject = $mailData['form_order'];
		$site = 'grammla.kz';
		//
		$mail->setFrom("noreply@{$site}", $mailData['form_order']);
		if(isset($mailData['name'])) $name = $mailData['name'];
		if(isset($mailData['email'])){
			$email = $mailData['email'];
			$mail->addAddress($email, 'User');
		}
		if(isset($mailData['phone'])) $phone = $mailData['phone'];
		if(isset($mailData['msg'])) $msg = $mailData['msg'];


		$mail->addCC('foremost186@gmail.com', 'Admin');

		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject =  $subject;


/*		$telegramToken = '548594003:AAHMWloVVgQyDVMwxnEb-ECDeh0owgqCnTs';
		$chat_id = '-286761987';
		$tgMsg = "";
		foreach ($mailData as $prop=>$value):
			$tgMsg .="<b>{$prop}:</b> {$value}%0A";
		endforeach;

		$sendToTelegram = fopen("https://api.telegram.org/bot{$telegramToken}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$tgMsg}","r");*/


		$from = "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('E-mail',$lang).": </span>" . $email . "\n";
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('Full name',$lang).": </span>" . $name . "\n";
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('Phone',$lang).": </span>" . $phone . "\n";
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('Message',$lang).": </span>" . $msg . "\n";
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront("Ip address",$lang).": </span>" . $_SERVER["SERVER_ADDR"];
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('Browser',$lang).":</span>" . $_SERVER["HTTP_USER_AGENT"];
		$from .= "<br>";
		$from .= "<span style='color:red;font-size:1.3em;'>".$Languager->getTranslateToFront('Page',$lang).":</span>" . $_SERVER["HTTP_REFERER"];

		$mail->Body = $from;

		$mail->send();
	}


	function getPageId($page){
		echo $page;
		$sql = "
			SELECT `id` 
			FROM `actions`
			WHERE `name` = ? AND `type` = 'page'
		";
		$id = $this->db->prepare($sql,'s',[$this->db->filter($page,'s')])->fetch_row();
		if(!empty($id)){
			return $id[0];
		}
		return null;
	}
	function getModuleName($moduleId){
		//,`group_id`,`user_id`,`access`
		$sql = "
			SELECT `name` 
			FROM `modules`
			WHERE `id` = ?
		";
		$name = $this->db->prepare($sql,'i',[$this->db->filter($moduleId,'i')])->fetch_row();
		#print_r($moduleId);
		if(!empty($name)){
			return $name[0];
		}
		return null;
	}
	function getModulesOnPage($pageId){
		$sql = "
			SELECT `module_id` 
			FROM `modules_on_page`
			WHERE `page_id` = ?
			ORDER BY `sort` ASC
		";
		$modules = [];
		$moduleIds = $this->db->prepare($sql,'i',[$this->db->filter($pageId,'i')])->fetch_all(MYSQLI_ASSOC);
		#print_r($moduleIds);
		if(!empty($moduleIds)){
			foreach ($moduleIds as $moduleArr => $module){
				array_push($modules,$this->getModuleName($module['module_id']));
			}
			return $modules;
		}
		return null;
	}


	function getMenuItems($groupId){
		$sql = "
			SELECT `actions`.`id`,`actions`.`name`
			FROM `actions`
			INNER JOIN `group_rights` ON  `group_rights`.`action_id` = `actions`.`id`
			WHERE `type` = 'page' AND `group_rights`.`group_id` = ? AND `actions`.`name` <> '/'  AND `access` = TRUE 
			ORDER BY `actions`.`sort`,`actions`.`name`
		";

		$pages = $this->db->prepare($sql,'i',[$groupId])->fetch_all(MYSQLI_ASSOC);
		if($this->db->errno > 0){
			return [
					'status'=>'fail',
					'failText'=> "Get Menu items error"
			];
		}
		if(!empty($pages)){
			return [
					'status'=>'success',
					'data'=> $pages
			];
		}
	}

	function getSuperGroup(){
		return 1;
	}
	function isSuper(){
		session_start();
		if(isset($_SESSION)){
			$groupId = $_SESSION['group_id'];
			if($groupId == 1){
				return true;
			}
		}
		return false;
	}

	/**/
	public static function response($status,$data,$fail=null){
		$outResponse = [];
		$outResponse['status'] = $status;
		if($status == 'fail'){
			$outResponse['error'] = [];
			$outResponse['error']['errNo'] = $fail[0];
			$outResponse['error']['errText'] = $fail[1];
 		}
		$outResponse['data'] = $data ? $data : null;
		return $outResponse;
	}
}