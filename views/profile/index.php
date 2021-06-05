<?php
if(isset($_COOKIE['token'])) {
	include_once VIEWS_DIR.'/profile/cabinet.php';
}else{
	include_once VIEWS_DIR.'/profile/login.php';
}
?>