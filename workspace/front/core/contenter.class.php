<?php
include_once "db.class.php";

include_once "frontDb.class.php";
include_once "utility.class.php";

class Contenter {
	private $db;
	private static $frontDb;
	function __construct(){
		$this->db = new Db();
		self::$frontDb = new Db();
	}

	function saveService($serviceData){
		if(!property_exists($serviceData,'type')) $serviceData->type = '2';
		$serviceData->date = date('Y-m-d H:i:s');
		$serviceData->description = htmlspecialchars($serviceData->description);
		if( ($serviceData->common_id == 'null') || $serviceData->common_id == ''){
			$serviceData->common_id = NULL;
		}
		$serviceId = $this->db->insert([
			'tableName'=>'content_pages',
			'insertData'=>$serviceData,
			'fieldsToInsert'=> [
				['s'=>'title'],
				['s'=>'lang_id'],
				['s'=>'common_id'],
				['s'=>'description'],
				['s'=>'link'],
				['s'=>'short'],
				['s'=>'image'],
				['s'=>'type'],
				['s'=>'date']
			]
		]);
		if(!is_null($serviceId)){
			return [
				'status'=>'success',
				'data'=>[
					'serviceId'=>$serviceId,
					'commonId'=>$serviceData->common_id
				]
			];
		}
		return [
			'status'=>'fail',
			'failText'=>'Service creating error',
			'errorText'=>$this->db->errtext,
			'errorNo'=>$this->db->errno
		];
	}
	function updateService($serviceData){
		$serviceData->description = htmlspecialchars($serviceData->description);
		if( ($serviceData->common_id == 'null') || $serviceData->common_id == ''){
			$serviceData->common_id = NULL;
		}
		$this->db->update([
			'tableName' => 'content_pages',
			'updateData' => $serviceData,
			'fieldsToUpdate' => [
				['s' => 'title'],
				['s' => 'image'],
				['s' => 'link'],
				['s' => 'short'],
				['i' => 'common_id'],
				['s' => 'description']
			],
			'condition'=> ' WHERE `id` = ?',
			'conditionFields'=>[['id'=>'i']]
		]);
		return [
			'status'=>'success',
			'data'=>[
				'serviceId'=>$serviceData->id,
				'commonId'=>$serviceData->common_id,
				'data'=>$serviceData
			]
		];
	}
	function getCommon($commonId){
		$sql = "
			SELECT `id`,`description`,`lang_id`,`type`,`lang_id`,`common_id`,`title`,`date`,`image`,`link`,`short`
			FROM `content_pages`
			WHERE `common_id` = ?
		";
		$common = $this->db->prepare($sql,'i',[$commonId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($common)){
			return $common;
		}
		return [];
	}
	function getAll($contentData){
		$type= $contentData->type ?  $contentData->type : '146';
		$sql = "
			SELECT `id`,`description`,`type`,`lang_id`,`common_id`,`title`,`date`,`image`,`link`,`short`
			FROM `content_pages`
			WHERE `type` = ? AND (`common_id` IS NULL)
			ORDER BY `id` DESC
		";
		$items = [];
		$prepared = $this->db->prepare($sql,'s',[$type]);
		while($row = $prepared->fetch_assoc()){
			$item['id'] = $row['id'];
			$item['description'] = htmlspecialchars_decode($row['description']);
			$item['title'] = $row['title'];
			$item['lang_id'] = $row['lang_id'];
			$item['link'] = $row['link'];
			$item['short'] = $row['short'];
			$item['date'] = $row['date'];
			$item['image'] = $row['image'];
			$item['type'] = $row['type'];
			$item['translates'] = $this->getCommon($row['id']);

			$items[] = $item;
		}
		if(!empty($items)){
			return $items;
		}
		return [];

	}
	function delete($data){
		$id = $data->id;
		if(!isset($id) ||  is_null($id)  ) return [ "status"=>'fail',"failTitle"=> "Delete page failed"];
		$sql = "DELETE FROM `content_pages` WHERE `id` = ?";
		$this->db->prepare($sql,'i',[$id]);
		return [
			'status'=>'success',
			'data'=>[
				'deletedId'=>$id
			]
		];
	}

	/*  */
	public static function getAllFront($type,$langId = 1){
		$sql = "
			SELECT `id`,`description`,`lang_id`,`type`,`common_id`,`title`,`date`,`image`
			FROM `content_pages`
			WHERE `type` = ? AND `lang_id` = ?
			ORDER BY `id` DESC
		";
		$items = [];
		$prepared = frontDb::prepare($sql,'si',[$type,$langId]);
		while($row = $prepared->fetch_assoc()){
			$item['id'] = $row['id'];
			$item['description'] = htmlspecialchars_decode($row['description']);
			$item['title'] = $row['title'];
			$item['date'] = $row['date'];
			$item['image'] = $row['image'];
			$item['type'] = $row['type'];
			$items[] = $item;
		}
		if(!empty($items)){
			return $items;
		}
		return [];

	}
	public static function getItem($id,$type,$langId = 1){
		$sql = "
			SELECT `id`,`description`,`lang_id`,`type`,`common_id`,`title`,`date`,`image`
			FROM `content_pages`
			WHERE `id`= ? AND `type` = ? AND `lang_id` = ?
		";
		$item = [];
		$prepared = frontDb::prepare($sql,'isi',[$id,$type,$langId]);
		while($row = $prepared->fetch_assoc()){
			$item['id'] = $row['id'];
			$item['description'] = htmlspecialchars_decode($row['description']);
			$item['title'] = $row['title'];
			$item['date'] = $row['date'];
			$item['image'] = $row['image'];
			$item['type'] = $row['type'];
		}
		if(!empty($item)){
			return $item;
		}
		return [];
	}
	public static function getCommonId($id){
		$sql = "
			SELECT `id`
			FROM `content_pages`
			WHERE `common_id`= ? 
		";
		$item = [];
		$prepared = frontDb::prepare($sql,'i',[$id]);
		$row = $prepared->fetch_assoc();
		if(!empty($row)){
			return $row['id'];
		}
		return null;
	}
	public static function getCommonItem($id){
		$sql = "
			SELECT `common_id`
			FROM `content_pages`
			WHERE `id`= ? 
		";
		$item = [];
		$prepared = frontDb::prepare($sql,'i',[$id]);
		$row = $prepared->fetch_assoc();
		if(!empty($row)){
			return $row['common_id'];
		}
		return null;
	}

}