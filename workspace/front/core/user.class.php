<?
include_once "db.class.php";
include_once "frontDb.class.php";
include_once "utility.class.php";
include_once "ticket.class.php";
class User {
	private $db;
	public $users;
	private $errors = [
		'u01'=>'Check login failed',
		'u02'=>'Login or password incorrect',
		'u03'=>'User login failed'
	];
	public $table_name;
	private static $frontDb;
	function __construct(){
		$this->db = new Db();
		self::$frontDb =  new Db();
	}
	function userExists($login){
		$sql = "
			SELECT id FROM 
			`users`
			WHERE `login` = ? 
		";
		$id = $this->db->prepare($sql,'s',[$login]);
		if($id->num_rows > 0){
				return true;
		}
		return false;
	}
	function giveTicket($uId){
		$Ticket = new Ticket();
		return $Ticket->create($uId);
	}
	function checkLogin($login){
		$sql  = "
			SELECT `id`
			FROM `users`
			WHERE `login` = ?";
		$user = $this->db->prepare($sql,'s',[
				$this->db->filter($login,'s')
		])->fetch_assoc();
		if(!empty($user)){
			return Utility::response('success',['id'=>$user['id']]);
		}else{
			return Utility::response('fail',[],[
				'u01',$this->errors['u01']
			]);
		}
	}
	function login($login,$pass){
		$sql  = "
			SELECT `id`,`group_id`,`login`,`password`
			FROM `users`
			WHERE `login` = ?";
		$user = $this->db->prepare($sql,'s',[
				$this->db->filter($login,'s')
		])->fetch_assoc();
		if(!empty($user)){
			$hashUserPassword = $user['password'];
			if( !(password_verify($pass,$hashUserPassword)) ){
				return Utility::response('fail',[],[
					'u02',$this->errors['u02']
				]);
			}
			$token = $this->giveTicket($user['id']);
			return Utility::response('success',[
				'id'=> $user['id'],
				'group_id'=> $user['group_id'],
				'token'=> $token
			]);
		}else{
			return Utility::response('fail',[],[
				'u03',$this->errors['u03']
			]);
		}
	}
	function getName($userData){
    session_start();
	  $uId = $userData->uId;
	  if(empty($uId)){
	    $uId = $_SESSION['u_id'];
    }
		$sql = "
			SELECT `name`,`second_name`
			FROM `users_meta`
			WHERE `u_id` = ?
		";
		$user = $this->db->prepare($sql,'i',[$uId])->fetch_assoc();
		if($this->db->errno > 0){
			return [
					'status'=>'fail',
					'failText'=> "Get Name error"
			];
		}
		if(!empty($user)){
			return [
					'status'=>'success',
					'data'=> $user
			];
		}else{
      return [
          'status'=>'fail',
          'failText'=> "User not found"
      ];
    }
	}

	public static function getFrontUser(){
		$ticketInfo = null;
		if(isset($_COOKIE['token'])){
			$token = $_COOKIE['token'];
			$Ticket = new Ticket();
			$ticketInfo = $Ticket->getFromToken($token);
		}
		if(is_null($ticketInfo)) return [];
		$uId = $ticketInfo['u_id'];
		$sql = "
			SELECT `id`,`name`,`second_name`,`phone`,`email`
			FROM `users_meta`
			WHERE `u_id` = ?
		";
		$user = frontDb::prepare($sql,'i',[$uId])->fetch_assoc();
		if(!empty($user)){
			return $user;
		}
		return [];
	}
}