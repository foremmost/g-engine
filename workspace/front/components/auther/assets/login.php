<?
session_start();
global $data;
global $basePath;
include_once $basePath."user.class.php";
include_once $basePath."utility.class.php";
$login = $data->login;
$step = $data->step;
$response =['status'=>'fail','data'=> password_hash('qwerty12345',PASSWORD_DEFAULT)];
$User = new User();
if($step === 1){
	$user =  $User->checkLogin($login);
	$uId = $user['data']['id'];
	if($user['status'] === 'success'){
		$_SESSION['u_id'] = $uId;
		$_SESSION['login'] = $login;
		echo json_encode(
			Utility::response('success',[
				'u_id'=>$uId,
				'login'=>$login
			])
		);
	}else{
		echo json_encode($user);
	}
}else{
	$pass =  $data->pass;
	$user=  $User->login($login,$pass);
	if($user['status'] === 'success'){
		$uId = $user['data']['id'];
		$groupId = $user['data']['group_id'];
		$page = 'home';
		$_SESSION['u_id'] = $uId;
		$_SESSION['login'] = $login;
		$_SESSION['group_id'] = $groupId;
		$_SESSION['page'] = $page;
		echo json_encode(Utility::response('success',[
			'u_id'=> $uId,
			'page'=> $page,
			'access'=> true
		]));
	}else{
		echo json_encode($user);
	}
}