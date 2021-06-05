<?
include_once "db.class.php";
class Ticket{
	private $db;

	function __construct(){
		$this->db = new Db();
	}
	function create($uId){
		if($this->check($uId)){
			$this->remove($uId);
		}
		$date = date('Y-m-d H:i:s');
		$token = bin2hex(random_bytes(24));
		$sql = "
			INSERT INTO tickets 
			(`token`,`u_id`,`add_date`)
			VALUES (?,?,?)
		";
		$this->db->prepare($sql,'sis',[
			$token,
			$this->db->filter($uId,'i'),
			$date
		]);
		$ticketId = $this->db->insert_id;
		if(!empty($ticketId)){
			return $this->get($ticketId);
		}else{
			return null;
		}
	}
	function check($uId){
		$sql  = "
			SELECT `id`,`token`
			FROM `tickets`
			WHERE `u_id` = ?";
		$ticket = $this->db->prepare($sql,'i',[
			$this->db->filter($uId,'i')
		])->fetch_assoc();
		if(!empty($ticket)){
			return true;
		}else{
			return false;
		}
	}
	function checkOnExpires($ticketId){
		$expires = time()+ (60*1000*30);
		$sql  = "
			SELECT `token`
			FROM `tickets`
			WHERE `id` = ? AND  `live` < FROM_UNIXTIME(?)";
		$ticket = $this->db->prepare($sql,'is',[
			$this->db->filter($ticketId,'i'),
			$expires,
		])->fetch_assoc();
		if(!empty($ticket)){
			return true;
		}else{
			return false;
		}
	}
	function get($ticketId){
		$sql  = "
			SELECT `token`,`u_id`,`live`
			FROM `tickets`
			WHERE `id` = ?";
		$ticket = $this->db->prepare($sql,'i',[
			$this->db->filter($ticketId,'i')
		])->fetch_assoc();
		if(!empty($ticket)){
			return $ticket['token'];
		}else{
			return null;
		}
	}
	function getFromToken($token){
		$sql  = "
			SELECT `id`,`u_id`,`add_date`,`live`
			FROM `tickets`
			WHERE `token` = ?";
		$ticket = $this->db->prepare($sql,'s',[$token])->fetch_assoc();
		if(!empty($ticket)){
			return $ticket;
		}else{
			return null;
		}
	}

	function remove($uId){
		$sql = "
			DELETE FROM tickets
			WHERE u_id = ?
		";
		$ticket = $this->db->prepare($sql,'i',[
			$this->db->filter($uId,'i')
		]);
		if(!empty($ticket)){
			return $ticket;
		}else{
			return null;
		}
	}

}