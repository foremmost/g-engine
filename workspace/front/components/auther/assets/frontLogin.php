<?
global $data;
global $basePath;
include_once $basePath . "user.class.php";
include_once $basePath . "utility.class.php";
// +++++++++++++++++++
$login = $data->login;
$pass =  $data->pass;
// +++++++++++++++++++
$User = new User();
$response=  $User->login($login,$pass);
// +++++++++++++++++++

if($response['status'] === 'success') {
	$uId = $response['data']['id'];
	$groupId = $response['data']['group_id'];
	$token = $response['data']['token'];
	setcookie("token", $token, time()+(60*60*24) ,'/');
	setcookie("u_id", $uId, time()+(60*60*24*30),'/');
	echo json_encode([
		'status'=>'success',
		'data'=> [
			'code'=>10,
			'uId'=>$uId,
			'token'=> $token
		]
	]);
}else{
	echo json_encode([
		'status'=>'fail',
		'data'=> [ 'code'=>1,'msg' =>'Authorization failed']
	]);
}


